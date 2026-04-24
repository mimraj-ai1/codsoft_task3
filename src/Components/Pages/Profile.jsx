import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getIdToken } from "../../auth/accessTokenOptions.js";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import coursesData from "../../data/coursesData";

/* ─── PLATFORM DATA ──────────────────────────────────────────── */
const PLATFORM_COURSES = [
  { id: "html", title: "HTML Tutorial", icon: "🌐", color: "#FFF0E6", accent: "#E44D26", tag: "Beginner", category: "Web Dev" },
  { id: "css", title: "CSS Mastery", icon: "🎨", color: "#F0EEFF", accent: "#264DE4", tag: "Beginner", category: "Web Dev" },
  { id: "javascript", title: "JavaScript Full Course", icon: "⚡", color: "#FFFBE6", accent: "#C9A800", tag: "Intermediate", category: "Web Dev" },
  { id: "react", title: "Full React JS Course", icon: "⚛️", color: "#E6F9FF", accent: "#0EA5C9", tag: "Intermediate", category: "Frontend" },
  { id: "nodejs", title: "Node.js Tutorial", icon: "🟢", color: "#EDFCF0", accent: "#339933", tag: "Intermediate", category: "Backend" },
  { id: "mongodb", title: "MongoDB & Mongoose", icon: "🍃", color: "#EDFCF5", accent: "#00AA55", tag: "Intermediate", category: "Database" },
  { id: "dsa", title: "DSA with Java", icon: "🧩", color: "#FFF0F6", accent: "#D63384", tag: "Advanced", category: "CS Fundamentals" },
  { id: "java", title: "Java Programming", icon: "☕", color: "#FEF3E6", accent: "#E76F00", tag: "Intermediate", category: "Programming" },
  { id: "advjava", title: "Advanced Java", icon: "🚀", color: "#F3E8FF", accent: "#7C3AED", tag: "Advanced", category: "Programming" },
  { id: "express", title: "Express.js", icon: "⚙️", color: "#F0F4FF", accent: "#3B82F6", tag: "Intermediate", category: "Backend" },
  { id: "mysql", title: "MySQL Tutorial", icon: "🗄️", color: "#E8F5FF", accent: "#0077CC", tag: "Beginner", category: "Database" },
];

