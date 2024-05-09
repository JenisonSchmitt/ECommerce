// Função para verificar se o cliente está logado
function checkLoggedIn() {
    $.ajax({
        url: 'check_login.php',
        method: 'GET',
        dataType: 'json', // Especifica o tipo de dados esperado como JSON
        success: function(response) {
            console.log('Resposta do servidor:', response);
            if (response.logged_in === true) {
                console.log('Cliente está logado. Redirecionando para conta.html');
                window.location.href = 'conta.html#info';
            } else {
                console.log('Cliente não está logado.');
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