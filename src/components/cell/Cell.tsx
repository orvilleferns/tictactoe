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
            data,
            onCellClicked
        } = this.props;

        const classes = `cell ${data}`
        
        return (
            <div className={classes} 
            onClick={()=> onCellClicked(rowIndex, cellIndex)}>
            </div>
        )
    }

}