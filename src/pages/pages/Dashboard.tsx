import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Modal, message } from 'antd';
import { getNews,addNews } from '../../services/api';
import NewsForm from '../../components/NewsForm';
import NewsList from '../../components/NewsList';


const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await getNews();
      setNews(response.data);
      setFilteredNews(response.data);
    } catch (error) {
      message.error('Failed to load news');
    }
  };

  const handleAdd = async (newsItem: any) => {
    try {
      await addNews(newsItem);
      setIsModalVisible(false);
      loadNews();
      message.success('News added successfully');
    } catch (error) {
      message.error('Failed to add news');
    }
  };


  const openModal = (newsItem = null) => {
    setEditingNews(newsItem);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setEditingNews(null);
    setIsModalVisible(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white' }}>News Dashboard</h1>

          <Button type="primary" onClick={() => openModal()}>Add News</Button>
          
        </div>
</Header>
      <Content style={{ padding: '20px' }}>
        <NewsList
          news={filteredNews}
          onEdit={(item) => openModal(item)}
          onDelete={handleAdd}
        />
      </Content>
      {isModalVisible && (
        <Modal
          title={editingNews ? "Edit News" : "Add News"}
          footer={null}
          onCancel={closeModal}
          visible={isModalVisible}
        >
          <NewsForm
            initialValues={editingNews !== null ? editingNews : {}}
            onSubmit={handleAdd}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default Dashboard;