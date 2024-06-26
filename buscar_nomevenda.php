<?php
// Configurações do banco de dados
$servername = "localhost";
$username = "u228502032_ecommerce";
$password = "Testeecommerce1234*";
$dbname = "u228502032_ecommerce";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Recupera o termo de pesquisa enviado por AJAX
$termoPesquisa = $_GET['term'];

// Prepara a consulta SQL
$sql = "SELECT `cliente_nome` FROM `venda` WHERE `cliente_nome` LIKE '%$termoPesquisa%'";

// Executa a consulta
$result = $conn->query($sql);

// Verifica se a consulta foi bem-sucedida
if (!$result) {
    die("Erro na consulta: " . $conn->error);
}

// Inicializa o array de opções
$options = array();

// Adiciona as opções com base nos produtos do banco de dados
while ($row = $result->fetch_assoc()) {
    $options[] = $row["cliente_nome"];
}

// Retorna as opções como um JSON
echo json_encode($options);

// Fecha a conexão
$conn->close();
?>
