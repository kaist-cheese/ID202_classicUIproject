const loadingText = "ISEO OS Ⅱ.3.4\n" +
    "\n" +
    "Copyright (c) 2024. All Rights Reserved\n" +
    "BIOS Version: AlphaTest\n" +
    "\n" +
    "Battery Pack: 100%...status plugein 0K\n" +
    "Memory Test: 18607 0K\n" +
    "Initializing USB Controllers ... Done\n" +
    "Initializing DISK Controllers ... Done\n" +
    "\n" +
    "Designed in South Korea at 800, 291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea. 34141\n" +
    "\n" +
    "Use Earphones in public area\n" +
    "\n" +
    "\n" +
    "Press Any Key to boot system ...";

const lines = loadingText.split('\n');
let lineIndex = 0;

let appleLogo, dropdownMenu, blackSquare, aboutBox, aboutButton, aboutBoxQuit;
let image, text, popup, resizeHandle, popupHeader;
let isMouseDown = false;

// Add these new variables for destruction effects
let destructionElements = [];
const maxDestructionElements = 20;

const fixedMinLeft = 0;
const fixedMaxLeft = 800;
const fixedMinTop = 30;
const fixedMaxTop = 600;

const defaultWidth = 400;
const defaultHeight = 400;

function typeLine() {
    if (lineIndex < lines.length) {
        const loadingTextElement = document.getElementById("loading-text");
        if (loadingTextElement) {
            loadingTextElement.textContent += lines[lineIndex] + '\n';
            lineIndex++;
            setTimeout(typeLine, 300);
        }
    } else {
        document.addEventListener('keydown', goToLogin);
    }
}

function showLoading() {
    const loadingElement = document.getElementById("loading");
    const loadingTextElement = document.getElementById("loading-text");
    
    if (loadingElement && loadingTextElement) {
        loadingElement.style.display = 'flex';
        loadingTextElement.textContent = '';
        lineIndex = 0;
        setTimeout(typeLine, 500);
    }
}

function goToLogin() {
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.overlaygrey').style.display = 'block';
    document.body.style.cursor = 'url("https://kanye2049.com/img/loader.png") 7 10, auto';
    
    setTimeout(() => {
        document.querySelector('.overlaygrey').style.display = 'none';
        document.querySelector('.login').style.display = 'flex';
        document.body.style.cursor = 'auto';
    }, 2000);

    document.removeEventListener('keydown', goToLogin);
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value;
    if (passwordInput === '0129' || passwordInput === '0000') {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.overlaygrey').style.display = 'block';
        document.body.style.cursor = 'url("https://kanye2049.com/img/loader.png") 7 10, auto';

        // 배경음악 재생
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.play();

        setTimeout(() => {
            document.querySelector('.overlaygrey').style.display = 'none';
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.menu-bar').style.display = 'flex';
            document.querySelector('.main').style.display = 'block';
            updateTime();
            setInterval(updateTime, 60000);
            resetPopup();
            document.body.style.cursor = 'auto';
        }, 2000);
    } else {
        document.getElementById('passwordInput').value = '';
    }
}

function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    document.getElementById('current-time').innerText = now.toLocaleString('en-US', options);
}

function restart() {
    const blackScreen = document.getElementById('blackScreen');
    blackScreen.style.display = 'block';
    
    // 배경음악 정지
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    
    setTimeout(() => {
        blackScreen.style.display = 'none';
        goBackToLoading();
    }, 2000);
}

function goBackToLoading() {
    document.querySelector('.main').style.display = 'none';
    lineIndex = 0;
    document.getElementById('loading-text').innerText = '';
    showLoading();
}

