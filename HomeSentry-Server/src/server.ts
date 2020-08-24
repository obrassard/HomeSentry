import * as bodyParser from 'body-parser';
import express, { Response, Request } from "express";
import ioserver from 'socket.io';
var jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;

const app = express();

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});
app.use(expressSession);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (req:Request, res:Response) => {
    res.json({endpoint: 'HomeSentry API - v1.0'});
});

app.use('/users', require('./users/users.controller'));

const http = require("http").Server(app);
const io = ioserver(http);
const { JWT_SECRET } = require('./constants');

io.on('connection', (socket) => {
    socket.on('mobile-connect', (token) => {
        if (token) {
            try {
                var decoded = jwt.verify(token, JWT_SECRET);
                let uid = `uid:${decoded.sub}`;
                console.log(`Cam connected : ${uid}`)
                socket.join(uid); // Join user's "room"
                io.to(uid).emit('cam-registered', socket.id);
            } catch(err) {
                console.error('Authentication error, dropping this request')
            }
        }
    });

    socket.on('cam-sync', (camSocketId, streamId) => {
        console.log(`Cam joined : ${streamId}`)
        io.to(camSocketId).emit('stream-target', streamId);
    })

    socket.on('dashboard', (token, streamId) => {
        if (token) {
            try {
                var decoded = jwt.verify(token, JWT_SECRET);
                let uid = `uid:${decoded.sub}`;
                socket.join(uid);
                io.to(uid).emit('stream-target', streamId);
            } catch(err) {
                console.error(err)
                console.error('Authentication error, dropping this request')
            }
        }
    })
});

http.listen(PORT);  
console.log(`App listening on the port ${PORT}`);