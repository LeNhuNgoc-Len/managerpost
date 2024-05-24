import { Button, Layout, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';
import { addNews, getNews, updateNews } from '../services/api';


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

  const handleEdit = async (newsItem: any) => {
    try {
      console.log("Editing News Item:", newsItem);
      if (newsItem && newsItem.id) {
        await updateNews(newsItem.id, newsItem);
        setEditingNews(null);
        setIsModalVisible(false);
        loadNews();
        message.success('News updated successfully');
      } else {
        throw new Error('Invalid news item or missing ID');
      }
    } catch (error) {
      message.error('Failed to update news');
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
          onDelete={handleEdit}
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
            onSubmit={editingNews ? handleEdit : handleAdd}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default Dashboard;