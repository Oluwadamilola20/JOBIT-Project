import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function genJWT(payload){
    const token = jwt.sign(payload, JWT_SECRET);

      return token; 

}

export default genJWT