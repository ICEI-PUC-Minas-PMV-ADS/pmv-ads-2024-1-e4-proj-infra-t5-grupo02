document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (document.getElementById('username')) {
        document.getElementById('username').textContent = username;
    }

    fetchLancamentosDashboard();
});

function fetchLancamentosDashboard() {
    let inquilinosMap = {};

    fetch('https://localhost:7294/api/Inquilinos/all')
        .then(response => response.json())
        .then(inquilinos => {
            inquilinos.forEach(inquilino => {
                inquilinosMap[inquilino.id] = inquilino.nome;
            });

            fetch('https://localhost:7157/api/Lancamentos/all')
                .then(response => response.json())
                .then(data => {
                    console.log('Dados recebidos:', data); // Log de depuração

                    const today = new Date();
                    const next15Days = new Date();
                    next15Days.setDate(today.getDate() + 15);

                    let totalPendentesVencidos = 0;
                    let totalPendentes15Dias = 0;
                    let totalReceitasPagas = 0;
                    let totalDespesasPagas = 0;

                    let pendentesVencidosRows = '';
                    let pendentes15DiasRows = '';

                    let receitasMensais = new Array(12).fill(0);
                    let despesasMensais = new Array(12).fill(0);

                    data.forEach(lancamento => {
                        const lancamentoDate = new Date(lancamento.data);
                        const valor = parseFloat(lancamento.valor);
                        const nomeInquilino = inquilinosMap[lancamento.inquilino] || 'Desconhecido';
                        const mes = lancamentoDate.getMonth();

                        console.log('Processando lançamento:', lancamento); // Log de depuração

                        const tableRow = `
                            <tr>
                                <td>${nomeInquilino}</td>
                                <td>${lancamentoDate.toLocaleDateString('pt-BR')}</td>
                                <td>${lancamento.tipo}</td>
                                <td>${lancamento.classificacao}</td>
                                <td>${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            </tr>`;

                        if (lancamento.status === 'pendente') {
                            if (lancamentoDate < today) {
                                totalPendentesVencidos += valor;
                                pendentesVencidosRows += tableRow;
                            }
                            if (lancamentoDate >= today && lancamentoDate <= next15Days) {
                                totalPendentes15Dias += valor;
                                pendentes15DiasRows += tableRow;
                            }
                        } else if (lancamento.status === 'pago') {
                            if (lancamento.tipo === 'receita') {
                                totalReceitasPagas += valor;
                                receitasMensais[mes] += valor;
                            } else if (lancamento.tipo === 'despesa') {
                                totalDespesasPagas += valor;
                                despesasMensais[mes] += valor;
                            }
                        }
                    });

                    const saldo = totalReceitasPagas - totalDespesasPagas;
                    const saldoMensal = receitasMensais.map((receita, index) => receita - despesasMensais[index]);

                    if (document.getElementById('total-pendentes-vencidos')) {
                        document.getElementById('total-pendentes-vencidos').textContent = totalPendentesVencidos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    }
                    if (document.getElementById('list-pendentes-vencidos')) {
                        document.getElementById('list-pendentes-vencidos').innerHTML = pendentesVencidosRows;
                    }

                    if (document.getElementById('total-pendentes-15-dias')) {
                        document.getElementById('total-pendentes-15-dias').textContent = totalPendentes15Dias.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    }
                    if (document.getElementById('list-pendentes-15-dias')) {
                        document.getElementById('list-pendentes-15-dias').innerHTML = pendentes15DiasRows;
                    }

                    if (document.getElementById('total-receitas-pagas')) {
                        document.getElementById('total-receitas-pagas').textContent = totalReceitasPagas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    }
                    if (document.getElementById('total-despesas-pagas')) {
                        document.getElementById('total-despesas-pagas').textContent = totalDespesasPagas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    }
                    if (document.getElementById('total-saldo')) {
                        document.getElementById('total-saldo').textContent = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    }

                    console.log('Totais calculados:', {
                        totalPendentesVencidos,
                        totalPendentes15Dias,
                        totalReceitasPagas,
                        totalDespesasPagas,
                        saldo
                    }); // Log de depuração

                    // Criando o gráfico comparativo mensal
                    if (document.getElementById('comparativo-mensal')) {
                        const ctx = document.getElementById('comparativo-mensal').getContext('2d');
                        new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                                datasets: [
                                    {
                                        label: 'Receitas',
                                        data: receitasMensais,
                                        borderColor: 'green',
                                        backgroundColor: 'green',
                                        fill: true
                                    },
                                    {
                                        label: 'Despesas',
                                        data: despesasMensais,
                                        borderColor: 'red',
                                        backgroundColor: 'darkred',
                                        fill: true
                                    },
                                    {
                                        label: 'Saldo',
                                        data: saldoMensal,
                                        borderColor: 'blue',
                                        backgroundColor: 'gray',
                                        fill: true
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            callback: function(value, index, values) {
                                                return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                })
                .catch(error => console.error('Erro ao buscar lançamentos:', error));
        })
        .catch(error => console.error('Erro ao buscar inquilinos:', error));
}