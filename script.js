document.addEventListener("DOMContentLoaded", () => {
const powerContainer = document.getElementById("power-container");
const powerBar = document.getElementById("power-bar");
const powerValue = document.getElementById("power-value");
const bankContainer = document.getElementById("bank-container");
const bankBar = document.getElementById("bank-bar");
const bankValue = document.getElementById("bank-value");
const slider = document.getElementById("main-slider");
const thumb = document.getElementById("slider-thumb");
const sliderValue = document.getElementById("slider-value");
const pads = document.querySelectorAll(".drum-pad");
const display = document.getElementById("display");
const audios = document.querySelectorAll(".clip");
  const bank1 = {
  Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
};

const bank2 = {
  Q: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  W: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  E: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  A: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  S: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  D: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  Z: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  X: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  C: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
};
let isPowerOn = false;

const volume = slider.value / 100;

audios.forEach(audio => {
audio.volume = volume;
  

  thumb.style.left = slider.value + '%';
});
powerContainer.addEventListener("click", () => {
  isPowerOn = !isPowerOn;
  if (isPowerOn) {
    powerBar.style.left = "50%";
    powerBar.style.backgroundColor = "green"; // ON
  } else {
    powerBar.style.left = "0%";
    powerBar.style.backgroundColor = "red";   // OFF
  }
});
let isBankA = true;
bankContainer.addEventListener("click", () => {
  isBankA = !isBankA;
 if (isBankA) {
    bankBar.style.left = "50%";
    bankBar.style.backgroundColor = "green"; // ON
  } else {
    bankBar.style.left = "0%";
    bankBar.style.backgroundColor = "red";   // OFF
  }
});


pads.forEach(pad => {
  pad.addEventListener("click", () => {
    if (!isPowerOn) return; // 🚫 do nothing if OFF
    const key = pad.id;
    const audio = pad.querySelector("audio");
    const name = pad.getAttribute("data-name");
    const sound = isBankA ? bank1[key] : bank2[key];

    audio.src = sound;
    audio.currentTime = 0;
    audio.play();
    
    display.textContent = name; // ✅ update display
    pad.classList.add("active");
    setTimeout(() => pad.classList.remove("active"), 100);
  });
});
document.addEventListener("keydown", (e) => {
  if (!isPowerOn) return; // 🚫 ignore if OFF

  const key = e.key.toUpperCase();
  const allowedKeys = ["Q","W","E","A","S","D","Z","X","C"];
  if (!allowedKeys.includes(key)) return;
  const audio = document.querySelector(`audio#${key}`);
  const pad = document.querySelector(`.drum-pad#${key}`);
  
  if (audio) {
    const pad = audio.parentElement;
    const name = pad.getAttribute("data-name");
    const sound = isBankA ? bank1[key] : bank2[key];

  audio.src = sound;
    audio.currentTime = 0;
    audio.play();
    
    display.textContent = name; // ✅ update display
    pad.classList.add("active");
    setTimeout(() => pad.classList.remove("active"), 100);
  }
  
});
slider.addEventListener("input", (e) => {
  const val = e.target.value;

  // move thumb (you already had this)
  thumb.style.left = val + '%';

  // convert 0–100 → 0–1
  const volume = val / 100;

  // apply to ALL sounds
  audios.forEach(audio => {
    audio.volume = volume;
  });

  // optional display
  display.textContent = "Volume " + val;
});
});