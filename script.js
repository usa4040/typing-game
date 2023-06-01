// 単語リスト
const Words = [
  { kana: '猫', romaji: ['neko'] },
  { kana: '犬', romaji: ['inu'] },
  { kana: '自動車', romaji: ['jidousha','jidousya','zidousha','zidousya'] },
  { kana: '花', romaji: ['hana'] },
  { kana: '電車', romaji: ['densha','densya'] },
  { kana: '家', romaji: ['ie'] },
  { kana: '雲', romaji: ['kumo'] },
  { kana: '魚', romaji: ['sakana'] },
  { kana: '空港', romaji: ['kuukou'] },
  { kana: '飛行機', romaji: ['hikouki'] },
  { kana: '鳥', romaji: ['tori'] },
  { kana: '椅子', romaji: ['isu'] },
  { kana: '紙', romaji: ['kami'] },
  { kana: '鉛筆', romaji: ['enpitsu','enpitu'] },
  { kana: 'コンピュータ', romaji: ['konpyu-ta','konpilyu-ta'] },
  { kana: '傘', romaji: ['kasa'] },
  { kana: '時計', romaji: ['tokei'] },
  { kana: '冷蔵庫', romaji: ['reizouko'] },
  { kana: '携帯電話', romaji: ['keitaidenwa'] },
  { kana: '新聞', romaji: ['shinbunn','sinbunn'] },
  { kana: '鏡', romaji: ['kagami'] },
  { kana: '窓', romaji: ['mado'] },
  { kana: '靴', romaji: ['kutsu','kutu'] },
  { kana: '筆', romaji: ['fude','hude'] },
  { kana: 'タオル', romaji: ['taoru'] },
  { kana: 'ソファ', romaji: ['sofa','sohula'] },
  { kana: 'テレビ', romaji: ['terebi'] },
  { kana: '芝生', romaji: ['shibafu','shibahu','sibafu','sibahu'] },
  { kana: 'カメラ', romaji: ['kamera','camera'] },
  { kana: 'ラジオ', romaji: ['rajio'] },
  { kana: 'バス', romaji: ['basu'] },
  { kana: '自転車', romaji: ['jitensha','jitensya','zitensya','zitensha'] },
  { kana: '鍵', romaji: ['kagi'] },
  { kana: '机', romaji: ['tsukue','tukue'] },
  { kana: '星', romaji: ['hoshi','hosi'] },
  { kana: '太陽', romaji: ['taiyou'] },
  { kana: '月', romaji: ['tsuki','tuki'] },
];

// HTMLから各要素を取得
const currentWordElement = document.getElementById('current-word');
const romajiWordElement = document.getElementById('romaji-word');
const userInput = document.getElementById('user-input');
const startButton = document.getElementById('start-button');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// スコア、タイマー、ゲームの状態、現在の単語を初期化
let score = 0;
let timer = null;
let gameStarted = false;
let currentWord;

// ランダムな単語を取得
function getRandomWord() {
  const index = Math.floor(Math.random() * Words.length);
  return Words[index];
}

// 単語の更新
function updateWord() {
  currentWord = getRandomWord();
  currentWordElement.textContent = currentWord.kana;
  updatePlaceholder();
  updateRomaji();
}

// プレースホルダーを更新
function updatePlaceholder() {
  const placeholder = currentWord.kana
    .split('')
    .map((char, index) => (index < userInput.value.length ? char : ' '))
    .join('');
  currentWordElement.setAttribute('data-placeholder', placeholder);
}

// ローマ字を更新
function updateRomaji() {
  romajiWordElement.textContent = currentWord.romaji;
}

// 入力をチェックしてスコアを更新
function checkInput() {
  const inputLowerCase = userInput.value.toLowerCase();
  if (
    userInput.value === currentWord.kana ||
    currentWord.romaji.some((variation) => variation === inputLowerCase)
  ) {
    score++;
    scoreElement.textContent = score;
    updateWord();
    userInput.value = '';
  } else {
    updatePlaceholder();
  }
}

// ゲームの開始
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
  
  // 1秒ごとにタイマーを減らし、時間がなくなったらゲームを終了
  const countdown = setInterval(() => {
    timer--;
    timerElement.textContent = timer;

    if (timer <= 0) {
      clearInterval(countdown);
      userInput.value = '';
      userInput.disabled = true;
      gameStarted = false;
    }
  }, 1000);
}

// ボタンクリックやエンターキーを押したときにゲームを開始
startButton.addEventListener('click', startGame);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    startGame();
  }
});

// ユーザーの入力が変わるたびに入力をチェック
userInput.addEventListener('input', checkInput);

// 最初は入力フィールドを無効化
userInput.disabled = true;
