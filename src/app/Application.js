const router=require('../router/Router')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socket=require('socket.io')



const app = express();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET', 'POST'],
    credentials:true
}))

app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://john123:john123@cluster0.sqtw7uq.mongodb.net/comp3133?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
    process.exit()
});

app.use(router)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend domain if known
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
const PORT = process.env.PORT || 8081;
const express_server=app.listen(PORT, () => { console.log('Server is running...') });


const ioServer = socket(express_server);

// const chatSection = ioServer.of('/chat');

ioServer.on('connection', (socket)=>{
    console.log(`new user connected: ${socket.id}`)
    socket.emit('welcome message', 'Hello, welcome to my server!')


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('username', data=>{
        console.log(data+' joined the server')
    });

    socket.on('room joined', data=>{
        console.log(data)
    })

    socket.on('message sent', data=>{
        console.log(data)
    })

})