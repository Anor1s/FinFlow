import {
  HousingIcon,
  FoodAndDrinksIcon,
  TransportIcon,
  ClothingIcon,
  HealthIcon,
  CommunicationIcon,
  EducationIcon,
  EntertainmentIcon,
  HouseholdIcon,
  FinancialIcon,
  GiftsCharityIcon,
  OtherIcon,
  BadHabitsIcon,
  TravelIcon,
  BeautyIcon,
  PetsIcon,
  SalaryIcon,
  SavingsIcon
} from './index.js'

const CategoryButtonData = [
  // Витрати (Expenses)
  { value: 'housing', icon: HousingIcon, text: 'Housing' },
  { value: 'foodAndDrinks', icon: FoodAndDrinksIcon, text: 'Food & Drinks' },
  { value: 'transport', icon: TransportIcon, text: 'Transport' },
  { value: 'clothing', icon: ClothingIcon, text: 'Clothing' },
  { value: 'health', icon: HealthIcon, text: 'Health' },
  { value: 'communication', icon: CommunicationIcon, text: 'Communication' },
  { value: 'education', icon: EducationIcon, text: 'Education' },
  { value: 'entertainment', icon: EntertainmentIcon, text: 'Entertainment' },
  { value: 'household', icon: HouseholdIcon, text: 'Household' },
  { value: 'financial', icon: FinancialIcon, text: 'Financial Expenses' },
  { value: 'giftsCharity', icon: GiftsCharityIcon, text: 'Gifts & Charity' },
  { value: 'other', icon: OtherIcon, text: 'Other' },
  { value: 'badHabits', icon: BadHabitsIcon, text: 'Bad Habits' },
  { value: 'travel', icon: TravelIcon, text: 'Travel' },
  { value: 'beauty', icon: BeautyIcon, text: 'Beauty' },
  { value: 'pets', icon: PetsIcon, text: 'Pets' },
  // Доходи (Income)
  { value: 'salary', icon: SalaryIcon, text: 'Salary' },
  //{ value: 'investments', icon: Analytics, text: 'Investments' },
  //{ value: 'otherIncome', icon: Analytics, text: 'Other Income' },
  // Спеціальні категорії (Special)
  { value: 'savings', icon: SavingsIcon, text: 'Savings' }
];

export default CategoryButtonData;