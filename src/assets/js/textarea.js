const textarea = document.querySelectorAll('[data-autoresize]');
textarea.value = '';

textarea.forEach(item => {
    let textAreaHeigth = item.offsetHeight;  //высота текстового поля по умолчанию

    item.addEventListener('input', event => {
        let $this = event.target;

        $this.style.height = textAreaHeigth + 'px';
        $this.style.height = $this.scrollHeight + 'px';
    });
});