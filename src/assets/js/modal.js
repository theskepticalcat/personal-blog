body = document.body;
const modalBtn = document.querySelectorAll('[data-modal]');
const modalClose = document.querySelectorAll('.modal__close');
const modal = document.querySelectorAll('.modal');


//Открываем модалки:
modalBtn.forEach(item => {
    item.addEventListener('click', event => {
        let $this = event.currentTarget;
        let modalId = $this.getAttribute('data-modal');
        let modal = document.getElementById(modalId);  //модальное окно кот.хотим открыть
        let modalContent = modal.querySelector('.modal__content');  //в блоке .modal ищем эл-ты с классом .modal__content

        modalContent.addEventListener('click', event => {
            event.stopPropagation();  //чтобы не вызывался клик по родителю, когда кликаем по дочернему эл-ту modal__content
        });

        modal.classList.add('show');   //доб-ем класс show
        body.classList.add('no-scroll');   //убираем скролл у body

        setTimeout(() => {  //задержка перед выполнением св-ва transform .modal-content
            modalContent.style.transform = 'none';
            modalContent.style.opacity = '1';  //делаем полностью видимой
        }, 1);
    });
});


//Закрываем модалки:
modalClose.forEach(item => {
    item.addEventListener('click', event => {
        let currentModal = event.currentTarget.closest('.modal'); //получаем ближайшего родителя с классом modal

        closeModal(currentModal);
    });
});


//Закрывать при клике на маску:
modal.forEach(item => {
    item.addEventListener('click', event => {
        let currentModal = event.currentTarget;

        closeModal(currentModal);
    });
});



function closeModal(currentModal) {
    let modalContent = currentModal.querySelector('.modal__content');  //в блоке .modal ищем эл-ты с классом .modal__content
    modalContent.removeAttribute('style');

    setTimeout(() => {
        currentModal.classList.remove('show');
        body.classList.remove('no-scroll');
    }, 200);  //т.к. трансформация .modal__content идет 200мс
}