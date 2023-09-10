const {Server} = require('socket.io');

const PORT = process.env.PORT || 2200;

const io = new Server(PORT,{
    cors:{
        origin: '*',
        methods: ['GET','POST']
    }
});

io.on('connection',socket =>{
    console.log('connected');
    socket.on('send-changes',delta=>{
        console.log(delta);
        socket.broadcast.emit('recieve-changes',delta);
    })
});