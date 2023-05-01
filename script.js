const Words = [
    { kana: '猫', romaji: 'neko' },
    { kana: '犬', romaji: 'inu' },
    { kana: '自動車', romaji: 'jidousha' },
    { kana: '花', romaji: 'hana' },
    { kana: '電車', romaji: 'densha' },
    { kana: '家', romaji: 'ie' },
    { kana: '雲', romaji: 'kumo' },
    { kana: '魚', romaji: 'sakana' },
    { kana: '空港', romaji: 'kuukou' },
    { kana: '飛行機', romaji: 'hikouki' },
    { kana: '鳥', romaji: 'tori' },
    { kana: '椅子', romaji: 'isu' },
    { kana: '紙', romaji: 'kami' },
    { kana: '鉛筆', romaji: 'enpitsu' },
    { kana: 'コンピュータ', romaji: 'konpyu-ta' },
    { kana: '傘', romaji: 'kasa' },
    { kana: '時計', romaji: 'tokei' },
    { kana: '冷蔵庫', romaji: 'reizouko' },
    { kana: '携帯電話', romaji: 'keitaidenwa' },
    { kana: '新聞', romaji: 'shinbun' },
    { kana: '鏡', romaji: 'kagami' },
    { kana: '窓', romaji: 'mado' },
    { kana: '靴', romaji: 'kutsu' },
    { kana: '筆', romaji: 'fude' },
    { kana: 'タオル', romaji: 'taoru' },
    { kana: 'ソファ', romaji: 'sofa' },
    { kana: 'テレビ', romaji: 'terebi' },
    { kana: '芝生', romaji: 'shibafu' },
    { kana: 'カメラ', romaji: 'kamera' },
    { kana: 'ラジオ', romaji: 'rajio' },
    { kana: 'バス', romaji: 'basu' },
    { kana: '自転車', romaji: 'jitensha' },
    { kana: '鍵', romaji: 'kagi' },
    { kana: '机', romaji: 'tsukue' },
    { kana: '星', romaji: 'hoshi' },
    { kana: '太陽', romaji: 'taiyou' },
    { kana: '月', romaji: 'tsuki' },
  ];
  const currentWordElement = document.getElementById('current-word');
  const romajiWordElement = document.getElementById('romaji-word');
  const userInput = document.getElementById('user-input');
  const startButton = document.getElementById('start-button');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');
  let score = 0;
  let timer = null;
  let gameStarted = false;
  let currentWord;
  
  function getRandomWord() {
    const index = Math.floor(Math.random() * Words.length);
    return Words[index];
  }
  
  function updateWord() {
    currentWord = getRandomWord();
    currentWordElement.textContent = currentWord.kana;
    updatePlaceholder();
    updateRomaji();
  }
  
  function updatePlaceholder() {
    const placeholder = currentWord.kana
      .split('')
      .map((char, index) => (index < userInput.value.length ? char : ' '))
      .join('');
    currentWordElement.setAttribute('data-placeholder', placeholder);
  }
  
  function updateRomaji() {
    romajiWordElement.textContent = currentWord.romaji;
  }
  
  function checkInput() {
    if (
      userInput.value === currentWord.kana ||
      userInput.value.toLowerCase() === currentWord.romaji
    ) {
      score++;
      scoreElement.textContent = score;
      updateWord();
      userInput.value = '';
    } else {
      updatePlaceholder();
    }
  }
  
  function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    score = 0;
    scoreElement.textContent = score;
    updateWord();
    userInput.disabled = false;
    userInput.focus();
  
    timer = 60;
    timerElement.textContent = timer;
  
    const countdown = setInterval(() => {
      timer--;
      timerElement.textContent = timer;
  
      if (timer <= 0) {
        clearInterval(countdown);
        userInput.disabled = true;
        gameStarted = false;
      }
    }, 1000);
  }
  
  startButton.addEventListener('click', startGame);
  
  // キーボードのEnterキーでゲーム開始
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      startGame();
    }
  });
  
  userInput.addEventListener('input', checkInput);
  
  // 初期状態で入力を無効にする
  userInput.disabled = true;
  