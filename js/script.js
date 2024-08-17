const formBar = document.getElementById('form-bar');

const numberDataForm = document.getElementById('number-data-form');
let numberData = 0;

const datasetForm = document.getElementById('dataset-form');
const datasetValues = [];
const datasetColors = [];
const datasetLabels = [];
let nameChart = 0;

const message = document.getElementById('message');
message.style.display = 'none';

const dynamicTable = document.getElementById('dynamic-table');
const tableDataset = document.getElementById('table-dataset');
tableDataset.style.display = 'none';

function sendNumberData(e){
    e.preventDefault();
    message.style.display = 'block';
    numberData = document.getElementById('number-data').value;
    if(!numberData || numberData === ''){
        message.textContent = `It cannot be NULL or EMPTY!`;
        danger(message);
    }else{
        message.textContent = `Sucess, now enter the ${numberData} datas`;
        success(message);
        numberDataForm.innerHTML = '';
        numberDataForm.style.display = 'none';
        for(let i=0; i<numberData; i++){
            datasetForm.innerHTML += `
                <label for="data-${i+1}">${i+1}) data:</label>
                <input type="number" id="data-${i+1}">
                <br>
                <label for="color-${i+1}">${i+1}) color:</label>
                <input type="text" id="color-${i+1}">
                <br>
                <label for="label-${i+1}">${i+1}) label:</label>
                <input type="text" id="label-${i+1}">
                <br><br>
            `;
        }
        datasetForm.innerHTML += `
            <label for="name-chart">Give a name for your chart: </label>
            <input type="text" id="name-chart">
            <br><br>
            <button onclick="sendDataset(event);">Submit!</button>
        `;
    }
}


function sendDataset(e){
    e.preventDefault();
    datasetValues.length = 0;
    datasetColors.length = 0;
    datasetLabels.length = 0;
    for(let i=0; i<numberData; i++){
        datasetValues[i] = document.getElementById(`data-${i+1}`).value;
        datasetColors[i] = document.getElementById(`color-${i+1}`).value;
        datasetLabels[i] = document.getElementById(`label-${i+1}`).value;
    }
    nameChart = document.getElementById(`name-chart`).value;
    datasetForm.innerHTML = '';
    datasetForm.style.display = 'none';
    tableDataset.style.display = 'inline-block';
    for(let i=0; i<numberData; i++){
        dynamicTable.innerHTML += `
            <tr>
                <td>${i+1}<td>
                <td>${datasetValues[i]}<td>
                <td>${datasetColors[i]}<td>
                <td>${datasetLabels[i]}<td>
            </tr>
        `;
    }
    formBar.innerHTML += `<button onclick="bar(event)" id="generate-button">Generate Chart Type Bar</button>`;
}

function bar(e){
    e.preventDefault();
    document.getElementById('name').textContent = nameChart;
    document.getElementById('generate-button').style.display = 'none';
    tableDataset.style.display = 'none';
    message.style.display = 'none';
    currentChart = new Chart("chart", {
        type: "bar",
        data: {
            labels: datasetLabels,
            datasets: [{
                backgroundColor: datasetColors,
                data: datasetValues
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    display: false
                }]
            },
            legend: {
                display: false
            },
            title: {
                display: false
            }
        }
    });
}

function success(msg){
    msg.style.color = 'green';
    msg.style.backgroundColor = '#00ff0050';
}

function danger(msg){
    msg.style.color = 'red';
    msg.style.backgroundColor = '#ff000050';
}