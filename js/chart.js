var mouseClick=0
var margin = {top: 20, right: 20, bottom: 30, left: 40};

var whaleSilhouette= "M 200 100 " +  
                "A 90 90, 0,1, 0, 190 180 " +
                "Q 250 180 300 110 " +  
                "Q 320 140, 350 130 " +
                "Q 320 125, 320 105 " + 
                "Q 320 90,310 90 " +
                "Q 310 80, 300 80 " + 
                "Q 270 70, 280 40 " + 
                "Q 255 60, 280 90 " + 
                "Q 230 150, 200 100 "

var keyPressing = false
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;

var windowCenterWidth = width/2
var windowCenterHeight = height/2

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)     // i.e., 800 again 
    .attr("height", height + margin.top + margin.bottom)   // i.e., 300 again
    .append("g")                                           // g is a group                                           

d3.select("body")
    .on("keydown",function () {     
        if (event.keyCode == 82){   //if the key pressed is 'r'
            keyPressing = true
        }
        
    })
    .on("keyup", function() {
        keyPressing = false
    })

//here whales are created for the first time
function drawWhales(data){

    //take the first configuration to put whales for the first time
    var firstConfig = data[0]["position"]
    var id = 0

    firstConfig.forEach(function(pos){
        svg
        .append("path")
        .attr("id","whale" + id)    //create id from 0 to 9 for each whale
        .attr("d", whaleSilhouette)
        .attr("transform", "translate ( "+ pos.x +" , " + pos.y +  ") scale(0.5)")
        .datum(data)
        .style("fill", "black")
        .on("click", function onClick(data){
           console.log("click")
           if(keyPressing){         //if user press 'r' key while clicking
               verticalTranslation(data, mouseClick)
               mouseClick = mouseClick + 1
               translateWhales(data,mouseClick,1000)
           }
           else{                   //if user just click
            mouseClick = mouseClick + 1
            translateWhales(data,mouseClick,0)
           }   
        })
        id = id + 1;
        
    })
    
    
}


//it is used to go whales upwards
function verticalTranslation(data, mouseClick){
    var value = mouseClick % 5
    var scalation=[0.12,0.17,0.11,0.15,0.1,0.15,0.12,0.14,0.18,0.12]
    var currentConfig = data[value]["position"]
    
    for(i = 0; i < 10; i++){
        var balena = d3.select("#whale"+i)
        balena.transition()
        .duration(1000)
        .attr("transform","translate( "+ currentConfig[i]["x"]+","+(currentConfig[i]["y"]*scalation[i])+" ) scale(0.5)")
    }
}

//it is used for the translation of whales
function translateWhales(data, mouseClick, delay){
    
    var value=mouseClick % 5
    var newConfig = data[value]["position"] 

    for(i = 0; i < 10; i++){
        var balena = d3.select("#whale"+i)
        balena.transition()
        .delay(delay)
        .duration(1000)
        .attr("transform","translate( "+ newConfig[i]["x"]+","+newConfig[i]["y"]+" ) scale(0.5)")
    }
}


d3.json("data/dataset1.json")
    .then(function(data) {
        drawWhales(data)
    })
    .catch(function(error) {
        console.log(error); // Some error handling here
    });

