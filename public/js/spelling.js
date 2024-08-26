document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();

        if (result.correct) {
            resultDiv.innerHTML = `<p class="correct">Correto!</p>`;
            setTimeout(() => {
                if (result.next) {
                    window.location.href = '/spelling';  // Vai para a próxima pergunta
                } else {
                    window.location.href = '/pageSucesso';  // Redireciona para a página de sucesso
                }
            }, 2000);  // Espera 2 segundos antes de avançar
        } else {
            resultDiv.innerHTML = `<p class="incorrect">Errado, tente novamente.</p>`;
        }
    });
});
// -------------- 
