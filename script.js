const demos = [
  {
    id: "writing",
    title: "Writing help",
    category: "speech",
    kind: "Spoken Hokkien input",
    inputAudio: "./assets/audio/input-writing.wav",
    inputDuration: "00:07",
    response: "好啊，无问题。你先共我讲，你是欲写予谁？",
    gloss: "“Sure, no problem. First tell me: who are you writing it for?”",
    audio: "./assets/audio/writing.wav",
    duration: "00:04",
  },
  {
    id: "proverb",
    title: "A familiar proverb",
    category: "speech",
    kind: "Spoken Hokkien input",
    inputAudio: "./assets/audio/input-proverb.wav",
    inputDuration: "00:03",
    response: "好啊！我讲一个予你听。阿公，你敢有听过「食果子，拜树头」？",
    gloss: "“Sure, I’ll tell you one. Grandpa, have you heard: when eating the fruit, remember the tree?”",
    audio: "./assets/audio/proverb-curated.wav",
    duration: "00:05",
  },
  {
    id: "meaning",
    title: "Understanding a saying",
    category: "speech",
    kind: "Spoken Hokkien input",
    inputAudio: "./assets/audio/input-meaning.wav",
    inputDuration: "00:04",
    response: "意思就是讲，做人毋通太慌慢，爱有礼貌，按呢才会有人佮你做伙。",
    gloss: "“It means we shouldn’t be hasty or careless; be courteous, and people will want to be with you.”",
    audio: "./assets/audio/meaning.wav",
    duration: "00:05",
  },
  {
    id: "advice",
    title: "Everyday advice",
    category: "speech",
    kind: "Spoken Hokkien input",
    inputAudio: "./assets/audio/input-advice.wav",
    inputDuration: "00:04",
    response: "会使啊，你通试看觅，先去公园散步，抑是去公园食茶，心情会较好。",
    gloss: "“You could try taking a walk in the park, or sit down for tea. It may help you feel better.”",
    audio: "./assets/audio/everyday-advice.wav",
    duration: "00:06",
  },
  {
    id: "empathy-en",
    title: "Empathy, from English",
    category: "english",
    kind: "English text input",
    prompt: "I’m feeling awful today.",
    response: "哎哟，是无？敢是食着啥物无好的物件？",
    gloss: "“Oh dear, really? Did you eat something that made you unwell?”",
    audio: "./assets/audio/empathy-en.wav",
    duration: "00:04",
  },
  {
    id: "weather-en",
    title: "Weather, from English",
    category: "english",
    kind: "English text input",
    prompt: "How is the weather today?",
    response: "天气真好，太阳聊甲真热。汝是欲去佗位？",
    gloss: "“The weather is lovely, though the sun is very hot. Where are you heading?”",
    audio: "./assets/audio/weather-en.wav",
    duration: "00:04",
  },
  {
    id: "empathy-zh",
    title: "Empathy, from Chinese",
    category: "chinese",
    kind: "Chinese text input",
    prompt: "我今天心情有點不好。",
    response: "哎哟，是按怎？是发生啥物代志？讲予我听。",
    gloss: "“Oh no, what happened? Tell me what’s on your mind.”",
    audio: "./assets/audio/empathy-zh.wav",
    duration: "00:04",
  },
  {
    id: "weather-zh",
    title: "Weather, from Chinese",
    category: "chinese",
    kind: "Chinese text input",
    prompt: "今天天氣怎麼樣？",
    response: "阿嬷，天气真好，太阳喝甲真热。汝是欲去佗位？",
    gloss: "“The weather is lovely, though the sun is very hot. Where are you heading?”",
    audio: "./assets/audio/weather-zh.wav",
    duration: "00:04",
  },
];

const state = {
  filter: "all",
  selectedId: demos[0].id,
  activeAudio: null,
};

const demoList = document.querySelector("[data-demo-list]");
const demoDetail = document.querySelector("[data-demo-detail]");
const demoAudio = demoDetail?.querySelector("[data-reply-audio]");
const demoPlay = demoDetail?.querySelector(".demo-play");
const demoTrack = demoDetail?.querySelector(".demo-track span");
const demoTime = demoDetail?.querySelector(".demo-time");
const demoTextInput = demoDetail?.querySelector(".demo-text-input");
const demoAudioInput = demoDetail?.querySelector(".demo-audio-input");
const inputAudio = demoDetail?.querySelector("[data-input-audio]");
const inputPlay = demoDetail?.querySelector(".input-play");
const inputTrack = demoDetail?.querySelector(".input-track span");
const inputTime = demoDetail?.querySelector(".input-time");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function makeBars(target, count, seed = 1) {
  if (!target) return;
  target.innerHTML = "";
  let value = seed * 104729;
  for (let index = 0; index < count; index += 1) {
    value = (value * 48271) % 2147483647;
    const wave = Math.sin(index * 0.48) * 0.22 + Math.sin(index * 0.13) * 0.18;
    const random = (value / 2147483647) * 0.55;
    const bar = document.createElement("span");
    const height = Math.max(8, Math.min(96, (0.2 + random + wave) * 100));
    bar.style.setProperty("--height", `${height}%`);
    target.appendChild(bar);
  }
}

function stopOtherAudio(nextAudio) {
  if (state.activeAudio && state.activeAudio !== nextAudio) {
    state.activeAudio.pause();
  }
  state.activeAudio = nextAudio;
}

