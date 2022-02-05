import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const FONT_COLOR = "white"

export function BarChart({ rank, median, max }) {
    const rank_values = rank.content.map(x => x.value)
    var values = median ? [...rank_values, median.content.median] : rank_values
    var newRecord = false
    if (max) {
        if (values[0] === max.content.max) {
            newRecord = true
        } else {
            values = [max.content.max, ...values]
        }
    }
    values.sort((a, b) => rank.descending ? b - a : a - b)

    var medianFound = false
    var medianIndex = -1
    var datasets = [
        {
            data: values,
            backgroundColor: values.map((value, index) => {

                if (max && index === 0) {
                    if (newRecord) {
                        return "gold"
                    } else {
                        return "white"
                    }
                }

                if (median && value === median.content.median && !medianFound) {
                    medianFound = true
                    medianIndex = index
                    return "white"
                }
                return "#164E63"//"#4c1d95"
            })
        }
    ]
    var labels = rank.content.map(x => x.fighter_name.split(" ").pop())
    if (max) {
        if (newRecord) {
            labels[0] = labels[0] + " (New UFC Record)"
        } else {
            labels = [`UFC Record`, ...labels]
        }
    }
    if (median) {
        labels.splice(medianIndex, 0, "UFC Median")
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
                display: () => max !== undefined,
                text: () => {
                    if (max) {
                        return `UFC Record set by ${max.content.fighter_name.split(" ").pop()} vs ${max.content.opponent_name.split(" ").pop()} (${max.content.max} ${rank.id})`
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
        <div className=' h-auto'>
            <Bar data={data} options={options} />
        </div>
    )


}