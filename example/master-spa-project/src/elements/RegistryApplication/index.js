/* eslint-disable react/prop-types */
import axios from "axios";
import { mountRootParcel } from "single-spa";
import React, { useRef, useEffect } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export default function RegistryApplication({ namespace, resource, debug, onRouterConfig, onReceiveData }) {

  const mount_container = useRef();

  useEffect(() => {
    /** 监听随从发送的路由配置 **/
    window.global_eventbus.on("router_config", (message) => {
      const { namespace: message_name } = JSON.parse(message);
      if (message_name === namespace) {
        onRouterConfig(JSON.parse(message));
      };
    });
    /** 监听随从发送的信息 **/
    window.global_eventbus.on("data", (message) => {
      const { namespace: message_name } = JSON.parse(message);
      if (message_name === namespace) {
        onReceiveEvent(JSON.parse(message));
      };
    });
  }, [onRouterConfig, onReceiveData]);

  useEffect(() => {
    (async () => {
      const host_string = resource.replace("manifest.json", "");
      const { data } = await axios({
        method: "GET",
        url: resource,
        responseType: "json"
      });
      const entry_js = [host_string, data["main.js"]].join("");
      const entry_css = [host_string, data["main.css"]].join("");
      /** 挂载css样式表 **/
      const style_sheet_element = document.createElement("link");
      style_sheet_element.type = "text/css";
      style_sheet_element.rel = "stylesheet";
      style_sheet_element.href = entry_css;
      mount_container.current.parentNode.appendChild(style_sheet_element);
      /** 加载JavaScriptSystem模块 **/
      mountRootParcel(System.import(entry_js), {
        debug,
        eventbus: window.global_eventbus,
        domElement: mount_container.current
      });
    })();

  }, []);

  return (
    <div ref={mount_container} className="mounted" style={{ width: "100%" }} />
  )
};


RegistryApplication.propTypes = {


};
RegistryApplication.defaultProps = {
  debug: false,
  onRouterConfig() { },
  onReceiveData() { }
};