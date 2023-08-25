function onWindowLoad() {
    const content = document.querySelector('body');
    if (chrome.extension && !chrome.extension.lastError) {
        chrome.runtime.sendMessage({ text: 'report_back', content: content.outerHTML  });
    }
}

setInterval (onWindowLoad, 1000);