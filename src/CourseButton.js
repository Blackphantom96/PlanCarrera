import React from 'react';
import {Button} from 'primereact/button';
import {Tooltip} from 'primereact/tooltip';

export class CourseButton extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      tooltipPosition: 'top'
    }
  }
  
  handleClick = () =>{
    this.props.onClick(this.props.course.x,this.props.course.y);
  }
  render() {
    let courseString = this.props.course.nemo+"("+this.props.course.credits+")"
    return (
      <div className="course-button">
        <Button key={this.props.course.nemo} className={"state"+this.props.course.state} label={courseString} onClick={this.handleClick} tooltip={this.props.course.preReq}/>
      </div>
    );
  }
}