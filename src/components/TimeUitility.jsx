import React, { useState } from "react";
import { Card, Tabs } from "antd";
import {
  ClockCircleOutlined,
  HourglassOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import StopeWatch from "./StopeWatch";
import Timer from "./Timer";
import WorldClock from "./WorldClock";

const { TabPane } = Tabs;

const TimeUitility = () => {
  const [activeTab, setActiveTab] = useState("stopwatch");

  return (
    <div>
      <Card
        title={
          <div style={{ textAlign: "center", fontSize: "40px" }}>
            Time Utiliti App
          </div>
        }
      >
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          centered
          tabBarGutter={40}
          size="large"
        >
          <TabPane
            tab={
              <span>
                <ClockCircleOutlined /> Stopwatch
              </span>
            }
            key="stopwatch"
          >
            <StopeWatch />
          </TabPane>
          <TabPane
            tab={
              <span>
                <GlobalOutlined /> World Clock
              </span>
            }
            key="worldclock"
          >
            <WorldClock />
          </TabPane>
          <TabPane
            tab={
              <span>
                <HourglassOutlined /> Timer
              </span>
            }
            key="timer"
          >
            <Timer />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimeUitility;
