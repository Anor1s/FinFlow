import { FilterButtonsGetData } from '../index.js'

const DateTimeFilter = {
  render() {
    return `
    
    `
  },

  init() {
    const dateTime = FilterButtonsGetData()
    console.log(dateTime)
  }
};

export default DateTimeFilter;