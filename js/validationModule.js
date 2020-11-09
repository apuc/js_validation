let form = document.querySelector('form[data-validation="formValidation"]');
let submitBtn = form.querySelector('[data-validation="btnSubmit"]');
let email = form.querySelector('[data-validation="emailValid"]');
let password = form.querySelector('[data-validation="password"]');
let passwordConfirm = form.querySelector('[data-validation="passwordConfirmation"]');
let number = form.querySelector('[data-validation="number"]');
let fields = form.querySelectorAll('[data-field="field"]');
let agree = form.querySelector('[data-validation="agreement"]');
/**генерирует блок с ошибкой*/
let generateError = function (text, field) {
    let error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    field.parentElement.insertBefore(error, field);
};

/**удаляет ошибки перед выполнением следующих проверок*/
let removeValidation = function () {
    let errors = form.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove()
    }
};

/** Проверяет заполнение инпутов*/
let checkFieldsPresence = function () {
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];

        if (field.tagName === 'SELECT') {

            let selectedValue = field.options[field.selectedIndex].value;

            if (!selectedValue) {
                generateError('Поле заполненно неверно' , field);
            }
        }

        if (field.tagName === 'INPUT') {
            if (!field.value) {
               generateError('Поле заполненно неверно', field);
            }
        }
    }
};
/**Порверка статуса Чекбокса*/
let agreement = function () {
    if (agree.checked) {
        //  console.log('CHECKED')
    } else {
        //  console.log('NOTCHECKED')

    }
};
/**Проверяет совпадение паролей*/
let checkPasswordMatch = function () {
    if (password.value !== passwordConfirm.value) {
        let error = generateError('Пароли не совпадают');
        password.parentElement.insertBefore(error, password);
    }
};
/**Слушатель на кнопку сабмит, для вызова функций проверки*/
form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeValidation();
    checkFieldsPresence();
    checkPasswordMatch();
    agreement();
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
