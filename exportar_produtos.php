<?php
$servername = "localhost";
$username = "u228502032_ecommerce";
$password = "Testeecommerce1234*";
$dbname = "u228502032_ecommerce";

// Cria a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta SQL para obter todos os produtos
$sql = "SELECT p.id AS codigo_produto, p.nome AS nome_produto, p.valor AS valor_produto, p.quantidade AS quantidade_existente,
  COALESCE(SUM(v.quantidade_vendida), 0) AS quantidade_vendida, (p.quantidade - COALESCE(SUM(v.quantidade_vendida), 0)) AS quantidade_restante
FROM produto p LEFT JOIN venda v ON p.nome = v.produto_nome GROUP BY p.id, p.nome, p.valor, p.quantidade ORDER BY quantidade_restante ASC";

// Executa a consulta
$result = $conn->query($sql);

// Verifica se há resultados
if ($result->num_rows > 0) {
    // Nome do arquivo CSV que será baixado
    $filename = "Produtos_" . date("Y-m-d") . ".csv";

    // Define os cabeçalhos para indicar que o arquivo é um CSV
    header('Content-Type: text/csv; charset=ISO-8859-1');
    header('Content-Disposition: attachment; filename=' . $filename);

    // Abre o arquivo CSV para escrita
    $output = fopen('php://output', 'w');

    // Escreve o cabeçalho do arquivo CSV
    fputcsv($output, ['Codigo', 'Nome','Valor', 'Existente', 'Vendida', 'Quantidade Restante'], ';', '"');

    // Itera sobre os resultados e adiciona cada linha ao arquivo CSV
    while($row = $result->fetch_assoc()) {
        // Convertendo os valores para ISO-8859-1
        foreach ($row as $key => $value) {
            $row[$key] = mb_convert_encoding($value, 'ISO-8859-1', 'UTF-8');
        }
        
        // Escrever a linha no arquivo CSV
        fputcsv($output, $row, ';', '"');
    }

    // Fecha o arquivo CSV
    fclose($output);
} else {
    // Se não houver produtos, exibe uma mensagem
    echo "Nenhum produto disponível";
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
