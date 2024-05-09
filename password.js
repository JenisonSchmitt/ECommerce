var adminPassword = "123456";
var passwordEntered = false;

function openFrame(url) {
if (!passwordEntered) {
    askForPassword(url);
} else {
    document.getElementById('frame').src = url;
}
}

function checkPassword() {
var enteredPassword = document.getElementById('password').value;
if (enteredPassword === adminPassword) {
    document.getElementById('passwordForm').style.display = 'none';
    passwordEntered = true;
} else {
    alert("Senha incorreta. Tente novamente.");
}
}

function askForPassword(url) {
var password = prompt("Digite a senha:");
if (password === adminPassword) {
    document.getElementById('frame').src = url;
    passwordEntered = true;
} else {
    alert("Senha incorreta. Tente novamente.");
}
}

// Verifica se a senha já foi inserida antes (pode ser ajustado para localStorage se necessário)
var passwordFlag = document.cookie.replace(/(?:(?:^|.*;\s*)passwordEntered\s*=\s*([^;]*).*$)|^.*$/, "$1");
if (passwordFlag === "true") {
passwordEntered = true;
document.getElementById('passwordForm').style.display = 'none';
}