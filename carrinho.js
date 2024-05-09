// Declaração global da variável totalPrice
var totalPrice = 0;
            
document.addEventListener("DOMContentLoaded", function () {

    function removeFromCart(productName) {
        console.log('Removendo produto com nome:', productName); // Adicionando um log para verificar o nome do produto

        var cart = JSON.parse(localStorage.getItem('cart')) || {};

        // Itera sobre os itens do carrinho
        for (var productId in cart) {
            var item = cart[productId];
            if (item.label === productName) {
                delete cart[productId];
                break; // Encerra o loop após remover o item encontrado
            }
        }

        console.log('Carrinho após a remoção:', cart); // Adicionando um log para verificar o carrinho após a remoção

        // Atualiza o carrinho no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualiza a exibição do carrinho
        displayCart();
    }

    // Use a função on() do jQuery para lidar com cliques nos botões de remoção
    $(document).on('click', '.btn-delete', function() {
        var productName = $(this).closest('tr').find('td:first').text(); // Obtém o nome do produto na mesma linha do botão
        removeFromCart(productName);
    });

    // Função para exibir os itens do carrinho na tabela
    function displayCart() {
        var cart = JSON.parse(localStorage.getItem('cart')) || {};
        var cartItems = Object.values(cart);

        // Limpa a lista de itens do carrinho
        $('#cartTableBody').empty();

        // Reinicia totalPrice
        totalPrice = 0;

        // Itera sobre os itens do carrinho
        cartItems.forEach(function(item) {
            var itemTotal = parseFloat(item.price) * parseInt(item.quantity);
            totalPrice += itemTotal;

            // Adiciona o item ao carrinho na tabela
            var row = '<tr>' +
                '<td>' + item.label + '</td>' +
                '<td>' + item.quantity + '</td>' +
                '<td>R$ ' + item.price + '</td>' +
                '<td>R$ ' + itemTotal.toFixed(2) + '</td>' +
                '<td><button class="btn-delete"></button></td>' + // Removido o atributo data-product-id
                '</tr>';
            $('#cartTableBody').append(row);
        });

        // Exibe o preço total
        $('#totalPrice').text('Total: R$ ' + totalPrice.toFixed(2));
        
        finalPrice = totalPrice.toFixed(2);
        
        // Adiciona a última linha com o valor total ao final da tabela separadamente
        var lastRow = '<tr>' +
            '<td colspan="3" class="text-end"><strong>Total:</strong></td>' +
            '<td><strong>R$ ' + totalPrice.toFixed(2) + '</strong></td>' +
            '<td></td>' + // Coluna vazia para não interferir na remoção
            '</tr>';
        $('#cartTableBody').append(lastRow);
    }

    function addToCart(product) {
        var cart = JSON.parse(localStorage.getItem('cart')) || {};

        if (cart[product.id]) {
            // Se o produto já existe no carrinho, apenas atualize a quantidade
            cart[product.id].quantity += 1;
        } else {
            // Se o produto não existe, adicione ao carrinho com todas as informações necessárias
            cart[product.id] = {
                label: product.label,
                quantity: 1,
                price: product.price  // Certifique-se de incluir o preço aqui
            };
        }

        // Salve o carrinho atualizado no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualize a exibição do carrinho
        displayCart();
    }

    // Função para finalizar a compra (enviar mensagem no WhatsApp)
    function finalizeWhats() {
        var cart = JSON.parse(localStorage.getItem('cart')) || {};
        var mensagem = 'Oi, gostaria de finalizar a compra com os seguintes produtos:';

        for (var productId in cart) {
            var item = cart[productId];
            console.log('Item:', item);  // Adicione esta linha para verificar os itens no console
            mensagem += '\n- ' + item.label + ', Quantidade: ' + item.quantity;
        }

        var linkWhatsApp = 'https://api.whatsapp.com/send?phone=48991723006&text=' + encodeURIComponent(mensagem);
        window.location.href = linkWhatsApp;
    }

    function finalizeCre() {
        var cart = JSON.parse(localStorage.getItem('cart')) || {};
        var mensagem = 'Oi, realizei o pagamento via Cartão de Crédito dos seguintes produtos:';

        for (var productId in cart) {
            var item = cart[productId];
            console.log('Item:', item);  // Adicione esta linha para verificar os itens no console
            mensagem += '\n- ' + item.label + ', Quantidade: ' + item.quantity;
        }

        var linkWhatsApp = 'https://api.whatsapp.com/send?phone=48991723006&text=' + encodeURIComponent(mensagem);
        window.location.href = linkWhatsApp;
    }
    
    function finalizePix(precoFinal) {
        // Aqui você pode usar o preço final (com desconto) para o pagamento via PIX
        console.log("Preço final com desconto:", precoFinal);
        var cart = JSON.parse(localStorage.getItem('cart')) || {};
        var mensagem = 'Oi, realizei o pagamento via PIX dos seguintes produtos:';

        for (var productId in cart) {
            var item = cart[productId];
            console.log('Item:', item);  // Adicione esta linha para verificar os itens no console
            mensagem += '\n- ' + item.label + ', Quantidade: ' + item.quantity;
        }

        var linkWhatsApp = 'https://api.whatsapp.com/send?phone=48991723006&text=' + encodeURIComponent(mensagem);
        window.location.href = linkWhatsApp;
    }

    function limparCarrinho() {
        // Limpa o carrinho no localStorage
        localStorage.removeItem('cart');

        // Atualiza a exibição do carrinho
        displayCart();
    }

    // Expondo as funções globalmente
    window.addToCart = addToCart;
    window.limparCarrinho = limparCarrinho;
    window.finalizeWhats = finalizeWhats;
    window.finalizeCre = finalizeCre;
    window.finalizePix = finalizePix;
    window.removeFromCart = removeFromCart;


    // Atualize a exibição do carrinho ao carregar a página
    displayCart();
});