import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toast, NoticeBar } from "antd-mobile";

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

  setValueStore = (event: string, value: any) => {
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

const projectPlugin = new CustomizePlugin();

// Plugin 首页样式定制
projectPlugin.setValueStore("home.page.style", {
  background: "linear-gradient(to bottom, rgb(255, 200, 0), #eee)",
});

//  Plugin 轮播图显示或隐藏
projectPlugin.setValueStore("home.swiper.visible", false);

// Plugin 瀑布流商品展示模块上边区域
projectPlugin.setDomStore("home.waterfall.top", (ref) => {
  const element = (
    <NoticeBar
      content="这条通知可以关闭，这是一条通知，这是一条通知，这是一条通知，这是一条通知"
      style={{ marginBottom: "10px" }}
      color="alert"
      closeable
    />
  );
  const anchor = ReactDOM.createRoot(ref);
  anchor.render(element);
});

// Plugin 首页瀑布流数据过滤
projectPlugin.setFilterStore("home.waterfall.data", (items: IGood[]) => {
  const newItems = items.filter((item) => !item.title.includes("骆驼"));
  return newItems;
});

// Plugin 首页分类图片点击事件定制
projectPlugin.setSyncEventStore("home.sortImage.click", (callback) => {
  Toast.show({
    icon: "success",
    content: "跳转成功",
  });
  callback();
});

window.ProjectPlugin = projectPlugin;
