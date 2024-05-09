function validarFormulario() {
    console.log("Atualizando dados...");
    var email = document.getElementById("email").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var endereco = document.getElementById("endereco").value.trim();    
    var isValid = true;

    // Verifica se o email está vazio
    if (email === "") {
        document.getElementById("email_error").innerHTML = "Por favor, informe seu email.";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Verifica se o email está no formato correto
        document.getElementById("email_error").innerHTML = "Por favor, informe um email válido.";
        isValid = false;
    } else {
        document.getElementById("email_error").innerHTML = "";
    }

    // Verifica se o telefone está vazio
    if (telefone === "") {
        document.getElementById("telefone_error").innerHTML = "Por favor, informe seu telefone.";
        isValid = false;
    } else if (telefone.length < 14) { // Verifica se o telefone está completo
        document.getElementById("telefone_error").innerHTML = "Por favor, informe um telefone válido.";
        isValid = false;
    } else {
        document.getElementById("telefone_error").innerHTML = "";
    }

    return isValid;

    if (isValid) {
        document.querySelector("form").submit();
    }
}

function formatarTelefone(campo) {
    var valor = campo.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    campo.value = valor;
}

// Função para retornar para a página anterior
function goBack() {
    window.history.back();
}