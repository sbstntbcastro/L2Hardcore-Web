document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    startCountdown();
    fetchRanking();
    
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
            const title = document.querySelector('.countdown-title');
            if (title) title.innerHTML = '¡ESTAMOS ONLINE!';
            const timer = document.getElementById('timer');
            if (timer) timer.style.display = 'none';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const d = document.getElementById('days');
        const h = document.getElementById('hours');
        const m = document.getElementById('minutes');
        const s = document.getElementById('seconds');

        if (d) d.innerText = days.toString().padStart(2, '0');
        if (h) h.innerText = hours.toString().padStart(2, '0');
        if (m) m.innerText = minutes.toString().padStart(2, '0');
        if (s) s.innerText = seconds.toString().padStart(2, '0');
    };
    
    setInterval(update, 1000);
    update();
}

async function fetchRanking() {
    try {
        const response = await fetch('ranking.json');
        const ranking = await response.json();
        const body = document.getElementById('ranking-body');
        
        if (!body) return;
        body.innerHTML = '';
        
        ranking.forEach((player, index) => {
            const row = document.createElement('tr');
            
            let posClass = '';
            let posIcon = index + 1;
            if (index === 0) { posClass = 'gold'; posIcon = '<i class="fas fa-crown"></i> 1'; }
            else if (index === 1) { posClass = 'silver'; posIcon = '<i class="fas fa-medal"></i> 2'; }
            else if (index === 2) { posClass = 'bronze'; posIcon = '<i class="fas fa-medal"></i> 3'; }
            
            const status = player.online === '1' ? '<span class="status-on">ONLINE</span>' : '<span class="status-off">OFFLINE</span>';
            
            row.innerHTML = `
                <td class="${posClass}">${posIcon}</td>
                <td class="char-name">${player.char_name}</td>
                <td class="lvl">${player.level}</td>
                <td class="kills">${player.pvpkills}</td>
                <td class="kills">${player.pkkills}</td>
                <td>${status}</td>
            `;
            body.appendChild(row);
        });
    } catch (error) {
        console.error('Error cargando ranking:', error);
    }
}
