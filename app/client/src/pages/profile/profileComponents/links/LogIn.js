import { LinkButtonCreate, LogInIcon } from "../../index.js";

const ButtonConfig = {
  text: 'Sign in account?',
  link: '/',
  icon: LogInIcon,
  buttonText: 'Log In',
}

const LogInLink = {
  render() {
    return LinkButtonCreate.render(ButtonConfig);
  }
};

export default LogInLink;