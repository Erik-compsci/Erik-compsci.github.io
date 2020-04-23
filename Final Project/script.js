var city;

function citySearch()
{
    console.log('search');

    var userInput = $("#city").val();
    console.log("Got this input:" + userInput);
    load(userInput);

}
/**
 * Creates function that loads in with Portland info
 */
function loadPage()
{
    $('.icon').hide();
    //load("Portland");
}

function load(city)
{
    
    //Ajax call
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=imperial&appid=e7d6164084582578d9c82cdb400430e7",
        type: "GET",
        dataType: "json",
        success: stuff
    });
}

function stuff(data)
{
    //Locating the information
    var icon = "http://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var temp = Math.floor(data.main.temp);
    var tempMin = Math.floor(data.main.temp_min);
    var tempMax = Math.floor(data.main.temp_max);
    var weather = data.weather[0].main;
    
    //calling the various info
    $('.icon').attr('src', icon);
    $('.icon').show();
    $('.weather').text(weather);
    $('.temp').text(temp);
    $('.tempMax').text("Today's High: " + tempMax);
    $('.tempMin').text("Today's Low: " + tempMin);

    makeChart([temp, tempMin, tempMax]);
};

function makeChart(dataPoints)
{
    if(typeof myChart !== "undefined")
    {
        console.log(myChart);
        myChart.destroy();
    }   

    var ctx = document.getElementById('barChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Current', 'Day Low', 'Day High'],
            datasets: [{
                label: 'Temperature in Fahrenheit',
                data: dataPoints,
                backgroundColor: [
                    'rgb(255, 0, 0)',
                    'rgb(0, 128, 255)',
                    'rgb(255, 255, 51)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options:
        {
            legend: {
                labels: {
                    // Change the header of the chart
                    fontColor: 'black',
                    fontSize: 16,
                    fontFamily: "sans-serif"
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
/**
 *  Generates funtion once a search has been made
 */
$(document).ready(loadPage);
