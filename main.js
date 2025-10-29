const loadingText = "ISEO OS Ⅱ.2.4\n" +
    "\n" +
    "Copyright (c) 2024. All Rights Reserved\n" +
    "BIOS Version: AlphaTest\n" +
    "\n" +
    "Battery Pack: 100%...status plugein 0K\n" +
    "Memory Test: 18607 0K\n" +
    "Initializing USB Controllers ... Done\n" +
    "Initializing DISK Controllers ... Done\n" +
    "\n" +
    "Designed in South Korea at 800, Bonghwa-ro, Anheung-myeon, Hoengseong-gun, Gangwon-do, Republic of Korea, Korean Minjok Leadership Academy Dormitary, 25268.\n" +
    "\n" +
    "\n" +
    "Press Any Key to boot system ...";

const lines = loadingText.split('\n');
let lineIndex = 0;

let appleLogo, dropdownMenu, blackSquare, aboutBox, aboutButton, aboutBoxQuit;
let image, text, popup, resizeHandle, popupHeader;
let isMouseDown = false;

// 팝업의 고정된 위치와 크기 설정
const fixedMinLeft = 0;
const fixedMaxLeft = 800; // 최대 X좌표
const fixedMinTop = 30;
const fixedMaxTop = 600; // 최대 Y좌표

const defaultWidth = 400; // 기본 너비
const defaultHeight = 400; // 기본 높이

function typeLine() {
    if (lineIndex < lines.length) {
        document.getElementById("loading-text").innerHTML += lines[lineIndex] + '\n';
        lineIndex++;
        setTimeout(typeLine, 300);
    } else {
        document.addEventListener('keydown', goToLogin);
    }
}

function showLoading() {
    const loadingElement = document.getElementById("loading");
    const loadingTextElement = document.getElementById("loading-text");
    
    if (loadingElement && loadingTextElement) {
        loadingElement.style.display = 'flex';
        loadingTextElement.innerHTML = '';
        setTimeout(typeLine, 500); // 잠시 대기 후 타이핑 시작
    } else {
        console.error("로딩 화면 요소를 찾을 수 없습니다.");
    }
}

function goToLogin() {
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.overlaygrey').style.display = 'block';

    // 커서 변경
    document.body.style.cursor = 'url("https://kanye2049.com/img/loader.png") 7 10, auto';
    
    setTimeout(() => {
        document.querySelector('.overlaygrey').style.display = 'none';
        document.querySelector('.login').style.display = 'flex';
        document.body.style.cursor = 'auto';
    }, 2000);  /*반드시 수정*/

    document.removeEventListener('keydown', goToLogin);
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value;
    if (passwordInput === '0129' || passwordInput === '0000') {
        // 로그인 화면 숨기기
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.overlaygrey').style.display = 'block';

        // 커서 변경
        document.body.style.cursor = 'url("https://kanye2049.com/img/loader.png") 7 10, auto';

        // 2초 후에 메인 페이지로 전환
        setTimeout(() => {
            document.querySelector('.overlaygrey').style.display = 'none'; // 오버레이 숨김
            document.querySelector('.login').style.display = 'none'; // 로그인 페이지 숨김
            document.querySelector('.menu-bar').style.display = 'flex'; // 메뉴 바 표시
            document.querySelector('.main').style.display = 'block'; // 메인 페이지 표시
            updateTime(); // 시간 업데이트 시작
            setInterval(updateTime, 60000); // 1분마다 시간 업데이트
            resetPopup();
            document.body.style.cursor = 'auto'; // 커서 원래대로
        }, 2000); // 2초 /*반드시 수정*/
    } else{
        document.getElementById('passwordInput').value = '';
    }
}


function goBackToLoading() {
    document.querySelector('.main').style.display = 'none';
    lineIndex = 0;
    document.getElementById('loading-text').innerText = '';
    showLoading();
}

function changeForgotPasswordText() {
    const forgotPasswordText = document.getElementById('forgotPasswordText');
    forgotPasswordText.innerText = "Hint: 0000";
    forgotPasswordText.style.color = 'black';
    forgotPasswordText.classList.add('no-hover');
}
function changeTextColorOnHover(color) {
    const forgotPasswordText = document.getElementById('forgotPasswordText');
    if (forgotPasswordText.innerText === "Forgot your password?") {
        forgotPasswordText.style.color = color;
    }
}

