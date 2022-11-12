/* eslint-disable react/prop-types */
import { Button, Space, Modal } from "antd";
import React, { useRef, useState, useEffect } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
import css from "./style.less";

export default function TestPage(props) {

  const swap_value = useRef(0);

  const [open_status, change_open_status] = useState(false);
  const [current_value, set_start_value] = useState(swap_value.current);

  useEffect(() => {
    const timmer = setInterval(() => {
      swap_value.current = swap_value.current + 1;
      set_start_value(swap_value.current);
    }, 1000);
    return () => {
      clearInterval(timmer);
      console.log("done");
    }
  }, []);

  return (
    <div className={css.test_container}>
      <Space>
        <Button type="primary">当前计数为{current_value}</Button>
        <Button type="primary" onClick={() => change_open_status(true)}>开启弹窗</Button>
      </Space>
      <Modal open={open_status} title="测试弹框" onCancel={() => change_open_status(false)}></Modal>
    </div>
  )
};


TestPage.propTypes = {


};
TestPage.defaultProps = {


};