const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const hornBtn = document.getElementById("hornBtn");
const hornAudio = document.getElementById("hornAudio");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const clock = document.getElementById("clock");

const shayari = document.getElementById("shayari");

const songList = document.getElementById("songList");


const songs = [

    {
        id:1,
        title: "Khas koi ladka Mujhe Pyar karta ",
        artist: "lapatts",
        category: "love",
        singer: "lata",
        src: "audio/song1.mp3"
    },

    {
        id:2,
        title: "Aitbaar Nhi Karna",
        artist: "udit narayan",
        category: "love",
        singer: "rafi",
        src: "audio/song2.mp3"
    },

    {
        id:3,
        title: "Tumse Milne Ko Dil",
        artist: "priti uttam",
        category: "love",
        singer: "lata",
        src: "audio/song3.mp3"
    },

    {
        id:4,
        title: "Barsaat ke Mausam Mein .",
        artist: "Asha Bhosle",
        category: "classic",
        singer: "asha",
        src: "audio/song4.mp3"
    },

    {
        id:5,
        title: "Raah Mein Unse Mulakat Ho gyi",
        artist: "A R rahman",
        category: "romantic",
        singer: "kishore",
        src: "audio/song5.mp3"
    },

    {
        id:6,
        title: "Tere Pyar Mein Main Marjawan",
        artist: "Abhjjit",
        category: "sad",
        singer: "rafi",
        src: "audio/song6.mp3"
    },

    {
        id: 7,
        title: "Teri Chunnariya Dil Le Gayi ",
        artist: "Chandan dixit",
        category: "romantic",
        singer: "lata",
        src: "audio/song7.mp3"
    },

    {
        id:8,
        title: "Shaam Bhi khoob Hai pass ",
        artist: "Suresh Wadkar",
        category: "classic",
        singer: "asha",
        src: "audio/song8.mp3"
    },

    {
        id:9,
        title: "Chhod Aaye Hum Wo Galiyan",
        artist: "Suresh Wadkar",
        category: "classic",
        singer: "asha",
        src: "audio/song9.mp3"
    },

    {
        id: 10,
        title: "Bhut Jatate Ho chah Hamse ",
        artist: "Chandan dixit",
        category: "romantic",
        singer: "lata",
        src: "audio/song10.mp3"
    },

    {
        id:11,
        title: " Yaar Badal na Jana",
        artist: "Abhjjit",
        category: "sad",
        singer: "rafi",
        src: "audio/song11.mp3"
    },

    {
        id:12,
        title: "Pardesi Pardesi",
        artist: "priti uttam",
        category: "sad",
        singer: "rafi",
        src: "audio/song12.mp3"
    }

];


let currentSong = 0;
let activeCategory = "all";
let filteredSongs = [...songs];


function loadSong(index) {

    const song = filteredSongs[index];

    if (!song) return;

    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    audioPlayer.src = song.src;

    progressBar.value = 0;
}


function playSong() {

    audioPlayer.play();

    playBtn.textContent = "⏸";
}


function pauseSong() {

    audioPlayer.pause();

    playBtn.textContent = "▶";
}

audioPlayer.addEventListener("pause", () => {
    playBtn.textContent = "▶";
});

audioPlayer.addEventListener("play", () => {
    playBtn.textContent = "⏸";
});

playBtn.addEventListener("click", () => {

    if (audioPlayer.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


nextBtn.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= filteredSongs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();

});


previousBtn.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = filteredSongs.length - 1;
    }

    loadSong(currentSong);

    playSong();

});


audioPlayer.addEventListener("timeupdate", () => {

    const progress =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    progressBar.value = progress || 0;

    currentTime.textContent =
        formatTime(audioPlayer.currentTime);

});


audioPlayer.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audioPlayer.duration);

});


progressBar.addEventListener("input", () => {

    audioPlayer.currentTime =
        (progressBar.value / 100) *
        audioPlayer.duration;

});


audioPlayer.addEventListener("ended", () => {

    nextBtn.click();

});


function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return minutes + ":" +
        String(remainingSeconds).padStart(2, "0");

}


loadSong(currentSong);


/* CLOCK */

function updateClock() {

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString("en-IN", {

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"

        });

}


updateClock();

setInterval(updateClock, 1000);


/* HORN */

hornBtn.addEventListener("click", () => {

    hornAudio.currentTime = 0;

    hornAudio.play();

    hornBtn.classList.remove("horn-active");

    void hornBtn.offsetWidth;

    hornBtn.classList.add("horn-active");

});


/* DISPLAY SONGS */

