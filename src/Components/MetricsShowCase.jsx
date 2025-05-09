import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const MetricsShowcase = () => {
  // Metrics to display with their final values
  const metrics = [
    { label: 'Licenses Sold', value: 25000, prefix: '', suffix: '+', duration: 2 },
    { label: 'Customer Satisfaction', value: 98, prefix: '', suffix: '%', duration: 2 },
    { label: 'Average Savings', value: 45, prefix: '', suffix: '%', duration: 1.5 },
    { label: 'Business Partners', value: 200, prefix: '', suffix: '+', duration: 1.8 }
  ];

  return (
    <section className="py-5 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h2 className="section-title fw-bold">Our Impact</h2>
          <p className="text-muted">Delivering real value to businesses worldwide</p>
        </motion.div>

        <Row className="justify-content-center">
          {metrics.map((metric, index) => (
            <Col md={6} lg={3} className="mb-4" key={index}>
              <CountUpMetric 
                metric={metric} 
                delay={index * 0.2} 
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Component for individual animated metric
const CountUpMetric = ({ metric, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Animation when the element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Count up animation
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = metric.value;
    const duration = metric.duration * 1000;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const timeElapsed = Date.now() - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, metric.value, metric.duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center p-4 rounded shadow-sm h-100"
      style={{ backgroundColor: 'var(--light-peach)' }}
    >
      <h3 className="display-4 fw-bold mb-2" style={{ color: 'var(--olive-green)' }}>
        {metric.prefix}{count}{metric.suffix}
      </h3>
      <p className="mb-0 fw-semibold">{metric.label}</p>
    </motion.div>
  );
};

export default MetricsShowcase;