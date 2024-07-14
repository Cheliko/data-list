import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ItemDetail = ({ items }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = items.find(item => item.imdbID === id);

  if (!item) return <div>Item not found</div>;

  return (
    <Card>
      <Card.Header>{item.Title}</Card.Header>
      <Card.Body>
        {item.Poster !== 'N/A' && item.Poster ? (
          <Card.Img variant="top" src={item.Poster} />
        ) : null}
        <Card.Text>
          Year: {(item.Year).trim().slice(0, 4)}
        </Card.Text>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemDetail;
