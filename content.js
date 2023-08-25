function onWindowLoad() {
    const content = document.querySelector('body');
    console.log(content);
    chrome.runtime.sendMessage({ text: 'report_back', content: content.outerHTML  }, (response) => {
        if (response) {
            console.log(response);
        }
    });
}

window.onload = function () {
    setTimeout(onWindowLoad, 5000);
};