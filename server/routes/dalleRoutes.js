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
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            size: "1024x1024",
            n: 1,
            response_format: 'b64_json'
        });

        const image = aiResponse?.data?.data[0]?.b64_json;
        res.status(200).json({ photo: image });

    } catch (error) {
        console.error('OpenAI API error:', error.message || error);
        res.status(500).json({
            error: error?.response?.data?.error?.message || 'Something went wrong',
        });
    }
});

export default router;
