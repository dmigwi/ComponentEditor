const jQuery = require("jquery");
window.jQuery = jQuery;

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "./header";
import { Block } from "./block.js";
import Home from "./home.js";
import { cacheData } from "./controller.js";
import { Tooltip as ReactTooltip } from "react-tooltip";

import "bootstrap/dist/css/bootstrap.css";
import "./form.css";
import "react-toastify/dist/ReactToastify.css";


function WithHooks(WrappedComponent) {
  return function(props) {
    const { block } = useParams();
   
    const [state, setState] = useState({
      activeBlock: block,
      cachedData: {
        blocks: [],
        parts: [],
        coders: [],
        blocksData: [],
        controllers: []
      }
    });
    return (
      < WrappedComponent state={state} setState={setState} {...props} />
    );
  };
}
class App extends React.Component {

  constructor(props) {
    super(props);
  
    this.refreshData = this.refreshData.bind(this);
    this.refreshData();
  }

  refreshData() {
    const { state, setState } = this.props;
    analytics.page();

    cacheData().then(cachedData => {
      setState({
        ...state,
        'cachedData': cachedData 
      });
    });
  }


  render() {
    const { state } = this.props;
    // console.log(" >>>>> PROPPPS <<<< ", this.props);
    return (
      <BrowserRouter>
        <React.Fragment>
          <Routes>
            <Route path="/" element={<Header {...state} />}>
              <Route
                index={true}
                element={<Home cachedData={state.cachedData}  refreshData={this.refreshData} />} 
                />
            </Route>
            <Route path="/:block" element={<Header {...state} />}>
              <Route
                index={true}
                element={<Block id="block" cachedData={state.cachedData} activeBlock={state.activeBlock} />}
                />
            </Route>
          </Routes>
          <ToastContainer hideProgressBar={true} />
          <ReactTooltip
            html={true}
            delayHide={1000}
            className="form-tooltip"
            effect="solid"
            place="right"
            />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App = WithHooks(App);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
