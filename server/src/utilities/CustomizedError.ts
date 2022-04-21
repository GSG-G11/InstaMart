interface ModError extends Error {
    status?: number;
  }

const CustomizedError = (message:string, status:number):Error => {
  const myError:ModError = new Error(message);
  myError.status = status;
  return myError;
};

export default CustomizedError;
