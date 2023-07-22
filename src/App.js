// Date: 09/04/2021
import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  
  Route,
  Routes
  
} from "react-router-dom";
export default class App extends Component{
  pageSize=6;
  render(){
    return(
      <div>
        <Router>
        <NavBar/>
        
        <Routes>
          <Route path='/News' element={<News key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
          <Route path='/' element={<News key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
        <Route path='/business' element={<News key='business' pageSize={this.pageSize} country='in' category='business' />}></Route>
        <Route path='/entertainment' element={<News key='entertainment' pageSize={this.pageSize} country='us' category='entertainment' />}></Route>
        <Route path='/general' element={<News key='general' pageSize={this.pageSize} country='in' category='general' />}></Route>
        <Route path='/science' element={<News key='science' pageSize={this.pageSize} country='in' category='science' />}></Route>
        <Route path='/sports' element={<News key='sports' pageSize={this.pageSize} country='in' category='sports' />}></Route>
        <Route path='/health' element={<News key='health' pageSize={this.pageSize} country='in' category='health' />}></Route>
        <Route path='/technology' element={<News key='technology' pageSize={this.pageSize} country='in' category='technology' />}></Route>

        </Routes>
        </Router>
      </div>
    )
  }
}