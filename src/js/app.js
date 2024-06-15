function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  }

  function aplicarMascaraCPF(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  document.getElementById('cpf').addEventListener('input', function (e) {
    const cpfInput = e.target;
    cpfInput.value = aplicarMascaraCPF(cpfInput.value);

    const cpfValido = validarCPF(cpfInput.value);
    if (cpfValido) {
      document.getElementById('submit-btn').disabled = false;
    } else {
      document.getElementById('submit-btn').disabled = true;
    }
  });

  document.getElementById('cpf').addEventListener('blur', function (e) {
    const cpfInput = e.target;
    const cpfValido = validarCPF(cpfInput.value);
    if (cpfInput.value === '' || (cpfInput.value.length === 14 && !cpfValido)) {
      cpfInput.classList.add('error-border');
      document.getElementById('error-message').style.display = 'flex';
    } else {
      cpfInput.classList.remove('error-border');
      document.getElementById('error-message').style.display = 'none';
    }
  });

  document.getElementById('cpf').addEventListener('focus', function (e) {
    const cpfInput = e.target;
    cpfInput.classList.remove('error-border');
    document.getElementById('error-message').style.display = 'none';
  });

  document.getElementById('cpf-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const cpfInput = document.getElementById('cpf');
    const cpfValido = validarCPF(cpfInput.value);
    if (cpfValido) {
      document.getElementById('captcha-container').classList.remove('captcha-hidden');
      document.getElementById('captcha-container').classList.add('captcha-visible');
    }
  });

  document.getElementById('fkrc-checkbox').addEventListener('click', function () {
    const checkbox = document.getElementById('fkrc-checkbox');
    checkbox.classList.add('loading');
    
    setTimeout(function() {
      checkbox.classList.remove('loading');
      checkbox.classList.add('checked');
      const captchaValidado = checkbox.classList.contains('checked');
      if (captchaValidado) {
        document.getElementById('submit-btn').disabled = false;
  
        setTimeout(function() {
          document.getElementById('captcha-container').classList.add('captcha-hidden');
          document.getElementById('captcha-container').classList.remove('captcha-visible');
          
          // Captura a URL atual
          const currentUrl = new URL(window.location.href);
          const params = currentUrl.searchParams.toString();  // Captura os parâmetros da URL
          
          // URL de redirecionamento
          const redirectUrl = 'http://www.google.com';
          
          // Redireciona com os parâmetros da URL atual, se existirem
          if (params) {
            window.location.href = `${redirectUrl}?${params}`;
          } else {
            window.location.href = redirectUrl;
          }
  
        }, 3000); // 3000 ms = 3 segundos
      } else {
        document.getElementById('submit-btn').disabled = true;
      }
    }, 2000); // 2000 ms = 2 segundos
  });