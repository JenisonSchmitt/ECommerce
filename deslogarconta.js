$(document).ready(function() {
    // Adiciona um evento de clique ao botão de logout
    $("#logoutBtn").click(function() {
        // Envia uma solicitação AJAX para check_logout.php com o parâmetro de logout
        $.ajax({
            url: 'check_logout.php', // Altere para o arquivo que irá processar o logout
            method: 'POST',
            success: function(response) {
                // Redireciona o usuário para a página de login após sair da conta
                window.location.href = 'login.html#logar';
            },
            error: function(xhr, status, error) {
                console.error('Erro ao sair da conta:', error);
            }
        });
    });
});