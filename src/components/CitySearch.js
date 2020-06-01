import React, {useState} from 'react'

import {APP_TEXTS} from '../app.config'

function CitySearch ({setCity}) {
    const [text, setText] = useState('')

    const handleChange = (event) => {
        setText(event.target.value)
    }
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) setCity(text)
    }

    return (
        <div className='search-container'>
            <p className='search_caption'>{APP_TEXTS.search_label}</p>
            <input type='search' value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
            <button onClick={() => setCity(text)}>{APP_TEXTS.search_btn}</button>
        </div>
    )
}

export default CitySearch 