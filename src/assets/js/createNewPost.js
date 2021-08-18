//Логика по созданию нового поста:

const dataBase = JSON.parse(localStorage.getItem('posts')) || [];

let counter = dataBase.length;  //счетчик кол-ва постов

const wallWithPosts = document.querySelector('.wall');
//Кнопки формы поста:
const addPost = document.querySelector('#add-post__form');
const sendPost = document.querySelector('.add-post__send');
const textArea = document.querySelector('.add-post__textarea');
const addPostFile = document.querySelector('#add-post-file');
const postPreview = document.querySelector('.post__preview');

const deletePost = document.querySelector('.post__delete-btn');

const divPhotoBeforePublic = document.querySelector('.add-post__image-preview');
const photoBeforePublic = document.querySelector('.add-post__image');
let scrPhotoBeforePublic = photoBeforePublic.src;

textArea.value = '';

let formElements = [...addPost.elements].filter( elem =>
    elem.tagName !== 'BUTTON');
console.log(formElements);


const saveDataBase = () => localStorage.setItem('posts', JSON.stringify(dataBase));

const infoPhoto = {};  //данные по загружаемой в LS пикче
console.log(infoPhoto);

//Отправка поста:
sendPost.addEventListener('click', event => {
    document.location.reload();
    const itemObj = {};

    for (let elem of formElements) {
        itemObj[elem.name] = elem.value; //=>об-кты с вводами пользователя
    }
    itemObj.id = counter++; //число, следующее в БД
    itemObj.image = infoPhoto.base64;
    dataBase.push(itemObj);
    saveDataBase();
    renderPost();
    textArea.value = '';
});


//Добавление картинки:
addPostFile.addEventListener('change', event => {
    const target = event.target;
    const reader = new FileReader(); //об-кт, кот. работает с файлом
    
    const file = target.files[0];
    infoPhoto.fileName = file.name;
    infoPhoto.size = file.size;
    console.log(file);

    reader.readAsBinaryString(file); //=>файл считывается
    
    reader.addEventListener('load', event => { //=>загрузка
        infoPhoto.base64 = btoa(event.target.result); //=>картинку переводим в строку и => в об-кт
        photoBeforePublic.src = `data:image/gpeg;base64,${infoPhoto.base64}`;

        photoBeforePublic.classList.remove('hidden');
        divPhotoBeforePublic.classList.remove('hidden');
        divPhotoBeforePublic.style.paddingTop = "1.5rem";
    })
})


//Pендер:
const renderPost = (DB = dataBase) => {
    DB.forEach((item) => {
        let postInnerHtml = document.createElement('div');
        item.time = new Date().toLocaleDateString();

        if (item.image) {
            postInnerHtml.innerHTML = `
            <article class="post" data-id-item="${item.id}">
                <div class="post__header post__header--preview">
                    <a href="">
                        <img class="post__preview" src="data:image/gpeg;base64,${item.image}" alt="?">
                    </a>
                </div>

                <div class="post__content">
                    <h2 class="post__title">
                        <a href="post.html">Как писать код быстро и безболезненно?</a>
                    </h2>
                    <p class="post__description">${item.postText}</p>
                </div>
                <div class="post__header"></div>

                <div class="post__footer">
                    <ul class="post__data">
                        <li class="post__data-item">
                            <time datetime="2021-06-21 15:30">${item.time}</time>
                        </li>
                        <li class="post__data-item">
                            <a href="#">создание сайтов</a>
                        </li>
                    </ul>

                    <div>
                        <a class="post__read" href="#">читать</a>
                        <button class="post__delete-btn" href="#">удалить</button>
                    </div>
                </div>
            </article>
            `
        } else {
            postInnerHtml.innerHTML = `
            <div class="post" data-id-item="${item.id}">
                <div class="post__content">
                    <p class="post__description">${item.postText}</p>
                </div>

                <div class="post__footer">
                    <ul class="post__data">
                        <li class="post__data-item">
                            <time datetime="2021-06-21 15:30">${item.time}</time>
                        </li>
                    </ul>

                    <div>
                        <a class="post__read" href="#">читать</a>
                        <button class="post__delete-btn" href="#">удалить</button>
                    <div>
                </div>
            </div>
            `
    }
    wallWithPosts.insertAdjacentElement('afterbegin', postInnerHtml);
    });
};


renderPost();