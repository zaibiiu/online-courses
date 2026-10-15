import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import {
  ArrowRight, Award, BarChart3, BookMarked, BookOpen, Bot, BrainCircuit, Check,
  CheckCircle2, ChevronDown, ChevronRight, CirclePlay, Clock3, Eye, FileQuestion,
  GraduationCap, Headphones, Heart, LibraryBig, LockKeyhole, Menu, MessageCircle,
  MonitorPlay, Play, Quote, Search, ShieldCheck, Sparkles, Star, Target, Timer,
  Trophy, UserRound, UsersRound, X, Zap
} from 'lucide-react';

const asset = (name) => `${import.meta.env.BASE_URL}${name}`;

const courses = [
  { id: 'modern-web-development', title: 'Modern Web Development', category: 'Development', level: 'Beginner', lessons: 42, duration: '18h 30m', rating: 4.9, students: '2.8k', price: 49, instructor: 'Adeel Khan', color: '#6c63ff', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85', description: 'Build fast, responsive websites with HTML, CSS, JavaScript and React through practical, portfolio-ready projects.' },
  { id: 'ui-ux-design-mastery', title: 'UI/UX Design Mastery', category: 'Design', level: 'Intermediate', lessons: 35, duration: '14h 20m', rating: 4.8, students: '1.9k', price: 39, instructor: 'Sara Ahmed', color: '#ff8b5c', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=85', description: 'Turn ideas into elegant digital products using research, wireframes, design systems and modern prototyping.' },
  { id: 'digital-marketing', title: 'Digital Marketing Blueprint', category: 'Marketing', level: 'Beginner', lessons: 28, duration: '11h 45m', rating: 4.7, students: '3.4k', price: 29, instructor: 'Mariam Ali', color: '#12b886', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85', description: 'Plan, launch and measure campaigns across social, search, content and email with a hands-on strategy.' },
  { id: 'data-science-python', title: 'Data Science with Python', category: 'Data Science', level: 'Advanced', lessons: 48, duration: '21h 10m', rating: 4.9, students: '1.5k', price: 59, instructor: 'Hamza Siddiqui', color: '#207ee8', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85', description: 'Explore data, build predictive models and communicate insights using Python and industry-standard tools.' },
  { id: 'business-communication', title: 'Business Communication', category: 'Business', level: 'Beginner', lessons: 24, duration: '8h 15m', rating: 4.6, students: '980', price: 25, instructor: 'Noor Fatima', color: '#f4b740', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85', description: 'Communicate with clarity and confidence in meetings, presentations, emails and professional negotiations.' },
  { id: 'ai-for-everyone', title: 'AI for Everyone', category: 'Artificial Intelligence', level: 'Beginner', lessons: 30, duration: '12h 40m', rating: 4.8, students: '4.1k', price: 45, instructor: 'Usman Raza', color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85', description: 'Understand modern AI, practical prompting and responsible workflows without needing a technical background.' },
];

const books = [
  { title: 'Atomic Habits', author: 'James Clear', category: 'Self Growth', pages: 320, rating: 4.9, cover: 'linear-gradient(155deg,#f3eee2,#d8cdb8)', accent: '#d5b16d' },
  { title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Finance', pages: 256, rating: 4.8, cover: 'linear-gradient(155deg,#eef2f7,#b7c2cf)', accent: '#7f93a8' },
  { title: 'Deep Work', author: 'Cal Newport', category: 'Productivity', pages: 304, rating: 4.7, cover: 'linear-gradient(155deg,#edf2ee,#9fb6a4)', accent: '#66866f' },
  { title: 'Design of Everyday Things', author: 'Don Norman', category: 'Design', pages: 368, rating: 4.8, cover: 'linear-gradient(155deg,#fff2e8,#efb48c)', accent: '#d5773b' },
  { title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', pages: 464, rating: 4.9, cover: 'linear-gradient(155deg,#e9eff6,#8da4be)', accent: '#426381' },
  { title: 'Start With Why', author: 'Simon Sinek', category: 'Leadership', pages: 256, rating: 4.7, cover: 'linear-gradient(155deg,#f7eeee,#d5a1a0)', accent: '#ab5f5b' },
];

const blogs = [
  { slug: 'build-a-learning-routine', category: 'Study Skills', date: 'October 12, 2026', read: '6 min read', title: 'How to build a learning routine that actually lasts', excerpt: 'A practical system for turning ambitious goals into small, repeatable study habits.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=85' },
  { slug: 'skills-for-digital-careers', category: 'Career Growth', date: 'October 8, 2026', read: '5 min read', title: 'Six skills shaping modern digital careers', excerpt: 'A clear look at the technical and human capabilities employers increasingly value.', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85' },
  { slug: 'learn-smarter-with-ai', category: 'AI Learning', date: 'October 2, 2026', read: '7 min read', title: 'How to use AI as a tutor—not a shortcut', excerpt: 'Prompts and practices that make AI a thoughtful partner in deeper learning.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=85' },
  { slug: 'reading-for-retention', category: 'Digital Library', date: 'September 26, 2026', read: '4 min read', title: 'Read less, remember more: a simple retention method', excerpt: 'Make every chapter count with active recall, notes, and purposeful review.', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=85' },
  { slug: 'prepare-for-online-tests', category: 'Assessment', date: 'September 18, 2026', read: '5 min read', title: 'A calmer way to prepare for online tests', excerpt: 'Replace last-minute cramming with a focused preparation plan that builds confidence.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=85' },
  { slug: 'design-your-first-portfolio', category: 'Career Growth', date: 'September 10, 2026', read: '8 min read', title: 'Design your first skills-based portfolio', excerpt: 'Show what you can do through concise case studies, projects, and thoughtful storytelling.', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85' }
];

const categories = [
  { title: 'Development', text: 'Build websites, apps, and digital products.', icon: MonitorPlay, color: 'mint' },
  { title: 'Design', text: 'Create intuitive and memorable experiences.', icon: Sparkles, color: 'violet' },
  { title: 'Business', text: 'Lead, communicate, and grow with confidence.', icon: BarChart3, color: 'orange' },
  { title: 'Data & AI', text: 'Turn information into useful decisions.', icon: BrainCircuit, color: 'blue' }
];

const testSets = [
  { id: 'web-foundations', title: 'Web Development Foundations', category: 'Technology', questions: 10, duration: 15, difficulty: 'Beginner', color: 'purple', icon: MonitorPlay },
  { id: 'digital-marketing', title: 'Digital Marketing Essentials', category: 'Marketing', questions: 12, duration: 18, difficulty: 'Intermediate', color: 'green', icon: BarChart3 },
  { id: 'general-knowledge', title: 'General Knowledge Challenge', category: 'General', questions: 15, duration: 20, difficulty: 'Mixed', color: 'orange', icon: BrainCircuit },
  { id: 'business-english', title: 'Business English Assessment', category: 'Language', questions: 10, duration: 12, difficulty: 'Intermediate', color: 'blue', icon: MessageCircle },
];

const quizQuestions = [
  { question: 'Which language is primarily used to structure content on the web?', answers: ['CSS', 'HTML', 'Python', 'SQL'], correct: 1 },
  { question: 'What does CSS stand for?', answers: ['Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets', 'Content Styling Syntax'], correct: 2 },
  { question: 'Which React feature is used to manage component state?', answers: ['Routes', 'Hooks', 'Schemas', 'Selectors'], correct: 1 },
  { question: 'What is responsive design intended to improve?', answers: ['Database speed', 'Layouts across screen sizes', 'Server security', 'Search indexing only'], correct: 1 },
  { question: 'Which protocol is used for secure web browsing?', answers: ['FTP', 'SMTP', 'HTTP', 'HTTPS'], correct: 3 },
];

function App() {
  const [toast, setToast] = useState('');
  const notify = (message) => { setToast(message); window.clearTimeout(window.__globeToast); window.__globeToast = window.setTimeout(() => setToast(''), 2800); };
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home notify={notify} />} />
          <Route path="/login" element={<Auth mode="login" notify={notify} />} />
          <Route path="/signup" element={<Auth mode="signup" notify={notify} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      {toast && <div className="toast"><CheckCircle2 size={19} />{toast}</div>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ['Courses', '/courses'], ['Library', '/library'], ['AI Tutor', '/ai-learning'], ['Online Tests', '/tests'], ['Packages', '/packages'], ['Blog', '/blogs']
  ];
  return <>
    <div className="announcement"><Sparkles size={14} /> Admissions are open — start learning today <Link to="/packages">Explore packages <ArrowRight size={13}/></Link></div>
    <header className="header">
      <div className="container nav-wrap">
        <BrandLogo onClick={() => setOpen(false)} />
        <nav className={open ? 'main-nav open' : 'main-nav'}>
          {nav.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}
          <div className="mobile-auth"><Link to="/login" className="btn btn-ghost">Log in</Link><Link to="/signup" className="btn btn-primary">Get started</Link></div>
        </nav>
        <div className="nav-actions"><Link to="/login" className="login-link"><UserRound size={17}/> Log in</Link><Link to="/signup" className="btn btn-primary btn-sm">Get started <ArrowRight size={16}/></Link></div>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
      </div>
    </header>
  </>;
}

function Home({ notify }) {
  return <>
    <section className="hero">
      <div className="container market-hero">
        <div className="market-heading"><h1>Learn Without Limits</h1><p>Your Online Learning Hub Awaits!</p></div>
        <div className="market-grid">
          <Link to="/courses" className="market-service course-service"><span className="service-check"><Check/></span><MonitorPlay/><h3>ONLINE COURSES</h3><p>Learn practical skills through expert-led video lessons.</p><b>Explore Courses <ArrowRight/></b></Link>
          <div className="market-search-card">
            <div className="market-tabs"><button className="active">All</button><button>Courses</button><button>Books</button></div>
            <div className="search-location"><GraduationCap/> Learn anywhere, anytime</div>
            <div className="market-fields"><label><span><Search/> SKILL / TOPIC</span><input placeholder="What do you want to learn?"/></label><label><span><BarChart3/> LEVEL</span><select><option>All Levels</option><option>Beginner</option><option>Intermediate</option></select></label><label><span><Award/> ACCESS</span><select><option>All Packages</option><option>Free</option><option>Premium</option></select></label></div>
            <button className="market-search-btn" onClick={() => notify('Course search is ready for backend connection')}><Search/> Find Learning</button>
          </div>
          <Link to="/library" className="market-service library-service"><span className="service-check"><BookMarked/></span><LibraryBig/><h3>DIGITAL LIBRARY</h3><p>Browse important books and read wherever you are.</p><b>Browse Library <ArrowRight/></b></Link>
        </div>
      </div>
    </section>

    <section className="feature-strip"><div className="container feature-grid">
      <Feature icon={MonitorPlay} title="Expert-led courses" text="Practical video learning"/>
      <Feature icon={LibraryBig} title="Digital library" text="Knowledge at your fingertips"/>
      <Feature icon={Bot} title="AI learning partner" text="Help whenever you need it"/>
      <Feature icon={Trophy} title="Skill assessments" text="Test and prove your growth"/>
    </div></section>

    <section className="section category-section"><div className="container">
      <SectionHead eyebrow="Explore by category" title="A path for every ambition" text="Choose a direction, discover the right learning material, and build skills through clear next steps." link="/courses" />
      <div className="category-grid">{categories.map(({title,text,icon:Icon,color})=><Link to="/courses" className={`category-card ${color}`} key={title}><span><Icon/></span><div><h3>{title}</h3><p>{text}</p></div><ArrowRight/></Link>)}</div>
    </div></section>

    <section className="section"><div className="container">
      <SectionHead eyebrow="Popular learning" title="Skills that move you forward" text="Focused learning paths designed for real progress—at your pace, on any device." link="/courses" />
      <div className="course-grid">{courses.slice(0,3).map(c => <CourseCard key={c.id} course={c}/>)}</div>
    </div></section>

    <section className="section soft-section"><div className="container ai-split">
      <div className="ai-demo">
        <div className="mini-window"><div className="window-top"><span className="window-bot"><Bot/> Globe AI Tutor</span><span className="online-dot">Online</span></div><div className="chat-body"><div className="bot-message"><Sparkles size={16}/><p>Hi! What would you like to understand today?</p></div><div className="user-message">Explain the difference between UI and UX simply.</div><div className="bot-message"><Sparkles size={16}/><p><strong>UI</strong> is what a product looks like. <strong>UX</strong> is how it feels to use. Think of UI as the room's décor and UX as how easy it is to move through it.</p></div></div><div className="chat-input"><span>Ask a learning question...</span><ArrowRight/></div></div>
      </div>
      <div className="ai-copy"><div className="section-kicker"><Sparkles size={16}/> AI-powered learning</div><h2>Your personal tutor,<br/>available 24/7</h2><p>Get clear explanations, turn complex topics into quick summaries, and generate practice questions whenever you need them.</p><ul className="check-list"><li><Check/> Instant, easy-to-follow explanations</li><li><Check/> Personalized practice and study plans</li><li><Check/> Support across all learning topics</li></ul><Link to="/ai-learning" className="btn btn-dark">Meet your AI tutor <ArrowRight size={17}/></Link></div>
    </div></section>

    <section className="section"><div className="container">
      <SectionHead eyebrow="Digital library" title="Read. Reflect. Grow." text="A curated shelf of timeless books and practical resources for curious minds." link="/library" />
      <div className="book-row">{books.slice(0,5).map((b,i)=><BookCard key={b.title} book={b} index={i}/>)}</div>
    </div></section>

    <section className="section test-promo-section"><div className="container test-promo">
      <div><span className="section-kicker light"><Target size={16}/> Test your knowledge</span><h2>Know where you stand.<br/>Grow from there.</h2><p>Take focused MCQ assessments, see your score instantly, and discover the next skill to strengthen.</p><Link to="/tests" className="btn btn-accent">Browse online tests <ArrowRight size={17}/></Link></div>
      <div className="score-card"><div className="score-top"><span>Web Development</span><small>Result</small></div><div className="score-circle"><strong>86</strong><span>/ 100</span></div><h3>Excellent work!</h3><p>You’re in the top 12% of learners</p><div className="score-stats"><span><b>13</b> Correct</span><span><b>2</b> Incorrect</span><span><b>12:08</b> Time</span></div></div>
    </div></section>

    <section className="impact-strip"><div className="container impact-grid"><div><strong>6</strong><span>career-ready courses</span></div><div><strong>4</strong><span>learning experiences</span></div><div><strong>24/7</strong><span>AI study support</span></div><div><strong>100%</strong><span>responsive learning</span></div></div></section>

    <section className="section"><div className="container">
      <SectionHead eyebrow="Learning journal" title="Ideas for smarter learning" text="Practical guidance for building skills, staying consistent, and getting more from every study session." link="/blogs" />
      <div className="blog-grid home-blogs">{blogs.slice(0,3).map(blog=><BlogCard key={blog.slug} blog={blog}/>)}</div>
    </div></section>

    <section className="section"><div className="container"><div className="testimonial">
      <Quote className="quote-icon"/><div className="quote-stars">★★★★★</div><blockquote>“GlobeLearn gives me everything in one place. The courses are clear, the library is genuinely useful, and the AI tutor makes difficult concepts feel simple.”</blockquote><div className="quote-author"><div className="author-avatar">HM</div><div><strong>Hira Malik</strong><span>Product Design Learner</span></div></div>
    </div></div></section>

    <section className="container final-cta"><div><span>Start your learning journey</span><h2>Build the future you imagine.</h2><p>Join a growing community of learners turning curiosity into capability.</p></div><div><Link to="/signup" className="btn btn-accent btn-lg">Create free account <ArrowRight size={19}/></Link><small>No credit card required</small></div></section>
  </>;
}

function Feature({ icon: Icon, title, text }) { return <div className="feature"><span><Icon/></span><div><strong>{title}</strong><small>{text}</small></div></div>; }
function SectionHead({ eyebrow, title, text, link }) { return <div className="section-head"><div><span className="section-kicker">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>{link && <Link to={link} className="text-link">View all <ArrowRight size={16}/></Link>}</div>; }

function CourseCard({ course }) {
  return <article className="course-card"><Link to={`/courses/${course.id}`} className="course-image"><img src={course.image} alt=""/><span className="course-level">{course.level}</span><button aria-label="Save course"><Heart/></button></Link><div className="course-body"><div className="course-category" style={{color:course.color}}>{course.category}</div><Link to={`/courses/${course.id}`}><h3>{course.title}</h3></Link><p className="instructor">by {course.instructor}</p><div className="course-meta"><span><Star size={15} fill="currentColor"/> {course.rating}</span><span><CirclePlay size={15}/> {course.lessons} lessons</span><span><Clock3 size={15}/> {course.duration}</span></div><div className="course-bottom"><strong>${course.price}<small> / course</small></strong><Link to={`/courses/${course.id}`}>View course <ChevronRight size={15}/></Link></div></div></article>;
}

function Courses() {
  const [query,setQuery] = useState(''); const [category,setCategory] = useState('All');
  const filtered = courses.filter(c => (category==='All'||c.category===category) && `${c.title} ${c.instructor} ${c.category}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHero kicker="Explore courses" title="Find your next breakthrough" text="Career-ready courses created to help you build valuable skills, one lesson at a time." />
    <section className="section compact"><div className="container"><div className="filter-bar"><div className="search-field"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search courses, skills, instructors..."/></div><div className="select-wrap"><select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{[...new Set(courses.map(c=>c.category))].map(x=><option key={x}>{x}</option>)}</select><ChevronDown/></div></div><div className="results-line"><strong>{filtered.length} courses</strong><span>Hand-picked learning for every ambition</span></div><div className="course-grid course-grid-full">{filtered.map(c=><CourseCard key={c.id} course={c}/>)}</div>{filtered.length===0&&<Empty text="No courses match your search."/>}</div></section>
  </>;
}

function CourseDetail({ notify }) {
  const { courseId } = useParams(); const course = courses.find(c=>c.id===courseId)||courses[0];
  const lessons=['Welcome and course roadmap','Foundations and core concepts','Tools, setup and first project','Designing a real-world solution','Testing and improving your work','Final project and next steps'];
  return <><section className="course-detail-hero"><div className="container detail-grid"><div><div className="breadcrumb"><Link to="/courses">Courses</Link><ChevronRight/> {course.category}</div><span className="detail-badge">Bestseller · {course.level}</span><h1>{course.title}</h1><p>{course.description}</p><div className="detail-rating"><span><Star fill="currentColor"/> {course.rating}</span><span>({course.students} learners)</span><span>Created by <b>{course.instructor}</b></span></div><div className="detail-meta"><span><Clock3/> {course.duration}</span><span><MonitorPlay/> {course.lessons} lessons</span><span><Award/> Certificate included</span></div></div><div className="video-card"><div className="video-cover"><img src={course.image} alt=""/><button onClick={()=>notify('Preview player opened')}><Play fill="currentColor"/></button><span>Preview this course</span></div><div className="video-card-body"><div className="price-line"><strong>${course.price}</strong><span>$79</span><em>Save 38%</em></div><button className="btn btn-accent btn-block" onClick={()=>notify('Course added to your learning plan')}>Enroll now</button><Link className="btn btn-outline btn-block" to="/packages">View membership packages</Link><small>30-day satisfaction guarantee</small></div></div></div></section>
    <section className="section compact"><div className="container content-grid"><div><div className="learn-box"><h2>What you’ll learn</h2><div className="learn-grid">{['Understand the essential concepts with clarity','Build practical projects from scratch','Use a reliable professional workflow','Apply skills to real-world scenarios','Avoid common beginner mistakes','Create a portfolio-ready final project'].map(x=><span key={x}><Check/>{x}</span>)}</div></div><div className="curriculum"><div className="curriculum-head"><div><span className="section-kicker">Course curriculum</span><h2>Your learning roadmap</h2></div><span>{course.lessons} lessons · {course.duration}</span></div>{lessons.map((l,i)=><div className="lesson-row" key={l}><span className="lesson-number">{String(i+1).padStart(2,'0')}</span><CirclePlay/><div><strong>{l}</strong><small>{i===0?'Free preview':`${9+i*3} min`}</small></div>{i>1&&<LockKeyhole/>}</div>)}</div></div><aside className="instructor-card"><span className="section-kicker">Your instructor</span><div className="instructor-info"><div>{course.instructor.split(' ').map(x=>x[0]).join('')}</div><h3>{course.instructor}</h3><p>Industry practitioner & educator</p></div><div className="instructor-stats"><span><Star/> 4.9 rating</span><span><UsersRound/> 12k students</span><span><CirclePlay/> 8 courses</span></div><p>Clear explanations, practical exercises, and focused feedback designed to help every learner progress with confidence.</p></aside></div></section>
  </>;
}

function Library({ notify }) {
  const [query,setQuery]=useState(''); const [category,setCategory]=useState('All'); const [reader,setReader]=useState(null);
  const filtered=books.filter(b=>(category==='All'||b.category===category)&&`${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHero kicker="Digital library" title="A library that travels with you" text="Browse essential books, discover powerful ideas, and make reading part of your daily growth." dark image="https://images.unsplash.com/photo-1549762729-e93a4530c32b?auto=format&fit=crop&w=1400&q=85"/>
    <section className="section compact"><div className="container"><div className="filter-bar"><div className="search-field"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by title or author..."/></div><div className="category-pills">{['All','Self Growth','Finance','Productivity','Design','Technology'].map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}</button>)}</div></div><div className="library-grid">{filtered.map((b,i)=><div key={b.title} className="library-item"><BookCard book={b} index={i}/><div className="library-actions"><button className="btn btn-dark btn-block" onClick={()=>setReader(b)}><BookOpen/> Read book</button><button onClick={()=>notify('Saved to your reading list')} aria-label="Save book"><BookMarked/></button></div></div>)}</div></div></section>
    {reader&&<div className="modal-backdrop" onClick={()=>setReader(null)}><div className="reader-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setReader(null)}><X/></button><span className="section-kicker">Reader preview</span><h2>{reader.title}</h2><p className="reader-author">by {reader.author}</p><div className="reader-page"><h3>Chapter One</h3><p>Great books begin with a question that changes the way we see familiar things. This interactive reader is a frontend preview designed for connection to the project’s future book content API.</p><p>Reading controls, progress tracking, bookmarks, themes, and full-text access can be connected when the backend content system is ready.</p><blockquote>Small ideas, practiced consistently, can create remarkable change.</blockquote></div><div className="reader-controls"><span>Page 1 of {reader.pages}</span><div><button disabled>Previous</button><button onClick={()=>notify('Next page ready for backend content')}>Next page</button></div></div></div></div>}
  </>;
}

function BookCard({book,index}) { return <div className="book-card"><div className="book-cover" style={{background:book.cover, '--accent':book.accent}}><span className="book-spine"/><small>{book.category}</small><strong>{book.title}</strong><em>{book.author}</em><span className="book-number">0{index+1}</span></div><h3>{book.title}</h3><p>{book.author}</p><div><span><Star size={14} fill="currentColor"/> {book.rating}</span><span>{book.pages} pages</span></div></div>; }

function AITutor() {
  const starter=[{role:'bot',text:'Hello! I’m your AI learning partner. Ask me to explain a topic, summarize an idea, or quiz you on something you’re studying.'}];
  const [messages,setMessages]=useState(starter); const [input,setInput]=useState(''); const [thinking,setThinking]=useState(false);
  const replies=[
    'Great question. Let’s break it into three simple parts: the core idea, a practical example, and one quick way to remember it.',
    'Here is a learner-friendly explanation: start with the basic concept, connect it to something familiar, then practice it with a small example.',
    'I can help with that. Think of the topic as a system: inputs go in, a process happens, and a useful result comes out. Which part should we explore first?'
  ];
  const send=(text=input)=>{ if(!text.trim())return; setMessages(m=>[...m,{role:'user',text}]); setInput(''); setThinking(true); setTimeout(()=>{setMessages(m=>[...m,{role:'bot',text:replies[Math.floor(Math.random()*replies.length)]}]);setThinking(false)},700); };
  return <><PageHero kicker="AI-based e-learning" title="Curiosity in. Clarity out." text="Your always-available learning partner for explanations, summaries, practice, and smarter study sessions." />
    <section className="section compact"><div className="container ai-page-grid"><aside className="ai-sidebar"><div className="ai-avatar"><Bot/></div><h2>Globe AI Tutor</h2><p>Powered by a free AI model integration-ready frontend.</p><div className="ai-status"><span/> Online and ready</div><h4>Try asking</h4>{['Explain photosynthesis simply','Quiz me on JavaScript basics','Create a 5-day study plan','Summarize the Pomodoro method'].map(x=><button key={x} onClick={()=>send(x)}>{x}<ChevronRight/></button>)}<div className="safe-note"><ShieldCheck/><p><strong>Learn responsibly</strong><br/>Always verify important academic facts with trusted sources.</p></div></aside><div className="ai-chat-panel"><div className="ai-chat-head"><div><strong>New learning session</strong><span>AI responses are for learning support</span></div><button onClick={()=>setMessages(starter)}>Clear chat</button></div><div className="ai-messages">{messages.map((m,i)=><div key={i} className={`ai-message ${m.role}`}><div>{m.role==='bot'?<Bot/>:<UserRound/>}</div><p>{m.text}</p></div>)}{thinking&&<div className="ai-message bot"><div><Bot/></div><p className="typing"><i/><i/><i/></p></div>}</div><div className="suggestion-chips"><button onClick={()=>send('Give me an example')}>Give me an example</button><button onClick={()=>send('Make it simpler')}>Make it simpler</button><button onClick={()=>send('Quiz me')}>Quiz me</button></div><form className="ai-composer" onSubmit={e=>{e.preventDefault();send()}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask anything you want to learn..."/><button><ArrowRight/></button></form></div></div></section>
  </>;
}

function Tests() {
  return <><PageHero kicker="Online test system" title="Challenge what you know" text="Focused MCQ tests with instant results—so you can measure progress and decide what to learn next." />
    <section className="section compact"><div className="container"><div className="test-summary"><div><Trophy/><strong>12,000+</strong><span>tests completed</span></div><div><Target/><strong>82%</strong><span>average score</span></div><div><Award/><strong>45+</strong><span>skill assessments</span></div></div><div className="section-head small"><div><span className="section-kicker">Featured assessments</span><h2>Pick a challenge</h2></div></div><div className="test-grid">{testSets.map(t=><TestCard key={t.id} test={t}/>)}</div><div className="how-tests"><h2>How it works</h2><div><span><b>1</b><strong>Choose a test</strong><small>Pick a topic and difficulty level.</small></span><i/><span><b>2</b><strong>Answer the MCQs</strong><small>Work through timed questions.</small></span><i/><span><b>3</b><strong>See your result</strong><small>Get an instant score and review.</small></span></div></div></div></section>
  </>;
}

function TestCard({test}) { const Icon=test.icon; return <article className={`test-card ${test.color}`}><div className="test-icon"><Icon/></div><span className="difficulty">{test.difficulty}</span><p>{test.category}</p><h3>{test.title}</h3><div className="test-meta"><span><FileQuestion/> {test.questions} questions</span><span><Timer/> {test.duration} minutes</span></div><Link to={`/tests/${test.id}`} className="btn btn-outline btn-block">Start assessment <ArrowRight/></Link></article>; }

function TestRunner() {
  const { testId }=useParams(); const test=testSets.find(t=>t.id===testId)||testSets[0]; const navigate=useNavigate();
  const [index,setIndex]=useState(0); const [answers,setAnswers]=useState({}); const [done,setDone]=useState(false); const current=quizQuestions[index];
  const score=quizQuestions.reduce((s,q,i)=>s+(answers[i]===q.correct?1:0),0);
  if(done)return <section className="result-page"><div className="result-panel"><div className="confetti">✦ · ✦ · ✦</div><span className="result-icon"><Trophy/></span><span className="section-kicker">Assessment complete</span><h1>{score>=4?'Excellent work!':score>=3?'Good progress!':'Keep learning!'}</h1><div className="result-score"><strong>{score*20}</strong><span>/ 100</span></div><p>You answered {score} of {quizQuestions.length} questions correctly.</p><div className="result-breakdown"><span><b>{score}</b>Correct</span><span><b>{quizQuestions.length-score}</b>Incorrect</span><span><b>04:32</b>Time</span></div><div className="result-actions"><button className="btn btn-dark" onClick={()=>{setIndex(0);setAnswers({});setDone(false)}}>Try again</button><button className="btn btn-outline" onClick={()=>navigate('/tests')}>All tests</button></div></div></section>;
  return <section className="quiz-page"><div className="container"><div className="quiz-top"><Link to="/tests"><X/></Link><div><strong>{test.title}</strong><span>Question {index+1} of {quizQuestions.length}</span></div><div className="quiz-timer"><Timer/> 14:32</div></div><div className="quiz-progress"><span style={{width:`${((index+1)/quizQuestions.length)*100}%`}}/></div><div className="quiz-card"><span className="section-kicker">Question {String(index+1).padStart(2,'0')}</span><h1>{current.question}</h1><div className="answers">{current.answers.map((a,i)=><button key={a} className={answers[index]===i?'selected':''} onClick={()=>setAnswers({...answers,[index]:i})}><b>{String.fromCharCode(65+i)}</b><span>{a}</span>{answers[index]===i&&<CheckCircle2/>}</button>)}</div><div className="quiz-actions"><button disabled={index===0} onClick={()=>setIndex(index-1)}>Previous</button><button className="btn btn-dark" disabled={answers[index]===undefined} onClick={()=>index===quizQuestions.length-1?setDone(true):setIndex(index+1)}>{index===quizQuestions.length-1?'Submit test':'Next question'} <ArrowRight/></button></div></div></div></section>;
}

function Packages({notify}) {
  const plans=[
    {name:'Starter',price:'0',tag:'Explore for free',features:['Selected free lessons','5 library previews','3 practice tests monthly','Basic AI tutor access'],button:'Start free',style:'light'},
    {name:'Scholar',price:'19',tag:'Most popular',features:['All video courses','Full digital library','Unlimited assessments','Unlimited AI tutor','Certificates of completion','Progress dashboard'],button:'Choose Scholar',style:'featured'},
    {name:'Professional',price:'39',tag:'Go further',features:['Everything in Scholar','Premium career courses','Downloadable resources','Priority learning support','Advanced skill reports','GlobeP2P account link'],button:'Go Professional',style:'dark'}
  ];
  return <><PageHero kicker="Simple membership" title="One package. A world of learning." text="Choose the access level that fits your goals. Upgrade, switch, or cancel whenever you need." />
    <section className="section compact"><div className="container"><div className="billing-note"><span>Monthly</span><b>Save 20% with annual billing</b></div><div className="pricing-grid">{plans.map(p=><article key={p.name} className={`price-card ${p.style}`}><span className="plan-tag">{p.tag}</span><h3>{p.name}</h3><div className="plan-price"><small>$</small><strong>{p.price}</strong><span>/ month</span></div><p>{p.name==='Starter'?'A simple way to discover the platform.':p.name==='Scholar'?'Complete access for committed learners.':'More support for career-focused growth.'}</p><button className={`btn btn-block ${p.style==='featured'?'btn-accent':p.style==='dark'?'btn-white':'btn-dark'}`} onClick={()=>notify(`${p.name} plan selected — checkout is ready for backend connection`)}>{p.button} <ArrowRight/></button><ul>{p.features.map(f=><li key={f}><Check/>{f}</li>)}</ul></article>)}</div><div className="package-faq"><div><span className="section-kicker">Common questions</span><h2>Everything you need to know</h2></div><div>{['Can I switch packages later?','Is there a student discount?','How does GlobeP2P login work?','Are course certificates included?'].map((q,i)=><details key={q} open={i===0}><summary>{q}<ChevronDown/></summary><p>{i===0?'Yes. You can upgrade or change your membership when your learning needs change. Billing and account services will be connected through the backend.':'This frontend is prepared for the related policy and backend flow once final business rules are provided.'}</p></details>)}</div></div></div></section>
  </>;
}

function Auth({mode,notify}) {
  const signup=mode==='signup'; const navigate=useNavigate(); const [showPass,setShowPass]=useState(false); const [form,setForm]=useState({name:'',email:'',password:'',agree:false});
  const submit=e=>{e.preventDefault(); if(signup&&!form.agree){notify('Please accept the terms to continue');return;} if(signup){localStorage.setItem('globelearn_demo_user',JSON.stringify({name:form.name,email:form.email}));notify('Account created — you can now log in');setTimeout(()=>navigate('/login'),700);return;} localStorage.setItem('globelearn_demo_session',JSON.stringify({email:form.email}));notify('Welcome back — login successful');setTimeout(()=>navigate('/'),700);};
  return <section className="auth-page"><div className="auth-visual"><Link to="/" className="brand light-brand"><span className="brand-mark"><GraduationCap/></span><span>Globe<span>Learn</span></span></Link><div><span className="section-kicker light">Learn without limits</span><h1>{signup?'Your next chapter starts here.':'Welcome back to your learning journey.'}</h1><p>Courses, books, AI support and assessments—all connected through one learner-friendly experience.</p><div className="auth-quote"><Quote/><p>Education is the most powerful investment you can make in yourself.</p></div></div><small>GlobeLearn · Connected with GlobeP2P</small></div><div className="auth-form-wrap"><div className="auth-form"><Link to="/" className="mobile-brand brand"><span className="brand-mark"><GraduationCap/></span><span>Globe<span>Learn</span></span></Link><span className="section-kicker">{signup?'Create your account':'Account login'}</span><h2>{signup?'Start learning for free':'Good to see you again'}</h2><p>{signup?'Already have an account?':'New to GlobeLearn?'} <Link to={signup?'/login':'/signup'}>{signup?'Log in':'Create an account'}</Link></p><button className="globe-login" onClick={()=>notify('GlobeP2P connection is ready for API integration')}><span>G</span> Continue with GlobeP2P</button><div className="or"><span>or use email</span></div><form onSubmit={submit}>{signup&&<label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter your full name"/></label>}<label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><label>Password<div className="password-input"><input required minLength="6" type={showPass?'text':'password'} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Enter your password"/><button type="button" onClick={()=>setShowPass(!showPass)}><Eye/></button></div></label>{signup?<label className="checkbox"><input type="checkbox" checked={form.agree} onChange={e=>setForm({...form,agree:e.target.checked})}/><span>I agree to the Terms of Service and Privacy Policy.</span></label>:<div className="form-help"><label className="checkbox"><input type="checkbox"/><span>Remember me</span></label><button type="button">Forgot password?</button></div>}<button className="btn btn-dark btn-block btn-lg">{signup?'Create my account':'Log in'} <ArrowRight/></button></form><small className="secure-line"><ShieldCheck/> Your information is encrypted and secure.</small></div></div></section>;
}

function BrandLogo({onClick}) { return <Link to="/" className="brand" onClick={onClick}><img className="brand-image" src={asset('logo-mark.svg')} alt=""/><span>Globe<span>Learn</span></span></Link>; }

function BlogCard({blog}) { return <article className="blog-card"><Link to={`/blogs/${blog.slug}`} className="blog-image"><img src={blog.image} alt=""/><span>{blog.category}</span></Link><div className="blog-body"><div className="blog-meta"><span>{blog.date}</span><i/> <span>{blog.read}</span></div><Link to={`/blogs/${blog.slug}`}><h3>{blog.title}</h3></Link><p>{blog.excerpt}</p><Link to={`/blogs/${blog.slug}`} className="text-link">Read article <ArrowRight size={15}/></Link></div></article>; }

function About() { return <><PageHero kicker="About GlobeLearn" title="Learning should feel clear, useful, and within reach" text="GlobeLearn brings courses, books, AI guidance, and assessments into one simple educational experience."/><section className="section"><div className="container about-story"><div><span className="section-kicker">Our purpose</span><h2>A connected home for curious learners</h2><p>Too often, learning is scattered across disconnected tools. GlobeLearn is designed as one focused place to watch practical lessons, read valuable books, ask better questions, and check your understanding.</p><p>This frontend concept is prepared for the GlobeP2P account connection and future backend services while keeping the learner journey simple from day one.</p><Link to="/courses" className="btn btn-dark">Explore learning <ArrowRight/></Link></div><div className="about-image"><img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=85" alt="Students learning together"/><span><GraduationCap/><strong>Learn anywhere</strong><small>Mobile, tablet, and desktop ready</small></span></div></div></section><section className="section soft-section"><div className="container"><SectionHead eyebrow="What guides us" title="Designed around real learning" text="Every part of the platform helps learners move from discovery to understanding and measurable progress."/><div className="value-grid"><div><Target/><h3>Practical first</h3><p>Focused content that connects knowledge to useful, real-world skills.</p></div><div><UsersRound/><h3>Easy to access</h3><p>A responsive experience that stays simple across every screen size.</p></div><div><Sparkles/><h3>Curiosity supported</h3><p>Courses, reading, AI help, and practice that work together naturally.</p></div></div></div></section></>; }

function Blogs() { const [query,setQuery]=useState(''); const shown=blogs.filter(b=>`${b.title} ${b.category} ${b.excerpt}`.toLowerCase().includes(query.toLowerCase())); return <><PageHero kicker="GlobeLearn journal" title="Learn better, one idea at a time" text="Guides, insights, and practical ideas for students, professionals, and lifelong learners."/><section className="section compact"><div className="container"><div className="journal-search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search learning articles..."/></div><div className="blog-grid">{shown.map(blog=><BlogCard key={blog.slug} blog={blog}/>)}</div>{!shown.length&&<Empty text="No articles match your search."/>}</div></section></>; }

function BlogDetail() { const {slug}=useParams(); const blog=blogs.find(b=>b.slug===slug); if(!blog)return <NotFound/>; return <article className="article-page"><div className="article-head container"><Link to="/blogs" className="text-link">← Back to journal</Link><span className="section-kicker">{blog.category}</span><h1>{blog.title}</h1><p>{blog.excerpt}</p><div className="blog-meta"><span>{blog.date}</span><i/><span>{blog.read}</span></div></div><div className="article-image container"><img src={blog.image} alt=""/></div><div className="article-content"><p className="lead">Meaningful progress rarely comes from one intense session. It comes from a clear direction, a realistic rhythm, and the confidence to keep returning to the work.</p><h2>Start with a result you can see</h2><p>Define what success looks like in practical terms. Instead of saying “learn design,” choose an outcome such as completing a mobile screen, explaining a core principle, or passing a short assessment.</p><h2>Make the next step small</h2><p>A good learning plan removes friction. Choose one lesson, one chapter, or one focused practice task. Small steps make it easier to begin and give you useful evidence of progress.</p><blockquote>Consistency becomes easier when the next action is clear.</blockquote><h2>Review, retrieve, and apply</h2><p>After a study session, close your notes and recall the central ideas. Then apply one idea in a project, question, or conversation. Retrieval and application turn passive exposure into durable understanding.</p><div className="article-cta"><h3>Ready to put the idea into practice?</h3><p>Explore a learning path and take the next clear step today.</p><Link to="/courses" className="btn btn-accent">Browse courses <ArrowRight/></Link></div></div></article>; }

function Contact({notify}) { const [form,setForm]=useState({name:'',email:'',subject:'',message:''}); const submit=e=>{e.preventDefault();notify('Thanks! Your message has been captured in this frontend demo.');setForm({name:'',email:'',subject:'',message:''});}; return <><PageHero kicker="Contact us" title="How can we help you learn?" text="Ask about courses, packages, the digital library, GlobeP2P access, or the future platform integration."/><section className="section"><div className="container contact-grid"><div className="contact-copy"><span className="section-kicker">Get in touch</span><h2>We’re here for your questions</h2><p>Send a message and the support workflow can be connected to email or a help desk when backend services are added.</p><div className="contact-method"><MessageCircle/><div><strong>General support</strong><span>support@globelearn.example</span></div></div><div className="contact-method"><Headphones/><div><strong>Learner help</strong><span>Monday–Saturday · 9:00–18:00</span></div></div><div className="contact-method"><Clock3/><div><strong>Response time</strong><span>Usually within one business day</span></div></div></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label></div><label>Subject<select required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}><option value="">Choose a topic</option><option>Courses and packages</option><option>Digital library</option><option>AI learning</option><option>Online tests</option><option>GlobeP2P account</option></select></label><label>Message<textarea required rows="6" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us how we can help..."/></label><button className="btn btn-dark btn-lg">Send message <ArrowRight/></button></form></div></section></>; }

function FAQ() { const groups=[['Learning and access',['How do I start a course?','Can I learn on mobile and tablet?','Are course certificates included?']],['Platform features',['How does the AI tutor work?','Can I read books inside the library?','How are online tests scored?']],['Account and billing',['Will my GlobeP2P account work here?','Can I change my package later?','Is there a free plan?']]]; return <><PageHero kicker="Help center" title="Questions, answered clearly" text="Quick information about learning, platform features, membership, and account access."/><section className="section compact"><div className="container faq-layout">{groups.map(([title,items])=><div className="faq-group" key={title}><h2>{title}</h2>{items.map((q,i)=><details key={q} open={i===0}><summary>{q}<ChevronDown/></summary><p>{q.includes('GlobeP2P')?'The login screen is prepared for GlobeP2P connection. The real authentication flow will be activated when backend API details are available.':q.includes('mobile')?'Yes. Every page is designed to work across mobile, tablet, laptop, and desktop screens.':'This frontend demonstrates the complete experience. Final access rules and stored data will be connected through the future backend.'}</p></details>)}</div>)}</div></section></>; }

function LegalPage({type}) { const privacy=type==='privacy'; return <><PageHero kicker="GlobeLearn policies" title={privacy?'Privacy policy':'Terms of service'} text="A clear placeholder policy page prepared for the client’s final legal content."/><section className="section compact"><div className="container legal-copy"><p className="lead">Last updated: October 15, 2026</p><h2>{privacy?'Information and privacy':'Using the platform'}</h2><p>{privacy?'This demo does not send form data to a server. When backend services are connected, the final policy should explain what account, learning, and usage information is collected and why.':'GlobeLearn is currently presented as a frontend prototype. Final account, payment, course access, and acceptable-use terms should be supplied before production launch.'}</p><h2>Account access</h2><p>The experience includes a planned GlobeP2P connection. Authentication, permissions, and account recovery will follow the policies of the connected production service.</p><h2>Questions</h2><p>Please use the contact page for questions about these placeholder terms or the future production service.</p><Link to="/contact" className="btn btn-dark">Contact us</Link></div></section></>; }

function PageHero({kicker,title,text,dark,image}) { return <section className={`page-hero ${dark?'page-hero-dark':''}`} style={image?{'--hero-bg':`url(${image})`}:{}}><div className="container"><span className="section-kicker light">{kicker}</span><h1>{title}</h1><p>{text}</p></div></section>; }
function Empty({text}) { return <div className="empty"><Search/><h3>{text}</h3><p>Try another keyword or category.</p></div>; }
function NotFound(){return <section className="not-found"><strong>404</strong><h1>This lesson is still being written.</h1><p>The page you requested could not be found.</p><Link to="/" className="btn btn-dark">Back to home</Link></section>}

function Footer(){return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><Link to="/" className="brand light-brand"><img className="brand-image" src={asset('logo-mark.svg')} alt=""/><span>Globe<span>Learn</span></span></Link><p>Learn practical skills, explore important ideas, and grow with confidence—wherever you are.</p><div className="footer-social"><span>f</span><span>in</span><span>▶</span><span>◎</span></div></div><div><h4>Learn</h4><Link to="/courses">All Courses</Link><Link to="/library">Digital Library</Link><Link to="/ai-learning">AI Learning</Link><Link to="/tests">Online Tests</Link></div><div><h4>Company</h4><Link to="/about">About Us</Link><Link to="/blogs">Learning Journal</Link><Link to="/contact">Contact</Link><Link to="/faq">Help Center</Link></div><div><h4>Stay curious</h4><p>Get learning ideas and new course alerts.</p><div className="subscribe"><input aria-label="Email address" placeholder="Email address"/><button aria-label="Subscribe"><ArrowRight/></button></div><small>No spam. Just useful learning.</small></div></div><div className="container footer-bottom"><span>© 2026 GlobeLearn. Frontend demonstration.</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/faq">Cookies</Link></div></div></footer>}

createRoot(document.getElementById('app')).render(<HashRouter><App/></HashRouter>);
