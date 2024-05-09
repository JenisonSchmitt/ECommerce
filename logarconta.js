// Função para verificar se o cliente está logado
function checkLoggedIn() {
    $.ajax({
        url: 'check_login.php',
        method: 'GET',
        dataType: 'json', // Especifica o tipo de dados esperado como JSON
        success: function(response) {
            console.log('Resposta do servidor:', response);
            if (response.logged_in === true) {
                console.log('Cliente está logado! Apresentando informações.');
            } else {
                console.log('Cliente não está logado.');
                window.location.href = 'login.html#logar';
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

$(document).ready(function() {
    // Quando o documento estiver pronto, faz uma requisição AJAX para obter as informações do cliente
    $.ajax({
        url: 'buscar_cliente_info.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Exibe os dados do cliente no console para depuração
            console.log(data);
            
            // Verifica se há erro na resposta
            if (data.error) {
                // Se houver erro, exibe a mensagem de erro na seção #clienteInfo
                $('#clienteInfo').html('<p>' + data.error + '</p>');
            } else {
                // Se não houver erro, insere as informações do cliente na seção #clienteInfo
                $('#clienteInfo').html(`
                    <div class="client-info">
                        <br>
                        <h3 class="center">Informações do Cliente</h3>
                        <ul>
                            <li><strong>Nome:</strong> ${data.nome}</li>
                            <li><strong>Telefone:</strong> ${data.telefone}</li>
                            <li><strong>Email:</strong> ${data.email}</li>
                            <li><strong>Data de Nascimento:</strong> ${data.nascimento}</li>
                            <li><strong>Endereço:</strong> ${data.endereco}</li>
                        </ul>
                    </div>
                `);
            }
        },
        error: function(xhr, status, error) {
            // Se ocorrer um erro na requisição, exibe uma mensagem de erro na seção #clienteInfo
            $('#clienteInfo').html('<p>Erro ao carregar informações do cliente.</p>');
            console.error("Erro na requisição AJAX:", error);
        }
    });
});
