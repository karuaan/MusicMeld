
/* By Nicholas Cyprus (ngc0202) */

$(document).ready(function () {
	$("#acctCard").toggle(0);
});

$("#acctBtn").click(function() {
	$("#acctCard").slideToggle(800,"easeOutBounce");
});

$("#playlistBtn").click(function () {
	var playlistShown = ($("#playlistCard").css("visibility")=="visible");
	
	if (playlistShown) {
		$("#playlistCard").css("visibility","hidden");
		$("#addSongSection").hide();
		$("#playlistBtn").css("visibility","visible");
	} else {
		$("#playlistCard").css("visibility","visible");
		$("#addSongSection").show();
		$("#playlistBtn").css("visibility","visible");
	}
});

$("#savePLbutton").click(function (e) {
	e.preventDefault();
	var plname = $("#savePL")[0].value;
	if (plname != undefined && plname != "" && playlist.length > 0) {
		saveplaylist(plname);
	}
});

function regdelclicks() {
	$("#plList div a").click(function (e) {
		var plname = e.currentTarget.dataset.plname;
		if (plname && plname != "") {
			removeplaylist(plname);
		}
	});
}

function regloadclicks() {
	$("#plList div").click(function (e) {
		var plname = $(e.currentTarget).find('span').text();
		if (plname && plname != "") {
			loadplaylist(plname);
		}
	});
}

regdelclicks();
regloadclicks();