import React from 'react';
import { List, Button } from 'antd';

interface NewsListProps {
  news: any[];
  onEdit: (news: any) => void;
  onDelete: (id: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, onEdit, onDelete }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={news}
      renderItem={item => (
        <List.Item
          
        >
          <List.Item.Meta
            title={item.title}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};

export default NewsList;
