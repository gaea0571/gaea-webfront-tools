/**
 * 【友情提示】:
 * 这是架构文件,每次都会根据模版文件重新生成,
 * 所以不要试图修改此文件
 * **/
import React from "react";
import ReactDOM from "react-dom";
import { EventEmitter } from "events";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { router_config, RootComponent } from "@/application.js";
import "./global.less";

const mount_container = document.createElement("div");
document.body.appendChild(mount_container);
const pravite_eventbus = new EventEmitter();


if (!window.location.pathname.startsWith(`/${process.env.NAMESPACE}`)) {
  window.location.pathname = process.env.NAMESPACE;
} else {
  ReactDOM.render((
    <div id={process.env.NAMESPACE}>
      <BrowserRouter basename={process.env.NAMESPACE}>
        <ConfigProvider
          getPopupContainer={() => (document.getElementById(process.env.NAMESPACE))}
        >
          <RootComponent custmerProps={{ eventbus: pravite_eventbus, mount_container }} />
        </ConfigProvider>
      </BrowserRouter>
    </div>
  ), mount_container);
};

