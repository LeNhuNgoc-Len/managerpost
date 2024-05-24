import { Button, Layout, Modal, message } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsForm from '../../components/NewsForm';
import NewsList from '../../components/NewsList';
import { addNews, deleteNews, getNews, updateNews } from '../../services/api';


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
    const lowercaseValue = value.toLowerCase();
    
    const filtered = news.filter((item: any) =>
      item.title.toLowerCase().includes(lowercaseValue) ||
      item.content.toLowerCase().includes(lowercaseValue)
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
      <Header>
      
        <div className="nav-dash" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'unset' }}>
          <Link to={"/"}><h1 style={{ color: 'white' }}><i className="fa-regular fa-newspaper"></i>&nbsp;&nbsp;News 24h</h1></Link>
          <Search placeholder="Search news" onSearch={handleSearch} style={{ width: 500, margin: 15}} />
          <Button type="primary" style={{ marginTop: 16, marginRight: -170 }} onClick={() => openModal()}>
            <i className="fa-regular fa-folder-open"></i>&nbsp;&nbsp;
              Add News</Button>
          <Link to="/">
            <Button type="primary"><i className="fa-solid fa-backward"></i>&nbsp;&nbsp;Home</Button>
          </Link>
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