export class Feedback {
  constructor() {
    this._feedback = document.querySelectorAll('[data-feedback]');

    this._onSubmitForm = this._onSubmitForm.bind(this);

    this._emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    this._errors = new Set();
  }

  init() {
    if (!this._feedback.length) {
      return;
    }

    
    this._feedback.forEach((element) => {
      const form = element.querySelector('[data-feedback-form]');

      form.addEventListener('submit', this._onSubmitForm);
    });
  }

  _onSubmitForm(evt) {
    evt.preventDefault();
    const feedback = evt.target.parentElement;
    const errors = evt.target.querySelector('[data-feedback-errors]');
    feedback.classList.remove('is-error');
    errors.innerHTML = '';

    this._validateForm(evt.target);

    if (this._errors.size) {
      evt.preventDefault();

      this._setErrors(errors);
      feedback.classList.add('is-error');
    } else {
      const recaptchaToken = evt.target.querySelector('[data-recaptcha-token]');

      grecaptcha.execute('6Leyv2srAAAAAGn0HxWmAbFXhO7Qky6eYc21Ps60', {
        action: 'submit',
      })
        .then(function (token) {
          recaptchaToken.value = token;
          evt.target.submit();
        });
    }
  }

  _validateForm(form) {
    this._errors.clear();

    const fields = form.querySelectorAll('[data-validate-type]');

    fields.forEach((field) => {
      const type = field.dataset.validateType;

      switch (type) {
        case 'text':
          this._validateTextField(field);
          break;
        case 'phone':
          this._validatePhoneField(field);
          break;
        case 'email':
          this._validateEmailField(field);
          break;
      }
    });
  }

  _validateTextField(field) {
    const input = field.querySelector('input');

    if (!input.value) {
      field.classList.add('is-error');
      this._errors.add('required');
    } else {
      field.classList.remove('is-error');
    }
  }

  _validatePhoneField(field) {

    const input = field.querySelector('input');

    if (!input.value) {
      field.classList.add('is-error');
      this._errors.add('required');
    } else if (input.value.length < 18) {
      field.classList.add('is-error');
      this._errors.add('phone');
    } else {
      field.classList.remove('is-error');
    }
  }

  _validateEmailField(field) {

    const input = field.querySelector('input');

    if (!input.value) {
      field.classList.add('is-error');
      this._errors.add('required');
    }else if (input.value && !this._emailRegex.test(input.value)) {
      field.classList.add('is-error');
      this._errors.add('email');
    } else {
      field.classList.remove('is-error');
    }
  }

  _setErrors(element) {
    let result = '';

    this._errors.forEach((error, errorAgain, set) => {
      switch (error) {
        case 'required':
          result += this._createError('Заполните все обязательные поля');
          break;
        case 'phone':
          result += this._createError('Введите пожалуйста корректный номер телефона');
          break;
        case 'email':
          result += this._createError('Введите пожалуйста корректный адрес электронной почты');
          break;
      }
    });

    element.innerHTML = result;
  }

  _createError(text) {
    return `
      <div class="errors__item">
        <svg width="20" height="20" aria-hidden="true">
          <use xlink:href="#icon-attention"></use>
        </svg>
        <p class="errors__text">${text}</p>
      </div>
    `;
  }
}