import { Button, Input, Layout, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsForm from '../../components/NewsForm';
import NewsList from '../../components/NewsList';
import { addNews, deleteNews, getNews, updateNews } from '../../services/api';
import './Home.css';

const { Header, Content } = Layout;
const { Search } = Input;

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
      if (newsItem && newsItem.id) {
        console.log('Editing news item:', newsItem); // Log the news item
        const response = await updateNews(newsItem.id, newsItem);
        console.log('Update response:', response); // Log the response
        setEditingNews(null);
        setIsModalVisible(false);
        loadNews();
        message.success('News updated successfully');
      } else {
        throw new Error('Invalid news item or missing ID');
      }
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update news');
    }
  };
  

  const handleDelete = async (id: string) => {
    try {
      await deleteNews(id);
      loadNews();
      message.success('News deleted successfully');
    } catch (error) {
      message.error('Failed to delete news');
    }
  };

  const handleSearch = (value: string) => {
    const filtered = news.filter((item: any) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.content.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNews(filtered);
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
      <Header className="header">
        <Link to="/" type="primary" className="large-button">
          <h1><i className="fa-regular fa-newspaper"></i>&nbsp;&nbsp;News 24h</h1>
        </Link>
        <Search
          placeholder="Search news"
          onSearch={handleSearch}
          style={{ width: 500, height: 30 }}
        />
        <div className="navigation">
          <Button type="primary" className="large-button" style={{ paddingBottom: 30 }} onClick={() => openModal()}>
            <i className="fa-regular fa-folder-open"></i>&nbsp;&nbsp;
            + Add News
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '20px' }}>
        <NewsList
          news={filteredNews}
          onEdit={(item) => openModal(item)}
          onDelete={handleDelete}
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