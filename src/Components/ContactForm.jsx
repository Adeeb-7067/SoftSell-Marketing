import { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Toast } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    licenseType: '',
    company: '',
    message: ''
  });
  
  // Form validation
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  // License types
  const licenseTypes = [
    'Microsoft', 'Adobe', 'Oracle', 'SAP', 'IBM', 
    'Autodesk', 'VMware', 'Salesforce', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    // Validate license type
    if (!formData.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setToastVariant('success');
        setToastMessage('Thank you! We will contact you within 24 hours.');
        setShowToast(true);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          licenseType: '',
          company: '',
          message: ''
        });
        setValidated(false);
      }, 1500);
    } else {
      setValidated(true);
    }
  };

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
          <h2 className="section-title fw-bold">Get Started Today</h2>
          <p className="text-muted">Let us help you recover value from your unused licenses</p>
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
              <h3 className="fw-bold mb-4 text-center">Why Sell Your Licenses?</h3>
              
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      backgroundColor: 'white',
                      border: '2px solid var(--olive-green)'
                    }}
                  >
                    <span style={{ color: 'var(--olive-green)' }}>✓</span>
                  </div>
                  <p className="mb-0 fw-medium">Recover up to 70% of license costs</p>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      backgroundColor: 'white',
                      border: '2px solid var(--olive-green)'
                    }}
                  >
                    <span style={{ color: 'var(--olive-green)' }}>✓</span>
                  </div>
                  <p className="mb-0 fw-medium">Reduce annual maintenance fees</p>
                </div>
                
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      backgroundColor: 'white',
                      border: '2px solid var(--olive-green)'
                    }}
                  >
                    <span style={{ color: 'var(--olive-green)' }}>✓</span>
                  </div>
                  <p className="mb-0 fw-medium">Fully compliant transfer process</p>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p className="fw-bold" style={{ color: 'var(--olive-green)' }}>Contact us directly:</p>
                <p className="mb-1">sales@softsell.com</p>
                <p className="mb-0">+1 (555) 123-4567</p>
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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="py-2"
                    isInvalid={!!errors.fullName}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-2"
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Company</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>License Type</Form.Label>
                  <Form.Select 
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleChange}
                    className="py-2"
                    isInvalid={!!errors.licenseType}
                    required
                  >
                    <option value="">Select License Type</option>
                    {licenseTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.licenseType}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Additional Information</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit"
                  className="rounded-pill px-4 py-2 w-100"
                  style={{ 
                    backgroundColor: 'var(--olive-green)', 
                    borderColor: 'var(--olive-green)'
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Processing...
                    </>
                  ) : 'Submit Request'}
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
        
        {/* Toast notification */}
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000
          }}
        >
          <Toast 
            show={showToast} 
            onClose={() => setShowToast(false)} 
            delay={5000} 
            autohide
            bg={toastVariant}
            text={toastVariant === 'dark' ? 'white' : undefined}
          >
            <Toast.Header>
              <strong className="me-auto">SoftSell</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;