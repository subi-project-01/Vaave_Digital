import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BookOpen, Menu, X, ArrowRight, Star, Clock3, Users, PlayCircle, CheckCircle2, Mail, Phone, MapPin, Code2, Palette, BarChart3, Megaphone } from "lucide-react";
import "./styles.css";

const courses = [
  { id: 1, title: "Full Stack Web Development", category: "Development", level: "Beginner", duration: "12 weeks", lessons: 48, price: "₹2,499", rating: "4.9", icon: Code2, color: "blue", description: "Build modern websites with HTML, CSS, JavaScript and React.", overview: "Learn to design, build and launch responsive web applications from the ground up. Combine front-end development with practical project work.", topics: ["HTML5 and semantic structure", "CSS3, Flexbox and responsive layouts", "JavaScript fundamentals and DOM", "React components, props and state", "Working with APIs and Git"], skills: ["HTML", "CSS", "JavaScript", "React", "Responsive design", "Git"], outcomes: ["Create responsive multi-page websites", "Build interactive interfaces with React", "Connect an application to an API", "Organize and present a portfolio project"] },
  { id: 2, title: "UI/UX Design Essentials", category: "Design", level: "Beginner", duration: "6 weeks", lessons: 26, price: "₹1,799", rating: "4.8", icon: Palette, color: "pink", description: "Learn design principles, wireframing and user-friendly interfaces.", overview: "Understand how to create clear, attractive and accessible digital experiences by following a user-centred design process.", topics: ["Design principles and visual hierarchy", "Colour, typography and spacing", "User research and personas", "Wireframing and prototyping", "Usability testing and feedback"], skills: ["UI design", "UX fundamentals", "Wireframing", "Prototyping", "Figma concepts"], outcomes: ["Plan a user-centred design process", "Create wireframes and prototypes", "Apply consistent visual design", "Evaluate a design using usability principles"] },
  { id: 3, title: "Data Analytics with Python", category: "Data", level: "Intermediate", duration: "8 weeks", lessons: 34, price: "₹2,199", rating: "4.9", icon: BarChart3, color: "green", description: "Explore data, create visualizations and find useful insights.", overview: "Build a foundation in data analytics using Python. Learn to prepare datasets, explore patterns and communicate findings through visualizations.", topics: ["Python basics for analytics", "Data cleaning and preparation", "Pandas and NumPy fundamentals", "Exploratory data analysis", "Charts and data visualization"], skills: ["Python", "Pandas", "NumPy", "Data cleaning", "Data visualization"], outcomes: ["Load and prepare datasets", "Analyze data to identify patterns", "Create clear charts and visual reports", "Explain findings using data"] },
  { id: 4, title: "Digital Marketing Basics", category: "Business", level: "Beginner", duration: "5 weeks", lessons: 20, price: "₹1,499", rating: "4.7", icon: Megaphone, color: "orange", description: "Understand SEO, social media and content marketing.", overview: "Learn the foundations of digital marketing and how businesses use online channels to reach, engage and understand their audiences.", topics: ["Digital marketing fundamentals", "Search engine optimization (SEO)", "Social media strategy", "Content planning and creation", "Campaign metrics and analytics"], skills: ["SEO basics", "Social media marketing", "Content strategy", "Campaign planning", "Analytics"], outcomes: ["Identify suitable digital channels", "Plan a basic content calendar", "Understand SEO and social media practices", "Read key campaign performance metrics"] },
  { id: 5, title: "Java Programming", category: "Development", level: "Beginner", duration: "8 weeks", lessons: 32, price: "₹1,999", rating: "4.8", icon: Code2, color: "blue", description: "Start programming with Java, OOP and hands-on exercises.", overview: "Start writing Java programs and develop strong programming fundamentals through object-oriented concepts and guided coding practice.", topics: ["Java syntax, variables and data types", "Conditions, loops and methods", "Classes and objects", "Inheritance, polymorphism and encapsulation", "Arrays, collections and exception handling"], skills: ["Java", "Object-oriented programming", "Problem solving", "Collections", "Debugging"], outcomes: ["Write and run Java programs", "Apply core OOP principles", "Work with arrays and collections", "Solve beginner programming problems"] },
  { id: 6, title: "Advanced React", category: "Development", level: "Intermediate", duration: "7 weeks", lessons: 29, price: "₹2,299", rating: "4.9", icon: Code2, color: "blue", description: "Create reusable components and interactive React applications.", overview: "Move beyond the basics and build maintainable React applications using reusable components, modern hooks and common application patterns.", topics: ["Component composition and props", "State management and React hooks", "Forms and event handling", "Routing and API integration", "Performance and debugging"], skills: ["React", "JavaScript ES6+", "Hooks", "API integration", "Component design"], outcomes: ["Structure applications with reusable components", "Manage state with hooks", "Fetch and display API data", "Debug and improve React applications"] }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const filteredCourses = useMemo(() => courses.filter(course => {
    const matchesCategory = category === "All" || course.category === category;
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  }), [category, search]);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const whatsappNumber = "919876543210"; // Replace with your WhatsApp number (country code + number, digits only).
    const enquiry = [
      "Hello HARSHU Academy, I have an enquiry.",
      "",
      `Name: ${form.name.trim() || "Not provided"}`,
      `Email: ${form.email.trim() || "Not provided"}`,
      `Subject: ${form.subject.trim() || "Not provided"}`,
      `Message: ${form.message.trim() || "Not provided"}`
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiry)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const navItems = ["Home", "About", "Courses", "Contact"];
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark"><BookOpen size={22}/></span><span>HARSHU <b>Academy</b></span></a>
          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
          <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
            {navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
            <a className="nav-cta" href="#courses" onClick={closeMenu}>Explore courses <ArrowRight size={16}/></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-dot"/> LEARN. BUILD. GROW.</span>
              <h1>Build skills today.<br/><span>Shape your tomorrow.</span></h1>
              <p className="hero-text">Learn practical, career-ready skills from anywhere. Explore expert-led courses and take the next step toward your goals with HARSHU Academy.</p>
              <div className="hero-actions"><a className="btn btn-primary" href="#courses">Explore courses <ArrowRight size={18}/></a><a className="btn btn-light" href="#about"><PlayCircle size={18}/> Discover us</a></div>
              <div className="hero-proof"><div className="avatar-stack"><i>H</i><i>A</i><i>L</i><i>+</i></div><div><strong>Learn at your own pace</strong><small>Practical lessons. Real progress.</small></div></div>
            </div>
            <div className="hero-art">
              <div className="art-glow"/>
              <div className="learning-card main-learning-card"><div className="card-top"><span className="live-dot"/> YOUR LEARNING SPACE</div><div className="book-illustration"><div className="book-page"><span>H</span><small>HARSHU<br/>ACADEMY</small></div></div><h3>Knowledge opens doors.</h3><p>One lesson at a time.</p><div className="progress-label"><span>Your learning journey</span><b>75%</b></div><div className="progress-track"><span/></div></div>
              <div className="float-card float-top"><span className="float-icon"><Star size={17} fill="currentColor"/></span><div><b>4.9/5</b><small>Learner rating</small></div></div>
              <div className="float-card float-bottom"><span className="float-icon purple"><CheckCircle2 size={18}/></span><div><b>Learn something new</b><small>Every single day</small></div></div>
              <div className="decor decor-one"/><div className="decor decor-two"/>
            </div>
          </div>
          <div className="container stats-row"><div><strong>Expert-led</strong><span>Practical learning</span></div><div><strong>Flexible</strong><span>Learn on your schedule</span></div><div><strong>Hands-on</strong><span>Build real skills</span></div><div><strong>Beginner-friendly</strong><span>Start with confidence</span></div></div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-visual"><div className="about-orbit orbit-a"/><div className="about-orbit orbit-b"/><div className="about-center"><BookOpen size={54}/><span>Keep<br/>learning</span></div><div className="about-note note-one"><CheckCircle2 size={17}/> Learn by doing</div><div className="about-note note-two"><Star size={17}/> Grow with confidence</div></div>
            <div className="about-copy"><span className="eyebrow">ABOUT HARSHU ACADEMY</span><h2>Learning that moves <span>you forward.</span></h2><p>HARSHU Academy is a learning platform designed to make skill-building clear, practical and accessible. Whether you are starting from scratch or improving what you already know, we help you learn step by step.</p><div className="feature-list"><div><span><CheckCircle2/></span><div><b>Practical course content</b><small>Focus on concepts you can apply.</small></div></div><div><span><CheckCircle2/></span><div><b>Learn at your own pace</b><small>Fit learning into your schedule.</small></div></div><div><span><CheckCircle2/></span><div><b>Skills for your next step</b><small>Build confidence through practice.</small></div></div></div><a className="text-link" href="#courses">Find your course <ArrowRight size={17}/></a></div>
          </div>
        </section>

        <section className="section courses-section" id="courses">
          <div className="container">
            <div className="section-heading"><div><span className="eyebrow">FIND YOUR NEXT SKILL</span><h2>Explore our <span>courses.</span></h2><p>Choose a course that matches your interests and goals.</p></div><span className="course-count">{filteredCourses.length} courses available</span></div>
            <div className="course-tools"><div className="search-box"><span>⌕</span><input aria-label="Search courses" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..."/></div><div className="category-tabs">{["All", "Development", "Design", "Data", "Business"].map(item => <button key={item} className={category === item ? "category-tab active" : "category-tab"} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
            <div className="course-grid">
              {filteredCourses.map(course => { const Icon = course.icon; return <article className="course-card" key={course.id}><div className={`course-art ${course.color}`}><span className="course-category">{course.category}</span><Icon size={48}/><span className="art-caption">HARSHU ACADEMY</span></div><div className="course-content"><div className="course-meta"><span>{course.level}</span><span><Star size={14} fill="currentColor"/> {course.rating}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="course-details"><span><Clock3 size={15}/> {course.duration}</span><span><BookOpen size={15}/> {course.lessons} lessons</span></div><div className="course-footer"><strong>{course.price}</strong><button onClick={() => { setSelectedCourse(course); setShowCourseDetails(false); }}>View details <ArrowRight size={15}/></button></div></div></article>; })}
              {filteredCourses.length === 0 && <div className="empty-state"><BookOpen size={32}/><h3>No courses found</h3><p>Try another search or category.</p><button className="text-link" onClick={() => {setSearch("");setCategory("All");}}>Clear filters</button></div>}
            </div>
          </div>
        </section>

        <section className="cta-strip"><div className="container cta-inner"><div><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Ready to learn something new?</h2><p>Explore a course and take your first step today.</p></div><a className="btn btn-white" href="#courses">Browse courses <ArrowRight size={18}/></a></div></section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy"><span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span><h2>Let's start a <span>conversation.</span></h2><p>Have a question about a course or need help choosing where to begin? Send us a message and our team will get back to you soon.</p><div className="contact-info"><div><span><Mail/></span><div><b>Email us</b><small>hello@harshuacademy.com</small></div></div><div><span><Phone/></span><div><b>Call us</b><small>+91 98765 43210</small></div></div><div><span><MapPin/></span><div><b>Our learning community</b><small>Learn from wherever you are</small></div></div></div></div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate><h3>Send us a message</h3><p>All fields are optional. Your enquiry will open in WhatsApp so you can review and send it.</p><div className="form-row"><label>Full name<input value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Enter your name"/></label><label>Email address<input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label></div><label>Subject<input value={form.subject} onChange={e => setForm({...form,subject:e.target.value})} placeholder="What is this regarding?"/></label><label>Your message<textarea rows="5" value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Write your message here..."/></label><button className="btn btn-primary submit-btn" type="submit">Continue to WhatsApp <ArrowRight size={18}/></button><small className="form-note">WhatsApp will open with your enquiry pre-filled. Press Send in WhatsApp to submit it.</small></form>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark"><BookOpen size={22}/></span><span>HARSHU <b>Academy</b></span></a><p>Learn with purpose. Grow with confidence.</p><div className="footer-links">{navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} HARSHU Academy. All rights reserved.</span><a href="#home">Back to top ↑</a></div></footer>

      {selectedCourse && <div className="modal-backdrop" onClick={() => setSelectedCourse(null)}><div className="course-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setSelectedCourse(null)}><X/></button><span className="eyebrow">{selectedCourse.category} COURSE</span><h2 id="modal-title">{selectedCourse.title}</h2><p>{selectedCourse.description}</p><div className="modal-facts"><span><Clock3/> {selectedCourse.duration}</span><span><BookOpen/> {selectedCourse.lessons} lessons</span><span><Star/> {selectedCourse.rating} rating</span></div><div className="modal-price">{selectedCourse.price}</div>{showCourseDetails && <div className="course-expanded-details"><h3>Course overview</h3><p>{selectedCourse.overview}</p><h3>Topics covered</h3><ul>{selectedCourse.topics.map(topic => <li key={topic}>{topic}</li>)}</ul><h3>Skills you will build</h3><div className="skill-tags">{selectedCourse.skills.map(skill => <span key={skill}>{skill}</span>)}</div><h3>What you will learn</h3><ul>{selectedCourse.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul><p className="duration-note"><b>Duration:</b> {selectedCourse.duration} · <b>Lessons:</b> {selectedCourse.lessons}</p></div>}<button className="btn btn-primary" onClick={() => setShowCourseDetails(true)}>{showCourseDetails ? "Course details shown" : "I'm interested"} <ArrowRight size={18}/></button></div></div>}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App/>);
