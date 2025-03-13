document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("leadForm");
  const successMessage = document.getElementById("successMessage");

  // Formatação de telefone enquanto digita
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    let formattedValue = "";
    if (value.length > 0) {
      formattedValue += "(" + value.substring(0, 2);
      if (value.length > 2) {
        formattedValue += ") " + value.substring(2, 7);
        if (value.length > 7) {
          formattedValue += "-" + value.substring(7, 11);
        }
      }
    }

    e.target.value = formattedValue;
  });

  // Validação e envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset de validações anteriores
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.classList.remove("is-invalid");
    });

    // Validar campos
    let isValid = true;

    // Nome
    const nameInput = document.getElementById("name");
    const userName = nameInput.value.trim();
    if (!userName || userName.length < 3) {
      nameInput.classList.add("is-invalid");
      isValid = false;
    }

    // Email
    const emailInput = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailInput.classList.add("is-invalid");
      isValid = false;
    }

    // Telefone
    if (phoneInput.value.replace(/\D/g, "").length < 10) {
      phoneInput.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      successMessage.style.display = "block"; 
      form.style.display = "none"; 

      setTimeout(() => {
        const urlDestino = `product.html?name=${encodeURIComponent(userName)}`;
        window.location.href = urlDestino;
      }, 1500);

    }
    
    
  });

  // Animação para os elementos
  const animateElements = document.querySelectorAll(".animate-fade-in");

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Inicializar animações
  window.addEventListener("scroll", checkScroll);
  checkScroll();

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // Fechar o menu mobile se estiver aberto
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");

        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      }
    });
  });

});

