import {LinkButtonCreate, SignUpIcon} from "../../index.js";

const ButtonConfig = {
  text: 'Create account?',
  link: '#',
  icon: SignUpIcon,
  buttonText: 'Sign Up',
  id: 'switchToSignUp'
}

const SignUpLink = {
  render() {
    return LinkButtonCreate.render(ButtonConfig);
  }
};

export default SignUpLink;