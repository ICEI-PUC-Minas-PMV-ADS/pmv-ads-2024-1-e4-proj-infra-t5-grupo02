
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
    formData.append('file', document.querySelector('[name="file"]').files[0]);

    fetch('https://localhost:7177/api/Documentos/Upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert('Arquivo enviado com sucesso!');
            loadFileList();
        })
        .catch(error => alert('Erro ao enviar arquivo.'));
});

function loadFileList() {
fetch('https://localhost:7177/api/Documentos/List')
.then(response => response.json())
.then(data => {
    var fileList = document.getElementById('fileList');
    fileList.innerHTML = `
        <h4 style="padding-bottom:20px;color:#553300;">Arquivos Salvos:</h4>
        <table class="table table-striped" style="width: 75%; margin-left: 0;">
            <thead>
                <tr>
                    <th style="width: 90%;">Nome do Arquivo</th>
                    <th style="width: 10%;text-align: center;">Ação</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(file => `
                    <tr>
                        <td><a href="https://localhost:7177/api/Documentos/Download?fileName=${encodeURIComponent(file)}" target="_blank">${file}</a></td>
                        <td style="text-align: center;">
                            <button onclick="deleteFile('${file}')" style="background: none; border: none; cursor: pointer;">
                                <i class="fas fa-trash-alt" style="color: black; font-weight: bold;"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
})
.catch(error => alert('Erro ao carregar a lista de arquivos.'));
}

function deleteFile(fileName) {
    fetch(`https://localhost:7177/api/Documentos/Delete?fileName=${encodeURIComponent(fileName)}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadFileList();
        })
        .catch(error => alert('Erro ao excluir arquivo.'));
}
window.onload = loadFileList;