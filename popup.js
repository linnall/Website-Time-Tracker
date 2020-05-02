<<<<<<< HEAD
//
=======
let showGraphbtn = document.getElementById("showgraph");
let clearBtn = document.getElementById("reset");

clearBtn.onclick = function(element) {
	chrome.storage.local.set({"tabTimesObject": "{}"}, function(){

	});
}

showGraphbtn.onclick = function(element) {
	
}
>>>>>>> 1062bf0bd1c04cef68db8a44b5e52e5a95e6d791
