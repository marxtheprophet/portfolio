document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    const staggerElements = document.querySelectorAll('.reveal-stagger');
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });
});

// --- Modal Data & Logic ---
const projectData = {
    'fitbeat': {
        title: 'Fit Beat',
        tags: ['IoT', 'Machine Learning'],
        longDesc: 'Designed and implemented a real-time ECG monitoring system using ESP32 and AD8232 ECG front-end module with 500 Hz sampling rate. Implemented a Python-based acquisition pipeline for preprocessing with 4 steps filtering. Built and trained a lightweight Residual 1D CNN model on Chapman 2018 ECG dataset for classifying 77 cardiac conditions. Utilized Supabase for backend and React for front-end to develop a real-time visualization dashboard and emergency alert system.',
        images: ['1767036815520.jpg']
    },
    'mentat': {
        title: 'Search Engine',
        tags: ['Python + FastAPI', 'Algorithms'],
        longDesc: 'Engineered a domain-constrained web crawler using BFS traversal, depth limiting, URL normalization, and hash-based deduplication to systematically collect and index content from Reddit, Medium, and GitHub. Developed a text processing pipeline with HTML DOM parsing, tokenization, stopword removal, and document normalization for efficient indexing. Implemented BM25-based ranking for information retrieval, optimizing relevance by normalizing term frequency and document length, and exposed a FastAPI-based search service for low-latency query processing.',
        images: ['SCR-20260607-kywa.png']
    },
    'bureautrac': {
        title: 'Bureautrac',
        tags: ['Blockchain', 'Full Stack'],
        longDesc: 'Architected a permissioned blockchain network on Hyperledger Fabric 2.5 with 9 organizations, 3 isolated channels. Developed smart contract (chaincode) implementing MSP-based access control, work-package submission, engineer certification workflows, and paginated ledger queries with full transaction history. Built an Express.js REST API with Fabric CA integration for identity management, and configured Docker-orchestrated deployment with TLS encryption and X.509 certificate-based authentication.',
        images: ['SCR-20260607-lcpo.jpeg', 'SCR-20260607-ldeb.png', 'SCR-20260607-leni.png', 'SCR-20260607-lcfe.png']
    }
};

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const modalBody = document.getElementById('modalBody');
    
    // Generate Tags HTML
    const tagsHtml = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Generate Images HTML (we requested to use these specific photos for the descriptions)
    const imagesHtml = data.images.map(imgSrc => `<img src="${imgSrc}" alt="${data.title} Image">`).join('');

    modalBody.innerHTML = `
        <div class="modal-body">
            <h2>${data.title}</h2>
            <div class="card-tags">${tagsHtml}</div>
            <p>${data.longDesc}</p>
            <div class="modal-gallery">
                ${imagesHtml}
            </div>
        </div>
    `;

    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal(event) {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
}
