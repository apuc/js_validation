import {v$} from './validationModule.js';

window.onload = function () {
	//v$.fillObjectData();
	v$.vRun('Post', 'ip.php').then(r => console.log("Валидация при загрузке страницы"))
};



