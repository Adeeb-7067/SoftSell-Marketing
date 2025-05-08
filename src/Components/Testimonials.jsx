import { useState } from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'IT Director, TechCorp Inc.',
      quote: 'SoftSell helped us recover over $50,000 from unused licenses. The process was incredibly smooth and their team was professional every step of the way.'
    },
    {
      name: 'Michael Chen',
      position: 'CFO, StartUp Solutions',
      quote: 'The process was seamless and their valuation was 20% higher than competitors. Definitely worth every penny!'
    },
    {
      name: 'Lisa Rodriguez',
      position: 'Procurement Manager, Global Enterprises',
      quote: 'We were skeptical at first, but SoftSell delivered exactly what they promised. Fast evaluation, great rates, and quick payment.'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-5" 
      style={{ backgroundColor: 'var(--lemon-yellow)' }}
    >
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold">Customer Testimonials</h2>
        </div>

        <Row className="justify-content-center">
          <Col lg={10}>
            <Carousel 
              activeIndex={index} 
              onSelect={handleSelect}
              indicators={true}
              controls={true}
              className="testimonial-carousel"
              prevIcon={<span className="carousel-control-prev-icon" style={{ filter: 'invert(25%)' }}></span>}
              nextIcon={<span className="carousel-control-next-icon" style={{ filter: 'invert(25%)' }}></span>}
            >
              {testimonials.map((testimonial, idx) => (
                <Carousel.Item key={idx}>
                  <Card className="border-0 shadow testimonial-card">
                    <Card.Body className="p-4 p-md-5">
                      <Row className="align-items-center">
                        <Col md={3} className="text-center mb-4 mb-md-0">
                          <div 
                            className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                            style={{ 
                              width: '100px', 
                              height: '100px', 
                              backgroundColor: 'var(--peach)',
                              color: 'white',
                              fontSize: '40px',
                              fontWeight: 'bold'
                            }}
                          >
                            {testimonial.name.charAt(0)}
                          </div>
                        </Col>
                        <Col md={9}>
                          <blockquote className="blockquote mb-0">
                            <p className="mb-4 fs-5 fst-italic">"{testimonial.quote}"</p>
                            <footer className="mt-3">
                              <strong className="d-block">{testimonial.name}</strong>
                              <small className="text-muted">{testimonial.position}</small>
                            </footer>
                          </blockquote>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default Testimonials;