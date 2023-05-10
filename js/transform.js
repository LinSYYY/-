// 页面切换
var Discover = document.getElementById("nav_discover");
var Recommended = document.getElementById("nav_recommended");
var Radio = document.getElementById("nav_radio");
var Songlists = document.getElementById("Songlists");
var nav = document.querySelector('nav')
var play_img = document.getElementById("play_img");



var Dspan = document
    .getElementById("nav_discover")
    .getElementsByTagName("span")[0];
var Rspan = document
    .getElementById("nav_recommended")
    .getElementsByTagName("span")[0];
var Raspan = document
    .getElementById("nav_radio")
    .getElementsByTagName("span")[0];


var discoverpage = document.getElementById("Discover");
var recommendpage = document.getElementById("Recommended");
var radiopage = document.getElementById("Radio");
var songlistspage = document.getElementById("Songlists");
var Lyricspage = document.getElementById("Lyrics");

play_img.onclick = function(){
    Lyricspage.style.display = "block";
    discoverpage.style.display = "none";
    recommendpage.style.display = "none";
    radiopage.style.display = "none";
    songlistspage.style.display = "none";
    searchResults.style.display = "none";
}

Discover.onclick = function () {
    discoverpage.style.display = "block";
    Discover.style.color = "#fff";
    Dspan.style.display = "block";

    recommendpage.style.display = "none";
    Recommended.style.color = "#4c5262";
    Rspan.style.display = "none";

    radiopage.style.display = "none";
    Radio.style.color = "#4c5262";
    Raspan.style.display = "none";

    songlistspage.style.display = "none";

    searchResults.style.display = "none";

    Lyricspage.style.display = "none";
};
Recommended.onclick = function () {
    recommendpage.style.display = "block";
    Recommended.style.color = "#fff";
    Rspan.style.display = "block";

    discoverpage.style.display = "none";
    discoverpage.style
    Discover.style.color = "#4c5262";
    Dspan.style.display = "none";

    radiopage.style.display = "none";
    Radio.style.color = "#4c5262";
    Raspan.style.display = "none";

    songlistspage.style.display = "none";

    searchResults.style.display = "none";

    Lyricspage.style.display = "none";
};
Radio.onclick = function () {
    radiopage.style.display = "block";
    Radio.style.color = "#fff";
    Raspan.style.display = "block";

    recommendpage.style.display = "none";
    Recommended.style.color = "#4c5262";
    Rspan.style.display = "none";

    discoverpage.style.display = "none";
    Discover.style.color = "#4c5262";
    Dspan.style.display = "none";

    songlistspage.style.display = "none";

    searchResults.style.display = "none";

    Lyricspage.style.display = "none";
};

// 左边部分切换
var playlist = document.getElementById("Playlist");
var Last_Listening = document.getElementById("Last Listening");
var My_Library = document.getElementById("My Library");


playlist.onclick = function(){
    console.log(playlist);
    playlist.classList.add("active");
    Last_Listening.classList.remove("active");
    My_Library.classList.remove("active");

    song_playlistpage.style.display = "block";
    song_lastlisteningpage.style.display = "none";
    my_librarypage.style.display = "none";

    song_playlistpage.classList.add("active");
    song_lastlisteningpage.classList.remove("active");
    my_librarypage.classList.remove("active");

    song_side.style.display = "flex";
    library_side.style.display = "none";
}

Last_Listening.onclick = function(){
    playlist.classList.remove("active");
    Last_Listening.classList.add("active");
    My_Library.classList.remove("active");

    song_playlistpage.style.display = "none";
    song_lastlisteningpage.style.display = "block";
    my_librarypage.style.display = "none";

    song_playlistpage.classList.remove("active");
    song_lastlisteningpage.classList.add("active");
    my_librarypage.classList.remove("active");

    song_side.style.display = "flex";
    library_side.style.display = "none";
}

My_Library.onclick = function(){
    playlist.classList.remove("active");
    Last_Listening.classList.remove("active");
    My_Library.classList.add("active");

    song_playlistpage.style.display = "none";
    song_lastlisteningpage.style.display = "none";
    my_librarypage.style.display = "block";

    song_playlistpage.classList.remove("active");
    song_lastlisteningpage.classList.remove("active");
    my_librarypage.classList.add("active");

    song_side.style.display = "none";
    library_side.style.display = "flex";
}

var song_playlistpage = document.getElementById("song_playlist");
var song_lastlisteningpage = document.getElementById("song_lastlistening");
var my_librarypage = document.getElementById("my_library");
// 左边部分切换

var song_side = document.getElementsByClassName("song_side")[0];
var library_side = document.getElementsByClassName("library_side")[0];