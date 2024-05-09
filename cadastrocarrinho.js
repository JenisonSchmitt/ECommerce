function cadastrarVenda(){
    var cart = JSON.parse(localStorage.getItem('cart')) || {};
    // Itera sobre os itens do carrinho para construir o array de produtos
    for (var productId in cart) {
        var item = cart[productId];
        produtos.push({
            nome_produto: item.label,
            quantidade: item.quantity,
            preco_total: parseFloat(item.price) * parseInt(item.quantity)
        });
    }

    // Exibe os dados dos produtos no console para verificação
    console.log('Dados dos produtos do carrinho:', produtos);

    // Realiza a chamada AJAX para enviar os dados dos produtos do carrinho para venda_site.php
    $.ajax({
        url: 'venda_site.php',
        method: 'POST',
        data: { cart: produtos },
        success: function(response) {
            console.log('Resposta do servidor:', response);
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
            console.log('Status da requisição:', status);
            console.log('XHR:', xhr);
        }
    });
}