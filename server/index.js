// External Packages.
/*import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
// Pull all the enviroment variables from .env file.
dotenv.config();
//Express setup.
//Initialize express app.
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://juancadall-e.com/");
  res.header("Access-Control-Allow-Origin", "https://juancadall-e.com/create-post");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  }));

app.use(express.json({ limit: '50mb'}));
//Create API endpoints.
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
  })
  //app.use(allowCrossDomain);
//The first Route (root).
app.get('/', async (req, res) => {
    res.send('Hello, this is Juanca from DALL-E');
});
//Start the server.
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
         app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }  
}
startServer();*/

/*******************************************************************************/
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
//app.use(cors());

app.use(cors({
  origin: 'https://juanca-dall-e-app-1-frontend.onrender.com', // Replace with your actual frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));


app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hey, Hey!, I am Juanca from today!!!...Hello from DALL.E!',
  });
});

// const startServer = async () => {
//   try {
//     connectDB(process.env.MONGODB_URL);
//     app.listen(8080, () => console.log('Server started on port 8080'));
//   } catch (error) {
//     console.log(error);
//   }
// };

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('Error starting server:', error);
  }
};


startServer();







