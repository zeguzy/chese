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
    if (xNum > 32.5 && xMul < 8) {
        xMul++;
    }
    //如果余数大于32.5，则说明需要在y轴加上一个单位距离
    if (yNum > 32.5 && yMul < 9) {
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
    // 显示棋盘
    $("#board").show();
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