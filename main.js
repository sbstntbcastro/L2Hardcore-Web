document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    startCountdown();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
});

async function fetchNews() {
    try {
        const response = await fetch('news.json');
        const news = await response.json();
        const container = document.getElementById('news-container');
        
        container.innerHTML = '';
        
        news.forEach(item => {
            const card = document.createElement('div');
            card.className = 'news-card';
            
            let videoHtml = '';
            if (item.videoUrl) {
                // Convertir link normal de youtube a link de embed
                const videoId = item.videoUrl.split('v=')[1] || item.videoUrl.split('/').pop();
                videoHtml = `
                    <div class="video-wrapper" style="margin-bottom: 15px; border-radius: 8px; overflow: hidden;">
                        <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="news-tag">${item.tag}</div>
                ${videoHtml}
                <div class="news-date">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error cargando noticias:', error);
    }
}

function startCountdown() {
    const targetDate = new Date('May 2, 2026 00:00:00').getTime();
    
    const update = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            document.querySelector('.countdown-title').innerHTML = '¡ESTAMOS ONLINE!';
            document.getElementById('timer').style.display = 'none';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    };
    
    setInterval(update, 1000);
    update();
}
