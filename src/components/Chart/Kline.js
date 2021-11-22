import React from "react";
import { DataFeed, widget } from "tradingview-api";

const INTERVAL = {
  1: { server: "1min", name: "1m" },
  5: { server: "5min", name: "5m" },
  15: { server: "15min", name: "15m" },
  30: { server: "30min", name: "30m" },
  60: { server: "60min", name: "1h" },
  1440: { server: "1day", name: "1D" },
  10080: { server: "1week", name: "1W" },
  302400: { server: "1mon", name: "1M" },
};

export default class KLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.datafeed = new DataFeed({
      getBars: this.fetchKlineData,
      fetchConfiguration: this.fetchConfig,
      fetchResolveSymbol: this.symbolConfig,
    });
  }
  fetchConfig = () => {
    return new Promise((resolve) => {
      resolve({
        supported_resolutions: Object.keys(INTERVAL),
      });
    });
  };

  fetchKlineData = async () => {
    const bars = [];
    const data = this.props.data;
    if (!data.t) {
      return { bars, meta: { noData: true } };
    } else {
      for (let i = 0; i < data.t.length; i++) {
        bars.push({
          time: data.t[i] * 1000,
          open: data.o[i],
          high: data.h[i],
          low: data.l[i],
          close: data.c[i],
          volume: data.v[i],
        });
      }
      bars.sort((l, r) => {
        l.time > r.time ? 1 : -1;
      });
      return { bars, meta: { noData: true } };
    }
  };

  symbolConfig = () => {
    return new Promise((resolve) => {
      const symbol = this.props.symbol.slice(0, -5);
      resolve({
        name: symbol,
        full_name: symbol,
        description: symbol,
        type: "stock",
        session: "24x7",
        exchange: "",
        listed_exchange: "",
        timezone: "Asia/Shanghai",
        format: "price",
        minmov: 1,
        pricescale: Math.pow(10, 1),
        has_intraday: true,
        has_weekly_and_monthly: true,
        supported_resolutions: Object.keys(INTERVAL),
        has_daily: true,
      });
    });
  };

  initTradingView = () => {
    this.widget = new widget({
      locale: "en",
      theme: "Dark",
      fullscreen: false,
      symbol: this.props.symbol.slice(0, -5),
      interval: "302400",
      container_id: "tv_chart_container",
      datafeed: this.datafeed,
      library_path: "/charting_library/",
      timezone: "Asia/Shanghai",
      enabled_features: ["hide_last_na_study_output"],
      disabled_features: [
        "volume_force_overlay",
        "header_resolutions",
        "header_compare",
        "header_undo_redo",
      ],
    });
    // this.widget
    //   .headerReady()
    //   .then(() => {
    //     this.buttons = [];
    //     for (let key in INTERVAL) {
    //       const item = INTERVAL[key];
    //       const button = this.widget.createButton();
    //       button.setAttribute("interval", key);
    //       button.textContent = item.name;
    //       button.addEventListener("click", () => this.onButtonClick(key));
    //       this.buttons.push(button);
    //     }
    //     this.addButtonColor();
    //   })
    //   .catch(() => {});
  };

  onButtonClick = (resolution) => {
    if (resolution === this.interval) {
      return;
    }
    this.widget.chart().setResolution(resolution, () => {
      {
        this.addButtonColor();
      }
    });
  };

  addButtonColor = () => {
    for (let button of this.buttons) {
      const interval = button.getAttribute("interval");
      if (interval === this.interval) {
        button.style.color = "#1878F3";
      } else {
        button.style.color = "#131722";
      }
    }
  };
  componentDidMount() {
    this.initTradingView();
  }

  componentWillUnmount() {
    this.widget && this.widget.remove();
  }

  render() {
    return (
      <div id="tv_chart_container" style={{ width: "100%", height: "100%" }} />
    );
  }
}
