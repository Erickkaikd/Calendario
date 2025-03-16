 // Simulando usuários para login
 const users = [
    { username: 'professor1', password: 'senha1', role: 'user' },
    { username: 'admin', password: 'admin', role: 'admin' }
];

// Agendamentos
const schedules = [];

// Função para mostrar a página de agendamento
function showSchedulePage() {
    document.getElementById('login-page').style.display = 'none';  // Esconde a página de login
    document.getElementById('schedule-page').style.display = 'block';  // Exibe a página de agendamento
}

// Função para mostrar a página de admin
function showAdminPage() {
    document.getElementById('login-page').style.display = 'none';  // Esconde a página de login
    document.getElementById('admin-page').style.display = 'block';  // Exibe o painel de admin
    renderAgendasForAdmin();  // Renderiza os agendamentos para o admin
}

// Função para renderizar agendamentos (visível para o admin)
function renderAgendasForAdmin() {
    const agendasContainer = document.getElementById('agendas');
    const today = new Date().toISOString().split('T')[0];  // Formato YYYY-MM-DD
    const todaysSchedules = schedules.filter(schedule => schedule.date === today);

    if (todaysSchedules.length === 0) {
        agendasContainer.innerHTML = "<p>Não há agendamentos para hoje.</p>";
    } else {
        agendasContainer.innerHTML = `
            <table>
                <tr>
                    <th>Sala</th>
                    <th>Início</th>
                    <th>Fim</th>
                    <th>Recursos</th>
                </tr>
        `;
        todaysSchedules.forEach(schedule => {
            agendasContainer.innerHTML += `
                <tr>
                    <td>${schedule.room}</td>
                    <td>${schedule.startTime}</td>
                    <td>${schedule.endTime}</td>
                    <td>${schedule.resources.join(', ')}</td>
                </tr>
            `;
        });
        agendasContainer.innerHTML += '</table>';
    }
}

// Função de login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita que o formulário recarregue a página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.role === 'admin') {
            showAdminPage();  // Mostra o painel de administração
        } else {
            showSchedulePage();  // Mostra a página de agendamento para o professor
        }
    } else {
        document.getElementById('error-message').textContent = 'Usuário ou senha inválidos.';
    }
});

// Função de agendamento
document.getElementById('schedule-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const room = document.getElementById('room').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const resources = Array.from(document.getElementById('resources').selectedOptions).map(option => option.value);
    const date = new Date().toISOString().split('T')[0]; // Pega a data atual (YYYY-MM-DD)

    schedules.push({ room, startTime, endTime, resources, date });
    alert('Recurso agendado com sucesso!');
});
