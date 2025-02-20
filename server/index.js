// External Packages.
import express from 'express';
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
  res.header("Access-Control-Allow-Origin", "*");
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
    res.send('Hello from DALL-E');
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
startServer();






