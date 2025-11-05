// 팝업 관련 상태 관리
let popup, resizeHandle, popupHeader;
const defaultWidth = 400;
const defaultHeight = 400;

export function initializePopups() {
    popup = document.getElementById('popup');
    resizeHandle = document.querySelector('.resize-handle');
    popupHeader = document.getElementById('popup-header');

    setupEventListeners();
}

function setupEventListeners() {
    resizeHandle.addEventListener('mousedown', initResize);
    dragElement(popupHeader);
}

function initResize(e) {
    e.preventDefault();
    e.stopPropagation();
    
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
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        const mainArea = document.querySelector('.main');
        const mainRect = mainArea.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        
        let newLeft = popup.offsetLeft - pos1;
        let newTop = popup.offsetTop - pos2;
        
        newLeft = Math.max(0, Math.min(newLeft, mainRect.width - popupRect.width));
        newTop = Math.max(30, Math.min(newTop, mainRect.height - popupRect.height));
        
        popup.style.left = newLeft + "px";
        popup.style.top = newTop + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export function resetPopup() {
    const mainArea = document.querySelector('.main');
    if (popup && mainArea) {
        const mainRect = mainArea.getBoundingClientRect();
        popup.style.width = defaultWidth + 'px';
        popup.style.height = defaultHeight + 'px';
        
        const newLeft = (mainRect.width - defaultWidth) / 2;
        const newTop = Math.max(30, (mainRect.height - defaultHeight) / 2);
        
        popup.style.left = newLeft + "px";
        popup.style.top = newTop + "px";
    }
}

export function closePopup() {
    popup.style.display = 'none';
}