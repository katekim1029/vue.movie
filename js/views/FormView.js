import View from './View.js';

const tag = '[FormView]';

const FormView = Object.create(View);

FormView.setup = function(elem) {
    this.init(elem);
    this.inputElem = elem.querySelector('[type=date]');
    this.bindEvents();
    return this;
}

FormView.bindEvents = function() {
    this.inputElem.addEventListener('change', e => this.onChange(e));
}

FormView.onChange = function(e) {
    this.emit('@submit', {input: this.inputElem.value});
}

export default FormView;
