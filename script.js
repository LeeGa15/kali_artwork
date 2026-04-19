document.addEventListener('DOMContentLoaded', () => {
    // Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-theme-base/90', 'shadow-sm');
            navbar.classList.remove('bg-theme-base/60');
        } else {
            navbar.classList.remove('bg-theme-base/90', 'shadow-sm');
            navbar.classList.add('bg-theme-base/60');
        }
    });

    console.log("%c✨ Kali Artwork Layout Loaded ✨", "color: #FFD1DC; font-size: 16px; font-weight: bold;");

    // Security: Anti-download protections for images
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // Dynamic Gallery Logic
    const artworkData = {
        "塗鴉": {
            "Q版": [
                { src: "images/塗鴉/Q版/281-1.png", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/Q版/284-1.png", tools: ["Clip Studio Paint"] }
            ],
            "塗鴉驚喜包": [
                { src: "images/塗鴉/塗鴉驚喜包/269.png", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/282.png", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/285.png", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/293.png", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/305.png", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/312.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/321-摸頭.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/321.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/塗鴉驚喜包/324-1.png", tools: ["Clip Studio Paint"] }
            ],
            "彩色": [
                { src: "images/塗鴉/彩色/258.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/彩色/259.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/彩色/260.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/彩色/261.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/彩色/263.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/彩色/264.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/彩色/265.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/彩色/267.jpg", tools: ["Clip Studio Paint"] }
            ],
            "黑白": [
                { src: "images/塗鴉/黑白/172.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/黑白/174.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/黑白/275.jpg", tools: ["Clip Studio Paint"] },
                { src: "images/塗鴉/黑白/330.png", tools: ["Clip Studio Paint"] }
            ]
        },
        "精稿": {
            "全身立繪": [
                { src: "images/精稿/全身立繪/291.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/全身立繪/328-1.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/全身立繪/331-1.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/全身立繪/451.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/全身立繪/54210.png", tools: ["Clip Studio Paint"] }
            ],
            "精緻插圖": [
                { src: "images/精稿/精緻插圖/150.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/精緻插圖/220.png", tools: ["Clip Studio Paint", "Procreate"] },
                { src: "images/精稿/精緻插圖/230.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/精緻插圖/250.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/精緻插圖/270.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/精緻插圖/271.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/精緻插圖/302.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/精緻插圖/325.png", tools: ["Clip Studio Paint", "Procreate", "Blender"] }
            ],
            "胸像 - 半身": [
                { src: "images/精稿/胸像 - 半身/211-1.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/胸像 - 半身/240.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/胸像 - 半身/245.png", tools: ["Clip Studio Paint"] },
                { src: "images/精稿/胸像 - 半身/IMG_2885 (1).PNG", tools: ["Procreate", "Clip Studio Paint"] }
            ]
        }
    };

    const coversContainer = document.getElementById('category-covers');
    const detailsContainer = document.getElementById('category-details');
    const backBtn = document.getElementById('back-btn');
    const currentCategoryTitle = document.getElementById('current-category-title');
    const filterTagsContainer = document.getElementById('filter-tags');
    const imagesGrid = document.getElementById('images-grid');

    let currentMainCategory = null;
    let currentSubCategory = 'all';

    function getCoverImage(mainCategory) {
        const subCats = artworkData[mainCategory];
        for (const key in subCats) {
            if (subCats[key].length > 0) return subCats[key][0].src;
        }
        return '';
    }

    function renderMainCategories() {
        if (!coversContainer) return;
        coversContainer.innerHTML = '';
        Object.keys(artworkData).forEach(category => {
            const coverImg = getCoverImage(category);

            const cardHTML = `
                <div class="cursor-pointer group relative overflow-hidden bg-slate-50 gallery-cover-card w-[90%] sm:w-80 md:w-96 rounded-2xl shadow-sm flex-shrink-0" data-category="${category}">
                    <div style="aspect-ratio: 16/11;" class="overflow-hidden relative">
                        <img src="${coverImg}" alt="${category}" class="absolute inset-0 w-full h-full object-cover image-scale-anim opacity-80 group-hover:opacity-100">
                    </div>
                    <div class="absolute inset-0 bg-overlay"></div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h3 class="text-4xl md:text-5xl font-serif text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-[0.2em] text-scale-anim">${category}</h3>
                    </div>
                </div>
            `;
            coversContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        coversContainer.querySelectorAll('div[data-category]').forEach(card => {
            card.addEventListener('click', () => {
                const selectedCat = card.getAttribute('data-category');
                openCategory(selectedCat);
            });
        });
    }

    function openCategory(category) {
        currentMainCategory = category;
        currentSubCategory = 'all';

        coversContainer.classList.add('hidden');
        detailsContainer.classList.remove('hidden');

        currentCategoryTitle.textContent = category;

        renderFilterTags();
        renderImages();

        const yOffset = -100;
        const element = document.getElementById('gallery');
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    function renderFilterTags() {
        filterTagsContainer.innerHTML = '';
        const subcategories = Object.keys(artworkData[currentMainCategory]);

        const allTag = createFilterTag('ALL', 'all', currentSubCategory === 'all');
        filterTagsContainer.appendChild(allTag);

        subcategories.forEach(sub => {
            const tag = createFilterTag(sub.toUpperCase(), sub, currentSubCategory === sub);
            filterTagsContainer.appendChild(tag);
        });
    }

    function createFilterTag(label, value, isActive) {
        const btn = document.createElement('button');
        btn.textContent = label;

        if (isActive) {
            btn.className = "px-4 py-2 border-b border-slate-800 text-slate-800 tracking-[0.1em] transition-all duration-300";
        } else {
            btn.className = "px-4 py-2 border-b border-transparent text-slate-400 hover:text-slate-600 tracking-[0.1em] transition-all duration-300";
        }

        btn.addEventListener('click', () => {
            currentSubCategory = value;
            renderFilterTags();
            renderImages();
        });

        return btn;
    }

    function renderImages() {
        imagesGrid.innerHTML = '';

        const data = artworkData[currentMainCategory];
        let imagesToRender = [];

        if (currentSubCategory === 'all') {
            Object.values(data).forEach(arr => {
                imagesToRender = imagesToRender.concat(arr);
            });
        } else {
            imagesToRender = data[currentSubCategory] || [];
        }

        imagesToRender.forEach((imgObj, index) => {
            const delay = (index % 10) * 50;

            const imgSrc = imgObj.src;
            const tools = imgObj.tools || [];
            const toolsAttr = tools.join(',');

            const cardHTML = `
                <div class="group relative animate-fade-in-up bg-transparent gallery-image-card cursor-pointer" style="animation-delay: ${delay}ms; animation-fill-mode: both;" onclick="openLightbox('${imgSrc}', '${toolsAttr}')">
                    <div style="aspect-ratio: 4/5;" class="overflow-hidden rounded-2xl bg-white shadow-sm relative">
                        <img src="${imgSrc}" alt="${imgSrc.split('/').pop()}" loading="lazy" class="w-full h-full object-cover image-scale-anim border border-slate-100">
                        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-end gap-2 pointer-events-none">
                            ${tools.map(t => `<span class="px-2 py-1 bg-white/20 backdrop-blur-md rounded border border-white/30 text-white text-[10px] uppercase font-sans tracking-widest">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            imagesGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        if (imagesToRender.length === 0) {
            imagesGrid.innerHTML = '<p class="text-slate-300 font-serif text-center col-span-full py-20 tracking-widest">NO ARTWORKS YET.</p>';
        }
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailsContainer.classList.add('hidden');
            coversContainer.classList.remove('hidden');
            currentMainCategory = null;

            const yOffset = -100;
            const element = document.getElementById('gallery');
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    }

    // Lightweight Particle System (Sakura / Dust)
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const startX = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 20 + 20;

            p.className = 'absolute rounded-full bg-theme-glow opacity-40 mix-blend-multiply';
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${startX}%`;
            p.style.bottom = '-20px';
            p.style.animation = 'floatUp ' + duration + 's linear ' + delay + 's infinite';

            container.appendChild(p);
        }
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes floatUp {
            0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
            10% { opacity: 0.6; }
            50% { transform: translateY(-50vh) translateX(20px) scale(1.2); }
            90% { opacity: 0.6; }
            100% { transform: translateY(-110vh) translateX(-20px) scale(0.8); opacity: 0; }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        /* Mobile back button */
        @media (max-width: 768px) {
            #back-btn {
                display: flex !important;
                position: relative;
                transform: none;
                justify-content: center;
                margin-bottom: 1rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Lightbox Setup
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTools = document.getElementById('lightbox-tools');
    const lightboxClose = document.getElementById('lightbox-close');

    window.openLightbox = function (src, toolsString) {
        if (!lightbox) return;
        lightboxImg.src = src;

        const tools = toolsString.split(',');
        lightboxTools.innerHTML = tools.map(t => `
            <span class="px-5 py-2 border border-theme-glow/50 bg-theme-glow/10 text-theme-glow rounded-full text-xs font-serif tracking-widest backdrop-blur-md">
                ${t}
            </span>
        `).join('');

        lightbox.classList.remove('hidden');
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightbox.classList.add('opacity-100');
            lightboxImg.classList.remove('scale-95');
            lightboxImg.classList.add('scale-100');
        }, 10);
    };

    window.closeLightbox = function () {
        if (!lightbox) return;
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
        }, 300);
    };

    if (lightboxClose) lightboxClose.addEventListener('click', window.closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            window.closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
            window.closeLightbox();
        }
    });

    createParticles();
    renderMainCategories();
});
