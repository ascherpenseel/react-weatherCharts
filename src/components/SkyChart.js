import React, {useRef, useEffect, useState} from 'react'
import Chart from 'chart.js'

function SkyChart ({data, city}) {
    const canvas = useRef()
    const [chartInstance, setChartInstance] = useState(null)

    const   chartType = 'pie',
            chartColor = [],
            chartTitle = 'Weather'

    const chartLabels = [], chartEntries = []
    const randColor = () => '#'.concat([0,0,0,0,0,0].map(x => '0123456789ABCDEF'[Math.floor(Math.random()*16)]).join(''))

    data.entries.forEach(x => {
        if (!chartLabels.includes(x)){
            chartLabels.push(x)
            chartEntries.push(1)
            chartColor.push(randColor())
        } else {
            chartEntries[chartLabels.indexOf(x)]++
        }
    })

    const chartConfig = {
        type: chartType,
        data: {
            labels: chartLabels,
            datasets: [{
                data: chartEntries,
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
            chartInstance.data.labels = chartLabels
            chartInstance.data.datasets[0].data = chartEntries
            chartInstance.update()
        }
    }, [city])

    return (
        <div className='weather-chart'>
            <canvas ref={canvas} ></canvas>
        </div>
    )
}

export default SkyChart