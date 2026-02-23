import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error(`Please either:`);
    console.error(`  1. Stop the process using port ${PORT}`);
    console.error(`  2. Change the PORT in your .env file`);
    console.error(`\nTo find and kill the process: lsof -ti:${PORT} | xargs kill -9\n`);
    process.exit(1);
  } else {
    throw err;
  }
});
