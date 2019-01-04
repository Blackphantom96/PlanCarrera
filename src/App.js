import React, { Component } from 'react';
import './App.css';
import {CourseButton} from './CourseButton'

import {sistemas,industrial} from './data/Programas'
import { Button } from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Semestre } from './semestres';

function copy(ob) {return JSON.parse(JSON.stringify(ob))}


function llenar(ob,flag,fun) {
  console.log(ob)
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
      semest : [],
      actualProgram: sistemas
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleClick3 = this.handleClick3.bind(this)
    this.handleClick4 = this.handleClick4.bind(this)
  }
  handleClick(x,y){
    let courseTemp = this.state.actualProgram.courses.find(function(e) { return e.x===x && e.y===y;})
    if(this.state.mode){
      courseTemp.state = courseTemp.state===0 ? 1 : 0
    }else{
      courseTemp.state = courseTemp.state===0 ? 2 : 0
    }
    this.setState((state)=>{
      return {courses:state.actualProgram.courses}
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

  handleClick4(e){
    this.setState((state)=>{
      return {courses : llenar(e.value,false,null),mode:true,semest:[],actualProgram:e.value}
    })
  }
  
  render() {
    const programs = [
      {label: 'Sistemas', value:sistemas},
      {label: 'Industrial', value:industrial}
    ]

   var list = llenar(this.state,true,this.handleClick)
   let label =this.state.mode?"Modo agregar materias vistas":"Modo planear semestre";
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
          <h3>1) Seleccionar las materias que aprobo</h3>
          <h3>2) Cambie el modo con el boton Modo </h3>
          <h3>3) Seleccione las materias que va a ver en los semestres, cuando termine pulse agregar</h3>
          <div className="center">
            <Dropdown style={{width:200}} value={this.state.courses} options={programs} onChange={this.handleClick4} placeholder="Seleccione un programa"/>
          </div>
        </div>
        
        <div className="container">
          <div className="container-items" >{list}</div>
          {!this.state.mode?<h1>{"Creditos: "+labelCreds}</h1>:""}

          <div><br/><Button label={label}  onClick={this.handleClick2}/></div>
          {!this.state.mode? <div><Button label="Agregar semestre" style={{marginTop:10}} onClick={this.handleClick3}/></div>:""}
          <div className="container-semest">
            {this.state.semest}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
