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
}