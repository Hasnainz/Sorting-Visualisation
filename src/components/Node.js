import React from "react";
import "./node.css"

export default class Node extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wall : false,
      visited : false,
      start : false,
      end : false,
    };
  }
  render() {
    const {wall, visited, start, end} = this.state;
    return (
      <button className={(visited) ? "visited" : (start) ? "start" : (end) ? "end" : (wall) ? "wall" : "node"}>

      </button>
    );
  }
}