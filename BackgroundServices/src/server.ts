
import express from 'express'
import nodecron from 'node-cron'
import {run} from './emailService'

const app=express()

nodecron.schedule('*/10 * * * * *', async()=>{
    await run()
})

app.listen(4001, ()=>{
    console.log("server is now running")
})