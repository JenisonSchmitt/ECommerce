// Variável para controlar se o desconto já foi aplicado
var descontoAplicado = false;
var ValorDesconto = 0;
var totalComDesconto = 0;

// Adiciona um elemento HTML para exibir a mensagem de erro
$('#cupomForm').after('<div id="cupomError" class="text-danger left"></div>');

// Intercepta o envio do formulário e calcula o desconto localmente
$('#cupomForm').submit(function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    console.log('Formulário enviado.');

    // Limpa a mensagem de erro anterior, se houver
    $('#cupomError').text('');

    var cupom = $('#cupomInput').val(); // Obtém o valor do cupom do input
    console.log('Cupom:', cupom);

    // Verifica se o desconto já foi aplicado
    if (!descontoAplicado) {
        // Verifica se o cupom é válido e calcula o desconto localmente
        $.ajax({
            url: 'DB_inserirCupom.php',
            method: 'POST',
            data: { cupom: cupom },
            success: function(response) {
                console.log('Resposta do PHP:', response);
                // Verifica se a resposta é válida e atualiza o preço final
                if (response.includes("Erro:")) {
                    // Exibe a mensagem de erro na interface do usuário
                    $('#cupomError').text(response);
                } else {
                    var precoOriginal = totalPrice; // Use totalPrice em vez de $('#precoOriginal').text()
                    console.log('Preço original:', precoOriginal);
                    var desconto = parseInt(response.trim());
                    totalComDesconto = precoOriginal * (desconto / 100);
                    totalComDesconto = totalComDesconto.toFixed(2); // Arredonda o valor com duas casas decimais
                    console.log('Preço com desconto:', totalComDesconto);

                    // Verifica se o valor com desconto é menor que o original
                    if (totalComDesconto < precoOriginal) {
                        // Atualize a exibição do preço total na tabela
                        if ($('#precoTotal').length) {
                            $('#precoTotal').text('R$ ' + totalComDesconto);
                            $('#precoTotal').css('font-weight', 'bold'); // Adiciona negrito ao texto
                            console.log('Exibição do preço total atualizado na tabela.');
                        } else {
                            $('#precoTotalRow').remove(); // Remova a linha existente
                            $('#cartTableBody').append('<tr id="precoTotalRow"><td colspan="3" class="text-end"><strong>Desconto:</strong></td><td colspan="2"><strong>'+ 'R$ ' + totalComDesconto + '</strong></td></tr>');
                            console.log('Criado novo elemento para exibir o preço total na tabela.');
                        }
                        
                        // Marca que o desconto foi aplicado
                        descontoAplicado = true;
                        
                        ValorDesconto = precoOriginal - totalComDesconto;
                        
                        updateTotalPrice(totalComDesconto, total_frete);
                        
                        
                        // Atualiza o totalPrice para o valor com desconto
                        console.log('Valor Final atualizado com desconto:', ValorDesconto);
                        
                    } else {
                        console.error('O valor com desconto não é menor que o preço original.');
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição AJAX:', error);
            }
        });
    }
});


var total_frete = 0; 

$(document).ready(function(){
    // Adiciona o evento keyup para formatar o CEP enquanto é digitado
    $('#cep').on('keyup', function() {
        var cep = $(this).val().replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (cep.length > 5) {
            cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após os primeiros 5 dígitos
        }
        $(this).val(cep); // Atualiza o valor do campo com o CEP formatado
    });

    $('#formConsulta').submit(function(e){
        e.preventDefault();
        var cep = $('#cep').val();
        $.ajax({
            type: 'POST',
            url: 'processarenvio.php',
            data: { cep: cep},
            success: function(response) {
                try {
                    var resultados = JSON.parse(response); // Converter a resposta JSON para um objeto JavaScript
                    var selectOptions = [];

                    // Adicionar as opções fixas com imagens
                    selectOptions.push($('<option>', {
                        value: '0.00',
                        text: 'Agendar Retirada - R$ 0,00',
                        'data-icon': 'https://lujinhadeluxo.com.br/images/icone2.png'
                    }));
                    selectOptions.push($('<option>', {
                        value: '10.00',
                        text: 'Entrega Tubarão/Capiva-SC - R$ 10,00',
                        'data-icon': 'https://lujinhadeluxo.com.br/images/icone2.png'
                    }));
                    selectOptions.push($('<option>', {
                        value: '15.00',
                        text: 'Entrega Jaguaruna-SC - R$ 15,00',
                        'data-icon': 'https://lujinhadeluxo.com.br/images/icone2.png'
                    }));
                    selectOptions.push($('<option>', {
                        value: '20.00',
                        text: 'Entrega Laguna-SC - R$ 20,00',
                        'data-icon': 'https://lujinhadeluxo.com.br/images/icone2.png'
                    }));

                    // Percorrer os resultados e criar as opções da lista de seleção
                    for (var i = 0; i < resultados.length; i++) {
                        var transporte = resultados[i];
                        var optionText = transporte.envio + ' - R$ ' + transporte.preco + ' - Tempo de entrega: ' + transporte.tempo_entrega;
                        var option = $('<option>', {
                            value: transporte.preco,
                            text: optionText,
                            'data-icon': transporte.icone
                        });
                        selectOptions.push(option);
                    }
                    
                    // Adicione as opções à lista de seleção
                    $('#resultado').html('<select id="selecaoFrete"></select>');
                    $('#selecaoFrete').append(selectOptions);
                    
                    // Inicialize o Select2 após adicionar todas as opções
                    $('#selecaoFrete').select2({
                        templateResult: formatOption,
                        templateSelection: formatOptionSelection,
                        width: '250px'
                    }).on('change', function() {
                        var valorFrete = $(this).val();

                        // Remove a linha existente com o valor do frete, se já estiver presente
                        $('#precoFreteRow').remove();

                        // Adiciona a linha com o valor do frete à tabela
                        if (valorFrete > 0) {
                            var row = '<tr id="precoFreteRow">' +
                                '<td colspan="3" class="text-end"><strong>Frete:</strong></td>' +
                                '<td colspan="2"><strong>R$ ' + valorFrete + '</strong></td>' +
                                '</tr>';
                            $('#cartTableBody').append(row);
                            
                            var freteee = 0;
                            
                            total_frete = valorFrete - freteee;
                            updateTotalPrice(totalComDesconto, total_frete);
                        }
                    });

                } catch (error) {
                    console.error("Erro ao processar a resposta JSON:", error);
                }
            },
            error: function(xhr, status, error) {
                console.error("Erro na requisição AJAX:", error);
            }
        });
    });

    // Função para formatar as opções da lista de seleção com ícones
    function formatOption(option) {
        if (!option.id) {
            return option.text;
        }

        var $icon = $('<img src="' + $(option.element).data('icon') + '" class="icone-transportadora" />');
        var $text = $('<span>' + option.text + '</span>');

        var $option = $('<span>').append($icon).append($text);
        return $option;
    }

    // Função para formatar a opção selecionada com ícone
    function formatOptionSelection(option) {
        if (!option.id) {
            return option.text;
        }

        var $icon = $('<img src="' + $(option.element).data('icon') + '" class="icone-transportadora" />');
        var $text = $('<span>' + option.text + '</span>');

        var $option = $('<span>').append($icon).append($text);
        return $option;
    }

});


var finalPrice = 0;

function updateTotalPrice(totalComDesconto, total_frete) {
    console.log(typeof totalComDesconto);
    console.log(typeof total_frete);
    var totalComFreteEDesconto;

    // Converta o frete para um número float
    frete_total_float = parseFloat(total_frete);
    console.log("valor frete: " + frete_total_float);
    console.log(typeof total_frete);

    // Converta o desconto para um número float
    var desconto_total_float = parseFloat (totalComDesconto);
    console.log("valor desconto: " + desconto_total_float);
    console.log(typeof totalComDesconto);

    totalComFreteEDesconto = totalPrice + frete_total_float - desconto_total_float;
    console.log("valor final: " + totalComFreteEDesconto);

    // Remove a linha existente de valor final, se já estiver presente
    $('#valorFinalRow').remove();

    // Converte finalPrice para número antes de chamar toFixed
    finalPrice = parseFloat(totalComFreteEDesconto);
    console.log("valor final real: " + finalPrice);

    // Adiciona a nova linha com o valor final à tabela
    var row = '<tr id="valorFinalRow">' +
        '<td colspan="3" class="text-end"><strong>Valor Final:</strong></td>' +
        '<td colspan="2"><strong>R$ ' + finalPrice.toFixed(2) + '</strong></td>' +
        '</tr>';
    $('#cartTableBody').append(row);
}