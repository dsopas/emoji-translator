const emojiCombos = {
  "👉👌": "sex",
  "🍌🍩": "sex",
  "🥖🍯": "sex",
  "🍆🌮": "sex",
  "🐍🌷": "sex",
  "👅🍑🤯": "promising mind blowing oral sex",
  "😛🍆💥": "eager to have oral sex",
  "👆🌮": "fingering female genitalia",
  "🚿🍆🍑": "shower sex",
  "🍈🍈": "breasts or male testicles",
  "⚽️⚽️": "male testicles",
  "🏀🏀": "breasts",
  "👋🍑": "sex",
  "👊🍆": "masturbation",
  "👉🌮": "masturbation",
  "👉👈": "feeling nervous or shy",
  "🍑📱": "sexual invitation",
  "🍿❄️": "netflix&chill - sex",
  "💃👀": "striptease",
  "🍷🎷🌇": "sexy time"
};

const emojiDictionary = {
  "🍆": "penis",
  "🍑": "butt",
  "💦": "semen or arousal",
  "👅": "licking or oral",
  "🔞": "adult content",
  "❤️": "love",
  "🔥": "hot or attractive",
  "💋": "kiss",
  "👙": "lingerie or bikini",
  "🥵": "feeling hot or turned on",
  "😏": "flirty or suggestive",
  "🚬": "smoking",
  "💊": "drugs",
  "🍾": "alcohol or orgasm",
  "🤑": "money-focused",
  "🔪": "violence",
  "😈": "naughty or mischievous",
  "🍇": "male genitalia",
  "🌮": "female genitalia",
  "🐪": "sex (hump)",
  "🎪": "erection",
  "😵": "viewing explicit content",
  "👀": "requesting illicit photos",
  "👯‍♀️": "sex workers",
  "🔌": "drug dealer or male genitalia",
  "❄️": "cocaine",
  "🌳": "marijuana",
  "🌿": "marijuana",
  "⛽️": "marijuana",
  "🥦": "marijuana",
  "🍀": "marijuana",
  "💨": "vaping",
  "😤": "ecstasy (MDMA)",
  "🍁": "drugs (general)",
  "🤤": "ecstasy or desiring sexually",
  "🥣": "hidden sexual meaning",
  "🫘": "incel symbol",
  "🔴": "red pill ideology",
  "💯": "manosphere 80/20 rule",
  "💣": "exploding red pill or orgasm",
  "🍣": "female genitalia",
  "🍯": "female genitalia",
  "🌷": "female genitalia",
  "🌭": "male genitalia",
  "🍌": "male genitalia",
  "🥖": "male genitalia",
  "🥕": "male genitalia",
  "🐍": "male genitalia",
  "👌": "butt",
  "🍩": "butt",
  "🌕": "butt",
  "🌰": "butt",
  "🍐": "butt",
  "🍎": "butt",
  "♋": "reciprocal oral sex",
  "🍒": "butt or breasts",
  "🌽": "male genitalia or porn",
  "🍼": "male genitalia",
  "🐓": "male genitalia",
  "💄": "male genitalia",
  "🕹️": "male genitalia",
  "🐍": "male genitalia",
  "🚀": "male genitalia",
  "🍩": "female genitalia",
  "🌸": "female genitalia",
  "🐱": "female genitalia",
  "✌️": "female genitalia",
  "🍻": "breasts",
  "🚊": "sex",
  "🎢": "sex",
  "📫": "sex",
  "✂️": "sex",
  "🦴": "sex",
  "🔨": "sex",
  "🛌": "sex",
  "🐳": "orgasm",
  "🤯": "orgasm",
  "🍭": "oral sex",
  "😉": "suggestive",
  "🥺": "pleading or submissive",
  "🍜": "requesting nude photos",
  "🌶️": "inappropriate content",
  "🍕": "sexual activity or threesome",
  "👻": "ghosting - ignoring someone after sex",
  "🖤": "flirtation or deviant love"
};

const slangDictionary = {
  "netflix and chill": "hookup or sex",
  "dtf": "down to have sex",
  "thirsty": "desperate for attention or sex",
  "smash": "have sex",
  "body count": "number of sexual partners",
  "hook up": "casual sex",
  "slide into dms": "flirt via private messages",
  "slide into my dms": "flirt via private messages",
  "nudes": "naked pictures",
  "fwb": "friends with benefits",
  "send it": "send explicit content",
  "sneaky link": "secret sexual partner",
  "cd9": "parents are around",
  "code 9": "parents are around",
  "dm;hs": "doesn't matter; had sex",
  "gnoc": "get naked on camera",
  "np4np": "naked pic for naked pic",
  "rule 34": "pornographic content exists for anything",
  "1174": "nude club",
  "lmirl": "let's meet in real life",
  "afk": "away from keyboard",
  "smurf": "high-level gamer with new account",
  "camping": "waiting to ambush players",
  "bot": "computer player",
  "toxic": "abusive or inappropriate",
  "bullet sponge": "very hard to kill player",
  "ganking": "multiple players attacking one",
  "poggers": "extremely excited",
  "aimbot": "cheating software",
  "buff": "increase power",
  "nerf": "decrease power",
  "ragequit": "quit due to frustration",
  "hud": "heads-up display",
  "easter egg": "hidden prize or message",
  "grinding": "repeating tasks for points",
  "dlc": "downloadable content",
  "gg": "good game",
  "happy slapping": "recording assault and sharing",
  "fraping": "posting inappropriate content from someone's account",
  "flaming": "offensive posting to incite conflict"
};

function translateMessage() {
  const textarea = document.getElementById("inputText");
  const output = document.getElementById("output");  
  let input = textarea.value.toLowerCase();
  let result = input;

  for (const [combo, meaning] of Object.entries(emojiCombos)) {
    const regex = new RegExp(combo, "g");
    result = result.replace(regex, `[${meaning}]`);
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

  document.getElementById("output").innerText = "Translation:\n" + result;
  output.classList.toggle('invisible');
  textarea.addEventListener('input', (event) => {
  output.classList.toggle('invisible');
  }, { once: true });
}
