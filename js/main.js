const filterBtn = document.querySelector('.filter-btn');
const closePopup = document.querySelector('.popup__close');
const overlay = document.querySelector('.overlay');

filterBtn.addEventListener('click', () => {
    overlay.classList.remove('visually-hidden');
    document.body.classList.add('no-scroll');
});

closePopup.addEventListener('click', () => {
    overlay.classList.add('visually-hidden');
    document.body.classList.remove('no-scroll');
});
