import jwt from "jsonwebtoken"
const secret = process.env.SECRET_PASS

export function generateToken(obj){
    return jwt.sign(obj, secret);
}

export function decodeToken(token){
    
    try {
        var decoded = jwt.verify(token, secret);
        return decoded
      } catch(err) {
        console.error("token invalido")
        return false
      }
}