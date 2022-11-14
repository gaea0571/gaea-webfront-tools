import { Space } from "antd";
import { NavLink } from "react-router-dom";
import React, { useState, useCallback } from "react";


import RegistryApplication from "@/elements/RegistryApplication";

export function RootComponent() {

  const [router_config, change_router] = useState([]);

  const handleChangeRouter = useCallback((current_router_config) => {
    change_router([...router_config, ...current_router_config]);
  }, [router_config]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Space>
        <NavLink to="/">主页</NavLink>
        <NavLink to="slave">前往slave子应用</NavLink>
      </Space>
      <div>
        <div>装载的子应用路由</div>
        <pre>{JSON.stringify(router_config, null, " ")}</pre>
      </div>
      {Object.keys(process.env.slave_application_list).map((namespace) => {
        return (
          <RegistryApplication
            key={namespace}
            namespace={namespace}
            resource={process.env.slave_application_list[namespace]}
            onRouterConfig={handleChangeRouter}
          />
        )
      })}
    </div>
  )
};