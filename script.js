// ==========================================
// 1. DATABASE & CONFIGURAZIONI
// ==========================================

const heroMovies = [
    {
        title: "Interstellar 2",
        desc: "Il viaggio oltre i confini del tempo continua. Scopri il segreto della nuova galassia in esclusiva su Genflix.",
        bg: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80"
    },
    {
        title: "Stranger Things 5",
        desc: "L'ultimo capitolo della saga di Hawkins. Sottosopra e realtà si scontrano per l'ultima volta.",
        bg: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1600&q=80"
    },
    {
        title: "The Batman",
        desc: "Vendetta è il suo nome. Batman affronta l'Enigmista in una Gotham più oscura che mai.",
        bg: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=1600&q=80"
    },
    {
        title: "Dune: Parte 2",
        desc: "Paul Atreides cerca vendetta contro i cospiratori che hanno distrutto la sua famiglia su Arrakis.",
        bg: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80"
    }
];

const row1Data = [
    {title: "Stranger Things", type: "Serie TV", color: "#22d3ee"},
    {title: "The Witcher", type: "Serie TV", color: "#818cf8"},
    {title: "The Batman", type: "Film", color: "#f87171"},
    {title: "La Casa di Carta", type: "Serie TV", color: "#fbbf24"},
    {title: "Inception", type: "Film", color: "#34d399"},
    {title: "Spider-Man", type: "Film", color: "#60a5fa"},
    {title: "Dark", type: "Serie TV", color: "#a78bfa"},
    {title: "Interstellar", type: "Film", color: "#f472b6"}
];

const row2Data = [
    {title: "Squid Game", type: "Serie TV", color: "#fb7185"},
    {title: "Breaking Bad", type: "Serie TV", color: "#4ade80"},
    {title: "The Last of Us", type: "Serie TV", color: "#94a3b8"},
    {title: "Joker", type: "Film", color: "#fb923c"},
    {title: "Wednesday", type: "Serie TV", color: "#2dd4bf"},
    {title: "One Piece", type: "Serie TV", color: "#e879f9"},
    {title: "Dune", type: "Film", color: "#facc15"},
    {title: "The Crown", type: "Serie TV", color: "#c084fc"}
];

// ==========================================
// 2. FUNZIONI CORE (Generazione & Hero)
// ==========================================

// Cambia il film principale in alto casualmente
function setupHero() {
    const randomIndex = Math.floor(Math.random() * heroMovies.length);
    const movie = heroMovies[randomIndex];
    document.getElementById('heroTitle').innerText = movie.title;
    document.getElementById('heroDesc').innerText = movie.desc;
    document.getElementById('heroSection').style.backgroundImage = `linear-gradient(to top, #141414, transparent), url('${movie.bg}')`;
}

// Crea l'immagine della copertina istantaneamente
function createInstantPoster(title, bgColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 300; canvas.height = 450;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "bold 30px Roboto, Arial";
    ctx.textAlign = "center";
    const words = title.split(' ');
    let y = 200;
    words.forEach(word => { ctx.fillText(word.toUpperCase(), 150, y); y += 40; });
    return canvas.toDataURL();
}

// Salva nei preferiti
function addToFavorites(event, title, poster) {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('myGenflixList')) || [];
    if (!favorites.some(m => m.title === title)) {
        favorites.push({ title, poster });
        localStorage.setItem('myGenflixList', JSON.stringify(favorites));
        alert(title + " aggiunto alla tua lista! ⭐");
    } else {
        alert("Già presente nella lista.");
    }
}

// ==========================================
// 3. RENDER & INTERAZIONE
// ==========================================

function populateRow(elementId, dataSet) {
    const row = document.getElementById(elementId);
    dataSet.forEach(data => {
        const imgUrl = createInstantPoster(data.title, data.color);
        const html = `
            <div class="movie-item" tabindex="0">
                <img src="${imgUrl}" class="movie-poster">
                <div class="movie-details">
                    <h5 class="fw-bold mb-1" style="font-size: 0.9rem;">${data.title}</h5>
                    <div class="movie-meta"><span class="match-score">98% Match</span></div>
                    <div class="d-flex align-items-center mt-3">
                        <button class="card-icon-btn play-btn"><i class="bi bi-play-fill"></i></button>
                        <button class="card-icon-btn" onclick="addToFavorites(event, '${data.title}', '${imgUrl}')"><i class="bi bi-plus"></i></button>
                        <button class="card-icon-btn ms-auto"><i class="bi bi-chevron-down"></i></button>
                    </div>
                </div>
            </div>`;
        row.insertAdjacentHTML('beforeend', html);
    });
}

function initTouch() {
    document.querySelectorAll('.movie-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                document.querySelectorAll('.movie-item.active').forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                e.stopPropagation();
            } else { this.classList.remove('active'); }
        });
    });
    document.addEventListener('click', () => {
        document.querySelectorAll('.movie-item.active').forEach(o => o.classList.remove('active'));
    });
}

// Navbar trasparente/nera
window.onscroll = () => {
    const nav = document.getElementById('mainNav');
    window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
};

// Avvio
document.addEventListener('DOMContentLoaded', () => {
    setupHero();
    populateRow('popularRow', row1Data);
    populateRow('trendingRow', row2Data);
    initTouch();
});