import React, { ReactElement } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Button } from "antd-mobile";

declare global {
  interface Window {
    ProjectPlugin: CustomizePlugin;
  }
}

export interface IGood {
  _id: string;
  title: string;
  type: string;
  pic: string;
  price: number;
  fire?: string;
  label: string;
  createdAt: Date;
  storeNum: number;
}

// declare global {
//   interface Window {
//     ProjectPlugin: {
//       init: (container: HTMLDivElement) => void;
//       one: (str: string) => string;
//       three: string;
//     };
//   }
// }

// function ProjectB(): JSX.Element {
//   return (
//     <div>
//       <h1>Hello from Project B!</h1>
//       <Button>提交</Button>
//     </div>
//   );
// }

class CustomizePlugin {
  // 数据定制，包括显示和隐藏
  valueStore: {
    event: string;
    value: any;
  }[];

  // 模块定制
  domStore: {
    event: string;
    callback: (value: any) => any;
  }[];

  // 数据过滤
  filterStore: {
    event: string;
    callback: (value: any) => any;
  }[];

  // 同步事件
  syncEventStore: {
    event: string;
    callback: (value: any) => any;
  }[];

  // 异步事件
  asyncEventStore: {
    event: string;
    callback: (value: any) => any;
  }[];

  constructor() {
    this.valueStore = [];
    this.domStore = [];
    this.filterStore = [];
    this.syncEventStore = [];
    this.asyncEventStore = [];
  }

  setValueStore = (event: string, value: boolean) => {
    this.valueStore.push({
      event,
      value,
    });
  };
  setDomStore = (event: string, callback: (value: any) => any) => {
    this.domStore.push({
      event,
      callback,
    });
  };
  setFilterStore = (event: string, callback: (value: any) => any) => {
    this.filterStore.push({
      event,
      callback,
    });
  };
  setSyncEventStore = (event: string, callback: (value: any) => any) => {
    this.syncEventStore.push({
      event,
      callback,
    });
  };
  setAsyncEventStore = (event: string, callback: (value: any) => any) => {
    this.asyncEventStore.push({
      event,
      callback,
    });
  };
}

// class CustomizePlugin {
//   eventStore: {
//     event: string;
//     value: any;
//   }[];
//   constructor() {
//     this.eventStore = [];
//   }

//   setValueStore = (event: string, value: boolean) => {
//     this.eventStore.push({
//       event,
//       value,
//     });
//   };
//   setDomStore = (event: string, callback: (value: any) => any) => {
//     this.eventStore.push({
//       event,
//       value: callback,
//     });
//   };
//   setFilterStore = (event: string, callback: (value: any) => any) => {
//     this.eventStore.push({
//       event,
//       value: callback,
//     });
//   };
//   setSyncEventStore = (event: string, callback: (value: any) => any) => {
//     this.eventStore.push({
//       event,
//       value: callback,
//     });
//   };
//   setAsyncEventStore = (event: string, callback: (value: any) => any) => {
//     this.eventStore.push({
//       event,
//       value: callback,
//     });
//   };
// }

const projectPlugin = new CustomizePlugin();

projectPlugin.setValueStore("home.swiper.visible", false);

projectPlugin.setDomStore("home.waterfall.top", (ref) => {
  const element = <Button>提交</Button>;
  const anchor = ReactDOM.createRoot(ref);
  anchor.render(element);
});

projectPlugin.setFilterStore("home.waterfall.data", (items: IGood[]) => {
  const newItems = items.filter((item) => !item.title.includes("骆驼"));
  return newItems;
});

projectPlugin.setSyncEventStore("home.sortImage.click", (callback) => {
  console.log("AAA");
  callback();
});

window.ProjectPlugin = projectPlugin;

// window.ProjectPlugin = {
//   init: (container) => {
//     const root = ReactDOM.createRoot(container);
//     root.render(<ProjectB />);
//   },
//   one: (str: string) => {
//     return str + "BBB";
//   },
//   three: "UUU",
// };

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(<App />);
