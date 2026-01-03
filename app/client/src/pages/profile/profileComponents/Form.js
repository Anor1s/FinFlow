import { Debounce, ErrorIcon } from "../index.js";

const Form = {
  render(formId, formParts) {
    return `
      <form 
        class="flex flex-col gap-base w-full" 
        id="${formId}"
      >
         ${formParts.join('\n')}
      </form>
    `
  },

  init(formId, onSubmit) {
    const form = document.getElementById(formId);
    if (!form) return;

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

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      let formIsValid = true;
      const formData = {};

      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        };

        if (input.name) {
          formData[input.name] = input.value;
        };
      });

      if (formIsValid && onSubmit) {
        try {
          await onSubmit(formData);
        } catch (error) {
          alert(error.message);
        }
      }
    });
  }
};

export default Form;