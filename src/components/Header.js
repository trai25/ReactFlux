import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Message,
  Space,
  Tooltip,
} from "@arco-design/web-react";
import {
  IconMenu,
  IconMoonFill,
  IconPlus,
  IconPoweroff,
  IconSettings,
  IconSunFill,
  IconUser,
} from "@arco-design/web-react/icon";
import { useNavigate } from "react-router-dom";

import { useStore } from "../Store";
import { applyColor } from "../utils/Colors";

export default function Header({ theme }) {
  const navigate = useNavigate();
  const setVisible = useStore((state) => state.setVisible);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const collapsed = useStore((state) => state.collapsed);
  const setCollapsed = useStore((state) => state.setCollapsed);

  const handleLogout = () => {
    localStorage.clear();
    document.body.removeAttribute("arco-theme");
    applyColor("Blue");
    navigate("/login");
    Message.success("logout");
  };

  return (
    <div
      className="header"
      style={{
        borderBottom: "1px solid var(--color-border-2)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        width: "calc(100% - 240px)",
        right: 0,
        transition: "width 0.1s linear",
        height: "48px",
        zIndex: "999",
        backgroundColor: "var(--color-bg-1)",
      }}
    >
      <div
        className="brand"
        style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
      >
        <Button
          shape="circle"
          size="small"
          className="trigger"
          style={{ marginRight: "5px", display: "none" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {<IconMenu />}
        </Button>
      </div>
      <div className="button-group" style={{ marginRight: "10px" }}>
        <Space size={16}>
          <Tooltip content="Add feed" mini>
            <Button
              shape="circle"
              size="small"
              type="primary"
              icon={<IconPlus />}
              onClick={() => setVisible("addFeed", true)}
            />
          </Tooltip>
          <Button
            shape="circle"
            size="small"
            icon={theme === "dark" ? <IconSunFill /> : <IconMoonFill />}
            onClick={toggleTheme}
          />
          <Dropdown
            droplist={
              <Menu>
                <Menu.Item key="0" onClick={() => setVisible("settings", true)}>
                  <IconSettings
                    style={{
                      marginRight: 8,
                      fontSize: 16,
                      transform: "translateY(1px)",
                    }}
                  />
                  Settings
                </Menu.Item>
                <Menu.Item key="1" onClick={handleLogout}>
                  <IconPoweroff
                    style={{
                      marginRight: 8,
                      fontSize: 16,
                      transform: "translateY(1px)",
                    }}
                  />
                  Logout
                </Menu.Item>
              </Menu>
            }
            trigger="click"
            position="br"
          >
            <Avatar size={28} style={{ cursor: "pointer" }}>
              <IconUser />
            </Avatar>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
}
