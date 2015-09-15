var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

/*var position = 250;
var speed = 0;*/

var contador = 0;
var player1 = new player(1);
var player2 = new player(2);

app.listen(5000);

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

  contador++;
  console.log(contador);
  socket.emit('newPlayer', { player: contador } );



  setTimeout(function(){ setInterval(function(){ 
    player1.position += player1.speed;
    player2.position += player2.speed;
    socket.emit('position', { position1: player1.position,  position2: player2.position});
  }, 33); }, 3000);

  

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('up', function(data) {
  	if (data.player == 1) {
    	player1.speed = -5;
  	}
  	else{
  		player2.speed = -5;
  	}
  });

  socket.on('down', function(data) {
    if (data.player == 1) {
    	player1.speed = 5;
  	}
  	else{
  		player2.speed = 5;
  	}
  });

  socket.on('stop', function(data) {
    if (data.player == 1) {
    	player1.speed = 0;
  	}
  	else{
  		player2.speed = 0;
  	}
  });
});