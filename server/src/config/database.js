import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Remove deprecated options and add better error handling
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error:`);
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('💡 Authentication failed. Please check:');
      console.error('   1. Username and password in MONGODB_URI are correct');
      console.error('   2. Database user has proper permissions');
      console.error('   3. Password doesn\'t contain special characters that need URL encoding');
      console.error('   4. If using MongoDB Atlas, ensure your IP is whitelisted\n');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('💡 Connection failed. Please check:');
      console.error('   1. Internet connection');
      console.error('   2. MongoDB Atlas cluster is running');
      console.error('   3. Connection string is correct\n');
    }
    
    process.exit(1);
  }
};

export default connectDB;
