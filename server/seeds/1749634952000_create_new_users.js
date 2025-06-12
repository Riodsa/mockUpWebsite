const pool = require('../config/db');

const seed = async () => {
  try {
    // Add your seeding logic here
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await pool.query(`
      INSERT INTO users (name, email) VALUES
      ('John Doe', 'john@example.com'),
      ('Jane Smith', 'jane@example.com');
    `);
    console.log('Seeding completed for create_new_users');
  } catch (err) {
    console.error('Error seeding create_new_users:', err.stack);
  } finally {
    await pool.end();
  }
};

seed();
