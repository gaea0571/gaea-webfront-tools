import React from "react";
import { Space } from "antd";
import { NavLink } from "react-router-dom";

import RegistryApplication from "@/elements/RegistryApplication";

export function RootComponent() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Space>
        <NavLink to="/">主页</NavLink>
        <NavLink to="slave">前往slave子应用</NavLink>
      </Space>
      {Object.keys(process.env.slave_application_list).map((namespace) => {
        return (
          <RegistryApplication
            key={namespace}
            namespace={namespace}
            resource={process.env.slave_application_list[namespace]}
            onRouterConfig={(router_config) => console.log(router_config)}
          />
        )
      })}
    </div>
  )
};