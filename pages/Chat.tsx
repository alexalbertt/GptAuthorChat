import React, { useState } from 'react';
import axios from 'axios';

const Chat = ({ selectedAuthor }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ author: string; text: string }[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const messagesEndRef = React.useRef(null);

  const API_KEY = process.env.OPENAI_API_KEY;

  // Get question completions through post to the OpenAI API
  const getCompletions = async (prompt, model, numCompletions) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt,
          model,
          max_tokens: numCompletions,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // This will reset the chat history when a new author is selected
  React.useEffect(() => {
    setChatHistory([]);
  }, [selectedAuthor]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Use the OpenAI API to generate a response to the user's input
    // Generate a response to the user's input
    try {
      const savedUserInput = userInput.match(/[.?!]$/) ? userInput : userInput + ".";
      setUserInput('');
      setChatHistory([...chatHistory, { author: "You", text: savedUserInput }]);
      // Scroll the last message into view
      // messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      const originalPrompt = `Pretend you are ${selectedAuthor}. You are having a conversation with a student interested in the ideas you have written about in your books. During this conversation, do not break character or give any indication that you are not ${selectedAuthor}. Only respond as ${selectedAuthor} and do not simulate what the student would say.
      
      For example:
      Student: Hi ${selectedAuthor}, what was your favorite book you have written?
      
      ${selectedAuthor}: I love all the books I have written but my favorite is Conciousness Explained.
      
      In this example, the text after ${selectedAuthor}: would be your response.\n\n`;
      const prompt = originalPrompt + chatHistory
        .map((message) => message.text)
        .join("\n\n") + `\n\n${savedUserInput}\n\n`;

      await sleep(800);
      setIsWaiting(true);
      await sleep(500);

      const completions = await getCompletions(prompt, 'text-davinci-003', 128);
      // Destructure the response to get the chat response
      const { choices } = completions;
      const chatResponse = choices.map((choice) => ({
        author: selectedAuthor,
        text: choice.text,
      }));
      setChatHistory([...chatHistory, { author: "You", text: savedUserInput }, ...chatResponse]);

      // Scroll the last message into view
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsWaiting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <p key={index} className={message.author === "You" ? "you" : "selected-author"}>
            <strong className="message-label">{message.author}</strong><br /> {message.text}
            {index === chatHistory.length - 1 && <span ref={messagesEndRef}></span>}
          </p>
        ))}
        {isWaiting && <p className="selected-author">
          <strong className="message-label">{selectedAuthor}</strong><br /> Typing...

        </p>}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        {selectedAuthor ?
          <textarea value={userInput} onChange={handleInputChange} placeholder="Message" /> :
          <textarea value={userInput} onChange={handleInputChange} placeholder="Choose an author to start the chat" disabled />
        }
        <button type="submit"><img src="/send.png" alt="Send" /></button>
      </form>
    </div>
  );
};

export default Chat;