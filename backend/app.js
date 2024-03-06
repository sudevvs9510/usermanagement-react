const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const debug = require('debug');
 
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter')
const db = require('./model/mongoose');
 

const app = express();
app.use(require('morgan')('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Profile',(express.static(path.join(__dirname, 'public/images'))))
app.use(cors());



app.use('/', userRouter);
app.use('/admin', adminRouter)


const port = normalizePort(process.env.PORT || '5000');
app.set('port', port)
const server = http.createServer(app)

server.listen(port)
server.on('error', onError);
server.on('listening', onListening)

function normalizePort(val){
   var port = parseInt(val,10);
   if(isNaN(port)){
      return val
   }

   if(port >=0){
      return port;
   }

   return false;
}


function onError(error) {
   if (error.syscall !== 'listen') {
       throw error;
   }

   var bind = typeof port === 'string'
       ? 'Pipe ' + port
       : 'Port ' + port;
   switch (error.code) {
       case 'EACCES':
           console.error(bind + ' requires elevated privileges');
           process.exit(1);
           break;
       case 'EADDRINUSE':
           console.error(bind + ' is already in use');
           process.exit(1);
           break;
       default:
           throw error;
   }
}

function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
       ? 'pipe ' + addr
       : 'port ' + addr.port;
   debug('Listening on ' + bind);
}

module.exports = app;