// ==========================================
// APPLICATION LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    initAnimations();
    setupMusic();
    initParticles();
});

function renderApp() {
    // 1. Hero
    document.getElementById('hero-title').textContent = config.greeting;
    document.getElementById('partner-name').textContent = config.partnerName;

    // 2. Content Sections
    const container = document.getElementById('content-sections');

    // Timeline Section
    container.appendChild(createSection('timeline', 'Our Story', renderTimeline()));

    // Gallery Section
    container.appendChild(createSection('gallery', 'Sweet Memories', renderGallery()));

    // Video Section (if exists)
    if (config.videoUrl) {
        container.appendChild(createSection('video', 'A Special Moment', renderVideo()));
    }

    // Reasons Section
    container.appendChild(createSection('reasons', 'Why I Love You', renderReasons()));

    // Final Letter Section
    container.appendChild(createSection('letter', '', renderLetter())); // No title for letter, handles internally

    // Footer
    document.getElementById('footer-name').textContent = config.partnerName;
    document.getElementById('footer-date').textContent = new Date().getFullYear();
}

function createSection(id, title, contentHtml) {
    const section = document.createElement('section');
    section.id = id;
    if (title) {
        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = title;
        section.appendChild(h2);
    }
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = contentHtml;
    section.appendChild(contentDiv);
    return section;
}

function renderTimeline() {
    let html = '<div class="timeline">';
    config.timeline.forEach((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        html += `
            <div class="timeline-item ${side}">
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function renderGallery() {
    let html = '<div class="gallery-grid">';
    config.photos.forEach(src => {
        html += `
            <div class="gallery-item">
                <img src="${src}" loading="lazy" alt="Memory">
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function renderVideo() {
    let html = '<div class="video-container">';
    if (config.videoUrl) {
        // Handle YouTube URLs (Shorts, Watch, etc.)
        let videoSrc = config.videoUrl;
        if (config.videoUrl.includes('youtube.com') || config.videoUrl.includes('youtu.be')) {
            // Convert Shorts or Watch URLs to Embed
            if (config.videoUrl.includes('/shorts/')) {
                const videoId = config.videoUrl.split('/shorts/')[1].split('?')[0];
                videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`;
            } else if (config.videoUrl.includes('watch?v=')) {
                const videoId = config.videoUrl.split('watch?v=')[1].split('&')[0];
                videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1`;
            }
            html += `<iframe src="${videoSrc}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            // Standard video file or other iframe
            html += `<video controls src="${config.videoUrl}"></video>`;
        }
    }
    html += '</div>';
    return html;
}

function renderReasons() {
    let html = '<div class="reasons-grid">';
    config.loveReasons.forEach((reason, index) => {
        html += `
            <div class="reason-card">
                <span class="reason-number">#${index + 1}</span>
                <p>${reason}</p>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function renderLetter() {
    return `
        <div class="letter-container">
            <div class="envelope">
                <p>${config.finalMessage}</p>
                <div class="signature">- ${config.signature}</div>
            </div>
        </div>
    `;
}

// ==========================================
// ANIMATION & INTERACTION
// ==========================================
function initAnimations() {
    // Hero Animations
    setTimeout(() => { document.getElementById('hero-title').style.opacity = 1; document.getElementById('hero-title').style.transform = 'translateY(0)'; }, 100);
    setTimeout(() => { document.getElementById('partner-name').style.opacity = 1; document.getElementById('partner-name').style.transform = 'translateY(0)'; }, 600);
    setTimeout(() => { document.getElementById('hero-subtitle').style.opacity = 1; document.getElementById('hero-subtitle').style.transform = 'translateY(0)'; }, 1100);

    // Scroll Indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const timeline = document.getElementById('timeline');
            if (timeline) timeline.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Intersection Observer
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements (check existence first)
    // Wait slightly for DOM injection
    setTimeout(() => {
        document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
        document.querySelectorAll('.reason-card').forEach(el => observer.observe(el));
        document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
    }, 100);
}

function setupMusic() {
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');

    // Set music source from config
    if (config.musicUrl) {
        audio.src = config.musicUrl;
    }

    let isPlaying = false;
    let hasInteracted = false;

    // Attempt autoplay with user interaction
    const playAudio = () => {
        audio.volume = 0.5; // Starts at 50%
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicBtn.classList.add('playing');
        }).catch(err => {
            console.log("Autoplay blocked, waiting for interaction");
        });
    };

    // Unlock audio on first click anywhere
    document.body.addEventListener('click', () => {
        if (!hasInteracted) {
            hasInteracted = true;
            if (!isPlaying) playAudio();
        }
    }, { once: true });

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
}

function initParticles() {
    const canvas = document.getElementById('heart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
            // Start at random positions initially
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.speed = Math.random() * 1 + 0.5; // Slow floating
            this.opacity = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 20 + 10;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.05 + 0.01;
        }

        update() {
            this.y -= this.speed;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * 1; // Gentle wobble

            if (this.y < -50) this.reset();
        }

        draw() {
            ctx.font = `${this.size}px serif`;
            ctx.fillStyle = `rgba(255, 183, 197, ${this.opacity})`;
            ctx.fillText('♥', this.x, this.y);
        }
    }

    // Create particles
    for (let i = 0; i < 30; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}
