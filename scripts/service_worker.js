//首次安装扩展程序、将扩展程序更新到新版本以及 Chrome 更新到新版本时触发
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.clear();//清除插件保存的本地数据
    chrome.storage.local.set({ 'ToF': 0 }, function(){//默认值
        console.log("ToF默认值 0");
    });
});
//bg监听popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { 
    if (message == 'Click') { 
        sendResponse({result: "ok"});
    }
    else sendResponse({result: "error"}); 
})
