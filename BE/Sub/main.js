document.addEventListener('DOMContentLoaded', function () {
  // ボタンクリック時の処理
  // document.getElementById('playButton1').addEventListener('click', function () {
  //   fetchRandomData(1);
  // });
  // document.getElementById('playButton2').addEventListener('click', function () {
  //   fetchRandomData(2);
  // });
  // document.getElementById('playButton3').addEventListener('click', function () {
  //   fetchRandomData(3);
  // });
  // document.getElementById('playButton4').addEventListener('click', function () {
  //   fetchRandomData(4);
  // });
  // document.getElementById('playButton5').addEventListener('click', function () {
  //   fetchRandomData(5);
  // });

  for (let i = 1; i <= 46; i++)
  {
    document.getElementById(`playButton${i}`).addEventListener('click', function () {
      fetchRandomData(i);
    });
  }
});

// ランダムなデータを取得して表示する関数(引数にはint型の数字が入る。)
function fetchRandomData(id) {
  // ボタンとmoji_IDの対応関係はプログラムで管理するか、サーバーサイドで取得しても良い

  // 仮のmoji_ID
  const mojiID = id;

  // サーバーサイドのAPIエンドポイント
  const apiEndpoint = 'http://localhost:3000/api/getRandomData';

  // APIエンドポイントにmoji_IDを送信
  fetch(`${apiEndpoint}?mojiID=${mojiID}`)
    .then(response => response.json())
    .then(data => {
      // データからランダムなItem_IDを選択
      const randomItemID = data[Math.floor(Math.random() * data.length)].item_id;
      console.log(data.length);
      console.log(Math.floor(Math.random() * data.length));
      console.log(data[Math.floor(Math.random() * data.length)].item_id);
      console.log('randomItemID:', randomItemID);

      // 選択したItem_IDに対応するデータを取得
      fetch(`http://localhost:3000/api/getData?itemID=${randomItemID}`)
        .then(response => response.json())
        .then(result => {
          // 結果を表示するための関数を呼び出す
          displayData(result);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    })
    .catch(error => {
      console.error('Error fetching random data:', error);
    });
}

// データを表示する関数
function displayData(data) {
  // 画像と音声のパスを取得
  const imagePath = data.imagepath;
  const audioPath = data.audioFilePath;
  const answerword = data.answer;

  console.log(data.imagepath + "_" + data.audioFilePath + "_" + data.answer);

  // 画像を表示
  const imageElement = document.createElement('img');
  imageElement.src = "img\\" + imagePath;

  // 表示エリアに表示しているものを削除してから追加する。
  document.getElementById('displayArea').innerHTML = "";
  document.getElementById('displayArea').appendChild(imageElement);

  document.getElementById('answerArea').innerHTML = answerword;
  

  // // 音声を再生
  // const audioElement = document.createElement('audio');
  // audioElement.controls = true;
  // audioElement.src = audioPath;
  // document.getElementById('displayArea').appendChild(audioElement);
}
