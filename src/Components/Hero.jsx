import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Hero = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleDialogOpen = () => setShowDialog(true);
  const handleDialogClose = () => setShowDialog(false);

  return (
    <section
      className="hero-section py-5"
      id="home"
      style={{ marginTop: '76px', paddingTop: '80px', paddingBottom: '80px' }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white p-4 p-lg-5 rounded shadow"
            >
              <h1 className="fw-bold mb-3">Turn Unused Software into Cash</h1>
              <p className="lead mb-4 text-muted">
                SoftSell helps businesses recover value from surplus software licenses with our secure marketplace
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-pill px-4"
                  style={{ backgroundColor: 'var(--olive-green)' }}
                >
                  Sell My Licenses
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="rounded-pill px-4"
                  style={{
                    borderColor: 'var(--olive-green)',
                    color: 'var(--olive-green)',
                  }}
                  onClick={handleDialogOpen}
                >
                  Get a Quote
                </Button>
              </div>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-center"
            >
              <div className="position-relative">
                <div
                  className="bg-light p-4 rounded shadow-sm"
                  style={{ backgroundColor: 'var(--lemon-yellow)' }}
                >
                  <div
                    className="mx-auto rounded-3 d-flex align-items-center justify-content-center"
                    style={{ height: '300px', backgroundColor: 'var(--light-peach)' }}
                  >
                    <div className="text-center">
                      <div
                        className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '120px',
                          height: '120px',
                          backgroundColor: 'var(--peach)',
                        }}
                      >
                        <span className="display-6 text-white">📄</span>
                      </div>
                      <div
                        className="mx-auto rounded"
                        style={{ width: '160px', height: '60px', backgroundColor: 'var(--peach)' }}
                      ></div>
                      <p className="mt-3 text-muted">Software License Illustration</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Dialog Modal */}
      <Modal show={showDialog} onHide={handleDialogClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Coming Soon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The "Get a Quote" feature is coming soon! We’re working hard to bring this to you.
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleDialogClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Hero;
