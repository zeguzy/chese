/**
 * @description 获取相对坐标
 * @param {*} x   **未处理**
 * @param {*} y
 * @author LuBing
 */

let otherTime = 0

function getRelative(x, y) {
    x = x - 10; //减去多余的位置，使得坐标位置从棋盘的左上角开始，而不是图片的左上角
    y = y - 11;
    let xNum = x % 60; //计算出相对于当前轴多余的数字，用于模糊计算（即是否在x轴加上一个单位距离）
    let yNum = y % 60;
    let xMul = parseInt(x / 60); //计算出当前轴上有几个单位距离
    let yMul = parseInt(y / 60);
    //如果余数大于32.5，则说明需要在x轴加上一个单位距离
    if (xNum > 30) {
        xMul++;
    }
    //如果余数大于32.5，则说明需要在y轴加上一个单位距离
    if (yNum > 30) {
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
    x = x * 60 + 10; //得出在轴上，棋盘交叉点轴的位置
    y = y * 60 + 11;
    x = x - 30; //移动棋子自身一般宽度，用于棋子在棋盘上好看
    y = y - 30;

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
    // 显示棋盘
    let $board = $("#board");

    piecesList.forEach((element) => {
        element.survive = true;
        let $piece = $(`<div class='qi' index=${element.id}></div>`);
        element.DOM = $piece
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

        $board.append($piece);
        $piece.show();
        $piece.click(function() {
            clickOnPieces($piece);
        });
    });
    if (!player.redCamp) {
        $("#board").css({
            transform: "rotateZ(180deg)",
        });
        $(".qi").css({
            transform: "rotateZ(180deg)",
        });
    }
}

/**
 * 棋子动化
 * @author deng
 */


function addPieces() {
    let o = -1; //棋子初始化
    // alert('sdsdsd')
    let pieces_html = '';

    for (let i = 31; i >= 0; i--) {
        pieces_html += '<li  style=" width: 50px; height: 50px;position: absolute;top: ' + 280 + 'px;left: ' + 260 + 'px;background: url(../../image/promptBox/bbg.png) no-repeat"></li>';
    }


    $(".piecesImg").html(pieces_html); // 把象棋的HTML代码放入页面对应的元素中
    /*移动象棋动画 */

    function go() {
        o++;
        /*移动动画 */
        $(".piecesImg li:last").animate({
            top: ((piecesList[o].position.y) * 60 + 12) + 'px',
            left: (piecesList[o].position.x * 60 + 11) + 'px'
        }, 100, function() {
            $(".piecesImg li:last").remove(); //移除元素
            showSound("../../music/xq.mp3");
            let strDiv = '<div class="is"  style=" width: 50px; height: 50px;position: absolute;top: ' + ((piecesList[o].position.y) * 60 - 11) + 'px;left: ' + (piecesList[o].position.x * 60 - 12) + 'px;background: url(../../image/promptBox/bbg.png) no-repeat"></div>';
            /*在相应位置生成相应的图片 */
            $(".pieces").append(strDiv);
            if (o == 31) {
                $(".page1").css({
                    "left": "-200%"
                });
                $('.pieces').remove()

                //准备棋盘和棋子
                generatePieces(piecesList);
                return 0;
            }
            go();
        });
    }
    go();
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
        $piece.attr("index") > 15 :
        $piece.attr("index") < 16

    let r_x = piecesList[$piece.attr("index")].position.x;
    let r_y = piecesList[$piece.attr("index")].position.y;
    let {
        a_x,
        a_y
    } = getAbsolute(r_x, r_y);

    // console.log('isOwn ' + isOwn)
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

        if (checkResult && player.current) {
            //满足规则  吃
            showSound('../../music/eat.mp3')
            $piece.hide();

            //保存手子的坐标数据
            let t_x = piecesList[index].position.x;
            let t_y = piecesList[index].position.y;

            //更新状态
            piecesList[index].position = {
                x: r_x,
                y: r_y,
            };
            piecesList[$piece.attr("index")].survive = false;

            let data = {
                header: {
                    action: 'eat'
                },
                data: {
                    userId: player.userInfo.id,
                    roomId: player.roomId,
                    piece: {
                        onHandId: board.onHand.attr('index'),
                        byEatId: $piece.attr("index")
                    }
                }
            }

            let mark = checkGeneral();
            if (mark == 1 && player.redCamp) {
                piecesList[index].position.x = t_x;
                piecesList[index].position.y = t_y;
                piecesList[$piece.attr("index")].survive = true
                $piece.show()
                alert("红方不能动")
                return false;
            } else if (mark == 2 && !player.redCamp) {
                piecesList[index].position.x = t_x;
                piecesList[index].position.y = t_y;
                piecesList[$piece.attr("index")].survive = true
                $piece.show()
                alert("黑方不能动")
                return false;
            } else if (mark == 1) {
                showSound('../../music/jj.mp3')
                jj()
                data.data.mark = true
            } else if (mark == 2) {
                showSound('../../music/jj.mp3')
                jj()
                data.data.mark = true
            }

            //设置棋子在棋盘位置
            board.onHand.css({
                left: a_x + "px",
                top: a_y + "px",
            });
            board.onHand.removeClass("selected");
            sendMsg(data)
            board.onHand = null;
            player.current = false

            //步数加一
            player.steps = player.steps * 1 + 1
            $('.play2 .userStep span').eq(1).html(player.steps)

            //停止自己计时
            clearInterval(player.userTimeInterval)

            //开始other计时
            player.otherPlayers.time = 0
            player.otherPlayers.userTimeInterval = setInterval(() => {
                $('.play1 .userTime span').eq(1).html(player.otherPlayers.time++ + 's')
            }, 1000)
        } else {
            alert("不满足走子规则");
        }
        return;
    } else if (board.onHand == $piece) {
        //点自己两下  应该取消选中
        $piece.removeClass("selected");
        board.onHand = null;
        return;
    } else if (board.onHand && isOwn) {
        //第二次点自己其他子，应该选中其他
        board.onHand.removeClass("on");
        board.onHand = $piece;
        $($piece).addClass("selected");
        return;
    } else if (isOwn) {
        //只点了一下 选中
        board.onHand = $piece;
        $($piece).addClass("selected");
    }

}

