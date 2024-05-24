import { Button, List } from 'antd';
import React from 'react';

interface NewsListProps {
  news: any[];
  onEdit: (news: any) => void;
  onDelete: (id: string) => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, onEdit }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={news}
      renderItem={item => (
        <List.Item
          actions={[
            <Button onClick={() => onEdit(item)}>Edit</Button>,
          ]}
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
