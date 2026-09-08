-- ============================================================
-- FinFlow — схема БД + демо-дані
-- Застосування:
--   psql -h localhost -p 1488 -U postgres -d finflow -f schema.sql
-- ============================================================

-- Опціонально: повне перестворення (розкоментуй, якщо таблиці вже існують і їх треба знести)
-- DROP TABLE IF EXISTS transactions, refresh_tokens, exchange_rates, users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    base_currency VARCHAR(10) NOT NULL DEFAULT 'USD',   -- register-ендпоїнт не передає це поле
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    category VARCHAR(100),
    transaction_date DATE,
    transaction_time TIME,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('income', 'expense')),
    transaction_place VARCHAR(255),
    note TEXT,
    amount_base NUMERIC(15, 2),
    exchange_rate NUMERIC(10, 6)
);

-- Під ORDER BY у пагінації + діапазонні фільтри summary/charts
CREATE INDEX IF NOT EXISTS idx_transactions_user_date
    ON transactions (user_id, transaction_date DESC, transaction_time DESC);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);

CREATE TABLE IF NOT EXISTS exchange_rates (
    from_currency VARCHAR(10),
    to_currency VARCHAR(10),
    rate NUMERIC(15, 6) NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (from_currency, to_currency)
);


-- ============================================================
-- Демо-дані: 12 місяців × 5 транзакцій для одного користувача
-- Логін демо-акаунта у застосунку:  demo_user / password123
-- Блок ідемпотентний: повторний запуск не дублює транзакції.
-- ============================================================
DO $$
DECLARE
    u_id BIGINT;
    extra_categories TEXT[] := ARRAY['transport', 'clothing', 'health', 'communication', 'entertainment', 'travel', 'beauty', 'pets'];
    curr_date DATE;
    m INTEGER;
    temp_amount NUMERIC(15, 2);
BEGIN
    -- 1. Демо-користувач: створюємо, якщо нема; беремо реальний id
    INSERT INTO users (username, email, password_hash, base_currency)
    VALUES (
        'demo_user',
        'demo@finflow.local',
        '$argon2id$v=19$m=65536,t=3,p=4$pdFLrt9XAU7mOdv2P8jB8Q$ziju4IrQgTywiS8RyACv961nMya0bYkQSjk6JWUsC7Y',
        'USD'
    )
    ON CONFLICT (username) DO UPDATE SET email = EXCLUDED.email
    RETURNING id INTO u_id;

    -- 2. Прибираємо попередній сід цього користувача
    DELETE FROM transactions WHERE user_id = u_id;

    FOR m IN 1..12 LOOP
        curr_date := make_date(2025, m, 1);

        -- 1. Salary (дохід: 3000..5000)
        temp_amount := round((random() * 2000 + 3000)::numeric, 2);
        INSERT INTO transactions (user_id, amount, currency, category, transaction_date, transaction_time, transaction_type, transaction_place, amount_base, exchange_rate)
        VALUES (u_id, temp_amount, 'USD', 'salary', curr_date + (floor(random() * 3))::int, '10:00:00', 'income', 'Main Job', temp_amount, 1.0);

        -- 2. Savings (дохід у категорії savings: 200..800)
        temp_amount := round((random() * 600 + 200)::numeric, 2);
        INSERT INTO transactions (user_id, amount, currency, category, transaction_date, transaction_time, transaction_type, transaction_place, amount_base, exchange_rate)
        VALUES (u_id, temp_amount, 'USD', 'savings', curr_date + (floor(random() * 5 + 20))::int, '18:00:00', 'income', 'Piggy Bank', temp_amount, 1.0);

        -- 3. Housing (витрата: 1000..1500)
        temp_amount := round((random() * 500 + 1000)::numeric, 2);
        INSERT INTO transactions (user_id, amount, currency, category, transaction_date, transaction_time, transaction_type, transaction_place, amount_base, exchange_rate)
        VALUES (u_id, temp_amount, 'USD', 'housing', curr_date + (floor(random() * 5 + 1))::int, '09:00:00', 'expense', 'Apartment', temp_amount, 1.0);

        -- 4. Food & Drinks (витрата: 400..900)
        temp_amount := round((random() * 500 + 400)::numeric, 2);
        INSERT INTO transactions (user_id, amount, currency, category, transaction_date, transaction_time, transaction_type, transaction_place, amount_base, exchange_rate)
        VALUES (u_id, temp_amount, 'USD', 'foodAndDrinks', curr_date + (floor(random() * 20 + 5))::int, '14:30:00', 'expense', 'Supermarket', temp_amount, 1.0);

        -- 5. Випадкова категорія (витрата: 50..500)
        temp_amount := round((random() * 450 + 50)::numeric, 2);
        INSERT INTO transactions (user_id, amount, currency, category, transaction_date, transaction_time, transaction_type, transaction_place, amount_base, exchange_rate)
        VALUES (
            u_id,
            temp_amount,
            'USD',
            extra_categories[floor(random() * array_length(extra_categories, 1) + 1)],
            curr_date + (floor(random() * 25 + 1))::int,
            '19:45:00',
            'expense',
            'City Mall',
            temp_amount,
            1.0
        );
    END LOOP;
END $$;
