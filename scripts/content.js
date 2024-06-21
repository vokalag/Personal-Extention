function adblock(delay) {//延时检测第一个广告并删除
    return new Promise(function (resolve, reject) { 
        setTimeout(function () {
            let ad = document.querySelector(".feed-card > div[class$=\"is-rcmd\"]");
            if (ad) {
                console.log("Find an Ad");
                let ad_parent = ad.parentElement;
                ad_parent.remove();
            }
            else { 
                console.log("Unpaired ad");
            }
        }, delay);  
        resolve();
    })
};
async function async_block() {//Promise实现分时检测
    await adblock(100);
    await adblock(100);
    await adblock(100);
    await adblock(300);
    await adblock(400);
};
function flow_block() {//函数瀑布实现分时检测
    setTimeout(function () {
        adblock(0);  
        setTimeout(function () { 
            adblock(0);
        }, 300)
    }, 200)
};
/*打开页面或者刷新页面*/
$(document).ready(function () {
    chrome.storage.local.get(['ToF']).then(function (result) {
        if (result.ToF == 1) {
            adblock(0);
            var roll_btn = document.querySelector(".feed-roll-btn > .primary-btn.roll-btn");//换一换
            roll_btn.onclick = function() { async_block();};     
            //roll_btn.onclick = function () { flow_block();};
         }; 
        }
    );
});
//content监听popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
    if (request.message == 1 || request.message == 0) {
        sendResponse({ result: "ok" });
        var roll_btn = document.querySelector(".feed-roll-btn > .primary-btn.roll-btn");//换一换
        if (request.message == 1) roll_btn.onclick = function () { async_block(); };
        else roll_btn.onclick = function () {};
    }
    else sendResponse({result: "error"});
})