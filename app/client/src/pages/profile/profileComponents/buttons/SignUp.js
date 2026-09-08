import { StandardButtonCreate, SignUpIcon } from '../../index.js'

const ButtonConfig = {
  text: 'Sign Up',
  icon: SignUpIcon,
  ariaLabel: 'Create new profile',
  title: 'Click to create a new profile',
  action: 'signup',
  id: 'signUpButton',
  buttonType: 'submit'
}

const SignUpButton = {
  render() {
    return StandardButtonCreate.render(ButtonConfig);
  }
};

export default SignUpButton;