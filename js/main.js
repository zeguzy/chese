/**
 * 棋盘点击
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

let player = {}; //用户信息
player.ws = null; // webSocket
player.userInfo = {};
otherPlayer = {};
player.current = player.redCamp ? true : false; //初始化


/**
 * 点击棋盘后
 * @author zegu  lubing
 */
//点击棋盘
$("#board").click(function() {
    var x = event.offsetX; //获得鼠标点击对象内部的x，y轴坐标
    var y = event.offsetY;

    if (x >= 585 || y >= 665 || y < 20 || x < 5) { //点击边界外的坐标忽略 
        return false;
    }
    let {
        r_x,
        r_y
    } = getRelative(x, y);

    let {
        a_x,
        a_y
    } = getAbsolute(r_x, r_y);

    board.click.r_x = r_x;
    board.click.r_y = r_y;
    board.click.a_x = a_x;
    board.click.a_y = a_y;

    movePieces();

})

/**
 * 上传用户名
 * @author zegu
 */
$("button:eq(0)").on("click", "", function() {
    let username = $(".userName").val();
    //对username正则检验

    post(apiAddress, { //像后端传递信息
        username,
    }).then((data) => { //完成后的回调
        player.userInfo = data.userInfo;
        $("button").hide();
        $(".userName").hide();
        $("h3").html(data.userInfo.username);
        $(".start").show();
    });

    //模拟
    // player.redCamp = false; //是否为红
    // $("button").hide();
    // $(".userName").hide();
    // $("h3").html("你好 lubing");
    // $(".start").show();
    // $(".usernameLable").hide();
});

//开始按钮点击后
$(".start").on("click", "", function() {
    $(".start").hide();
    player.ws = new WebSocket(wsAddress);
    player.ws.onmessage = function(msg) {
        try {
            msg = JSON.parse(msg.data);
        } catch (err) {
            msg = null;
        }

        // console.log(msg);
        // console.log(msg.header.action);

        if (msg && msg.header.action === "OK") {
            gameOk(msg.data);
        }
        if (msg && msg.header.action === "move") {
            otherMove(msg.data);
        }
        if (msg && msg.header.action === "eat") {
            otherEat(msg.data);
        }
    };

    //模拟生成棋盘
    // setTimeout(() => {
    //     // 生成 棋子
    //     generatePieces(piecesList);
    //     if (player.redCamp) {
    //         $("#board").css({
    //             transform: "rotateZ(180deg)",
    //         });
    //         $(".qi").css({
    //             transform: "rotateZ(180deg)",
    //         });
    //     }
    //     // 显示棋盘
    //     $("#board").show();
    // }, 100);

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
    };
});