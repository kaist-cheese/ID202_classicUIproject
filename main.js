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
        document.getElementById("loading-text").innerText += lines[lineIndex] + '\n';
        lineIndex++;
        setTimeout(typeLine, 300);
    } else {
        document.addEventListener('keydown', goToLogin);
    }
}

function showLoading() {
    document.querySelector('.loading').style.display = 'flex';
    document.getElementById("loading-text").innerText = '';
    typeLine();
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
    // 1. 기존 코드
    showLoading();
    document.getElementById('passwordInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });
    document.querySelector('button').addEventListener('click', checkPassword);
    document.querySelector('.login').style.display = 'flex'; // 로그인 페이지 미리 로드

    // 2. 흩어져 있던 DOM 변수 할당
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
        event.stopPropagation(); // 이벤트 전파 방지
        dropdownMenu.style.display = 'none'; // 드롭다운 메뉴 숨기기
        aboutBox.style.display = 'flex'; // AboutBox 표시

        // AppleLogo 스타일 변경
        appleLogo.style.clipPath = 'inset(50% 0 0 0)'; // 아랫부분만 보이도록
        appleLogo.style.top = '-13px'; // AppleLogo를 65px 위로 올림
        blackSquare.style.display = 'block'; // blackSquare 나타나기
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
    console.log("--- resetPopup() 함수 실행됨 ---"); // <-- 디버깅 로그 1

    if (popup) { // 'popup' 변수가 존재하는지 확인
        console.log("'popup' 요소를 찾았습니다.", popup); // <-- 디버깅 로그 2

        popup.style.width = defaultWidth + 'px';
        popup.style.height = defaultHeight + 'px';
        
        const newLeft = (fixedMaxLeft - defaultWidth) / 2 + 'px'; // "200px"
        const newTop = (fixedMaxTop - defaultHeight) / 2 + 'px'; // "100px"

        console.log("새로운 위치로 설정: ", "left:", newLeft, "top:", newTop); // <-- 디버깅 로그 3
        
        popup.style.left = newLeft; // 가운데 정렬
        popup.style.top = newTop; // 가운데 정렬

    } else {
        // 만약 'popup' 변수가 null이나 undefined라면
        console.error("치명적 오류: 'popup' 요소를 찾을 수 없습니다!"); // <-- 디버깅 로그 4
    }
}

// 마우스 버튼을 누르고 있을 때
function handleMouseDown() {
    isMouseDown = true;
    image.style.clipPath = 'inset(50% 0 0 0)';
    image.style.top = '10px'; // 위로 10px 이동
    text.style.backgroundColor = 'black'; // 하이라이트 효과 추가
    text.style.color = '#ededed'; // 텍스트 색상 변경
    popup.style.display = 'block'; // 사각형 표시
}

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

function initResize(e) {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
}

function resize(e) {
    const newWidth = e.clientX - popup.getBoundingClientRect().left;
    const newHeight = e.clientY - popup.getBoundingClientRect().top + 50; // 헤더의 높이 추가

    // 최대 너비와 최대 높이 제한
    const maxWidth = 800;
    const maxHeight = 570;

    // 팝업 크기 설정
    popup.style.width = Math.min(newWidth, maxWidth) + 'px';
    popup.style.height = Math.min(newHeight, maxHeight) + 'px';

    // 팝업의 중앙 위치 조정
    updatePopupPosition();
}

function updatePopupPosition() {
    const popupRect = popup.getBoundingClientRect();
    const newLeft = Math.max(fixedMinLeft, Math.min(fixedMaxLeft - popupRect.width, (fixedMaxLeft - popupRect.width) / 2));
    const newTop = Math.max(fixedMinTop, Math.min(fixedMaxTop - popupRect.height, (fixedMaxTop - popupRect.height) / 2));

    popup.style.left = newLeft + "px";
    popup.style.top = newTop + "px";
}

function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // 헤더를 드래그할 수 있도록 설정
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // 마우스 커서 위치 저장
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // 마우스가 움직일 때마다 호출
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // 새로운 커서 위치 계산
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // 새로운 위치 계산
        let newTop = popup.offsetTop - pos2;
        let newLeft = popup.offsetLeft - pos1;

        // 고정된 영역 내에서만 이동 가능하도록 설정
        if (newTop < fixedMinTop) {
            newTop = fixedMinTop; // 위쪽 벽에 부딪힐 때
        } else if (newTop > fixedMaxTop - popup.offsetHeight) {
            newTop = fixedMaxTop - popup.offsetHeight; // 아래쪽 벽에 부딪힐 때
        }

        if (newLeft < fixedMinLeft) {
            newLeft = fixedMinLeft; // 왼쪽 벽에 부딪힐 때
        } else if (newLeft > fixedMaxLeft - popup.offsetWidth) {
            newLeft = fixedMaxLeft - popup.offsetWidth; // 오른쪽 벽에 부딪힐 때
        }

        // 요소의 새로운 위치 설정
        popup.style.top = newTop + "px";
        popup.style.left = newLeft + "px";
    }

    function closeDragElement() {
        // 마우스 버튼이 떼어지면 멈춤
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function closePopup() {
    resetPopup(); // 팝업 닫을 때 기본 위치와 크기로 초기화
    popup.style.display = 'none'; // 팝업 닫기 기능 (예시)
}
