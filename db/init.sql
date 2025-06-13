-- Content Table
CREATE TABLE
    content (
        content_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        image VARCHAR(255),
        tag VARCHAR(255),
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Blog Table
CREATE TABLE
    blog (
        blog_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id INT,
        image VARCHAR(255),
        tag VARCHAR(255),
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- -- Inserting sample customers (5 customers)
-- INSERT INTO
--     customer (name, email, phone, address)
-- VALUES
--     (
--         'John Doe',
--         'john.doe@example.com',
--         '555-1234',
--         '1234 Elm Street, Springfield, IL'
--     ),
--     (
--         'Jane Smith',
--         'jane.smith@example.com',
--         '555-5678',
--         '5678 Oak Avenue, Chicago, IL'
--     ),
--     (
--         'Alice Johnson',
--         'alice.johnson@example.com',
--         '555-9876',
--         '9876 Pine Drive, Dallas, TX'
--     ),
--     (
--         'Bob Brown',
--         'bob.brown@example.com',
--         '555-6543',
--         '6543 Maple Road, Phoenix, AZ'
--     ),
--     (
--         'Charlie Davis',
--         'charlie.davis@example.com',
--         '555-4321',
--         '4321 Birch Lane, Seattle, WA'
--     );