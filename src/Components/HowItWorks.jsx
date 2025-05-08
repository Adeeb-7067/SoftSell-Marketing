import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload License',
      description: 'Submit your software licenses through our secure portal for quick evaluation',
      imageContent: '📤'
    },
    {
      number: 2,
      title: 'Get Valuation',
      description: 'Receive a competitive quote within 24 hours from our expert team',
      imageContent: '💹'
    },
    {
      number: 3,
      title: 'Get Paid',
      description: 'Accept offer and receive payment within 3 business days via your preferred method',
      imageContent: '💰'
    }
  ];

  return (
    <section className="py-5" id="how-it-works">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h2 className="section-title fw-bold">How It Works</h2>
        </motion.div>

        {steps.map((step, index) => (
          <Row 
            key={step.number}
            className={`align-items-center mb-5 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
            style={{ backgroundColor: index % 2 !== 0 ? 'var(--lemon-yellow)' : 'white', borderRadius: '8px', padding: '30px 0' }}
          >
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="d-flex">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-4" 
                    style={{ 
                      width: '70px', 
                      height: '70px', 
                      backgroundColor: 'var(--light-peach)',
                      border: '2px solid var(--olive-green)'
                    }}
                  >
                    <span className="fw-bold fs-4" style={{ color: 'var(--olive-green)' }}>{step.number}</span>
                  </div>
                  <div>
                    <h3 className="fw-bold mb-2">{step.title}</h3>
                    <p className="text-muted">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <div 
                  className="mx-auto rounded-4 d-flex align-items-center justify-content-center shadow-sm" 
                  style={{ 
                    height: '200px', 
                    maxWidth: '300px',
                    backgroundColor: 'var(--light-peach)'
                  }}
                >
                  <span className="display-1">{step.imageContent}</span>
                </div>
              </motion.div>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default HowItWorks;
