$('#parar-de-seguir').on('click', pararDeSeguir)
$('#seguir').on('click', seguir)

function pararDeSeguir() {
  const usuarioID = $('#parar-de-seguir').data('usuario-id')
  $(this).prop('disabled', true)
  $.ajax({
    url: `/usuarios/${usuarioID}/parar-de-seguir`,
    method: 'POST'
  }).done(function () {
    window.location = `/usuarios/${usuarioID}`
  }).fail(function (erro) {
    Swal.fire("Ops...", "Erro ao parar de seguir!", "error")
    $('#parar-de-seguir').prop('disabled', false)
  })
}

function seguir() {
  const usuarioID = $('#seguir').data('usuario-id')
  $(this).prop('disabled', true)
  $.ajax({
    url: `/usuarios/${usuarioID}/seguir`,
    method: 'POST'
  }).done(function () {
    window.location = `/usuarios/${usuarioID}`
  }).fail(function (erro) {
    Swal.fire("Ops...", "Erro ao seguir usuário!", "error")
    $('#seguir').prop('disabled', false)
  })
}