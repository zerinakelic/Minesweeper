import React from 'react'
import "./Cell.css"

/**
 * Cell component contains logic for one cell on a board
 * @param details
 * @param updateFlag
 * @param revealcell
 * @returns {JSX.Element}
 * @constructor
 */
export default function Cell({details, updateFlag, revealcell}) {
    /**
     * We programmatically define style regarding what user clicked
     * @type {{cellStyle: {backgroundColor: (string)}}}
     */
    const style = {
        cellStyle: {
            backgroundColor: details.revealed ?
                details.value === 'X' ? 'red' : '#0d82b5'
                : '#42bff5',
        },
    }

    /**
     * Here we define what happened when user clicks on cell item
     * calling revealcell for specific cell x and y
     */
    const click = () => {
        revealcell(details.x, details.y);
    }

    // Right Click Function
    const rightclick = (e) => {
        updateFlag(e, details.x, details.y)
    }
    /**
     * Rendering the cell component and showing the different values on right and left clicks
     */
    return (
        <div className="cell" style={style.cellStyle} onClick={click} onContextMenu={rightclick}>
            {!details.revealed && details.flagged ? ("🚩")
                : details.revealed && details.value !== 0 ?
                    (details.value === "X" ? ("💣") : (details.value)) : ("")
            }
        </div>
    )
}


