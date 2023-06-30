var secondsSpan = 5;
var backKey = "<";
var forwardKey = ">";
chrome.storage.local.get(["secondsSpan", "backKey", "forwardKey"]).then((result) => {
	if(typeof result.secondsSpan == 'number') secondsSpan = result.secondsSpan;
	if (result.backKey) backKey = result.backKey;
	if (result.forwardKey) forwardKey = result.forwardKey;
	
	secondsSpan = secondsSpan * 1000

	var actualCode = `
		function init() {
			if(!netflix) return
			
			seek = function(e) {
				const videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
				const player = videoPlayer.getVideoPlayerBySessionId(videoPlayer.getAllPlayerSessionIds()[0]);
				
				if(e.key == '${backKey}'){
					player.seek(player.getCurrentTime()-${secondsSpan})
				}
				else if(e.key == '${forwardKey}'){
					player.seek(player.getCurrentTime()+${secondsSpan})
				}
			}
			
			document.addEventListener('keydown', seek);
		}

		init()`;

	document.documentElement.setAttribute('onreset', actualCode);
	document.documentElement.dispatchEvent(new CustomEvent('reset'));
	document.documentElement.removeAttribute('onreset');
});


  
