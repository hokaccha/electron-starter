import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './app.css';

class App extends React.Component<any, any> {
  render() {
    return <div className="App">Hello Electron!</div>;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
