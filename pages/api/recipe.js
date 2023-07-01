import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { prompt } = req.body;
  
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: 'system',
          content: 'You are a user requesting recipe recommendations.',
        },
        {
          role: 'user',
          content: prompt,
        }
      ],
      temperature: 0,
      max_tokens: 200,
      presence_penalty: 0,
      frequency_penalty: 0.5,
    });
  
    const generatedRecipe = response.data.choices[0].message.content;
    res.status(200).json({ recipe: generatedRecipe });
  }