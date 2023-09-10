require('dotenv').config();
const { Server } = require('socket.io');

const connectDB = require('./config/db');

try{
    connectDB(process.env.MONGO_URI);
    console.log('DB connected')
}catch(err){
    console.log(err);
    return;
}


const PORT = process.env.PORT || 2200;

const io = new Server(PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    console.log('connected');
    socket.on('get-document', documentId => {
        const data = '';
        socket.join(documentId);
        socket.to(documentId).emit('load-document',data);

        socket.on('send-changes', delta => {
            console.log(delta);
            socket.broadcast.to(documentId).emit('recieve-changes', delta);
        })
    })

});