const expected = ['CAN_ID','DLC',...Array.from({length:8},(_,i)=>'Byte'+i),'time_diff','can_id_time_diff'];
const dimensions = [12,16,8,4,8,16,12];
const f = Math.fround;

export function loadInference(model) {
  if (!model || JSON.stringify(model.features)!==JSON.stringify(expected) ||
      !Number.isFinite(model.threshold) || model.threshold <= 0 || model.layers?.length!==6) {
    throw new Error('Invalid model metadata');
  }
  const layers=model.layers.map((layer,i)=>{
    const [inputs,outputs]=dimensions.slice(i,i+2);
    if(layer.kernel?.length!==inputs || layer.kernel.some(row=>row.length!==outputs || !row.every(Number.isFinite)) ||
       layer.bias?.length!==outputs || !layer.bias.every(Number.isFinite) || layer.activation!==(i===5?'sigmoid':'relu')) {
      throw new Error('Invalid Dense layer');
    }
    return {inputs,outputs,kernel:Float32Array.from(layer.kernel.flat()),bias:Float32Array.from(layer.bias),activation:layer.activation};
  });
  return function predict(values) {
    if(values.length!==12 || !Array.from(values).every(x=>Number.isFinite(x)&&Number.isFinite(f(x))))
      throw new Error('Expected 12 finite scaled numbers');
    const input=Float32Array.from(values);
    let current=input;
    for(const {inputs,outputs,kernel,bias,activation} of layers){
      const next=new Float32Array(outputs);
      for(let j=0;j<outputs;j++){
        let sum=0;
        for(let i=0;i<inputs;i++) sum=f(sum+current[i]*kernel[i*outputs+j]);
        sum=f(sum+bias[j]);
        next[j]=activation==='relu'?Math.max(0,sum):1/(1+Math.exp(-sum));
      }
      current=next;
    }
    let squared=0;
    for(let i=0;i<12;i++){const d=f(input[i]-current[i]);squared+=f(d*d);}
    const mse=squared/12;
    if (!Number.isFinite(mse)) throw new Error('Reconstruction error exceeds numeric range');
    return {reconstructed:current,mse,attack:mse>model.threshold};
  };
}

export function verifyParity(predict, records, threshold) {
  let maxReconstruction=0,sumReconstruction=0,maxMse=0, disagreements=[];
  let closest=Infinity;
  for(const {x,reconstructed,mse,attack,source,row} of records){
    const r=predict(x);
    r.reconstructed.forEach((v,i)=>{const d=Math.abs(v-reconstructed[i]);maxReconstruction=Math.max(maxReconstruction,d);sumReconstruction+=d;});
    maxMse=Math.max(maxMse,Math.abs(r.mse-mse));
    closest=Math.min(closest,Math.abs(threshold-mse));
    if(r.attack!==attack) disagreements.push({source,row,margin:Math.abs(threshold-mse)});
  }
  return {n:records.length,sources:[...new Set(records.map(r=>r.source))],maxReconstruction,
    meanReconstruction:sumReconstruction/(records.length*12),maxMse,closest,disagreements,
    agreement:1-disagreements.length/records.length};
}
