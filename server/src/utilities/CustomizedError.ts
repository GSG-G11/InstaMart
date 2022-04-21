interface Error {
    status?: number;

  }
const CustomizedError = (message:string, status:number):Error => {
  const myError:any = new Error(message);

  myError.status = status;
  return myError;
};

export default CustomizedError;
