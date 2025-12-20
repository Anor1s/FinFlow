const LoginInput = {
  render(inputId) {
    return `
      <label for="${inputId}" class="text-lg text-text-primary">
        Login
      </label>
      <input
        class="h-button w-full px-[16px] bg-surface text-base rounded text-text-tertiary border-2 border-surface-secondary box-border"
        type="text"
        id="${inputId}"
        placeholder="Enter your login"
        minlength="3"
        name="username" 
        autocomplete="username" 
      />
      <div class="text-text-error text-base" id="${inputId}Error"></div>
    `
  }
};

export default LoginInput;