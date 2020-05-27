$(document).ready(function(){
    $.get("/data/fetch", function(data, status){
        graph(data);
      });

});



function graph(data) {
    var valuesTemperature = [];
    var valuesHumidity = [];
    var valuesIrrigationlevel = [];
    data.forEach(element => {
        valuesTemperature.push({x: element.date +" "+element.time, y: element.temperature});
        valuesHumidity.push({x: element.date +" "+element.time, y: element.humidity});
        valuesIrrigationlevel.push({x: element.date +" "+element.time, y: element.irrigationlevel});
    });
    var values = [valuesTemperature, valuesHumidity, valuesIrrigationlevel];
    // jQuery methods go here...
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    
    var ctxList = [ctx, ctx2, ctx3];
    ctxList.forEach(c => {
        if(window.innerWidth < window.innerHeight){
            //phone
            c.canvas.parentNode.style.height = '128px';
            c.canvas.parentNode.style.width = '128px';
        }
    });
    var titles = ['Lämpötila (C)', 'Huoneilman kosteus (%)', 'Kasvin mullan kosteus'];
    var colors = ['red', 'blue', 'green'];

    for (let index = 0; index < values.length; index++) {
        var graphParams = {
            type:"line",
            data:{
                datasets: [{
                    label:titles[index],
                    data:values[index],
                    borderColor:colors[index],
                    backgroundColor:"transparent",
                }],
            },
            options:{
                maintainAspectRatio:false,
                responsive:true,	
                scales:{
                    xAxes:[{
                        type:"time",
                        distribution: "series",
                    }],
                    
                }
            }
        
        }
        var myChart = new Chart(ctxList[index], graphParams); 
    }
}