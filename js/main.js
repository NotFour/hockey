let resizeTimeoutId;
const tickerElem = document.querySelector('.ticker__track');
const streamElem = document.querySelector('.stream__track');
let tickerGlide;
let streamGlide;

if (tickerElem || streamElem) {
    window.addEventListener('resize', function(){
        window_resize();
        return false;
    });
}

function window_resize() {
    clearTimeout(resizeTimeoutId);
    resizeTimeoutId = setTimeout(() => {
        if (tickerElem) {
            refreshTickerGlide();
        }

        if (streamElem) {
            refreshStreamGlide();
        }
    }, 1000);
}

function refreshTickerGlide(){
    tickerGlide.update({ perView: getTickersPerView() });
}

function getTickersPerView() {
    const containerWidth = tickerElem.clientWidth;
    const elemWidth = 224;
    return Math.floor( containerWidth / elemWidth * 100) / 100;
}

function refreshStreamGlide(){
    streamGlide.update({ perView: getStreamPerView() });
}

function getStreamPerView() {
    const containerWidth = streamElem.clientWidth;
    const elemWidth = Number(window.getComputedStyle(document.querySelector('.stream-list__img')).minWidth.slice(0, -2)) + 16; //gap
    return Math.floor( containerWidth / elemWidth * 100) / 100;
}

if (tickerElem) {
    tickerGlide = new Glide('.ticker__glide', {
        type: 'slider',
        gap: 12,
        perView: getTickersPerView(),
        bound: true,
        autoplay: 3000,
        animationDuration: 1000,
    }).mount();
}

if (streamElem) {
    streamGlide = new Glide('.stream__glide', {
        type: 'slider',
        gap: 12,
        perView: getStreamPerView(),
        bound: true,
        autoplay: 3000,
        animationDuration: 1000,
    }).mount();
}

const filterBtn = document.querySelector('.filter-btn');
const closePopup = document.querySelector('.popup__close');
const overlay = document.querySelector('.overlay');

if (filterBtn) {
    filterBtn.addEventListener('click', () => {
        overlay.classList.remove('visually-hidden');
        document.body.classList.add('no-scroll');
    });
}

if (closePopup) {
    closePopup.addEventListener('click', () => {
        overlay.classList.add('visually-hidden');
        document.body.classList.remove('no-scroll');
    });
}

const versusItems = document.querySelectorAll('.versus-menu__item');
const versusBtns = document.querySelectorAll('.versus-menu__btn');
const versusBlocks = document.querySelectorAll('.versus__content');

if (versusBtns.length) {
    versusBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const currentBtn = event.currentTarget;

            if (!currentBtn.parentElement.classList.contains('active')) {
                const btnIndex = Array.from(versusBtns).indexOf(currentBtn);

                versusItems.forEach(item => item.classList.remove('active'));
                versusBlocks.forEach(item => item.classList.remove('versus__content--show'))

                versusItems[btnIndex].classList.add('active');
                versusBlocks[btnIndex].classList.add('versus__content--show');
            }
        })
    })
}

