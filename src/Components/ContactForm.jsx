import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ContactForm = () => {
  return (
    <section className="py-5" id="contact">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h2 className="section-title fw-bold">Get Started</h2>
        </motion.div>

        <Row className="justify-content-center">
          <Col lg={5} className="mb-4 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-4 rounded shadow-sm h-100"
              style={{ backgroundColor: 'var(--light-peach)' }}
            >
              <h3 className="fw-bold mb-4 text-center">Ready to sell your licenses?</h3>
              <p className="mb-4 text-center">Fill out the form and our team will get back to you within 24 hours.</p>
              <div className="text-center mt-5">
                <p className="fw-bold" style={{ color: 'var(--olive-green)' }}>Contact us directly:</p>
                <p>sales@softsell.com</p>
              </div>
            </motion.div>
          </Col>
          <Col lg={5}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-4 rounded shadow-sm bg-white"
            >
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Full Name" 
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="Email Address" 
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Select className="py-3">
                    <option>License Type</option>
                    <option>Microsoft</option>
                    <option>Adobe</option>
                    <option>Oracle</option>
                    <option>SAP</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
                <Button 
                  variant="primary" 
                  className="rounded-pill px-4 py-3 w-100"
                  style={{ backgroundColor: 'var(--olive-green)', borderColor: 'var(--olive-green)' }}
                >
                  Submit
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;