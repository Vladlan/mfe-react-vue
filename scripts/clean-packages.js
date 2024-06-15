const { globSync } = require('glob');
const { rimraf } = require('rimraf');

// Find all node_modules directories in ./packages subfolders synchronously
const matches = globSync('./packages/*/node_modules');

matches.forEach((match) => {
  console.log(`Removing ${match} ...`);
  rimraf(match).then(() => {
    console.log('Removed:', match);
  }).catch((rimrafErr) => {
    if (rimrafErr) {
      console.error('Error removing directory:', match, rimrafErr);
    }
  });
});