$('#parar-de-seguir').on('click', pararDeSeguir)
$('#seguir').on('click', seguir)
$('#editar-usuario').on('submit', editarUsuario)

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

function editarUsuario(evento) {
  evento.preventDefault()

  const usuario = {
    nome: $('#nome').val(),
    email: $('#email').val(),
    nick: $('#nick').val()  
  }

  $.ajax({
    url: '/editar-usuario',
    method: 'PUT',
    data: usuario,
  }).done(function () {
    Swal.fire("Sucesso!", "Usuario editado com sucesso!", "success").then(() => {
      window.location = '/perfil'
    })
  }).fail(function (erro) {
    Swal.fire("Ops...", "Erro ao editar o usuario!", "error")
  })
}