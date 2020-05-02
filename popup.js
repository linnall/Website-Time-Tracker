
let showGraphbtn = document.getElementById("showgraph");
let clearBtn = document.getElementById("reset");

clearBtn.onclick = function(element) {
	chrome.storage.local.set({"tabTimesObject": "{}"}, function(){

	});
}

showGraphbtn.onclick = function(element) {
	
}