function renderDemoList() {
  if (!demoList) return;
  const filtered = demos.filter((demo) => state.filter === "all" || demo.category === state.filter);
  if (!filtered.some((demo) => demo.id === state.selectedId)) {
    state.selectedId = filtered[0]?.id;
  }

  demoList.innerHTML = "";
  filtered.forEach((demo, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = `demo-list-button${demo.id === state.selectedId ? " is-active" : ""}`;
    button.dataset.demoId = demo.id;
    button.innerHTML = `
      <span class="demo-list-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="demo-list-copy">
        <strong>${demo.title}</strong>
        <span>${demo.kind}</span>
      </span>
      <span class="demo-list-arrow" aria-hidden="true">${demo.id === state.selectedId ? "→" : ""}</span>
    `;
    button.addEventListener("click", () => {
      state.selectedId = demo.id;
      renderDemoList();
      renderDemoDetail();
    });
    item.appendChild(button);
    demoList.appendChild(item);
  });

  demoDetail?.querySelector(".demo-count")?.replaceChildren(
    document.createTextNode(`${String(filtered.findIndex((demo) => demo.id === state.selectedId) + 1).padStart(2, "0")} / ${String(filtered.length).padStart(2, "0")}`)
  );
}

function renderDemoDetail() {
  if (!demoDetail || !demoAudio || !inputAudio) return;
  const demo = demos.find((item) => item.id === state.selectedId);
  if (!demo) return;

  demoAudio.pause();
  inputAudio.pause();
  demoAudio.src = demo.audio;
  demoAudio.load();
  demoDetail.querySelector(".demo-kind").textContent = demo.kind;
  const hasInputAudio = Boolean(demo.inputAudio);
  demoTextInput.hidden = hasInputAudio;
  demoAudioInput.hidden = !hasInputAudio;
  demoDetail.querySelector(".demo-prompt").textContent = demo.prompt ?? "";
  if (hasInputAudio) {
    inputAudio.src = demo.inputAudio;
    inputAudio.load();
    inputTrack.style.width = "0%";
    inputTime.textContent = `00:00 / ${demo.inputDuration}`;
    inputPlay.querySelector("span").textContent = "▶";
    makeBars(demoDetail.querySelector("[data-input-waveform]"), 64, demos.indexOf(demo) + 17);
  } else {
    inputAudio.removeAttribute("src");
    inputAudio.load();
  }
  demoDetail.querySelector(".demo-hanji").textContent = demo.response;
  demoDetail.querySelector(".demo-gloss").textContent = demo.gloss;
  demoTrack.style.width = "0%";
  demoTime.textContent = `00:00 / ${demo.duration}`;
  demoPlay.querySelector("span").textContent = "▶";
  makeBars(demoDetail.querySelector("[data-waveform]"), 80, demos.indexOf(demo) + 2);
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-selected", String(item === button));
    });
    renderDemoList();
    renderDemoDetail();
  });
});

demoPlay?.addEventListener("click", () => {
  stopOtherAudio(demoAudio);
  if (demoAudio.paused) {
    demoAudio.play();
  } else {
    demoAudio.pause();
  }
});

demoAudio?.addEventListener("play", () => {
  demoPlay.querySelector("span").textContent = "Ⅱ";
});

demoAudio?.addEventListener("pause", () => {
  demoPlay.querySelector("span").textContent = "▶";
});

demoAudio?.addEventListener("timeupdate", () => {
  const demo = demos.find((item) => item.id === state.selectedId);
  const progress = demoAudio.duration ? (demoAudio.currentTime / demoAudio.duration) * 100 : 0;
  demoTrack.style.width = `${progress}%`;
  const total = Number.isFinite(demoAudio.duration) ? formatTime(demoAudio.duration) : demo?.duration ?? "00:00";
  demoTime.textContent = `${formatTime(demoAudio.currentTime)} / ${total}`;
});

demoAudio?.addEventListener("ended", () => {
  demoAudio.currentTime = 0;
});

inputPlay?.addEventListener("click", () => {
  stopOtherAudio(inputAudio);
  if (inputAudio.paused) {
    inputAudio.play();
  } else {
    inputAudio.pause();
  }
});

inputAudio?.addEventListener("play", () => {
  inputPlay.querySelector("span").textContent = "Ⅱ";
});

inputAudio?.addEventListener("pause", () => {
  inputPlay.querySelector("span").textContent = "▶";
});

inputAudio?.addEventListener("timeupdate", () => {
  const demo = demos.find((item) => item.id === state.selectedId);
  const progress = inputAudio.duration ? (inputAudio.currentTime / inputAudio.duration) * 100 : 0;
  inputTrack.style.width = `${progress}%`;
  const total = Number.isFinite(inputAudio.duration) ? formatTime(inputAudio.duration) : demo?.inputDuration ?? "00:00";
  inputTime.textContent = `${formatTime(inputAudio.currentTime)} / ${total}`;
});

inputAudio?.addEventListener("ended", () => {
  inputAudio.currentTime = 0;
});

document.querySelector(".input-timeline")?.addEventListener("click", (event) => {
  if (!inputAudio?.duration) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  inputAudio.currentTime = ratio * inputAudio.duration;
});

document.querySelector(".demo-timeline")?.addEventListener("click", (event) => {
  if (!demoAudio?.duration) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  demoAudio.currentTime = ratio * demoAudio.duration;
});

const header = document.querySelector("[data-header]");
const progressBar = document.querySelector(".page-progress span");
function handleScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  siteNav?.classList.toggle("is-open", !open);
});
siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

renderDemoList();
renderDemoDetail();
