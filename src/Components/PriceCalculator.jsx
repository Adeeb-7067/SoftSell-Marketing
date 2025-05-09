import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const PricingCalculator = () => {
  // Calculator state
  const [formState, setFormState] = useState({
    licenseType: 'microsoft',
    licenseAge: '0-1',
    quantity: 1,
    maintenanceActive: 'yes'
  });
  
  // Estimated value state
  const [estimatedValue, setEstimatedValue] = useState({
    minValue: 0,
    maxValue: 0,
    showResult: false
  });

  // License pricing data (in a real app, this would come from an API)
  const licensePricing = {
    microsoft: {
      basePrice: 500,
      '0-1': 0.7, // 70% of value for 0-1 year old
      '1-2': 0.6, // 60% of value for 1-2 years old
      '2-3': 0.5, // 50% of value for 2-3 years old
      '3+': 0.4,  // 40% of value for 3+ years old
      maintenanceMultiplier: 1.2 // 20% bonus for active maintenance
    },
    adobe: {
      basePrice: 800,
      '0-1': 0.65,
      '1-2': 0.55,
      '2-3': 0.45,
      '3+': 0.35,
      maintenanceMultiplier: 1.15
    },
    oracle: {
      basePrice: 1200,
      '0-1': 0.75,
      '1-2': 0.65,
      '2-3': 0.55,
      '3+': 0.45,
      maintenanceMultiplier: 1.25
    },
    sap: {
      basePrice: 1500,
      '0-1': 0.7,
      '1-2': 0.6,
      '2-3': 0.45,
      '3+': 0.35,
      maintenanceMultiplier: 1.2
    }
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate estimated value whenever form state changes
  useEffect(() => {
    const calculateValue = () => {
      const { licenseType, licenseAge, quantity, maintenanceActive } = formState;
      
      // Get pricing data for selected license type
      const pricing = licensePricing[licenseType];
      
      // Calculate base value
      let baseValue = pricing.basePrice * pricing[licenseAge] * parseInt(quantity);
      
      // Apply maintenance multiplier if active
      if (maintenanceActive === 'yes') {
        baseValue *= pricing.maintenanceMultiplier;
      }
      
      // Add some variability for min/max range (±10%)
      const minValue = Math.round(baseValue * 0.9);
      const maxValue = Math.round(baseValue * 1.1);
      
      setEstimatedValue({
        minValue,
        maxValue,
        showResult: true
      });
    };
    
    calculateValue();
  }, [formState]);

  return (
    <section className="py-5" id="calculator" style={{ backgroundColor: 'var(--lemon-yellow)' }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <h2 className="section-title fw-bold">Value Calculator</h2>
          <p className="text-muted">Get an instant estimate of your license value</p>
        </motion.div>

        <Row className="justify-content-center">
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white p-4 rounded shadow-sm"
            >
              <Row>
                <Col md={7}>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>License Type</Form.Label>
                      <Form.Select 
                        name="licenseType"
                        value={formState.licenseType}
                        onChange={handleInputChange}
                      >
                        <option value="microsoft">Microsoft</option>
                        <option value="adobe">Adobe</option>
                        <option value="oracle">Oracle</option>
                        <option value="sap">SAP</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>License Age</Form.Label>
                      <Form.Select 
                        name="licenseAge"
                        value={formState.licenseAge}
                        onChange={handleInputChange}
                      >
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="2-3">2-3 years</option>
                        <option value="3+">3+ years</option>
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control 
                        type="number" 
                        min="1" 
                        name="quantity"
                        value={formState.quantity}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Label>Active Maintenance?</Form.Label>
                      <Form.Select 
                        name="maintenanceActive"
                        value={formState.maintenanceActive}
                        onChange={handleInputChange}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Col>
                
                <Col md={5}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="d-flex flex-column justify-content-center">
                      <div className="text-center mb-3">
                        <h5 className="mb-4">Estimated Value</h5>
                        
                        {estimatedValue.showResult && (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            key={`${estimatedValue.minValue}-${estimatedValue.maxValue}`}
                          >
                            <h3 className="fw-bold" style={{ color: 'var(--olive-green)' }}>
                              ${estimatedValue.minValue.toLocaleString()} - ${estimatedValue.maxValue.toLocaleString()}
                            </h3>
                          </motion.div>
                        )}
                      </div>
                      
                      <p className="text-muted text-center mb-0 small">
                        This is an estimate only. Contact us for an accurate quote.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mt-4"
            >
              <a 
                href="#contact" 
                className="btn btn-primary rounded-pill px-4 py-2"
                style={{ 
                  backgroundColor: 'var(--olive-green)', 
                  borderColor: 'var(--olive-green)'
                }}
              >
                Get Precise Valuation
              </a>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PricingCalculator;