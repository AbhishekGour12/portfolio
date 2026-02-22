import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay, EffectCoverflow } from 'swiper/modules';
import { getDatabase, ref, get, set, push } from 'firebase/database';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Assets
import bg1 from '../Assets/user.webp';
import p1 from '../Assets/p1 (1).png';
import foody from '../Assets/p3 (1).png';
import cocoons from '../Assets/p2 (6).png';
import pdf from '../Assets/resume.pdf';
import { app, storage } from './Firebase';

// CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import { EffectCards,  EffectCube, EffectFlip } from 'swiper/modules';

// Add these CSS imports for the effects
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';

function Main({ Profile1 }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    img: ['', ''],
    link: '',
    github: ''
  });
  // Add this state for effect selection
const [selectedEffect, setSelectedEffect] = useState('cards');
  // Mouse parallax states
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  
  const navigate = useNavigate();
  const parallaxRefs = useRef([]);
  const trailRef = useRef([]); 


  // Initialize animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);


  // Initialize animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Fetch projects from Firebase
  const fetchProjects = async () => {
    try {
      const db = getDatabase(app);
      const projectsRef = ref(db, 'projects/');
      const snapshot = await get(projectsRef);
      
      if (snapshot.exists()) {
        const projectsData = Object.values(snapshot.val());
        // Merge with sample projects if needed
        if (projectsData.length === 0) {
          setProjects(sampleProjects);
        } else {
          setProjects(projectsData);
        }
      } else {
        console.log("No projects available, using sample projects");
        
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      
      setLoading(false);
    }
  };


  
// Helper function to get appropriate icon for each skill
const getSkillIcon = (iconName, skillName) => {
  switch (iconName) {
    case 'fa-html5':
      return <i className="fab fa-html5 text-xl text-orange-500"></i>;
    case 'fa-css3-alt':
      return <i className="fab fa-css3-alt text-xl text-blue-500"></i>;
    case 'fa-js':
      return <i className="fab fa-js-square text-xl text-yellow-500"></i>;
    case 'fa-react':
      return <i className="fab fa-react text-xl text-blue-400"></i>;
    case 'fa-node-js':
      return <i className="fab fa-node-js text-xl text-green-600"></i>;
    case 'fa-php':
      return <i className="fab fa-php text-xl text-purple-500"></i>;
    case 'fa-database':
      return <i className="fas fa-database text-xl text-blue-600"></i>;
    case 'nextjs':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
        </svg>
      );
    case 'typescript':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.429 0H.57A.571.571 0 0 0 0 .571V23.43c0 .314.255.569.571.569H23.43a.571.571 0 0 0 .569-.569V.57A.571.571 0 0 0 23.43 0zm-9.143 12.826h-2.857v8.304H9.143v-8.304H6.286v-1.973h8zm.64 8.304v-1.66c.492.64 1.26 1.092 2.334 1.092 1.026 0 1.834-.352 2.334-1.026.4-.534.534-1.238.534-2.016v-5.768h-2.048v5.768c0 .352-.188.534-.534.534-.358 0-.534-.17-.534-.534v-5.768h-2.048v6.25c0 .982-.08 1.574-.534 2.126-.456.56-1.134.84-2.048.84-.908 0-1.672-.28-2.188-.84h-.04l.306-1.64c.492.44 1.026.774 1.868.774.492 0 .84-.174.84-.64 0-.224-.062-.426-.174-.64-.112-.214-.28-.426-.494-.64-.64-.64-1.172-1.334-1.172-2.334 0-1.026.534-1.92 1.334-2.334.8-.414 1.774-.44 2.668-.174.492.134.908.426 1.214.84h.04v-.84h2.048v2.334c0 .534.174.84.534.84.358 0 .534-.306.534-.84v-2.334h2.048v4.268c0 1.334-.28 2.334-1.6 3.054-1.054.574-2.454.64-3.494.24-1.04-.4-1.774-1.172-2.048-2.188l1.84-.44c.174.534.64.84 1.334.84.64 0 1.026-.306 1.026-.84 0-.306-.134-.534-.374-.72-.24-.188-.534-.334-.88-.44-.64-.24-1.214-.534-1.64-1.026-.426-.492-.64-1.146-.64-1.92 0-1.334.64-2.334 1.92-2.748 1.28-.414 2.668-.24 3.494.64.826.88.84 2.188.84 3.054v4.978h2.048v-1.6h-.04z"/>
        </svg>
      );
    case 'fa-firebase':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.89 15.672L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z"/>
        </svg>
      );
    case 'fa-express':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.064 5.278z"/>
        </svg>
      );
    case 'fa-mysql':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.208 3.182l-.005.002c-1.098.326-2.264.482-3.448.483-1.183 0-2.349-.157-3.448-.483l-.005-.002C5.887 2.382 4.142 3.67 4.142 5.273v1.358c0 .948.553 1.784 1.405 2.187 1.097.526 2.41.79 3.722.79 1.312 0 2.625-.264 3.722-.79.852-.403 1.405-1.239 1.405-2.187V5.273c0-1.603-1.745-2.891-4.188-2.091zm-4.188 5.338c-1.312 0-2.625-.264-3.722-.79-.852-.403-1.405-1.239-1.405-2.187V4.225c0-.948.553-1.784 1.405-2.187 1.097-.526 2.41-.79 3.722-.79 1.312 0 2.625.264 3.722.79.852.403 1.405 1.239 1.405 2.187v1.318c0 .948-.553 1.784-1.405 2.187-1.097.526-2.41.79-3.722.79z"/>
          <path d="M16.208 8.546l-.005.002c-1.098.326-2.264.482-3.448.483-1.183 0-2.349-.157-3.448-.483l-.005-.002C5.887 7.746 4.142 9.034 4.142 10.637v1.358c0 .948.553 1.784 1.405 2.187 1.097.526 2.41.79 3.722.79 1.312 0 2.625-.264 3.722-.79.852-.403 1.405-1.239 1.405-2.187v-1.358c0-1.603-1.745-2.891-4.188-2.091zm-4.188 5.338c-1.312 0-2.625-.264-3.722-.79-.852-.403-1.405-1.239-1.405-2.187V9.589c0-.948.553-1.784 1.405-2.187 1.097-.526 2.41-.79 3.722-.79 1.312 0 2.625.264 3.722.79.852.403 1.405 1.239 1.405 2.187v1.318c0 .948-.553 1.784-1.405 2.187-1.097.526-2.41.79-3.722.79z"/>
          <path d="M16.208 13.91l-.005.002c-1.098.326-2.264.482-3.448.483-1.183 0-2.349-.157-3.448-.483l-.005-.002C5.887 13.11 4.142 14.398 4.142 16.001v1.358c0 .948.553 1.784 1.405 2.187 1.097.526 2.41.79 3.722.79 1.312 0 2.625-.264 3.722-.79.852-.403 1.405-1.239 1.405-2.187V16c0-1.603-1.745-2.891-4.188-2.091zm-4.188 5.338c-1.312 0-2.625-.264-3.722-.79-.852-.403-1.405-1.239-1.405-2.187v-1.318c0-.948.553-1.784 1.405-2.187 1.097-.526 2.41-.79 3.722-.79 1.312 0 2.625.264 3.722.79.852.403 1.405 1.239 1.405 2.187v1.318c0 .948-.553 1.784-1.405 2.187-1.097.526-2.41.79-3.722.79z"/>
        </svg>
      );
    case 'fa-materialui':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 2.475v10.39l3 1.733V7.67l6 3.465 6-3.465v3.465l-6 3.463v3.464l6 3.463 9-5.195V9.402l-3 1.733v3.463l-6 3.464-3-1.732 6-3.465V2.475L9 7.67 0 2.475zm24 0l-3 1.73V7.67l3-1.732V2.474z"/>
        </svg>
      );
    case 'fa-react-native':
      return <i className="fab fa-react text-xl text-blue-400"></i>;
    case 'supabase':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z"/>
        </svg>
      );
    case 'tailwind':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.761.189 1.305.738 1.907 1.346C13.188 11.179 14.023 12 16 12c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.761-.189-1.305-.738-1.907-1.346C14.812 6.821 13.977 6 12 6zm-5 6c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.761.189 1.305.738 1.907 1.346C8.188 17.179 9.023 18 11 18c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.761-.189-1.305-.738-1.907-1.346C9.812 12.821 8.977 12 7 12z"/>
        </svg>
      );
    case 'bootstrap':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.044c.413-1.162 1.352-2.213 3.921-2.213 1.956 0 3.2.871 3.2 2.813 0 1.713-.982 2.665-2.481 2.76v.067c1.771.07 2.88 1.125 2.88 2.813 0 2.211-1.738 3.086-4.127 3.086-2.722 0-3.6-1.144-4.012-2.533h1.62c.308.835 1.086 1.418 2.392 1.418 1.5 0 2.24-.768 2.24-1.753 0-1.035-.74-1.685-2.24-1.685h-.872v-1.559h.872c1.355 0 2.24-.665 2.24-1.652 0-.91-.64-1.598-2.032-1.598-1.207 0-1.92.61-2.19 1.406h-1.645z"/>
        </svg>
      );
    default:
      return <i className="fas fa-code text-xl text-orange-500"></i>;
  }
};
  useEffect(() => {
    fetchProjects();
  }, []);

  // Social icons data
  const socialIcons = [
    { icon: 'fa-github', link: 'https://github.com/AbhshekiCoder', color: Profile1 === 'black'?'text-orange-400': 'text-gray-800' },
    { icon: 'fa-linkedin', link: 'www.linkedin.com/in/abhishekgour12', color: Profile1 === "black"?'text-orange-400':'text-blue-600' },
    { icon: 'fa-facebook', link: '#', color: Profile1 === 'black'?'text-orange-400':'text-blue-700' },
    { icon: 'fa-instagram', link: 'https://www.instagram.com/devbyabhishek', color: Profile1 === 'black'?'text-orange-400':'text-pink-600' },
    { icon: 'fa-whatsapp', link: 'https://wa.link/c9zrjn', color: Profile1 === 'black'?'text-orange-400':'text-green-500' }
  ];

  // Skills data

