import { Debounce, ErrorIcon } from "../index.js";

const Form = {
  render(formId, formParts) {
    return `
      <form class="flex flex-col gap-xs w-full" id="${formId}">
         ${formParts.join('\n')}
      </form>
    `
  },

  init(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');

    const debouncedValidate = Debounce(function(field) {
      validateField(field);
    }, 200);

    inputs.forEach(input => {
      input.addEventListener('input', function () {
        debouncedValidate(this);
      });

      input.addEventListener('blur', function () {
        validateField(this);
      });
    });

    function validateField(field) {
      let isValid = true;
      let errorElement = document.getElementById(field.id + 'Error');

      const errorIcon = `
      <img 
        class="inline mr-[2px]"
        src="${ErrorIcon}"
        alt="icon"
        width="20"
        height="20"
        loading="lazy"
      />
    `
      errorElement.innerHTML = '';
      field.classList.remove('error');

      const fieldName = field.name || field.type;

      switch (fieldName) {
        case 'username':
          if (field.value.length < 3) {
            errorElement.innerHTML = `
              ${errorIcon}
              Username must be at least 3 characters
            `;
            isValid = false;
          }
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value)) {
            errorElement.innerHTML = `
              ${errorIcon}
              Enter a valid email
            `;
            isValid = false;
          }
          break;

        case 'password':
          if (field.value.length < 6) {
            errorElement.innerHTML = `
              ${errorIcon}
              Password must be at least 6 characters
            `;
            isValid = false;
          }
          break;

        case 'repeatPassword':
          const passwordField = form.querySelector('input[name="password"]');
          if (field.value !== passwordField.value) {
            errorElement.innerHTML = `
              ${errorIcon}
              Passwords do not match
            `;
            isValid = false;
          }
          break;
      }

      return isValid;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let formIsValid = true;

      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        }
      });

      if (formIsValid) {
        alert('Submit');
      }
    });
  }
};

export default Form;