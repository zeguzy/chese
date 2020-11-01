/**
 * 发送聊天消息
 */
$('.chartbtn').on('click', '', function() {
    let content = $('.chartbg input').val()
    let mesg = {
        header: {
            action: 'chat'
        },
        data: {
            userId: player.userInfo.id,
            roomId: player.roomId,
            username: player.userInfo.username,
            content
        }
    }
    if (player.ws) {
        sendMsg(mesg)
        $('.chartContent').append($(`<span style="color:blue">我</span>:<span>${content}</span><br/>`))
    }
})

/**
 * 接受聊天消息
 * @param {*} data 
 */
function otherChat(data) {
    $('.chartContent').append($(`<span style="color:blue">${data.username}</span>:<span>${data.content}</span><br/>`))
}