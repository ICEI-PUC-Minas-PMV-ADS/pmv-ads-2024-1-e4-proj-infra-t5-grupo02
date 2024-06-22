
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    document.getElementById('username').textContent = username;

    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function () {
            var searchValue = this.value.toLowerCase();
            var tableRows = document.querySelectorAll('#lancamentosTable tbody tr');

            tableRows.forEach(function (row) {
                var rowText = row.textContent.toLowerCase();
                row.style.display = rowText.includes(searchValue) ? '' : 'none';
            });
        });
    }
});

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData();
    var fileInput = document.querySelector('[name="file"]');
    var userId = localStorage.getItem('Id'); // Obtendo o ID do usuário do localStorage

    if (fileInput.files.length > 0 && userId) {
        formData.append('file', fileInput.files[0]);
        formData.append('uploadTime', new Date().toISOString()); // Adiciona a hora do upload
        formData.append('userId', userId); // Adiciona o ID do usuário

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


// document.addEventListener('DOMContentLoaded', function() {
//     fetch('https://localhost:7177/api/Documentos')
//         .then(response => response.json())
//         .then(data => {
//             const pdfList = document.getElementById('pdf-list');
//             data.forEach(file => {
//                 const listItem = document.createElement('li');
//                 listItem.setAttribute('data-id', file.id);
//                 listItem.innerHTML = `ID: ${file.id}, FileName: ${file.fileName} 
//                                       <button onclick="downloadFile(${file.id})">Download</button>
//                                       <button onclick="deleteFile(${file.id})">Delete</button>`;
//                 pdfList.appendChild(listItem);
//             });
//         })
//         .catch(error => console.error('Error fetching PDF files:', error));
// });

document.addEventListener('DOMContentLoaded', function() {
    var userId = localStorage.getItem('Id');
    if (userId) {
        fetch(`https://localhost:7177/api/Documentos/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                const pdfList = document.getElementById('pdf-list');
                data.forEach(file => {
                    const listItem = document.createElement('li');
                    listItem.setAttribute('data-id', file.id);
                    listItem.innerHTML = `ID: ${file.id}, FileName: ${file.fileName} 
                                          <button onclick="downloadFile(${file.id})">Download</button>
                                          <button onclick="deleteFile(${file.id})">Delete</button>`;
                    pdfList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching PDF files:', error));
    } else {
        alert('Usuário não está logado.');
    }
});

function downloadFile(fileId) {
    fetch(`https://localhost:7177/api/Documentos/${fileId}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = ''; // O nome do arquivo será definido pelo servidor
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
            // Remove the list item from the DOM
            const listItem = document.querySelector(`li[data-id="${fileId}"]`);
            listItem.remove();
        } else {
            console.error('Error deleting file:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting file:', error));
}