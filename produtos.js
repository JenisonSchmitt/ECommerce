$(document).ready(function () {
    var entrega = "(Verificar opções de entrega)";
    $('h6.entrega').text(entrega);

    var parcelamento = "(Parcelamento em até 3x sem juros)";
    $('h6.parcelamento').text(parcelamento);

    var desconto = "Desconto de 5% com pagamento no Pix!";
    $('h6.desconto').text(desconto);

});

$(document).ready(function () {
    // Fazer uma solicitação AJAX para buscar todos os hidratantes
    $.ajax({
        url: '../buscar_produtos_site.php',
        dataType: 'json',
        success: function (data) {
            // Iterar sobre os produtos e adicionar os dados aos elementos HTML correspondentes
            data.forEach(function (produto) {
                // Adicionar os dados ao elemento com base no nomehtml
                var elemento = $('#' + produto.nomehtml);
                elemento.find('h2').text(produto.nome);
                elemento.find('h5').text(produto.descricao);
                // Usar toFixed para formatar o valor com duas casas decimais
                var valorFormatado = parseFloat(produto.valor).toFixed(2);
                // Adicionar o valor formatado ao h4
                elemento.find('h4').text('R$ ' + valorFormatado);
                elemento.find('h3.marca').text('Marca: ' + produto.marca);
                elemento.find('h5.quantidade').text('Conteúdo: ' + produto.quantidade);
                if (produto.quantidade_restante >= 1) {
                    elemento.find('h6.disponivel').text("Produto disponível para entrega imediata").css('color', 'black');
                } else {
                    elemento.find('h6.disponivel').text("Produto esgotado no momento").css('color', 'red');
                }
            });
        }
    });
});

function addToCart(productId) {
    // Modificado para encontrar o input de quantidade corretamente
    var quantityInput = $('#' + productId).find('.quantity-input');
    var quantity = quantityInput.val();
    var price = $('#' + productId).find('h4.preco').text().trim();
    var productName = $('#' + productId).find('h2.titulo').text().trim();

    var disponibilidade = $('#' + productId).find('h6.disponivel').text().trim();
    if (disponibilidade === "Produto esgotado no momento") {
        Swal.fire({
            icon: 'error',
            title: 'Produto esgotado!',
            text: 'Este produto está esgotado no momento.',
            showConfirmButton: false,
            timer: 1000
        });
        return; // Sair da função se o produto estiver esgotado
    }

    console.log('Produto ID:', productName);  // Agora exibindo o "Produto ID" como o conteúdo do h3.titulo
    console.log('Quantidade:', quantity);
    console.log('Preço:', price);

    var cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Armazena o preço como um número
    price = parseFloat(price.replace('R$ ', ''));

    cart[productName] = {  // Usando o conteúdo do h3.titulo como "Produto ID"
        label: productName,
        quantity: quantity,
        price: price
    };

    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
        icon: 'success',
        title: 'Produto adicionado ao carrinho!',
        showConfirmButton: false, // Não exibe o botão de confirmação
        timer: 1000 // Tempo em milissegundos antes de fechar automaticamente (1,5 segundos neste caso)
    });
}

    $('.button_car').on('click', function () {
        var productLabel = $(this).closest('.portfolio-item').find('.titulo').text();
        var productId = $(this).closest('.portfolio-item').attr('id');

        // Chame a função com os parâmetros necessários
        addToCart(productLabel, productId);
    });