$('#nova-publicacao').on('submit', criarPublicacao)
$(document).on('click', '.curtir-publicacao', curtirPublicacao)
$(document).on('click', '.descurtir-publicacao', descurtirPublicacao)
$('#atualizar-publicacao').on('click', atualizarPublicacao)

function criarPublicacao(evento) {
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
  }).done(function () {
    window.location = '/home'
  }).fail(function (erro) {
    console.log(erro)
    alert('Erro ao criar a publicação!')
  })
}

function curtirPublicacao(evento) {
  evento.preventDefault()
  const elementoClicado = $(evento.target)
  const publicacaoID = elementoClicado.closest('div').data('publicacao-id')

  elementoClicado.prop('disabled', true)
  $.ajax({
    url: `/publicacoes/${publicacaoID}/curtir`,
    method: 'POST'
  }).done(function () {
    const contadorCurtidas = elementoClicado.next('span')
    const qtdCurtidas = parseInt(contadorCurtidas.text())

    contadorCurtidas.text(qtdCurtidas + 1)

    elementoClicado.addClass('descurtir-publicacao')
    elementoClicado.addClass('text-danger')
    elementoClicado.removeClass('curtir-publicacao')
  }).fail(function (erro) {
    alert('Erro ao curtir a publicação!')
  }).always(function () {
    elementoClicado.prop('disabled', false)
  })
}

function descurtirPublicacao(evento) {
  evento.preventDefault()
  const elementoClicado = $(evento.target)
  const publicacaoID = elementoClicado.closest('div').data('publicacao-id')

  elementoClicado.prop('disabled', true)
  $.ajax({
    url: `/publicacoes/${publicacaoID}/descurtir`,
    method: 'POST'
  }).done(function () {
    const contadorCurtidas = elementoClicado.next('span')
    const qtdCurtidas = parseInt(contadorCurtidas.text())

    contadorCurtidas.text(qtdCurtidas - 1)

    elementoClicado.addClass('curtir-publicacao')
    elementoClicado.removeClass('text-danger')
    elementoClicado.removeClass('descurtir-publicacao')
  }).fail(function (erro) {
    alert('Erro ao descurtir a publicação!')
  }).always(function () {
    elementoClicado.prop('disabled', false)
  })
}

function atualizarPublicacao(evento) {
  const btnPublicacao = $('#atualizar-publicacao')
  const publicacaoID = $(this).data('publicacao-id')
  
  btnPublicacao.prop('disabled', true)
  $.ajax({
    url: `/publicacoes/${publicacaoID}`,
    method: 'PUT',
    data: {
      titulo: $('#titulo').val(),
      conteudo: $('#conteudo').val()
    }
  }).done(function () {
    alert('Publicação atualizada!')
  }).fail(function (erro) {
    alert('Erro ao atualizar a publicação!')
  }).always(function () {
    btnPublicacao.prop('disabled', false)
  })
}