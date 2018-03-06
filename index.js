var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log(`a user connected:{id:${socket.client.id}}`);
    
    socket.on('disconnect', function(obj){
        console.log(`a user disconnected:${obj}`);
    });

    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
      });

    socket.on('chat message', function(msg){
        if (msg == null || msg.trim().length == 0){
            console.log('empty message dropped');
            return;
        }
        
        console.log(`chat message received:${msg}`);
        io.emit('chat message', msg);
    });
});
  

http.listen(3000, function(){
    console.log('listening on *:3000');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


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