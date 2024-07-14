import React, { useEffect, useState } from "react";
import { fetchData, updateItem } from "./services/api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col, Tabs, Tab, Button, Form } from "react-bootstrap";
import ItemList from "./components/ItemList";
import ItemDetail from "./components/ItemDetail";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("list");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeTab, setActiveTab] = useState("all");

  const loadData = async () => {

    try {
      const result = await fetchData();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Data is not an array:", result);
        setError(new Error("Data is not an array"));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleViewType = () => {
    setViewType(viewType === "list" ? "grid" : "list");
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleUpdateItem = async (item) => {
    try {
      await updateItem(item);
      loadData();
    } catch (error) {
      console.error("Error updating item:", error);
      setError(error);
    }
  };

  const filteredData = data
    .filter((item) => {
      const title = item.Title ? item.Title.toLowerCase() : "";
      const year = item.Year ? item.Year.slice(0, 4) : "";
      return (
        title.includes(searchTerm.toLowerCase()) || year.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Title.localeCompare(b.Title);
      } else {
        return b.Title.localeCompare(a.Title);
      }
    });

  const categories = [...new Set(data.map((item) => item.Type))];

  return (
    <Router>
    <Container className="container">
      {error && <div className="alert alert-danger">{error.message}</div>}
      <Row className="mb-3">
        <Col md={9} className="ml-auto">
          <Row>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={4}>
              <Button onClick={clearSearch}>Clear</Button>{" "}
              <Button onClick={loadData}>Refresh</Button>{" "}
              <Button onClick={toggleSortOrder}>Sort</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Tab eventKey="all" title={`All (${data.length})`}></Tab>
            {categories.map((category) => (
              <Tab
                eventKey={category}
                title={`${category} (${
                  data.filter((item) => item.Type === category).length
                })`}
                key={category}
              ></Tab>
            ))}
          </Tabs>
          <Button onClick={toggleViewType} className="mt-3">
            Change View
          </Button>
        </Col>
        <Col md={9}>
          {activeTab === "all" ? (
            <ItemList
              items={filteredData}
              viewType={viewType}
              onUpdateItem={handleUpdateItem}
              className="mt-3"
            />
          ) : (
            <ItemList
              items={filteredData.filter((item) => item.Type === activeTab)}
              viewType={viewType}
              onUpdateItem={handleUpdateItem}
              className="mt-3"
            />
          )}
        </Col>
      </Row>

      <Routes>
        <Route path="/item/:id" element={<ItemDetail items={data} />} />
      </Routes>
    </Container>
  </Router>
  
  );
};

export default App;
