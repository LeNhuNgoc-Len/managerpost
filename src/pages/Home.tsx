// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getNews } from '../services/api';
import './Home.css';

const { Header, Content } = Layout;

const Home: React.FC = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      setNews(response.data);
    };
    fetchNews();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="navigation">
          <Link to="/dashboard">
            <Button type="primary">Dashboard</Button>
          </Link>
          
        </div>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          {news.map((item: any) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <div className="image-container">
                    <img alt={item.title} src={item.img} />
                  </div>
                }
              >
                <Card.Meta title={item.title} description={item.content.substring(0, 100) + '...'} />
              </Card>
            </Col>
          ))}
        </Row>
        <div className="back-to-top">
          <Button type="primary" shape="circle" size="large" href="#top" icon={<i className="fas fa-arrow-up"></i>} />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
