import fs from 'fs';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const statuses = ['active', 'inactive', 'pending', 'completed'];
const partners = [
  'Acme Corporation',
  'Globex Inc.',
  'Stark Industries',
  'Wayne Enterprises',
  'Umbrella Corporation',
  'Initech',
  'Hooli',
  'Wonka Industries',
  'Dunder Mifflin',
  'Cyberdyne Systems',
  'Pied Piper',
  'Gringotts Bank',
  'Oscorp',
  'Tyrell Corporation'
];
const titles = [
  'Senior Developer',
  'Project Manager',
  'Product Designer',
  'Data Analyst',
  'Marketing Specialist',
  'Sales Executive',
  'Customer Support Lead',
  'HR Coordinator',
  'Operations Manager',
  'Financial Advisor',
  'Business Analyst',
  'UX Researcher',
  'Content Strategist',
  'SEO Specialist'
];
const descriptions = [
  'Responsible for developing and maintaining web applications.',
  'Oversees project timelines and ensures deliverables are met on time.',
  'Designs user interfaces and experiences for web and mobile applications.',
  'Analyzes data trends to inform business decisions.',
  'Creates and implements marketing strategies to increase brand awareness.',
  'Manages client relationships and drives sales growth.',
  'Leads the customer support team to ensure high levels of customer satisfaction.',
  'Coordinates HR activities including recruitment and employee relations.',
  'Manages daily operations to ensure efficiency and productivity.',
  'Provides financial advice and planning to clients.',
  'Analyzes business processes and recommends improvements.',
  'Conducts user research to improve product usability.',
  'Develops content strategies to enhance user engagement.',
  'Optimizes website content to improve search engine rankings.'
];

const data = Array.from({ length: 14 }, (_, id) => ({
  id: id + 1,
  partner: getRandomElement(partners),
  title: getRandomElement(titles),
  description: getRandomElement(descriptions),
  status: getRandomElement(statuses),
  count: getRandomInt(1, 100),
  points: getRandomInt(10, 1000)
}));

fs.writeFileSync('seed-output.json', JSON.stringify(data, null, 2), 'utf-8');
console.log("✅ Seed data generated!");