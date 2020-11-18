class ValidationModule {
    form;
    fields;
    patternArr;
    errorText;

    constructor() {
        this.form = document.querySelector('form[data-validation="formValidation"]');
        this.fields = this.form.querySelectorAll(`[data-validation]`);
        this.patternArr = {
            'number': /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
            'email': /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            /**(?=.*[ -/:-@\[-`{-~]) паттерн для знаков */
            'password': /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,64}$/,

        };
        this.errorText = {
            'valueNone': "Поле не заполнено",
            'valuePatternError': "Поле заполнено неверно",
            'selectValid': "Вы ничего не выбрали",
            'checkboxConfirm': "Вы не приняли лицензионное соглашение",
            'passwordConfirm': "Пароли не совпадают",
            'agreement': "Вы не приняли пользовательсоке соглашение",
            'email': "Не корректный Email адрес",

        }
    }

    validation = function () {
        this.removeValidation();
        for (let i = 0; i < this.fields.length; i++) {
            this.searchMethodValid(this.fields[i]);
        }
    };

    /** проверка выбора селекта */
    countryValid = function (formElement) {
        let selectedValue = formElement.options[formElement.selectedIndex].value;       //селект.опции.[селект.айдиОпции].значение
        if (!selectedValue) {                                               //если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
            this.generateError(this.errorText['selectValid'], formElement);         //выполняем функцию генерации ошибки с текстом,
        }
    };

    compareValid = function (formElement, compareWith) {
        let compareTarget = document.getElementById(compareWith);
        console.log(formElement.value);
        console.log(compareTarget.value);
        if (compareTarget.value != formElement.value) {
            console.log('asdasd');
            this.generateError(this.errorText['passwordConfirm'], formElement);
        }
    };

    passwordValid = function (formElement) {
        if (this.patternValid(formElement.value, "password")) {
            let confirmPass = this.form.querySelector('[data-validation="passwordConfirmation require"]');

        } else {
            this.generateError(this.errorText['valuePatternError'], formElement)
        }

    };

    passwordConfirmationValid = function (formElement) {
        /*if (this.patternValid(valueElement, arValidEl)) {
            /!** Если паттерн пройден *!/

            let pass = this.form.querySelector('[data-validation="password require"]');
            if (valueElement && pass.value) {                          //если значение пароля и значение подтвержденного не null
                if (valueElement !== pass.value) {                     //если значения паролей не равны
                    this.generateError(this.errorText['passwordConfirm'], formElement);   //вызов функции с текстом
                }
            }
        } else {
            this.generateError(this.errorText['valuePatternError'], formElement)
        }*/

    };

    numberValid = function (formElement) {

    };

    requireValid = function (formElement) {
        if (!formElement.value) {
            this.generateError(this.errorText['valueNone'], formElement);
            return false
        }

        return true
    };

    patternValid = function (valueElement, arValidEl) {
        let pattern = this.patternArr[arValidEl];     /** передается дата первый дата атрибут */
        return pattern.test(valueElement);      /** Возвращает фолс если значение не прошло валидацию паттерном */
    };

    emailValid = function (formElement) {
        if (!this.patternValid(formElement.value, "email")) {
            this.generateError(this.errorText['email'], formElement)
            return false
        }

        return true
    };

    searchMethodValid = function (formElement) {
        let validationRules = formElement.getAttribute('data-validation').split(" ");
        for (let rule of validationRules) {               //Массив из дата атрибутов элемента
            if (rule.indexOf("compare") !== -1) {
                let compareWith = rule.split("=")[1];
                this.compareValid(formElement, compareWith);
                continue
            }

            let functionName = rule + 'Valid';

            if (typeof this[functionName] == 'function') {
                let result = this[functionName](formElement) //выполняются функции с названиями атрибута
               /* if (!result) {
                    break
                }*/
            } else {
                console.log("function is not detected");
            }

        }


        /* switch (arValidEl) {

             /!** Если значение пустое, выводит error , если заполнено, вызывает функцию паттерна и принимает тру или фолс *!/
             case("emailValid") :
                 let email = inputValue ? this.generateError('Поле не заполнено', formElement) : this.patternValid(formElement, arValidEl);
                 !email ? this.generateError('Неверный Email', formElement) : console.log();
                 break;

  /
             case("password") :
                 let passwordValid = inputValue ? this.generateError('Поле не заполнено', formElement) : this.patternValid(formElement, arValidEl);
                 !passwordValid ? this.generateError('Не соответствует форматированию', formElement) : this.comparePassword(formElement);
                 break;

             case("passwordConfirmation") :
                 inputValue ? this.generateError('Поле не заполнено', formElement) : console.log();
                 break;

             case("country") :
                 this.selectVal(formElement);
                 break;

             case("number") :
                 let number = inputValue ? this.generateError('Поле не заполнено', formElement) : this.patternValid(formElement, arValidEl);
                 !number ? this.generateError('Номер введен неверно', formElement) : console.log();
                 break;

             case("agreement") :
                 this.agreement(formElement);
                 break;
         }*/
    };

    /** проверка статуса чекбокса */
    agreementValid = function (formElement) {
        !formElement.checked ? this.generateError(this.errorText['agreement'], formElement) : console.log();
    };


    /**удаляет ошибки перед выполнением следующих проверок*/
    removeValidation = function (form) {
        let errors = this.form.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    };


    /**генерирует блок с ошибкой*/
    generateError = function (text, formElement) {          //принимает текст и элемент перед которым нужно вставить блок


        /*if(formElement.parentElement.insertBefore) {
            formElement.parentElement.remove();

        }*/
        let error = document.createElement('div');       //создает элемент див
        error.className = 'error';                                //добавляет диву класс
        error.style.color = 'red';                                //устанавливает цвет текста
        error.innerHTML = text;                                   //передает текст в иннерHtml
        formElement.parentElement.insertBefore(error, formElement); //принимает значения перед родителем определенного элемента
    };


}

let validator = new ValidationModule();
/**Слушатель на кнопку сабмит, для вызова функций проверки*/
validator.form.addEventListener('submit', function (event) {
    event.preventDefault();
    validator.validation();
});

/**--------------------------------------------------------------------------*/


