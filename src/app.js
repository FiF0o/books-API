import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <button onClick={() => console.log('click')} >click</button>
      </div>
    )
  }
}
