class ValidationModule {
    form;
    fields;
    arr;

    constructor() {
        this.form = document.querySelector('form[data-validation="formValidation"]');
        this.fields = this.form.querySelectorAll(`[data-validation]`);
        this.arr = new Map([
            ['number', /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/],
            ['emailValid', /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/],
            ['password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,64}$/]          /**(?=.*[ -/:-@\[-`{-~]) паттерн для знаков */
        ]);
    }

    validation = function () {
        this.removeValidation();
        for (let i = 0; i < this.fields.length; i++) {
            this.searchMethodValid(this.fields[i]);
        }
    };

    /** подбирает валидацию для элемента и вызывает соответствующие функции */
    searchMethodValid = function (oneElement) {
        let validationEl = oneElement.getAttribute('data-validation');
        let arValidEl = validationEl.split(" ")[0];
        let inputValue = !oneElement.value;//
        switch (arValidEl) {

            /** Если значение пустое, выводит error , если заполнено, вызывает функцию паттерна и принимает тру или фолс */
            case("emailValid") :
                let email = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.patternValid(oneElement, arValidEl);
                !email ? this.generateError('Неверный Email', oneElement) : console.log();
                break;

            /** Проверка на пустую строку, пвроерка по паттерну, проверка на совпадние паролей */
            case("password") :
                let passwordValid = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.patternValid(oneElement, arValidEl);
                !passwordValid ? this.generateError('Не соответствует форматированию', oneElement) : this.comparePassword(oneElement);
                break;

            case("passwordConfirmation") :
                inputValue ? this.generateError('Поле не заполнено', oneElement) : console.log();
                break;

            case("country") :
                this.selectVal(oneElement);
                break;

            /**  Проверка номера, в плане выбор стандарта по региону this.number = паттерн   */
            case("number") :
                let number = inputValue ? this.generateError('Поле не заполнено', oneElement) : this.patternValid(oneElement, arValidEl);
                !number ? this.generateError('Номер введен неверно', oneElement) : console.log();
                break;

            case("agreement") :
                this.agreement(oneElement);
                break;
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

    patternValid = function (oneElement, dataA) {
        let pattern = this.arr.get(`${dataA}`);     /** передается дата первый дата атрибут */
        return pattern.test(oneElement.value);      /** Возвращает фолс если значение не прошло валидацию паттерном */
    };

    /**Сравнение паролей */
    comparePassword = function (oneElement) {
        let confirmPass = this.form.querySelector('[data-validation="passwordConfirmation require"]');
        if (oneElement.value && confirmPass.value) {                          //если значение пароля и значение подтвержденного не null
            if (oneElement.value !== confirmPass.value) {                     //если значения паролей не равны
                this.generateError('Пароли не совпадают', oneElement);   //вызов функции с текстом
            }
        }
    };

    /** проверка выбора селекта */
    selectVal = function (oneElement) {
        let selectedValue = oneElement.options[oneElement.selectedIndex].value;       //селект.опции.[селект.айдиОпции].значение
        if (!selectedValue) {                                               //если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
            this.generateError('Вы ничего не выбрали', oneElement);         //выполняем функцию генерации ошибки с текстом,
        }
    };

    /** проверка статуса чекбокса */
    agreement = function (oneElement) {
        !oneElement.checked ? this.generateError('Вы не приняли пользовательское соглашение', oneElement) : console.log();
    };
}

let validator = new ValidationModule();
/**Слушатель на кнопку сабмит, для вызова функций проверки*/
validator.form.addEventListener('submit', function (event) {
    event.preventDefault();
    validator.validation();
});


/**--------------------------------------------------------------------------*/