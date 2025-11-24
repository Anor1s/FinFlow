import { StandardButtonCreate, LogInIcon } from '../../index.js'

const ButtonConfig = {
  text: 'Log In',
  icon: LogInIcon,
  ariaLabel: 'Login to profile',
  title: 'Click to log in to your profile',
  action: 'login',
  id: 'loginButton',
  buttonType: 'submit'
}

const LogInButton = {
  render() {
    return StandardButtonCreate.render(ButtonConfig);
  }
};

export default LogInButton;