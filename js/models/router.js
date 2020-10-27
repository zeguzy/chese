/**
 * @description  发送 get 请求
 * @param {*} url
 * @author zegu
 */
function get(url) {
    return $.get(url);
}

/**
 * @description 发送 post 请求
 * @param {*} url
 * @param {*} data
 * @author zegu
 */
function post(url, data = {}) {
    return $.ajax({
        type: "post",
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    });
}

/**
 * @description 向服务器发送消息
 * @author zegu
 */
function sendMsg(data) {
    if (ws) ws.send(JSON.stringify(data));
}