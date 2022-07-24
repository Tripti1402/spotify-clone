console.log("Welcome to Spotify");

//Initializing the variables
let songIndex = 0; //initially 0th song will play
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('mygif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals (feat. Laura Brehm)", filePath: "song/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma Huma", filePath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Janji-Heroes-Tonight (feat. Johning)", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Stay Alive", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "2U - Justin Bieber", filePath: "song/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Nothing Like Us", filePath: "song/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Only Then - Bang Chan", filePath: "song/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Black Swan - Map of the soul", filePath: "song/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Still With You - jjk", filePath: "song/10.mp3", coverPath: "covers/10.jpg"}

]

songItem.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//to play audio
// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        //convert play icon to pause by removing fa playcircle and addinf pause circle
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    //pause the audio if playing
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    //creating a variable progress
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //to find kitne percent chal chuka hai audio
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    //current time = ProgressPercentage x duration / 100
})

//function to convert all sub-play button to pause
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


//to enable play/pause for play button at the side of each song
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
})





document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})