let form = document.querySelector('form[data-validation="formValidation"]');
let submitBtn = form.querySelector('[data-validation="btnSubmit"]');
let email = form.querySelector('[data-validation="emailValid"]');
let password = form.querySelector('[data-validation="password"]');
let passwordConfirm = form.querySelector('[data-validation="passwordConfirmation"]');
let number = form.querySelector('[data-validation="number"]');
let fields = form.querySelectorAll('[data-field="field"]');
let agree = form.querySelector('[data-validation="agreement"]');
let validationElement = form.querySelectorAll('[data-validation]');
console.log(validationElement);


let selectVal = function(field) {
    console.log("validateFunctionEmail");
let selectedValue = field.options[field.selectedIndex].value; // селект.опции.[селект.айдиОпции].значение
if (!selectedValue) {               // если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
    generateError('Вы ничего не выбрали', field);    //выполняем функцию генерации ошибки с текстом,
     }

};

let searchMethodValid = function (field){

    let validationEl = field.getAttribute('data-validation');
    let arValidEl = validationEl.split(" ");
    arValidEl[0] === "emailValid" ? selectVal(field): false;
    arValidEl[0] === "password" ? console.log("validateFunctionEmail"): false;
    arValidEl[0] === "passwordConfirmation" ? console.log("validateFunctionEmail"): false;
    arValidEl[0] === "country" ? console.log("validateFunctionEmail"): false;
    arValidEl[0] === "number" ? console.log("validateFunctionEmail"): false;
    arValidEl[0] === "agreement" ? console.log("validateFunctionEmail"): false;

};

let validation = function() {
    for (let i = 0; i < fields.length; i++){

        const field = fields[i];                //один элемент
        searchMethodValid(field);


    }

};

validation();






//Второй вариант ^
//               |
//               |
/**--------------------------------------------------------------------------*/
















/**удаляет ошибки перед выполнением следующих проверок*/
let removeValidation = function () {
    let errors = form.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
        console.log(errors[i]);
    }
};
/**генерирует блок с ошибкой*/
let generateError = function (text, field) {                // принимает текст и элемент перед которым нужно вставить блок
    let error = document.createElement('div');     // создает элемент див
    error.className = 'error';                              //добавляет диву класс
    error.style.color = 'red';                              //устанавливает цвет текста
    error.innerHTML = text;                                 //передает текст в иннерHtml
    field.parentElement.insertBefore(error, field);         //принимает значения перед родителем определенного элемента

};

/** Проверяет заполнение инпутов*/
let checkFieldsPresence = function () {
    for (let i = 0; i < fields.length; i++) { //перебор всего в форме на наличие данных

        const field = fields[i];                //один элемент

        if (field.tagName === 'SELECT') {       //Если элемент селект

            let selectedValue = field.options[field.selectedIndex].value; // селект.опции.[селект.айдиОпции].значение

            if (!selectedValue) {               // если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
                generateError('Вы ничего не выбрали', field);    //выполняем функцию генерации ошибки с текстом,
            }                                                             //   к определенному элементу
        }

        if (field.tagName === 'INPUT') {        //если элемент инпут

            if (!field.value) {
                generateError('Поле заполненно неверно', field);
            }

            if (password.value && passwordConfirm.value) {//если значение пароля и значение подтвержденного > 0
                console.log('asfaf');
                if (password.value !== passwordConfirm.value) {         //если значения паролей не равны
                    generateError('Пароли не совпадают', field);   //  вызов функции с текстом
                }
            }
        }

        if (field === agree) {                       //Если элемент это чекбокс
            if (!field.checked) {                  //Если чекбокс не checked выводим ошибку
                generateError('Вы не приняли пользовательское соглашение', field);
            }
        }
    }
};

/**Слушатель на кнопку сабмит, для вызова функций проверки*/
form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeValidation();
    searchMethodValid();
    checkFieldsPresence();

});

/*
let inputs = document.querySelectorAll('input[data-validation]');

for (let input of inputs) {
    input.addEventListener('blur', function () {
        let validation = this.dataset.validation;
        let value = this.value;

        switch (validation) {
            case 'emailValid':
                check =/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
                break;
            case 'number':
                break;
        }
        if (check){
            this.classList.remove ('invalid')
            this.classList.add ('valid')
        } else {
            this.classList.remove ('valid')
            this.classList.add ('invalid')
        }
    });
}*/
