import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useData } from './../DataContext';  

const ItemDetail = () => {
  const { data } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = data.find(item => item.imdbID === id);

  if (!item) return <div className="item-not-found">Item not found</div>;

  return (
    <div className="item-detail-container">
      <Card className="item-detail-card">
        <Card.Header className="item-detail-header">{item.Title}</Card.Header>
        <Card.Body>
          {item.Poster !== 'N/A' && item.Poster ? (
            <Card.Img className='poster' src={item.Poster} />
          ) : null}
          <Card.Text>
            <strong>Year:</strong> {item.Year.slice(0, 4)}
          </Card.Text>
        </Card.Body>
        <Button variant="primary" onClick={() => navigate(-1)}>Back</Button>

      </Card>

    </div>
    
  );
};

export default ItemDetail;
