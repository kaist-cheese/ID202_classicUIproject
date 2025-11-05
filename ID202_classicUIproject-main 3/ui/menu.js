// 메뉴 관련 상태 관리
let appleLogo, dropdownMenu, blackSquare, aboutBox, aboutButton, aboutBoxQuit;
let activeDropdownItem = null;

// 초기화 함수
export function initializeMenu() {
    appleLogo = document.getElementById('AppleLogo');
    dropdownMenu = document.getElementById('dropdownMenu');
    blackSquare = document.createElement('div');
    blackSquare.className = 'black-square';
    document.querySelector('.menu-bar').appendChild(blackSquare);
    aboutBox = document.getElementById('AboutBox');
    aboutButton = document.querySelector('.dropdown-button:first-child');
    aboutBoxQuit = document.getElementById('AboutBoxQuit');

    setupEventListeners();
}

function setupEventListeners() {
    appleLogo.addEventListener('click', handleAppleLogoClick);
    aboutButton.addEventListener('click', handleAboutClick);
    aboutBoxQuit.addEventListener('click', handleAboutClose);
    document.addEventListener('click', handleOutsideClick);
    
    // 드롭다운 메뉴 아이템 호버 효과
    const dropdownItems = dropdownMenu.querySelectorAll('li');
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            activeDropdownItem = e.currentTarget;
            updateBlackSquare();
        });
        item.addEventListener('mouseleave', () => {
            activeDropdownItem = null;
            updateBlackSquare();
        });
    });
}

function handleAppleLogoClick(event) {
    event.stopPropagation();
    const isVisible = dropdownMenu.style.display === 'block';
    
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
    blackSquare.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        appleLogo.style.clipPath = 'inset(50% 0 0 0)';
        appleLogo.style.top = '-13px';
        updateBlackSquare();
    } else {
        appleLogo.style.clipPath = 'inset(0 0 50% 0)';
        appleLogo.style.top = '4px';
        blackSquare.style.display = 'none';
    }
}

function updateBlackSquare() {
    if (activeDropdownItem) {
        const itemRect = activeDropdownItem.getBoundingClientRect();
        const menuRect = dropdownMenu.getBoundingClientRect();
        blackSquare.style.top = (itemRect.top - menuRect.top + 30) + 'px';
        blackSquare.style.left = '15px';
        blackSquare.style.width = menuRect.width + 'px';
        blackSquare.style.height = itemRect.height + 'px';
        blackSquare.style.display = 'block';
    } else {
        blackSquare.style.top = '0';
        blackSquare.style.left = '15px';
        blackSquare.style.width = '15px';
        blackSquare.style.height = '30px';
    }
}

function handleAboutClick(event) {
    event.stopPropagation();
    dropdownMenu.style.display = 'none';
    
    const mainArea = document.querySelector('.main');
    aboutBox.style.left = ((800 - 300) / 2) + 'px';
    aboutBox.style.top = ((600 - 180) / 2) + 'px';
    
    openAboutBox();
}

function openAboutBox() {
    aboutBox.style.display = 'flex';
    aboutBox.style.background = 'transparent';
    aboutBox.style.transform = 'scale(0.3)';
    
    const content = aboutBox.querySelector('.about-content');
    content.style.visibility = 'hidden';
    
    let frame = 0;
    const totalFrames = 14;
    const frameInterval = setInterval(() => {
        frame++;
        
        if (frame <= 7) {
            aboutBox.style.transform = `scale(${0.3 + ((frame/7) * 0.7)})`;
            aboutBox.style.border = '2px solid black';
            aboutBox.style.background = 'transparent';
            aboutBox.style.boxShadow = 'none';
        } else {
            if (frame === 9) {
                aboutBox.style.background = '#ededed';
                aboutBox.style.boxShadow = '4px 4px 0 black';
            }
            if (frame === 11) {
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

function handleOutsideClick() {
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
        blackSquare.style.display = 'none';
        appleLogo.style.clipPath = 'inset(0 0 50% 0)';
        appleLogo.style.top = '4px';
    }
}