import {
  SectionBody,
  SectionHeading,
  Form,
  InputWrapper,
  LoginInput,
  EmailInput,
  PasswordInput,
  RepeatPasswordInput,
  SignUpButton,
  LogInLink,
  AuthService,
  Dialog
} from '../../index.js'


const SignUp = {
  formId : 'singUpForm',
  loginId: 'singUpLogin',
  emailId: 'singUpEmail',
  passwordId: 'singUpPassword',
  passwordButtonId: 'singUpPasswordButton',
  repeatPasswordId: 'singUpRepeatPasswordId',
  repeatPasswordButtonId: 'singUpRepeatPasswordButton',

  render() {
    return SectionBody.render([
      SectionHeading.render('Sign up for an profile'),
      Form.render(this.formId, [
        InputWrapper.render(LoginInput.render(this.loginId)),
        InputWrapper.render(EmailInput.render(this.emailId)),
        InputWrapper.render(PasswordInput.render(this.passwordId, this.passwordButtonId)),
        InputWrapper.render(RepeatPasswordInput.render(this.repeatPasswordId, this.repeatPasswordButtonId)),
        SignUpButton.render(),
        LogInLink.render()
      ])
    ])
  },

  init() {
    Form.init(this.formId, async (formData) => {
      await AuthService.register(formData.username, formData.email, formData.password, formData.repeatPassword);
      Dialog.alert('Registration successful. Your account has been created.');

      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
    PasswordInput.init(this.passwordId, this.passwordButtonId);
    RepeatPasswordInput.init(this.repeatPasswordId, this.repeatPasswordButtonId);
  }
};

export default SignUp;