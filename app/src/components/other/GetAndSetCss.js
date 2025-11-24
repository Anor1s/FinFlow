const getCSSVariable = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

const setCSSVariable = (variableName, value) => {
  document.documentElement.style.setProperty(variableName, value);
};

const setCSSGradient = (gradientName, colorFirst, colorSecond) => {
  document.documentElement.style.setProperty(`--gradient-${gradientName}-first`, colorFirst);
  document.documentElement.style.setProperty(`--gradient-${gradientName}-second`, colorSecond);

  localStorage.setItem('colorScheme', gradientName);
  localStorage.setItem('colorFirst', colorFirst);
  localStorage.setItem('colorSecond', colorSecond);
};



export { setCSSGradient, getCSSVariable };
