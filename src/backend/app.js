import express from "express"
import { config } from "dotenv"
import cors from 'cors';
config()

// local packages
import authRoute from "./routes/auth.js"

const PORT =  process.env.PORT || 2006

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//routes 
app.use('/auth',authRoute)


app.listen(PORT,()=>{
    console.log(`server at http://localhost:${PORT}`)
})