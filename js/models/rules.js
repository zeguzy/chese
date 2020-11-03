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
    // console.log(piece);
    switch (piece.piecesType.id) {
        case 0:
            {
                //兵卒         @author 斌
                let mover = piece.id < 16 ? 0 : 1; // 判断红黑方
                if (mover == 0 && y <= 4 && _y == 1) {
                    result = _x == 0 ? true : false;
                } else if (mover == 0 && y > 4 && _y == 0) {
                    result = Math.abs(_x) == 1 ? true : false;
                } else if (mover == 0 && y > 4 && _y == 1) {
                    result = _x == 0 ? true : false;
                } else if (mover == 1 && y >= 5 && _y == -1) {
                    result = _x == 0 ? true : false;
                } else if (mover == 1 && y < 5 && _y == 0) {
                    result = Math.abs(_x) == 1 ? true : false;
                } else if (mover == 1 && y < 5 && _y == -1) {
                    result = _x == 0 ? true : false;
                } else {
                    result = false;
                }
                return result;
            }
        case 1:
            {
                // 将帅         @author 斌
                let mover = piece.id < 16 ? 0 : 1; // 判断红黑方
                if (mover == 0 && n_x < 6 && n_x > 2 && n_y < 3) {
                    if (_x == 0) {
                        result = Math.abs(_y) == 1 ? true : false;
                    } else if (_y == 0) {
                        result = Math.abs(_x) == 1 ? true : false;
                    } else {
                        result = false;
                    }
                } else if (mover == 1 && n_x < 6 && n_x > 2 && n_y > 6) {
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
                return result;
            }
        case 2:
            {
                //士         @author 斌
                let mover = piece.id < 16 ? 0 : 1; // 判断红黑方
                if (mover == 0 && n_x < 6 && n_x > 2 && n_y < 3) {
                    if (Math.abs(_x) == 1) {
                        result = Math.abs(_y) == 1 ? true : false;
                    } else {
                        result = false;
                    }
                } else if (mover == 1 && n_x < 6 && n_x > 2 && n_y > 6) {
                    if (Math.abs(_x) == 1) {
                        result = Math.abs(_y) == 1 ? true : false;
                    } else {
                        result = false;
                    }
                } else {
                    result = false;
                }
                return result;
            }
        case 3:
            {
                // 马         @author 斌
                if (Math.abs(_y) == 2) {
                    result = Math.abs(_x) == 1 ? true : false;
                    for (let i = 0; i < piecesList.length; i++) {
                        if (
                            x == piecesList[i].position.x &&
                            y + _y / 2 == piecesList[i].position.y &&
                            piecesList[i].survive
                        ) {
                            result = false;
                            // console.log(piecesList[i].survive)
                        }
                    }
                } else if (Math.abs(_x) == 2) {
                    result = Math.abs(_y) == 1 ? true : false;
                    for (let i = 0; i < piecesList.length; i++) {
                        if (
                            x + _x / 2 == piecesList[i].position.x &&
                            y == piecesList[i].position.y &&
                            piecesList[i].survive
                        ) {
                            result = false;
                            // console.log(piecesList[i].survive)
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
                        if ( //末尾有子否
                            element.position.x == n_x &&
                            element.survive &&
                            element.position.y == y) {
                            end = true;
                        }
                        if ( //中间子数
                            element.position.x > min &&
                            element.position.x < max &&
                            element.survive &&
                            element.position.y == y
                        ) {
                            sum++;
                        }

                    });
                }
                if (_y != 0) {
                    let max = Math.max(y, n_y);
                    let min = Math.min(y, n_y);

                    //中点是否有子
                    piecesList.forEach((element) => {
                        if (element.position.y == n_y && element.survive && element.position.x == x) {
                            end = true;
                        }
                        if (
                            element.position.y > min &&
                            element.position.y < max &&
                            element.survive &&
                            element.position.x == x
                        ) {
                            sum++;
                        }
                    });
                }

                result = sum <= 1 ? true : false;

                if ((sum == 0 && end) || sum > 2 || (sum == 1 && !end)) {
                    result = false;
                    break;
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
 * @description 检查将军
 * @author LuBing
 */
function checkGeneral() {
    let mark = 0;
    let num = 0;
    piecesList.forEach(function(value, index) {
        let result = false;
        if ((value.survive &&
                value.position.x == piecesList[4].position.x &&
                piecesList[4].position.x == piecesList[27].position.x &&
                value.position.y > piecesList[4].position.y &&
                value.position.y < piecesList[27].position.y) ||
            piecesList[4].position.x != piecesList[27].position.x
        ) {
            num++;
        }

        if (value.piecesType.id == 1 || value.piecesType.id == 2 || value.piecesType.id == 4 || !value.survive) {
            return true;
        }

        if (index < 16) {
            result = rulesChecker(value, {
                x: value.position.x,
                y: value.position.y
            }, {
                n_x: piecesList[27].position.x,
                n_y: piecesList[27].position.y
            });

            if (result) {

                mark = 1;
            }
        } else if (index >= 16) {
            result = rulesChecker(value, {
                x: value.position.x,
                y: value.position.y
            }, {
                n_x: piecesList[4].position.x,
                n_y: piecesList[4].position.y
            });
            if (result) {
                mark = 2;
            }
        }
    })
    mark = (num == 0 && player.redCamp) ? 1 : mark;
    mark = (num == 0 && !player.redCamp) ? 2 : mark;
    return mark;
}


/**
 * @description 检测棋子能否移动到棋盘上某点
 */
function checkPiecesMove(piece, {
    x,
    y
}) {
    let bool = true;
    let sign = rulesChecker(piece, {
        x: piece.position.x,
        y: piece.position.y
    }, {
        n_x: x,
        n_y: y
    });
    if (!sign) {
        return false;
    }
    piecesList.forEach(function(value, index) {
        if (!value.survive) {
            return false;
        }
        let isOwn = player.redCamp ?
            value.id > 15 :
            value.id < 16;
        if (isOwn) {
            if (value.position.x == x && value.position.y == y) {
                bool = false;
                return;
            }
        }
    })
    return bool
}

/**
 * @description 检查是否有棋子，并是返回
 * @param {object} 棋盘相对坐标
 * @returns {object} 返回存在对象
 * @author lubing
 */
function isTherePiece({
    x,
    y
}) {
    let obj = null;
    piecesList.forEach(function(value, index) {
        if (!value.survive) {
            return false;
        }
        if (value.position.x == x && value.position.y == y) {
            obj = value;
            return;
        }
    })
    return obj;
}

/**
 * @description 检查是否困毙
 * @author LuBing
 */
function trappedDead() {
    let result = true;
    let sign = false;
    piecesList.forEach(function(value, index) {
        if (!value.survive) {
            return true;
        }
        let isOwn = player.redCamp ?
            value.id > 15 :
            value.id < 16;
        if (isOwn) {
            // console.log(value)
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 10; j++) {
                    let obj = isTherePiece({
                        x: i,
                        y: j
                    });

                    sign = checkPiecesMove(value, {
                        x: i,
                        y: j
                    });
                    if (sign) {
                        if (obj != null && (!player.redCamp ?
                                obj.id > 15 :
                                obj.id < 16)) {
                            obj.survive = false;
                        }

                        //保存之前状态         
                        let t_x = piecesList[index].position.x;
                        let t_y = piecesList[index].position.y;

                        //更新子的相对坐标
                        piecesList[index].position.x = i;
                        piecesList[index].position.y = j;

                        let mark = checkGeneral();

                        //恢复原来的相对坐标
                        piecesList[index].position.x = t_x;
                        piecesList[index].position.y = t_y;

                        if (obj != null && (!player.redCamp ?
                                obj.id > 15 :
                                obj.id < 16)) {
                            obj.survive = true;
                        }

                        if (mark != 1 && player.redCamp) {
                            result = false;
                            return;
                        } else if (mark != 2 && !player.redCamp) {
                            result = false;
                            return;
                        }

                    }

                }
            }
        }
    })
    return result;
}

function failure() {
    //自己的分数减少 并更新页面 与失败动画
    player.score = player.score - 100 * 1

    $(".fail").css({
        "left": "0"
    }); //出现失败页面 

    let mesg = {
        header: {
            action: 'Failure'
        },
        data: {
            userId: player.userInfo.id,
            roomId: player.roomId
        }
    }
    $('.settle .box .data td').eq(4).html(player.userInfo.username)
    $('.settle .box .data td').eq(1).html(player.otherPlayers.username)
    sendMsg(mesg)
    setTimeout(() => {
        $(".fail").css({
            "left": "-200%"
        });
        settle()
        setTimeout(function() {

            $('.settle').css({
                "left": "-200%"
            });
            toMatch()
        }, 6000)
    }, 2000)

}


function win() {
    //自己的分数增加 并更新页面 与动画
    player.score = player.score + 100 * 1

    $('.win').css({
        "left": "0"
    });
    $('.settle .box .data td').eq(1).html(player.userInfo.username)
    $('.settle .box .data td').eq(4).html(player.otherPlayers.username)
    setTimeout(function() {
        $(".win").css({
            "left": "-200%"
        });
        settle()
        setTimeout(function() {
            $('.settle').css({
                "left": "-200%"
            });
            toMatch()
        }, 8000)
    }, 3000)
}