const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');


async function init(){
    const httServer = http.createServer();
    const PORT = process.env.PORT || 5000;

    const io = new Server(httServer, {
        cors: {
            origin: '*',
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });

        cookieParser()(socket.request, socket.request.res, ()=>{
            console.log('cookies', socket.request.headers.token);
        })
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });
    });

    httServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

init();