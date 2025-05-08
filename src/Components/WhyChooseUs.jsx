import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: '💰',
      title: 'Best Market Rates',
      description: 'We offer the highest valuations in the industry, guaranteed'
    },
    {
      icon: '🔒',
      title: 'Secure Process',
      description: 'Enterprise-grade security for all license transfers'
    },
    {
      icon: '⚡',
      title: 'Fast Payments',
      description: 'Get paid in as little as 3 business days'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-5" id="why-us" style={{ backgroundColor: 'var(--lemon-yellow)', paddingTop: '60px', paddingBottom: '60px' }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h2 className="section-title fw-bold">Why Choose Us</h2>
        </motion.div>

        <Row>
          {features.map((feature, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div 
                      className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        backgroundColor: 'var(--light-peach)',
                        border: '2px solid var(--peach)'
                      }}
                    >
                      <span className="display-5">{feature.icon}</span>
                    </div>
                    <Card.Title className="fw-bold mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
