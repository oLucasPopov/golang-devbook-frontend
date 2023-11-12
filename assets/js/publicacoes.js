$('#nova-publicacao').on('submit', criarPublicacao)
$('.curtir-publicacao').on('click', curtirPublicacao)

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

function curtirPublicacao(evento){
  evento.preventDefault()
  const elementoClicado = $(evento.target)
  const publicacaoID = elementoClicado.closest('div').data('publicacao-id')

  elementoClicado.prop('disabled', true)
  $.ajax({
    url: `/publicacoes/${publicacaoID}/curtir`,
    method: 'POST'
  }).done(function(){
    const contadorCurtidas = elementoClicado.next('span')
    const qtdCurtidas = parseInt(contadorCurtidas.text())

    contadorCurtidas.text(qtdCurtidas + 1)
  }).fail(function(erro){
    alert('Erro ao curtir a publicação!')
  }).always(function(){
    elementoClicado.prop('disabled', false)
  })
}