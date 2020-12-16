/*window.addEventListener('unhandledrejection', function (event) {
    // объект события имеет два специальных свойства:
    alert(event.promise); // [object Promise] - промис, который сгенерировал ошибку
    alert(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});*/
export class ValidationModule {
	form;
	fields;
	btnSubmit;
	patternArr;
	objectData;

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
		this.objectData = {}
	}

	fillObjectData =  function () {

		let formData = new FormData(this.form);
		//console.log(formData);
		for(let [key, value] of formData) {
		//	console.log(`${key} = ${value}`); // key1=value1, потом key2=value2
			this.objectData[key] = value;
		}

	};

	validationRun = function () {
		//console.log("Слушатель на элемент формы");
		for (let i = 0; i < this.fields.length; i++) {                  //перебор элементов формы
			this.fields[i].addEventListener("change", this.validation.bind(this));      //добавляет слушатель на изменение данных с функцией валидации
		}
	};

	validation = function () {
		console.log("Вызов фукций валидации");
		this.removeValidation();
		for (let i = 0; i < this.fields.length; i++) { 		//перебирает элементы формы
			this.searchMethodValid(this.fields[i]);         //вызывает для каждого функцию поиска соответственной валидации
			//console.log(this.objectData);
		}
		this.fillObjectData ();
	};

	searchMethodValid = function (formElement) {
		let validationRules = formElement.getAttribute('data-validation').split(" ");
		for (let rule of validationRules) {//Массив из дата атрибутов элемента
			if (rule.split("=")[1]) {           //поиск элементов которые нужно сравнивать
				let compareWith = rule.split("=")[1];   //разделить атрибут по равно и взять второй элемент массива
				this.compareValid(formElement, compareWith);        //вызывает функцию сравнения передавая текущий элемент и второй элемент из дата атриюута
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

	compareValid = function (formElement, compareWith) { //принимает элемент и строку с айди второго элемента
		let compareTarget = document.getElementById(compareWith);
		console.log(compareWith);
		if (compareTarget.value != formElement.value) {
			this.generateError(errorText['passwordConfirm'], formElement);
		}
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
		this.form.setAttribute("data-validation-error", "errorValid");
		error.setAttribute("data-valid", "errorValid");
		error.style.color = 'red';                                //устанавливает цвет текста
		error.innerHTML = text;                                   //передает текст в иннерHtml
		formElement.parentElement.insertBefore(error, formElement); //принимает значения перед родителем определенного элемента
	};

	/** проверка выбора селекта */
	selectValid = function (formElement) {
		let selectedValue = formElement.options[formElement.selectedIndex].value;       //селект.опции.[селект.айдиОпции].значение
		if (!selectedValue) {                                               //если выбранное значение селекта не тру, т.е. не имеет значения и возвращает фолс
			this.generateError(errorText['selectValid'], formElement);         //выполняем функцию генерации ошибки с текстом,
		}
	};

	passwordValid = function (formElement) {
		if (!this.patternValid(formElement.value, "password")) {
			this.generateError(errorText['valuePatternError'], formElement);

			return false
		} else {
			return true
		}
	};

	numberValid = function (formElement) {
		if (!this.patternValid(formElement.value, "number")) {
			this.generateError(errorText['valuePatternError'], formElement);

			return false
		} else {
			return true
		}
	};

	requireValid = function (formElement) {
		if (!formElement.value) {
			this.generateError(errorText['valueNone'], formElement);

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
			this.generateError(errorText['email'], formElement);

			return false
		}
		return true
	};

	/** проверка статуса чекбокса */
	agreementValid = function (formElement) {
		!formElement.checked ? this.generateError(errorText['agreement'], formElement) : false;
	};

	btnSubmitActive = function () {
		let error = this.form.querySelector('[data-valid="errorValid"]');
		if (error === null) {
			this.btnSubmit.disabled = false;
			this.form.removeAttribute("data-validation-error");
		} else {
			this.btnSubmit.disabled = true;
		}
	};

	createJsonForm = async function (method, url) {
		await this.validationRun();
/*		let object = {};
		let formData = new FormData(this.form);
		await console.log(formData);
		await formData.forEach(function (value, key) {
			object[key] = value;
			//console.log(object[key] = value);
		});*/
		//await console.log(this.objectData);
		let json = JSON.stringify(this.objectData);

		await this.sendFormToServer(method, url, json);
	};

	sendFormToServer = function (method, url, body = null) {
		if (!this.form.hasAttribute("data-validation-error")) {
			const headers = {
				'Content-Type': 'application/json'
			};
			return fetch(url, {
				method: method,
				body: JSON.stringify(body),
				headers: headers
			}).then((body) => {
				console.log(body);
				return body;
			}).catch(err => console.log(err + " error"))
		}
	};

	vRun = async function (method, url) {
		await this.validationRun();
		await this.validation();
		//await this.createJsonForm();
		this.form.addEventListener('submit',  (e) => {
			e.preventDefault();
			this.createJsonForm(method, url).then(r => console.log("Форма отправлена"));
		});
	}
}

let v$ = new ValidationModule();
export {v$};
/*async function vRun(method, url) {
    let validator = new ValidationModule();
    await validator.validationRun();
    await validator.validation();
    await validator.createJsonForm();
    validator.form.addEventListener('submit', function (e) {
        e.preventDefault();
        //validator.createJsonForm(method, url).then(r => console.log("Форма отправлена"));
    });
}*/

