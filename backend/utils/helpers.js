export class HttpError extends Error {
  constructor(status, message){
    super(message);
    this.status = status;
  }
}
export const pick = (obj, keys) => keys.reduce((a,k)=>{ if(obj[k]!==undefined) a[k]=obj[k]; return a; }, {});
