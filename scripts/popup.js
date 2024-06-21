chrome.storage.local.get(['ToF']).then((result) => {//读取勾选框的存储值
    if (result.ToF == 1) {
        $("div.settings > .checkbtn").prop({ 'checked': true });//存储值=1->打勾
    }
    else {
        $("div.settings > .checkbtn").prop({ 'checked': false });//存储值=0->取消
    };
});
function popup2content(mes){// popup向content发送信息
    chrome.tabs.query({ active: true, currentWindow: true, url: ["https://www.bilibili.com/"] }, function (tabs) {// 获取窗口id 使用 chrome.tabs.sendMessage 发送消息
        if(tabs.length){
            chrome.tabs.sendMessage(tabs[0].id, {message:mes}, function(response) {
                if (response.result == "ok") {
                    console.log("Popup2Content_Complete");
                }
                else if (response.result == "error") { 
                    console.log("Popup2Content_Error");
                }
            });
        }
	});
};
//单击勾选框触发
$("div.settings > .check > .checkbtn").click(function () {
    if ($("div.settings > .check > .checkbtn").prop('checked')) {//勾选
        chrome.storage.local.set({'ToF': 1}, function(){//勾选框的存储值设置为1
            console.log("勾选");
            popup2content(1);//更新content的设置
        });
    }
    else {//取消勾选
        chrome.storage.local.set({'ToF': 0}, function(){//勾选框的存储值设置为0
            console.log("取消勾选");
            popup2content(0);//更新content的设置
        });
    };
});
//单击按键触发
const btn = document.querySelector("div.btn > #test_btn");
if (btn) {
    btn.onclick = function () {
        chrome.runtime.sendMessage(
            "Click",
            response => { 
                if (response.result == "ok") {
                    console.log("Popup2Bg_Complete");
                    alert("施工中......");
                }
                else if (response.result == "error")
                    console.log("Popup2Bg_Error");
            }
        );
    };
}
else { 
    console.log("NoButtonFound");
};
