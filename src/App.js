import React, { Component } from 'react';
import './App.css';
import {CourseButton} from './CourseButton'

import {sistemas} from './data/Programas'
import { Button } from 'primereact/button';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function llenar(ob,flag,fun) {
  let res=[]
  ob.courses.sort(function(a,b) {
    return a.x - b.x === 0 ? a.y - b.y : a.x - b.x;
  })
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let course = ob.courses.find(function(e) { return e.x===j && e.y===i;})
      if(flag){
      if(course){
        res.push(<CourseButton onClick={fun} key={i+"-c-"+j} course={course}/>)
      }
      else{
        res.push(<div key={i+""+j} className="item"></div>)
      }}
      else{
        if(course){
          res.push(course)
        }
      }
    }
  }
  return res;
}

function copy(ob) {return JSON.parse(JSON.stringify(ob))}

function preIsOk(syllabus,pre) {
  let flag = true
  pre.forEach(element => {
    let course = syllabus.find(function (e){return e.nemo===element})
    if(!course.pass){
      flag = false;
    }
  });
  return flag;
}

function getAllCourses(syllabus) {
  let res = []
  syllabus.forEach(element => {
    if(!element.pass && preIsOk(syllabus,element.preReq)){
      res.push(copy(element))
    }
  });
  return res;
}

function getCombinations(arr, k){
  var i,
  subI,
  ret = [],
  sub,
  next;
  for(i = 0; i < arr.length; i++){
      if(k === 1){
          ret.push( [ arr[i] ] );
      }else{
          sub = getCombinations(arr.slice(i+1, arr.length), k-1);
          for(subI = 0; subI < sub.length; subI++ ){
              next = sub[subI];
              next.unshift(arr[i]);
              ret.push( next );
          }
      }
  }
  return ret;
}

function getAllCombinations(courses,maxCredits,minCredits) {
  let res=[]
  let combinations = []
  for (let i = 1; i <= courses.length; i++) {
    combinations = combinations.concat(getCombinations(courses,i))
  } 
  combinations.forEach(element => {
    let sumCred = 0;
    element.forEach(e => {
      sumCred+=e.credits;
    }); 
    if(sumCred>=minCredits && sumCred<=maxCredits){
      res.push(element);
    }
  });
  return res;
}

function markAsOk(syllabus,courses) {
  courses.forEach(element => {
    syllabus.find(function (e) {
      return e.nemo===element.nemo
    }).pass=true;
  });
  return syllabus;
}

function solve(syllabus,xx) {
  let courses = getAllCourses(syllabus);
  let creditsTotalSum = 0;
  syllabus.forEach(element => {
    if(!element.pass){
      creditsTotalSum+=element.credits;
    }
  });
  if(creditsTotalSum===0){
    return xx;
  }
  else{
    let combinations = getAllCombinations(courses,21,1);
    let posSolves = []
    combinations.forEach(element => {
      posSolves.push(markAsOk(copy(syllabus),element))
    });
    let realPosSolve = []
    let solution = []
    let min=12
    for (let i = 0; i < posSolves.length; i++) {
      let posSolve = posSolves[i];
      let posComb = combinations[i];
      let temporal = xx.concat([posComb])
      let temp2 = solve(posSolve,temporal)
      realPosSolve.push(temp2)
    }
    realPosSolve.forEach(posSolve => {
      if(posSolve.length<min){
        min=posSolve.length;
        solution=posSolve;
      }
    });
    return solution;
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      courses : llenar(sistemas,false,null)
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
  }
  handleClick(x,y){
   let courseTemp = sistemas.courses.find(function(e) { return e.x===x && e.y===y;})
   courseTemp.pass = !courseTemp.pass
   this.setState((state)=>{
     return {courses:sistemas.courses}
   })
  }

  handleClick2(){
    let x=[]
    console.log("solve",solve(copy(this.state.courses),x))
    console.log("solve2",x)
  }

  render() {
   var list = llenar(this.state,true,this.handleClick)
    return (
      <div className="container">
        <div className="container-items" >{list}</div>
        <div><Button label="ok" onClick={this.handleClick2}/></div>
      </div>
    );
  }
}

export default App;
