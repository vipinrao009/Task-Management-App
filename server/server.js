import express from 'express'

const app = express();
const PORT = 8080;

app.use('/', (req, res)=>{
    res.send('Hello from vipin')
})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})