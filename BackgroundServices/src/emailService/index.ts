import { sqlConfig } from "../config"
import ejs from 'ejs'
import mssql from 'mssql'
import path from 'path';
import dotenv from 'dotenv';
import { sendEmail } from "../helpers";
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface User{
    UserID:string,
    UserName:string,
    Email:string,
    UserPassword:string,
    isDeleted:number,
    isEmailSent:number
}


export async function run() {
    try {
        let pool = await mssql.connect(sqlConfig);
        let users = await (await pool.request().query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[];

        users.forEach(user => {
            ejs.renderFile("Templates/register.ejs", { name: user.UserName }, async (error, data) => {
               
                let messageOptions = {
                    to: process.env.EMAIL,
                    from: process.env.EMAIL,
                    subject: "testing",
                    html: data
                };

               await sendEmail(messageOptions)

               await pool.request().query(`UPDATE Users SET isEmailSent=1 WHERE UserID= '${user.UserID}' `)
            });
        });

        console.log("email service is running");
    } catch (error) {
        console.error(error);
    }
}


