import React, {useRef, useEffect, useState} from 'react'
import Chart from 'chart.js'

function CloudsChart ({data, city}) {
    const canvas = useRef()
    const [chartInstance, setChartInstance] = useState(null)

    const   chartLabel = '% Cloudiness',
            chartType = 'bar',
            chartColor = 'rgba(59, 132, 255, 0.8)',
            chartTitle = 'Clouds'

    const chartConfig = {
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
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Date/Time"
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: false
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

export default CloudsChart