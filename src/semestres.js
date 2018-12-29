import React from 'react'

export class Semestre extends React.Component{
  constructor(props){
    super(props);
    this.state={
      courses:[],
      credits:0
    }
  }

  render() {
    let arr = []
    let count=this.props.cre
    for (let i = 0; i < this.props.courses.length; i++) {
      const element = this.props.courses[i];
      console.log(element)
      arr.push(<h2>{element.nemo}</h2>)
      count+=element.credits
    }
    return (
      <div className="container-courses">
        <div>
          {arr}
        </div>
        <div>
          <h2>{count}</h2>
        </div>
      </div>
    );
  }
}