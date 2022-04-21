import { hash } from 'bcrypt';

const hashedPassword = (password:string) => hash(password, 10);

export default hashedPassword;
