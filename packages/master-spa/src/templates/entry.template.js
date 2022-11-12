/**
 * 【友情提示】:
 * 这是架构文件,每次都会根据模版文件重新生成,
 * 所以不要试图修改此文件
 * **/
import React from "react";
import ReactDOM from "react-dom";
import { start } from "single-spa";
import { EventEmitter } from "events";
import { BrowserRouter } from "react-router-dom";

import { RootComponent } from "@/application.js";

const target = document.createElement("div");
target.style = "width:100%;height:100%";
document.body.appendChild(target);

window.global_eventbus = new EventEmitter();

ReactDOM.render((
  <BrowserRouter>
    <RootComponent />
  </BrowserRouter>
), target, () => {
  start({ urlRerouteOnly: true });
});
