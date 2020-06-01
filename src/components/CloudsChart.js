import React, {useRef, useEffect, useState} from 'react'
import Chart from 'chart.js'
import ToggleTimespan from './ToggleTimespan'

function CloudsChart ({data, city}) {
    const canvas = useRef()
    const [chartInstance, setChartInstance] = useState(null)
    const [timespan, setTimespan] = useState('3h')

    const   chartLabel = '% Cloudiness',
            chartType = 'bar',
            chartColor = 'rgba(59, 132, 255, 0.8)',
            chartTitle = 'Clouds'

    const initialChartConfig = {
        type: chartType,
        data: {
            labels: data.dates,
            datasets: [{
                label: chartLabel,
                data: data.entries,
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            title: {
                display: true,
                text: chartTitle
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: "M/DD - hA"
                        },
                        tooltipFormat: "MMM. DD @ hA"
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
    
    const updateChart = (chart, ts, data) => {
        if (!chart) return

        if (ts === '3h') {
            chart.data.labels = data.dates
            chart.data.datasets[0].data = data.entries
            chart.config.options.scales.xAxes[0].time.unit = "hour"
        }
        else if (ts === '1D') {
            const dailyEntries = [], dailyDates = []
            let date = data.dates[0], ndates = 0, sumdates = 0
            for (let i=0; i<data.dates.length; i++) {
                if (new Date(date).getDay() === new Date(data.dates[i]).getDay()) {
                    sumdates += data.entries[i]
                    ndates++
                    if (i === data.dates.length-1 && ndates === 8){
                        dailyEntries.push(sumdates/ndates)
                        dailyDates.push(date)
                    } 
                } else {
                    if (ndates === 8) {
                        dailyDates.push(date)
                        dailyEntries.push(sumdates/ndates)
                    }
                    date = data.dates[i]
                    ndates = 1
                    sumdates = data.entries[i]
                }
            }
            chart.data.labels = dailyDates
            chart.data.datasets[0].data = dailyEntries
            chart.config.options.scales.xAxes[0].time.unit = "day"
        }
        
        chart.update()

        setTimespan(ts)
    }

    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        const newChart = new Chart(ctx, initialChartConfig)
        setChartInstance(newChart)
    }, [canvas])

    useEffect(() => { 
        updateChart(chartInstance, '3h', data)
    }, [city])
    
    useEffect(() => {
        updateChart(chartInstance, timespan, data)
    }, [timespan])

    return (
        <div className='weather-chart'>
            <canvas ref={canvas} ></canvas>
            <ToggleTimespan timespan={timespan} setTimespan={setTimespan}/>
        </div>
    )
}

export default CloudsChart