function handleMouseDown() {
    isMouseDown = true;
    const centeredImage = document.getElementById('centeredImage');
    centeredImage.style.transform = 'translateY(-35px)';
    centeredImage.style.clipPath = 'inset(50% 0 0 0)';  // 클릭했을 때 clip-path 변경

    const popup = document.getElementById('popup');
    const mainArea = document.querySelector('.main');
    
    if (mainArea && popup) {
        const mainRect = mainArea.getBoundingClientRect();
        const newLeft = (mainRect.width - defaultWidth) / 2;
        const newTop = Math.max(30, (mainRect.height - defaultHeight) / 2);
        
        popup.style.left = newLeft + "px";
        popup.style.top = newTop + "px";
        popup.style.display = 'block';
        popup.style.background = 'transparent';
        
        const content = popup.querySelector('.popup-content');
        const header = popup.querySelector('.popup-header');
        if (content) content.style.visibility = 'hidden';
        if (header) header.style.visibility = 'hidden';

        let frame = 0;
        const totalFrames = 14;
        const frameInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            
            if (frame <= totalFrames / 2) {
                popup.style.transform = `scale(${0.3 + (progress * 1.4)})`;
            } else {
                if (frame === Math.floor(totalFrames * 0.6)) {
                    popup.style.background = '#fff';
                    if (header) header.style.visibility = 'visible';
                }
                if (frame === Math.floor(totalFrames * 0.8)) {
                    if (content) content.style.visibility = 'visible';
                }
            }
            
            if (frame >= totalFrames) {
                clearInterval(frameInterval);
                popup.style.transform = 'scale(1)';
            }
        }, 50);
    }
}

function handleMouseUp() {
    isMouseDown = false;
    resetImageAndText();
}

function resetImageAndText() {
    if (!isMouseDown) {
        const image = document.getElementById('centeredImage');
        const text = document.getElementById('fileText');
        image.style.transform = 'translateY(0)';
        image.style.clipPath = 'inset(0 0 50% 0)';
        text.style.backgroundColor = '#bcbcbc';
        text.style.color = 'black';
    }
}

function initResize(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const popup = e.target.closest('.popup') || e.target.closest('.terminal-popup');
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = popup.offsetWidth;
    const startHeight = popup.offsetHeight;

    function handleResize(e) {
        e.preventDefault();
        const mainArea = document.querySelector('.main');
        const mainRect = mainArea.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);

        const minWidth = 200;
        const minHeight = 150;
        const maxWidth = mainRect.width - (popupRect.left - mainRect.left);
        const maxHeight = mainRect.height - (popupRect.top - mainRect.top);

        popup.style.width = Math.max(minWidth, Math.min(width, maxWidth)) + 'px';
        popup.style.height = Math.max(minHeight, Math.min(height, maxHeight)) + 'px';
    }

    function stopResize() {
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('mouseup', stopResize);
    }

    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResize);
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        const popup = elmnt.closest('.popup') || elmnt.closest('.terminal-popup');
        const mainArea = document.querySelector('.main');
        if (popup && mainArea) {
            const mainRect = mainArea.getBoundingClientRect();
            const popupRect = popup.getBoundingClientRect();
            
            let newLeft = popup.offsetLeft - pos1;
            let newTop = popup.offsetTop - pos2;
            
            newLeft = Math.max(0, Math.min(newLeft, mainRect.width - popupRect.width));
            newTop = Math.max(30, Math.min(newTop, mainRect.height - popupRect.height));
            
            popup.style.left = newLeft + "px";
            popup.style.top = newTop + "px";
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function closePopup() {
    popup.classList.remove('opening');
    popup.style.display = 'none';
    resetImageAndText();
}

function createNoiseCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9997';
    canvas.style.opacity = '0.1';
    
    const container = document.querySelector('.window-container');
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function generateNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 255;
            data[i] = noise;
            data[i + 1] = noise;
            data[i + 2] = noise;
            data[i + 3] = Math.random() * 50;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    function animate() {
        generateNoise();
        requestAnimationFrame(animate);
    }
    
    animate();
}

function handleAppleLogoClick(event) {
    event.stopPropagation();
    const isVisible = dropdownMenu.style.display === 'block';
    
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
    blackSquare.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        appleLogo.style.clipPath = 'inset(50% 0 0 0)';
        appleLogo.style.top = '-13px';
        blackSquare.style.top = '0';
        blackSquare.style.left = '15px';
        blackSquare.style.width = '15px';
        blackSquare.style.height = '30px';
        blackSquare.style.transform = 'none';
    } else {
        appleLogo.style.clipPath = 'inset(0 0 50% 0)';
        appleLogo.style.top = '4px';
    }
}

