import { useState, useEffect } from "react";
import { Card, Typography, Select, List, Button, Space, Tag} from "antd";

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
  const [regionValue, setRegionValue] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSelect = (value) => {
    setRegionValue(value);
  };

  const handleSubmit = () => {
    if (!regionValue) {
      alert("Please select a region first!");
      return;
    }
    if (selectedRegions.includes(regionValue)) {
      alert("This country clock already added, please choose a different option.");
      return;
    }
    setSelectedRegions((prev) => [...prev, regionValue]);
    // setAvailableRegions((prev) => prev.filter((region) => region !== regionValue));
    setRegionValue(null);
  };

  const handleRemove = (region) => {
    setSelectedRegions((prev) => prev.filter((item) => item !== region));
    setAvailableRegions((prev) => [...prev, region]);
  };

  const handleReset = () => {
    setSelectedRegions([]);
    setAvailableRegions(allRegions);
    setRegionValue(null);
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
            value={regionValue}
            onChange={handleSelect}
          >
            {availableRegions.map((region) => (
              <Option key={region} value={region}>
                {region}
              </Option>
            ))}
          </Select>

          <Button type="primary" onClick={handleSubmit}>
            Add Time
          </Button>

          <Button
            danger
            onClick={handleReset}
            disabled={selectedRegions.length === 0}
          >
            Reset
          </Button>
        </Space>
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
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag color="blue" style={{ fontWeight: 500 }}>
                      {region}
                    </Tag>
                    <Text style={{ whiteSpace: "nowrap", fontWeight: 500 }}>
                      {getTimeInZone(region)}
                    </Text>
                  </div>

                  <Button
                    type="link"
                    style={{ marginLeft: 10 }}
                    onClick={() => handleRemove(region)}
                  >
                    ❌
                  </Button>
                </div>
              </List.Item>
            )}
          />
      </Card>
    </div>
  );
};

export default WorldClock;
