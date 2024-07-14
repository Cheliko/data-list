import React from "react";
import { Tabs, Tab } from "react-bootstrap";

const TypeTabs = ({ activeTab, setActiveTab, data, categories }) => {
  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
      className="flex-column"
    >
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
  );
};

export default TypeTabs;
