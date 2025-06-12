const pool = require('../config/db');

const seed = async () => {
  try {
    // Add your seeding logic here
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await pool.query(`
      INSERT INTO users (name, email) VALUES
      ('user1', 'user1@example.com'),
      ('user2', 'user2@example.com');
    `);
    console.log('Seeding completed for add_user');
  } catch (err) {
    console.error('Error seeding add_user:', err.stack);
  } finally {
    await pool.end();
  }
};

seed();
