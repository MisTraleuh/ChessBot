function onWindowLoad() {
    const content = document.querySelector(':root');
    console.log(content);
    chrome.runtime.sendMessage({ text: 'report_back', content: content.outerHTML  }, (response) => {
        if (response) {
            console.log(response);
        }
    });
}

window.onload = onWindowLoad;