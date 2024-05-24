import { Button, Card, Col, Input, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNews } from '../services/api';
import './Home.css';

const { Header, Content } = Layout;
const { Search } = Input;

const Home: React.FC = () => {
  const [news, setNews] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      setNews(response.data);
    };
    fetchNews();
  }, []);

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  const filteredNews = news.filter((item: any) =>
    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="navigation">
        <Link to={"/"}><h1 style={{ color: 'white', paddingRight: 250 }}><i className="fa-regular fa-newspaper"></i>&nbsp;&nbsp;News 24h</h1></Link>
          <Search
            placeholder="Search news"
            allowClear
            onSearch={handleSearch}
            style={{ width: 500, margin: 15 }}
          />
          <Link to="/dashboard">
            <Button type="primary">Dashboard</Button>
          </Link>
        </div>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          {filteredNews.map((item: any) => (
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
