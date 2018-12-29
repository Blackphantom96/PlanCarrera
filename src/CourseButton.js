import React from 'react';
import {Button} from 'primereact/button';

export class CourseButton extends React.Component{
  constructor(props){
    super(props)
    this.state={
      "x": this.props.course.x,
      "y": this.props.course.y,
      "nemo": this.props.course.nemo,
      "credits": this.props.course.credits,
      "preReq": this.props.course.preReq,
      "pass":this.props.course.pass
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick = () =>{
    this.props.onClick(this.state.x,this.state.y);
    this.setState((state) =>{
      return {pass : !state.pass};
    })
    
  }
  render() {
    let courseString = this.state.nemo+"("+this.state.credits+")"
    return (
      <div className="course-button">
        <Button key={this.state.nemo} className={this.state.pass?"true":"false"} label={courseString} onClick={this.handleClick}/>
      </div>
    );
  }
}