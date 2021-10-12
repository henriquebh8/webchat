module.exports.iniciaChat=function(app,req,res){


    var dadosForm=req.body;
    req.assert('apelido', ' nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', ' nome ou apelido deve ter entre 3 e 20 caracteres').len(3,20);
    
    var erros=req.validationErrors();
    if(erros){
       res.render("index",{validacao: erros})
        return;
    }
app.get('io').emit('msgParaCliente',{apelido:dadosForm.apelido, mensagem:'acabou de entrar no chat'});// recuperando a variavel global criada em app
    res.render('chat',{dadosForm: dadosForm});

}