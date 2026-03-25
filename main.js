// =========================================
// RADIO HMZ - JavaScript System
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- AUDIO PLAYER LOGIC ---
    const audioStream = document.getElementById('audio-stream');
    const mainPlayBtn = document.getElementById('main-play-btn');
    const heroPlayBtn = document.getElementById('hero-play-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const muteIcon = document.getElementById('mute-icon');
    
    let isPlaying = false;

    function togglePlay() {
        if (isPlaying) {
            audioStream.pause();
            isPlaying = false;
            updatePlayButtonsState();
        } else {
            // Because it's a live stream, reloading the src can prevent drifting or buffering issues
            // when resuming after being paused for a long time.
            audioStream.src = "https://stream.zeno.fm/invn67uxbimtv"; 
            
            const playPromise = audioStream.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    updatePlayButtonsState();
                }).catch(error => {
                    console.error("Audio playback prevented:", error);
                    alert("Por favor, interactúa con la página antes de reproducir automáticamente.");
                });
            }
        }
    }

    function updatePlayButtonsState() {
        const iconClass = isPlaying ? 'fa-stop' : 'fa-play';
        const btnClassAdd = isPlaying ? 'playing' : '';
        const btnClassRemove = isPlaying ? '' : 'playing';
        
        mainPlayBtn.innerHTML = `<i class="fas ${iconClass}"></i>`;
        heroPlayBtn.innerHTML = `<i class="fas ${iconClass}"></i> ${isPlaying ? 'Detener Transmisión' : 'Escuchar en Vivo'}`;
        
        if (isPlaying) {
            mainPlayBtn.classList.add('playing');
        } else {
            mainPlayBtn.classList.remove('playing');
        }
    }

    // Event Listeners for buttons
    mainPlayBtn.addEventListener('click', togglePlay);
    heroPlayBtn.addEventListener('click', togglePlay);

    // Volume Control Logic
    volumeSlider.addEventListener('input', (e) => {
        const volume = parseFloat(e.target.value);
        audioStream.volume = volume;
        updateVolumeIcon(volume);
    });

    function updateVolumeIcon(volume) {
        muteIcon.className = 'fas';
        if (volume === 0) {
            muteIcon.classList.add('fa-volume-mute');
        } else if (volume < 0.5) {
            muteIcon.classList.add('fa-volume-down');
        } else {
            muteIcon.classList.add('fa-volume-up');
        }
    }

    muteIcon.addEventListener('click', () => {
        if (audioStream.volume > 0) {
            audioStream.dataset.lastVol = audioStream.volume;
            audioStream.volume = 0;
            volumeSlider.value = 0;
        } else {
            const lastVol = audioStream.dataset.lastVol || 0.8;
            audioStream.volume = lastVol;
            volumeSlider.value = lastVol;
        }
        updateVolumeIcon(audioStream.volume);
    });

    // --- SCHEDULE TABS LOGIC ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scheduleGrids = document.querySelectorAll('.schedule-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(t => t.classList.remove('active'));
            scheduleGrids.forEach(g => g.classList.remove('active-tab'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-tab');
        });
    });

    // --- NAVBAR SCROLL LOGIC ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 4rem';
            navbar.style.background = 'rgba(10, 14, 12, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '1rem 4rem';
            navbar.style.background = 'rgba(10, 14, 12, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
});
