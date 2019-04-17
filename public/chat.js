const socket=io('https://javierprocelf.github.io/chatSocket/public/')//io para comunicacion bidireccional, este es del lado de html // en caso de no conectarse se pone io('http://midominio.com') - socket guarda todo el frontEnd para enviar al servidor 
//DOM Elements of html
let message=document.getElementById('chatM');//llamamos a traves del documento la variable chatM de mensaje
let username=document.getElementById('chatU');
let button=document.getElementById('send');
let output=document.getElementById('chatO');
let actions=document.getElementById('chatA');
button.addEventListener('click',()=>{//se le agrega al boton el evento click
    socket.emit('chat:message',{//se creo el evento chat:message y se va a enviar los datos
        message: message.value,
        username:username.value
    });
})
message.addEventListener('keypress',()=>{//keypress para indicar que esta tipiando agregando el evento a traves de message
    socket.emit('chat:typing',username.value)//sel envio username que es el input 
});
socket.on('chat:message',(data)=>{//recibe los datos del servidor index.js, += para que se agregen las etiquetas p en el div de ondex.html
    actions.innerHTML='';//para limpiar el esta tipiando cuando ya envie el mensaje
    output.innerHTML+=`<p>
    <strong>${data.username}</strong>:${data.message}
    </p>`
});
socket.on('chat:typing',(data)=>{//escuchar los datos del servidor index.html de esta escribiendo, innerHTML colocar en el HTML como contenido
    actions.innerHTML=`<p><em>${data} esta escribiendo...</em></p>`
});