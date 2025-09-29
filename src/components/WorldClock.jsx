import React, { useState, useEffect } from "react";
import { Card, Typography, Select, List, Button, Space, Tag } from "antd";
import "antd/dist/reset.css";

const { Title, Text } = Typography;
const { Option } = Select;

const WorldClock = () => {
const allRegions = [
  "Asia/Tokyo",          
  "America/New_York",    
  "Asia/Dubai",          
  "Europe/London",       
  "Asia/Kolkata",        
  "America/Los_Angeles", 
  "Europe/Berlin",       
];

  const [currentTime, setCurrentTime] = useState(new Date());
  const [availableRegions, setAvailableRegions] = useState(allRegions);
  const [selectedRegions, setSelectedRegions] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSelect = (value) => {
    setSelectedRegions((prev) => [...prev, value]);
    setAvailableRegions((prev) => prev.filter((region) => region !== value));
  };

  const handleRemove = (region) => {
    setSelectedRegions((prev) => prev.filter((item) => item !== region));
    setAvailableRegions((prev) => [...prev, region]);
  };

  const handleReset = () => {
    setSelectedRegions([]); // clear selected
    setAvailableRegions(allRegions); // restore all regions
  };

  const getTimeInZone = (region) => {
    return currentTime.toLocaleString("en-US", { timeZone: region });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
      <Card
        style={{
          width: 450,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          🌍 World Clock
        </Title>

        {/* Dropdown & Reset Button */}
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
            width: "100%",
          }}
        >
          <Select
            placeholder="Select a region"
            style={{ width: 250 }}
            onChange={handleSelect}
            value={null}
          >
            {availableRegions.map((region) => (
              <Option key={region} value={region}>
                {region}
              </Option>
            ))}
          </Select>

          {/* Reset Button */}
          <Button
            danger
            onClick={handleReset}
            disabled={selectedRegions.length === 0}
          >
            Reset
          </Button>
        </Space>

        {/* List of Selected Regions */}
        {selectedRegions.length > 0 ? (
          <List
            bordered
            dataSource={selectedRegions}
            renderItem={(region) => (
              <List.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* Left side: region + time */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag color="blue" style={{ fontWeight: 500 }}>
                      {region}
                    </Tag>
                    <Text style={{ whiteSpace: "nowrap", fontWeight: 500 }}>
                      {getTimeInZone(region)}
                    </Text>
                  </div>

                  {/* Right side: Remove Button */}
                  <Button
                    type="link"
                    danger
                    style={{ marginLeft: 10 }}
                    onClick={() => handleRemove(region)}
                  >
                    ✖
                  </Button>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center" }}
          >
            No regions selected yet. Choose one above to start tracking time.
          </Text>
        )}
      </Card>
    </div>
  );
};

export default WorldClock;
