const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000

app.use(express.json())

app.use(cors())

app.get('/api/news', async(req,res)=>{
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=web3&apiKey=d575f5cf1f2c434fb0c2b585f69b04b8')
       const data = await response.json()
       res.json(data.articles)
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
})

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})