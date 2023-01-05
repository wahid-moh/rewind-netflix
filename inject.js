var secondsSpan = 5;
chrome.storage.local.get(["secondsSpan"]).then((result) => {
	if(typeof result.secondsSpan == 'number') secondsSpan = result.secondsSpan
	
	secondsSpan = secondsSpan * 1000

	var actualCode = `
		function init() {
			if(!netflix) return
			
			seek = function(e) {
				const videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
				const player = videoPlayer.getVideoPlayerBySessionId(videoPlayer.getAllPlayerSessionIds()[0]);
				
				if(e.key == '<'){
					player.seek(player.getCurrentTime()-`+secondsSpan+`)
				}
				else if(e.key == '>'){
					player.seek(player.getCurrentTime()+`+secondsSpan+`)
				}
			}
			
			document.addEventListener('keydown', seek);
		}

		init()`;

	document.documentElement.setAttribute('onreset', actualCode);
	document.documentElement.dispatchEvent(new CustomEvent('reset'));
	document.documentElement.removeAttribute('onreset');
});


  
