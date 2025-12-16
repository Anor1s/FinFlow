const EmailInput = {
  render(inputId) {
    return `
      <label for="${inputId}" class="text-lg text-text-primary">
        Email
      </label>
      <input
        class="h-button w-full px-[16px] bg-surface text-base rounded text-text-tertiary  border-2 border-surface-secondary box-border"
        type="email"
        id="${inputId}"
        placeholder="Enter your email"
        name="email"
        autocomplete="email"
      />
      <div class="text-text-error text-base" id="${inputId}Error"></div>
      `
  }
};

export default EmailInput;