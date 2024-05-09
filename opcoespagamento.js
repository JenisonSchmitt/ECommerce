var produtos = [];
        
// Função para mostrar as opções de pagamento
function showPaymentOptions() {
    Swal.fire({
        title: 'Selecione a forma de pagamento',
        showCancelButton: false,
        confirmButtonText: 'Voltar',
        html: `
            <button class="input_login center" type="submit" id="cartaoCreditoBtn">Cartão de Crédito</button><br>
            <button class="input_login center" type="submit" id="pixBtn">PIX</button><br>
            <button class="input_login center" type="submit" id="whatsappBtn">Conversar no WhatsApp</button><br>
        `
    });

    document.getElementById('cartaoCreditoBtn').addEventListener('click', function() {
        // Use o preço total como o valor a ser pago
        var totalPriceFormatted = parseFloat(finalPrice).toFixed(2).replace('.', ',');
        var url = 'https://pay.infinitepay.io/lujinhadeluxo/' + totalPriceFormatted;
        Swal.fire({
            title: 'Pagamento com Cartão de Crédito',
            html: '<iframe src="' + url + '" width="100%" height="400"></iframe><p style="margin-top: 10px;">Já finalizou o pagamento? 👇</p>',
            showCancelButton: false,
            confirmButtonText: 'Concluir pedido',
            preConfirm: function() {
                finalizeCre(finalPrice); // Passe o preço total para a função finalizeCre
            }
        });
    });
    
    document.getElementById('pixBtn').addEventListener('click', function() {
        var chavePIX = '(48) 9 9172-3006';
        var discountedPrice = finalPrice * 0.95; // Subtrai 5% do preço original (100% - 5% = 95%)
        var discountedPriceFormatted = discountedPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        Swal.fire({
            title: 'Pagamento via Pix',
            html: `
                <strong>Valor com 5% de desconto: ${discountedPriceFormatted}</strong>
                <input id="chavePIXInput" class="swal2-input" value="${chavePIX}" readonly>
                <button id="copiarChavePIXBtn" class="input_login" type="button">Copiar Chave PIX</button>
                <p style="margin-top: 10px;">Já realizou o pagamento via PIX? 👇</p>
                <div id="chavePIXMessage" style="display: none; margin-top: 10px;"></div>
            `,
            showCancelButton: false,
            confirmButtonText: 'Concluir pedido',
            preConfirm: function() {
                finalizePix(discountedPrice); // Passe o preço com desconto para a função finalizePix
            },
        });
        
        // Adicionando um manipulador de eventos ao botão de cópia da chave PIX
        document.getElementById('copiarChavePIXBtn').addEventListener('click', function(event) {
            event.stopPropagation(); // Impede que o evento de clique se propague até o popup
            copyChavePIX();
        });
    });
    
    document.getElementById('whatsappBtn').addEventListener('click', function() {
        // Chamando a função finalizeCompra quando o botão WhatsApp for clicado
        finalizeWhats();
        Swal.close();
    });

}
// Chama a função para exibir o popup ao carregar a página
showPaymentOptions(produtos);