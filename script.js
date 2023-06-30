window.onload = function() {
	chrome.storage.local.get(["secondsSpan", "backKey", "forwardKey"]).then((result) => {
		if(typeof result.secondsSpan == 'number')
			set(result.secondsSpan);
		else
			set(5);

		if (result.backKey) {
			setBackKey(result.backKey);
		} else {
			setBackKey("<");
		}

		if (result.forwardKey) {
			setForwardKey(result.forwardKey);
		} else {
			setForwardKey(">");
		}
	});
}
  
function set(seconds){
	document.getElementById('secondsSpan').innerText = seconds;
	
	chrome.storage.local.set({ "secondsSpan": seconds }).then(() => { });
}

function get(){
	return parseInt(document.getElementById('secondsSpan').innerText);
}
	
function increment(){
	set(get()+1);
	if(get()>90) set(90);
}
	
function decrement(){
	set(get()-1);
	if(get()<=0) set(1);
}

document.getElementById("incrementBtn").addEventListener("click", increment);
document.getElementById("decrementBtn").addEventListener("click", decrement);

function setBackKey(key) {
	document.getElementById("backKey").value = key;
}

function setForwardKey(key) {
	document.getElementById("forwardKey").value = key;
}

document.getElementById("backKey").addEventListener("change", (event) => {
	const key = event.target.value;
	if (key !== "") {
		console.log("backKey change:", key)
		chrome.storage.local.set({ "backKey": key }).then(() => { });
	}
})

document.getElementById("forwardKey").addEventListener("change", (event) => {
	const key = event.target.value;
	if (key !== "") {
		chrome.storage.local.set({ "forwardKey": key }).then(() => { });
	}
})
