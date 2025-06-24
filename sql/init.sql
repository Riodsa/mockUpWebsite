-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Texts Table
CREATE TABLE texts (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    text_en TEXT,
    type VARCHAR(50), -- "Heading/Body"
    page VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Images Table
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    page VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BusinessCards Table
CREATE TABLE business_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    body TEXT,
    body_en TEXT,
    image_url VARCHAR(255),
    href VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CultureCards Table
CREATE TABLE culture_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    body TEXT,
    body_en TEXT,
    image_url VARCHAR(255),
    href VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AwardCards Table
CREATE TABLE award_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    body TEXT,
    body_en TEXT,
    image_url VARCHAR(255),
    href VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LifeAtMitrpholCards Table
CREATE TABLE life_at_mitrphol_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    body TEXT,
    body_en TEXT,
    image_url VARCHAR(255),
    href VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CareerGrowthCards Table
CREATE TABLE career_growth_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    body TEXT,
    body_en TEXT,
    image_url VARCHAR(255),
    href VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BenefitCards Table
CREATE TABLE benefit_cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    image_url VARCHAR(255),
    href VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -- Blog Table
-- CREATE TABLE
--     blog (
--         blog_id SERIAL PRIMARY KEY,
--         title VARCHAR(255) NOT NULL,
--         content TEXT NOT NULL,
--         author_id INT,
--         image VARCHAR(255),
--         tag VARCHAR(255),
--         active BOOLEAN DEFAULT TRUE,
--         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--     );

-- Inserting sample admin (5 admin)
INSERT INTO
    Users (user_name,email, name)
VALUES
        (
            'A.Phatdanai',
            'A.Phatdanai@mitrphol.com',
            'Phatdanai Arsomngern'
        ),
        (
            'R.Phon',
            'R.Phon@mitrphol.com',
            'Phon Rattanapichai'
        )
