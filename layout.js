/**
 * Created by jeffm on 4/16/2016.
 */

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