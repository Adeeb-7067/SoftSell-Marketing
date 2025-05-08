import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active link based on section visibility
      const sections = ['home', 'how-it-works', 'why-us', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigation items with their labels and animation delays
  const navItems = [
    { href: '#home', label: 'Home', delay: 0.1 },
    { href: '#how-it-works', label: 'How It Works', delay: 0.2 },
    { href: '#why-us', label: 'Why Us', delay: 0.3 },
    { href: '#contact', label: 'Contact', delay: 0.4 }
  ];

  return (
    <Navbar
      expand="lg"
      className={`bg-white py-3 ${scrolled ? 'shadow-sm' : ''}`}
      fixed="top"
      style={{ transition: 'all 0.3s ease' }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <div 
              className="d-flex align-items-center justify-content-center rounded"
              style={{ 
                width: 45, 
                height: 45, 
                background: 'var(--olive-green)',
                boxShadow: '0 2px 8px rgba(107, 142, 35, 0.25)',
                marginRight: 12
              }}
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '22px' }}>S</span>
            </div>
            <motion.span 
              className="fw-bold fs-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ letterSpacing: '0.5px' }}
            >
              Soft<span style={{ color: 'var(--olive-green)', position: 'relative' }}>
                Sell
                <span className="position-absolute" style={{ 
                  height: '3px', 
                  width: '100%', 
                  backgroundColor: 'var(--peach)', 
                  bottom: '-2px', 
                  left: 0,
                  borderRadius: '2px'
                }}></span>
              </span>
            </motion.span>
          </Navbar.Brand>
        </motion.div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.5 }}
              >
                <Nav.Link 
                  href={item.href} 
                  className={`mx-2 position-relative`}
                  onClick={() => setActiveLink(item.href.substring(1))}
                  style={{ 
                    fontWeight: activeLink === item.href.substring(1) ? '600' : '500',
                    color: activeLink === item.href.substring(1) ? 'var(--olive-green)' : 'var(--dark-text)'
                  }}
                >
                  {item.label}
                  {activeLink === item.href.substring(1) && (
                    <span className="position-absolute" style={{ 
                      height: '2px', 
                      width: '80%', 
                      backgroundColor: 'var(--olive-green)', 
                      bottom: '0', 
                      left: '10%',
                      transition: 'all 0.3s ease'
                    }}></span>
                  )}
                </Nav.Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="ms-2"
            >
              <Button 
                href="#demo" 
                variant="primary"
                className="rounded-pill px-3 py-2"
                style={{ 
                  fontWeight: '600', 
                  boxShadow: '0 4px 10px rgba(107, 142, 35, 0.25)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(107, 142, 35, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(107, 142, 35, 0.25)';
                }}
              >
                Request Demo
              </Button>
            </motion.div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;