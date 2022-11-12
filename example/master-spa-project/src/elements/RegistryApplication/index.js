/* eslint-disable react/prop-types */
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
      const { namespace: message_name, router_config } = JSON.parse(message);
      if (message_name === namespace) {
        onRouterConfig(router_config);
      };
    });
    /** 监听随从发送的信息 **/
    window.global_eventbus.on("data", (message) => {
      const { namespace: message_name, data } = JSON.parse(message);
      if (message_name === namespace) {
        onReceiveEvent(data);
      };
    });
  }, [onRouterConfig, onReceiveData]);

  useEffect(() => {
    mountRootParcel(System.import(resource), {
      debug,
      resource,
      eventbus: window.global_eventbus,
      domElement: mount_container.current
    });
  });

  return (
    <div ref={mount_container} className="mounted" style={{ width: "100%", height: "100%" }} />
  )
};


RegistryApplication.propTypes = {


};
RegistryApplication.defaultProps = {
  debug: false,
  onRouterConfig() { },
  onReceiveData() { }
};