// Skills data
const skills = [
  { icon: 'fa-html5', name: 'HTML5', level: 100 },
  { icon: 'fa-css3-alt', name: 'CSS3', level: 100 },
  { icon: 'fa-js', name: 'JavaScript', level: 100 },
  { icon: 'fa-react', name: 'React', level: 100 },
  { icon: 'fa-node-js', name: 'Node.js', level: 100 },
  { icon: 'fa-php', name: 'PHP', level: 70 },
  { icon: 'fa-database', name: 'MongoDB', level: 100 },
  { icon: 'nextjs', name: 'Next.js', level: 90 },
  { icon: 'typescript', name: 'Typescript', level: 90 },
  { icon: 'fa-firebase', name: 'Firebase', level: 100 },
  { icon: 'fa-express', name: 'Express.js', level: 100 },
  { icon: 'supabase', name: 'SupaBase', level: 90 },
  { icon: 'fa-mysql', name: "MySQL", level: 90 },
  { icon: 'fa-materialui', name: "Material UI", level: 90 },
  { icon: 'fa-react-native', name: "React Native", level: 100 },
  { icon: 'tailwind', name: "Tailwind CSS", level: 100 },
  { icon: 'bootstrap', name: "Bootstrap", level: 100 }
];
  // Form submission for contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const { name, email, phone, description } = form.elements;
    
    const db = getDatabase(app);
    const userRef = ref(db, `users/${name.value}`);
    
    set(userRef, {
      name: name.value,
      email: email.value,
      phone: phone.value,
      description: description.value,
      timestamp: new Date().toISOString()
    }).then(() => {
      alert('Message sent successfully!');
      form.reset();
    }).catch((error) => {
      console.error("Error submitting form:", error);
      alert('Failed to send message. Please try again.');
    });
  };

  // Add new project to Firebase
  const addProject = (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const projectsRef = ref(db, 'projects/');
    const newProjectRef = push(projectsRef);
    
    set(newProjectRef, {
      ...newProject,
      id: newProjectRef.key,
      dateAdded: new Date().toISOString()
    }).then(() => {
      alert('Project added successfully!');
      setNewProject({
        name: '',
        description: '',
        technologies: '',
        img: ['', ''],
        link: '',
        github: ''
      });
      setShowProjectForm(false);
      fetchProjects();
    }).catch((error) => {
      console.error("Error adding project:", error);
      alert('Failed to add project. Please try again.');
    });
  };
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });

      // Update parallax elements
      parallaxRefs.current.forEach((element) => {
        if (element) {
          const speed = element.getAttribute('data-speed') || 0.5;
          const xPos = -x * speed;
          const yPos = -y * speed;
          element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cursor trail effect
  useEffect(() => {
    const handleTrailMove = (e) => {
      const trailDot = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random()
      };
      
      setCursorTrail(prev => [...prev.slice(-6), trailDot]);
      
      // Auto remove old trail dots
      setTimeout(() => {
        setCursorTrail(prev => prev.filter(dot => dot.id !== trailDot.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleTrailMove);
    return () => window.removeEventListener('mousemove', handleTrailMove);
  }, []);
 // Add these CSS animations
  const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .spin-skill-wheel {
      animation: spin 20s linear infinite;
    }
    
    .spin-skill-wheel:hover {
      animation-play-state: paused;
    }
    
    .skill-icon-float {
      animation: float 3s ease-in-out infinite;
      animation-delay: var(--delay);
    }
    
    /* Custom cursor trail */
    .cursor-trail {
      position: fixed;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    }
    
    /* Glowing text effect */
    .glow-text {
      text-shadow: 0 0 10px rgba(255, 107, 0, 0.5),
                   0 0 20px rgba(255, 107, 0, 0.3),
                   0 0 30px rgba(255, 107, 0, 0.1);
    }
    
    /* 3D card effect */
    .card-3d {
      transform-style: preserve-3d;
      transition: transform 0.5s ease;
    }
    
    .card-3d:hover {
      transform: rotateY(10deg) rotateX(5deg) translateY(-10px);
    }
    
    /* Parallax layers */
    .parallax-layer {
      transition: transform 0.1s linear;
      will-change: transform;
    }
  `;
// Add this CSS at the bottom of your component or in your global CSS file
  return (
    <>
   <style>{styles}</style>
      
      {/* Cursor Trail Dots */}
      <div className="cursor-trails">
        {cursorTrail.map((dot, index) => (
          <div
            key={dot.id}
            className="cursor-trail"
            style={{
              left: dot.x - 4,
              top: dot.y - 4,
              background: `radial-gradient(circle, 
                rgba(255,107,0,${0.8 - index * 0.1}) 0%, 
                rgba(255,107,0,${0.4 - index * 0.1}) 50%, 
                transparent 70%)`,
              transform: `scale(${1 - index * 0.1})`,
              opacity: 1 - index * 0.2,
              filter: `blur(${index * 0.5}px)`
            }}
          />
        ))}
      </div>

    <div 
      className="main-container w-full  transition-colors duration-500 overflow-hidden"
      style={{ 
        backgroundColor: Profile1 === 'white' ? 'white' : '#0f172a',
        color: Profile1 === 'white' ? 'black' : 'white'
      }}
    >
      {/* Floating Background Elements with Parallax */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 80 + 20;
            const speed = 0.2 + Math.random() * 0.8;
            const delay = i * 0.5;
            
            return (
              <motion.div
                key={i}
                ref={el => parallaxRefs.current[i] = el}
                data-speed={speed}
                className="absolute rounded-full opacity-10 parallax-layer"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  backgroundColor: Profile1 === 'white' ? '#f97316' : '#f97316',
                  '--delay': `${delay}s`
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  scale: [1, 1 + Math.random() * 0.5],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: delay
                }}
              />
            );
          })}

          {/* Additional Parallax Layers */}
          <div 
            ref={el => parallaxRefs.current[20] = el}
            data-speed="0.3"
            className="absolute inset-0 parallax-layer opacity-5"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 2}px ${mousePosition.y * 2}px, 
                rgba(255,107,0,0.1) 0%, transparent 50%)`
            }}
          />
        </div>


      {/* Hero Section */}
     {/* Hero Section */}
<section className="hero-section relative overflow-hidden py-20 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
  {/* Left Text Section */}
  <motion.div
    className="details w-full md:w-1/2 z-10"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h1 className="text-2xl md:text-3xl font-light mb-2">Hi, I am</h1>
      <motion.h2
        className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Abhishek Gour
      </motion.h2>
      
      {/* New Bold Tagline */}
      <motion.h3
        className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Helping Brands Stand Out with Powerful Digital Solutions
      </motion.h3>
    </motion.div>
    
    <motion.div
      className="detail mt-6 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
    >
      {/* Updated Description */}
      <p className={`text-lg mb-6 ${Profile1 === 'white' ? 'text-gray-600' : 'text-gray-300'}`}>
       Building high-performance Web & Android apps with a focus on clean design, speed, and scalability. I also explore AI-driven solutions to bring smart features into modern applications. Passionate about turning ideas into powerful digital products for startups and businesses worldwide.
      </p>
      
      <div className="flex flex-wrap gap-4">
        {/* New Primary CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <a href="#contact">Hire Me for Your Project</a>
        </motion.button>
        
        {/* Secondary CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all"
        >
          <a href={pdf} download="Abhishek_Gour_Resume.pdf">Download CV</a>
        </motion.button>
        
        {/* Tertiary CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/Project">View My Portfolio</Link>
        </motion.button>
      </div>
      
      {/* Social Proof */}
      <motion.div 
        className="mt-8 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
      
      </motion.div>
    </motion.div>
  </motion.div>

        {/* Rotating-on-hover Image Section */}
        <motion.div 
          className="relative w-64 h-64 md:w-80 md:h-80 mt-10 md:mt-0 flex items-center justify-center group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Background Glow */}
          <motion.div 
            className="absolute w-full h-full rounded-full bg-gradient-to-r from-orange-400 to-pink-600 blur-2xl opacity-30 z-0"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Glow Ring */}
          <motion.div 
            className="absolute w-[110%] h-[110%] rounded-full border-4 border-orange-400 opacity-20"
            animate={{
              scale: [1, 1.05],
              opacity: [0.2, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Image with Spinner Effect */}
          <motion.div
            className="relative z-10 w-full h-full rounded-full overflow-hidden"
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={bg1}
              alt="Abhishek Gour"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-orange-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 40 - 20],
                x: [0, Math.random() * 40 - 20],
                opacity: [0.7, 0.4, 0.7],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </motion.div>

    
           </section>
      {/* Skills Section */}
    
<section 
  id="skills" 
  className="skills-section py-20 px-4 md:px-8 lg:px-16"
  data-aos="fade-up"
>
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Technical Skills
      </motion.h2>
      <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto"></div>
    </div>

    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="md:w-1/2">
        <motion.p 
          className={`text-lg mb-6 ${Profile1 === 'white' ? 'text-gray-600' : 'text-gray-300'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
        Full-Stack & Mobile App Developer skilled in MERN Stack, React, Next.js, PHP, Node.js, TypeScript, Firebase, MySQLi, and MongoDB. Experienced in front-end design with Tailwind, Bootstrap, JavaScript, HTML, CSS and back-end development using Express.js. Proficient in mobile app development with React Native, delivering scalable, user-friendly, and AI-powered solutions.
        </motion.p>
        
        <div className="mt-8 grid grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className="skill-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-orange-400 to-pink-600 h-2.5 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 spin-skill-wheel">
                  {/* Interactive skill icons that follow mouse */}
                  {skills.map((skill, index) => {
                    const angle = (index * 360 / skills.length) - 90;
                    const radius = 120;
                    const x = radius * Math.cos(angle * Math.PI / 180);
                    const y = radius * Math.sin(angle * Math.PI / 180);

                    return (
                      <motion.div
                        key={index}
                        ref={el => trailRef.current[index] = el}
                        className={`absolute w-12 h-12 flex items-center justify-center rounded-full dark:bg-gray-800 shadow-lg skill-icon-float ${Profile1 == "white"?'bg-white':'bg-gray-600'} group`}
                        style={{
                          left: `calc(50% + ${x}px - 24px)`,
                          top: `calc(50% + ${y}px - 24px)`,
                          '--delay': `${index * 0.1}s`
                        }}
                        whileHover={{ 
                          scale: 1.5,
                          zIndex: 100,
                          transition: { type: "spring", stiffness: 300 }
                        }}
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                      >
                        {getSkillIcon(skill.icon, skill.name)}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {skill.name} - {skill.level}%
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Center with mouse interaction */}
                  <motion.div 
                    className="absolute inset-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center shadow-xl cursor-pointer"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                    style={{
                      transform: `rotate(${mousePosition.x * 0.5}deg)`
                    }}
                  >
                    <span className="text-white font-bold text-xl">Skills</span>
                  </motion.div>
                </div>
              </div>
    </div>
    </div>
  </div>
</section>




      
      {/* Services Section */}
      <section 
  className="services-section py-20 px-4 md:px-8 lg:px-16"
  style={{
    backgroundColor: Profile1 === 'white' ? '#f8fafc' : '#1e293b',
  }}
  data-aos="fade-up"
>
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Awesome
      </motion.h2>
      <motion.h3 
        className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Services
      </motion.h3>
      <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto mt-4"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Service Card 1 */}
      <motion.div 
        className="service-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
        style={{
          backgroundColor: Profile1 === 'white' ? 'white' : '#334155',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -10 }}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-code text-2xl text-orange-500"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Web Development</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Custom web applications built with modern technologies like React, Node.js, and MongoDB.
          </p>
        </div>
        <div className="text-center">
          <a href="#" className="text-orange-500 hover:underline font-medium">Learn More</a>
        </div>
      </motion.div>

      {/* Service Card 2 */}
      <motion.div 
        className="service-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
        style={{
          backgroundColor: Profile1 === 'white' ? 'white' : '#334155',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ y: -10 }}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-mobile-screen-button text-2xl text-orange-500"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">App Development</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Cross-platform mobile apps using React Native for both iOS and Android with native performance.
          </p>
        </div>
        <div className="text-center">
          <a href="#" className="text-orange-500 hover:underline font-medium">Learn More</a>
        </div>
      </motion.div>

      {/* Service Card 3 */}
      <motion.div 
        className="service-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
        style={{
          backgroundColor: Profile1 === 'white' ? 'white' : '#334155',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ y: -10 }}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-paint-brush text-2xl text-orange-500"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Beautiful and intuitive user interfaces designed with Figma, Adobe XD, and Photoshop.
          </p>
        </div>
        <div className="text-center">
          <a href="#" className="text-orange-500 hover:underline font-medium">Learn More</a>
        </div>
      </motion.div>

      {/* Service Card 4 */}
      <motion.div 
        className="service-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group"
        style={{
          backgroundColor: Profile1 === 'white' ? 'white' : '#334155',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ y: -10 }}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-laptop-code text-2xl text-orange-500"></i>
          </div>
          <h3 className="text-xl font-bold mb-2">Responsive Design</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Fully responsive designs that work perfectly on all devices from desktop to mobile.
          </p>
        </div>
        <div className="text-center">
          <a href="#" className="text-orange-500 hover:underline font-medium">Learn More</a>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="projects-section py-20 px-4 md:px-8 lg:px-16"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Projects
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : projects && projects.length > 0 ? (
            <>
              {/* Desktop Swiper */}
              <div className="hidden md:block">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={3}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  loop={true}
                  className="project-swiper"
                >
                  {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                      <motion.div 
                        className="relative h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg"
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Project Image */}
                        <motion.div
                          className="w-full h-full overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={project.img?.[0] || p1}
                            alt={project.name}
                            onError={(e) => {
                              e.target.src = p1;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Info Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="text-white text-xl font-bold">
                                {project.name || 'Project Name'}
                              </h3>
                              <p className="text-gray-300 text-sm mt-1">
                                {project.tech || 'Web Development'}
                              </p>
                            </div>
                            
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full hover:bg-orange-600 transition-all"
                                title="View Live Project"
                              >
                                <i className="fas fa-external-link-alt text-white"></i>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-pink-600/20 opacity-0 flex items-center justify-center"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-black/80 rounded-full p-3 mx-2 hover:bg-black transition-colors"
                              title="View Code"
                            >
                              <i className="fab fa-github text-white text-xl"></i>
                            </a>
                          )}
                        </motion.div>
                      </motion.div>
                    </SwiperSlide>
                  )).reverse()}
                </Swiper>
              </div>

              {/* Mobile Swiper */}
              <div className="md:hidden">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  className="project-swiper-mobile"
                >
                  {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                      <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={project.img?.[1] || p1}
                          alt={project.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = p1;
                          }}
                        />
                        
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-white font-bold text-lg">
                                {project.name || "Project Name"}
                              </h3>
                              <p className="text-gray-300 text-sm">
                                {project.tech || 'Web Development'}
                              </p>
                            </div>
                            
                            <div className="flex space-x-2">
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors"
                                  title="View Project"
                                >
                                  <i className="fas fa-external-link-alt"></i>
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-black/80 hover:bg-black text-white p-2 rounded-full transition-colors"
                                  title="View Code"
                                >
                                  <i className="fab fa-github"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="text-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/Project">View All Projects</Link>
                </motion.button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg mb-4">No projects found yet.</p>
              <p className="text-gray-500 dark:text-gray-400">Check back soon for updates!</p>
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={() => setShowProjectForm(true)}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add Sample Project
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      
{/* Testimonials Section with Multiple Swiper Effects */}

<section 
  className="testimonials-section py-20 px-4 md:px-8 lg:px-16"
  style={{
    backgroundColor: Profile1 === 'white' ? '#f8fafc' : '#0f172a',
  }}
  data-aos="fade-up"
>
  <div className="max-w-6xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-600">Testimonials</span>
      </motion.h2>
      <motion.p 
        className={`text-lg max-w-2xl mx-auto ${Profile1 === 'white' ? 'text-gray-600' : 'text-gray-400'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        What our clients say about working with us
      </motion.p>
      <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto mt-4"></div>
    </div>

    {/* Testimonials Cards - Fixed Height to Show All Content */}
    <div className="relative px-4 md:px-12">
      <Swiper
        modules={[EffectCards, Navigation, Pagination, Autoplay]}
        effect="cards"
        grabCursor={true}
        loop={true}
        navigation={{
          nextEl: '.testimonial-next',
          prevEl: '.testimonial-prev',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        cardsEffect={{
          perSlideOffset: 8,
          perSlideRotate: 2,
          rotate: true,
          slideShadows: false,
        }}
        autoplay={{ delay: 3000 }}
        className="testimonial-swiper !pb-12 "
        style={{
          height: 'fit-content', // Fixed height that fits all content
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        {/* Testimonial 1 - MyAstrova */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl p-6 shadow-xl flex flex-col "
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            {/* Rating - Fixed at top */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            {/* Testimonial Text - Fixed height with proper spacing */}
            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "Working with Abhishek on MyAstrova was excellent. He delivered a platform with seamless astrology consultation features, real-time chat, and payment integration. Our users love the clean interface."
              </p>
            </div>

            {/* Client Info - Fixed at bottom */}
            <div className="pt-3 border-t p-3 " style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  RS
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Ravi Shastri</h4>
                  <p className="text-xs text-orange-500 truncate">Founder, MyAstrova</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Delhi NCR</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full ">
                    myastrova.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 2 - SST Trader */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl p-6 shadow-xl flex flex-col"
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "SST Trader ERP streamlined our accounting process. Inventory management, GST invoices, and sales tracking are exactly what our distribution business needed. Saves us hours of manual work daily."
              </p>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  PM
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Prakash Mehta</h4>
                  <p className="text-xs text-blue-500 truncate">Director, Mehta Distributors</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Mumbai</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full whitespace-nowrap">
                    ssttrader.in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 3 - Feastify */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl p-6 shadow-xl flex flex-col"
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "Feastify transformed our restaurant's online presence. The ordering system is intuitive with real-time tracking. Admin panel makes menu management effortless. Online orders increased significantly."
              </p>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  AS
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Arjun Singh</h4>
                  <p className="text-xs text-green-500 truncate">Owner, Singh Dhaba</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Ludhiana</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full whitespace-nowrap">
                    feastify.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 4 - SkillRoot */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl p-6 shadow-xl flex flex-col"
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "SkillRoot made online learning engaging. Video lectures, quizzes, and resume generator work seamlessly. Abhishek's attention to educational needs made this project a success."
              </p>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  DJ
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Deepak Joshi</h4>
                  <p className="text-xs text-purple-500 truncate">Founder, SkillRoot</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Pune</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full whitespace-nowrap">
                    skillroot.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 5 - FitCore */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl shadow-xl flex flex-col p-6 "
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "FitCore's website with membership management and growth analytics made gym administration simple. Clean UI attracts new members. Delivered exactly what we wanted on time."
              </p>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  VR
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Vikram Rathore</h4>
                  <p className="text-xs text-red-500 truncate">Owner, FitCore Gym</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Jaipur</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full whitespace-nowrap">
                    fitcore.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 6 - BarleyHub */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl p-6 shadow-xl flex flex-col"
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "BarleyHub's website captures our café's ambiance perfectly. Interactive menu and table reservation are user-friendly. Customers love the clean design."
              </p>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  SK
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Simran Kaur</h4>
                  <p className="text-xs text-amber-500 truncate">Owner, BarleyHub Cafe</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Chandigarh</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full whitespace-nowrap">
                    barleyhub.in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 7 - SmileCare */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl p-6 shadow-xl flex flex-col"
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "SmileCare digitized our dental clinic operations effectively. Patient management, appointments, and billing are now hassle-free. Staff adapted quickly."
              </p>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  NS
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Dr. Neha Sharma</h4>
                  <p className="text-xs text-sky-500 truncate">Dentist, SmileCare Clinic</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Bangalore</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full whitespace-nowrap">
                    smilecare.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Testimonial 8 - Urban Property Dealers */}
        <SwiperSlide>
          <div 
            className="h-full w-full rounded-2xl p-6 shadow-xl flex flex-col"
            style={{
              backgroundColor: Profile1 === 'white' ? '#ffffff' : '#1e293b',
              border: `1px solid ${Profile1 === 'white' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
              ))}
            </div>

            <div className="flex-1 mb-4">
              <p className={`text-sm leading-relaxed ${Profile1 === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                "Urban Property Dealers website boosted property listings visibility. Lead generation forms bring quality inquiries daily. Property management is straightforward."
              </p>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: Profile1 === 'white' ? '#e2e8f0' : '#334155' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  RG
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">Rajesh Gupta</h4>
                  <p className="text-xs text-emerald-500 truncate">Owner, Urban Property Dealers</p>
                  <p className={`text-xs ${Profile1 === 'white' ? 'text-gray-500' : 'text-gray-400'} truncate`}>Indore</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <span className="text-[10px] px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full whitespace-nowrap">
                    urbanpropertydealers.in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Simple Navigation */}
      <div className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:text-white transition-colors z-10">
        <i className="fas fa-chevron-left text-sm"></i>
      </div>
      <div className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:text-white transition-colors z-10">
        <i className="fas fa-chevron-right text-sm"></i>
      </div>
    </div>

    {/* Simple Stats */}
    <div className="flex justify-center gap-6 mt-8">
      <div className="text-center">
        <div className="text-xl font-bold text-orange-500">8+</div>
        <div className={`text-xs ${Profile1 === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>Projects</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-orange-500">100%</div>
        <div className={`text-xs ${Profile1 === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>Satisfaction</div>
      </div>
      <div className="text-center">
        <div className="text-xl font-bold text-orange-500">24/7</div>
        <div className={`text-xs ${Profile1 === 'white' ? 'text-gray-600' : 'text-gray-400'}`}>Support</div>
      </div>
    </div>
  </div>
</section>
    
      {/* Contact Section */}
      <section 
        id="contact" 
        className="contact-section py-20 px-4 md:px-8 lg:px-16"
        style={{
          backgroundColor: Profile1 === 'white' ? '#f8fafc' : '#1e293b',
        }}
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h2>
            <motion.h3 
              className="text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Contact Me
            </motion.h3>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <motion.h3 
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Let's Talk About Your Project
              </motion.h3>
              <motion.p 
                className={`text-lg mb-6 ${Profile1 === 'white' ? 'text-gray-600' : 'text-gray-300'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Have a project in mind or want to discuss potential opportunities? Feel free to reach out! I'm always open to new challenges and collaborations.
              </motion.p>
              
              <div className="contact-info mt-8">
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fa-solid fa-envelope text-white"></i>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-orange-500">gourabhishek130@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fa-solid fa-phone text-white"></i>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-orange-500">+91 6266834504</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fa-solid fa-location-dot text-white"></i>
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-orange-500">Indore, India</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="md:w-1/2">
              <motion.form 
                onSubmit={handleSubmit}
                className="contact-form bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {/* Name */}
                <div className="mb-6">
                  <label className="block mb-2 font-semibold">Your Name</label>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input 
                      type="text" 
                      name="name"
                      className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 text-black dark:border-gray-60"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block mb-2 font-semibold">Your Email</label>
                  <div className="relative">
                    <i className="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full  pl-12 pr-4 py-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 "
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label className="block mb-2 font-semibold">Your Phone</label>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input 
                      type="tel" 
                      name="phone"
                      className="w-full pl-12 text-black pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block mb-2 font-semibold">Your Message</label>
                  <textarea 
                    name="description"
                    className="w-full p-3  border rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 "
                    rows="5"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg shadow hover:shadow-md transition-all"
                >
                  Send Message
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
{/* Floating Social Icons */}
        <div className="social-icons fixed left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl ${social.color} hover:text-orange-500 transition-colors`}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <i className={`fa-brands ${social.icon}`}></i>
            </motion.a>
          ))}
        </div>
      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Abhishek Gour. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xl ${social.color} hover:text-orange-500 transition-colors`}
                  whileHover={{ y: -5 }}
                >
                  <i className={`fa-brands ${social.icon}`}></i>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  


    
   {/**  
      <section className="submit-project py-20 px-4 md:px-8 lg:px-16" data-aos="fade-up">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">Submit Your Project</h2>
    <form onSubmit={addProject} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      
      <input
        type="text"
        placeholder="Project Name"
        className="w-full mb-4 p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={newProject.name}
        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        required
      />
      
      <input
        type="text"
        placeholder="Tech Stack (e.g., React, Node.js)"
        className="w-full mb-4 p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={newProject.technologies}
        onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
        required
      />

       ✅ New Description Field 
      <textarea
        placeholder="Project Description"
        rows={4}
        className="w-full mb-4 p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        className="w-full mb-4 p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={newProject.img[1]}
        onChange={(e) =>
          setNewProject({ ...newProject, img: [e.target.value, e.target.value] })
        }
        required
      />
      
      <input
        type="text"
        placeholder="Live Link (optional)"
        className="w-full mb-4 p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={newProject.link}
        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
      />
      
      <input
        type="text"
        placeholder="GitHub Link (optional)"
        className="w-full mb-4 p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        value={newProject.github}
        onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
      />
      
      <button
        type="submit"
        className="w-full py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        Submit Project
      </button>
    </form>
  </div>
</section>
*/}





    </>
    
  );
}

export default Main;
