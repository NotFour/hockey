const tickerSliderElem = $('.ticker-swiper');
let tickerSliderObj;

const streamSliderElem = $('.stream-swiper');
let streamSliderObj;

const switcherSliderElems = $('.switcher-swiper');
let switcherSliderObjects = [];

if (tickerSliderElem.length) {
    tickerSliderObj = new Swiper('.ticker-swiper', {
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 1000
    });
}

if (streamSliderElem.length) {
    streamSliderObj = new Swiper('.stream-swiper', {
        slidesPerView: 'auto',
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 1000
    });
}

switcherSliderElems.each(function() {
    switcherSliderObjects.push(
        new Swiper(`#${$( this ).attr('id')}.switcher-swiper`, {
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            speed: 1000,
        })
    );
})

function showPopup(popup) {
    $(document.body).addClass('no-scroll');
    $(document).on('mousedown', popupUnFocus);
    popup.removeClass('visually-hidden');
    overlay.removeClass('visually-hidden');
}

function closePopup() {
    allPopups.each(function() {
        $( this ).addClass('visually-hidden');
    })
    overlay.addClass('visually-hidden');
    $(document).off('mousedown', popupUnFocus);
    $(document.body).removeClass('no-scroll');
}

function popupUnFocus(e) {
    if(e.target.closest('.popup:not(.visually-hidden)') === null){
        closePopup();
    }
}

const overlay = $('.overlay');
const filterBtn = $('.filter-btn');
const menuBtn = $('.main-menu__toggle');
const switcherBlocks = $('.switchers');

const allPopups = $('.popup', overlay);
const filterPopup = $('.popup--filter', overlay);
const menuPopup = $('.popup--menu', overlay);

const closePopupBtn = $('.popup__close', overlay);

if (filterBtn.length) {
    filterBtn.on('click', () => {
        showPopup(filterPopup);
    });
}

if (menuBtn.length) {
    menuBtn.on('click', () => {
        showPopup(menuPopup);
    });
}

closePopupBtn.each(function() {
    $( this ).on('click', closePopup);
});

if (switcherBlocks.length) {
    switcherBlocks.each(function() {
        const switchersList = $( this );
        const switcherItems = $('.switcher', switchersList);
        const switcherBtns = $('.switcher__btn', switchersList);
        const tournaments = $(`.switcher__content`, switchersList.parent());

        if (switcherBtns.length) {
            switcherBtns.each(function() {
                $( this ).on('click', (event) => {
                    const currentBtn = $(event.currentTarget);

                    if (!currentBtn.parent().hasClass('active')) {
                        const btnIndex = switcherBtns.index(currentBtn);
                        switcherItems.each(function(){
                            $( this ).removeClass('active');
                        });
                        tournaments.each(function(){
                            $( this ).addClass('visually-hidden');
                        });

                        $(switcherItems[btnIndex]).addClass('active');
                        if (tournaments[btnIndex]) {
                            $(tournaments[btnIndex]).removeClass('visually-hidden');
                        }
                    }
                })
            });
        }
    });
}
