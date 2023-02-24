/* eslint-disable react/prop-types */
import { Button, Space } from "antd";
import { navigateToUrl } from "single-spa";
import React, { useCallback } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
import css from "./style.css";

export default function IndexPage(props) {

  const handleIndex = useCallback(() => {
    navigateToUrl("/");
  }, []);

  const handleApplication1 = useCallback(() => {
    navigateToUrl("/slave");
  }, []);

  return (
    <Space className={css.css_demo} style={{ width: "100%", marginBottom: 10 }}>
      <Button type="primary" onClick={handleIndex}>index</Button>
      <Button type="primary" onClick={handleApplication1}>app1</Button>
    </Space>
  )
};


IndexPage.propTypes = {


};
IndexPage.defaultProps = {


};