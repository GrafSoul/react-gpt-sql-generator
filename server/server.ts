import express, { Request, Response } from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT: number = 8000;
const API_KEY = process.env.OPEN_AI_API_KEY;

const configuration = {
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
};

const openai = new OpenAI(configuration);

app.post("/completions", async (req: Request, res: Response) => {

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,    
      messages: [
        {
          role: "user",
          content: "Create SQL request to " + req.body.message,
        },
      ],
    }); 

    console.log(completion.choices[0].message)

    res.send(completion.choices[0].message);

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
