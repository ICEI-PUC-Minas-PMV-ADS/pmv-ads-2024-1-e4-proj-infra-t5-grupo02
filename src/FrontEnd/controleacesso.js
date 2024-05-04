function adjustNavLinks() {
    const userProfile = localStorage.getItem('profile'); // Obtem o perfil do localStorage
    const links = document.querySelectorAll('.nav-links ul li');
    links.forEach(link => link.style.display = 'none');

    // Determina quais links mostrar baseado no perfil do usuário
    if (userProfile === 'Administrador') {
        document.querySelector('a[href="User.html"]').parentNode.style.display = '';
        document.querySelector('a[href="Imoveis.html"]').parentNode.style.display = '';
        document.querySelector('a[href="Financeiro.html"]').parentNode.style.display = '';
        document.querySelector('a[href="Inquilino.html"]').parentNode.style.display = '';
        document.querySelector('a[href="CadastroUsuario.html"]').parentNode.style.display = '';
    } else if (userProfile === 'Locador') {
        document.querySelector('a[href="User.html"]').parentNode.style.display = '';
        document.querySelector('a[href="Imoveis.html"]').parentNode.style.display = '';
        document.querySelector('a[href="Financeiro.html"]').parentNode.style.display = '';
        document.querySelector('a[href="Inquilino.html"]').parentNode.style.display = '';
    } else if (userProfile === 'Inquilino') {
        document.querySelector('a[href="User.html"]').parentNode.style.display = '';
        document.querySelector('a[href="Financeiro.html"]').parentNode.style.display = '';
    }
}


function removeButtons() {
    const userProfile = localStorage.getItem('profile'); // Obtem o perfil do localStorage
    
    const financeiroButton = document.querySelector('#addImob');
    if (financeiroButton && (userProfile === 'Inquilino' || userProfile === 'Administrador')) {
        financeiroButton.parentNode.remove();
    }

    const inquilinoButton = document.querySelector('#addImob');
    if (inquilinoButton && userProfile === 'Administrador') {
        inquilinoButton.parentNode.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    adjustNavLinks();
    removeButtons();
});
