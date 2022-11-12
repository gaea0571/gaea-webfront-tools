/**
 * 【友情提示】:
 * 这是架构文件,每次都会根据模版文件重新生成,
 * 所以不要试图修改此文件
 * **/
import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { beforeWillFirstMount, beforeUpdate, router_config, RootComponent } from "@/application.js";

import "./global.less";

if (router_config) {
  window.global_eventbus.emit("router_config", JSON.stringify({
    namespace: process.env.NAMESPACE,
    router_config
  }));
};

const style_sheet_element = document.createElement("link");
style_sheet_element.type = "text/css";
style_sheet_element.rel = "stylesheet";

export async function bootstrap(custmerProps) {
  const { debug, resource } = custmerProps;
  debug && console.log("tigger bootstrap");
  style_sheet_element.href = resource.replace(".js", ".css");
  document.body.appendChild(style_sheet_element);
  if (beforeWillFirstMount) {
    await beforeWillFirstMount(custmerProps);
  };
};

export async function mount(custmerProps) {
  const { debug, domElement } = custmerProps;
  debug && console.log("tigger mount");
  ReactDOM.render((
    <div id={process.env.NAMESPACE}>
      <BrowserRouter basename={process.env.NAMESPACE}>
        <ConfigProvider
          prefixCls={process.env.NAMESPACE}
          iconPrefixCls={process.env.NAMESPACE}
          getPopupContainer={() => (document.getElementById(process.env.NAMESPACE))}
        >
          <RootComponent custmerProps={custmerProps} />
        </ConfigProvider>
      </BrowserRouter>
    </div>
  ), domElement);
};

export async function update(custmerProps) {
  const { debug } = custmerProps;
  debug && console.log("tigger update");
  if (beforeUpdate) {
    await beforeUpdate(custmerProps);
  };
};

export async function unmount(custmerProps) {
  const { debug, domElement } = custmerProps;
  debug && console.log("tigger unmount");
  style_sheet_element.parentNode.removeChild(style_sheet_element);
  ReactDOM.unmountComponentAtNode(domElement);
};