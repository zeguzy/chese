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

/**
 * @description 获取相对坐标
 * @param {*} x   **未处理**
 * @param {*} y
 * @author LuBing
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
        r_x: xMul,
        r_y: yMul,
    };
}

/**
 * @description 获取绝对坐标
 * @param {*} x
 * @param {*} y
 * @author LuBing
 */
function getAbsolute(x, y) {
    x = x * 65 + 35; //得出在轴上，棋盘交叉点轴的位置
    y = y * 65 + 50;
    x = x - 32.5; //移动棋子自身一般宽度，用于棋子在棋盘上好看
    y = y - 32.5;

    return {
        a_x: x,
        a_y: y,
    };
}

/**
 * @description 生成棋子DOM
 * @param {Array} piecesList 棋子数据
 * @author zegu
 */
function generatePieces(piecesList) {
    let $board = $("#board");
    piecesList.forEach((element) => {
        element.survive = true;
        let $piece = $(`<div class='qi' index=${element.id}></div>`);
        let {
            a_x,
            a_y
        } = getAbsolute(element.position.x, element.position.y);
        $piece.css({
            top: `${a_y}px`,
            left: `${a_x}px`,
        });
        $piece.css(
            "background",
            `url(${element.piecesType.img}) no-repeat center center`
        );

        // console.log($piece)
        $board.append($piece);
        $piece.show();
        $piece.click(function() {
            clickOnPieces($piece);
        });
    });
}

/**
 * @param {Object} piece 棋子对象
 * @param {Object} x 当前坐标
 * @param {Object} n_x 新坐标
 *
 */
