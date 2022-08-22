// ==UserScript==
// @name         RatelConsole
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       xiaomei
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rubikstack.com
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    let soket;
    function startRatel() {
        initRatel()
    }
    // Your code here...
    function initRatel() {
        console.log("init")
        soket = new WebSocket("ws://49.235.95.125:9998/ws")
        soket.onopen = (event) => {
            console.log('open', event)
            wsSend({ "ID": new Date().getTime(), "Name": window.name, "Score": 100 })
        }
        soket.onmessage = (event) => {
            let msg = JSON.parse(event.data).data
            if (msg != 'INTERACTIVE_SIGNAL_STOP' && msg != 'INTERACTIVE_SIGNAL_START') {
                /**
                 * 桌面消息通知模块（未启用，需https websokect暂未支持）
                 */
                // if (/^>> (.*?) say:/.test(msg)) {
                //   /**
                //  *
                //  * @param {String} msg option?消息标题:消息内容
                //  * @param {Object} option={} 消息通知配置项
                //  * @param {Object} onFun={show:function(){}} 事件处理方法(show,click,error,close)
                //  */
                //   notifyMessage(msg.substring(msg.indexOf(" ")))
                //   // console.error(msg.substring(msg.indexOf(" ")))
                // } else if (/^Game starting/.test(msg) || /^Last player/m.test(msg)) {
                //   notifyMessage(/^Game starting/.test(msg) ? "Game starting" : "It's your turn")
                //   // console.error(/^Game starting/.test(msg) ? "Game starting" : "It's your turn")
                // }
                console.log(msg)
            }
        }
        soket.onclose = (event) => {
            console.log('close', event)
        }
        soket.onerror = (event) => {
            console.log('error', event)
        }
    }
    function wsSend(event) {
        let obj = JSON.stringify({ data: (typeof event === 'string' ? event : JSON.stringify(event)) })
        soket.send(obj);
    }
    function input(str) {
        if (str === undefined || str === null) console.error("Please enter the content")
        wsSend(str)
    }
    function setUserName(str) {
        if (str === undefined || str === null) console.error("Please enter username")
        window.name = (str + "").substring(0, 10)
    }
    function str(str) {
        let newStr = []
        let listStr = str.split("")
        while (listStr.length > 0) {
            let len = listStr.length
            let num = Math.random() * len
            newStr.push(listStr.splice(num, 1))
        }
        return newStr.join("")
    }
    window.i = input
    window.user = setUserName
    window.startRatel = startRatel
    window.str = str
})();