interface ModError extends Error {
    status?: number,
    message:string
  }

const CustomizedError = (message:string, status:number):Error => {
  const myError:ModError = new Error();
  myError.message = message;
  myError.status = status;
  return myError;
};

export default CustomizedError;
