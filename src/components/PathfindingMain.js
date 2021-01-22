import React from "react";
import "./pathfinding.css"
import dijkstra from "./Algorithms/dijsktras";
import Node from "./Node"

const GRID_WIDTH = 15;
const GRID_HEIGHT = 15;

export default class PathfindingMain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startNode : [5][5],
            endNode : [10][10],
            grid: Array.from(Array(GRID_WIDTH), () => new Array(GRID_HEIGHT)),
        };
    }
    componentDidMount(){
        this.setDefaultGrid();
    }
    setDefaultGrid(){
        let arr = Array.from(Array(GRID_WIDTH), () => new Array(GRID_HEIGHT))
        for(let i = 0; i < GRID_WIDTH; ++i){
            for(let j = 0; j < GRID_HEIGHT; ++j){
                arr[i][j] = 0;
            }
        }
        this.setState({
            grid : arr
        });
    }
    
    render(){
        const {grid, startNode, endNode} = this.state;
        return (
            <div className="grid">
            {grid.map((row, rowIndex) => {
                return(
                    <div className="row" key={rowIndex}>
                        {row.map((nodes, columnIndex) => {
                            return (
                            <Node key={rowIndex,columnIndex}>
                                wall={false}
                                visited={false}
                                {console.log([rowIndex][columnIndex])}
                                start={([rowIndex][columnIndex] === startNode) ? true : false}
                                end={([rowIndex][columnIndex] === endNode) ? true : false}
                            </Node>
                        )})}
                    </div>
                )}
            )}
        </div>
        );
    }
}

