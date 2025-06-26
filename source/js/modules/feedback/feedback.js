import {modals} from '../modal/init-modals';

export class Feedback {
  constructor() {
    this._modals = modals;
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

  async _getToken() {
    await new Promise((resolve, reject) => {
      grecaptcha.ready(resolve);
    });

    const token = await grecaptcha.execute('6Leyv2srAAAAAGn0HxWmAbFXhO7Qky6eYc21Ps60', {
      action: 'submit',
    });

    return token;
  }

  async _onSubmitForm(evt) {
    evt.preventDefault();

    const form = evt.target;
    const feedback = form.closest('[data-feedback]');
    const errors = form.querySelector('[data-feedback-errors]');

    feedback.classList.remove('is-error');
    errors.innerHTML = '';

    this._validateForm(form);

    if (this._errors.size) {
      this._setErrors(errors);
      feedback.classList.add('is-error');
    } else {
      const token = await this._getToken();

      const formData = new FormData(form);
      formData.append('action', 'feedback');
      formData.append('token', token);

      try {
        const response = await fetch('/local/templates/zhbi/ajax/feedback.php', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.TYPE === 'success') {
          if (feedback.dataset.feedback === 'modal') {
            const modal = document.querySelector('[data-modal].is-active');

            if (modal) {
              this._modals.close(modal.dataset.modal);
              this._modals.open('success');

              setTimeout(() => {
                this._modals.close('success');
              }, 3000);
            }
          } else {
            feedback.classList.add('is-success');
            setTimeout(() => {
              feedback.classList.remove('is-success');
            }, 3000);
          }
          form.reset();
        } else if (result.TYPE === 'error') {
          let errorResult = '';

          Array.from(result.RESULT).forEach((error) => {
            errorResult += this._createError(error);
          });

          errors.innerHTML = errorResult;
          feedback.classList.add('is-error');
        }
      } catch (err) {
        console.log('Error: ' + err);
      }
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