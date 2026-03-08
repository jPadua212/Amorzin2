// Navbar mobile toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle menu mobile
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // Muda ícone do toggle
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Fecha menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active de todos os links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Adiciona active no link clicado
      this.classList.add('active');
      
      // Fecha menu mobile se estiver aberto
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
      
      // Scroll suave para a seção
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Criar pétalas de sakura
  createSakuraPetals();

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    const hidePoint = 100;
    
    revealElements.forEach(element => {
      const revealTop = element.getBoundingClientRect().top;
      const revealBottom = element.getBoundingClientRect().bottom;
      
      const isVisible = revealTop < windowHeight - revealPoint && revealBottom > hidePoint;
      
      if (isVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }
  
  checkReveal();
  window.addEventListener('scroll', checkReveal);

  // ===== PLAYER DE MÚSICA MP3 =====
  let audio = null;
  let isPlaying = false;
  
  // Função para tocar música
  window.playMusic = function() {
    const btn = document.querySelector('.play-btn');
    const musicaSection = document.getElementById('musica');
    const container = musicaSection.querySelector('.container');
    
    // Se o áudio não existe ainda, cria
    if (!audio) {
      // Criar container do player
      const playerContainer = document.createElement('div');
      playerContainer.className = 'music-player-container';
      playerContainer.innerHTML = `
        <div class="music-player">
          <div class="music-info">
            <i class="fas fa-headphones"></i>
            <span class="music-title">Tyler, The Creator - See You Again</span>
          </div>
          <audio id="seeYouAgainAudio" preload="metadata">
            <source src="see-you-again.mp3" type="audio/mpeg">
            Seu navegador não suporta áudio HTML5.
          </audio>
          <div class="music-controls">
            <button class="music-control-btn" id="playPauseBtn">
              <i class="fas fa-play"></i>
            </button>
            <button class="music-control-btn" id="stopBtn">
              <i class="fas fa-stop"></i>
            </button>
            <div class="volume-control">
              <i class="fas fa-volume-down"></i>
              <input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="0.3">
              <i class="fas fa-volume-up"></i>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-current" id="currentTime">0:00</div>
            <input type="range" id="progressSlider" min="0" max="100" value="0">
            <div class="progress-duration" id="duration">0:00</div>
          </div>
        </div>
      `;
      
      // Adicionar após o card da música
      const musicaCard = document.querySelector('.musica-card');
      musicaCard.parentNode.insertBefore(playerContainer, musicaCard.nextSibling);
      
      // Inicializar o áudio
      audio = document.getElementById('seeYouAgainAudio');
      
      // Configurar volume inicial baixo (30%)
      audio.volume = 0.3;
      
      // Elementos do player
      const playPauseBtn = document.getElementById('playPauseBtn');
      const stopBtn = document.getElementById('stopBtn');
      const volumeSlider = document.getElementById('volumeSlider');
      const progressSlider = document.getElementById('progressSlider');
      const currentTimeSpan = document.getElementById('currentTime');
      const durationSpan = document.getElementById('duration');
      
      // Formatar tempo (segundos para MM:SS)
      function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' + secs : secs);
      }
      
      // Quando os metadados carregarem
      audio.addEventListener('loadedmetadata', function() {
        durationSpan.textContent = formatTime(audio.duration);
        progressSlider.max = audio.duration;
      });
      
      // Atualizar tempo atual
      audio.addEventListener('timeupdate', function() {
        currentTimeSpan.textContent = formatTime(audio.currentTime);
        progressSlider.value = audio.currentTime;
      });
      
      // Quando terminar a música
      audio.addEventListener('ended', function() {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        btn.innerHTML = '<i class="fas fa-play"></i> Clique aq bb';
      });
      
      // Play/Pause
      playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
          audio.play();
          isPlaying = true;
          playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
          btn.innerHTML = '<i class="fas fa-pause"></i> Tocando...';
        } else {
          audio.pause();
          isPlaying = false;
          playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
          btn.innerHTML = '<i class="fas fa-play"></i> Clique aq bb';
        }
      });
      
      // Stop
      stopBtn.addEventListener('click', function() {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        btn.innerHTML = '<i class="fas fa-play"></i> Clique aq bb';
      });
      
      // Controle de volume
      volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
      });
      
      // Barra de progresso
      progressSlider.addEventListener('input', function() {
        audio.currentTime = this.value;
      });
      
      // Botão principal (mesmo efeito do play/pause)
      btn.innerHTML = '<i class="fas fa-play"></i> Clique aq bb';
    }
    
    // Se o player já existe, só mostra/oculta
    const playerContainer = document.querySelector('.music-player-container');
    
    if (playerContainer.style.display === 'none' || !playerContainer.style.display) {
      playerContainer.style.display = 'block';
    } else {
      playerContainer.style.display = 'none';
      if (audio && isPlaying) {
        audio.pause();
        isPlaying = false;
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
        btn.innerHTML = '<i class="fas fa-play"></i> Clique aq bb';
      }
    }
  };
  
  // Atualiza active na navbar baseado no scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
});

// Função para criar pétalas de sakura
function createSakuraPetals() {
  const container = document.getElementById('petalContainer');
  if (!container) return;
  
  const numberOfPetals = 50;
  container.innerHTML = '';
  
  for (let i = 0; i < numberOfPetals; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + '%';
    const size = Math.random() * 15 + 10;
    petal.style.width = size + 'px';
    petal.style.height = (size * 1.2) + 'px';
    const duration = Math.random() * 8 + 6;
    petal.style.animationDuration = duration + 's';
    const delay = Math.random() * 10;
    petal.style.animationDelay = delay + 's';
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    petal.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(petal);
  }
}