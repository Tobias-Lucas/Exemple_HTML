document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Limpa mensagens de erro
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validação simples
    let valid = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido.';
        valid = false;
    }
    if (!password) {
        document.getElementById('passwordError').textContent = 'Por favor, insira sua senha.';
        valid = false;
    }

    if (!valid) {
        return; // Se não for válido, não envia a requisição
    }

    // Cria o objeto JSON para enviar
    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Login bem-sucedido:', result);
            // Redireciona ou faz algo com a resposta aqui
        } else {
            console.error('Erro ao fazer login:', response.statusText);
            // Mostra uma mensagem de erro ao usuário, se necessário
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        // Mostra uma mensagem de erro ao usuário, se necessário
    }
});