/**
 * 棋盘点击
 */
let board = {
    click: {
        x: null,
        y: null,
    }
}
let userInfo = null
let ws = null

// 发送 get 请求
function get(url) {
    return $.get(url)
}

// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

/**
 * @description 向服务器发送消息
 * 
 *
 */
function sendMsg(data) {
    if (ws)
        ws.send(
            JSON.stringify(data)
        )
}

/**
 * @description 获取相对坐标
 * @param {*} x 
 * @param {*} y 
 */
function getRelative(x, y) {
    x = x - 35; //减去多余的位置，使得坐标位置从棋盘的左上角开始，而不是图片的左上角
    y = y - 50;
    let xNum = x % 65; //计算出相对于当前轴多余的数字，用于模糊计算（即是否在x轴加上一个单位距离）
    let yNum = y % 65;
    let xMul = parseInt(x / 65); //计算出当前轴上有几个单位距离
    let yMul = parseInt(y / 65);
    //如果余数大于32.5，则说明需要在x轴加上一个单位距离
    if (xNum > 32.5) {
        xMul++;
    }
    //如果余数大于32.5，则说明需要在y轴加上一个单位距离
    if (yNum > 32.5) {
        yMul++;
    }
    console.log(xMul);
    console.log(yMul);
    return {
        xMul,
        yMul
    }
}

/**
 * @description 获取绝对坐标
 * @param {*} x 
 * @param {*} y 
 */
function getAbsolute(x, y) {
    x = (x * 65) + 35; //得出在轴上，棋盘交叉点轴的位置
    y = (y * 65) + 50;
    x = x - 25; //移动棋子自身一般宽度，用于棋子在棋盘上好看
    y = y - 25;

    return {
        x,
        y
    }
}

/**
 * @description 生成棋子DOM
 * @param {Array} piecesList 棋子数据 
 */
function generatePieces(piecesList) {
    let $board = $('#board')
    piecesList.forEach(element => {
        let $piece = $(`<div class='qi' data-id=${element.id}></div>`)
        let {
            x,
            y
        } = getAbsolute(element.position.x, element.position.y)
        $piece.css({
            top: `${y}px`,
            left: `${x}px`,
        })
        $piece.css("background-image", `url(${element.pieces.img})`)
        console.log($piece)
        $board.append($piece)
        $piece.show()
    });
}

$(function() {
    //点击棋盘
    $("#board").click(function() {
        var x = event.offsetX; //获得鼠标点击对象内部的x，y轴坐标
        var y = event.offsetY;

        x = x - 35; //减去多余x，y轴的位置，使得坐标位置从棋盘的左上角开始，而不是图片的左上角
        y = y - 50;

        let xNum = x % 65; //计算出相对于当前x，y轴多余的数字，用于模糊计算（即是否在x轴加上一个单位距离）
        let yNum = y % 65;
        let xMul = parseInt(x / 65); //计算出当前x，y轴上有几个单位距离
        let yMul = parseInt(y / 65);

        //如果余数大于32.5，则说明需要在x轴加上一个单位距离
        if (xNum > 32.5) {
            xMul++;
        }
        //如果余数大于32.5，则说明需要在y轴加上一个单位距离
        if (yNum > 32.5) {
            yMul++;
        }

        x = (xMul * 65) + 35; //得出在x轴上，棋盘交叉点x轴的位置
        y = (yMul * 65) + 50;

        x = x - 25; //移动棋子自身一般宽度，用于棋子在棋盘上好看
        y = y - 25;

        board.click.x = xMul
        board.click.y = yMul

        console.log(board)
        $('.qi').css({
            "left": (x) + "px",
            "top": (y) + "px"
        }); //设置棋子在棋盘位置
    });

    $('.qi').click(function() {
        event.stopPropagation(); //阻止点击棋子的冒泡事件，防止影响棋子位置
    })

    //上传用户名
    $('button').eq(0).on('click', '', function() {
        // let username = $('.userName').val()
        //     //对username正则检验

        // post(apiAddress, {
        //     username
        // }).then((data) => {
        //     userInfo = data.userInfo

        //     //完成后的回调
        //     $('button').hide()
        //     $('.userName').hide()
        //     $('h3').html(data.userInfo.username)
        //     $('.start').show()
        // })

        //模拟
        $('button').hide()
        $('.userName').hide()
        $('h3').html('你好 lubing')
        $('.start').show()
    })

    //开始按钮点击后
    $('.start').on('click', '', function() {
        $('.start').hide()
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
                //显示棋盘
                $('#board').show()

                // 生成 棋子
                generatePieces(piecesList)

            },
            1000)

        // 打开WebSocket连接后立刻发送一条消息:
        //  ws.onopen = function() {
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
    })

});