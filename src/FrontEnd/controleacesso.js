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
        document.querySelector('a[href="Usuarios.html"]').parentNode.style.display = '';
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

    const actionsButton = document.querySelector('Actions');
    if (actionsButton && userProfile === 'Administrador') {
        actionsButton.parentNode.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    adjustNavLinks();
    removeButtons();
});

document.addEventListener('DOMContentLoaded', function() {
    const userProfile = localStorage.getItem('profile');
    const allowedPages = {
        'Administrador': ['User.html', 'Imoveis.html', 'Financeiro.html', 'Inquilino.html', 'CadastroUsuario.html', 'Usuarios.html', 'CadastroUsuario.html'],
        'Locador': ['User.html', 'Imoveis.html', 'Financeiro.html', 'LancamentoFinan.html', 'EditarLancamento.html', 'Inquilino.html', 'CadastroInquilino.html', 'EditarInquilino.html', 'CadastroImob.html'],
        'Inquilino': ['User.html', 'Financeiro.html']
    };

    const currentPage = window.location.pathname.split('/').pop();

    if (!allowedPages[userProfile].includes(currentPage)) {
        window.location.href = './Errorpage.html';
    }
});

