let lastContent = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.text === 'report_back') {
        lastContent = request.content; 
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.text === 'get_last_content') {
       sendResponse(lastContent);
   }
});
