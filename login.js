// Função para verificar se o cliente está logado
function checkLoggedIn() {
    $.ajax({
        url: 'check_login.php',
        method: 'GET',
        dataType: 'json', // Especifica o tipo de dados esperado como JSON
        success: function(response) {
            console.log('Resposta do servidor:', response);
            if (response.logged_in === true) {
                console.log('Cliente está logado!');
            } else {
                console.log('Cliente não está logado. Redirecionando para login!');
                Swal.fire({
                    icon: 'error',
                    title: 'Login ainda não realizado!',
                    text: 'Por favor, crie uma conta ou faça login para acessar seu carrinho!',
                    showConfirmButton: true,
                }).then(function () {
                    // Após o usuário visualizar a mensagem, redirecione para a página de login
                    window.location.href = 'conta.html#info';
                });
            }
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}
// Verifica o login quando a página é carregada
$(document).ready(function() {
    console.log('Página carregada. Verificando se o cliente está logado...');
    checkLoggedIn();
});