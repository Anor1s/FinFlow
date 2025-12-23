// Page templates
export { default as SectionHeading } from '../../components/templates/pageTemplate/SectionHeading.js'
export { default as PageTemplate } from '../../components/templates/pageTemplate/PageTemplate.js'

export { default as StandardButtonCreate } from '../../components/templates/buttonsTemplate/standardButton/StandardButtonCreate.js'
export { default as LinkButtonCreate } from '../../components/templates/buttonsTemplate/linkButton/LinkButtonCreate.js'

// Icons
export { default as HidePasswordIcon } from '../../assets/icons/profile/HidePassword.svg'
export { default as ShowPasswordIcon } from '../../assets/icons/profile/ShowPassword.svg'

export { default as ErrorIcon } from '../../assets/icons/profile/Error.svg'

export { default as LogInIcon } from '../../assets/icons/profile/LogIn.svg'
export { default as LogOutIcon } from '../../assets/icons/profile/LogOut.svg'
export { default as SignUpIcon } from '../../assets/icons/profile/SignUp.svg'

export { default as DeleteAccountIcon } from '../../assets/icons/profile/DeleteAccount.svg'

// Utilities
export { Throttle, Debounce } from '../../components/other/Utilities.js'

// Page components
// Auth
export { default as Form } from './profileComponents/Form.js'
export { default as InputWrapper } from './profileComponents/InputWrapper.js'
export { default as SectionBody } from './profileComponents/SectionBody.js'

// Profile
export { default as ProfileItems } from './profileComponents/profileSections/items/Items.js'

// Buttons
export { default as LogInButton } from './profileComponents/buttons/LogIn.js'
export { default as SignUpButton } from './profileComponents/buttons/SignUp.js'

export { default as LogOutButton } from './profileComponents/profileSections/buttons/LogOut.js'
export { default as DeleteAccountButton } from './profileComponents/profileSections/buttons/DeleteAccount.js'

// Links
export { default as LogInLink } from './profileComponents/links/LogIn.js'
export { default as SignUpLink } from './profileComponents/links/SignUp.js'

// Inputs
export { default as LoginInput } from './profileComponents/inputs/LogIn.js'
export { default as EmailInput } from './profileComponents/inputs/Email.js'
export { default as PasswordInput } from './profileComponents/inputs/Password.js'
export { default as RepeatPasswordInput } from './profileComponents/inputs/RepeatPassword.js'

// Page sections
export { default as Login } from './profileComponents/pageSections/Login.js'
export { default as SignUp } from './profileComponents/pageSections/SignUp.js'

export { default as Accounts } from './Accounts.js'



export { default as ProfileSection } from './profileComponents/profileSections/ProfileSection.js'

// Auth service
export { default as AuthService } from '../../services/AuthService.js'
