import { Auth } from "lib/models/auth"
import { User } from "lib/models/user"
import addMinutes from "date-fns/addMinutes"
import isAfter from 'date-fns/isAfter'
import gen from "random-seed"
import { sendEmail } from "helper/sendrid"
let seed = 'asssgggggggg'; //These must be private
let rand4 = gen.create(seed)
export const  findOrCreateAuth=async(email:string):Promise<Auth>=>{
    const cleanEmail = email.trim().toLocaleLowerCase()
    let results = await Auth.findByEmail(email)
    if(results){
        return results
    }else{
        const newUser = await User.createNewUser({
            email:cleanEmail
        })
        const newAuth = await Auth.createNewAuth({
            email:cleanEmail,
            userId:newUser.id,
            code:"",
            expires: new Date()
        })
        return newAuth
    }
}

export const sendCode =async(email:string)=>{
    let auth = await findOrCreateAuth(email)
    let code = rand4.intBetween(10000, 99999)
    let now = new Date()
    let TwentyMinutes = addMinutes(now,20)
    auth.data.code = code
    auth.data.expires = TwentyMinutes
    await auth.push()
    await sendEmail(auth.data.email,code)
    return auth

}
// userAuth.data.expires.toDate()
const checkValidateDate=(date):boolean=>{
     const result = isAfter(new Date(),date )
     console.log(result)
     return result
}

export const checkEmailAndCode=async(email,code)=>{
    const results = await Auth.findEmailAndCode(email,code)
    if(results === null){
        console.log("no hay nada")
        return null
    }else{
        let date = results.data.expires.toDate()
        const expireOrNot:boolean = checkValidateDate(date)
         if(expireOrNot){
            return true
         }else{
            return results.data
         }
    }
}