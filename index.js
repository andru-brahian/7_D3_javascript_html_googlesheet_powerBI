// Import stylesheets
import './style.css';
import * as d3 from 'd3';


// Write Javascript code!
const appDiv = document.getElementById('app');

//Gráfico de columnas. Mi 1º gráfico, datos ingresados
var visualization = d3plus.viz()
  .container("#viz1")
  .data([{"year": 1991, "name":"alpha", "value": 15},
  {"year": 1992, "name":"alpha", "value": 20},])
  .type("bar")
  .id("name")
  .x("year")
  .y("value")
  .draw()

  d3.json("https://raw.githubusercontent.com/raul27868/07MBIG-Visualizacion-Actividades-Guiadas/master/columnas.json")
  .then(function(data) {
    var visualization = d3plus.viz()
      .container("#viz2")
      .data(data)
      .type('bar')
      .id('name')
      .x('year')
      .y('value')
      .axes({ticks: {display: false}})  // Configura las marcas de los ejes para que no se muestren
      .draw();
  })
  .catch(function(error) {
    console.log("Error al cargar los datos:", error);
  });


//Datos del diagrama de caja y bigotes
var data = [
  {"year": 1991, "name":"alpha", "value": 15},
  {"year": 1991, "name":"beta", "value": 10},
  {"year": 1991, "name":"gamma", "value": 5},
  {"year": 1991, "name":"delta", "value": 50},
  {"year": 1992, "name":"alpha", "value": 20},
  {"year": 1992, "name":"beta", "value": 10},
  {"year": 1992, "name":"gamma", "value": 10},
  {"year": 1992, "name":"delta", "value": 43},
  {"year": 1993, "name":"alpha", "value": 30},
  {"year": 1993, "name":"beta", "value": 40},
  {"year": 1993, "name":"gamma", "value": 20},
  {"year": 1993, "name":"delta", "value": 17},
  {"year": 1994, "name":"alpha", "value": 60},
  {"year": 1994, "name":"beta", "value": 60},
  {"year": 1994, "name":"gamma", "value": 25},
  {"year": 1994, "name":"delta", "value": 32}
]

var visualization = d3plus.viz()
  .container('#viz3')
  .type('box')
  .data(data)
  .id('name')
  .x('year')
  .y('value')
  .axes({ ticks: 'false'})
  .size('value')
  .draw();


// SOLUCIÓN 8: Gráfico combinado con deslizamiento
// SOLUCIÓN 8: Gráfico combinado con deslizamiento
// Función principal asíncrona
async function main() {
  // Función para cargar datos desde el enlace JSON
  async function fetchData(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

  // Obtener datos del enlace
  const jsonDataLink = "https://raw.githubusercontent.com/andru-brahian/7_D3_javascript_html_googlesheet_powerBI/main/base_datos_diagrama_velas.json";
  const jsonData = await fetchData(jsonDataLink);

  // Mapeo de datos para la serie de velas
  const candleSeries = jsonData.map(item => {
    const timestamp = new Date(item.new_date).getTime();
    return {
      x: timestamp,
      y: [item.Open_AAPL, item.High_AAPL, item.Low_AAPL, item.Close_AAPL]
    };
  });

  // Mapeo de datos para la serie de barras
  const barSeries = jsonData.map(item => {
    const timestamp = new Date(item.new_date).getTime();
    return { x: timestamp, y: item.Volume_AAPL };
  });

  // Configuración del gráfico combinado de velas y barras con deslizamiento
  var options = {
    series: [
      { name: 'candle', type: 'candlestick', data: candleSeries },
      { name: 'volume', type: 'bar', data: barSeries }
    ],
    chart: {
      height: 450,
      type: 'line',
      stacked: false,
      toolbar: {
        autoSelected: 'pan',
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
      },
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: [
      {
        seriesName: 'candle',
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#FF5733'
        },
        labels: {
          style: {
            colors: '#FF5733'
          }
        },
        title: {
          text: 'Candlesticks',
          style: {
            color: '#FF5733'
          }
        },
      },
      {
        seriesName: 'volume',
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#4CAF50'
        },
        labels: {
          style: {
            colors: '#4CAF50'
          }
        },
        title: {
          text: 'Volume',
          style: {
            color: '#4CAF50'
          }
        }
      },
    ],
    colors: ['#FF5733', '#4CAF50']
  };

  // Crear el gráfico combinado de velas y barras
  var chart = new ApexCharts(document.querySelector("#viz4"), options);
  chart.render();
}

