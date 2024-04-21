import mongoose from 'mongoose';

const connectDB = (url) => {
    //Useful when working with Search functionality.
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
        .then(() => console.log('Mongodb connected...'))
        .catch((err) => console.log(err));
}

export default connectDB;