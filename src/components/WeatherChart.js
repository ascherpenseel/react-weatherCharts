import React, {useRef, useEffect, useState} from 'react'
import Chart from 'chart.js'

function WeatherChart ({type, data, reqId}) {
    const canvas = useRef()
    const [chartInstance, setChartInstance] = useState(null)

    const getChartConfig = () => {
        let chartLabel, chartType, chartColor, chartTitle
        switch (type) {
            case 'temperature':
                chartLabel = 'Avg. Temperature'
                chartType = 'line'
                chartColor = 'rgba(255, 99, 132, 0.8)'
                chartTitle = 'Temperature'
                break
            
                case 'cloudiness':
                chartLabel = '% Cloudiness'
                chartType = 'bar'
                chartColor = 'rgba(59, 132, 255, 0.8)'
                chartTitle = 'Clouds'
                break
        }

        return {
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
    }
    
    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        const newChart = new Chart(ctx, getChartConfig())
        setChartInstance(newChart)

    }, [canvas])

    useEffect(() => { 
        if (chartInstance) { console.log('update', chartInstance)
            chartInstance.data.labels = data.dates
            chartInstance.data.datasets[0].data = data.entries
            chartInstance.update()
        }
    }, [reqId])

    return (
        <div className='weather-chart'>
            <canvas ref={canvas} ></canvas>
        </div>
    )
}

export default WeatherChart