import React from "react";
import { message, notification } from "antd";
import { Routes, Route } from "react-router-dom";

import TestPage from "@/pages/TestPage";


/** 应用未挂载之前需要执行的操作可以通过这个hook实现 **/
export async function beforeWillFirstMount() {
  // message.loading({ key: "beforeFirstMount", content: "正在读取字典...", duration: 0 });
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // message.success({ key: "beforeFirstMount", content: "字典读取成功", duration: 0 });
  // notification.success({
  //   duration: 0,
  //   message: 'Notification Title',
  //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  // });
};

export async function beforeUpdate() {
  // console.log("updating....");
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // console.log("updated");
};

/** 主框架显示的路由配置 **/
export const router_config = [{
  name: "路由1",
  href: "/path1",
  icon: "MenuUnfoldOutlined"
}, {
  name: "路由2",
  href: "/path2",
  icon: "PicRightOutlined"
}];

/** 交给主框架渲染的根节点 **/
export function RootComponent({ custmerProps }) {
  /** custmerProps是主框架透传的属性 **/
  return (
    <Routes>
      <Route path="/" element={(<TestPage />)} />
    </Routes>
  );
};



