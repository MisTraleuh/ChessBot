let lastContent = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text === 'report_back') {
        console.log(new Date().toLocaleTimeString(), 'content.js loaded');
        lastContent = request.content;
    }

   if (request.text === 'get_last_content') {
        console.log(new Date().toLocaleTimeString(), 'service_worker.js loaded');
        sendResponse(lastContent);
        return true;
   }
});
