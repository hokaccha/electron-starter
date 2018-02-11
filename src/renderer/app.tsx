import "font-awesome/css/font-awesome.css";
import "./app.css";
import sqlite3 from "sqlite3";
import React from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";

class App extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <h1>
          Hello Electron <i className="fa fa-thumbs-o-up" />
        </h1>
        <Button onClick={() => this.handleClickButton()}>Click me!</Button>

        <ul>
          <li>
            env: <span id="AppEnv">{process.env.APP_ENV || "development"}</span>
          </li>
          <li>sqlite3: {sqlite3.VERSION}</li>
        </ul>
      </div>
    );
  }

  handleClickButton() {
    console.log("clicked!"); // eslint-disable-line no-console
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app"));
});
