import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import routes from './server/route/route';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('use'));

mongoose.connect('mongodb://localhost/todoapp')
.then(() => {
    console.log('Database Connected');
})
.catch(() => {
    console.log('Cannot connect Database');
})

const PORT = 5000;
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Todo Project'
    });
});

app.use('/api/', routes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});