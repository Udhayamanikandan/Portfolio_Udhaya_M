const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

const projects = [
  {
    index: 'PROJECT_001',
    name: 'Wildlife Trade Risk Inspector',
    description: 'AI-powered ecological risk dashboard to analyze wildlife trade records and detect suspicious behavior using Isolation Forest anomaly detection.',
    stack: ['Flask', 'MongoDB', 'Machine Learning', 'Isolation Forest', 'Streamlit'],
    githubUrl: 'https://github.com/Udhayamanikandan/wildlife-risk',
    liveUrl: '',
    featured: true
  },
  {
    index: 'PROJECT_002',
    name: 'Criclytics – IPL Analytics Dashboard',
    description: 'Full-stack IPL analytics platform with player statistics, team analysis and leaderboard dashboards built with REST APIs and dynamic React routing.',
    stack: ['React.js', 'Node.js', 'MySQL', 'REST API', 'React Router'],
    githubUrl: 'https://github.com/Udhayamanikandan//criclytics',
    liveUrl: '',
    featured: true
  },
  {
    index: 'PROJECT_003',
    name: 'GPS Campus Shuttle Tracker',
    description: 'WiFi-based real-time shuttle tracking using ESP32 and NEO-6M GPS modules with UART and HTTP communication for live location transfer.',
    stack: ['ESP32', 'NEO-6M GPS', 'IoT', 'UART', 'HTTP'],
    githubUrl: 'https://github.com/Udhayamanikandan//shuttle-tracker',
    liveUrl: '',
    featured: false
  },
  {
    index: 'PROJECT_004',
    name: 'Smart Water Tracker',
    description: 'Offline hydration monitoring system with hourly reminders, inactivity alerts and water-level tracking using RTC DS3231 and HC-SR04 ultrasonic sensor.',
    stack: ['Arduino UNO', 'RTC DS3231', 'HC-SR04', 'Buzzer', 'Sensors'],
    githubUrl: 'https://github.com/Udhayamanikandan/water-tracker',
    liveUrl: '',
    featured: false
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    await Project.insertMany(projects);
    console.log('🌱 Projects seeded successfully!');

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();
