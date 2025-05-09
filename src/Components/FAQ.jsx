import { useState } from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [activeKey, setActiveKey] = useState('0');
  
  const faqItems = [
    {
      question: "How do I know if my licenses are eligible for resale?",
      answer: "Most perpetual software licenses from major vendors like Microsoft, Adobe, Oracle, and SAP are eligible for resale. Subscription-based licenses typically cannot be resold. We can quickly evaluate your specific licenses during our initial consultation."
    },
    {
      question: "Is selling unused software licenses legal?",
      answer: "Yes, selling unused software licenses is legal in most jurisdictions under the first-sale doctrine, which allows the lawful owner of a copy to sell or otherwise dispose of that copy without permission from the copyright holder. Our legal team ensures all transfers comply with applicable laws and vendor agreements."
    },
    {
      question: "How much can I expect to get for my licenses?",
      answer: "The value of your licenses depends on several factors including age, popularity, version, and market demand. Typically, you can expect anywhere from 30% to 70% of the original purchase price for desirable licenses. Our team will provide a detailed valuation after reviewing your licenses."
    },
    {
      question: "How long does the entire process take?",
      answer: "The typical timeline is: 24-48 hours for initial valuation, 1-2 days for offer acceptance and paperwork, and 3-5 business days for payment processing. The entire process usually takes 7-10 business days from start to finish."
    },
    {
      question: "What information do I need to provide about my licenses?",
      answer: "We'll need proof of ownership, license keys or certificates, purchase documentation, and information about the current installation status. Our team will guide you through exactly what's needed for your specific licenses."
    },
    {
      question: "How do you handle the license transfer process?",
      answer: "We manage the entire process, including verification, documentation, and coordinating with software vendors when necessary. Our team has established relationships with major vendors and understands their specific transfer requirements."
    }
  ];

  return (
    <section className="py-5 bg-white" id="faq">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h2 className="section-title fw-bold">Frequently Asked Questions</h2>
          <p className="text-muted">Everything you need to know about selling your software licenses</p>
        </motion.div>

        <Row className="justify-content-center">
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Accordion 
                defaultActiveKey="0" 
                className="shadow-sm rounded"
                activeKey={activeKey}
                onSelect={(key) => setActiveKey(key)}
              >
                {faqItems.map((item, index) => (
                  <Accordion.Item 
                    key={index} 
                    eventKey={`${index}`}
                    className="border-0 mb-2"
                  >
                    <Accordion.Header 
                      className="px-4 py-3 rounded"
                      style={{ 
                        backgroundColor: activeKey === `${index}` ? 'var(--light-peach)' : 'white'
                      }}
                    >
                      <span className="fw-semibold">{item.question}</span>
                    </Accordion.Header>
                    <Accordion.Body className="px-4 py-3">
                      <p className="text-muted mb-0">{item.answer}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-center mt-4"
            >
              <p className="text-muted mb-4">
                Still have questions? Our license experts are ready to help.
              </p>
              <Button
                variant="outline-primary"
                className="rounded-pill px-4 py-2"
                href="#contact"
                style={{
                  borderColor: 'var(--olive-green)',
                  color: 'var(--olive-green)',
                }}
              >
                Contact Our Team
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FAQ;