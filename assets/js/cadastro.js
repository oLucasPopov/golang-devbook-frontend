$('#formulario-cadastro').on('submit', criarUsuario)

function criarUsuario(evento){
  evento.preventDefault()

  let nome = $('#nome').val()
  let email = $('#email').val()
  let nick = $('#nick').val()
  let senha = $('#senha').val()
  let confirmarSenha = $('#confirmar-senha').val()

  if (senha !== confirmarSenha) {
    Swal.fire("Ops...", "As senhas devem ser iguais!", "error")
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
    Swal.fire("Sucesso!", "Usuário cadastrado com sucesso!", "success")
    .then(() => {
      $.ajax({
        url: '/login',
        method: 'POST',
        data: {
          email,
          senha
        }
      }).done(()=>{
        window.location = '/home'
      }).fail(()=>{
        Swal.fire("Ops...", "Erro ao autenticar o usuário!", "error")
      })
    })
  }).fail(function(erro){
    Swal.fire("Ops...", "Erro ao cadastrar o usuário!", "error")
  })
}