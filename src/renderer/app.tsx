import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './components/Button';

import './app.css';

class App extends React.Component<any, any> {
  render() {
    return <div className="App">
      <h1>Hello Electron!</h1>
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
