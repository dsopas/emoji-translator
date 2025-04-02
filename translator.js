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
    document.getElementById("export-button").textContent = uiStrings.exportButton;

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

function exportEmojiDictionary() {
  const lang = document.getElementById("language-select")?.value || "en";
  const emojiFile = `dictionaries/emoji_${lang}.json`;
  const combosFile = `dictionaries/combos_${lang}.json`;
  const slangFile = `dictionaries/slang_${lang}.json`;

  Promise.all([
    fetch(emojiFile).then(res => res.json()),
    fetch(combosFile).then(res => res.json()),
    fetch(slangFile).then(res => res.json())
  ])
    .then(([emojiData, combosData, slangData]) => {
      const emojiTableRows = Object.entries(emojiData)
        .map(([emoji, meaning]) => `<tr><td>${emoji}</td><td>${meaning}</td></tr>`) 
        .join('');

      const combosTableRows = Object.entries(combosData)
        .map(([combo, meaning]) => `<tr><td>${combo}</td><td>${meaning}</td></tr>`) 
        .join('');
        
      const slangTableRows = Object.entries(slangData)
        .map(([combo, meaning]) => `<tr><td>${slang}</td><td>${meaning}</td></tr>`) 
        .join('');        

      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Export (${lang.toUpperCase()})</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              table { border-collapse: collapse; width: 100%; margin-bottom: 40px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 1.2em; }
              th { background: #f0f0f0; }
            </style>
          </head>
          <body>
            <h2>Emoji Dictionary (${lang.toUpperCase()})</h2>
            <table>
              <thead><tr><th>Emoji</th><th>Meaning</th></tr></thead>
              <tbody>${emojiTableRows}</tbody>
            </table>

            <h2>Emoji Combos (${lang.toUpperCase()})</h2>
            <table>
              <thead><tr><th>Combo</th><th>Meaning</th></tr></thead>
              <tbody>${combosTableRows}</tbody>
            </table>
            
            <h2>Slang (${lang.toUpperCase()})</h2>
            <table>
              <thead><tr><th>Slang</th><th>Meaning</th></tr></thead>
              <tbody>${slangTableRows}</tbody>
            </table>            
            
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    })
    .catch(error => alert("Failed to load data: " + error));
}

window.addEventListener("DOMContentLoaded", () => {
  const lang = document.getElementById("language-select").value;
  loadLanguage(lang);
});