function handleAboutClick(event) {
    event.stopPropagation();
    dropdownMenu.style.display = 'none';
    
    const mainArea = document.querySelector('.main');
    aboutBox.style.left = ((800 - 300) / 2) + 'px';
    aboutBox.style.top = ((600 - 180) / 2) + 'px';
    
    // About box opening animation
    aboutBox.style.display = 'flex';
    aboutBox.style.background = 'transparent';
    aboutBox.style.transform = 'scale(0.3)';
    
    const content = aboutBox.querySelector('.about-content');
    content.style.visibility = 'hidden';
    
    let frame = 0;
    const totalFrames = 14;
    const frameInterval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        
        if (frame <= totalFrames / 2) {
            aboutBox.style.transform = `scale(${0.3 + (progress * 1.4)})`;
        } else {
            if (frame === Math.floor(totalFrames * 0.6)) {
                aboutBox.style.background = '#ededed';
            }
            if (frame === Math.floor(totalFrames * 0.8)) {
                content.style.visibility = 'visible';
            }
        }
        
        if (frame >= totalFrames) {
            clearInterval(frameInterval);
            aboutBox.style.transform = 'scale(1)';
        }
    }, 50);
}

function handleAboutClose() {
    aboutBox.style.display = 'none';
    appleLogo.style.clipPath = 'inset(0 0 50% 0)';
    appleLogo.style.top = '4px';
    blackSquare.style.display = 'none';
}

function resetPopup() {
    if (popup) {
        const mainArea = document.querySelector('.main');
        if (mainArea) {
            const mainRect = mainArea.getBoundingClientRect();
            
            popup.style.width = defaultWidth + 'px';
            popup.style.height = defaultHeight + 'px';
            
            // 800x600 화면 안에서 중앙 정렬
            const newLeft = (mainRect.width - defaultWidth) / 2;
            const newTop = (mainRect.height - defaultHeight) / 2;
            
            popup.style.left = newLeft + "px";
            popup.style.top = newTop + "px";
        }
    }
}

function createDestructionEffect(x, y) {
    const element = document.createElement('div');
    element.className = 'destruction-effect';
    
    // Randomize the appearance
    const isBar = Math.random() > 0.5;
    if (isBar) {
        element.style.width = Math.random() * 50 + 20 + 'px';
        element.style.height = '3px';
        element.style.transform = `rotate(${Math.random() * 360}deg)`;
    } else {
        const size = Math.random() * 30 + 10;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    }
    
    element.style.position = 'fixed';
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    element.style.backgroundColor = '#000';
    element.style.zIndex = '9999';
    
    document.body.appendChild(element);
    destructionElements.push(element);
    
    // Remove old elements if we have too many
    if (destructionElements.length > maxDestructionElements) {
        const oldElement = destructionElements.shift();
        oldElement.remove();
    }
}

function handleGlobalKeyPress(event) {
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // 숫자키(0-9) 입력 처리
    if (event.key >= '0' && event.key <= '9' && backgroundMusic) {
        const randomPosition = Math.random() * backgroundMusic.duration;
        backgroundMusic.currentTime = randomPosition;
        return;
    }
}

function createVignetteEffect() {
    const vignette = document.createElement('div');
    vignette.className = 'vignette-overlay';
    document.body.appendChild(vignette);

    // 초기 비네팅 표시
    setTimeout(() => {
        vignette.style.opacity = '0.3';
        vignette.style.background = 'radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.7) 100%)';
    }, 100);

    // 점진적으로 비네팅 강화
    let opacity = 0.3;
    let radius = 30;
    
    const interval = setInterval(() => {
        opacity = Math.min(opacity + 0.05, 1);
        radius = Math.max(radius - 1, 0);
        
        vignette.style.opacity = opacity.toString();
        vignette.style.background = `radial-gradient(circle, transparent ${radius}%, rgba(0, 0, 0, 0.9) 100%)`;
        
        if (opacity >= 1 && radius <= 0) {
            clearInterval(interval);
        }
    }, 2000); // 2초마다 업데이트
}

