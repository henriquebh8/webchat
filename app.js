var app=require('./config/server');


var server=app.listen(80,function(){
    console.log("servidor online");
});

var io= require('socket.io').listen(server);   // instanciando o websocket para escutar na mesma porta que as requisições http

app.set('io', io);// variavel global de io

io.on('connection',function (socket){
// a function on serve pra iniciar a conexao do socket io server/cliente
console.log("usuário conectou");
io.on('disconnect',function (socket){   // o on escuta os eventos disparados
    console.log("usuário desconectou");
});
socket.on('msgParaServidor', function(data){
// atualizar as mensagens e o nome de quem enviou as mensagens

    socket.emit('msgParaCliente' ,   // dispara o evento
    {apelido :data.apelido ,
         mensagem:data.mensagem});

         socket.broadcast.emit('msgParaCliente' , 
         {apelido :data.apelido ,
              mensagem:data.mensagem});

              //atualizar os nomes dos participantes no chat
              socket.emit('participantesParaCliente' , 
              {apelido :data.apelido });
          
                   socket.broadcast.emit('participantesParaCliente' , 
                   {apelido :data.apelido});

});
});