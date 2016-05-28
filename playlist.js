function PlaylistItem(searchterm, searchresults, chosenselection) {
	this.searchterm = searchterm;
	this.searchresults = searchresults;
	this.chosenselection = chosenselection;
	this.videoid = searchresults[chosenselection].id.videoId;
	this.nextvid = function() {
		if (chosenselection+1 < searchresults.length) {
			chosenselection++;
			this.videoid = searchresults[chosenselection].id.videoId;
			return this.videoid;
		} else {
			return undefined;
		}
	}
}

var curvid = -1; //current playing video
var playlist = [];

function addtoplaylist(psitem) {
	playlist[playlist.length] = psitem;
	if (player == undefined || (curvid == playlist.length-2 && player.getPlayerState() == YT.PlayerState.ENDED)) {
		console.log("no player, starting video")
		curvid++;
		startVideoID(playlist[curvid].videoid);
	}
	updateplaylist();
}

// update HTML playlist
function updateplaylist() {
	var index, curitem;
	var content = '';
	content += '<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp mdl-color-text--accent-contrast" id="pltable">\n<thead>\n<tr>\n<th class="mdl-data-table__cell--non-numeric">Search Term</th>\n</tr>\n</thead>\n<tbody>';
	for (index = 0; index < playlist.length; index++) {
		curitem = playlist[index].searchterm;
		content += "<tr>\n<td>";
		content += curitem;
		content += "</td>\n</tr>\n";
	}
	content += "</tbody>\n</table>";
	$('#plTableCon').html(content);
	componentHandler.upgradeDom();
	// bug: update material design (??)
}

// Handle form submission
function parseAndPlay(e) {
	e.preventDefault(); // stop submit action
	var searchResults;
	var term = form.videolink.value;
	if (term.indexOf("youtube.com/watch?v=") >= 0) { // valid link?
		var vid = term.substring(term.indexOf("=")+1);
		//startVideoID(vid);
		addtoplaylist(new PlaylistItem(term, [{id: {videoId: vid}}], 0)); // change to use title as term? 
	} else { // invalid link - search
		if (term === "") return; //term = "alestorm drink"; // default video :)
		var search = new XMLHttpRequest();
		search.onreadystatechange = function() { 
			if (search.readyState == 4 && search.status == 200) {
				searchResults = JSON.parse(search.responseText).items;
				var vid = searchResults[0].id.videoId;
				addtoplaylist(new PlaylistItem(term, searchResults, 0));
				//startVideoID(vid);
			}
		}

		//TODO: THIS IS DANGEROUS!!! Sanitize input and put API key server-side.
		search.open("GET", "https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyA8174wCTa_zsaDX0bI8YCwaAqn9iVCJVw&maxResults=30&type=video&videoEmbeddable=true&q="+term.replace(/ /g, "+"), true);
		search.send();
		emptysearch();
	}
}

// remove selected items when button is pressed
function removeItems(e) {
	var items = $("#pltable tbody tr");
	playlist = playlist.filter(function (_, index, _) {
		return items[index].className !== "is-selected";
	});
	updateplaylist();
}

// clears the search box
function emptysearch() {
	$("#videolink")[0].value = "";
}