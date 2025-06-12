const fs = require('fs');
const path = require('path');

const seedName = process.argv[2];
if (!seedName) {
  console.error('Please provide a seed name. Usage: node generate-seed.js <seed-name>');
  process.exit(1);
}

const seedDir = path.join(__dirname, '../seeds');
const timestamp = Date.now();
const fileName = `${timestamp}_${seedName}.js`;
const filePath = path.join(seedDir, fileName);

const template = `const pool = require('../config/db');

const seed = async () => {
  try {
    // Add your seeding logic here
    await pool.query('TRUNCATE TABLE your_table RESTART IDENTITY CASCADE;');
    await pool.query(\`
      INSERT INTO your_table (column1, column2) VALUES
      ('value1', 'value2');
    \`);
    console.log('Seeding completed for ${seedName}');
  } catch (err) {
    console.error('Error seeding ${seedName}:', err.stack);
  } finally {
    await pool.end();
  }
};

seed();
`;

fs.writeFileSync(filePath, template);
console.log(`Seed file created: ${filePath}`);