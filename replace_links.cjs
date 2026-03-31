const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
  '"/courses/mern/nodejs"': '"/course/nodejs"',
  '"/courses/mern/express"': '"/course/express"',
  '"/courses/mern/react"': '"/course/react"',
  '"/courses/mern/mongodb"': '"/course/mongodb"',
  '"/courses/fullstack/sql"': '"/course/mysql"',
  '"/courses/fullstack/nodejs"': '"/course/nodejs"',
  '"/courses/fullstack/express"': '"/course/express"',
  '"/courses/fullstack/react"': '"/course/react"',
  '"/courses/fullstack/mongodb"': '"/course/mongodb"',
  '"/courses/fullstack/javascript"': '"/course/javascript"',
  '"/courses/fullstack/html"': '"/course/html"',
  '"/courses/fullstack/css"': '"/course/css"',
  '"/courses/java"': '"/course/java"',
  '"/courses/dsa"': '"/course/dsa"',
  '"/cources/programming/java"': '"/course/java"',
  '"/cources/programming/advJava"': '"/course/advjava"',
  '"/cources/programming/javascript"': '"/course/javascript"'
};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldStr, newStr] of Object.entries(replacements)) {
        if (content.includes(oldStr)) {
          content = content.split(oldStr).join(newStr);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated links in ${file}`);
      }
    }
  }
}

walkDir(srcDir);
console.log('Link replacement complete.');
