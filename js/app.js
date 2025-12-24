// Main App Logic

let currentModule = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Module info
const MODULE_INFO = {
    1: { name: 'Politik Malaysia', icon: '🔵' },
    2: { name: 'Isu Sosial', icon: '🟠' },
    3: { name: 'Trend Viral', icon: '🟣' },
    4: { name: 'Geopolitik', icon: '🔴' },
    5: { name: 'Konspirasi', icon: '⚫' },
    6: { name: 'Response to Post', icon: '🟢' },
    7: { name: 'Cerita Kelakar', icon: '🟡' }
};

// DOM Elements
const sections = {
    moduleSelection: document.getElementById('module-selection'),
    inputForm: document.getElementById('input-form'),
    outputSection: document.getElementById('output-section'),
    favoritesSection: document.getElementById('favorites-section')
};

const form = document.getElementById('prompt-form');
const formTitle = document.getElementById('form-title');
const promptOutput = document.getElementById('prompt-output');
const copySuccess = document.getElementById('copy-success');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeBilingualSelectors();
    loadFavorites();
    
    // Show module selection by default
    showSection('moduleSelection');
});

// Event Listeners
function initializeEventListeners() {
    // Module cards
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', () => {
            const moduleNum = parseInt(card.dataset.module);
            selectModule(moduleNum);
        });
    });

    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            handleNavigation(view);
        });
    });

    // Back buttons
    document.getElementById('back-btn').addEventListener('click', () => {
        showSection('moduleSelection');
    });

    document.getElementById('back-to-form-btn').addEventListener('click', () => {
        showSection('inputForm');
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        generatePrompt();
    });

    // Action buttons
    document.getElementById('copy-btn').addEventListener('click', copyPrompt);
    document.getElementById('save-btn').addEventListener('click', saveToFavorites);
    document.getElementById('new-prompt-btn').addEventListener('click', () => {
        showSection('moduleSelection');
    });
}

// Navigation
function handleNavigation(view) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.nav-btn').classList.add('active');

    // Show appropriate section
    if (view === 'modules') {
        showSection('moduleSelection');
    } else if (view === 'favorites') {
        showSection('favoritesSection');
        loadFavorites();
    }
}

function showSection(sectionName) {
    Object.keys(sections).forEach(key => {
        sections[key].classList.remove('active');
    });
    sections[sectionName].classList.add('active');
}

// Module Selection
function selectModule(moduleNum) {
    currentModule = moduleNum;
    formTitle.textContent = `${MODULE_INFO[moduleNum].icon} ${MODULE_INFO[moduleNum].name}`;
    
    // Reset form
    form.reset();
    
    // Show/hide fields based on module
    configureFormForModule(moduleNum);
    
    // Populate angle dropdown if applicable
    if (ANGLES[`module${moduleNum}`]) {
        populateAngles(moduleNum);
    }
    
    showSection('inputForm');
}

function configureFormForModule(moduleNum) {
    // Hide all optional fields first
    document.querySelectorAll('.form-group').forEach(group => {
        if (!group.id.includes('topic') && !group.id.includes('language') && !group.id.includes('tone-group') && !group.id.includes('length')) {
            group.classList.add('hidden');
        }
    });

    // Show angle dropdown for modules 1-2
    if (moduleNum === 1 || moduleNum === 2) {
        document.getElementById('angle-group').classList.remove('hidden');
    } else {
        document.getElementById('angle-group').classList.add('hidden');
    }

    // Module 6 specific fields
    if (moduleNum === 6) {
        document.getElementById('post-type-group').classList.remove('hidden');
        document.getElementById('original-post-group').classList.remove('hidden');
        document.getElementById('stance-group').classList.remove('hidden');
        document.getElementById('angle-input-group').classList.remove('hidden');
        document.getElementById('response-tone-group').classList.remove('hidden');
        
        // Hide common tone and length for module 6
        document.getElementById('tone-group').classList.add('hidden');
        document.getElementById('length-group').classList.add('hidden');
    }

    // Module 7 specific fields
    if (moduleNum === 7) {
        document.getElementById('irony-group').classList.remove('hidden');
        document.getElementById('story-tone-group').classList.remove('hidden');
        
        // Hide common fields
        document.getElementById('tone-group').classList.add('hidden');
        document.getElementById('length-group').classList.add('hidden');
    }
}

function populateAngles(moduleNum) {
    const angleSelect = document.getElementById('angle');
    angleSelect.innerHTML = '';
    
    const angles = ANGLES[`module${moduleNum}`];
    angles.forEach(angle => {
        const option = document.createElement('option');
        option.value = angle.value;
        option.textContent = `${angle.label} (${angle.labelMy})`;
        option.title = ANGLE_DESCRIPTIONS[angle.value];
        angleSelect.appendChild(option);
    });
}

// Prompt Generation
function generatePrompt() {
    const formData = getFormData();
    const prompt = buildPrompt(currentModule, formData);
    
    promptOutput.textContent = prompt;
    showSection('outputSection');
}

