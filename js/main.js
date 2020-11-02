/**
 * 棋盘对象
 */
let board = {
    click: {
        //鼠标点击的坐标
        r_x: null, //相对坐标
        r_y: null,
        a_x: null, //绝对坐标
        a_y: null,
    },
    onHand: null, //手子
};
//用户信息
let player = {
    ws: null, // webSocket
    userInfo: {}, //玩家信息
    steps: 0, //步数
    current: false,
    userTimeInterval: null,
    time: 0
};


$(function() {
    player.chartContent = document.getElementById('chartContent'); //通过id获得滚轮条
    /*播放背景音乐 */
    player.backMusic = document.getElementsByClassName("backMusic")[0];
    $("body").on("click", function() {
        player.backMusic.play(); //继续bg音乐
        $("body").off();
    })
})

/**
 * 上传用户名
 * @author zegu
 */
$(".loginOk").on("click", "", function() {
    // 
    let username = $(".usInput").val();
    post(apiAddress, { //传递信息
        username,
    }).then((data) => { //完成后的回调
        afterLogin(data)
    });
});

//开始按钮点击后
$(".gameStarImg").on("click", "", function() {
    //样式
    gameStart()
    player.ws = new WebSocket(wsAddress);

    // 打开WebSocket连接后立刻发送一条消息:
    player.ws.onopen = function() {
        let data = {
            header: {
                action: "match",
            },
            data: {
                userInfo: player.userInfo,
            },
        };
        sendMsg(data);
    }
    player.ws.onclose = function() {
        showSound("../music/clickOn.mp3");
        $(".login").css({
            "left": "-200%"
        });
        $(".gameStar").css({
            "left": "0"
        });
    }

    player.ws.onmessage = function(msg) {
        try {
            msg = JSON.parse(msg.data);
        } catch (err) {
            msg = null;
        }

        console.log(msg)
        if (msg && msg.header.action === "OK") {
            gameOk(msg.data);
        }
        if (msg && msg.header.action === "move") {
            otherMove(msg.data);
        }
        if (msg && msg.header.action === "eat") {
            otherEat(msg.data);
        }
        if (msg && msg.header.action === "chat") {
            otherChat(msg.data);
        }
        if (msg && msg.header.action === "close") {
            toMatch()
        }
        if (msg && msg.header.action === "win") {
            win()
        }
    }
})

/*点击确定认输 */
$(".giveUpOk").on("click", function() {
    showSound("../../music/clickOn.mp3");
    //退出页面消失
    $(".giveUp").css({
        "left": "-200%"
    });
    //出现失败页面
    $(".fail").css({
        "left": "0"
    });
    let mesg = {
        header: {
            action: 'giveIn'
        },
        data: {
            roomId: player.roomId,
            userId: player.userInfo.id
        }
    }
    sendMsg(mesg)
    setTimeout(() => {
        $(".fail").css({
            "left": "-200%"
        });
        $('.settle .box .data td').eq(4).html(player.userInfo.username)
        $('.settle .box .data td').eq(1).html(player.otherPlayers.username)
        settle()
        setTimeout(function() {
            //失败消失页面
            $(".settle").css({
                "left": "-200%"
            });
        }, 2000)
    }, 1000)

})