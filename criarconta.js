function validarFormulario() {
    console.log("Validando formulário...");
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value.trim();
    var cpf = document.getElementById("cpf").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var nascimento = document.getElementById("nascimento").value.trim();
    var endereco = document.getElementById("endereco").value.trim();
    var senha = document.getElementById("senha").value;
    var senha_confirm = document.getElementById("senha_confirm").value;

    var isValid = true;

    // Verifica se o nome está vazio
    if (nome.trim() === "") {
        document.getElementById("nome_error").innerHTML = "Por favor, informe seu nome.";
        isValid = false;
    } else {
        document.getElementById("nome_error").innerHTML = "";
    }

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

    // Verifica se a data de nascimento está vazia
    if (nascimento === "") {
        document.getElementById("nascimento_error").innerHTML = "Por favor, informe sua data de nascimento.";
        isValid = false;
    } else if (nascimento.length < 10) { // Verifica se a data de nascimento está completa
        document.getElementById("nascimento_error").innerHTML = "Por favor, informe uma data de nascimento válida.";
        isValid = false;
    } else {
        document.getElementById("nascimento_error").innerHTML = "";
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

    // Retorna o resultado da validação
    return isValid;
}

function formatarCPF(campo) {
    var valor = campo.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    campo.value = valor;
}

function formatarTelefone(campo) {
    var valor = campo.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    campo.value = valor;
}

function formatarNascimento(campo) {
    var valor = campo.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
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