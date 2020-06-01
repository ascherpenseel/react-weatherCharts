import React, {useRef, useEffect, useState} from 'react'
import Chart from 'chart.js'

function WindChart ({data, city}) {
    const canvas = useRef()
    const [chartInstance, setChartInstance] = useState(null)

    const   chartLabel = 'Daily wind',
            chartType = 'scatter',
            chartColor = 'rgba(55, 200, 100, 0.8)',
            chartTitle = 'Wind'

            const chartConfig = {
        type: chartType,
        data: {
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
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Speed (m/s)'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Direction (Deg.)'
                    }
                }]
            }
        }
    }
    
    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        const newChart = new Chart(ctx, chartConfig)
        setChartInstance(newChart)

    }, [canvas])

    useEffect(() => { 
        if (chartInstance) {
            chartInstance.data.labels = data.dates
            chartInstance.data.datasets[0].data = data.entries
            chartInstance.update()
        }
    }, [city])

    return (
        <div className='weather-chart'>
            <canvas ref={canvas} ></canvas>
        </div>
    )
}

export default WindChart