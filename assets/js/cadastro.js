$('#formulario-cadastro').on('submit', criarUsuario)

function criarUsuario(evento){
  evento.preventDefault()

  let nome = $('#nome').val()
  let email = $('#email').val()
  let nick = $('#nick').val()
  let senha = $('#senha').val()
  let confirmarSenha = $('#confirmar-senha').val()

  if (senha !== confirmarSenha) {
    alert('As senhas devem ser iguais!')
    return
  }

  let usuario = {
    nome,
    email,
    nick,
    senha
  }
  
  $.ajax({
    url: '/usuarios',
    method: 'POST',
    data: usuario,
  }).done(function(){
    alert('Usuário criado com sucesso!')
  }).fail(function(erro){
    console.log(erro)
    alert('Erro ao criar o usuário!')
  })
}