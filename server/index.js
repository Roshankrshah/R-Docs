require('dotenv').config();
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const {getDocument,updateDocument} = require('./controller/documentController');

connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT || 2200;

const io = new Server(PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    console.log('connected');
    socket.on('get-document', async (documentId) => {
        const document = await getDocument(documentId);

        socket.join(documentId);
        socket.emit('load-document',document.data);

        socket.on('send-changes', delta => {
            console.log(delta);
            socket.broadcast.to(documentId).emit('recieve-changes', delta);
        })

        socket.on('save-document',async(data)=>{
            await updateDocument(documentId,data);
        })
    })

});