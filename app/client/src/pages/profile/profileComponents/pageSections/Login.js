import {
  SectionBody,
  SectionHeading,
  Form,
  InputWrapper,
  LoginInput,
  EmailInput,
  PasswordInput,
  LogInButton,
  SignUpLink,

  AuthService
} from '../../index.js'


const Login = {
  formId : 'loginForm',
  loginId: 'loginLogin',
  emailId: 'loginEmail',
  passwordId: 'loginPassword',
  passwordButtonId: 'loginPasswordButton',

  render() {
    return SectionBody.render([
      SectionHeading.render('Log in to your profile'),
      Form.render(this.formId, [
        InputWrapper.render(LoginInput.render(this.loginId)),
        InputWrapper.render(EmailInput.render(this.emailId)),
        InputWrapper.render(PasswordInput.render(this.passwordId, this.passwordButtonId)),
        LogInButton.render(),
        SignUpLink.render()
      ])
    ])
  },

  init() {
    Form.init(this.formId, async (formData) => {
      await AuthService.login(formData.username, formData.password);
      alert('Welcome back!');
      window.location.reload();
    });
    PasswordInput.init(this.passwordId, this.passwordButtonId);
  }
};

export default Login;