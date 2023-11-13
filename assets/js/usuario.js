$('#parar-de-seguir').on('click', pararDeSeguir)
$('#seguir').on('click', seguir)
$('#editar-usuario').on('submit', editarUsuario)
$('#atualizar-senha').on('submit', atualizarSenha)
$('#deletar-usuario').on('click', deletarUsuario)

function pararDeSeguir() {
  const usuarioID = $('#parar-de-seguir').data('usuario-id')
  $(this).prop('disabled', true)
  $.ajax({
    url: `/usuarios/${usuarioID}/parar-de-seguir`,
    method: 'POST'
  }).done(function () {
    window.location = `/usuarios/${usuarioID}`
  }).fail(function () {
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
  }).fail(function () {
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
  }).fail(function () {
    Swal.fire("Ops...", "Erro ao editar o usuario!", "error")
  })
}

function atualizarSenha(evento) {
  evento.preventDefault()

  const senhaAtual = $('#senha').val()
  const novaSenha = {
    senha: $('#nova-senha').val(),
    confirmarSenha: $('#confirmar-senha').val()
  }

  if (novaSenha.senha !== novaSenha.confirmarSenha) {
    Swal.fire("Ops...", "As senhas devem ser iguais!", "error")
    return
  }

  $.ajax({
    url: '/atualizar-senha',
    method: 'POST',
    data: {
      atual: senhaAtual,
      nova: novaSenha.senha
    }
  }).done(function () {
    Swal.fire("Sucesso!", "Senha atualizada com sucesso!", "success").then(() => {
      window.location = '/perfil'
    })
  }).fail(function () {
    Swal.fire("Ops...", "Erro ao atualizar a senha!", "error")
  })
}

function deletarUsuario() {
  Swal.fire({
    title: 'Atenção!',
    text: 'Deseja mesmo deletar este usuário? Essa é uma ação irreversível!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Cancelar',
    focusCancel: true
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/deletar-usuario',
        method: 'DELETE'
      }).done(function () {
        Swal.fire("Sucesso!", "Usuário deletado com sucesso!", "success").then(() => {
          window.location = '/logout'
        })
      }).fail(function () {
        Swal.fire("Ops...", "Erro ao deletar o usuário!", "error")
      })
    }
  })
}