function rulesChecker(piece, {
    x,
    y
}, {
    n_x,
    n_y
}) {
    //偏移量
    _x = n_x - x;
    _y = n_y - y;

    m_x = (x + n_x) / 2;
    m_y = (y + n_y) / 2;

    let result = true;
    console.log(piece);
    switch (piece.piecesType.id) {
        case 0:
            {
                //兵卒         @author 斌
                if (piece.id < 16) {
                    if (y <= 4) {
                        if (_y == 1) {
                            result = _x == 0 ? true : false;
                        } else {
                            result = false;
                        }
                    } else {
                        if (_y == 0) {
                            result = Math.abs(_x) == 1 ? true : false;
                        } else if (_y == 1) {
                            result = _x == 0 ? true : false;
                        } else {
                            result = false;
                        }
                    }
                } else {
                    if (y >= 5) {
                        if (_y == -1) {
                            result = _x == 0 ? true : false;
                        } else {
                            result = false;
                        }
                    } else {
                        if (_y == 0) {
                            result = Math.abs(_x) == 1 ? true : false;
                        } else if (_y == -1) {
                            result = _x == 0 ? true : false;
                        } else {
                            result = false;
                        }
                    }
                }
                return result;
            }
        case 1:
            {
                // 将帅         @author 斌
                if (piece.id < 16) {
                    if (n_x < 6 && n_x > 2 && n_y < 3) {
                        if (_x == 0) {
                            result = Math.abs(_y) == 1 ? true : false;
                        } else if (_y == 0) {
                            result = Math.abs(_x) == 1 ? true : false;
                        } else {
                            result = false;
                        }
                    } else {
                        result = false;
                    }
                } else {
                    if (n_x < 6 && n_x > 2 && n_y > 6) {
                        if (_x == 0) {
                            result = Math.abs(_y) == 1 ? true : false;
                        } else if (_y == 0) {
                            result = Math.abs(_x) == 1 ? true : false;
                        } else {
                            result = false;
                        }
                    } else {
                        result = false;
                    }
                }
                return result;
            }
        case 2:
            {
                //士         @author 斌
                if (piece.id < 16) {
                    if (n_x < 6 && n_x > 2 && n_y < 3) {
                        if (Math.abs(_x) == 1) {
                            result = Math.abs(_y) == 1 ? true : false;
                        } else {
                            result = false;
                        }
                    } else {
                        result = false;
                    }
                } else {
                    if (n_x < 6 && n_x > 2 && n_y > 6) {
                        if (Math.abs(_x) == 1) {
                            result = Math.abs(_y) == 1 ? true : false;
                        } else {
                            result = false;
                        }
                    } else {
                        result = false;
                    }
                }
                return result;
            }
        case 3:
            {
                // 马         @author 斌
                if (Math.abs(_y) == 2) {
                    result = Math.abs(_x) == 1 ? true : false;
                    for (let i = 0; i < piecesList.length; i++) {
                        if (
                            x == piecesList[i].position.x &&
                            y + _y / 2 == piecesList[i].position.y &&
                            element.survive
                        ) {
                            result = false;
                        }
                    }
                } else if (Math.abs(_x) == 2) {
                    result = Math.abs(_y) == 1 ? true : false;
                    for (let i = 0; i < piecesList.length; i++) {
                        if (
                            x + _x / 2 == piecesList[i].position.x &&
                            y == piecesList[i].position.y &&
                            element.survive
                        ) {
                            result = false;
                        }
                    }
                } else {
                    result = false;
                }
                return result;
            }
        case 4:
            {
                //象 @author zegu
                if (Math.abs(_x) != 2 || Math.abs(_y) != 2) {
                    result = false;
                } else if (piece.id < 16 && n_y > 4) {
                    result = false;
                } else if (piece.id > 16 && n_y < 5) {
                    result = false;
                }

                //中点是否有子
                let midpoint = piecesList.some((element) => {
                    return (
                        element.position.x == m_x &&
                        element.position.y == m_y &&
                        element.survive
                    );
                });
                // alert(midpoint)
                result = midpoint ? false : result;
                break;
            }
        case 5:
            {
                //炮 @author zegu
                //走直线
                let line =
                    _x == 0 || (_y == 0 && Math.abs(_x) + Math.abs(_y) != 0) ? true : false;
                if (!line) {
                    result = false;
                    break;
                }

                let sum = 0;
                let end = false;

                if (_x != 0) {
                    let max = Math.max(x, n_x);
                    let min = Math.min(x, n_x);

                    //中间是否有子
                    piecesList.forEach((element) => {
                        if (element.position.y == y) {
                            if (element.position.x == n_x && element.survive) {
                                end = true;
                            }
                            if (
                                element.position.x > min &&
                                element.position.x < max &&
                                element.survive
                            ) {
                                sum++;
                            }
                        }
                    });
                }
                if (_y != 0) {
                    let max = Math.max(y, n_y);
                    let min = Math.min(y, n_y);

                    //中点是否有子
                    piecesList.forEach((element) => {
                        if (element.position.x == x) {
                            if (element.position.y == n_y && element.survive) {
                                end = true;
                            }
                            if (
                                element.position.y > min &&
                                element.position.y < max &&
                                element.survive
                            ) {
                                sum++;
                            }
                        }
                    });
                }

                result = sum <= 1 ? true : false;

                if (sum > 2) {
                    result = false;
                    break;
                }
                if (sum == 0 && end) {
                    result = false;
                    break;
                } else if (sum == 1 && !end) {
                    result = false;
                }

                break;
            }
        case 6:
            {
                //车 @author LuBing
                if ((_x != 0 && _y != 0) || (_x == 0 && _y == 0)) {
                    return false;
                } else if (_x != 0 && _y == 0 || _y != 0 && _x == 0) {
                    for (let i = 0; i < piecesList.length; i++) {
                        if (!piecesList[i].survive) {
                            continue
                        }
                        if (piecesList[i].position.y == y) {
                            if (
                                piecesList[i].position.x - x < 0 &&
                                _x < 0 &&
                                piecesList[i].position.x - x > _x
                            ) {
                                return false;
                            } else if (
                                piecesList[i].position.x - x > 0 &&
                                _x > 0 &&
                                piecesList[i].position.x - x < _x
                            ) {
                                return false;
                            }
                        }
                        if (piecesList[i].position.x == x) {
                            if (
                                piecesList[i].position.y - y < 0 &&
                                _y < 0 &&
                                piecesList[i].position.y - y > _y
                            ) {
                                return false;
                            } else if (
                                piecesList[i].position.y - y > 0 &&
                                _y > 0 &&
                                piecesList[i].position.y - y < _y
                            ) {
                                return false;
                            }
                        }
                    }
                }
                break;
            }
    }
    return result;
}

