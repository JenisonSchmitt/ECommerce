<?php
    // Verifica se o cupom foi recebido via POST
    if(isset($_POST['cupom'])) {
        // Defina as configurações de conexão com o banco de dados
        $servername = "localhost";
        $database = "u228502032_ecommerce";
        $username = "u228502032_ecommerce";
        $password = "Testeecommerce1234*";
    
        // Estabelece a conexão com o banco de dados
        $conn = new mysqli($servername, $username, $password, $database);
        
        $conn->query("SET time_zone = '-03:00'");
    
        // Verifica se a conexão foi bem sucedida
        if ($conn->connect_error) {
            die("Conexão falhou: " . $conn->connect_error);
        }
    
        // Recebe o cupom enviado
        $cupom = $_POST['cupom'];
    
        // Consulta o banco de dados para obter o desconto correspondente ao cupom
        $sql = "SELECT desconto FROM cupons WHERE nome = '$cupom'";
        $result = $conn->query($sql);
    
        // Verifica se o cupom foi encontrado no banco de dados
        if ($result->num_rows > 0) {
            // Cupom encontrado, obtém o desconto
            $row = $result->fetch_assoc();
            $desconto = $row['desconto'];
    
            // Retorna o desconto como resposta
            echo $desconto;
        } else {
            // Cupom não encontrado
            echo "Erro: Cupom inválido!";
        }
    
    } else {
        // Se o cupom não foi recebido, retorna uma mensagem de erro
        echo "Erro: Cupom não recebido!";
    }
    // Fecha a conexão com o banco de dados
    $conn->close();
?>

