let form = document.querySelector('form[data-validation="formValidation"]');
let submitBtn = form.querySelector('[data-validation="btnSubmit"]');
let email = form.querySelector('[data-validation="emailValid"]');
let password = form.querySelector('[data-validation="password"]');
let passwordConfirm = form.querySelector('[data-validation="passwordConfirmation"]');
let number = form.querySelector('[data-validation="number"]');
let fields = form.querySelectorAll('[data-field="field"]');

let generateError = function (text){
    let error = document.createElement('div');
    error.className='error';
    error.style.color='red';
    error.innerHTML = text;
    return error
};

let removeValidation = function() {
    let errors = form.querySelectorAll('.error');
    for(let i = 0; i < errors.length; i ++) {
        errors[i].remove()
    }
};

 let checkFieldsPresence = function () {
     for (let i = 0; i < fields.length; i++){
         if (!fields[i].value){
             console.log('field is blank', fields[i] + 'not full');
            let error = generateError('Поле заполненно неверно');
             form[i].parentElement.insertBefore(error, fields[i]);

         }
     }
 };

 let checkPasswordMatch = function() {
     if (password.value !== passwordConfirm.value) {
         let error =  generateError('Пароли не совпадают');
         password.parentElement.insertBefore(error, password);
     }
 };

form.addEventListener('submit',function (event) {
    event.preventDefault();
    removeValidation();
    checkFieldsPresence();
    checkPasswordMatch();
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