function displaySongs(list) {

    if (!songList) return;

    songList.innerHTML = "";

    list.forEach((song, index) => {

        const songElement =
            document.createElement("div");

        songElement.className = "song";

        songElement.innerHTML = `
            <div class="song-info">

                <div class="song-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div>
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>

            </div>

            <span class="song-duration">
                --:--
            </span>

            <button class="play-song">
                ▶
            </button>
        `;


        songElement
            .querySelector(".play-song")
            .addEventListener("click", () => {

                currentSong =
                    filteredSongs.indexOf(song);

                loadSong(currentSong);

                playSong();

            });


        songList.appendChild(songElement);

    });

}


/* CATEGORY FILTER */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory =
            button.dataset.category;


        if (activeCategory === "all") {

            filteredSongs = [...songs];

        } else {

            filteredSongs =
                songs.filter(song =>
                    song.category === activeCategory
                );

        }


        currentSong = 0;

        displaySongs(filteredSongs);


        if (filteredSongs.length > 0) {

            loadSong(currentSong);

            pauseSong();

        }

    });

});


/* SHAYARI */

const songShayari = {

    "Pal Pal Dil Ke Paas": [

        {
            time: 0,
            text: "कुछ गाने सिर्फ सुने नहीं जाते, महसूस किए जाते हैं..."
        },

        {
            time: 10,
            text: "कुछ यादें हमेशा दिल में रहती हैं..."
        },

        {
            time: 20,
            text: "वो दौर भी कितना खूबसूरत था..."
        }

    ],


    "Gulabi Aankhen": [

        {
            time: 0,
            text: "मोहब्बत में कुछ बातें कही नहीं जातीं..."
        },

        {
            time: 10,
            text: "कुछ एहसास सिर्फ महसूस होते हैं..."
        },

        {
            time: 20,
            text: "पुराने गाने, पुरानी यादें..."
        }

    ],


    "Ajeeb Dastan Hai Yeh": [

        {
            time: 0,
            text: "कुछ दर्द सिर्फ संगीत समझता है..."
        },

        {
            time: 10,
            text: "कुछ यादें भुलाने से भी नहीं भूलतीं..."
        },

        {
            time: 20,
            text: "खामोशी भी कभी-कभी बहुत कुछ कहती है..."
        }

    ],


    "Dum Maro Dum": [

        {
            time: 0,
            text: "90s का दौर ही कुछ अलग था..."
        },

        {
            time: 10,
            text: "पुराने गानों की बात ही अलग थी..."
        },

        {
            time: 20,
            text: "कुछ धुनें कभी पुरानी नहीं होतीं..."
        }

    ]

};


function updateShayari() {

    const currentSongTitle =
        songTitle.textContent;

    const lines =
        songShayari[currentSongTitle];

    if (!lines) return;


    let currentLine = lines[0];


    for (let i = 0; i < lines.length; i++) {

        if (
            audioPlayer.currentTime >=
            lines[i].time
        ) {

            currentLine = lines[i];

        }

    }


    shayari.textContent =
        currentLine.text;

}


audioPlayer.addEventListener(
    "timeupdate",
    updateShayari
);


/* SINGER CARDS */

const singerCards =
    document.querySelectorAll(".singer-card");


singerCards.forEach(card => {

    const button =
        card.querySelector("button");


    button.addEventListener("click", () => {

        const singer =
            card.dataset.singer;


        filteredSongs =
            songs.filter(song =>
                song.singer === singer
            );


        currentSong = 0;


        displaySongs(filteredSongs);


        if (filteredSongs.length > 0) {

            loadSong(currentSong);

            pauseSong();


            document
                .querySelector(".songs-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });

});


/* EXPLORE BUTTONS */

const singerButtons =
    document.querySelectorAll(".explore-singer");


singerButtons.forEach(button => {

    button.addEventListener("click", () => {

        const singer =
            button.dataset.singer;


        filteredSongs =
            songs.filter(song =>
                song.singer === singer
            );


        currentSong = 0;


        displaySongs(filteredSongs);


        if (filteredSongs.length > 0) {

            loadSong(currentSong);

            pauseSong();


            document
                .querySelector(".songs-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });

});


/* INITIAL SONG LIST */

displaySongs(filteredSongs);

const playlistCards =
    document.querySelectorAll(".playlist-card");

    playlistCards.forEach(card => {

    card.addEventListener("click", () => {

        const category =
            card.dataset.category;

        filteredSongs =
            songs.filter(song =>
                song.category === category
            );

        currentSong = 0;

        displaySongs(filteredSongs);

        if (filteredSongs.length > 0) {

            loadSong(currentSong);

            pauseSong();

            document
                .querySelector("#songList")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });

});