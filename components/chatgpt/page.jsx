// "use client";
// import React, { useState } from 'react';
// import OpenAI from 'openai';

// const Chatbot = () => {
//   const [messages, setMessages] = useState("");
//   const [response, setResponse] = useState(""); // State to hold the response

//   const openai = new OpenAI({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true
//   });

//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [
//           {
//             "role": "user",
//             "content": messages
//           }
//         ],
//         max_tokens: 500, // Adjust the token limit as needed
//       });
//       console.log(response)

//       setResponse(response.choices[0].message.content);
//     } catch (error) {
//       console.error('Error from OpenAI:', error);
//       setResponse('Error occurred while fetching response.');
//     }
//   };

//   return (
//     <div className='w-[375px] bg-black flex flex-col justify-center items-center py-4 absolute mt-80'>

//       <div>
//           {/* Display the response */}
//           {response && (
//             <div className='w-[375px] border-2 px-5 py-2 bg-gray-500 text-white'>
//               <div>{response}</div>
//             </div>
//           )}
//         </div>
//       <form className=''>
//         <input
//           value={messages}
//           onChange={(e) => setMessages(e.target.value)}
//           placeholder="Enter your prompt here..."
//           className='w-full h-12 rounded-lg border-2 px-4 py-2 bg-gray-300'
//         />
//         <button className='mt-2 ml-1 border-2 px-4 py-2 rounded-lg bg-blue-500 text-white' onClick={handleSendMessage}>Send Prompt</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;
