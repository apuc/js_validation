class ValidationModule {
    form;
    fields;
    number = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    constructor() {
        this.form = document.querySelector('form[data-validation="formValidation"]');
        this.fields = this.form.querySelectorAll(`[data-validation]`);
    }

    agreement = function (oneElement) {
        !oneElement.checked ? this.generateError('Вы не приняли пользовательское соглашение', oneElement) : console.log("NET");
    };

    emailValid = function (oneElement) {
        return this.email.test(oneElement.value);

    };

    selectVal = function (field) {
        let selectedValue = field.options[field.selectedIndex].value;       //селект.опции.[селект.айдиОпции].значение
        if (!selectedValue) {                                               //если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
            this.generateError('Вы ничего не выбрали', field);         //выполняем функцию генерации ошибки с текстом,
        }
    };

    validation = function () {
        this.removeValidation();
        for (let i = 0; i < this.fields.length; i++) {
            this.searchMethodValid(this.fields[i]);
        }
    };

    comparePassword = function (oneElement) {
        let confirmPass = this.form.querySelector('[data-validation="passwordConfirmation require"]');
        if (oneElement.value && confirmPass.value) {                          //если значение пароля и значение подтвержденного не null
            if (oneElement.value !== confirmPass.value) {                     //если значения паролей не равны
                this.generateError('Пароли не совпадают', oneElement);   //вызов функции с текстом
            }
        }
    };

    /**генерирует блок с ошибкой*/
    generateError = function (text, oneElement) {                 //принимает текст и элемент перед которым нужно вставить блок
        let error = document.createElement('div');       //создает элемент див
        error.className = 'error';                                //добавляет диву класс
        error.style.color = 'red';                                //устанавливает цвет текста
        error.innerHTML = text;                                   //передает текст в иннерHtml
        oneElement.parentElement.insertBefore(error, oneElement); //принимает значения перед родителем определенного элемента
    };

    /**удаляет ошибки перед выполнением следующих проверок*/
    removeValidation = function (form) {
        let errors = this.form.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    };

    numberValid = function (oneElement, region) {
        return region.test(oneElement.value);
    };

    searchMethodValid = function (oneElement) {
        let validationEl = oneElement.getAttribute('data-validation');
        let arValidEl = validationEl.split(" ")[0];
        let inputValue = !oneElement.value;

        switch (arValidEl) {

            case("emailValid") :
                let email = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.emailValid(oneElement);
                !email ? this.generateError('Неверный Email', oneElement) : console.log();
                break;

            case("password") :
                let passwordValid = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.comparePassword(oneElement);
                //  !passwordValid ? console.log() : console.log();
                break;

            case("passwordConfirmation") :
                inputValue ? this.generateError('Поле не заполнено', oneElement) : console.log();
                break;

            case("country") :
                this.selectVal(oneElement);
                break;

            /**  Проверка номера, в плане выбор стандарта по региону this.number = паттерн   */
            case("number") :
                let number = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.numberValid(oneElement, this.number);
                !number ? this.generateError('Номер введен неверно', oneElement) : console.log();
                break;

            case("agreement") :
                this.agreement(oneElement);
                break;
        }

    };
}

let validator = new ValidationModule();
let buttonForm = validator.form;
/**Слушатель на кнопку сабмит, для вызова функций проверки*/
buttonForm.addEventListener('submit', function (event) {
    event.preventDefault();
    validator.validation();
});

/**--------------------------------------------------------------------------*/