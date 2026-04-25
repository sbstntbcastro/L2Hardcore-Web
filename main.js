document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    
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