/**
 * @description 当棋子被点击时
 * @param {*} $piece
 * @author zegu
 */
function clickOnPieces($piece) {
    event.stopPropagation(); //阻止点击棋子的冒泡事件，防止影响棋子位置

    //不能吃自己的子
    let isOwn = player.redCamp ?
        $piece.attr("index") < 16 :
        $piece.attr("index") > 15;

    let r_x = piecesList[$piece.attr("index")].position.x;
    let r_y = piecesList[$piece.attr("index")].position.y;
    let {
        a_x,
        a_y
    } = getAbsolute(r_x, r_y);

    //吃子
    if (board.onHand && board.onHand != $piece && !isOwn) {
        //规则判断
        let index = board.onHand.attr("index");
        let checkResult = rulesChecker(
            piecesList[index], {
                x: piecesList[index].position.x,
                y: piecesList[index].position.y,
            }, {
                n_x: r_x,
                n_y: r_y,
            }
        );

        if (checkResult) {
            //满足规则  吃
            alert("吃");
            $piece.remove();

            //设置棋子在棋盘位置
            board.onHand.css({
                left: a_x + "px",
                top: a_y + "px",
            });

            //更新坐标
            piecesList[index].position = {
                x: r_x,
                y: r_y,
            };

            board.onHand.removeClass("on");

            piecesList[$piece.attr("index")].survive = false;
            board.onHand = null;
            console.log(piecesList);
        } else {
            alert("不满足走子规则");
        }
        return;
    } else if (board.onHand == $piece) {
        //点自己两下  应该取消选中
        $piece.removeClass("on");
        board.onHand = null;
        return;
    } else if (board.onHand && isOwn) {
        board.onHand.removeClass("on");
        board.onHand = $piece;
        $($piece).addClass("on");
        return;
    }

    //只点了一下 选中
    board.onHand = $piece;
    $($piece).addClass("on");
}

/**
 * 点击棋盘后
 * @author LuBing zegu
 */
$(function() {
    //点击棋盘
    $("#board").click(function() {
        var x = event.offsetX; //获得鼠标点击对象内部的x，y轴坐标
        var y = event.offsetY;
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

        /**
         * @description 点击棋盘后
         * @author zegu
         */
        let isOwn = false;
        if (board.onHand) {
            isOwn = player.redCamp ?
                board.onHand.attr("index") < 16 :
                board.onHand.attr("index") > 15;
        }
        if (board.onHand && isOwn) {
            //规则判断
            let index = board.onHand.attr("index");
            let checkResult = rulesChecker(
                piecesList[index], {
                    x: piecesList[index].position.x,
                    y: piecesList[index].position.y,
                }, {
                    n_x: board.click.r_x,
                    n_y: board.click.r_y,
                }
            );
            console.log(checkResult);

            //点击非棋子，如果手上有子，则移动手子到点击个位置
            if (checkResult) {
                board.onHand.css({
                    left: board.click.a_x + "px",
                    top: board.click.a_y + "px",
                }); //设置棋子在棋盘位置

                //更新子的相对坐标
                piecesList[index].position.x = board.click.r_x;
                piecesList[index].position.y = board.click.r_y;

                //移除选中样式
                board.onHand.removeClass("on");
                board.onHand = null;
            }
        }
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