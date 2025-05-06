// import express from 'express';
// import * as dotenv from 'dotenv';
// //import { Configuration, OpenAIApi } from 'openai';

// import OpenAI from 'openai';

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
// });

// //Testing connection.
// router.route('/').get((req, res) => {
//     res.send('HELLO from DALL-E')
// })

// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         // const aiResponse = await openai.createImage({
//         //     prompt,
//         //     n: 1,
//         //     size: '1024x1024',
//         //    response_format: 'b64_json',
//         // })

        
//         ///////*********WORKING HERE!!!!!!!.........**********
//         const aiResponse = await openai.images.generate({
//             prompt: prompt,
//             size: "1024x1024",
//             quality: "standard",
//             n: 1,
//             response_format: 'b64_json'
//         })
            
//         const image = aiResponse?.data.data[0].b64_json
//         res.setHeader('Access-Control-Allow-Origin', '*');
        
//         res.status(200).json({ photo: image })

//     } catch (error) {
//         console.log('error');
//         res.status(500).send(error?.response.data.error.message)
//     }
// });

// export default router;
// //******************************************************************************** */
import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.route('/').get((req, res) => {
    res.send('HELLO from DALL-E');
});

    
router.route('/').post(async (req, res) => {
    try {
      console.log("Received request body:", req.body);
      const { prompt } = req.body;
  
      if (!prompt || typeof prompt !== 'string') {
        console.error("❌ Invalid prompt input:", prompt);
        return res.status(400).json({ error: 'Prompt is required and must be a string' });
      }
  
      const aiResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        size: "1024x1024",
        n: 1,
        quality: "standard"
      });

      console.log("🟢 Prompt being sent to OpenAI:", prompt);

      const image = aiResponse?.data[0]?.url;
      //const image = aiResponse?.data?.[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
        console.error('🔥 OpenAI error caught:\n', error);
      
        // Attempt to safely access the OpenAI error message
        const openAiErrorMessage =
          error?.response?.data?.error?.message ||
          error?.message ||
          'Unknown error from OpenAI';
      
        res.status(500).json({ success: false, error: openAiErrorMessage });
      }
  });
  export default router;
  

//********************************************************** */

// import express from "express";
// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const aiResponse = await openai.images.generate({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json", // or "url"
//     });

//     const image = aiResponse.data[0].b64_json;

//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error("🔥 OpenAI error caught:\n", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Image generation failed.",
//     });
//   }
// });

// export default router;
