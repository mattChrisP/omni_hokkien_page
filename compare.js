const comparisonSamples = [
  {
    id: "01",
    title: "Spoken sample 01",
    kind: "Hokkien audio input",
    inputAudio: "./assets/comparison/01/01_input.wav",
    outputs: {
      omnihokkien: "./assets/comparison/01/01_omnihokkien.wav",
      gptaudio: "./assets/comparison/01/01_gptaudio.wav",
      qwen: "./assets/comparison/01/01_qwen.wav",
    },
  },
  {
    id: "02",
    title: "Writing help",
    kind: "Hokkien audio input",
    inputAudio: "./assets/comparison/02/02_input.wav",
    outputs: {
      omnihokkien: "./assets/comparison/02/02_omnihokkien.wav",
      gptaudio: "./assets/comparison/02/02_gptaudio.wav",
      qwen: "./assets/comparison/02/02_qwen.wav",
    },
  },
  {
    id: "03",
    title: "Spoken sample 03",
    kind: "Hokkien audio input",
    inputAudio: "./assets/comparison/03/03_input.wav",
    outputs: {
      omnihokkien: "./assets/comparison/03/03_omnihokkien.wav",
      gptaudio: "./assets/comparison/03/03_gptaudio.wav",
      qwen: "./assets/comparison/03/03_qwen.wav",
    },
  },
  {
    id: "04",
    title: "A familiar proverb",
    kind: "Hokkien audio input",
    inputAudio: "./assets/comparison/04/04_input.wav",
    outputs: {
      omnihokkien: "./assets/comparison/04/04_omnihokkien.wav",
      gptaudio: "./assets/comparison/04/04_gptaudio.wav",
      qwen: "./assets/comparison/04/04_qwen.wav",
    },
  },
  {
    id: "05",
    title: "Understanding a saying",
    kind: "Hokkien audio input",
    inputAudio: "./assets/comparison/05/05_input.wav",
    outputs: {
      omnihokkien: "./assets/comparison/05/05_omnihokkien.wav",
      gptaudio: "./assets/comparison/05/05_gptaudio.wav",
      qwen: "./assets/comparison/05/05_qwen.wav",
    },
  },
  {
    id: "06",
    title: "Everyday advice",
    kind: "Hokkien audio input",
    inputAudio: "./assets/comparison/06/06_input.wav",
    outputs: {
      omnihokkien: "./assets/comparison/06/06_omnihokkien.wav",
      gptaudio: "./assets/comparison/06/06_gptaudio.wav",
      qwen: "./assets/comparison/06/06_qwen.wav",
    },
  },
  {
    id: "07",
    title: "Spoken sample 07",
    kind: "Hokkien audio input",
    inputAudio: "./assets/comparison/07/07_input.wav",
    outputs: {
      omnihokkien: "./assets/comparison/07/07_omnihokkien.wav",
      gptaudio: "./assets/comparison/07/07_gptaudio.wav",
      qwen: "./assets/comparison/07/07_qwen.wav",
    },
  },
  {
    id: "08",
    title: "Draft a day-off email",
    kind: "English text input",
    prompt: "Draft an email for me to request to take a day off at work.",
    outputs: {
      omnihokkien: "./assets/comparison/08_en_text/08_omnihokkien.wav",
      gptaudio: "./assets/comparison/08_en_text/08_gptaudio.wav",
      qwen: "./assets/comparison/08_en_text/08_qwen.wav",
    },
  },
  {
    id: "09",
    title: "Feeling unwell",
    kind: "English text input",
    prompt: "I'm feeling awful today.",
    outputs: {
      omnihokkien: "./assets/comparison/09_en_text/09_omnihokkien.wav",
      gptaudio: "./assets/comparison/09_en_text/09_gptaudio.wav",
      qwen: "./assets/comparison/09_en_text/09_qwen.wav",
    },
  },
  {
    id: "10",
    title: "Feeling low",
    kind: "Chinese text input",
    prompt: "我今天心情有点不好。",
    outputs: {
      omnihokkien: "./assets/comparison/10_zh_text/10_omnihokkien.wav",
      gptaudio: "./assets/comparison/10_zh_text/10_gptaudio.wav",
      qwen: "./assets/comparison/10_zh_text/10_qwen.wav",
    },
  },
];

const comparedModels = [
  { key: "omnihokkien", name: "OmniHokkien", note: "This release", featured: true },
  { key: "gptaudio", name: "GPT Audio", note: "Comparison output" },
  { key: "qwen", name: "Qwen3.5-Omni-Plus", note: "Comparison output" },
];

const comparisonState = {
  selected: 1,
  activeAudio: null,
};

const sampleList = document.querySelector("[data-compare-samples]");
const detail = document.querySelector("[data-comparison-detail]");
const inputRegion = document.querySelector("[data-comparison-input]");
const outputsRegion = document.querySelector("[data-model-outputs]");

function formatComparisonTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function makeComparisonWave(target, count, seed) {
  let value = seed * 65537;
  for (let index = 0; index < count; index += 1) {
    value = (value * 48271) % 2147483647;
    const wave = Math.sin(index * 0.41) * 0.21 + Math.sin(index * 0.12) * 0.17;
    const random = (value / 2147483647) * 0.55;
    const bar = document.createElement("span");
    const height = Math.max(8, Math.min(96, (0.22 + random + wave) * 100));
    bar.style.setProperty("--height", `${height}%`);
    target.appendChild(bar);
  }
}

function pauseActiveAudio(nextAudio) {
  if (comparisonState.activeAudio && comparisonState.activeAudio !== nextAudio) {
    comparisonState.activeAudio.pause();
  }
  comparisonState.activeAudio = nextAudio;
}

