
/* By Nicholas Cyprus (ngc0202) */

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
const waitTime = 300; //delay to check bad video in milliseconds

function onPlayerStateChange(event) {
	var button = document.getElementById("pause");
	document.getElementById("title").innerHTML = player.getVideoData().title;
	var duration = player.getDuration();
	document.getElementById("duration").innerHTML = Math.floor(duration/60).toString() + (duration%60 < 10 ? ":0" : ":") + Math.floor(duration%60);
	document.getElementById("nowplaying").style.display = "flex";
	console.log("state change - " + event.data); // debug
	
	window.setTimeout(checkBadVideo, waitTime); // check for bad video
	
	// Set proper PAUSE/PLAY label
	if (event.data == YT.PlayerState.PAUSED) {
		button.innerHTML = "<i class='material-icons'>play_arrow</i> Play";
	} else {
		button.innerHTML = "<i class='material-icons'>pause</i> Pause";
	}
	
	// Play next song in playlist when current video ends
	if (event.data == YT.PlayerState.ENDED && curvid < playlist.length-1) {
		console.log("video ended, starting next");	
		curvid++;
		startVideoID(playlist[curvid].videoid);
	}
}

//Plays the video with the given ID in the player.
function startVideoID(vid) {
	if (player == undefined) {
		player = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: vid,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
				//TODO: Add more events, such as onError
			}
		});
	} else {
		player.loadVideoById(vid);
	}
}

var form = document.querySelector("#linkform");
form.addEventListener("submit", parseAndPlay, false); // Call parseAndPlay on form submit

// called when player is loaded
function onPlayerReady(event) {
	event.target.playVideo();
}

// toggle play/pause
function togglePause() {
	if (player.getPlayerState() == YT.PlayerState.PLAYING) {
		player.pauseVideo();
	} else if (player.getPlayerState() == YT.PlayerState.PAUSED) {
		player.playVideo();
	}
}

// toggle visibility of player
function toggleVideo() {
	// Assumes video is the first iframe. jQuery would be more effective here.
	var frame = document.getElementsByTagName("iframe");
	// var button = document.getElementById("show")
	var pCard = document.getElementById("player")
	if (frame.length > 0) {
		frame = frame[0];
		if (pCard.style.display == "flex") {
			//Hide the video
			pCard.style.display = "none";
			show.innerHTML = "<i class='material-icons'>video_label</i> Show Video";
		} else {
			//Show the video
			pCard.style.display = "flex";
			show.innerHTML = "<i class='material-icons'>videocam_off</i> Hide Video";
		}
	}
}

// to be called a short time after player loads
// if video is determined unplayable, will play from the next search item
function checkBadVideo() {
	console.log("skipping? " + player.getPlayerState() + " " + player.getVideoLoadedFraction() + " " + player.getVideoData().video_id); // debug
	if (player.getPlayerState() == YT.PlayerState.UNSTARTED && player.getVideoLoadedFraction() == 0) {
		console.log("skipping!!!"); // debug
		nextVideo();
	}
}

// play the next video in the search results
function nextVideo() {
	console.log("starting next video in search results");
	var next = nextsearchvid(playlist[curvid]);
	if (next != undefined) 
		player.loadVideoById(next);
}
