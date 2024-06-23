document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    document.getElementById('username').textContent = username;

    var userId = localStorage.getItem('Id');
    if (userId) {
        fetch(`https://localhost:7177/api/Documentos/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                const fileListBody = document.getElementById('fileListBody');
                data.forEach(file => {
                    const row = document.createElement('tr');
                    row.setAttribute('data-id', file.id);
                    row.innerHTML = `
<td>${file.fileName}</td>

<td>
    <button class="btn btn-secondary" onclick="viewFile(${file.id})">
        <i class="fas fa-eye"></i>
    </button>
    <button class="btn btn-primary" onclick="downloadFile(${file.id})">
        <i class="fas fa-download"></i>
    </button>
    <button class="btn btn-danger" onclick="deleteFile(${file.id})">
        <i class="fas fa-trash-alt"></i>
    </button>
</td>

                    `;
                    fileListBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching PDF files:', error));
    } else {
        alert('Usuário não está logado.');
    }
});

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData();
    var fileInput = document.querySelector('[name="file"]');
    var userId = localStorage.getItem('Id'); 

    if (fileInput.files.length > 0 && userId) {
        formData.append('file', fileInput.files[0]);
        formData.append('uploadTime', new Date().toISOString());
        formData.append('userId', userId); 

        fetch('https://localhost:7177/api/Documentos/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert('Arquivo enviado com sucesso!');
                location.reload();
            })
            .catch(error => alert('Erro ao enviar arquivo.'));
    } else {
        alert('Selecione um arquivo e verifique se você está logado.');
    }
});

function viewFile(fileId) {
    fetch(`https://localhost:7177/api/Documentos/${fileId}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const newTab = window.open(url, '_blank');
            newTab.focus();
        })
        .catch(error => console.error('Error viewing file:', error));
}

function downloadFile(fileId) {
    fetch(`https://localhost:7177/api/Documentos/${fileId}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = ''; 
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading file:', error));
}

function deleteFile(fileId) {
    fetch(`https://localhost:7177/api/Documentos/${fileId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const row = document.querySelector(`tr[data-id="${fileId}"]`);
            row.remove();
        } else {
            console.error('Error deleting file:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting file:', error));
}
