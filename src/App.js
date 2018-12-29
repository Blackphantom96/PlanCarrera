import React, { Component } from 'react';
import './App.css';
import {CourseButton} from './CourseButton'

import {sistemas} from './data/Programas'
import { Button } from 'primereact/button';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Semestre } from './semestres';

function copy(ob) {return JSON.parse(JSON.stringify(ob))}


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

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      courses : llenar(sistemas,false,null),
      mode:true,
      semest : []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleClick3 = this.handleClick3.bind(this)
  }
  handleClick(x,y){
    let courseTemp = sistemas.courses.find(function(e) { return e.x===x && e.y===y;})
    if(this.state.mode){
      courseTemp.state = courseTemp.state===0 ? 1 : 0
    }else{
      courseTemp.state = courseTemp.state===0 ? 2 : 0
    }
    this.setState((state)=>{
      return {courses:sistemas.courses}
    })
  }

  handleClick2(e){
    this.setState((state)=>{
      return {mode:!state.mode}
    })
  }

  handleClick3(e){
    let arr = []
    this.state.courses.forEach(element => {
      if(element.state>1){
        arr.push(element)
        element.state=1
      }
    });
    if(arr.length>0){
    this.setState((state)=>{
      return {semest: state.semest.concat(<Semestre cre={0} courses={arr}/>) }
    })}
  }

  render() {
   var list = llenar(this.state,true,this.handleClick)
   let label =this.state.mode?"Modo Vistas":"Modo Por ver";
   let labelCreds = 0
   this.state.courses.forEach(element => {
     if(element.state>1){
       labelCreds+=element.credits
     }
   });
    return (
      <div>
        <div style={{textAlign:"center"}}>
          <h1>Instrucciones:</h1>
          <h3>1) Seleccionar las materias que ya aprovo</h3>
          <h3>2) Cambie el modo con el boton Modo </h3>
          <h3>3) Selecciona las materias que va a ver en el semestre, cuando termine pulse agregar</h3>
        </div>
        <div className="container">
          <div className="container-items" >{list}</div>
          <h1>{"Creditos: "+labelCreds}</h1>
          <div><Button label={label}  onClick={this.handleClick2}/></div>
          {!this.state.mode? <div><Button label="Agregar" style={{marginTop:10}} onClick={this.handleClick3}/></div>:""}
          <div className="container-semest">
            {this.state.semest}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
