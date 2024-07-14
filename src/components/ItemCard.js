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
  const [isEditing, setEditing] = useState(false);
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
    setEditing(true);
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
    setEditing(false);
  };

  return (
    <Card key={item.imdbID} className="card">
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
