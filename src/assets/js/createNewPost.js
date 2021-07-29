//const { event } = require("jquery");

const dataBase = JSON.parse(localStorage.getItem('posts')) || [];

let counter = dataBase.length;  //счетчик кол-ва постов

let wallWithPosts = document.querySelector('.wall');
let post = document.querySelector('.default-post');
let addPost = document.querySelector('#add-post__form');
let addFileToPost = document.querySelector('.add-post__file');
let sendPost = document.querySelector('.add-post__send');
let textArea = document.querySelector('.add-post__textarea');

textArea.innerHTML = '';


let formElements = [...addPost.elements].filter( elem =>
    elem.tagName !== 'BUTTON');
console.log(formElements);


const saveDataBase = () => localStorage.setItem('posts', JSON.stringify(dataBase));


//Отправка поста:
sendPost.addEventListener('click', event => {
    event.preventDefault();  //блокируем перезагрузку страницы после отправки формы
    const itemObj = {};

    for (let elem of formElements) {
        itemObj[elem.name] = elem.value; //получаем об-кты со всеми вводами пользователя
    }
    itemObj.id = counter++; //будет браться число, кот. должно быть следующим в базе
    dataBase.push(itemObj);
    saveDataBase();
    renderPost();
    textArea.value = '';
});


//Pендер:
const renderPost = (DB = dataBase) => {
    DB.forEach((item) => {
        let postInnerHtml = document.createElement('div');
        postInnerHtml.innerHTML = `
        <div class="post">

        <div class="post__content">
            <p class="post__description">${item.postText}</p>
        </div>

        <div class="post__footer">
            <ul class="post__data">
                <li class="post__data-item">
                    <time datetime="2021-06-21 15:30">
                        21.06.2021
                    </time>
                </li>
            </ul>
        </div>

    </div>
    `
    wallWithPosts.insertAdjacentElement('afterbegin', postInnerHtml);
    });
};

renderPost();