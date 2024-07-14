

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';

const formatYear = (yearString) => {
  if (!yearString) return '';
  const year = yearString.trim().slice(0, 4);
  return year;
};

const ItemList = ({ items, viewType, onUpdateItem }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleTitleClick = (item) => {
    setEditingItemId(item.imdbID);
    setNewTitle(item.Title);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = (item) => {
    if (newTitle !== item.Title) {
      onUpdateItem({ ...item, Title: newTitle });
    }
    setEditingItemId(null);
  };

  return (
    <div className={viewType === 'grid' ? 'grid-view' : 'list-view'}>
      {items.map((item) => (
        <Card key={item.imdbID} style={{ width: '18rem' }}>
          {item.Poster !== 'N/A' && item.Poster ? (
            <Link to={`/item/${item.imdbID}`}>
              <Card.Img variant="top" src={item.Poster} />
            </Link>
          ) : null}
          <Card.Body>
            <Card.Title onClick={() => handleTitleClick(item)}>
              {editingItemId === item.imdbID ? (
                <Form.Control
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  onBlur={() => handleTitleBlur(item)}
                  autoFocus
                />
              ) : (
                <span>{item.Title}</span>
              )}
            </Card.Title>
            <Card.Text>
              Year: {formatYear(item.Year)}
            </Card.Text>
            {/* Other item details and update logic here */}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ItemList;
