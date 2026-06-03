/**
 * BMW M4 Landing Page - Interactive Logic
 * Synthesized Engine Sound (Web Audio API), Interactive Color Configurator,
 * Custom Gallery Carousel, and Scroll Reveal Animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Theme and Color Configurator Logic
    // ==========================================================================
    const swatches = document.querySelectorAll('.color-swatch');
    const vehicleImg = document.getElementById('vehicle-display-img');
    const colorNameDisplay = document.getElementById('color-name-display');
    const ambientGlow = document.getElementById('ambient-glow');
    
    // Mapping of swatch color IDs to assets, classes, and names
    const colorData = {
        yellow: {
            img: 'assets/bmw_yellow.png',
            name: 'Sao Paulo Yellow',
            themeClass: 'theme-yellow',
            glowClass: 'ambient-glow-yellow'
        },
        green: {
            img: 'assets/bmw_green.png',
            name: 'Isle of Man Green',
            themeClass: 'theme-green',
            glowClass: 'ambient-glow-green'
        },
        blue: {
            img: 'assets/bmw_blue.png',
            name: 'Portimao Blue',
            themeClass: 'theme-blue',
            glowClass: 'ambient-glow-blue'
        }
    };

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const colorId = swatch.getAttribute('data-color');
            const data = colorData[colorId];
            
            if (!data) return;

            // Update Active Swatch UI
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            // Animate Vehicle Image Change (Fade-out, swap, fade-in)
            vehicleImg.style.opacity = '0';
            vehicleImg.style.transform = 'translate(-50%, -50%) scale(0.95)';
            
            setTimeout(() => {
                vehicleImg.src = data.img;
                vehicleImg.alt = `BMW M4 Coupe ${data.name}`;
                colorNameDisplay.textContent = swatch.getAttribute('data-color-name');
                
                // Update CSS Theme Class on Body
                document.body.className = 'dark-theme ' + data.themeClass;
                
                // Update Ambient Background Glow
                ambientGlow.className = data.glowClass;
                
                // Animate image back in
                setTimeout(() => {
                    vehicleImg.style.opacity = '1';
                    vehicleImg.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 50);
            }, 300);
        });
    });

    // ==========================================================================
    // 2. Mobile Menu Navigation Overlay
    // ==========================================================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close menu when resizing beyond mobile viewport
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // ==========================================================================
    // 3. Performance Specification Tabs
    // ==========================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Set active states
            btn.classList.add('active');
            const targetPanel = document.getElementById(`tab-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 4. Scroll Reveal Animations (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 5. Interactive Gallery Slider (Carousel)
    // ==========================================================================
    const slider = document.getElementById('gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('btn-gallery-prev');
    const nextBtn = document.getElementById('btn-gallery-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    const updateSlider = (index) => {
        // Handle boundary conditions
        if (index >= totalSlides) currentSlide = 0;
        else if (index < 0) currentSlide = totalSlides - 1;
        else currentSlide = index;

        // Slide animation
        slider.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // Update Dots UI
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');

        // Update Active Slide class
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    };

    const nextSlide = () => updateSlider(currentSlide + 1);
    const prevSlide = () => updateSlider(currentSlide - 1);

    // Event listeners for controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Dots indicators click events
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            updateSlider(index);
            resetAutoSlide();
        });
    });

    // Automatic slide cycling
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Pause auto slide on hover
    const galleryContainer = document.querySelector('.gallery-slider-container');
    galleryContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    galleryContainer.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();

    // ==========================================================================
    // 6. Interactive Cockpit Simulator & Engine Synthesizer (Web Audio API)
    // ==========================================================================
    const btnEngineStart = document.getElementById('btn-engine-start');
    const btnThrottle = document.getElementById('btn-throttle');
    const engineStatusText = document.getElementById('engine-status-text');
    const displayRpm = document.getElementById('display-rpm');
    const displaySpeed = document.getElementById('display-speed');
    const gearIndicator = document.getElementById('gear-indicator');
    const gaugeFill = document.getElementById('gauge-fill');
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    const simulatorContainer = document.querySelector('.cockpit-simulator');

    // Engine Simulation States
    let isEngineOn = false;
    let isThrottlePressed = false;
    let isMuted = false;
    
    let audioCtx = null;
    let masterGain = null;
    
    // Synthesis Nodes
    let osc1 = null;
    let osc2 = null;
    let noiseNode = null;
    let filterNode = null;
    
    // Dynamic values
    let currentRpm = 0;
    let currentSpeed = 0;
    let currentGear = 'N';
    let simulationFrameId = null;
    let audioTimer = null;

    // SVG Circular Gauge Details
    // Dasharray = 377 (Full track).
    // SVG tracks from 0 (completely filled) to 377 (completely empty).
    // Target range: RPM 0-12000.
    const maxRpmLimit = 12000;
    const idleRpm = 800;
    const redlineRpm = 9500;
    
    const setGaugeRpm = (rpm) => {
        // Calculate fill percentage based on RPM
        const percent = Math.min(rpm / maxRpmLimit, 1);
        // Dashoffset: 377 is empty, 0 is full.
        // We only use about 280deg arc, so we offset mathematically:
        const dashOffset = 377 - (percent * 377 * 0.75); // 0.75 accounts for the open arc gap
        gaugeFill.style.strokeDashoffset = dashOffset;
    };

    // Initialize Web Audio Engine
    const initAudioEngine = () => {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);
    };

    // Web Audio Synthesizer: Start continuous engine noise
    const startEngineSound = () => {
        if (!audioCtx) initAudioEngine();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        // 1. Oscillator 1 - Sawtooth wave (Main rich combustion harmonics)
        osc1 = audioCtx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.value = 45; // Starts at deep rumble frequency (~700RPM equivalent)
        
        // 2. Oscillator 2 - Triangle wave (Sub-bass rumble and body)
        osc2 = audioCtx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.value = 22.5; // Half of osc1 for sub-octave depth
        
        // 3. Engine Filter (Lowpass filter to round off harsh noise, mimicking muffler)
        filterNode = audioCtx.createBiquadFilter();
        filterNode.type = 'lowpass';
        filterNode.frequency.value = 180; // Smooth rumble
        filterNode.Q.value = 2.0;

        // 4. White noise source for combustion flutter/texture
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;
        
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.value = 0.05; // Subtle texture

        // Connections
        osc1.connect(filterNode);
        osc2.connect(filterNode);
        
        // Route noise through its own bandpass filter to sound like air intake/exhaust pops
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 80;
        noiseFilter.Q.value = 1.0;
        noiseNode.connect(noiseFilter);
        noiseFilter.connect(filterNode);

        filterNode.connect(masterGain);
        
        // Start Oscillators
        osc1.start();
        osc2.start();
        noiseNode.start();

        // Engine Ignition Sound sequence (Start roar)
        const now = audioCtx.currentTime;
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(0, now);
        
        // Rev up on ignition to emulate starter catching
        masterGain.gain.linearRampToValueAtTime(isMuted ? 0 : 0.45, now + 0.1); // Quick roar volume
        masterGain.gain.linearRampToValueAtTime(isMuted ? 0 : 0.15, now + 0.9); // Settle down to idle volume
    };

    const stopEngineSound = () => {
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.linearRampToValueAtTime(0, now + 0.3); // Smooth fade out
        
        setTimeout(() => {
            if (osc1) { osc1.stop(); osc1.disconnect(); osc1 = null; }
            if (osc2) { osc2.stop(); osc2.disconnect(); osc2 = null; }
            if (noiseNode) { noiseNode.stop(); noiseNode.disconnect(); noiseNode = null; }
            if (filterNode) { filterNode.disconnect(); filterNode = null; }
        }, 350);
    };

    // Update synthesizer frequency parameters based on current RPM
    const updateSynthFrequency = (rpm) => {
        if (!osc1 || !osc2 || !filterNode || !audioCtx) return;
        
        // Base base freq is 35Hz at idle (800 RPM) up to 280Hz at Redline (9500 RPM)
        const rpmRatio = (rpm - idleRpm) / (redlineRpm - idleRpm);
        const baseFreq = 35 + (rpmRatio * 215);
        
        const now = audioCtx.currentTime;
        
        // Smoothly slide frequency
        osc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
        osc2.frequency.setTargetAtTime(baseFreq * 0.5, now, 0.05);
        
        // Filter frequency opens up as RPM climbs (creating brighter, louder exhaust sound)
        const filterFreq = 160 + (rpmRatio * 800);
        filterNode.frequency.setTargetAtTime(filterFreq, now, 0.06);
        
        // Volume climbs slightly under heavy throttle/load
        if (isThrottlePressed) {
            masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.35 + (rpmRatio * 0.25), now, 0.05);
        } else {
            masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.12, now, 0.1);
        }
    };

    // Sound Toggle Button listener
    btnSoundToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        
        if (isMuted) {
            btnSoundToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            btnSoundToggle.title = 'Nyalakan Efek Suara';
            if (masterGain && audioCtx) {
                masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
            }
        } else {
            btnSoundToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            btnSoundToggle.title = 'Matikan Efek Suara';
            if (masterGain && audioCtx && isEngineOn) {
                const rpmRatio = (currentRpm - idleRpm) / (redlineRpm - idleRpm);
                const targetGain = isThrottlePressed ? 0.35 + (rpmRatio * 0.25) : 0.12;
                masterGain.gain.setValueAtTime(targetGain, audioCtx.currentTime);
            }
        }
    });

    // Start/Stop ignition action
    const startEngine = () => {
        isEngineOn = true;
        btnEngineStart.classList.add('active');
        simulatorContainer.classList.add('engine-on');
        btnThrottle.disabled = false;
        engineStatusText.textContent = 'ENGINE RUNNING';
        engineStatusText.style.color = 'var(--accent-color)';
        
        // Play starter sound and settle to idle
        startEngineSound();
        
        // Start engine visual simulation loop
        simulateIgnitionRev();
    };

    const stopEngine = () => {
        isEngineOn = false;
        isThrottlePressed = false;
        btnEngineStart.classList.remove('active');
        simulatorContainer.classList.remove('engine-on');
        btnThrottle.disabled = true;
        btnThrottle.classList.remove('pedal-active');
        engineStatusText.textContent = 'ENGINE IS OFF';
        engineStatusText.style.color = 'var(--text-muted)';
        
        stopEngineSound();
        
        // Cancel simulation frame if active
        if (simulationFrameId) {
            cancelAnimationFrame(simulationFrameId);
        }
        
        // Ramp down gauges to zero
        rampDownGauges();
    };

    btnEngineStart.addEventListener('click', () => {
        if (!isEngineOn) {
            startEngine();
        } else {
            stopEngine();
        }
    });

    // Igniting ignition rev visual effect
    const simulateIgnitionRev = () => {
        let frame = 0;
        const totalFrames = 50; // Starter sweep duration
        
        const starterSweep = () => {
            frame++;
            if (frame <= 20) {
                // Starter spins up
                currentRpm = idleRpm + (frame / 20) * 2200; // Roar up to ~3000 RPM on start
            } else if (frame <= totalFrames) {
                // Settle down to idle
                const settleRatio = (frame - 20) / (totalFrames - 20);
                currentRpm = 3000 - settleRatio * 2200;
            }
            
            // Set displays
            displayRpm.textContent = Math.round(currentRpm / 100);
            setGaugeRpm(currentRpm);
            updateSynthFrequency(currentRpm);

            if (frame < totalFrames) {
                simulationFrameId = requestAnimationFrame(starterSweep);
            } else {
                currentRpm = idleRpm;
                currentGear = 'N';
                gearIndicator.textContent = currentGear;
                // Enter main continuous simulation loop
                simulationFrameId = requestAnimationFrame(mainSimulationLoop);
            }
        };
        
        simulationFrameId = requestAnimationFrame(starterSweep);
    };

    // Ramp down gauges to 0 when engine stops
    const rampDownGauges = () => {
        const shutdownRamp = () => {
            currentRpm *= 0.82; // exponential decay
            currentSpeed *= 0.85;
            
            if (currentRpm < 50) currentRpm = 0;
            if (currentSpeed < 1) currentSpeed = 0;

            displayRpm.textContent = Math.round(currentRpm / 100);
            displaySpeed.textContent = Math.round(currentSpeed);
            setGaugeRpm(currentRpm);

            if (currentRpm > 0 || currentSpeed > 0) {
                requestAnimationFrame(shutdownRamp);
            } else {
                currentGear = 'N';
                gearIndicator.textContent = currentGear;
            }
        };
        requestAnimationFrame(shutdownRamp);
    };

    // Dynamic Gear shifting & Speed visual simulator values
    const getGearFromRpmAndSpeed = (rpm, speed) => {
        if (!isEngineOn) return 'N';
        if (rpm < 1200 && speed < 5) return '1';
        
        // Simple automatic shifting limits based on speed
        if (speed < 40) return '1';
        if (speed < 85) return '2';
        if (speed < 140) return '3';
        return '4';
    };

    // Main running loop for accelerator pressing
    const mainSimulationLoop = () => {
        if (!isEngineOn) return;

        if (isThrottlePressed) {
            // Speed up
            currentSpeed += 1.4; // Acceleration speed rate
            if (currentSpeed > 186) currentSpeed = 186; // limit simulator speed to ~186 km/h
            
            // Calculate dynamic engine revving with automatic gear shifts:
            // Gear 1: Speed 0 - 40, RPM up to 7200
            // Gear 2: Speed 40 - 85, RPM drop to 4000 then climbs to 7800
            // Gear 3: Speed 85 - 140, RPM drop to 4500 then climbs to 8200
            // Gear 4: Speed 140+, RPM climbs slowly
            let gear = getGearFromRpmAndSpeed(currentRpm, currentSpeed);
            
            if (gear !== currentGear && currentGear !== 'N') {
                // Gear shift clutch delay drop effect!
                currentGear = gear;
                gearIndicator.textContent = currentGear;
                currentRpm -= 2200; // sudden drop in RPM representing shift
                
                // Add split-second gear shift audio drop
                if (audioCtx && !isMuted) {
                    masterGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
                    masterGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.15);
                }
            } else {
                currentGear = gear;
                gearIndicator.textContent = currentGear;
            }
            
            // RPM acceleration simulation
            if (currentGear === '1') {
                currentRpm = idleRpm + (currentSpeed / 40) * 6400; // up to 7200
            } else if (currentGear === '2') {
                currentRpm = 4000 + ((currentSpeed - 40) / 45) * 3800; // up to 7800
            } else if (currentGear === '3') {
                currentRpm = 4500 + ((currentSpeed - 85) / 55) * 3700; // up to 8200
            } else {
                currentRpm = 5000 + ((currentSpeed - 140) / 46) * 3200; // up to 8200
            }
            
            // Soft rev limiter bouncing at redline speed limit
            if (currentRpm > redlineRpm) {
                currentRpm = redlineRpm - (Math.random() * 300); // redline bounce
            }
            
        } else {
            // Decelerating (Engine braking)
            currentSpeed -= 0.8;
            if (currentSpeed < 0) currentSpeed = 0;
            
            if (currentSpeed === 0) {
                currentGear = 'N';
                gearIndicator.textContent = currentGear;
                currentRpm = currentRpm * 0.9 + idleRpm * 0.1; // Smoothly slide back to idle
                if (Math.abs(currentRpm - idleRpm) < 5) currentRpm = idleRpm;
            } else {
                currentGear = getGearFromRpmAndSpeed(currentRpm, currentSpeed);
                gearIndicator.textContent = currentGear;
                // RPM decay matching speed deceleration
                if (currentGear === '1') {
                    currentRpm = idleRpm + (currentSpeed / 40) * 4000;
                } else if (currentGear === '2') {
                    currentRpm = 3000 + ((currentSpeed - 40) / 45) * 2000;
                } else {
                    currentRpm = 3500 + ((currentSpeed - 85) / 55) * 2000;
                }
            }
        }

        // Output displays
        displayRpm.textContent = Math.round(currentRpm / 100);
        displaySpeed.textContent = Math.round(currentSpeed);
        setGaugeRpm(currentRpm);
        updateSynthFrequency(currentRpm);

        // Continue loop
        simulationFrameId = requestAnimationFrame(mainSimulationLoop);
    };

    // Event listeners for throttle pedal press
    const pressThrottle = (e) => {
        if (!isEngineOn) return;
        e.preventDefault();
        isThrottlePressed = true;
        btnThrottle.classList.add('pedal-active');
    };

    const releaseThrottle = () => {
        isThrottlePressed = false;
        btnThrottle.classList.remove('pedal-active');
    };

    btnThrottle.addEventListener('mousedown', pressThrottle);
    btnThrottle.addEventListener('mouseup', releaseThrottle);
    btnThrottle.addEventListener('mouseleave', releaseThrottle);
    
    // Mobile Touch Support for Pedal
    btnThrottle.addEventListener('touchstart', pressThrottle);
    btnThrottle.addEventListener('touchend', releaseThrottle);

    // Keyboard support: Spacebar to rev engine when engine is on
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && isEngineOn) {
            // Prevent spacebar scrolling page when revving
            e.preventDefault();
            if (!isThrottlePressed) {
                isThrottlePressed = true;
                btnThrottle.classList.add('pedal-active');
            }
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            releaseThrottle();
        }
    });

    // ==========================================================================
    // 7. Interactive Form Handler (Newsletter Email Signup)
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletter-form');
    const successMsg = document.getElementById('newsletter-success-msg');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        
        if (emailInput.value) {
            // Visual success display
            successMsg.style.display = 'block';
            emailInput.value = '';
            
            // Clean message display after 4 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
        }
    });

});