window.onload = () => {
    // 로딩 화면만 먼저 표시
    showLoading();
    
    // 비밀번호 입력 이벤트 리스너
    document.getElementById('passwordInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });
    
    // DOM 변수 할당
    appleLogo = document.getElementById('AppleLogo');
    dropdownMenu = document.getElementById('dropdownMenu');
    blackSquare = document.createElement('div');
    blackSquare.className = 'black-square';
    document.body.appendChild(blackSquare);
    aboutBox = document.getElementById('AboutBox');
    aboutButton = document.querySelector('.dropdown-button:first-child');
    aboutBoxQuit = document.getElementById('AboutBoxQuit');
    image = document.getElementById('centeredImage');
    text = document.getElementById('fileText');
    popup = document.getElementById('popup');
    resizeHandle = document.querySelector('.resize-handle');
    popupHeader = document.getElementById('popup-header');

    // 3. 흩어져 있던 이벤트 리스너 할당
    appleLogo.addEventListener('click', (event) => {
        event.stopPropagation(); // 이벤트 전파 방지
        const isVisible = dropdownMenu.style.display === 'block';

        // 드롭다운 메뉴 보여주기/숨기기
        dropdownMenu.style.display = isVisible ? 'none' : 'block';
        blackSquare.style.display = isVisible ? 'none' : 'block'; // 검은 사각형 보여주기/숨기기

        // AppleLogo 스타일 변경
        if (!isVisible) {
            appleLogo.style.clipPath = 'inset(50% 0 0 0)'; // 아랫부분만 보이도록
            appleLogo.style.top = '-13px'; // AppleLogo를 65px 위로 올림
        } else {
            appleLogo.style.clipPath = 'inset(0 0 50% 0)'; // 원래 상태로 되돌리기
            appleLogo.style.top = '4px'; // 원래 위치로 되돌리기
        }
    });

    aboutButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.style.display = 'none';
        
        const mainArea = document.querySelector('.main');
        const mainRect = mainArea.getBoundingClientRect();
        
        // about-box 위치 계산 (메인 영역 내 중앙)
        const aboutBox = document.getElementById('AboutBox');
        aboutBox.style.left = ((mainRect.width - 300) / 2) + 'px';
        aboutBox.style.top = ((mainRect.height - 180) / 2) + 'px';
        
        // 윤곽선 효과로 열기
        aboutBox.style.display = 'flex';
        aboutBox.style.background = 'transparent';
        aboutBox.style.opacity = '0';
        
        let frame = 0;
        const totalFrames = 14;
        const frameInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            
            if (frame <= totalFrames / 2) {
                aboutBox.style.opacity = progress.toString();
                aboutBox.style.transform = `scale(${0.3 + (progress * 1.4)})`;
            } else {
                if (frame === Math.floor(totalFrames * 0.6)) {
                    aboutBox.style.background = '#ededed';
                }
            }
            
            if (frame >= totalFrames) {
                clearInterval(frameInterval);
                aboutBox.style.transform = 'scale(1)';
                aboutBox.style.opacity = '1';
            }
        }, 50);
    
        appleLogo.style.clipPath = 'inset(50% 0 0 0)';
        appleLogo.style.top = '-13px';
        blackSquare.style.display = 'block';
    });

    aboutBoxQuit.addEventListener('click', (event) => {
        event.stopPropagation(); // 이벤트 전파 방지
        aboutBox.style.display = 'none'; // AboutBox 숨기기

        // AppleLogo 스타일 원래대로 되돌리기
        appleLogo.style.clipPath = 'inset(0 0 50% 0)'; // 원래 상태로 되돌리기
        appleLogo.style.top = '4px'; // 원래 위치로 되돌리기
        blackSquare.style.display = 'none'; // blackSquare 숨기기
    });

    document.addEventListener('click', (event) => {
        // 드롭다운 메뉴가 열려 있으면 숨기기
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none'; // 드롭다운 메뉴 숨기기
            blackSquare.style.display = 'none'; // 검은 사각형 숨기기

            // AppleLogo 스타일 원래대로 되돌리기
            appleLogo.style.clipPath = 'inset(0 0 50% 0)'; // 원래 상태로 되돌리기
            appleLogo.style.top = '4px'; // 원래 위치로 되돌리기
        }
    });

    image.addEventListener('mousedown', handleMouseDown);
    text.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    resizeHandle.addEventListener('mousedown', initResize);
    dragElement(popupHeader);
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
    const timeString = now.toLocaleString('en-US', options); // 영어 형식으로 변경
    document.getElementById('current-time').innerText = timeString;
}

function restart() {
    const blackScreen = document.getElementById('blackScreen');
    blackScreen.style.display = 'block'; // 검은 화면 보이기

    setTimeout(() => {
        blackScreen.style.display = 'none'; // 2초 후 검은 화면 숨기기
        goBackToLoading(); // 함수 호출
    }, 2000); // 2000ms = 2초
}

function goBackToLoading() {
     document.querySelector('.main').style.display = 'none';
     lineIndex = 0;
     document.getElementById('loading-text').innerText = '';
     showLoading();
    console.log("Going back to loading...");
}

// 페이지가 로드될 때 시간 업데이트
/*window.onload = function() {
    updateTime(); // 처음 실행
    setInterval(updateTime, 60000); // 1분마다 시간 업데이트
}*/



