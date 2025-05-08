import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const socialLinks = ['facebook', 'twitter', 'linkedin', 'instagram'];

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{ backgroundColor: 'var(--olive-green)', color: 'white', borderTop: '3px solid var(--light-peach)' }}
    >
      <Container>
        <Row className="text-center">
          <Col>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="fw-bold mb-3 display-6">SoftSell</h3>

              <motion.div
                className="d-flex justify-content-center gap-3 mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '1.2rem'
                    }}
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: 'rgba(255,255,255,0.3)'
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <i className={`bi bi-${social}`}></i>
                  </motion.a>
                ))}
              </motion.div>

              <p className="mb-1 opacity-75 small">© 2025 SoftSell. All rights reserved.</p>
              <p className="small opacity-75">
                <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
                {" | "}
                <a href="#" className="text-white text-decoration-none">Terms of Service</a>
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
