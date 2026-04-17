# Ad Verify – YouTube Ad Skipper

A Chrome extension (Manifest V3) that automatically detects YouTube video ads and reloads the page to skip them, resuming playback from where you left off.

## How It Works

1. **Auto-activates on YouTube** – Whenever a YouTube tab finishes loading, the extension turns **ON** and starts monitoring the page every 3 seconds.
2. **Tracks playback position** – While no ad is playing, it continuously saves the current video timestamp to Chrome local storage.
3. **Detects ads** – It looks for the `.ad-simple-attributed-string` element on the page, which indicates a video ad is being shown.
4. **Reloads to skip** – When an ad is detected, it reloads the page with the saved timestamp appended as a `t=` query parameter, effectively skipping the ad and resuming the video.

## Toggle ON/OFF

Click the extension icon (or press **Ctrl+B** / **Cmd+B** on macOS) to toggle the ad-skip behavior on or off for the current YouTube tab. The badge text shows the current state (**ON** / **OFF**).

## Installation

1. Clone or download this repository.
2. Open `chrome://extensions/` in Chrome.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the project folder.

## Project Structure

```
manifest.json          # Extension manifest (Manifest V3)
images/                # Extension icons (16, 32, 48, 128 px)
scripts/
  background.js        # Service worker: ad detection, page reload, toggle logic
  content.js           # Legacy/unused content script draft
```

## Permissions

| Permission | Reason |
|---|---|
| `storage` | Persist playback timestamp and interval state |
| `scripting` | Inject ad-detection script into YouTube tabs |
| `activeTab` | Access the active tab on user interaction |
| `tabs` | Monitor tab updates to auto-start on YouTube |
| `https://www.youtube.com/*` | Host permission for script injection |

## License

Apache License 2.0 – see the license header in source files for details.