function startRandomShake() {
    function triggerRandomShake() {
        const mainElement = document.querySelector('.main');
        if (mainElement) {
            // 50% 확률로 떨림 효과 발생
            if (Math.random() > 0.5) {
                mainElement.style.animation = 'none';
                mainElement.offsetHeight; // Trigger reflow
                
                // 랜덤한 강도의 떨림 효과
                const intensity = Math.random() * 3 + 1; // 1-4px 범위
                const duration = Math.random() * 0.4 + 0.2; // 0.2-0.6초 범위
                
                const shakeKeyframes = `
                    @keyframes randomShake {
                        0%, 100% { transform: translate(0, 0); }
                        25% { transform: translate(${intensity}px, ${intensity}px); }
                        50% { transform: translate(-${intensity}px, -${intensity}px); }
                        75% { transform: translate(-${intensity}px, ${intensity}px); }
                    }
                `;
                
                const styleSheet = document.createElement('style');
                styleSheet.textContent = shakeKeyframes;
                document.head.appendChild(styleSheet);
                
                mainElement.style.animation = `randomShake ${duration}s`;
                
                // 애니메이션이 끝나면 스타일 시트 제거
                setTimeout(() => {
                    styleSheet.remove();
                }, duration * 1000);
            }
        }
    }
    
    // 2-7초 간격으로 랜덤하게 실행
    function scheduleNextShake() {
        const delay = Math.random() * 5000 + 2000; // 2000-7000ms
        setTimeout(() => {
            triggerRandomShake();
            scheduleNextShake(); // 다음 떨림 예약
        }, delay);
    }
    
    scheduleNextShake(); // 첫 떨림 시작
}

function handleTerminalClick() {
    isMouseDown = true;
    const terminalIcon = document.getElementById('terminalIcon');
    const terminalText = document.getElementById('terminalText');
    terminalIcon.style.transform = 'translateY(-35px)';
    terminalText.style.backgroundColor = '#bcbcbc';
    terminalText.style.color = 'black';

    const terminalPopup = document.getElementById('terminalPopup');
    const mainArea = document.querySelector('.main');
    
    // Reset terminal content
    document.getElementById('terminalOutput').innerHTML = '';
    document.getElementById('terminalInput').value = '';
    
    if (mainArea && terminalPopup) {
        const mainRect = mainArea.getBoundingClientRect();
        const newLeft = (mainRect.width - defaultWidth) / 2;
        const newTop = Math.max(30, (mainRect.height - defaultHeight) / 2);
        
        terminalPopup.style.left = newLeft + "px";
        terminalPopup.style.top = newTop + "px";
        terminalPopup.style.display = 'block';
        terminalPopup.style.background = 'transparent';
        
        const content = terminalPopup.querySelector('.terminal-content');
        const header = terminalPopup.querySelector('.popup-header');
        if (content) content.style.visibility = 'hidden';
        if (header) header.style.visibility = 'hidden';

        let frame = 0;
        const totalFrames = 14;
        const frameInterval = setInterval(() => {
            frame++;
            
            if (frame <= 7) {
                terminalPopup.style.transform = `scale(${0.3 + ((frame/7) * 0.7)})`;
            } else {
                if (frame === Math.floor(totalFrames * 0.6)) {
                    terminalPopup.style.background = '#444444';
                    if (header) header.style.visibility = 'visible';
                }
                if (frame === Math.floor(totalFrames * 0.8)) {
                    if (content) {
                        content.style.visibility = 'visible';
                        document.getElementById('terminalInput').focus();
                    }
                }
            }
            
            if (frame >= totalFrames) {
                clearInterval(frameInterval);
                terminalPopup.style.transform = 'scale(1)';
            }
        }, 50);
    }
}

