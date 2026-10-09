// ============================================
// Blog Stay - Script.js
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // ---------- 1. SCROLL SUAVE ----------
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      
      if (target) {
        const offset = 80; // altura do menu sticky
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: top,
          behavior: "smooth"
        });
      }
    });
  });

  // ---------- 2. DESTACAR LINK ATIVO NO MENU ----------
  const sections = document.querySelectorAll("article[id]");
  const navLinks = document.querySelectorAll("nav a");

  function highlightNav() {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
  highlightNav(); // executa uma vez ao carregar

  // ---------- 3. BOTÃO VOLTAR AO TOPO ----------
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.innerHTML = "↑";
  backToTop.setAttribute("aria-label", "Voltar ao topo");
  document.body.appendChild(backToTop);

  // Estilo do botão (pode mover pro CSS depois se preferir)
  const style = document.createElement("style");
  style.textContent = `
    #backToTop {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: #c77dff;
      color: #1a0b2e;
      border: none;
      border-radius: 50%;
      font-size: 1.6rem;
      font-weight: bold;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(199, 125, 255, 0.4);
      z-index: 999;
    }
    #backToTop.show {
      opacity: 1;
      visibility: visible;
    }
    #backToTop:hover {
      background: #e0aaff;
      transform: translateY(-4px);
    }
    nav a.active {
      color: #c77dff !important;
      font-weight: 700;
      position: relative;
    }
    nav a.active::after {
      content: "";
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #c77dff;
    }
  `;
  document.head.appendChild(style);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ---------- 4. ANIMAÇÃO DE ENTRADA (FADE-IN) 
