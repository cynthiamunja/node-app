import nodemailer from 'nodemailer'
import path  from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let config= {
    host:"smtp.gmail.com",
    service:"gmail",
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
}

function createTransporter(config:any){
    return nodemailer.createTransport(config)
}

 export async function sendEmail(messageOption:any){
    let transporter = createTransporter(config)
    await transporter.verify()

    await transporter.sendMail(messageOption, (err,info)=>{
        if (err){
            console.log(err);
        }
        console.log(info)
    })
//     let messageOptions={
//     to:process.env.EMAIL,
//     from:process.env.EMAIL,
//     subject:"testing",
//     html:'<h1> hello there</h1>'
 
// }
// sendEmail(messageOptions)
}
