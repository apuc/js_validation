class ValidationModule {
    form;
    fields;
    patternArr;
    errorText;
    btnSubmit;

    constructor() {
        this.form = document.querySelector('form[data-validation="formValidation"]');
        this.fields = this.form.querySelectorAll(`[data-validation]`);
        this.btnSubmit = this.form.querySelector('[data-validation="btnSubmit"]');
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

    btnSubmitActive = function () {
        let error = this.form.querySelector('[data-valid="errorValid"]');
        (error === null) ?this.btnSubmit.disabled = false : this.btnSubmit.disabled = true
    };

    validationRun = function () {
        for (let i = 0; i < this.fields.length; i++) {
            this.fields[i].addEventListener("change", this.validation.bind(this));
        }
    };

    /** проверка выбора селекта */
    selectValid = function (formElement) {
        let selectedValue = formElement.options[formElement.selectedIndex].value;       //селект.опции.[селект.айдиОпции].значение
        if (!selectedValue) {                                               //если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
            this.generateError(this.errorText['selectValid'], formElement);         //выполняем функцию генерации ошибки с текстом,
        }
    };

    compareValid = function (formElement, compareWith) {
        let compareTarget = document.getElementById(compareWith);
        if (compareTarget.value != formElement.value) {
            this.generateError(this.errorText['passwordConfirm'], formElement);
        }
    };

    passwordValid = function (formElement) {
        if (!this.patternValid(formElement.value, "password")) {
            this.generateError(this.errorText['valuePatternError'], formElement);

            return false
        } else {
            return true
        }
    };

    numberValid = function (formElement) {
        if (!this.patternValid(formElement.value, "number")) {
            this.generateError(this.errorText['valuePatternError'], formElement);

            return false
        } else {
            return true
        }
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
            this.generateError(this.errorText['email'], formElement);

            return false
        }
        return true
    };

    searchMethodValid = function (formElement) {
        let validationRules = formElement.getAttribute('data-validation').split(" ");
        for (let rule of validationRules) {//Массив из дата атрибутов элемента
            if (rule.split("=")[1]) {
                let compareWith = rule.split("=")[1];
                this.compareValid(formElement, compareWith);
            }

            let functionName = rule + 'Valid';
            if (typeof this[functionName] == 'function') {
                let result = this[functionName](formElement);//выполняются функции с названиями атрибута
                if (!result) {
                    break
                }
            }
        }
        this.btnSubmitActive();
    };

    /** проверка статуса чекбокса */
    agreementValid = function (formElement) {
        !formElement.checked ? this.generateError(this.errorText['agreement'], formElement) : false;
    };

    /**удаляет ошибки перед выполнением следующих проверок*/
    removeValidation = function (form) {
        let errors = this.form.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    };

    /**генерирует блок с ошибкой*/
    generateError = function (text, formElement) {                //принимает текст и элемент перед которым нужно вставить блок
        let error = document.createElement('div');       //создает элемент див
        error.className = 'error';                                //добавляет диву класс
        error.setAttribute("data-valid", "errorValid");
        error.style.color = 'red';                                //устанавливает цвет текста
        error.innerHTML = text;                                   //передает текст в иннерHtml
        formElement.parentElement.insertBefore(error, formElement); //принимает значения перед родителем определенного элемента
    };
}

let validator = new ValidationModule();
validator.validationRun();

/**Слушатель на кнопку сабмит, для вызова функций проверки*/
validator.form.addEventListener('submit', function () {
    validator.validationRun();
});
/**--------------------------------------------------------------------------*/
