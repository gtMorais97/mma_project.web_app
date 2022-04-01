import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const FONT_COLOR = "white"

export function BarChart({ rank, max: maxObject }) {
    var values = rank.content.map(x => x.value)
    var newRecord = false

    if (maxObject) {
        if ((values[0] > maxObject.max && !maxObject.ascending) || (values[0] < maxObject.max && maxObject.ascending)) {
            newRecord = true
        } else {
            values = [maxObject.max, ...values]
        }
    }
    values.sort((a, b) => rank.descending ? b - a : a - b)

    var datasets = [
        {
            data: values,
            backgroundColor: values.map((value, index) => {

                if (maxObject && index === 0) {
                    if (newRecord) {
                        return "gold"
                    } else {
                        return "white"
                    }
                }
                return "#164E63"//"#4c1d95"
            })
        }
    ]
    var labels = rank.content.map(x => x.fighter_name.split(" ").pop())
    if (maxObject) {
        if (newRecord) {
            labels[0] = labels[0] + " (New UFC Record)"
        } else {
            labels = [`Record`, ...labels]
        }
    }

    const data = {
        labels: labels,
        datasets: datasets
    }
    const options = {
        fontColor: "white",
        responsive: true,
        maintainAspectRatio: true,

        scales: {
            yAxes: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    color: FONT_COLOR,
                    stepSize: 5,
                    max: Math.max(...rank.content.map(x => x.value))
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: FONT_COLOR
                }
            }
        },

        plugins: {
            title: {
                display: () => maxObject !== undefined,
                text: () => {
                    if (maxObject) {
                        return `Record set by ${maxObject.fighter_name.split().pop()} vs ${maxObject.opponent_name.split().pop()}: ${maxObject.time ? maxObject.time : +(maxObject.max + Number.EPSILON).toFixed(2)} ${maxObject.suffix ?? ""}`
                    }
                },
                color: 'white',
                position: 'bottom'
            },
            legend: {
                display: false
            }
        }
    }

    return (
        <div className='flex md:justify-self-center h-auto sm:max-w-xs'>
            <Bar data={data} options={options} />
        </div>
    )


}