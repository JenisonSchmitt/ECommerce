<?php
    session_start();

    $servername = "localhost";
    $database = "u228502032_ecommerce";
    $username = "u228502032_ecommerce";
    $password = "Testeecommerce1234*";

    $cpf = $_POST['cpf'];
    $nome = $_POST['nome'];
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $nascimento = $_POST['nascimento'];
    $endereco = $_POST['endereco'];
    $senha = $_POST['senha'];

    try {
        // Cria a conexão
        $conn = new mysqli($servername, $username, $password, $database);

        // Verifica a conexão
        if ($conn->connect_error) { 
            die("Connection failed: " . $conn->connect_error);
        }

        // Prepara e executa a query para atualizar a senha do cliente
        $sql = "INSERT INTO cliente (CPF, nome, telefone, email, nascimento, endereco, senha) VALUES ('$cpf', '$nome', '$telefone', '$email', STR_TO_DATE('$nascimento','%d/%m/%Y'), '$endereco', '$senha')";
        
        $result = $conn->query($sql);

        // Se chegou até aqui, o cadastro foi realizado com sucesso
        $redirectSuccess = true;

        // Fecha a conexão
        $conn->close();
    } catch (Exception $e) {
        $redirectError = true;
    }
?>

<?php if (isset($redirectSuccess) && $redirectSuccess): ?>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado! Você ganhou um Desconto para sua Primeira Compra!',
            html: `
                <p>CUPOM: <strong id="cupomDesconto">CONSTRU10OFF</strong></p>
                <button id="copiarCupomBtn" class="input_login" type="button">Copiar Cupom</button>
                <p style="margin-top: 10px;">Faça login agora 👇</p>
            `,
            showConfirmButton: true,
        }).then(function () {
            window.location.href = 'login.html#logar';
        });

        // Adicionando a funcionalidade de copiar o cupom de desconto
        document.getElementById('copiarCupomBtn').addEventListener('click', function () {
            var cupomDesconto = document.getElementById('cupomDesconto').innerText;
            copyToClipboard(cupomDesconto);
        });

        // Função para copiar texto para a área de transferência
        function copyToClipboard(text) {
            var tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
        }
    });
    </script>
<?php elseif (isset($redirectError) && $redirectError): ?>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao criar usuário',
                text: 'CPF ou e-mail já existentes!',
                showConfirmButton: true,
            }).then(function () {
                window.location.href = 'login.html#logar';
            });
        });
    </script>
<?php endif; ?>