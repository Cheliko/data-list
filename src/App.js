import React, { useEffect, useState, useMemo } from "react";
import { fetchData, updateItem } from "./services/api";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { DataProvider, useData } from "./DataContext";
import ItemList from "./components/ItemList";
import TypeTabs from "./components/TypeTabs";
import "./App.css";

const App = () => {
  const { data, setData } = useData();
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
        console.log("Data set in context:", result); // Log data set in context
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

  const filteredData = useMemo(() => {
    return data
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
  }, [data, searchTerm, sortOrder]);

  const categories = useMemo(() => {
    return [...new Set(data.map((item) => item.Type))];
  }, [data]);

  const getFilteredItems = useMemo(() => {
    if (activeTab === "all") {
      return filteredData;
    }
    return filteredData.filter((item) => item.Type === activeTab);
  }, [filteredData, activeTab]);

  return (
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
            <Col md={4} className="d-flex gap-2">
              <Button onClick={clearSearch}>Clear</Button>
              <Button onClick={loadData}>Refresh</Button>
              <Button onClick={toggleSortOrder}>Sort</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <TypeTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            data={data}
            categories={categories}
          />
          <Button onClick={toggleViewType} className="mt-3">
            Change View
          </Button>
        </Col>
        <Col md={9}>
          <ItemList
            items={getFilteredItems}
            viewType={viewType}
            onUpdateItem={handleUpdateItem}
            className="mt-3"
          />
        </Col>
      </Row>
    </Container>
  );
};

const AppWithProvider = () => <App />;

export default AppWithProvider;
