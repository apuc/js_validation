class ValidationModule {
    form;
    fields;

    /*form = document.querySelector('form[data-validation="formValidation"]');
      password = this.form.querySelector('[data-validation="password"]');
      passwordConfirm = #form.querySelector('[data-validation="passwordConfirmation"]');
      number = #form.querySelector('[data-validation="number"]');
      fields = #form.querySelectorAll('[data-field="field"]');
      agree = #form.querySelector('[data-validation="agreement"]');*/
    constructor() {
        this.form = document.querySelector('form[data-validation="formValidation"]');
        this.fields = this.form.querySelectorAll(`[data-validation]`);
    }

    /**удаляет ошибки перед выполнением следующих проверок*/
    removeValidation = function (form) {
        let errors = form.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
            /*  console.log(errors[i]);*/
        }
    };

    agreement = function (field) {
        !field.checked ? generateError('Вы не приняли пользовательское соглашение', field) : console.log("NET");
    };

    emailValid = function (field) {
        //console.log(field.value);
        return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(field.value);

    };
    numberValid = function (field) {
        return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(field.value);
    };

    selectVal = function (field) {
        console.log("selectVal");
        let selectedValue = field.options[field.selectedIndex].value; // селект.опции.[селект.айдиОпции].значение
        if (!selectedValue) {                                        // если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
            generateError('Вы ничего не выбрали', field);       //выполняем функцию генерации ошибки с текстом,
        }
    };

    validation = function () {


        for (let i = 0; i < this.fields.length; i++) {
            this.searchMethodValid(this.fields[i]);
        }
    };

    comparePassword = function (field) {
        if (password.value && passwordConfirm.value) {//если значение пароля и значение подтвержденного не null
            if (password.value !== passwordConfirm.value) {         //если значения паролей не равны
                this.generateError('Пароли не совпадают', field);   //  вызов функции с текстом
            }
        }
    };

    /**генерирует блок с ошибкой*/
    generateError = function (text, oneElement) {                // принимает текст и элемент перед которым нужно вставить блок
        let error = document.createElement('div');     // создает элемент див
        error.className = 'error';                              //добавляет диву класс
        error.style.color = 'red';                              //устанавливает цвет текста
        error.innerHTML = text;                                 //передает текст в иннерHtml
        oneElement.parentElement.insertBefore(error, oneElement);         //принимает значения перед родителем определенного элемента
    };

    searchMethodValid = function (oneElement) {

        let validationEl = oneElement.getAttribute('data-validation');
        let arValidEl = validationEl.split(" ");
        /*console.log(field);*/
        let inputValue = !oneElement.value;

        switch (arValidEl[0]) {
            case("emailValid") :
                let email = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.emailValid(oneElement);
                !email ? this.generateError('Неверный Email', oneElement) : console.log("email valid");
                break;
            case("password") :
                let passwordValid = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.comparePassword(oneElement);
                !passwordValid ? console.log('valid') : console.log('valid');
                break;/*
            case("passwordConfirmation") :
                inputValue ? generateError('Поле не заполнено', oneElement) : console.log('valid');
                break;
            case("country") :
                selectVal(field);
                break;
            case("number") :
                let number = inputValue ? generateError('Поле не заполнено', oneElement) : numberValid(oneElement);
                !number ? generateError('Номер введен неверно', oneElement) : console.log('valid');
                break;
            case("agreement") :
                agreement(oneElement);
                break;*/
        }

    };
}



/*
let func = function () {
    let form = document.querySelector('form[data-validation="formValidation"]');
    let elAll = form.querySelectorAll('[data-validation]');
    for (let i = 0; i < elAll.length; i++) {
        const field = elAll[i];                //один элемент
        let g = field.getAttribute('data-validation');
        let data = g.split(" ");

        switch (data[0]) {
            case("number"):
                console.log(data[0]);
                console.log(field);
                break;
            case("password"):
                console.log(data[0]);
                console.log(field);
                break;
        }


    }

};*/


let validator = new ValidationModule();
validator.validation();




/*let submitBtn = form.querySelector('[data-validation="btnSubmit"]');
let email = form.querySelector('[data-validation="emailValid"]');*/


/**Слушатель на кнопку сабмит, для вызова функций проверки*/
/*form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeValidation();
    validation();

});*/

/**--------------------------------------------------------------------------*/


/**Слушатель на кнопку сабмит, для вызова функций проверки*/
/*fdf.form.addEventListener('button', function (event) {
    event.preventDefault();
    fdf.arrElement();
    fdf.validation();
});*/
