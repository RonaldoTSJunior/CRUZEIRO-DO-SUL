document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container-de-projetos');
    let projetos = JSON.parse(localStorage.getItem('projetos'));

    if (!projetos || projetos.length === 0) {
        mostrarFormularioDeCriacao();
    } else {
        mostrarProjetos(projetos);
    }
});

// --- FUNÇÕES DE EXIBIÇÃO ---

function mostrarFormularioDeCriacao() {
    const container = document.getElementById('container-de-projetos');
    container.innerHTML = `
        <h2>Criar Novo Projeto</h2>
        <p>Preencha os dados abaixo para cadastrar um novo projeto.</p>
        <div>
            <label for="nome-projeto">Nome do Projeto:</label><br>
            <input type="text" id="nome-projeto" placeholder="Ex: Limpeza da Praia de Copacabana" size="50"><br><br>

            <label for="desc-projeto">Descrição:</label><br>
            <textarea id="desc-projeto" rows="4" cols="50" placeholder="Descreva o objetivo do projeto"></textarea><br><br>

            <label for="imagem-projeto">URL da Imagem do Projeto:</label><br>
            <input type="url" id="imagem-projeto" placeholder="https://exemplo.com/imagem.jpg" size="50"><br><br>

            <button onclick="salvarNovoProjeto()">Salvar Projeto</button>
            <button onclick="location.reload()">Cancelar</button> </div>
    `;
}

function mostrarProjetos(listaDeProjetos) {
    const container = document.getElementById('container-de-projetos');
    let htmlDosProjetos = `
        <div style="margin-bottom: 20px;">
            <button onclick="mostrarFormularioDeCriacao()">+ Adicionar Novo Projeto</button>
        </div>
        <ul style="list-style: none; padding: 0;">
    `;

    listaDeProjetos.forEach((projeto, index) => {
        htmlDosProjetos += `
            <li style="margin-bottom: 20px; border: 1px solid white; padding: 10px; border-radius: 5px;">
                <h3>${projeto.nome}</h3>
                
                ${projeto.imagem ? `<img src="${projeto.imagem}" alt="Imagem do projeto ${projeto.nome}" style="max-width: 200px; border-radius: 5px; margin-top: 10px; margin-bottom: 10px;">` : ''}
                
                <p>${projeto.descricao}</p>

                <button onclick="excluirProjeto(${index})" style="background-color: #f44336;">Excluir</button>
            </li>
        `;
    });

    htmlDosProjetos += '</ul> <br> <button onclick="limparProjetos()">Apagar Todos os Projetos</button>';
    container.innerHTML = htmlDosProjetos;
}


// --- FUNÇÕES DE MANIPULAÇÃO DE DADOS ---

function salvarNovoProjeto() {
    const nome = document.getElementById('nome-projeto').value.trim();
    const descricao = document.getElementById('desc-projeto').value.trim();
    const imagem = document.getElementById('imagem-projeto').value.trim();

    if (!nome || !descricao) {
        alert('Por favor, preencha pelo menos o nome e a descrição!');
        return;
    }

    const novoProjeto = { nome, descricao, imagem };
    let projetos = JSON.parse(localStorage.getItem('projetos')) || [];
    projetos.push(novoProjeto);
    localStorage.setItem('projetos', JSON.stringify(projetos));

    alert('Projeto salvo com sucesso!');
    location.reload();
}

function excluirProjeto(index) {
    if (confirm(`Tem certeza que deseja excluir este projeto?`)) {
        let projetos = JSON.parse(localStorage.getItem('projetos')) || [];
        projetos.splice(index, 1);
        localStorage.setItem('projetos', JSON.stringify(projetos));
        alert('Projeto excluído.');
        location.reload();
    }
}

function limparProjetos() {
    if (confirm('Tem certeza que deseja apagar TODOS os projetos? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('projetos');
        alert('Todos os projetos foram removidos.');
        location.reload();
    }
}