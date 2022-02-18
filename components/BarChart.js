import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const FONT_COLOR = "white"

export function BarChart({ rank, median, max: maxObject }) {
    const rank_values = rank.content.map(x => x.value)
    var maxSqlObject = undefined
    var values = median ? [...rank_values, median.content.median] : rank_values
    var newRecord = false

    if (maxObject) {
        maxSqlObject = maxObject.content[0]
        if (values[0] === maxSqlObject.max && maxObject.content.length === 1) {
            newRecord = true
        } else {
            values = [maxSqlObject.max, ...values]
        }
    }
    values.sort((a, b) => rank.descending ? b - a : a - b)

    var medianFound = false
    var medianIndex = -1
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
    if (maxObject) {
        if (newRecord) {
            labels[0] = labels[0] + " (New UFC Record)"
        } else {
            labels = [`Record`, ...labels]
        }
    }
    if (median) {
        labels.splice(medianIndex, 0, "Median (all time)")
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
                        return `Record set by ${maxSqlObject.fighter_name.lastWord()} vs ${maxSqlObject.opponent_name.lastWord()}: ${maxObject.showAsTimeStamp ? maxSqlObject.time : +(maxSqlObject.max + Number.EPSILON).toFixed(2)} ${maxObject.suffix}`
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
        <div className='h-auto'>
            <Bar data={data} options={options} />
        </div>
    )


}

String.prototype.lastWord = function lastWord() {
    return this.split(" ").pop();
}