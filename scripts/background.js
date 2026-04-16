// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


const YOUTUBE_URL = 'https://www.youtube.com/';

// Starts the ad-skip interval for the given tab
function startInterval(tabId) {
  // Clear any previously running interval before starting a new one
  chrome.storage.local.get('hasInterval', ({ hasInterval }) => {
    if (hasInterval) clearInterval(hasInterval);
  });

  const intervalId = setInterval(() => {
    chrome.scripting.executeScript({
      target: { tabId },
      func: async () => {
        
        const videoAdPlayer = document.querySelector('.ad-simple-attributed-string');
        
        if (videoAdPlayer) {
          let { videoTimer } = await chrome.storage.local.get('videoTimer');
          videoTimer = parseInt(videoTimer, 10) || 0;
          const urlVideo = location.href.split('t=')[0];
          let timer = (videoTimer > 0)?`t=${videoTimer}`:''

          timer = (!urlVideo.includes('?'))?`?${timer}`:`&${timer}`;
          
          const url = `${urlVideo}${timer}`;
          console.log('Ad player found, reloading page...');
          location.href = url;
        } else {
          const currentVideo = document.querySelector('.ytp-time-current');
          if (currentVideo) {
            const seconds = currentVideo.textContent.split(':').reduce((acc, time) => (60 * acc) + +time);
            chrome.storage.local.set({ videoTimer: seconds });
          }
        }
      }
    });
  }, 2000);

  console.log('hasInterval: ', intervalId);
  chrome.storage.local.set({ hasInterval: intervalId });
}

// Auto-start ON whenever a YouTube tab finishes loading
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith(YOUTUBE_URL)) {
    await chrome.action.setBadgeText({ tabId, text: 'ON' });
    startInterval(tabId);
  }
});

// Allow the user to toggle ON/OFF by clicking the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url && tab.url.startsWith(YOUTUBE_URL)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({ tabId: tab.id, text: nextState });

    if (nextState === 'ON') {
      startInterval(tab.id);
    } else {
      chrome.storage.local.get('hasInterval', ({ hasInterval }) => {
        clearInterval(hasInterval);
      });
    }
  }
});
