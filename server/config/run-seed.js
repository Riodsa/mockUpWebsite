const fs = require('fs').promises;
const path = require('path');

async function runSeeds() {
  const seedDir = path.join(__dirname, '../seeds');
  const files = await fs.readdir(seedDir);
  const seedFiles = files.filter(file => file.endsWith('.js')).sort(); // Sort by timestamp

  for (const file of seedFiles) {
    console.log(`Running seed: ${file}`);
    require(path.join(seedDir, file));
  }
}

runSeeds().catch(err => console.error('Error running seeds:', err));