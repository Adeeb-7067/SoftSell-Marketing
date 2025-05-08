'use client';
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CompanyLogos = () => {
  const companies = [
    { name: 'Microsoft', color: '#00A4EF' },
    { name: 'Amazon', color: '#FF9900' },
    { name: 'Google', color: '#4285F4' },
    { name: 'Apple', color: '#A2AAAD' },
    { name: 'Meta', color: '#0080FB' }
  ];

  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <section className="py-5 hero-section">
      <div className="container px-4">
        <motion.div
          className="text-center mb-5 section-title"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
          }}
        >
          <h2 className="h3 fw-bold">Trusted By Industry Leaders</h2>
          <p className="text-muted">Join these companies in transforming their business</p>
        </motion.div>

        <div className="row justify-content-center align-items-center">
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-2 d-flex justify-content-center mb-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-2"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'var(--light-peach)',
                    color: company.color,
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                  }}
                >
                  {company.name.charAt(0)}
                </div>
                <p className="fw-semibold mb-0">{company.name}</p>
                <div
                  className="mt-1 mx-auto"
                  style={{
                    height: '4px',
                    width: '0',
                    backgroundColor: 'var(--olive-green)',
                    transition: 'width 0.3s'
                  }}
                ></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-primary btn-lg shadow-sm"
            style={{
              backgroundColor: 'var(--olive-green)',
              borderColor: 'var(--olive-green)'
            }}
          >
            Join Our Partners
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogos;
