$('#login').on('submit', fazerLogin)

function fazerLogin(evento){
  evento.preventDefault()

  var email = $('#email').val()
  var senha = $('#senha').val()

  login = {
    email,
    senha
  }

  $.ajax({
    url: '/login',
    method: 'POST',
    data: login
  }).done(function(){
    window.location = '/home'
  }).fail(function(erro){
    console.log(erro)
    alert('Erro ao realizar o login!')
  })
}