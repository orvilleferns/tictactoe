import React from 'react';

import './Cell.css';

// NOTE: interfaces are declarations and are for compile time and not runtime

interface IProps {
    data: string;
    rowIndex : number;
    cellIndex: number;

    onCellClicked: (rowIndex : number, cellIndex: number) => void;
}

export class Cell extends React.PureComponent<IProps> {
    
    public render() {
        const {
            cellIndex,
            rowIndex,
    
            onCellClicked
        } = this.props;
        
        return (
            <div className="cell" 
            onClick={()=> onCellClicked(rowIndex, cellIndex)}>
                {this.props.data}
            </div>
        )
    }

}