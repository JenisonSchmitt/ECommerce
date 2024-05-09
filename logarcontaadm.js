function validarFormulario() {
    console.log("Validando formulário...");
    var cpf = document.getElementById("cpf").value.trim();
    var senha = document.getElementById("senha").value;

    var isValid = true;

    // Verifica se o CPF está vazio
    if (cpf === "") {
        document.getElementById("cpf_error").innerHTML = "Por favor, informe seu CPF.";
        isValid = false;
    } else if (cpf.length !== 14) { // Verifica se o CPF está completo
        document.getElementById("cpf_error").innerHTML = "Por favor, informe um CPF válido.";
        isValid = false;
    } else {
        document.getElementById("cpf_error").innerHTML = "";
    }


    // Verifica se a senha tem pelo menos 8 caracteres
    if (senha.length < 8) {
        document.getElementById("senha_error").innerHTML = "A senha deve ter pelo menos 8 caracteres.";
        isValid = false;
    } else {
        document.getElementById("senha_error").innerHTML = "";
    }

    return isValid;

    if (isValid) {
        document.querySelector("form").submit();
    }
}

function formatarCPF(campo) {
    var valor = campo.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    campo.value = valor;
}
 