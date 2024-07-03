import getPool from "../../db/getPool.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { emailALreadyRegisterError, usernamelALreadyRegisterError } from '../../services/errorService.js';


const insertUserModel = async (username, email, password, registrationCode) => {
const pool = await getPool();
  // revisar si el usuario ya existe?
  let [users] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
 
  if(users.length > 0) emailALreadyRegisterError();

  [users] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);

  if(users.length > 0) usernamelALreadyRegisterError();

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // insertar el usario  
  const newUser = await pool.
  query(
     `INSERT INTO users(id, email, username, password, registrationCode) VALUES(?, ?, ?, ?, ?)`,
     [uuid(),email, username, hashedPassword, registrationCode]
);
  return newUser;
};

export default insertUserModel;