function handleTerminalInput(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim();
        const output = document.getElementById('terminalOutput');
        
        // 입력한 명령어 표시
        output.innerHTML += `<div><span class="prompt">root~Macintosh128k~%</span> ${input}</div>`;
        
        // 사용 가능한 명령어들
        const availableCommands = [
            'inseongseo', 'break', 'wow', 'musicstop', 'music', 'musicplay', 
            'clear', 'help', 'exit', 'upsidedown', 'whatisthis', 'why?.txt',
            'anything', 'explode', 'esc'
        ];
        
        // 명령어 처리
        if (input === 'clear') {
            output.innerHTML = '';
        } else if (input === 'help') {
            output.innerHTML += `<div>Available commands:
  inseongseo
  break
  wow
  musicstop
  music
  musicplay
  upsidedown
  whatisthis
  why?.txt
  anything
  explode
  esc
  clear
  help
  exit</div>`;
        } else if (input === 'upsidedown') {
            const mainElement = document.querySelector('.main');
            if (mainElement.style.transform === 'rotate(180deg)') {
                mainElement.style.transform = 'rotate(0deg)';
                output.innerHTML += `<div>put me back with upsidedown again :(</div>`;
            } else {
                mainElement.style.transform = 'rotate(180deg)';
                output.innerHTML += `<div>put me back with upsidedown again :(</div>`;
            }
        } else if (input === 'whatisthis') {
            output.innerHTML += `<div>created for ID202 this is a fun project where you get to interact with my version of System1</div>`;
        } else if (input === 'why?.txt') {
            output.innerHTML += `<div>life</div>`;
        } else if (input === 'anything') {
            output.innerHTML += `<div>anything</div>`;
        } else if (input === 'explode') {
            output.innerHTML += `<div>BOMB BOMB</div>`;
        } else if (input === 'esc') {
            output.innerHTML += `<div>wait a moment please...</div>`;
            let count = 0;
            const interval = setInterval(() => {
                output.innerHTML += `<div>.</div>`;
                output.scrollTop = output.scrollHeight;
                count++;
                if (count >= 10) {
                    clearInterval(interval);
                    setTimeout(() => {
                        output.innerHTML += `<div>it aint that easy. Try anotherway out..</div>`;
                        output.scrollTop = output.scrollHeight;
                    }, 1000);
                }
            }, 1000);
        } else if (input === 'break') {
            const vignette = document.createElement('div');
            vignette.style.position = 'fixed';
            vignette.style.top = '0';
            vignette.style.left = '0';
            vignette.style.width = '100%';
            vignette.style.height = '100%';
            vignette.style.backgroundColor = 'white';
            vignette.style.zIndex = '99999';
            document.body.appendChild(vignette);
            
            setTimeout(() => {
                vignette.remove();
            }, 500);
        } else if (input === 'wow') {
            output.innerHTML += `<div>thanks :-)</div>`;
        } else if (input === 'musicstop') {
            const backgroundMusic = document.getElementById('backgroundMusic');
            if (backgroundMusic) {
                backgroundMusic.pause();
                output.innerHTML += `<div>so sad you don't like my life</div>`;
            }
        } else if (input === 'music') {
            output.innerHTML += `<div>this music is/was my life</div>`;
        } else if (input === 'musicplay') {
            const backgroundMusic = document.getElementById('backgroundMusic');
            if (backgroundMusic) {
                backgroundMusic.play();
                output.innerHTML += `<div>lesssssgooooo</div>`;
            }
        } else if (input === 'inseongseo') {
            output.innerHTML += `<div>call +82 1051873202 but why?</div>`;
        } else if (input === 'exit') {
            closeTerminal();
            return;
        } else if (input !== '') {
            // 없는 명령어일 때 랜덤으로 추천
            const suggestedCommands = availableCommands
                .filter(cmd => cmd !== 'help' && cmd !== 'clear' && cmd !== 'exit')
                .sort(() => 0.5 - Math.random())
                .slice(0, 1);
            
            output.innerHTML += `<div>command not found: ${input}
try: ${suggestedCommands[0]}</div>`;
        }
        
        // 입력 필드 초기화
        event.target.value = '';
        
        // 스크롤을 아래로
        output.scrollTop = output.scrollHeight;
    }
}

function closeTerminal() {
    const terminalPopup = document.getElementById('terminalPopup');
    const terminalIcon = document.getElementById('terminalIcon');
    const terminalText = document.getElementById('terminalText');
    terminalPopup.style.display = 'none';
    terminalIcon.style.transform = 'translateY(0)';
    terminalText.style.backgroundColor = '#bcbcbc';
    terminalText.style.color = 'black';
}

