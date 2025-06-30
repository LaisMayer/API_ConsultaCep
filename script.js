const cepInput = document.getElementById('cep');
const erro = document.getElementById('erro');

cepInput.addEventListener('input', () => {
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length === 8) {
    buscarEndereco(cep);
  }
});

function buscarEndereco(cep) {
  erro.classList.add('hidden');

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        mostrarErro('CEP não encontrado.');
        return;
      }

      document.getElementById('logradouro').value = data.logradouro || '';
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('localidade').value = data.localidade || '';
      document.getElementById('uf').value = data.uf || '';
    })
    .catch(() => {
      mostrarErro('Erro ao consultar o CEP.');
    });
}

function mostrarErro(msg) {
  erro.textContent = msg;
  erro.classList.remove('hidden');

 
  document.getElementById('logradouro').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('localidade').value = '';
  document.getElementById('uf').value = '';
}
