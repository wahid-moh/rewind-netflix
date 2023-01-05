window.onload = function() {
	chrome.storage.local.get(["secondsSpan"]).then((result) => {
		if(typeof result.secondsSpan == 'number')
			set(result.secondsSpan);
		else
			set(5)
	});
}
  
function set(seconds){
	document.getElementById('secondsSpan').innerText = seconds;
	
	chrome.storage.local.set({ "secondsSpan": seconds }).then(() => { });
}

function get(){
	return document.getElementById('secondsSpan').innerText;
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