window.onload = () => {
    lineIndex = 0; // Reset lineIndex
    showLoading();
    
    // DOM elements initialization
    appleLogo = document.getElementById('AppleLogo');
    dropdownMenu = document.getElementById('dropdownMenu');
    blackSquare = document.createElement('div');
    blackSquare.className = 'black-square';
    document.querySelector('.menu-bar').appendChild(blackSquare);
    aboutBox = document.getElementById('AboutBox');
    aboutBoxQuit = document.getElementById('AboutBoxQuit');
    image = document.getElementById('centeredImage');
    text = document.getElementById('fileText');
    popup = document.getElementById('popup');
    resizeHandle = document.querySelector('.resize-handle');
    popupHeader = document.getElementById('popup-header');

    // Event listeners
    document.getElementById('passwordInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') checkPassword();
    });

    appleLogo.addEventListener('click', handleAppleLogoClick);
    dropdownMenu.querySelector('li:first-child').addEventListener('click', handleAboutClick);
    aboutBoxQuit.addEventListener('click', handleAboutClose);
    image.addEventListener('mousedown', handleMouseDown);
    text.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    resizeHandle.addEventListener('mousedown', initResize);
    dragElement(popupHeader);

    // 터미널 관련 이벤트 리스너 추가
    const terminalIcon = document.getElementById('terminalIcon');
    const terminalText = document.getElementById('terminalText');
    terminalIcon.addEventListener('mousedown', handleTerminalClick);
    terminalText.addEventListener('mousedown', handleTerminalClick);
    
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.addEventListener('keypress', handleTerminalInput);
    
    dragElement(document.getElementById('terminal-header'));

    // Add resize handlers for both popup and terminal
    const popupResizeHandle = document.querySelector('.popup .resize-handle');
    const terminalResizeHandle = document.querySelector('.terminal-popup .resize-handle');
    
    if (popupResizeHandle) popupResizeHandle.addEventListener('mousedown', initResize);
    if (terminalResizeHandle) terminalResizeHandle.addEventListener('mousedown', initResize);
    
    dragElement(popupHeader);
    dragElement(document.getElementById('terminal-header'));

    // Dropdown menu hover effects
    dropdownMenu.querySelectorAll('li').forEach((item, idx) => {
        item.addEventListener('mouseenter', () => {
            blackSquare.style.display = 'block';
            blackSquare.style.top = `${30 + (idx * 30)}px`;
            blackSquare.style.left = '15px';
            blackSquare.style.width = '100px';
            blackSquare.style.height = '30px';
        });
        
        item.addEventListener('mouseleave', () => {
            if (dropdownMenu.style.display === 'block') {
                blackSquare.style.display = 'block';
                blackSquare.style.top = '0';
                blackSquare.style.left = '15px';
                blackSquare.style.width = '15px';
                blackSquare.style.height = '30px';
            }
        });
    });

    // Outside click handler
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown') && !event.target.closest('#AppleLogo')) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
                blackSquare.style.display = 'none';
                appleLogo.style.clipPath = 'inset(0 0 50% 0)';
                appleLogo.style.top = '4px';
            }
        }
    });
    
    // Start CRT effect
    createNoiseCanvas();

    // 비네팅 효과 시작
    createVignetteEffect();
    
    // 랜덤 떨림 효과 시작
    startRandomShake();
    
    // Add global keyboard event listener
    document.addEventListener('keydown', handleGlobalKeyPress);

    const centeredImage = document.querySelector('.centered-image');
    centeredImage.addEventListener('mousedown', handleMouseDown);
};

// Add shake animation keyframes at the end of your existing code
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(0, 0); }
        10%, 90% { transform: translate(-1px, -1px); }
        20%, 80% { transform: translate(2px, 2px); }
        30%, 70% { transform: translate(-2px, -2px); }
        40%, 60% { transform: translate(2px, 2px); }
        50% { transform: translate(-2px, -2px); }
    }
    
    .destruction-effect {
        transition: all 0.3s ease-out;
        opacity: 1;
    }
    
    .destruction-effect:hover {
        transform: scale(1.2);
    }
`;
document.head.appendChild(styleSheet);
