const fs = require('fs');
const path = require('path');

const coursesDir = path.join(__dirname, 'src', 'Components', 'Course');
const outputFile = path.join(__dirname, 'src', 'data', 'coursesData.js');

const filesToParse = {
  'advjava': 'Advjava.jsx',
  'css': 'Css.jsx',
  'dsa': 'Dsa.jsx',
  'express': 'Express.jsx',
  'html': 'Html.jsx',
  'java': 'Javaprog.jsx',
  'javascript': 'Javascript.jsx',
  'mongodb': 'Mongodb.jsx',
  'mysql': 'Mysql.jsx',
  'nodejs': 'Nodejs.jsx',
  'react': 'Reactjs.jsx'
};

const coursesData = {};

Object.entries(filesToParse).forEach(([id, filename]) => {
  const filePath = path.join(coursesDir, filename);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract title
    const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Course Title';

    // Extract coursecarts
    const regex = /<Coursecart\s+link="([^"]*)"\s+title="([^"]*)"(?:[^>]*?desc="([^"]*)")?/g;
    const videos = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      videos.push({
        link: match[1],
        title: match[2],
        desc: match[3] || ""
      });
    }

    coursesData[id] = {
      id,
      title,
      videos
    };
  }
});

const outputContent = `const coursesData = ${JSON.stringify(coursesData, null, 2)};\n\nexport default coursesData;`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, outputContent, 'utf8');

console.log('Successfully generated coursesData.js with ' + Object.keys(coursesData).length + ' courses extracted!');
