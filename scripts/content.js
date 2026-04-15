// let videoTimer = 0;
// let doStart = localStorage.getItem("doStart") === "true" || false;
// let hasInterval = null;

// function toggleStart() {
//   doStart = !doStart;
//   localStorage.setItem("doStart", doStart);
//   console.log("Toggled start: ", doStart);
//   if (doStart) {
//     startInterval();

//     document.querySelector("#button-toggle").textContent = "Parar";
//   } else if (hasInterval) {
//     clearInterval(hasInterval);
//     hasInterval = null;
//     document.querySelector("#button-toggle").textContent = "Iniciar";
//   }
// };


// function verifyVideoAdPlayer() {

// }

// function startInterval() {
//   hasInterval = setInterval(() => {

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         func: () => {

//           const videoTimer = parseInt(localStorage.getItem("videoTimer"), 10) || 0;
//           const videoAdPlayer = document.querySelector(".ad-simple-attributed-string");
//           // console.log("document: ", document);
//           // console.log("videoAdPlayer: ", videoAdPlayer);
//           // console.log("videoTimer: ", videoTimer);
//           const url = `${location.href.split("t=")[0]}&t=${videoTimer}`;
//           console.log("url: ", url);

//           if (!!videoAdPlayer) {
//             // console.log("Ad player found, reloading page...");
//             location.href = url;
//           } else {
//             const currentVideo = document.querySelector(".ytp-time-current");
//             if (!!currentVideo) {
//               const seconds = currentVideo.textContent.split(":").reduce((acc, time) => (60 * acc) + +time);
//               // console.log("seconds: ", seconds);
//               localStorage.setItem("videoTimer", seconds);
//             }
//           }
//         }
//       }, (selection) => {
//         // ESTE CÓDIGO RODA NA EXTENSÃO
//         // const textoDaAba = selection[0].result;
//         // console.log("Conteúdo recebido da aba:", textoDaAba);
//         // document.getElementById('resultado').innerText = textoDaAba;
//       });
//     });

//   }, 1000);
// }


// if (!hasInterval && doStart) {
//   hasInterval = setInterval(() => {
//     startInterval();
//   }, 1000);
// }

// document.getElementById('button-toggle').addEventListener('click', () => {
//   toggleStart();
// });

// if (doStart) {
//   document.querySelector("#button-toggle").textContent = "Parar";
//   startInterval();
// } else {
//   document.querySelector("#button-toggle").textContent = "Iniciar";
// }
