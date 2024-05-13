import OpenAI from 'openai';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import cors from "cors"

dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const app = express();

const port = 3000;
app.use(bodyParser.json());
app.use(cors());





app.post("/", async(req,res) => {
    const {messages} = req.body;

    console.log(messages)

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [ 
            {"role": "system", "content": "You are Travel designGPT helpful assistant travel plan"},
            // {role: "user", content: '${message}'},
            ...messages
          
        ]
    })

    res.json({
        completion: completion.choices[0].message
    })
});

app.listen(port , () => {
    console.log("Example app listening at http://localhost:${port}");
});















