function validarFormulario() {
    console.log("Validando formulário...");
    var email = document.getElementById("email").value.trim();
    var cpf = document.getElementById("cpf").value.trim();
    var senha = document.getElementById("senha").value;
    var senha_confirm = document.getElementById("senha_confirm").value;

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

    // Verifica se a senha confirmada é igual à senha
    if (senha !== senha_confirm) {
        document.getElementById("senha_confirm_error").innerHTML = "As senhas não coincidem.";
        isValid = false;
    } else {
        document.getElementById("senha_confirm_error").innerHTML = "";
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

function validarSenha() {
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("senha_confirm").value;

    if (senha.length < 8) {
        document.getElementById("senha_error").innerHTML = "A senha deve ter pelo menos 8 caracteres.";
        return false;
    }

    if (senha !== confirmarSenha) {
        document.getElementById("senha_confirm_error").innerHTML = "As senhas não coincidem.";
        return false;
    }

    return true;
}

function goBack() {
    window.history.back();
}