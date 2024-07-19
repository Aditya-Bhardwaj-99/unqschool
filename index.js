import express from "express";
import APIRoute from "./route/index.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api",APIRoute)

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})