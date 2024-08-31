import axios from 'axios';
import {OPENAI_API_KEY} from '@env';

console.log('OpenAI API Key:', OPENAI_API_KEY);

const openaiApi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
});

export const sendMessageToChatGPT = async (message: string) => {
  try {
    const response = await openaiApi.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: message}],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return 'Error: Could not retrieve response from ChatGPT.';
  }
};
