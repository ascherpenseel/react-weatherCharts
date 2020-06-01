import React, {useState} from 'react'

function ToggleTimespan ({timespan, setTimespan}) {

    return (
        <div className='timespan-container'>
            <div 
                className={`timespan-option ${timespan === '3h' ? 'selected' : ''}`}
                onClick={() => setTimespan('3h')}>
                3h
            </div>
            <div 
                className={`timespan-option ${timespan === '1D' ? 'selected' : ''}`}
                onClick={() => setTimespan('1D')}>
                1D
            </div>
        </div>
    )
}

export default ToggleTimespan