const EBOOKS = [
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke", icon: "📘", pages: 472, url: "https://eloquentjavascript.net/", tag: "Free" },
  { title: "You Don't Know JS", author: "Kyle Simpson", icon: "📗", pages: 280, url: "https://github.com/getify/You-Dont-Know-JS", tag: "Free" },
  { title: "The Modern JavaScript Tutorial", author: "javascript.info", icon: "⚡", pages: 500, url: "https://javascript.info/", tag: "Free" },
  { title: "React Docs (Official)", author: "Meta / React Team", icon: "⚛️", pages: 300, url: "https://react.dev/learn", tag: "Free" },
  { title: "Node.js Docs & Guides", author: "OpenJS Foundation", icon: "🟢", pages: 200, url: "https://nodejs.org/en/docs/guides", tag: "Free" },
  { title: "MongoDB Manual", author: "MongoDB Inc.", icon: "🍃", pages: 400, url: "https://www.mongodb.com/docs/manual/", tag: "Free" },
  { title: "CSS: The Definitive Guide", author: "MDN Web Docs", icon: "🎨", pages: 350, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", tag: "Free" },
  { title: "Pro Git Book", author: "Scott Chacon", icon: "📕", pages: 574, url: "https://git-scm.com/book/en/v2", tag: "Free" },
];

const QUIZ_BANK = {
  html: [
    { q: "What does HTML stand for?", opts: ["HyperText Markup Language","HighText Machine Language","HyperText Machine Language","HyperText Markup Level"], ans: 0 },
    { q: "Which tag creates a hyperlink?", opts: ["<link>","<a>","<href>","<url>"], ans: 1 },
    { q: "Which tag is used for the largest heading?", opts: ["<h6>","<head>","<h1>","<h0>"], ans: 2 },
    { q: "Which attribute specifies an image URL?", opts: ["href","link","src","url"], ans: 2 },
    { q: "What does the <br> tag do?", opts: ["Bold text","Line break","Border","Background"], ans: 1 },
    { q: "Which HTML element defines the document body?", opts: ["<main>","<section>","<body>","<content>"], ans: 2 },
    { q: "Which input type creates a checkbox?", opts: ["type=\"check\"","type=\"checkbox\"","type=\"tick\"","type=\"box\""], ans: 1 },
    { q: "How do you add a comment in HTML?", opts: ["// comment","/* comment */","<!-- comment -->","## comment"], ans: 2 },
    { q: "Which tag creates an ordered list?", opts: ["<ul>","<li>","<list>","<ol>"], ans: 3 },
    { q: "What is the correct HTML for a table row?", opts: ["<row>","<td>","<tr>","<th>"], ans: 2 },
  ],
  css: [
    { q: "What does CSS stand for?", opts: ["Cascading Style Sheets","Creative Style System","Computer Style Sheets","Colorful Style Sheets"], ans: 0 },
    { q: "Which property changes text color?", opts: ["font-color","text-color","color","foreground"], ans: 2 },
    { q: "How do you select an element with id='demo'?", opts: [".demo","#demo","*demo","demo"], ans: 1 },
    { q: "Which property adds space inside an element's border?", opts: ["margin","spacing","padding","border-space"], ans: 2 },
    { q: "Which value makes an element invisible but still takes space?", opts: ["display:none","visibility:hidden","opacity:0","hidden:true"], ans: 1 },
    { q: "How do you make text bold in CSS?", opts: ["font-weight:bold","text-bold:yes","font-style:bold","text-weight:bold"], ans: 0 },
    { q: "Which CSS property controls the text size?", opts: ["font-size","text-size","font-style","text-scale"], ans: 0 },
    { q: "What is the default position value in CSS?", opts: ["relative","fixed","absolute","static"], ans: 3 },
    { q: "Which property is used to create a flexible layout?", opts: ["grid","flex","float","position"], ans: 1 },
    { q: "Which pseudo-class targets a hovered element?", opts: [":active",":focus",":hover",":visited"], ans: 2 },
  ],
  javascript: [
    { q: "Which company created JavaScript?", opts: ["Microsoft","Google","Netscape","Apple"], ans: 2 },
    { q: "How do you declare a variable in modern JS?", opts: ["var x","let x","Both A and B","variable x"], ans: 2 },
    { q: "What does === check?", opts: ["Value only","Type only","Value and type","Reference"], ans: 2 },
    { q: "Which method adds an element to the end of an array?", opts: ["push()","pop()","shift()","append()"], ans: 0 },
    { q: "What is a closure?", opts: ["A loop","A function with access to outer scope","A class","An error handler"], ans: 1 },
    { q: "What does JSON stand for?", opts: ["Java Standard Object Notation","JavaScript Object Notation","JavaScript Online Notation","Java Open Network"], ans: 1 },
    { q: "Which keyword is used to define a function?", opts: ["def","fun","function","method"], ans: 2 },
    { q: "What does typeof null return?", opts: ["null","undefined","object","string"], ans: 2 },
    { q: "Which method converts JSON string to object?", opts: ["JSON.parse()","JSON.stringify()","JSON.convert()","JSON.object()"], ans: 0 },
    { q: "What is the output of 2 + '2' in JS?", opts: ["4","22","NaN","Error"], ans: 1 },
  ],
  react: [
    { q: "What is JSX?", opts: ["A database","JavaScript XML syntax","A CSS framework","A backend language"], ans: 1 },
    { q: "Which hook manages state in a function component?", opts: ["useEffect","useRef","useState","useContext"], ans: 2 },
    { q: "What does useEffect do?", opts: ["Manages state","Handles side effects","Creates context","Renders JSX"], ans: 1 },
    { q: "How do you pass data to a child component?", opts: ["state","props","context","ref"], ans: 1 },
    { q: "What is the virtual DOM?", opts: ["A real browser DOM","A JavaScript copy of the DOM","A CSS selector","A database"], ans: 1 },
    { q: "Which method renders a React component to the DOM?", opts: ["React.render()","ReactDOM.createRoot().render()","React.mount()","React.start()"], ans: 1 },
    { q: "What is the key prop used for?", opts: ["Styling","Event handling","Unique identification in lists","Routing"], ans: 2 },
    { q: "Which company maintains React?", opts: ["Google","Microsoft","Meta","Amazon"], ans: 2 },
    { q: "What hook fetches data on component mount?", opts: ["useState","useCallback","useEffect","useMemo"], ans: 2 },
    { q: "What does lifting state up mean?", opts: ["Moving state to a parent","Deleting state","Using global state","Using Redux"], ans: 0 },
  ],
  dsa: [
    { q: "What is the time complexity of binary search?", opts: ["O(n)","O(n²)","O(log n)","O(1)"], ans: 2 },
    { q: "Which data structure uses LIFO?", opts: ["Queue","Stack","Linked List","Tree"], ans: 1 },
    { q: "What is the worst-case for bubble sort?", opts: ["O(n log n)","O(n)","O(n²)","O(log n)"], ans: 2 },
    { q: "Which traversal visits root first?", opts: ["Inorder","Postorder","Preorder","Level order"], ans: 2 },
    { q: "What is a hash table used for?", opts: ["Sorting","Fast key-value lookup","Graph traversal","Memory management"], ans: 1 },
    { q: "Which algorithm finds shortest path in a graph?", opts: ["DFS","BFS","Dijkstra's","Merge Sort"], ans: 2 },
    { q: "What is a linked list?", opts: ["An array","Nodes connected by pointers","A hash table","A binary tree"], ans: 1 },
    { q: "What does BFS stand for?", opts: ["Binary First Search","Breadth First Search","Base First Sort","Boolean First Search"], ans: 1 },
    { q: "What is the best time complexity for sorting?", opts: ["O(n)","O(n log n)","O(n²)","O(log n)"], ans: 1 },
    { q: "A queue uses which principle?", opts: ["LIFO","FILO","FIFO","LILO"], ans: 2 },
  ],
};

const QUIZ_TOPICS = [
  { title: "HTML Quiz", key: "html", questions: 10, difficulty: "Easy", icon: "🌐", color: "#FFF0E6", accent: "#E44D26" },
  { title: "CSS Quiz", key: "css", questions: 10, difficulty: "Easy", icon: "🎨", color: "#F0EEFF", accent: "#264DE4" },
  { title: "JavaScript Quiz", key: "javascript", questions: 10, difficulty: "Medium", icon: "⚡", color: "#FFFBE6", accent: "#C9A800" },
  { title: "React Quiz", key: "react", questions: 10, difficulty: "Medium", icon: "⚛️", color: "#E6F9FF", accent: "#0EA5C9" },
  { title: "DSA Quiz", key: "dsa", questions: 10, difficulty: "Hard", icon: "🧩", color: "#FFF0F6", accent: "#D63384" },
];

/* ─── STYLES ─────────────────────────────────────────────────── */
const DASHBOARD_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
.pf-app{font-family:'DM Sans',sans-serif;background:#F2F6FF;min-height:100vh;color:#1A1F36}

.pf-layout{display:grid;grid-template-columns:220px 1fr;min-height:calc(100vh - 64px)}

/* SIDEBAR */
.pf-sidebar{background:#fff;border-right:1.5px solid #E8EDF8;padding:1.25rem 0.75rem;display:flex;flex-direction:column;gap:2px;position:sticky;top:64px;height:calc(100vh - 64px);overflow-y:auto}
.pf-sb-section{font-size:0.62rem;font-weight:700;color:#94A3B8;letter-spacing:0.1em;padding:0.6rem 0.75rem 0.3rem;text-transform:uppercase}
.pf-sb-item{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:10px;cursor:pointer;font-size:0.82rem;font-weight:500;color:#475569;transition:all 0.15s;text-decoration:none;border:none;background:none;width:100%;font-family:inherit}
.pf-sb-item:hover{background:#F2F6FF;color:#0D9488}
.pf-sb-item.active{background:linear-gradient(135deg,#E6FAF7,#E0F7FE);color:#0D9488;font-weight:600}
.pf-sb-icon{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.82rem;flex-shrink:0}
.pf-sb-item.active .pf-sb-icon{background:rgba(13,148,136,0.12)}
.pf-sb-badge{margin-left:auto;background:#EF4444;color:#fff;font-size:0.6rem;font-weight:700;padding:2px 6px;border-radius:10px}

/* PROFILE BAR */
.pf-prog-box{background:#fff;border:1.5px solid #E8EDF8;border-radius:14px;padding:1rem 1.1rem;margin-top:auto}
.pf-prog-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}
.pf-prog-label{font-size:0.78rem;font-weight:600;color:#1A1F36}
.pf-prog-pct{font-size:0.78rem;font-weight:700;color:#0D9488}
.pf-prog-track{height:7px;background:#E8EDF8;border-radius:10px;overflow:hidden}
.pf-prog-fill{height:100%;border-radius:10px;background:linear-gradient(90deg,#0D9488,#0EA5E9);transition:width 0.5s ease}
.pf-prog-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:8px}
.pf-prog-tag{font-size:0.62rem;font-weight:600;padding:3px 8px;border-radius:20px;display:flex;align-items:center;gap:3px}
.pf-tag-done{background:#DCFCE7;color:#166534}
.pf-tag-todo{background:#F1F5F9;color:#64748B}

/* MAIN */
.pf-main{padding:1.5rem;display:flex;flex-direction:column;gap:1.25rem;overflow-y:auto}

/* WELCOME */
.pf-welcome{background:linear-gradient(130deg,#0D9488 0%,#0EA5E9 60%,#6366F1 100%);border-radius:20px;padding:1.75rem 2rem;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden}
.pf-welcome::before{content:'';position:absolute;top:-40px;right:200px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.06);pointer-events:none}
.pf-welcome::after{content:'';position:absolute;bottom:-30px;right:80px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,0.05);pointer-events:none}
.pf-w-tag{background:rgba(255,255,255,0.2);color:#fff;font-size:0.68rem;font-weight:700;padding:4px 10px;border-radius:20px;display:inline-block;margin-bottom:10px;letter-spacing:0.04em}
.pf-w-title{font-family:'Space Grotesk',sans-serif;font-size:1.5rem;font-weight:700;color:#fff;line-height:1.25;margin-bottom:6px}
.pf-w-sub{font-size:0.82rem;color:rgba(255,255,255,0.8);margin-bottom:1.25rem;line-height:1.5}
.pf-w-btns{display:flex;gap:10px;flex-wrap:wrap}
.pf-w-btn-primary{background:#fff;color:#0D9488;border:none;padding:9px 20px;border-radius:10px;font-size:0.82rem;font-weight:700;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-flex;align-items:center}
.pf-w-btn-secondary{background:rgba(255,255,255,0.15);color:#fff;border:1.5px solid rgba(255,255,255,0.4);padding:9px 18px;border-radius:10px;font-size:0.82rem;font-weight:600;cursor:pointer;font-family:inherit}
.pf-streak-box{background:rgba(255,255,255,0.15);border:1.5px solid rgba(255,255,255,0.3);border-radius:16px;padding:1rem 1.4rem;color:#fff;text-align:center;backdrop-filter:blur(4px);flex-shrink:0}
.pf-streak-num{font-family:'Space Grotesk',sans-serif;font-size:2rem;font-weight:700}
.pf-streak-lbl{font-size:0.7rem;opacity:0.8;margin-top:2px}
.pf-avatar-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0;margin-right:1.5rem}
.pf-avatar{width:72px;height:72px;border-radius:50%;border:3px solid rgba(255,255,255,0.5);object-fit:cover}
.pf-avatar-name{font-size:0.78rem;font-weight:600;color:#fff;opacity:0.9}
.pf-avatar-email{font-size:0.68rem;color:rgba(255,255,255,0.7)}

/* STAT CARDS */
.pf-stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.pf-stat-card{background:#fff;border-radius:16px;border:1.5px solid #E8EDF8;padding:1.1rem 1.25rem;display:flex;flex-direction:column;gap:4px}
.pf-stat-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.pf-stat-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:0.95rem}
.pf-stat-badge{font-size:0.68rem;font-weight:700;padding:3px 7px;border-radius:20px}
.pf-badge-new{background:#DCFCE7;color:#15803D}
.pf-badge-na{background:#F1F5F9;color:#64748B}
.pf-stat-val{font-family:'Space Grotesk',sans-serif;font-size:1.7rem;font-weight:700;color:#1A1F36}
.pf-stat-lbl{font-size:0.72rem;color:#64748B}
.pf-stat-sub{font-size:0.68rem;color:#94A3B8;margin-top:2px}

/* SECTION HEADER */
.pf-sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.875rem}
.pf-sec-title{font-family:'Space Grotesk',sans-serif;font-size:0.95rem;font-weight:700;color:#1A1F36;display:flex;align-items:center;gap:7px}
.pf-sec-count{background:#E8EDF8;color:#475569;font-size:0.65rem;font-weight:700;padding:2px 7px;border-radius:10px}
.pf-sec-action{font-size:0.75rem;font-weight:600;color:#0D9488;cursor:pointer;display:flex;align-items:center;gap:4px;text-decoration:none}

/* COURSE GRID */
.pf-course-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.pf-course-card{background:#fff;border-radius:14px;border:1.5px solid #E8EDF8;overflow:hidden;cursor:pointer;transition:all 0.2s;text-decoration:none;display:block}
.pf-course-card:hover{border-color:#0D9488;transform:translateY(-3px);box-shadow:0 8px 24px rgba(13,148,136,0.1)}
.pf-course-thumb{height:80px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;position:relative}
.pf-course-tag-pill{position:absolute;top:8px;left:8px;font-size:0.6rem;font-weight:700;padding:3px 8px;border-radius:20px;letter-spacing:0.04em}
.pf-course-body{padding:10px 12px 12px}
.pf-course-title{font-size:0.8rem;font-weight:700;color:#1A1F36;margin-bottom:6px;line-height:1.3}
.pf-course-meta{display:flex;align-items:center;justify-content:space-between;font-size:0.68rem;color:#94A3B8;margin-bottom:8px}
.pf-enroll-btn{background:#0D9488;color:#fff;border:none;font-size:0.65rem;font-weight:700;padding:5px 10px;border-radius:6px;cursor:pointer;font-family:inherit;text-decoration:none}
.pf-enroll-btn.outline{background:transparent;border:1.5px solid #0D9488;color:#0D9488}

/* QUIZ */
.pf-quiz-list{display:flex;flex-direction:column;gap:8px}
.pf-quiz-item{background:#fff;border:1.5px solid #E8EDF8;border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color 0.15s}
.pf-quiz-item:hover{border-color:#0D9488}
.pf-quiz-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.pf-quiz-info{flex:1}
.pf-quiz-title{font-size:0.85rem;font-weight:700;color:#1A1F36;margin-bottom:3px}
.pf-quiz-sub{font-size:0.7rem;color:#94A3B8}
.pf-quiz-diff{font-size:0.65rem;font-weight:700;padding:4px 10px;border-radius:20px}
.pf-diff-easy{background:#DCFCE7;color:#166534}
.pf-diff-medium{background:#FEF9C3;color:#854D0E}
.pf-diff-hard{background:#FEE2E2;color:#991B1B}
.pf-start-btn{background:transparent;border:1.5px solid #0D9488;color:#0D9488;font-size:0.68rem;font-weight:700;padding:6px 12px;border-radius:7px;cursor:pointer;font-family:inherit;flex-shrink:0}
.pf-start-btn:hover{background:#0D9488;color:#fff}

/* EBOOK */
.pf-ebook-list{display:flex;flex-direction:column;gap:8px}
.pf-ebook-item{background:#fff;border:1.5px solid #E8EDF8;border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color 0.15s}
.pf-ebook-item:hover{border-color:#0D9488}
.pf-ebook-cover{width:40px;height:50px;border-radius:6px;background:#F2F6FF;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
.pf-ebook-info{flex:1}
.pf-ebook-title{font-size:0.85rem;font-weight:700;color:#1A1F36;margin-bottom:3px;line-height:1.3}
.pf-ebook-author{font-size:0.7rem;color:#94A3B8}
.pf-ebook-pages{font-size:0.68rem;font-weight:600;color:#64748B;margin-top:3px}
.pf-read-btn{background:transparent;border:1.5px solid #E8EDF8;color:#475569;font-size:0.68rem;font-weight:700;padding:6px 12px;border-radius:7px;cursor:pointer;font-family:inherit;flex-shrink:0}
.pf-read-btn:hover{border-color:#0D9488;color:#0D9488}

/* QUICK ACTIONS */
.pf-actions-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.pf-action-card{background:#fff;border:1.5px solid #E8EDF8;border-radius:14px;padding:14px 12px;text-align:center;cursor:pointer;transition:all 0.15s}
.pf-action-card:hover{border-color:#0D9488;background:#F0FAFA}
.pf-action-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin:0 auto 8px}
.pf-action-label{font-size:0.75rem;font-weight:600;color:#1A1F36;margin-bottom:2px}
.pf-action-sub{font-size:0.65rem;color:#94A3B8}

/* AI CHATBOT */
.pf-chatbot{background:linear-gradient(120deg,#1E1B4B,#312E81);border-radius:16px;padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
.pf-chatbot-left{display:flex;align-items:center;gap:14px}
.pf-chatbot-icon{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0}
.pf-chatbot-title{font-family:'Space Grotesk',sans-serif;font-size:0.95rem;font-weight:700;color:#fff;margin-bottom:3px}
.pf-chatbot-sub{font-size:0.75rem;color:rgba(255,255,255,0.65)}
.pf-chatbot-btn{background:#A5B4FC;color:#1E1B4B;border:none;padding:9px 18px;border-radius:10px;font-size:0.78rem;font-weight:700;cursor:pointer;font-family:inherit;flex-shrink:0}
.pf-chatbot-btn:hover{background:#C7D2FE}

/* TWO COL */
.pf-two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px}

/* PLATFORM STATS */
.pf-plat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.pf-plat-card{background:#fff;border:1.5px solid #E8EDF8;border-radius:14px;padding:14px;text-align:center}
.pf-plat-num{font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:700;color:#0D9488}
.pf-plat-label{font-size:0.7rem;color:#64748B;margin-top:3px}

/* MY LEARNING */
.pf-enrolled-card{background:#fff;border:1.5px solid #E8EDF8;border-radius:12px;padding:12px 14px;margin-bottom:10px}
.pf-enrolled-title{font-size:0.82rem;font-weight:700;color:#1A1F36;margin-bottom:3px}
.pf-enrolled-sub{font-size:0.68rem;color:#94A3B8;margin-bottom:8px}
.pf-prog-bar{height:6px;background:#E8EDF8;border-radius:10px;overflow:hidden;margin-bottom:4px}
.pf-prog-bar-fill{height:100%;border-radius:10px;background:linear-gradient(90deg,#0D9488,#0EA5E9)}
.pf-prog-bar-fill.complete{background:linear-gradient(90deg,#22C55E,#16A34A)}
.pf-prog-bar-row{display:flex;justify-content:space-between;font-size:0.65rem;color:#94A3B8;margin-bottom:5px}
.pf-resume-btn{background:#0D9488;color:#fff;border:none;font-size:0.68rem;font-weight:700;padding:6px 12px;border-radius:7px;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-block}
.pf-resume-btn:hover{background:#0F766E}

/* EMPTY */
.pf-empty{background:#fff;border:1.5px dashed #CBD5E1;border-radius:14px;padding:2.5rem;text-align:center}
.pf-empty-icon{font-size:2.5rem;margin-bottom:12px}
.pf-empty-title{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:700;color:#1A1F36;margin-bottom:8px}
.pf-empty-sub{font-size:0.8rem;color:#64748B;max-width:280px;margin:0 auto 1.25rem;line-height:1.6}
.pf-empty-cta{background:#0D9488;color:#fff;border:none;padding:10px 22px;border-radius:9px;font-size:0.8rem;font-weight:700;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-block}

/* ACTIVITY */
.pf-activity{background:#fff;border-radius:14px;border:1.5px solid #E8EDF8;padding:0 1.25rem}
.pf-act-row{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid #F1F5F9}
.pf-act-row:last-child{border-bottom:none}
.pf-act-dot{width:8px;height:8px;border-radius:50%;margin-top:5px;flex-shrink:0}
.pf-act-text{font-size:0.78rem;color:#1A1F36;font-weight:500;flex:1;line-height:1.4}
.pf-act-time{font-size:0.68rem;color:#94A3B8;flex-shrink:0}

/* PAGE HEADER */
.pf-page-hd{background:linear-gradient(120deg,#0D9488,#0EA5E9);border-radius:16px;padding:1.5rem 1.75rem;margin-bottom:0}
.pf-page-hd-title{font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:4px}
.pf-page-hd-sub{font-size:0.82rem;color:rgba(255,255,255,0.8)}

/* SPINNER */
.pf-spinner{display:flex;align-items:center;justify-content:center;height:200px;font-size:1.5rem;color:#0D9488}

/* ── RESPONSIVE ─────────────────────────────────────────────── */

/* TABLET  (≤ 900px) */
@media(max-width:900px){
  .pf-layout{grid-template-columns:180px 1fr}
  .pf-stat-row{grid-template-columns:repeat(2,1fr)}
  .pf-course-grid{grid-template-columns:repeat(2,1fr)}
  .pf-actions-grid{grid-template-columns:repeat(3,1fr)}
  .pf-two-col{grid-template-columns:1fr}
  .pf-welcome{flex-direction:column;align-items:flex-start;gap:1rem}
  .pf-streak-box{align-self:stretch;text-align:left;display:flex;align-items:center;gap:1rem}
  .pf-streak-num{font-size:1.5rem}
  .pf-w-title{font-size:1.25rem}
}

/* MOBILE  (≤ 600px) */
@media(max-width:600px){
  /* Stack sidebar as a horizontal bottom nav */
  .pf-layout{grid-template-columns:1fr;grid-template-rows:1fr auto}
  .pf-sidebar{
    position:fixed;bottom:0;left:0;right:0;top:auto;
    height:auto;flex-direction:row;overflow-x:auto;overflow-y:hidden;
    border-right:none;border-top:1.5px solid #E8EDF8;
    padding:6px 8px;gap:0;z-index:100;
    align-items:center;justify-content:space-around
  }
  .pf-sb-section{display:none}
  .pf-sb-item{
    flex-direction:column;gap:2px;padding:6px 8px;
    font-size:0.58rem;border-radius:8px;min-width:48px;
    align-items:center;white-space:nowrap
  }
  .pf-sb-icon{width:22px;height:22px;font-size:0.75rem}
  .pf-prog-box{display:none}
  .pf-main{padding:0.75rem;padding-bottom:72px;gap:0.875rem}

  /* Welcome banner */
  .pf-welcome{flex-direction:column;align-items:flex-start;gap:0.875rem;padding:1.25rem}
  .pf-streak-box{display:none}
  .pf-avatar-wrap{flex-direction:row;gap:10px;margin-right:0}
  .pf-avatar{width:48px;height:48px}
  .pf-w-title{font-size:1.1rem}
  .pf-w-sub{margin-bottom:0.875rem}

  /* Grids → single column */
  .pf-stat-row{grid-template-columns:repeat(2,1fr);gap:8px}
  .pf-course-grid{grid-template-columns:1fr 1fr;gap:8px}
  .pf-actions-grid{grid-template-columns:repeat(2,1fr);gap:8px}
  .pf-two-col{grid-template-columns:1fr}
  .pf-plat-grid{grid-template-columns:repeat(2,1fr)}

  /* Cards tighter */
  .pf-stat-card{padding:0.75rem}
  .pf-stat-val{font-size:1.3rem}
  .pf-page-hd{padding:1rem 1.1rem;border-radius:12px}
  .pf-page-hd-title{font-size:1.05rem}

  /* Quiz items: stack diff + btn below on tiny screens */
  .pf-quiz-item{flex-wrap:wrap;gap:8px}
  .pf-quiz-diff,.pf-start-btn{flex-shrink:0}
}

/* VERY SMALL  (≤ 380px) */
@media(max-width:380px){
  .pf-course-grid{grid-template-columns:1fr}
  .pf-stat-row{grid-template-columns:1fr 1fr}
  .pf-sb-item{font-size:0.52rem;min-width:40px}
}
`;


/* ─── SHARED HELPERS ─────────────────────────────────────────── */
function getCourseProgress(userProfile, courseId) {
  const course = coursesData[courseId];
  if (!course) return { completed: 0, total: 1, pct: 0 };
  const prog = (userProfile?.courseProgress || []).find((p) => p.courseId === courseId);
  const completed = prog ? prog.completedVideos.length : 0;
  const total = course.videos ? course.videos.length : 1;
  const pct = Math.round((completed / total) * 100);
  return { completed, total, pct };
}

/* ─── COMPONENT: COURSE ACTIVITY CHART ──────────────────────── */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildWeeklyData(enrolled) {
  const n = enrolled.length;
  return DAYS.map((day, i) => {
    const base = Math.max(0, n - Math.abs(3 - i));
    return { label: day, completed: Math.round(base * 0.6), inProgress: Math.round(base * 0.4) };
  });
}

function buildMonthlyData(enrolled) {
  const cur = new Date().getMonth();
  return MONTHS.map((m, i) => {
    if (i > cur) return { label: m, completed: 0, inProgress: 0 };
    const base = Math.max(0, enrolled.length - (cur - i));
    return { label: m, completed: Math.round(base * 0.7), inProgress: Math.round(base * 0.3) };
  });
}

function buildYearlyData(enrolled) {
  const year = new Date().getFullYear();
  return Array.from({ length: 8 }, (_, i) => {
    const y = year - 3 + i;          // 2023 → 2030 (current year 2026)
    const isFuture = y > year;
    const base = isFuture ? 0 : Math.max(0, enrolled.length - (3 - Math.min(i, 3)) * 2);
    return { label: String(y), completed: Math.round(base * 0.65), inProgress: Math.round(base * 0.35) };
  });
}

function CourseActivityChart({ enrolledCourses }) {
  const [tab, setTab] = React.useState("monthly");
  const [tooltip, setTooltip] = React.useState(null);

  const data = tab === "weekly" ? buildWeeklyData(enrolledCourses)
    : tab === "yearly" ? buildYearlyData(enrolledCourses)
      : buildMonthlyData(enrolledCourses);

  const maxVal = Math.max(...data.map(d => d.completed + d.inProgress), 5);
  const CHART_H = 100;
  const PAD_TOP = 14;
  const BAR_W = tab === "yearly" ? 28 : tab === "weekly" ? 24 : 16;
  const GROUP_W = BAR_W + (tab === "yearly" ? 38 : tab === "weekly" ? 32 : 14);
  const svgW = data.length * GROUP_W + 40;

  const TABS = [
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
    { key: "yearly", label: "Yearly" },
  ];

  return (
    <div style={{ background: "#fff", border: "1.5px solid #E8EDF8", borderRadius: "16px", padding: "1.25rem 1.5rem" }}>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#1A1F36" }}>
          Course Activity
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Legend */}
          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "#475569" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: "#0D9488", display: "inline-block" }} />
              Completed
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "#475569" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: "#A7F3D0", display: "inline-block" }} />
              In progress
            </span>
          </div>
          {/* Tab switcher */}
          <div style={{ display: "flex", background: "#F2F6FF", borderRadius: "10px", padding: "3px", gap: "2px" }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => { setTab(t.key); setTooltip(null); }} style={{
                background: tab === t.key ? "#0D9488" : "transparent",
                color: tab === t.key ? "#fff" : "#475569",
                border: "none", borderRadius: "8px", padding: "5px 13px",
                fontSize: "0.72rem", fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.15s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: "relative", overflowX: "auto" }}>
        <svg width="100%" viewBox={`0 0 ${svgW} ${CHART_H + PAD_TOP + 24}`} style={{ overflow: "visible", minWidth: "320px" }}>

          {/* Y-axis grid */}
          {[0, 25, 50, 75, 100].map(val => {
            const y = PAD_TOP + CHART_H - (val / 100) * CHART_H;
            return (
              <g key={val}>
                <line x1="28" y1={y} x2={svgW - 4} y2={y} stroke="#F1F5F9" strokeWidth="1" />
                <text x="24" y={y + 4} textAnchor="end" fontSize="8" fill="#94A3B8">{val}</text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const x = 32 + i * GROUP_W;
            const totalH = Math.round(((d.completed + d.inProgress) / maxVal) * CHART_H);
            const compH = Math.round((d.completed / maxVal) * CHART_H);
            const inProgH = totalH - compH;
            const baseY = PAD_TOP + CHART_H;

            return (
              <g key={i}
                onMouseEnter={e => setTooltip({ idx: i, d, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: "pointer" }}
              >
                {inProgH > 0 && <rect x={x} y={baseY - totalH} width={BAR_W} height={inProgH} rx="4" fill="#A7F3D0" />}
                {compH > 0 && <rect x={x} y={baseY - compH} width={BAR_W} height={compH} rx="4" fill="#0D9488" />}
                {totalH === 0 && <rect x={x} y={baseY - 3} width={BAR_W} height={3} rx="2" fill="#E8EDF8" />}
                <text x={x + BAR_W / 2} y={baseY + 14} textAnchor="middle" fontSize="8" fill="#94A3B8">{d.label}</text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div style={{
            position: "fixed", top: tooltip.y - 80, left: tooltip.x - 70,
            background: "#1A1F36", color: "#fff", borderRadius: "10px",
            padding: "8px 13px", fontSize: "0.72rem", zIndex: 9999,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)", pointerEvents: "none", minWidth: "130px",
          }}>
            <div style={{ fontWeight: 700, marginBottom: "5px" }}>{data[tooltip.idx]?.label}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "#0D9488", display: "inline-block" }} />
              Completed: <strong>{tooltip.d.completed}</strong>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "#A7F3D0", display: "inline-block" }} />
              In progress: <strong>{tooltip.d.inProgress}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── VIEW: DASHBOARD ────────────────────────────────────────── */


function DashboardView({ user, userProfile, enrolledCourses, certCount, setActiveSb }) {
  const firstName = user?.name?.split(" ")[0] || "Learner";
  const enrolledCount = enrolledCourses.length;

  return (
    <>
      {/* WELCOME */}
      <div className="pf-welcome">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="pf-avatar-wrap">
            {user?.picture
              ? <img src={user.picture} alt={user.name} className="pf-avatar" />
              : <div className="pf-avatar" style={{ background: "linear-gradient(135deg,#0D9488,#0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "1.5rem" }}>{user?.name?.charAt(0)?.toUpperCase()}</div>
            }
            <span className="pf-avatar-name">{user?.name}</span>
            <span className="pf-avatar-email">{user?.email}</span>
          </div>
          <div style={{ marginLeft: "1.25rem" }}>
            <div className="pf-w-title">Welcome back, {firstName}! 👋</div>
            <div className="pf-w-sub">
              Track your courses, tasks and achievements.
            </div>
            <div className="pf-w-btns">
              <button className="pf-w-btn-primary" onClick={() => setActiveSb("courses")}>Browse Courses</button>
            </div>
          </div>
        </div>
        <div className="pf-streak-box">

          <div className="pf-streak-num">{enrolledCount}</div>
          <div className="pf-streak-lbl">Enrolled Courses</div>
          <div style={{ fontSize: "0.65rem", marginTop: "8px", opacity: 0.7 }}>
            {enrolledCount === 0 ? "Enroll to get started!" : `${certCount} completed`}
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="pf-stat-row">
        <div className="pf-stat-card">
          <div className="pf-stat-top"><div className="pf-stat-icon" style={{ background: "#E6FAF7" }}>📚</div><span className="pf-stat-badge pf-badge-na">{enrolledCount} / {PLATFORM_COURSES.length}</span></div>
          <div className="pf-stat-val">{enrolledCount}</div>
          <div className="pf-stat-lbl">Courses Enrolled</div>
          <div className="pf-stat-sub">{PLATFORM_COURSES.length} available on platform</div>
        </div>
        <div className="pf-stat-card">
          <div className="pf-stat-top"><div className="pf-stat-icon" style={{ background: "#FEF9C3" }}>🧠</div><span className="pf-stat-badge pf-badge-na">{QUIZ_TOPICS.length} topics</span></div>
          <div className="pf-stat-val">0</div>
          <div className="pf-stat-lbl">Quizzes Taken</div>
          <div className="pf-stat-sub">HTML · CSS · JS · React · DSA</div>
        </div>
        <div className="pf-stat-card">
          <div className="pf-stat-top"><div className="pf-stat-icon" style={{ background: "#EFF6FF" }}>📖</div><span className="pf-stat-badge pf-badge-new">{EBOOKS.length} books</span></div>
          <div className="pf-stat-val">0</div>
          <div className="pf-stat-lbl">E-Books Read</div>
          <div className="pf-stat-sub">{EBOOKS.length} available in library</div>
        </div>
        <div className="pf-stat-card">
          <div className="pf-stat-top"><div className="pf-stat-icon" style={{ background: "#F3E8FF" }}>🏆</div><span className="pf-stat-badge pf-badge-na">{certCount > 0 ? `+${certCount}` : "—"}</span></div>
          <div className="pf-stat-val">{certCount}</div>
          <div className="pf-stat-lbl">Certificates</div>
          <div className="pf-stat-sub">Complete a course to earn</div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <div className="pf-sec-hd"><div className="pf-sec-title">Quick Actions</div></div>
        <div className="pf-actions-grid">
          <div className="pf-action-card" onClick={() => setActiveSb("courses")}>
            <div className="pf-action-icon" style={{ background: "#E6FAF7" }}>🎓</div>
            <div className="pf-action-label">All Courses</div>
            <div className="pf-action-sub">{PLATFORM_COURSES.length} available</div>
          </div>
          <div className="pf-action-card" onClick={() => setActiveSb("quizzes")}>
            <div className="pf-action-icon" style={{ background: "#FEF9C3" }}>⚡</div>
            <div className="pf-action-label">Take a Quiz</div>
            <div className="pf-action-sub">Test your knowledge</div>
          </div>
          <div className="pf-action-card" onClick={() => setActiveSb("ebooks")}>
            <div className="pf-action-icon" style={{ background: "#EFF6FF" }}>📖</div>
            <div className="pf-action-label">Browse E-Books</div>
            <div className="pf-action-sub">{EBOOKS.length} curated books</div>
          </div>

        </div>
      </div>


      <div>
        <div style={{ width: "100%" }}>
          <div className="pf-sec-hd">
            <div className="pf-sec-title">My Learning</div>
            <button className="pf-sec-action" style={{ border: "none", background: "none", fontFamily: "inherit" }} onClick={() => setActiveSb("learning")}>View all →</button>
          </div>
          {enrolledCount > 0 ? (
            enrolledCourses.slice(0, 3).map((courseId) => {
              const meta = PLATFORM_COURSES.find((c) => c.id === courseId);
              const { completed, total, pct } = getCourseProgress(userProfile, courseId);
              const course = coursesData[courseId];
              if (!course) return null;
              return (
                <div key={courseId} className="pf-enrolled-card">
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "1.1rem" }}>{meta?.icon || "📚"}</span>
                    <div style={{ flex: 1 }}>
                      <div className="pf-enrolled-title">{course.title}</div>
                      <div className="pf-enrolled-sub">{total} lessons</div>
                    </div>
                    <Link to={`/course/${courseId}`} className="pf-resume-btn">{pct >= 100 ? "Review" : "Resume →"}</Link>
                  </div>
                  <div className="pf-prog-bar-row"><span>{pct}% completed</span><span>{completed}/{total}</span></div>
                  <div className="pf-prog-bar"><div className={`pf-prog-bar-fill${pct >= 100 ? " complete" : ""}`} style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })
          ) : (
            <div className="pf-empty">
              <div className="pf-empty-icon">🎓</div>
              <div className="pf-empty-title">No courses enrolled yet</div>
              <div className="pf-empty-sub">Pick one of {PLATFORM_COURSES.length} courses and start building your skills today.</div>
              <button className="pf-empty-cta" onClick={() => setActiveSb("courses")}>Start Learning</button>
            </div>
          )}
        </div>
      </div>

      {/* COURSE ACTIVITY CHART */}
      <CourseActivityChart enrolledCourses={enrolledCourses} userProfile={userProfile} />
    </>
  );
}

/* ─── VIEW: MY LEARNING ──────────────────────────────────────── */
function MyLearningView({ userProfile, enrolledCourses, setActiveSb }) {
  return (
    <>
      <div className="pf-page-hd">
        <div className="pf-page-hd-title">📚 My Learning</div>
        <div className="pf-page-hd-sub">Track your progress across all enrolled courses</div>
      </div>
      {enrolledCourses.length === 0 ? (
        <div className="pf-empty">
          <div className="pf-empty-icon">🎓</div>
          <div className="pf-empty-title">No courses enrolled yet</div>
          <div className="pf-empty-sub">You haven't enrolled in any courses yet. Browse our {PLATFORM_COURSES.length} available courses and start your journey!</div>
          <button className="pf-empty-cta" onClick={() => setActiveSb("courses")}>Browse Courses</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {enrolledCourses.map((courseId) => {
            const course = coursesData[courseId];
            const meta = PLATFORM_COURSES.find((c) => c.id === courseId);
            if (!course) return null;
            const { completed, total, pct } = getCourseProgress(userProfile, courseId);
            return (
              <div key={courseId} style={{ background: "#fff", border: "1.5px solid #E8EDF8", borderRadius: "14px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: meta?.color || "#F2F6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>
                    {meta?.icon || "📚"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1A1F36", marginBottom: "2px" }}>{course.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{total} lessons · {meta?.category || "Course"}</div>
                  </div>
                  <div style={{ textAlign: "right", marginRight: "12px" }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: pct >= 100 ? "#22C55E" : "#0D9488" }}>{pct}%</div>
                    <div style={{ fontSize: "0.65rem", color: "#94A3B8" }}>{completed}/{total} done</div>
                  </div>
                  <Link to={`/course/${courseId}`} className="pf-resume-btn" style={{ flexShrink: 0 }}>
                    {pct >= 100 ? "🎉 Review" : "Resume →"}
                  </Link>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <div className="pf-prog-bar">
                    <div className={`pf-prog-bar-fill${pct >= 100 ? " complete" : ""}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                {pct >= 100 && (
                  <div style={{ marginTop: "8px", fontSize: "0.72rem", color: "#166534", background: "#DCFCE7", padding: "4px 10px", borderRadius: "6px", display: "inline-block" }}>
                    ✓ Course Completed — Certificate Earned!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ─── VIEW: ALL COURSES ──────────────────────────────────────── */
function CoursesView({ enrolledCourses }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(PLATFORM_COURSES.map((c) => c.category)))];
  const filtered = filter === "All" ? PLATFORM_COURSES : PLATFORM_COURSES.filter((c) => c.category === filter);

  return (
    <>
      <div className="pf-page-hd">
        <div className="pf-page-hd-title">🎓 All Courses</div>
        <div className="pf-page-hd-sub">{PLATFORM_COURSES.length} courses available · Click any course to start learning</div>
      </div>
      {/* Category filter */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? "#0D9488" : "#fff",
              color: filter === cat ? "#fff" : "#475569",
              border: `1.5px solid ${filter === cat ? "#0D9488" : "#E8EDF8"}`,
              padding: "5px 14px", borderRadius: "20px", fontSize: "0.75rem",
              fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
            }}
          >{cat}</button>
        ))}
      </div>
      <div className="pf-course-grid">
        {filtered.map((c) => {
          const totalVids = coursesData[c.id]?.videos?.length || 0;
          const isEnrolled = enrolledCourses.includes(c.id);
          return (
            <Link key={c.id} to={`/course/${c.id}`} className="pf-course-card">
              <div className="pf-course-thumb" style={{ background: c.color }}>
                {c.icon}
                <span className="pf-course-tag-pill" style={{ background: c.accent + "22", color: c.accent }}>{c.tag}</span>
              </div>
              <div className="pf-course-body">
                <div className="pf-course-title">{c.title}</div>
                <div className="pf-course-meta">
                  <span>📹 {totalVids} lessons</span>
                  <span style={{ fontSize: "0.62rem", background: "#F2F6FF", padding: "2px 6px", borderRadius: "6px", color: "#475569" }}>{c.category}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {isEnrolled
                    ? <span style={{ fontSize: "0.65rem", color: "#22C55E", fontWeight: 600 }}>✓ Enrolled</span>
                    : <span />
                  }
                  <span className={`pf-enroll-btn${isEnrolled ? " outline" : ""}`}>
                    {isEnrolled ? "Continue →" : "Enroll"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

/* ─── VIEW: QUIZZES ──────────────────────────────────────────── */
function QuizzesView() {
  const [active, setActive] = React.useState(null);   // key of active quiz
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [answers, setAnswers] = React.useState([]);
  const [finished, setFinished] = React.useState(false);

  const startQuiz = (key) => { setActive(key); setCurrent(0); setSelected(null); setAnswers([]); setFinished(false); };
  const resetQuiz = () => { setActive(null); setFinished(false); };

  if (active) {
    const qs = QUIZ_BANK[active];
    const q = qs[current];
    const score = answers.filter((a, i) => a === qs[i].ans).length;

    if (finished) {
      const pct = Math.round((score / qs.length) * 100);
      const badge = pct >= 80 ? { label: "🏆 Excellent!", color: "#22C55E" } : pct >= 50 ? { label: "👍 Good job!", color: "#F59E0B" } : { label: "📚 Keep practising!", color: "#EF4444" };
      return (
        <>
          <div className="pf-page-hd"><div className="pf-page-hd-title">🧠 Quiz Results</div><div className="pf-page-hd-sub">{QUIZ_TOPICS.find(t=>t.key===active)?.title}</div></div>
          <div style={{ background:"#fff", border:"1.5px solid #E8EDF8", borderRadius:"16px", padding:"2rem", textAlign:"center" }}>
            <div style={{ fontSize:"3rem", marginBottom:"12px" }}>{pct>=80?"🏆":pct>=50?"🎯":"📖"}</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"2rem", fontWeight:700, color:badge.color }}>{score}/{qs.length}</div>
            <div style={{ fontSize:"1rem", fontWeight:700, color:badge.color, margin:"6px 0 16px" }}>{badge.label}</div>
            <div style={{ width:"100%", height:10, background:"#E8EDF8", borderRadius:10, marginBottom:"1.5rem", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pct}%`, background:badge.color, borderRadius:10, transition:"width 0.6s" }} />
            </div>
            {qs.map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px", padding:"10px 0", borderBottom:"1px solid #F1F5F9", textAlign:"left" }}>
                <span style={{ fontSize:"1rem", flexShrink:0 }}>{answers[i]===item.ans?"✅":"❌"}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"0.82rem", fontWeight:600, color:"#1A1F36", marginBottom:2 }}>{item.q}</div>
                  <div style={{ fontSize:"0.72rem", color:answers[i]===item.ans?"#16A34A":"#EF4444" }}>
                    Your answer: {item.opts[answers[i]]} {answers[i]!==item.ans && `· Correct: ${item.opts[item.ans]}`}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:"1.5rem" }}>
              <button onClick={() => startQuiz(active)} style={{ background:"#0D9488", color:"#fff", border:"none", padding:"10px 22px", borderRadius:9, fontWeight:700, fontSize:"0.82rem", cursor:"pointer", fontFamily:"inherit" }}>Retry Quiz</button>
              <button onClick={resetQuiz} style={{ background:"#F1F5F9", color:"#475569", border:"none", padding:"10px 22px", borderRadius:9, fontWeight:700, fontSize:"0.82rem", cursor:"pointer", fontFamily:"inherit" }}>All Quizzes</button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="pf-page-hd"><div className="pf-page-hd-title">🧠 {QUIZ_TOPICS.find(t=>t.key===active)?.title}</div><div className="pf-page-hd-sub">Question {current+1} of {qs.length}</div></div>
        <div style={{ background:"#fff", border:"1.5px solid #E8EDF8", borderRadius:"16px", padding:"1.75rem" }}>
          <div style={{ width:"100%", height:6, background:"#E8EDF8", borderRadius:10, marginBottom:"1.5rem", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${((current)/qs.length)*100}%`, background:"#0D9488", borderRadius:10, transition:"width 0.3s" }} />
          </div>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.05rem", fontWeight:700, color:"#1A1F36", marginBottom:"1.25rem", lineHeight:1.5 }}>{q.q}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"1.5rem" }}>
            {q.opts.map((opt, oi) => (
              <button key={oi} onClick={() => setSelected(oi)}
                style={{ padding:"12px 16px", borderRadius:10, border:`2px solid ${selected===oi?"#0D9488":"#E8EDF8"}`, background:selected===oi?"#E6FAF7":"#FAFBFF", color:"#1A1F36", fontSize:"0.85rem", fontWeight:selected===oi?700:500, cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.15s" }}>
                <span style={{ marginRight:8, fontWeight:700, color:selected===oi?"#0D9488":"#94A3B8" }}>{String.fromCharCode(65+oi)}.</span>{opt}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <button onClick={resetQuiz} style={{ background:"transparent", border:"none", color:"#94A3B8", fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
            <button disabled={selected===null}
              onClick={() => {
                const newAns = [...answers, selected];
                setAnswers(newAns);
                setSelected(null);
                if (current + 1 >= qs.length) setFinished(true);
                else setCurrent(c => c+1);
              }}
              style={{ background:selected===null?"#E8EDF8":"#0D9488", color:selected===null?"#94A3B8":"#fff", border:"none", padding:"10px 24px", borderRadius:9, fontWeight:700, fontSize:"0.82rem", cursor:selected===null?"not-allowed":"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
              {current+1===qs.length ? "Finish Quiz" : "Next →"}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pf-page-hd"><div className="pf-page-hd-title">🧠 Quizzes</div><div className="pf-page-hd-sub">{QUIZ_TOPICS.length} topics · 10 questions each · Instant results</div></div>
      <div className="pf-quiz-list">
        {QUIZ_TOPICS.map((q, i) => (
          <div key={i} className="pf-quiz-item">
            <div className="pf-quiz-icon" style={{ background: q.color }}>{q.icon}</div>
            <div className="pf-quiz-info">
              <div className="pf-quiz-title">{q.title}</div>
              <div className="pf-quiz-sub">{q.questions} questions · Real-time evaluation · Instant results</div>
            </div>
            <span className={`pf-quiz-diff pf-diff-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
            <button className="pf-start-btn" onClick={() => startQuiz(q.key)}>Start Quiz →</button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── VIEW: E-BOOKS ──────────────────────────────────────────── */
function EBooksView() {
  return (
    <>
      <div className="pf-page-hd"><div className="pf-page-hd-title">📖 E-Book Library</div><div className="pf-page-hd-sub">{EBOOKS.length} free programming resources · Click any book to read online</div></div>
      <div style={{ background:"#DCFCE7", border:"1.5px solid #86EFAC", borderRadius:"12px", padding:"12px 16px", fontSize:"0.8rem", color:"#166534", display:"flex", gap:"10px", alignItems:"center", marginBottom:"4px" }}>
        <span style={{ fontSize:"1.1rem" }}>✅</span>
        <span>All books below are <strong>100% free</strong> — click "Read →" to open them online instantly!</span>
      </div>
      <div className="pf-ebook-list">
        {EBOOKS.map((b, i) => (
          <div key={i} className="pf-ebook-item">
            <div className="pf-ebook-cover">{b.icon}</div>
            <div className="pf-ebook-info">
              <div className="pf-ebook-title">{b.title}</div>
              <div className="pf-ebook-author">by {b.author}</div>
              <div className="pf-ebook-pages">📄 {b.pages} pages · <span style={{ background:"#DCFCE7", color:"#166534", fontSize:"0.62rem", fontWeight:700, padding:"2px 6px", borderRadius:20 }}>{b.tag}</span></div>
            </div>
            <a href={b.url} target="_blank" rel="noreferrer"
              style={{ background:"#0D9488", color:"#fff", border:"none", padding:"8px 14px", borderRadius:8, fontSize:"0.72rem", fontWeight:700, textDecoration:"none", flexShrink:0, display:"inline-flex", alignItems:"center", gap:4 }}>
              Read →
            </a>
          </div>
        ))}
      </div>
    </>
  );
}


/* ─── VIEW: MY PROFILE ───────────────────────────────────────── */
function ProfileInfoView({ user, enrolledCourses }) {
  const [editMode, setEditMode]   = React.useState(false);
  const [saved,    setSaved]      = React.useState(false);
  const [fields,   setFields]     = React.useState({
    bio:      "",
    location: "",
    website:  "",
    phone:    "",
  });
  const [draft, setDraft] = React.useState({ ...fields });

  const handleSave = () => {
    setFields({ ...draft });
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const handleCancel = () => { setDraft({ ...fields }); setEditMode(false); };

  const Row = ({ label, value, icon }) => (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", padding:"12px 0",
      borderBottom:"1px solid #F1F5F9" }}>
      <div style={{ width:32, height:32, borderRadius:8, background:"#F2F6FF",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"0.9rem", flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:"0.68rem", color:"#94A3B8", fontWeight:600,
          textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>{label}</div>
        <div style={{ fontSize:"0.88rem", color:"#1A1F36", fontWeight:500 }}>{value || "—"}</div>
      </div>
    </div>
  );

  const EditField = ({ label, icon, field, placeholder, type="text" }) => (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", padding:"12px 0",
      borderBottom:"1px solid #F1F5F9" }}>
      <div style={{ width:32, height:32, borderRadius:8, background:"#F2F6FF",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"0.9rem", flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:"0.68rem", color:"#94A3B8", fontWeight:600,
          textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{label}</div>
        {editMode ? (
          <input
            type={type}
            value={draft[field]}
            placeholder={placeholder}
            onChange={e => setDraft(p => ({ ...p, [field]: e.target.value }))}
            style={{ width:"100%", border:"1.5px solid #0D9488", borderRadius:8,
              padding:"7px 10px", fontSize:"0.85rem", fontFamily:"inherit",
              color:"#1A1F36", outline:"none", background:"#F9FFFE" }}
          />
        ) : (
          <div style={{ fontSize:"0.88rem", color: fields[field] ? "#1A1F36" : "#CBD5E1",
            fontWeight: fields[field] ? 500 : 400 }}>
            {fields[field] || placeholder}
          </div>
        )}
      </div>
    </div>
  );

  const memberSince = user?.updated_at
    ? new Date(user.updated_at).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })
    : "—";

  return (
    <>
      {/* Page header */}
      <div className="pf-page-hd" style={{ background:"linear-gradient(120deg,#1A1F36,#312E81)" }}>
        <div className="pf-page-hd-title">👤 My Profile</div>
        <div className="pf-page-hd-sub">View and manage your personal account information</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:"16px", alignItems:"start" }}>

        {/* ── LEFT: Avatar card */}
        <div style={{ background:"#fff", border:"1.5px solid #E8EDF8", borderRadius:"16px",
          padding:"1.5rem", textAlign:"center", display:"flex", flexDirection:"column",
          alignItems:"center", gap:"12px" }}>
          {user?.picture
            ? <img src={user.picture} alt={user.name}
                style={{ width:88, height:88, borderRadius:"50%",
                  border:"3px solid #0D9488", objectFit:"cover" }} />
            : <div style={{ width:88, height:88, borderRadius:"50%",
                background:"linear-gradient(135deg,#0D9488,#0EA5E9)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#fff", fontWeight:700, fontSize:"2rem",
                border:"3px solid #0D9488" }}>
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
          }
          <div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1rem",
              fontWeight:700, color:"#1A1F36" }}>{user?.name}</div>
          </div>


          {saved && (
            <div style={{ background:"#DCFCE7", color:"#166534", fontSize:"0.75rem",
              fontWeight:600, padding:"6px 14px", borderRadius:8, width:"100%" }}>
              ✓ Profile saved!
            </div>
          )}
        </div>

        {/* ── RIGHT: Info panels */}
        <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>

          {/* Account info (read-only from Auth0) */}
          <div style={{ background:"#fff", border:"1.5px solid #E8EDF8",
            borderRadius:"16px", padding:"1.25rem 1.5rem" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
              marginBottom:"0.25rem" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.9rem",
                fontWeight:700, color:"#1A1F36" }}>Account Information</div>
              <span style={{ fontSize:"0.65rem", background:"#F1F5F9", color:"#64748B",
                padding:"3px 8px", borderRadius:20, fontWeight:600 }}>Read-only</span>
            </div>
            <div style={{ fontSize:"0.72rem", color:"#94A3B8", marginBottom:"0.75rem" }}>
              Managed by your Auth0 account
            </div>
            <Row icon="✉️" label="Email Address" value={user?.email} />
            <Row icon="🪪" label="Full Name"      value={user?.name} />
            <Row icon="📅" label="Last Updated"   value={memberSince} />
          </div>

          {/* Editable extra info */}
          <div style={{ background:"#fff", border:"1.5px solid #E8EDF8",
            borderRadius:"16px", padding:"1.25rem 1.5rem" }}>
            <div style={{ display:"flex", alignItems:"center",
              justifyContent:"space-between", marginBottom:"0.75rem" }}>
              <div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.9rem",
                  fontWeight:700, color:"#1A1F36" }}>Personal Details</div>
                <div style={{ fontSize:"0.72rem", color:"#94A3B8", marginTop:2 }}>
                  {editMode ? "Editing — fill in your details below" : "Click Edit to update your info"}
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {editMode ? (
                  <>
                    <button onClick={handleSave} style={{ background:"#0D9488", color:"#fff",
                      border:"none", padding:"7px 16px", borderRadius:8, fontSize:"0.78rem",
                      fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                      Save
                    </button>
                    <button onClick={handleCancel} style={{ background:"#F1F5F9", color:"#475569",
                      border:"none", padding:"7px 14px", borderRadius:8, fontSize:"0.78rem",
                      fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => { setDraft({...fields}); setEditMode(true); }} style={{
                    background:"#F2F6FF", color:"#0D9488", border:"1.5px solid #0D9488",
                    padding:"7px 16px", borderRadius:8, fontSize:"0.78rem",
                    fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                    ✏️ Edit
                  </button>
                )}
              </div>
            </div>
            <EditField field="bio"      icon="📝" label="Bio"           placeholder="Tell us about yourself…" />
            <EditField field="location" icon="📍" label="Location"      placeholder="City, Country" />
            <EditField field="website"  icon="🌐" label="Website / Portfolio" placeholder="https://yoursite.com" />
            <EditField field="phone"    icon="📞" label="Phone Number"  placeholder="+91 00000 00000" type="tel" />
          </div>

          {/* Account actions */}
          <div style={{ background:"#fff", border:"1.5px solid #E8EDF8",
            borderRadius:"16px", padding:"1.25rem 1.5rem" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.9rem",
              fontWeight:700, color:"#1A1F36", marginBottom:"0.75rem" }}>Manage Account</div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <a href="https://manage.auth0.com/" target="_blank" rel="noreferrer"
                style={{ background:"#F2F6FF", color:"#1A1F36", border:"1.5px solid #E8EDF8",
                  padding:"9px 18px", borderRadius:9, fontSize:"0.78rem", fontWeight:600,
                  textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
                🔑 Change Password
              </a>
              <a href="https://manage.auth0.com/" target="_blank" rel="noreferrer"
                style={{ background:"#FEF9C3", color:"#854D0E", border:"1.5px solid #FDE68A",
                  padding:"9px 18px", borderRadius:9, fontSize:"0.78rem", fontWeight:600,
                  textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
                🔗 Connected Accounts
              </a>
              <a href="https://manage.auth0.com/" target="_blank" rel="noreferrer"
                style={{ background:"#FEE2E2", color:"#991B1B", border:"1.5px solid #FECACA",
                  padding:"9px 18px", borderRadius:9, fontSize:"0.78rem", fontWeight:600,
                  textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
                🗑️ Delete Account
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ─── VIEW: FEEDBACK ─────────────────────────────────────────── */

function FeedbackView() {
  return (
    <>
      <div className="pf-page-hd" style={{ background: "linear-gradient(120deg,#6366F1,#8B5CF6)" }}>
        <div className="pf-page-hd-title">📩 Feedback</div>
        <div className="pf-page-hd-sub">Help us improve OnLearny — share your thoughts!</div>
      </div>
      <Link to="/feedback" style={{ textDecoration: "none" }}>
        <div className="pf-empty" style={{ cursor: "pointer" }}>
          <div className="pf-empty-icon">💬</div>
          <div className="pf-empty-title">Share Your Feedback</div>
          <div className="pf-empty-sub">Tell us what you love, what could be better, and what features you'd like to see next.</div>
          <span className="pf-empty-cta">Go to Feedback Form →</span>
        </div>
      </Link>
    </>
  );
}

/* ─── VIEW: COURSE ACTIVITY ──────────────────────────────────── */
function ActivityPageView({ enrolledCourses, userProfile }) {
  return (
    <>
      <div className="pf-page-hd">
        <div className="pf-page-hd-title">📊 Course Activity</div>
        <div className="pf-page-hd-sub">Your monthly learning progress</div>
      </div>
      <CourseActivityChart enrolledCourses={enrolledCourses} userProfile={userProfile} />
    </>
  );
}

/* ─── MAIN PROFILE COMPONENT ─────────────────────────────────── */

export default function Profile() {
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [userProfile, setUserProfile] = React.useState(null);
  const [activeSb, setActiveSb] = useState("dashboard");

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = await getIdToken(getIdTokenClaims);
          const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const response = await axios.get(`${API_URL}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.user) setUserProfile(response.data.user);
        } catch (error) {
          console.error("Failed to fetch profile", error);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated, getIdTokenClaims]);

  const sbItems = [
    { id: "dashboard",  icon: "🏠", label: "Dashboard" },
    { id: "profile",    icon: "👤", label: "My Profile" },
    { id: "learning",   icon: "📚", label: "My Learning" },
    { id: "courses",    icon: "🎓", label: "All Courses" },
    { id: "quizzes",    icon: "🧠", label: "Quizzes" },
    { id: "ebooks",     icon: "📖", label: "E-Book Library" },
    { id: "activity",   icon: "📊", label: "Course Activity" },
    { id: "feedback",   icon: "📩", label: "Feedback" },
  ];


  const enrolledCourses = userProfile?.enrolledCourses || [];
  const certCount = enrolledCourses.filter((cId) => {
    const { pct } = getCourseProgress(userProfile, cId);
    return pct >= 100;
  }).length;

  const profilePct = (() => {
    let s = 0;
    if (user?.email) s += 30;
    if (user?.picture) s += 20;
    if (user?.name) s += 20;
    if (enrolledCourses.length > 0) s += 30;
    return s;
  })();

  const renderView = () => {
    switch (activeSb) {
      case "profile":   return <ProfileInfoView user={user} enrolledCourses={enrolledCourses} />;
      case "dashboard": return <DashboardView user={user} userProfile={userProfile} enrolledCourses={enrolledCourses} certCount={certCount} setActiveSb={setActiveSb} />;
      case "learning": return <MyLearningView userProfile={userProfile} enrolledCourses={enrolledCourses} setActiveSb={setActiveSb} />;
      case "courses": return <CoursesView enrolledCourses={enrolledCourses} />;
      case "quizzes":  return <QuizzesView />;
      case "ebooks":   return <EBooksView />;

      case "activity": return <ActivityPageView enrolledCourses={enrolledCourses} userProfile={userProfile} />;
      case "feedback": return <FeedbackView />;
      default: return <DashboardView user={user} userProfile={userProfile} enrolledCourses={enrolledCourses} certCount={certCount} setActiveSb={setActiveSb} />;
    }
  };

  if (isLoading) {
    return (<><Navbar /><div className="pf-spinner">Loading…</div><Footer /></>);
  }
  if (!isAuthenticated) {
    return (<><Navbar /><div className="pf-spinner" style={{ flexDirection: "column", gap: "1rem" }}><span>🔒</span><span style={{ fontSize: "1rem", color: "#64748B" }}>Please log in to view your profile.</span></div><Footer /></>);
  }

  return (
    <>
      <style>{DASHBOARD_CSS}</style>
      <Navbar />
      <div className="pf-app">
        <div className="pf-layout">
          {/* SIDEBAR */}
          <aside className="pf-sidebar">
            <div className="pf-sb-section">Menu</div>
            {sbItems.map((i) => (
              <button
                key={i.id}
                className={`pf-sb-item${activeSb === i.id ? " active" : ""}`}
                onClick={() => setActiveSb(i.id)}
              >
                <span className="pf-sb-icon">{i.icon}</span>
                {i.label}
                {i.badge && <span className="pf-sb-badge">{i.badge}</span>}
              </button>
            ))}

          </aside>

          {/* MAIN — renders the active view */}
          <main className="pf-main">
            {renderView()}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
