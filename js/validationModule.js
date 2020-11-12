class ValidationModule {
    form = document.querySelectorAll('form[data-validation="formValidation"]');


    /*form = document.querySelector('form[data-validation="formValidation"]');
      password = this.form.querySelector('[data-validation="password"]');
      passwordConfirm = #form.querySelector('[data-validation="passwordConfirmation"]');
      number = #form.querySelector('[data-validation="number"]');
      fields = #form.querySelectorAll('[data-field="field"]');
      agree = #form.querySelector('[data-validation="agreement"]');*/



    findElement(element) {
        console.log("123241124124");
        this.form.querySelector(`[data-validation="element"]`);

    }

/*    w_1_test(element){
     /!*   console.log('W1',"HJHHJ");*!/
        return this.w_2_test(element);
    }

    w_2_test(g){
        console.log('W2',`${g}`);
        return '0'
    }*/

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

    validation = function (fields) {

        for (let i = 0; i < fields.length; i++) {

            const field = fields[i];                //один элемент
            searchMethodValid(field);
        }
    };

    comparePassword = function (field) {
        if (password.value && passwordConfirm.value) {//если значение пароля и значение подтвержденного не null
            if (password.value !== passwordConfirm.value) {         //если значения паролей не равны
                generateError('Пароли не совпадают', field);   //  вызов функции с текстом
            }
        }
    };

    /**генерирует блок с ошибкой*/
        generateError = function (text, field) {                // принимает текст и элемент перед которым нужно вставить блок
        let error = document.createElement('div');     // создает элемент див
        error.className = 'error';                              //добавляет диву класс
        error.style.color = 'red';                              //устанавливает цвет текста
        error.innerHTML = text;                                 //передает текст в иннерHtml
        field.parentElement.insertBefore(error, field);         //принимает значения перед родителем определенного элемента
    };

    searchMethodValid = function (field) {

        let validationEl = field.getAttribute('data-validation');
        let arValidEl = validationEl.split(" ");
        /*console.log(field);*/
        let inputValue = !field.value;

        /*switch (arValidEl[0]) {
            case("emailValid") :
                let email = inputValue ? this.generateError('Поле не заполнено', field) : emailValid(field);
                !email ? generateError('Неверный Email', field) : console.log("email valid");
                break;
            case("password") :
                let passwordValid = inputValue ? generateError('Поле не заполнено', field) : comparePassword(field);
                !passwordValid ? console.log('valid') : console.log('valid');
                break;
            case("passwordConfirmation") :
                inputValue ? generateError('Поле не заполнено', field) : console.log('valid');
                break;
            case("country") :
                selectVal(field);
                break;
            case("number") :
                let number = inputValue ? generateError('Поле не заполнено', field) : numberValid(field);
                !number ? generateError('Номер введен неверно', field) : console.log('valid');
                break;
            case("agreement") :
                agreement(field);
                break;
        }*/

    };
}

let fF = new ValidationModule();
/*console.log(fF.findElement("number"));*/


let  func  = function(){
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

};


let fdf = document.querySelector(`[data-validation="passwordConfirmation"]`);
func();
/*let submitBtn = form.querySelector('[data-validation="btnSubmit"]');
let email = form.querySelector('[data-validation="emailValid"]');*/

//let validationElement = form.querySelectorAll('[data-validation]');
//console.log(validationElement);


/**Слушатель на кнопку сабмит, для вызова функций проверки*/
/*form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeValidation();
    validation();

});*/

/**--------------------------------------------------------------------------*/




/**Слушатель на кнопку сабмит, для вызова функций проверки*/
/*form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeValidation();
    searchMethodValid();
    checkFieldsPresence();

});*/
