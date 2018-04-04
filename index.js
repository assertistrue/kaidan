const path = require('path')
const express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http).of('/KaiDan');

io.on('connection', function(socket){
    console.log(`a user connected:{id:${socket.client.id}}`);
    
    socket.on('disconnect', function(obj){
        console.log(`a user (${this.client.id}) disconnected:${obj}`);
        // socket.emit('Ctrl', { act: 'disconnect', userid: this.client.id, serverid: this.id });
    });

    socket.on('Ctrl', function (data) {
        console.log(`Ctrl:${JSON.stringify(data)} from ${this.id}`);
      });
    socket.emit('Ctrl', { senderid:'ChatService', hello: 'world2' });

    socket.on('chat message', function(msg){
        if (msg == null){
            console.log('message dropped:empty message object');
            return;
        }

        if (!msg.senderid){
            console.log('message dropped:empty senderid');
            return;
        }

        if (!msg.msg){
            console.log("message dropped:empty message content");
            return;
        }

        console.log(`chat message received:${JSON.stringify(msg)}`);
        io.emit('chat message', msg);
    });
});
  

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.use('/', express.static(path.join(__dirname, 'webroot')))

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });


//   const port = 3000
  
//   const requestHandler = (request, response) => {
//     console.log(request.url)
//     response.end('Hello Node.js Server!')
//   }
  
//   const server = http.createServer(requestHandler)
  
//   server.listen(port, (err) => {
//     if (err) {
//       return console.log('something bad happened', err)
//     }
  
//     console.log(`server is listening on ${port}`)
//   })