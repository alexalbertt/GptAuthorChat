import React, { useState } from 'react';
// import openai from 'openai';

// Import the generateResponse function from the openai module
import { getCompletions } from './openai';
// Set up the OpenAI API client with your API key
// openai.apiKey = process.env['openaiKey'];

const Chat = ({ selectedAuthor }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Use the OpenAI API to generate a response to the user's input
    // Generate a response to the user's input
    try {
      const prompt = chatHistory.join("\n") + userInput;
      const completions = await getCompletions(prompt, 'text-davinci-003', 128);

      // Destructure the response to get the chat response
      const { choices } = completions;
      const chatResponse = choices.map((choice) => choice.text);

      setChatHistory([...chatHistory, userInput, ...chatResponse]);
      setUserInput('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Chat with {selectedAuthor}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <div>
        {chatHistory.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;