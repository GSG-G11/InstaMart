import { compare } from 'bcrypt';

const comparePass = (password:any, hashPassword:string) => compare(password, hashPassword);

export default comparePass;
