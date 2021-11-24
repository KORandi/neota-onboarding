import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlashMessage from '../components/FlashMessage';
import DataEntry from '../components/Forms/DataEntry';
import DataFilter from '../components/Forms/DataFilter';
import Header from '../components/Header';

interface IDefaultLayoutProps {
  title: string,
}

const DefaultLayout: React.FunctionComponent<IDefaultLayoutProps> = function ({ title, children }) {
  useEffect(() => {
    const pageName = 'Neota Weather Watcher';
    document.title = title ? `${pageName} - ${title}` : pageName;
  });

  return (
    <>
      <Header />
      <FlashMessage duration={5000} />
      <div className="pt-3">
        <Container>
          <Row>
            <Col>
              <h1>
                {title}
              </h1>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-end pt-3">
            <Col>
              <div className="d-flex justify-content-end">
                <div>
                  <DataFilter />
                </div>
                <div className="ms-3">
                  <DataEntry />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
