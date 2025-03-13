document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (name) {
        const hero = document.createElement("div");
        hero.classList.add("hero-welcome");

        const welcomeMessage = document.createElement("h2");
        welcomeMessage.textContent = `Welcome, ${name}!`;

        // Adiciona o h2 dentro da div
        hero.appendChild(welcomeMessage);

        document.body.insertBefore(hero, document.body.firstChild);
    }

    // Lista de imagens
    const mainImage = document.getElementById("main-image");
    const thumbnails = document.querySelectorAll(".thumb-small");

    if (!mainImage || thumbnails.length === 0) {
        console.error("Erro: Elementos não encontrados.");
        return;
    }

    // Adiciona evento de clique às miniaturas
    thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", function () {
            // Atualiza a imagem principal com o src da miniatura clicada
            mainImage.src = this.src;

            // Remove a classe 'active' de todas as miniaturas
            thumbnails.forEach((t) => t.classList.remove("active"));

            // Adiciona a classe 'active' na thumbnail clicada
            this.classList.add("active");
        });
    });

    // Inicializando o Fancybox
    Fancybox.bind('[data-fancybox="gallery"]', {
        infinite: true, // Ativa a navegação infinita (next/previous)
    });

    // Inicialização do Swiper
    new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        loop: true, // Faz o carrossel ir em loop
        grabCursor: true, // Permite o arrasto com o mouse ou dedo
    });

    // Contagem regressiva
    const promoEndDate = new Date(new Date().getTime() + 5 * 60 * 1000);

    function updateCountdown() {
        const now = new Date();
        const timeRemaining = promoEndDate - now;

        if (timeRemaining <= 0) {
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            document.getElementById("cta-button").disabled = true;
            document.getElementById("cta-button").textContent = "Promoção Encerrada";
            clearInterval(timerInterval);
            return;
        }

        const minutes = Math.floor(timeRemaining / 1000 / 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
});
