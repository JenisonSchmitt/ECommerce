function copyChavePIX() {
    var chavePIXInput = document.getElementById('chavePIXInput');
    chavePIXInput.select();
    document.execCommand('copy');

    // Mostrando a mensagem de feedback
    var chavePIXMessage = document.getElementById('chavePIXMessage');
    chavePIXMessage.innerHTML = 'Chave PIX copiada para a área de transferência.';
    chavePIXMessage.style.display = 'block';

    // Agora, vamos esconder a mensagem após alguns segundos
    setTimeout(function() {
        chavePIXMessage.style.display = 'none';
    }, 2000); // Defina o tempo em milissegundos que deseja que a mensagem permaneça visível
}