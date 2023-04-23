import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Button } from "antd";

declare global {
  interface Window {
    ProjectPlugin: {
      init: (container: HTMLDivElement) => void;
      one: (str: string) => string;
    };
  }
}

function ProjectB(): JSX.Element {
  return (
    <div>
      <h1>Hello from Project B!</h1>
      <Button>提交</Button>
    </div>
  );
}

window.ProjectPlugin = {
  init: (container) => {
    const root = ReactDOM.createRoot(container);
    root.render(<ProjectB />);
  },
  one: (str: string) => {
    return str + "BBB";
  },
};

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(<App />);
