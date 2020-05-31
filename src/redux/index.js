import redux, {createStore} from 'redux'

export function loadNewCity (data) {
    return {
        type: "LOAD_NEW_CITY",
        payload: data
    }
}

function reducer (forecast = null, action) {
    switch (action.type) {
        case "LOAD_NEW_CITY":
            return action.payload
        default:
            return forecast
    }
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))
export default store