<?php
$servername = "localhost";
$username = "u228502032__ldl";
$password = "#ldlLujinha_2519";
$dbname = "u228502032_Lujinha";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if (isset($_POST['cpf'])) {
    $cpf = $_POST['cpf'];

    $sql = "SELECT `produto`.`codigo`, `produto`.`nome` AS `nome_produto`, `produto`.`valor`, `cliente`.`nome` AS `nome_cliente`, `cliente`.`CPF`, `venda`.`dia`, `venda`.`quantidade_vendida` AS venda_dia
            FROM `produto` 
            JOIN `venda` ON `venda`.`produto_nome` = `produto`.`nome` 
            JOIN `cliente` ON `venda`.`cliente_nome` = `cliente`.`nome` 
            WHERE `cliente`.`CPF` = '$cpf'";

    $result = $conn->query($sql);

    echo "<table class='product-table'>";
    echo "<thead><tr><th>Código</th><th>Nome Produto</th><th>Quantidade</th><th>Valor Unitário</th><th>Nome Cliente</th><th>CPF Cliente</th><th>Dia da Venda</th></tr></thead>";
    echo "<tbody>";
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["codigo"] . "</td>";
            echo "<td>" . $row["nome_produto"] . "</td>";
            echo "<td>" . $row["venda_dia"] . "</td>"; // Alterado de "dia" para "venda_dia"
            echo "<td>" . $row["valor"] . "</td>";
            echo "<td>" . $row["nome_cliente"] . "</td>";
            echo "<td>" . $row["CPF"] . "</td>";
            echo "<td>" . $row["dia"] . "</td>"; // Alterado de "venda_dia" para "dia"
            echo "</tr>";
        }
    } else {
        echo "<tr><td colspan='7'>Nenhuma venda disponível para este CPF</td></tr>";
    }
    
    echo "</tbody></table>";
}

$conn->close();
?>
