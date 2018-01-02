import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component<any, any> {
  render() {
    return <div>Hello Electron!</div>;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