// Llamar a la función principal
main();









/*
// Datos de ejemplo para el gráfico de velas
var data = [
  {date: new Date(2021, 0, 1), open: 100, high: 110, low: 90, close: 105},
  {date: new Date(2021, 0, 2), open: 105, high: 115, low: 100, close: 110},
  // Agrega más datos aquí...
];
*/
/*
// Datos del diagrama de barras agrupadas
d3.csv("https://github.com/andru-brahian/4_D3_javascript_html_googlesheet_powerBI/blob/main/base_datos_diagrama_velas.csv", function(data) {
  var visualization = d3plus.viz()
  .container("#viz4")
  .data(data)
  .type('candlestick')
  .id('_id')
  .x('Fecha_tradeo')
  .y('Close_AAPL')
  .axes({ ticks: 'false' })
  .draw();
  }
);
*/


/*
document.getElementById('viz1'):  función que selecciona un elemento HTML por su ID. En este caso, está seleccionando el elemento con el ID viz4. Esta función devuelve un objeto que representa el elemento seleccionado.

.clientHeight: Esta es una propiedad que devuelve la altura del elemento en píxeles, incluyendo el padding, pero no el borde, la barra de desplazamiento o el margen.

var height =: Esta es una declaración de variable en JavaScript. Está declarando una variable llamada height y asignándole el valor de la altura del elemento seleccionado.
*/

/*
var width = document.getElementById('viz4').offsetWidth;
var height = document.getElementById('viz4').clientHeight;


// Crear escalas para el eje x y y
var xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.date))
  .range([0, width]);

var yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => Math.max(d.open, d.high, d.low, d.close))])
  .range([height, 0]);

// Crear las barras de las velas
var svg = d3.select("#viz4")
  .append("svg")
  .attr("width", width)
  .attr("height", height);



var barWidth = width / data.length; // Calcula el ancho de las barras en función del ancho total y la cantidad de datos


var bars = svg.selectAll("rect")
  .data(data)
  .enter().append("rect")
  .attr("x", d => xScale(d.date) - barWidth / 2)  // Centra la barra en la posición correspondiente
  .attr("y", d => yScale(Math.max(d.open, d.close)))
  .attr("width", barWidth)
  .attr("height", d => Math.abs(yScale(d.open) - yScale(d.close)))  // Utiliza el valor absoluto para manejar barras descendentes
  .attr("fill", d => d.open > d.close ? "red" : "green");


// CARACTERÍSTICAS DISPONIBLES: _id;user.followers_count;user.friends_count;user.favourites_count;retweet_count;favorite_count;created_at;text;user.name;user.screen_name;user.description;user.url;new_date;Fecha_tradeo;Open_AAPL;High_AAPL;Low_AAPL;Close_AAPL;Adj Close_AAPL;Volume_AAPL;Open_COIN;High_COIN;Low_COIN;Close_COIN;Adj Close_COIN;Volume_COIN;Open_GEHC;High_GEHC;Low_GEHC;Close_GEHC;Adj Close_GEHC;Volume_GEHC;Open_RUN;High_RUN;Low_RUN;Close_RUN;Adj Close_RUN;Volume_RUN;Open_TMUS;High_TMUS;Low_TMUS;Close_TMUS;Adj Close_TMUS;Volume_TMUS;year;month;weekday;day







// Datos del diagrama de barras agrupadas
d3.json("https://raw.githubusercontent.com/raul27868/07MBIG-Visualizacion-Actividades-Guiadas/master/columnas.json", function(data) {
  var visualization = d3plus.viz()
  .container("#viz4")
  .data(data)
  .type('bar')
  .id('name')
  .x('year')
  .y('value')
  .axes({ ticks: 'false' })
  .draw();
  }
);
*/