/**
 * @description 移子
 * @author zegu
 */
function movePieces() {
    /**
     * @description 点击棋盘后
     * @author zegu
     */

    let isOwn = false;
    if (board.onHand) {
        isOwn = player.redCamp ?
            board.onHand.attr("index") > 15 :
            board.onHand.attr("index") < 16;
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

        //点击非棋子，如果手上有子，则移动手子到点击个位置
        if (checkResult && player.current) {
            showSound('../../music/xq.mp3')
            let t_x = piecesList[index].position.x;
            let t_y = piecesList[index].position.y;

            //更新子的相对坐标
            piecesList[index].position.x = board.click.r_x;
            piecesList[index].position.y = board.click.r_y;


            let data = {
                header: {
                    action: 'move'
                },
                data: {
                    userId: player.userInfo.id,
                    roomId: player.roomId,
                    piece: {
                        mark: false,
                        id: board.onHand.attr('index'),
                        position: {
                            x: board.click.r_x,
                            y: board.click.r_y
                        }
                    }
                }
            }
            let mark = checkGeneral();
            if (mark == 1 && player.redCamp) {
                piecesList[index].position.x = t_x;
                piecesList[index].position.y = t_y;
                alert("红方将被将军")
                return false;
            } else if (mark == 2 && !player.redCamp) {
                piecesList[index].position.x = t_x;
                piecesList[index].position.y = t_y;
                alert("黑方将被将军")
                return false;
            } else if (mark == 1) {
                showSound('../../music/jj.mp3')
                jj()
                data.data.mark = true
            } else if (mark == 2) {
                showSound('../../music/jj.mp3')
                jj()
                data.data.mark = true
            }

            board.onHand.css({ //设置棋子在棋盘位置
                left: board.click.a_x + "px",
                top: board.click.a_y + "px",
            });
            sendMsg(data)

            //移除选中样式
            board.onHand.removeClass("selected");
            board.onHand = null;
            player.current = false

            //步数加一
            player.steps = player.steps * 1 + 1
            $('.play2 .userStep span').eq(1).html(player.steps)

            clearInterval(player.userTimeInterval)
            player.otherPlayers.time = 0
            player.otherPlayers.userTimeInterval = setInterval(() => {
                $('.play1 .userTime span').eq(1).html(player.otherPlayers.time++ + 's')
            }, 1000)
        }
    }
}