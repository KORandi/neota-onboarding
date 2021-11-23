import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlashMessage from '../component/FlashMessage';
import DataFilter from '../component/Forms/DataFilter';
import Header from '../component/Header';

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
        <DataFilter />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
