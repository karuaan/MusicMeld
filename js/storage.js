
/* By Nicholas Cyprus (ngc0202) */

var playlists = {};

// To be called on page load. Retrieves local storage of playlists.
function retrieveplaylists() {
	var pltext = localStorage.getItem("playlists");
	if (pltext != null && pltext != "") {
		playlists = JSON.parse(pltext);
	} else {
		playlists = {};
		localStorage.setItem("playlists", "{}");
	}
	updateplaylists();
}

// writes playlists to local storage
function storeplaylists() {
	localStorage.setItem("playlists", JSON.stringify(playlists));
}

// adds current playlist to playlists with given name
function saveplaylist(plname) {
	playlists[plname] = playlist;
	storeplaylists();
	updateplaylists();
	$("#savePL").text("");
}

// updates UI list of playlists
function updateplaylists() {
	var pllist = $("#plList");
	var content = "";
	Object.keys(playlists).forEach(function (cur, _, _) {
		content += makepllistelem(cur);
	});
	pllist.html(content);
	regdelclicks();
	regloadclicks();
}

// remove playlist from playlists
function removeplaylist(plname) {
	delete playlists[plname];
	storeplaylists();
	updateplaylists();
}

// loads given playlist from playlists
function loadplaylist(plname) {
	var pl = playlists[plname];
	if (pl) {	
		playlist = pl;
		curvid = 0;
		updateplaylist();
		$("#unameDisplay").text(plname);
		startVideoID(playlist[curvid].videoid);
	}
}

// creates a UI playlist element
function makepllistelem(plname) {
	var elem = "<div class=\"mdl-list__item\">\n";
	elem += "<span class=\"mdl-list__item-primary-content\">";
	elem += plname;
	elem += "</span>\n";
	elem += "<a class=\"mdl-list__item-secondary-action\" href=\"#\" data-plname=\""
	elem += plname;
	elem += "\"><i class=\"material-icons\">delete</i></a>\n"
	elem += "</div>\n"
	return elem;
}

retrieveplaylists();
