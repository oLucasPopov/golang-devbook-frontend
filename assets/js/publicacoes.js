$('#nova-publicacao').on('submit', criarPublicacao)

function criarPublicacao(evento){
  evento.preventDefault()

  titulo = $('#titulo').val()
  conteudo = $('#conteudo').val()

  publicacao = {
    titulo,
    conteudo
  }

  $.ajax({
    url: '/publicacoes',
    method: 'POST',
    data: publicacao
  }).done(function(){
    window.location = '/home'
  }).fail(function(erro){
    console.log(erro)
    alert('Erro ao criar a publicação!')
  })
}