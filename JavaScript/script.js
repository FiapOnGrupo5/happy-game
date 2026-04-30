function showToast(gameName) {
    document.getElementById('toastMsg').textContent = gameName + ' adicionado ao carrinho!';
    var toast = new bootstrap.Toast(document.getElementById('gameToast'), { delay: 3000 });
    toast.show();
}
