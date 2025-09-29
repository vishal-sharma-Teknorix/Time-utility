import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button, InputNumber, Space } from "antd";

const { Title } = Typography;

export default function Timer() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (remainingTime === 0) {
      const totalSeconds =
        parseInt(hours || 0) * 3600 +
        parseInt(minutes || 0) * 60 +
        parseInt(seconds || 0);

      if (totalSeconds <= 0) {
        alert("Enter values first!");
        return;
      }

      setRemainingTime(totalSeconds);
    }

    setIsRunning(true);
  };

  // const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(0);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    }

    if (remainingTime === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      alert("TimesUp");
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, remainingTime]);

  const displayHours = Math.floor(remainingTime / 3600);
  const displayMinutes = Math.floor((remainingTime % 3600) / 60);
  const displaySeconds = remainingTime % 60;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
      <Card
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          ⏱ Timer
        </Title>

        <Space
          style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
        >
          <InputNumber
            min={0}
            placeholder="Hours"
            value={hours}
            onChange={(value) => setHours(value)}
            style={{ width: 80 }}
          />
          <InputNumber
            min={0}
            placeholder="Minutes"
            value={minutes}
            onChange={(value) => setMinutes(value)}
            style={{ width: 80 }}
          />
          <InputNumber
            min={0}
            placeholder="Seconds"
            value={seconds}
            onChange={(value) => setSeconds(value)}
            style={{ width: 80 }}
          />
        </Space>

        <Title
          level={1}
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontFamily: "monospace",
            letterSpacing: 2,
          }}
        >
          {displayHours.toString().padStart(2, "0")}:
          {displayMinutes.toString().padStart(2, "0")}:
          {displaySeconds.toString().padStart(2, "0")}
        </Title>

        <Space style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" onClick={startTimer}>
            {remainingTime > 0 && !isRunning ? "Resume" : "Start"}
          </Button>
          {/* <Button onClick={pauseTimer} disabled={!isRunning}>
            Pause
          </Button> */}
          <Button danger onClick={resetTimer}>
            Reset
          </Button>
        </Space>
      </Card>
    </div>
  );
}
