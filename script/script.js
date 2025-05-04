document.addEventListener('DOMContentLoaded', function() {
    const audio = new Audio('audio/audio.mp3');
    audio.loop = true;
    let isPlaying = false;
    
    const toggleAudioBtn = document.getElementById('toggleAudio');
    
    audio.play().then(() => {
      isPlaying = true;
      toggleAudioBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(error => {
      isPlaying = false;
      toggleAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    toggleAudioBtn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        toggleAudioBtn.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        audio.play();
        toggleAudioBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
      isPlaying = !isPlaying;
    });
  
    const revealBtn = document.getElementById('revealMessage');
    const hiddenMessage = document.getElementById('hiddenMessage');
    
    revealBtn.addEventListener('click', () => {
      hiddenMessage.style.display = 'block';
      revealBtn.style.display = 'none';
      
      const texts = hiddenMessage.querySelectorAll('p');
      texts.forEach((text, index) => {
        const message = text.textContent;
        text.textContent = '';
        let i = 0;
        
        function typeWriter() {
          if (i < message.length) {
            text.textContent += message.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
          }
        }
        
        setTimeout(typeWriter, index * 1000);
      });
    });
  
    function updateCounter() {
      const startDate = new Date('2025-03-27T00:00:00');
      const now = new Date();
      const diff = now - startDate;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      document.getElementById('dias').textContent = days.toString().padStart(2, '0');
      document.getElementById('horas').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutos').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('segundos').textContent = seconds.toString().padStart(2, '0');
    }
  
    setInterval(updateCounter, 1000);
    updateCounter();
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    document.getElementById('currentDate').textContent = today.toLocaleDateString('pt-BR', options);
    
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
      window.scrollTo({
        top: document.querySelector('main').offsetTop,
        behavior: 'smooth'
      });
    });
    
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      section.style.opacity = 0;
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  });