// 팝업 초기화 함수
function resetPopup() {
    const popup = document.querySelector('.popup');
    const mainArea = document.querySelector('.main');
    
    if (popup && mainArea) {
        const mainRect = mainArea.getBoundingClientRect();
        
        // 기본 크기로 초기화
        popup.style.width = defaultWidth + 'px';
        popup.style.height = defaultHeight + 'px';
        
        // 메인 영역 내에서 중앙 정렬
        const newLeft = (mainRect.width - defaultWidth) / 2;
        const newTop = (mainRect.height - defaultHeight) / 2;
        
        popup.style.left = newLeft + "px";
        popup.style.top = Math.max(30, newTop) + "px"; // 메뉴바 아래로
    }
}

// 마우스 버튼을 누르고 있을 때
function handleMouseDown() {
    isMouseDown = true;
    image.style.clipPath = 'inset(50% 0 0 0)';
    image.style.top = '10px';
    text.style.backgroundColor = 'black';
    text.style.color = '#ededed';
    
    const mainArea = document.querySelector('.main');
    if (mainArea && popup) {
        const mainRect = mainArea.getBoundingClientRect();
        
        // 초기 위치 계산
        const newLeft = (mainRect.width - defaultWidth) / 2;
        const newTop = Math.max(30, (mainRect.height - defaultHeight) / 2);
        
        // 초기 설정
        popup.style.left = newLeft + "px";
        popup.style.top = newTop + "px";
        popup.style.display = 'block';
        popup.style.background = 'transparent';
        
        // 팝업 내용과 헤더 숨기기
        const content = popup.querySelector('.popup-content');
        const header = popup.querySelector('.popup-header');
        if (content) content.style.visibility = 'hidden';
        if (header) header.style.visibility = 'hidden';

        let frame = 0;
        const totalFrames = 14;
        const frameInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            
            // 프레임별 렌더링
            if (frame <= totalFrames / 2) {
                // 윤곽선 단계
                popup.style.transform = `scale(${0.3 + (progress * 1.4)})`;
            } else {
                // 내용 채우기 단계
                if (frame === Math.floor(totalFrames * 0.6)) {
                    popup.style.background = '#fff';
                    if (header) header.style.visibility = 'visible';
                }
                if (frame === Math.floor(totalFrames * 0.8)) {
                    if (content) content.style.visibility = 'visible';
                }
            }
            
            // 마지막 프레임
            if (frame >= totalFrames) {
                clearInterval(frameInterval);
                popup.style.transform = 'scale(1)';
            }
        }, 50); // 약 50ms 간격으로 프레임 갱신
    }
}

// createFrameOutline 함수 제거 - 더 이상 필요하지 않음

// 마우스 버튼을 떼면
function handleMouseUp() {
    isMouseDown = false;
    resetImageAndText(); // 원래 상태로 복원
}

function resetImageAndText() {
    if (!isMouseDown) {
        image.style.clipPath = 'inset(0 0 50% 0)';
        image.style.top = '50px'; // 원래 위치로 복원
        text.style.backgroundColor = '#bcbcbc'; // 하이라이트 효과 제거
        text.style.color = 'black'; // 원래 텍스트 색상으로 복원
    }
}

// 리사이즈 초기화 및 이벤트 핸들러
function initResize(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // 현재 팝업의 위치와 크기 저장
    const popup = document.querySelector('.popup');
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = popup.offsetWidth;
    const startHeight = popup.offsetHeight;

    function handleResize(e) {
        e.preventDefault();
        const mainArea = document.querySelector('.main');
        const mainRect = mainArea.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        // 새로운 크기 계산
        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);

        // 최소/최대 크기 제한
        const minWidth = 200;
        const minHeight = 150;
        const maxWidth = mainRect.width - (popupRect.left - mainRect.left);
        const maxHeight = mainRect.height - (popupRect.top - mainRect.top);

        // 크기 적용
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
        // 시작 위치 저장
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // 이벤트 리스너 등록
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        // 새로운 위치 계산
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        const popup = elmnt.closest('.popup');
        const mainArea = document.querySelector('.main');
        if (popup && mainArea) {
            const mainRect = mainArea.getBoundingClientRect();
            const popupRect = popup.getBoundingClientRect();
            
            // 새로운 위치 계산
            let newLeft = popup.offsetLeft - pos1;
            let newTop = popup.offsetTop - pos2;
            
            // 메인 영역 안으로 제한
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

// CRT 노이즈 효과 추가
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
            data[i] = noise;     // Red
            data[i + 1] = noise; // Green
            data[i + 2] = noise; // Blue
            data[i + 3] = Math.random() * 50; // Alpha (투명도)
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    function animate() {
        generateNoise();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 페이지 로드 시 노이즈 효과 시작
window.addEventListener('load', () => {
    createNoiseCanvas();
});
