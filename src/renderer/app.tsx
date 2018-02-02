import "font-awesome/css/font-awesome.css";
import "./app.css";
import React from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";

class App extends React.Component<any, any> {
  render() {
    return <div className="App">
      <h1>Hello Electron <i className="fa fa-thumbs-o-up" /></h1>
      <Button onClick={e => this.handleClickButton()}>Click me!</Button>
    </div>;
  }

  handleClickButton() {
    console.log('clicked!');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
