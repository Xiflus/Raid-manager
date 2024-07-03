import jwt from "jsonwebtoken";
import { JWT_EXP, SECRET } from "../../env.js";

// payload = información a encriptar y transmitir en el token
export const generateToken = (payload) => {
  const options = {
    expiresIn: JWT_EXP // 7d 
  };

  // sign se usa para generar el token, toma el payload le agrega el secret y las opciones encripta y crea un token
  // se le envia token a usuario
  return jwt.sign(payload, SECRET, options);
};

// se recibe el token del usuario y se verifica con el secret
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};