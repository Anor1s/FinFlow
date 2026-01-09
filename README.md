# FinFlow

## English Version

### Description

FinFlow is a modern personal finance management application designed to help users track, analyze, and optimize their financial life. Built with a focus on speed and clarity, it offers seamless transaction tracking, multi-currency support, and data-driven insights to help users reach their savings goals faster.

### Key Features

- **Transaction Tracking**: Easy logging of income and expenses with category management
- **Multi-Currency Engine**: Automatic exchange rate synchronization (USD, EUR, UAH) using Open-ER API
- **Smart Analytics**: Interactive financial visualization using Chart.js
- **Large Value Formatting**: Intelligent number abbreviation (e.g., 1.25M) for a clean user interface
- **Modern UI**: Responsive glassmorphism design built with Tailwind CSS v4
- **Data Governance**: Architecture designed with a focus on data integrity and security

### Technology Stack

- **Frontend**: Vite, Vanilla JavaScript, Tailwind CSS v4, Chart.js
- **Backend**: FastAPI (Python), PostgreSQL
- **Integration**: Open-ER API for real-time currency rates
- **Design and Modeling**: BPMN for process flows, DBML for database schema design

### Database Architecture

The application utilizes a relational database model to ensure data integrity and support multi-currency financial operations.

- **Users**: Stores account information and selected base currency
- **Transactions**: Central table for income and expense records (amount, currency, category, timestamp)
- **Exchange Rates**: Stores currency pairs with a unique constraint. Uses UPSERT logic (ON CONFLICT) to update rates without duplicating rows
- **Categories**: Predefined and custom classification for financial data

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Anor1s/FinFlow.git
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Set up the Python environment and install backend requirements for the FastAPI server

---

## Українська версія

### Опис

FinFlow — це сучасний додаток для управління особистими фінансами, розроблений для того, щоб допомогти користувачам відстежувати, аналізувати та оптимізувати своє фінансове життя. Створений з акцентом на швидкість та чіткість, він пропонує безперервне відстеження транзакцій, підтримку кількох валют та аналітику на основі даних, що допомагає користувачам швидше досягати цілей щодо заощаджень.

### Основні можливості

- **Відстеження транзакцій**: Зручна реєстрація доходів та витрат з керуванням категоріями
- **Мультивалютний механізм**: Автоматична синхронізація курсів валют (USD, EUR, UAH) через Open-ER API
- **Розумна аналітика**: Інтерактивна візуалізація фінансових даних за допомогою Chart.js
- **Форматування великих значень**: Інтелектуальне скорочення чисел (наприклад, 1.25M) для чистоти інтерфейсу
- **Сучасний інтерфейс**: Адаптивний дизайн у стилі glassmorphism, побудований на Tailwind CSS v4
- **Управління даними**: Архітектура, розроблена з фокусом на цілісність та безпеку даних

### Технологічний стек

- **Frontend**: Vite, Vanilla JavaScript, Tailwind CSS v4, Chart.js
- **Backend**: FastAPI (Python), PostgreSQL
- **Інтеграція**: Open-ER API для отримання курсів валют у реальному часі
- **Дизайн та моделювання**: BPMN для опису процесів, DBML для проектування схем бази даних

### Архітектура бази даних

Додаток використовує реляційну модель бази даних для забезпечення цілісності даних та підтримки мультивалютних операцій.

- **Користувачі**: Зберігання інформації про акаунти та обрану базову валюту
- **Транзакції**: Центральна таблиця доходів та витрат (сума, валюта, категорія, час)
- **Курси валют**: Зберігання пар валют з унікальним індексом. Використовує логіку UPSERT (ON CONFLICT) для оновлення курсів без створення дублікатів
- **Категорії**: Наперед визначена та користувацька класифікація фінансових даних

### Встановлення

1. Клонувати репозиторій:
```bash
git clone https://github.com/Anor1s/FinFlow.git
```

2. Встановити залежності фронтенду:
```bash
cd client
npm install
```

3. Запустити сервер розробки:
```bash
npm run dev
```

4. Налаштувати середовище Python та встановити необхідні пакети для сервера FastAPI