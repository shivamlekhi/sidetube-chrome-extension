$(document).ready(function() {
	SaveValues();
	LoadValues();

});

var SaveButton = $("#save_settings");
var WindowSize = $('#window_dimens');
var YoutubeTheme = $('#youtube_theme');
var YoutubeAutoplay = $('#youtube_autoplay');

function SaveValues() {
	var YoutubeAutoplay;

	$("#save_settings").click(function() {
		if($("#youtube_autoplay").is(':checked')) {
			YoutubeAutoplay = 1;
		} else	{
			YoutubeAutoplay = 0;
		}

		localStorage["youtube_theme"] = $('#youtube_theme').val();
		localStorage["youtube_autoplay"] = YoutubeAutoplay;
		saveWidthAndHeight($('#window_dimens').val());
	alert("Settings Saved");
	});

}

function saveWidthAndHeight(selectedValue) {

	var height, width;
	switch(selectedValue){
		case "320_240":
		height = 240;
		width = 320;
		break;
		case "320_180":
		height = 180;
		width = 320;
		break;
		case "420_315":
		height = 315;
		width = 420;
		break;
		case "420_236":
		height = 236;
		width = 420;
		break;
		case "520_390":
		height = 390;
		width = 520;
		break;
		case "520_293":
		height = 293;
		width = 520;
		break;
		case "640_480":
		height = 480;
		width = 640;
		break;
		case "640_360":
		height = 360;
		width = 640;
		break;
	}

	localStorage["WindowSize_height"] = height;
	localStorage["WindowSize_width"] = width;
}

function LoadValues() {
	var height = localStorage["WindowSize_height"];
	var width = localStorage["WindowSize_width"];
	var YoutubeTheme = localStorage["youtube_theme"];
	var YoutubeAutoplay = localStorage["youtube_autoplay"];

	var selector = '#window_dimens option[value="' + height + "_" + width + '"]'; 

	$(selector).prop('selected',true);

	$('#youtube_theme option[value=' + YoutubeTheme + ']').prop('selected',true);	

	if(YoutubeAutoplay == 0) {
		$("#youtube_autoplay").prop("checked",false);
	} else {
		$("#youtube_autoplay").prop("checked",true);		
	}
}