var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

/*var position = 250;
var speed = 0;*/

var contador = 0;

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

function player(id) {
	this.id = id;
	this.position = 250;
	this.speed = 0;
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });



  setTimeout(function(){ setInterval(function(){ 
    position += speed;
    socket.emit('position', { position: position });
  }, 33); }, 3000);

  

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('up', function(data) {
    speed = -5;
  });

  socket.on('down', function(data) {
    speed = 5;
  });

  socket.on('stop', function(data) {
    speed = 0;
  });
});