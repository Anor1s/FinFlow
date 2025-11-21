function getProperty(property) {
  let propertyValue = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim()
  if (propertyValue.includes('px') && !property.includes('breakpoint')) {
    propertyValue = propertyValue.replace('px', '')

  }

  return propertyValue;
}


const ChartStyles = {
  color: getProperty('--text-tertiary'),
  fontSizeLabel: getProperty('--text-xl'),
  fontSizeMain: getProperty('--text-base'),
  backgroundColor: getProperty('--color-background'),
  border: getProperty('--color-surface'),
  laptopBreakpoint: getProperty('--breakpoint-laptop'),
  chartsBreakpoint: getProperty('--breakpoint-chart'),
  fontFamily: getProperty('--font-family-primary'),
};


export default ChartStyles;