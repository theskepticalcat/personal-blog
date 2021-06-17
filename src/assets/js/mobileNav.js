const burger = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const page = document.getElementById('page');
const body = document.body;


burger.addEventListener('click', event => {
    if(body.classList.contains('show-sidebar')) {
        closeSidebar();
    } else {
        showSidebar();
    }
});

function closeSidebar() {
    body.classList.remove('show-sidebar');
    document.querySelector('.page__mask').remove(); //удаляем элемент с классом page__mask
}

function showSidebar() {
    let mask = document.createElement('div'); //создали эл-нт маски
    mask.classList.add('page__mask');  //добавили ему класс
    page.appendChild(mask);  //доб-ем mask как дочерний эл-нт для page(обертки)

    body.classList.add('show-sidebar');

    mask.addEventListener('click', closeSidebar);  //при клике по маске выз-тся closeSidebar
}