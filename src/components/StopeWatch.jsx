import React, { useState, useRef } from "react";
import { Card, Typography, Button, List, Pagination, Space } from "antd";

const { Title, Text } = Typography;

export default function StopeWatch() {
  // ------------------ TIMER STATE ------------------
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // ------------------ LAP'S STATE ------------------
  const [laps, setLaps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const lapsPerPage = 5;
  const startIndex = (currentPage - 1) * lapsPerPage;
  const endIndex = startIndex + lapsPerPage;
  const currentLaps = laps.slice(startIndex, endIndex);

  // ------------------ TIMER FUNCTIONS ------------------
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
  };

  const addLap = () => {
    setLaps((prev) => [...prev, time]);
  };

  const deleteLap = (indexToDelete) => {
    setLaps((prev) => {
      const updatedLaps = prev.filter((_, index) => index !== indexToDelete);
      const maxPage = Math.ceil(updatedLaps.length / lapsPerPage);
      if (currentPage > maxPage) setCurrentPage(maxPage || 1);
      return updatedLaps;
    });
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: '30px' }}>
      <Card
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          ⏱️ Stopwatch
        </Title>

        {/* TIMER DISPLAY */}
        <Title level={1} style={{ textAlign: "center", marginBottom: 20 }}>
          {formatTime(time)}
        </Title>

        {/* TIMER CONTROL BUTTONS */}
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {!isRunning ? (
            <Button type="primary" onClick={startTimer}>
              Start
            </Button>
          ) : (
            <Button danger onClick={pauseTimer}>
              Pause
            </Button>
          )}
          <Button onClick={resetTimer}>Reset</Button>
          <Button onClick={addLap} disabled={time === 0}>
            Lap
          </Button>
        </Space>

        {/* LAP LIST SECTION */}
        {laps.length > 0 && (
          <>
            <Title level={4} style={{ textAlign: "center" }}>
              Laps ({laps.length} total)
            </Title>

            <List
              bordered
              dataSource={currentLaps}
              renderItem={(lap, index) => {
                const lapNumber = startIndex + index + 1;
                return (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        danger
                        onClick={() => deleteLap(startIndex + index)}
                      >
                        ✖
                      </Button>,
                    ]}
                  >
                    <Text>
                      <strong>Lap {lapNumber}:</strong> {formatTime(lap)}
                    </Text>
                  </List.Item>
                );
              }}
              style={{ marginBottom: 10 }}
            />

            <Pagination
              current={currentPage}
              pageSize={lapsPerPage}
              total={laps.length}
              onChange={(page) => setCurrentPage(page)}
              style={{ textAlign: "center", marginTop: 10 }}
              size="small"
            />
          </>
        )}
      </Card>
    </div>
  );
}
