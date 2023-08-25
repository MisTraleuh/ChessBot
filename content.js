function onWindowLoad() {
    const content = document.querySelector('body');
    console.log(content);
    chrome.runtime.sendMessage({ text: 'report_back', content: content.outerHTML  }, (response) => {
        if (response) {
            console.log(response);
        }
    });
}

setInterval (onWindowLoad, 1000);