const path = require('path')
const express = require('express')
const ctrller = require('./scripts/chat/Controller.js')
const cmodel = require('./scripts/chat/model/ChatModel.js')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {wsEngine : "ws"}).of('/KaiDan');


console.log(`EventsType:${JSON.stringify(cmodel.EventsType)}`);
// cmodel.EventsType.UsersChange = null;
// console.log(`EventsType:${JSON.stringify(cmodel.EventsType)}`);
// cmodel.EventsType = null;
// console.log(`EventsType:${JSON.stringify(cmodel.EventsType)}`);
// let a = cmodel.EventsType;
// a.UsersChange.UserExited = null;
// console.log(`EventsType:${JSON.stringify(a)}`);
// _EventsType = null;
// console.log(`EventsType:${JSON.stringify(cmodel.EventsType)}`);


console.log(`SocketEventsType:${JSON.stringify(cmodel.SocketEventsType)}`);

io.on(cmodel.SocketEventsType.connection, function(socket){
    console.log(`a user connected:{id:${socket.client.id}, avatarName:${socket.handshake.query.avatarName}}`);
    
    var c = new ctrller();
    socket.use(c.middlewareFn);

    socket.join('Ctl');
    socket.on(cmodel.SocketEventsType.disconnect, function(obj){
        console.log(`a user (${this.client.id}) disconnected:${obj}`);
        socket.leave('Ctl');
    });

    socket.on('Ctl', function (data) {
        console.log(`Ctl:${JSON.stringify(data)} from ${this.id}`);
      });
    socket.broadcast.emit('UserConnect', { senderid:'ChatService', hello: 'world2', userid:socket.client.id });

    socket.on(cmodel.EventsType.ChatMessage, function(msg){
        if (msg == null){
            console.log(`${cmodel.EventsType.ChatMessage} dropped:empty message object`);
            return;
        }

        if (!msg.senderid){
            console.log(`${cmodel.EventsType.ChatMessage} dropped:empty senderid`);
            return;
        }

        if (!msg.msg){
            console.log(`${cmodel.EventsType.ChatMessage} dropped:empty message content`);
            return;
        }

        console.log(`${cmodel.EventsType.ChatMessage} received:${JSON.stringify(msg)}`);
        io.emit(cmodel.EventsType.ChatMessage, msg);
    });
});
  

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.use('/', express.static(path.join(__dirname, 'webroot')))

