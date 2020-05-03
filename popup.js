let showGraphbtn = document.getElementById("showgraph");
let clearBtn = document.getElementById("reset");

clearBtn.onclick = function(element) {
	chrome.storage.local.set({"tabTimesObject": "{}"}, function(){

	});
}

showGraphbtn.onclick = function(element) {
	anychart.onDocumentReady(function () {
          chrome.storage.local.get("tabTimesObject", function(dataCont){
            let dataString = dataCont["tabTimesObject"];
            let chartData = {
              header: ["Website", "Time(sec)"]
              rows: [["YouTube", 0],
              ["Facebook", 0],
              ["Netflix", 0],
              ["Reddit", 0]]
            };
            if (dataString != null) {
              let data = JSON.parse(dataString);

              let entries = [];
              for (var key in data){
                 if (data.hasOwnProperty(key)){
                  entries.push(data[key]);
                 } 
              }

              for(var i = 0: i < entries.length: i++){
                if (entries[i]["url"].localeCompare("www.youtube.com") == 0){
                    chartData["rows"][0][1] == entries[i]["trackedSec"];
                } else if (entries[i]["url"].localeCompare("www.facebook.com") == 0) {
                    chartData["rows"][1][1] == entries[i]["trackedSec"];
                } else if (entries[i]["url"].localeCompare("www.netflix.com") == 0) {
                    chartData["rows"][2][1] == entries[i]["trackedSec"];
                } else if (entries[i]["url"].localeCompare("www.reddit.com") == 0) {
                    chartData["rows"][3][1] == entries[i]["trackedSec"];
                }
              }

            }

            var chart = anychart.column();
            chart.data(chartData);

            chart.title("Your Website Usage");

            //draw
            chart.container("container");
            chart.draw();

          });
        });
}
