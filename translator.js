let emojiDictionary = {};
let emojiCombos = {};
let slangDictionary = {};
let uiStrings = {}; 

function loadLanguage(lang) {
  Promise.all([
    fetch(`lang/${lang}.json`).then(res => res.json()),
    fetch(`dictionaries/emoji_${lang}.json`).then(res => res.json()),
    fetch(`dictionaries/slang_${lang}.json`).then(res => res.json()),
    fetch(`dictionaries/combos_${lang}.json`).then(res => res.json())  
  ]).then(([strings, emojiData, slangData, comboData]) => {
    uiStrings = strings; 

    document.title = uiStrings.title;
    document.querySelector("h2").textContent = uiStrings.title;
    document.querySelector("p").textContent = uiStrings.description;
    document.querySelector("button").textContent = uiStrings.translateButton;
    document.getElementById("inputText").placeholder = uiStrings.inputPlaceholder;
    document.getElementById("output").dataset.label = uiStrings.outputLabel;

    emojiDictionary = emojiData;
    slangDictionary = slangData;
    emojiCombos = comboData;

    const outputDiv = document.getElementById("output");
    outputDiv.innerText = "";
    outputDiv.classList.add("invisible");
  });
}


function translateMessage() {
  let input = document.getElementById("inputText").value.toLowerCase();
  let result = input;

  if (typeof emojiCombos !== "undefined") {
    for (const [combo, meaning] of Object.entries(emojiCombos)) {
      const regex = new RegExp(combo, "g");
      result = result.replace(regex, `[${meaning}]`);
    }
  }

  for (const [emoji, meaning] of Object.entries(emojiDictionary)) {
    const regex = new RegExp(emoji, "g");
    result = result.replace(regex, `[${meaning}]`);
  }

  for (const [slang, meaning] of Object.entries(slangDictionary)) {
    const safeSlang = slang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safeSlang, "gi");
    result = result.replace(regex, `[${meaning}]`);
  }

  const outputDiv = document.getElementById("output");
  outputDiv.innerText = uiStrings.outputLabel + "\n" + result;
  outputDiv.classList.remove("invisible");
}

window.addEventListener("DOMContentLoaded", () => {
  const lang = document.getElementById("language-select").value;
  loadLanguage(lang);
});