function getFormData() {
    const data = {
        topic: document.getElementById('topic').value,
        language: LANGUAGE_MAP[document.getElementById('language').value],
        tone: document.getElementById('tone').value,
        length: document.getElementById('length').value
    };

    // Module-specific data
    if (currentModule === 1 || currentModule === 2) {
        const angleValue = document.getElementById('angle').value;
        const angleObj = ANGLES[`module${currentModule}`].find(a => a.value === angleValue);
        data.angle = `${angleObj.label} - ${ANGLE_DESCRIPTIONS[angleValue]}`;
    }

    if (currentModule === 6) {
        data.postType = document.querySelector('input[name="postType"]:checked').value;
        data.originalPost = document.getElementById('originalPost').value;
        data.stance = document.getElementById('stance').value;
        data.angleInput = document.getElementById('angleInput').value;
        data.responseTone = document.getElementById('responseTone').value;
    }

    if (currentModule === 7) {
        data.irony = document.getElementById('irony').value;
        data.storyTone = document.getElementById('storyTone').value;
    }

    return data;
}

function buildPrompt(moduleNum, data) {
    let template = PROMPTS[`module${moduleNum}`];
    
    // For modules 1-5, replace base template
    if (moduleNum <= 5) {
        template = template.replace('{{base}}', PROMPTS.base);
    }

    // Replace all variables
    Object.keys(data).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, data[key]);
    });

    // Handle conditional logic for module 6
    if (moduleNum === 6) {
        if (data.postType === 'standalone') {
            template = template.replace(/{{#if standalone}}([\s\S]*?){{else}}[\s\S]*?{{\/if}}/g, '$1');
        } else {
            template = template.replace(/{{#if standalone}}[\s\S]*?{{else}}([\s\S]*?){{\/if}}/g, '$1');
        }
        
        template = template.replace('{{postType}}', data.postType === 'standalone' ? 'STANDALONE POST' : 'DIRECT REPLY');
    }

    // Handle conditional logic for module 7
    if (moduleNum === 7) {
        const toneValue = data.storyTone;
        
        if (toneValue === 'detailed') {
            template = template.replace(/{{#if detailed}}([\s\S]*?){{else if[\s\S]*?{{\/if}}/g, '$1');
        } else if (toneValue === 'deadpan') {
            template = template.replace(/{{#if detailed}}[\s\S]*?{{else if deadpan}}([\s\S]*?){{else}}[\s\S]*?{{\/if}}/g, '$1');
        } else {
            template = template.replace(/{{#if detailed}}[\s\S]*?{{else if deadpan}}[\s\S]*?{{else}}([\s\S]*?){{\/if}}/g, '$1');
        }
    }

    // Clean up any remaining template syntax
    template = template.replace(/{{[^}]+}}/g, '');
    
    return template.trim();
}

// Copy to Clipboard
async function copyPrompt() {
    const text = promptOutput.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        showCopySuccess();
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCopySuccess();
    }
}

function showCopySuccess() {
    copySuccess.classList.remove('hidden');
    setTimeout(() => {
        copySuccess.classList.add('hidden');
    }, 3000);
}

// Favorites Management
function saveToFavorites() {
    const favorite = {
        id: Date.now(),
        module: currentModule,
        moduleName: MODULE_INFO[currentModule].name,
        moduleIcon: MODULE_INFO[currentModule].icon,
        topic: document.getElementById('topic').value,
        prompt: promptOutput.textContent,
        date: new Date().toLocaleDateString('ms-MY')
    };

    favorites.unshift(favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    alert('✅ Saved to favorites!');
}

function loadFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-state">No saved prompts yet</p>';
        return;
    }

    favoritesList.innerHTML = favorites.map(fav => `
        <div class="favorite-item">
            <h3>${fav.moduleIcon} ${fav.moduleName}</h3>
            <p><strong>Topic:</strong> ${fav.topic}</p>
            <p><small>Saved: ${fav.date}</small></p>
            <div class="favorite-actions">
                <button class="btn-use" onclick="useFavorite(${fav.id})">Use This Prompt</button>
                <button class="btn-delete" onclick="deleteFavorite(${fav.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function useFavorite(id) {
    const favorite = favorites.find(f => f.id === id);
    if (!favorite) return;

    promptOutput.textContent = favorite.prompt;
    showSection('outputSection');
}

function deleteFavorite(id) {
    if (!confirm('Delete this favorite?')) return;
    
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

// Initialize bilingual selectors
function initializeBilingualSelectors() {
    // Language selector
    const languageSelect = document.getElementById('language');
    languageSelect.innerHTML = '';
    LANGUAGE_OPTIONS.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = `${option.label} (${option.labelMy})`;
        languageSelect.appendChild(opt);
    });
    
    // Tone selector
    const toneSelect = document.getElementById('tone');
    toneSelect.innerHTML = '';
    TONE_OPTIONS.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = `${option.label} (${option.labelMy})`;
        toneSelect.appendChild(opt);
    });
}

// Make functions available globally for onclick handlers
window.useFavorite = useFavorite;
window.deleteFavorite = deleteFavorite;
