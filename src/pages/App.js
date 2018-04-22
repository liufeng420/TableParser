import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import excel2json from '../helpers/Excel2Json'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/pages/App.js</code> and save to reload.
        </p>
			{console.log("fuck me")}
		{
			excel2json.readSheet("../work/a.xlsx", "sheet1")
		}
		<p>sssssss</p>
      </div>
    );
  }
}

export default App;
