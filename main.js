const audioFiles = [
  "https://files.catbox.moe/xl6yru.mp3",
  "https://files.catbox.moe/lvgepp.mp3",
  "https://files.catbox.moe/1100bo.mp3",
  "https://files.catbox.moe/4kmeo2.mp3"
];

let currentAudioIndex = 0;
const audioPlayer = document.getElementById("audioPlayer");
let userInteracted = false;

// អនុវត្តន៍ preload audio
async function preloadAudio(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error('កំហុស preload:', e);
    return url;
  }
}

// អនុវត្តន៍ load audio ថ្មី
async function loadAudio(index) {
  if (index < 0 || index >= audioFiles.length) return;
  
  currentAudioIndex = index;
  const blobUrl = await preloadAudio(audioFiles[index]);
  
  // រក្សាទុកស្ថានភាពចាក់បច្ចុប្បន្ន
  const wasPlaying = !audioPlayer.paused;
  
  audioPlayer.src = blobUrl;
  audioPlayer.load();
  
  // បន្តចាក់បើពីមុនកំពុងចាក់
  if (wasPlaying || userInteracted) {
    try {
      await audioPlayer.play();
    } catch (e) {
      console.log('កំហុសចាក់សម្លេង:', e);
    }
  }
  
  updateSongInfo();
}

// បន្ទាប់ចម្រៀង
async function nextSong() {
  currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
  await loadAudio(currentAudioIndex);
}

// ចម្រៀងមុន
async function prevSong() {
  currentAudioIndex = (currentAudioIndex - 1 + audioFiles.length) % audioFiles.length;
  await loadAudio(currentAudioIndex);
}

// បច្ចុប្បន្នភាពព័ត៌មានចម្រៀង
function updateSongInfo() {
  const songInfo = `🎶 ចម្រៀង ${currentAudioIndex + 1}/${audioFiles.length}`;
  document.querySelector('.audio-player h3').textContent = songInfo;
}

// គ្រប់គ្រងព្រីតុង
document.getElementById("nextBtn").addEventListener("click", nextSong);
document.getElementById("prevBtn").addEventListener("click", prevSong);

// ព្រីតុង Play ធំ
document.getElementById("playBtn").addEventListener("click", async () => {
  userInteracted = true;
  document.getElementById("playOverlay").style.display = "none";
  try {
    await audioPlayer.play();
  } catch (e) {
    console.log("កំហុសចាក់សម្លេង:", e);
  }
});

// រង្វិលជុំចម្រៀង
audioPlayer.addEventListener('ended', nextSong);

// ចាប់ផ្តើមផ្ទុកចម្រៀងដំបូង
window.addEventListener('DOMContentLoaded', () => {
  loadAudio(currentAudioIndex);
  
  // អនុញ្ញាតអោយចុចគ្រប់ទីកន្លែងលើអេក្រង់ដើម្បីចាក់សម្លេង
  document.body.addEventListener('click', () => {
    if (!userInteracted) {
      userInteracted = true;
      document.getElementById("playOverlay").style.display = "none";
      audioPlayer.play().catch(e => console.log(e));
    }
  });
});

// រក្សាទុកកូដ Falling Text និង Falling Images ដើម...
const chars = ["💖", "👑", "🌸", "💫", "🎵", "💕", "❤️", "🩷", 
  "✨", "🌷",
  "🌹", "💐", "🎀", "🦋", "🐦", "🌺", "🎉", "🌟", "💎", "🍬",
  "🧸", "🎶", "🎈", "🕊️", "🌻", "🌼", "💌", "🥰", "😻", "🦄",
  "💖", "👑", "🌸", "💫", "🎵", "💕", "❤️", "🩷", "✨", "🌷",
  "🌹", "💐", "🎀", "🦋", "🐦", "🌺", "🎉", "🌟", "💎", "🍬",
  "🧸", "🎶", "🎈", "🕊️", "🌻", "🌼", "💌", "🥰", "😻", "🦄"];

function createFallingText() {
  const text = document.createElement("div");
  text.classList.add("falling-text");
  text.style.left = Math.random() * 100 + "vw";
  text.style.animationDuration = 3 + Math.random() * 3 + "s";
  text.style.fontSize = (12 + Math.random() * 24) + "px";
  text.innerText = chars[Math.floor(Math.random() * chars.length)];
  document.body.appendChild(text);
  setTimeout(() => text.remove(), 5000);
}

setInterval(createFallingText, 300);

const imgUrls = [
  "https://files.catbox.moe/xs1ivr.JPG",
  "https://files.catbox.moe/w5tdg4.JPG",
  "https://files.catbox.moe/h1bqtv.JPG",
  "https://files.catbox.moe/88w4hu.JPG",
  "https://files.catbox.moe/1oorio.JPG"
];

function createFallingImage() {
  const img = document.createElement("img");
  img.classList.add("falling-photo-small");
  img.style.left = Math.random() * 120 + "vw";
  img.style.animationDuration = 3 + Math.random() * 3 + "s";
  img.src = imgUrls[Math.floor(Math.random() * imgUrls.length)];
  document.body.appendChild(img);
  setTimeout(() => img.remove(), 5000);
}

setInterval(createFallingImage, 1000);