function createComparisonPlayer(src, label, seed, source = false) {
  const wrapper = document.createElement("div");
  wrapper.className = source ? "compare-player source-player" : "compare-player";

  const button = document.createElement("button");
  button.className = "compare-play";
  button.type = "button";
  button.setAttribute("aria-label", `Play ${label}`);
  button.innerHTML = '<span aria-hidden="true">▶</span>';

  const main = document.createElement("div");
  main.className = "compare-player-main";
  const wave = document.createElement("div");
  wave.className = "compare-wave";
  wave.setAttribute("aria-hidden", "true");
  makeComparisonWave(wave, source ? 64 : 72, seed);

  const seek = document.createElement("div");
  seek.className = "compare-seek";
  seek.setAttribute("role", "slider");
  seek.setAttribute("aria-label", `Seek ${label}`);
  seek.setAttribute("aria-valuemin", "0");
  seek.setAttribute("aria-valuemax", "100");
  seek.setAttribute("aria-valuenow", "0");
  seek.innerHTML = "<span></span>";

  const progress = seek.querySelector("span");
  main.append(wave, seek);

  const time = document.createElement("time");
  time.className = "compare-time";
  time.textContent = "00:00 / 00:00";

  const audio = document.createElement("audio");
  audio.preload = "metadata";
  audio.src = src;

  button.addEventListener("click", () => {
    pauseActiveAudio(audio);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    button.querySelector("span").textContent = "Ⅱ";
    wrapper.classList.add("is-playing");
  });

  audio.addEventListener("pause", () => {
    button.querySelector("span").textContent = "▶";
    wrapper.classList.remove("is-playing");
  });

  audio.addEventListener("loadedmetadata", () => {
    time.textContent = `00:00 / ${formatComparisonTime(audio.duration)}`;
  });

  audio.addEventListener("timeupdate", () => {
    const ratio = audio.duration ? audio.currentTime / audio.duration : 0;
    progress.style.width = `${ratio * 100}%`;
    seek.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
    time.textContent = `${formatComparisonTime(audio.currentTime)} / ${formatComparisonTime(audio.duration)}`;
  });

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
  });

  seek.addEventListener("click", (event) => {
    if (!audio.duration) return;
    const bounds = seek.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    audio.currentTime = ratio * audio.duration;
  });

  wrapper.append(button, main, time, audio);
  return wrapper;
}

function renderSampleList() {
  sampleList.innerHTML = "";
  comparisonSamples.forEach((sample, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = `compare-sample-button${index === comparisonState.selected ? " is-active" : ""}`;
    button.innerHTML = `
      <span class="compare-sample-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="compare-sample-copy">
        <strong></strong>
        <span></span>
      </span>
      <span class="compare-sample-arrow" aria-hidden="true">${index === comparisonState.selected ? "→" : ""}</span>
    `;
    button.querySelector("strong").textContent = sample.title;
    button.querySelector(".compare-sample-copy span").textContent = sample.kind;
    button.addEventListener("click", () => selectSample(index));
    item.appendChild(button);
    sampleList.appendChild(item);
  });
}

function renderComparisonDetail() {
  const sample = comparisonSamples[comparisonState.selected];
  comparisonState.activeAudio?.pause();
  comparisonState.activeAudio = null;

  detail.querySelector(".comparison-kind").textContent = sample.kind;
  detail.querySelector(".comparison-count").textContent =
    `${String(comparisonState.selected + 1).padStart(2, "0")} / ${String(comparisonSamples.length).padStart(2, "0")}`;

  inputRegion.innerHTML = "";
  const inputLabel = document.createElement("p");
  inputLabel.className = "comparison-label";
  inputLabel.textContent = sample.inputAudio ? "Original Hokkien input" : "Original text input";
  inputRegion.appendChild(inputLabel);

  if (sample.inputAudio) {
    inputRegion.appendChild(
      createComparisonPlayer(sample.inputAudio, `${sample.title} input`, comparisonState.selected + 31, true)
    );
  } else {
    const prompt = document.createElement("p");
    prompt.className = "comparison-text-prompt";
    prompt.textContent = sample.prompt;
    if (sample.kind.startsWith("Chinese")) prompt.lang = "zh-Hans";
    inputRegion.appendChild(prompt);
  }

  outputsRegion.innerHTML = "";
  comparedModels.forEach((model, modelIndex) => {
    const row = document.createElement("section");
    row.className = `model-output${model.featured ? " is-featured" : ""}`;

    const name = document.createElement("div");
    name.className = "model-name";
    const strong = document.createElement("strong");
    strong.textContent = model.name;
    const note = document.createElement("span");
    note.textContent = model.note;
    name.append(strong, note);

    const player = createComparisonPlayer(
      sample.outputs[model.key],
      `${model.name} response for ${sample.title}`,
      (comparisonState.selected + 1) * 11 + modelIndex
    );
    row.append(name, player);
    outputsRegion.appendChild(row);
  });
}

function selectSample(index) {
  comparisonState.selected = (index + comparisonSamples.length) % comparisonSamples.length;
  renderSampleList();
  renderComparisonDetail();
}

document.querySelector("[data-previous-sample]")?.addEventListener("click", () => {
  selectSample(comparisonState.selected - 1);
});

document.querySelector("[data-next-sample]")?.addEventListener("click", () => {
  selectSample(comparisonState.selected + 1);
});

const header = document.querySelector("[data-header]");
const progressBar = document.querySelector(".page-progress span");
function handleComparisonScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}
window.addEventListener("scroll", handleComparisonScroll, { passive: true });
handleComparisonScroll();

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
renderSampleList();
renderComparisonDetail();
