document.addEventListener('DOMContentLoaded', function() {
    const centeredImage = document.querySelector('.centered-image');
    centeredImage.addEventListener('click', function() {
        this.style.animation = 'clipPathAnimation 0.4s ease forwards';
        setTimeout(() => {
            this.style.animation = '';
        }, 400);
    });
});