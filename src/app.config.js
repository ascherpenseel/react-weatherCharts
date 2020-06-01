const API_KEY = '0614d13377e407e8c0724c47d862443b';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast?units=metric';

export function getAPIUrl (city) {
    return API_BASE_URL + '&APPID=' + API_KEY + '&q=' + encodeURIComponent(city)
}

export const APP_TEXTS = {
    title: 'Forecast tha city',
    search_label: 'Type in the city of your choosing',
    search_btn: 'Go!',
    error_api_404: 'City cannot be found'
}