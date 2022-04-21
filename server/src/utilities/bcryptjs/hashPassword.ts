import { hash } from 'bcrypt';

const hashedPassword = (password:any) => hash(password, 10);

export default hashedPassword;
