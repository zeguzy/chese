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



/**
 * 点击棋盘后
 * @author LuBing zegu
 */
$(function() {
    //点击棋盘
    $("#board").click(function() {
        var x = event.offsetX; //获得鼠标点击对象内部的x，y轴坐标
        var y = event.offsetY;
        console.log('x:'+x+'y:'+y)
        if(x>=585||y>=665||y<20||x<5){
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
        console.log(board);

        movePieces()

    });

    /**
     * 上传用户名
     * @author zegu
     */
    $("button")
        .eq(0)
        .on("click", "", function() {
            // let username = $('.userName').val()
            //     //对username正则检验

            // post(apiAddress, {
            //     username
            // }).then((data) => {
            //     player.userInfo = data.userInfo

            //     //完成后的回调
            //     $('button').hide()
            //     $('.userName').hide()
            //     $('h3').html(data.userInfo.username)
            //     $('.start').show()
            // })

            //模拟

            player.redCamp = false; //是否为红
            $("button").hide();
            $(".userName").hide();
            $("h3").html("你好 lubing");
            $(".start").show();
            $(".usernameLable").hide();
        });

    //开始按钮点击后
    $(".start").on("click", "", function() {
        $(".start").hide();
        //  ws = new WebSocket('ws://localhost:3000');
        //  ws.onmessage = function(msg) {
        //      msg = JSON.parse(msg.data)
        //          //  console.log(msg)
        //      console.log(msg.header.action)
        //      if (msg.header.action === 'OK') {
        //          //准备棋盘和棋子
        //          alert('准备棋盘和棋子')
        //      }

        //  };

        //模拟生成棋盘
        setTimeout(() => {
            // 生成 棋子
            generatePieces(piecesList);
            if (player.redCamp) {
                $("#board").css({
                    transform: "rotateZ(180deg)",
                });
                $(".qi").css({
                    transform: "rotateZ(180deg)",
                });
            }
            // 显示棋盘
            $("#board").show();
        }, 100);

        // 打开WebSocket连接后立刻发送一条消息:
        //  player.ws.onopen = function() {
        //      let data = {
        //          header: {
        //              action: 'match'
        //          },
        //          data: {
        //              userInfo
        //          }
        //      }
        //      sendMsg(data)
        //  }
    });
});