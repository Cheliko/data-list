import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";

const isValidImageUrl = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const ItemCard = ({ item, onUpdateItem }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isImageValid, setIsImageValid] = useState(true);

  useEffect(() => {
    const checkImageUrl = async () => {
      const valid = await isValidImageUrl(item.Poster);
      setIsImageValid(valid);
    };

    if (item.Poster !== "N/A" && item.Poster) {
      checkImageUrl();
    } else {
      setIsImageValid(false);
    }
  }, [item.Poster]);

  const handleTitleClick = (item) => {
    setEditingItemId(item.imdbID);
    setNewTitle(item.Title);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = async (item) => {
    if (newTitle !== item.Title) {
      try {
        console.log("Updating item:", item); // Log item data
        await onUpdateItem({ ...item, Title: newTitle });
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
    setEditingItemId(null);
  };

  const isEditing = editingItemId === item.imdbID;
  
  return (
    <Card key={item.imdbID} className="card" style={{ width: "100%" }}>
      {isImageValid && (
        <Link to={`/item/${item.imdbID}`}>
          <Card.Img variant="top" src={item.Poster} className="card-img-top" />
        </Link>
      )}
      <Card.Body className="card-body">
        <Card.Title onClick={() => handleTitleClick(item)}>
          {isEditing ? (
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
        <Card.Text>Year: {item.Year.slice(0, 4)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
