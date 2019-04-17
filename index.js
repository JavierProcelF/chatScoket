const path = require('path');//modulo de nodejs para unir rutas/directorios - dirname
const express = require('express');//requerir express /es un servidor
const app=express();//almacenar objeto express
//settings
app.set('port',process.env.PORT || 3000);//configurar o almacenar el puerto del S.O. - process.env.PORT o sino port 3000
//static files como index.html no cambian
app.use(express.static(path.join(__dirname,'public')));//para enviar archivos estaticos al navegador,..._dirname para enviar ruta de archivos, modulo path para encontrar carpeta en cualquier S.O con modulo join donde va el resto de la direccion
//start the server
const server=app.listen(app.get('port'),()=>{//utilizar puerto, constante server para inicializar el puerto que va a socketIo
    console.log('server on port',app.get('port'));//mostrar por consola el numero de puerto
});
//websocket
const socketIo=require('socket.io');//requirir socket io para chat en tiempo real
const io=socketIo(server);//recibe la configuracion del chat y app tiene el condigo del servidor, io ya mantiene la conexion de socket
io.on('connection',(socket)=>{//cuando alguien se conecte se ejecuta , se envia un evento, recibimos socket del cliente e chat.js
    console.log('New Connection',socket.id);
    socket.on('chat:message', (data)=>{//se recibe los datos del cliente chat.js
        io.sockets.emit('chat:message',data);//se emite el mensaje a todos los usuarios
    });
    socket.on('chat:typing',(data)=>{//escucho el mensaje de que alguien esta tipiando
        socket.broadcast.emit('chat:typing',data);//broadcast emito a todo excepto a mi o sino es emit para todos
    });
});

