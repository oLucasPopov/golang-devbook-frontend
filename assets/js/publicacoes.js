$('#nova-publicacao').on('submit', criarPublicacao)
$(document).on('click', '.curtir-publicacao', curtirPublicacao)
$(document).on('click', '.descurtir-publicacao', descurtirPublicacao)
$('#atualizar-publicacao').on('click', atualizarPublicacao)
$('.deletar-publicacao').on('click', deletarPublicacao)


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
    data: publicacao,
    complete: function (xhr, status) {
      if (xhr.status === 201) {
        window.location = '/home'
      } else {
        Swal.fire("Ops...", "Erro ao criar a publicação!", "error")
      }
    }
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
    Swal.fire("Ops...", "Erro ao curtir a publicação!", "error")
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
    Swal.fire("Ops...", "Erro ao descurtir a publicação!", "error")
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
    Swal.fire("Sucesso!", "Publicação atualizada com sucesso!", "success")
      .then(() => {
        window.location = '/home'
      })
  }).fail(function (erro) {
    Swal.fire("Ops...", "Erro ao atualizar a publicação!", "error")
  }).always(function () {
    btnPublicacao.prop('disabled', false)
  })
}

function deletarPublicacao(evento) {
  evento.preventDefault()

  Swal.fire({
    title: 'Atenção!',
    title: 'Deseja mesmo deletar esta publicação?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Cancelar',
    focusCancel: true
  }).then((result) => {
    if (!result.isConfirmed) return

    const elementoClicado = $(evento.target)
    const publicacao = elementoClicado.closest('div')
    const publicacaoID = publicacao.data('publicacao-id')

    elementoClicado.prop('disabled', true)
    $.ajax({
      url: `/publicacoes/${publicacaoID}`,
      method: 'DELETE'
    }).done(function () {
      publicacao.fadeOut("slow", () => {
        publicacao.remove()
      })
    }).fail(function (erro) {
      Swal.fire("Ops...", "Erro ao deletar a publicação!", "error")
    }).always(function () {
      elementoClicado.prop('disabled', false)
    })
  })


}
