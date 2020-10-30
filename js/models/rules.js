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
        case 0: {
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
        case 1: {
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
        case 2: {
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
        case 3: {
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
                        console.log(piecesList[i].survive)
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
        case 4: {
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
        case 5: {
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
        case 6: {
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
        $piece.attr("index") > 15 :
        $piece.attr("index") < 16

    let r_x = piecesList[$piece.attr("index")].position.x;
    let r_y = piecesList[$piece.attr("index")].position.y;
    let {
        a_x,
        a_y
    } = getAbsolute(r_x, r_y);

    console.log('isOwn ' + isOwn)
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
            alert("吃");
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
                alert("红方不能动")
                return false;
            } else if (mark == 2 && !player.redCamp) {
                piecesList[index].position.x = t_x;
                piecesList[index].position.y = t_y;
                piecesList[$piece.attr("index")].survive = true
                alert("黑方不能动")
                return false;
            } else if (mark == 1) {
                alert('将军')
                data.data.mark = true
            } else if (mark == 2) {
                alert('将军')
                data.data.mark = true
            }


            //设置棋子在棋盘位置
            board.onHand.css({
                left: a_x + "px",
                top: a_y + "px",
            });
            board.onHand.removeClass("on");


            sendMsg(data)

            board.onHand = null;
            console.log(piecesList);
            player.current = false
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
    console.log('isOwn ' + isOwn)
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
        console.log('rulescheck ' + checkResult);

        //点击非棋子，如果手上有子，则移动手子到点击个位置
        if (checkResult && player.current) {

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
                alert("红方不能动")
                return false;
            } else if (mark == 2 && !player.redCamp) {
                piecesList[index].position.x = t_x;
                piecesList[index].position.y = t_y;
                alert("黑方不能动")
                return false;
            } else if (mark == 1) {
                alert('红方被将军')
                data.data.mark = true
            } else if (mark == 2) {
                alert('黑方被将军')
                data.data.mark = true
            }


            board.onHand.css({ //设置棋子在棋盘位置
                left: board.click.a_x + "px",
                top: board.click.a_y + "px",
            });

            sendMsg(data)

            //移除选中样式
            board.onHand.removeClass("on");
            board.onHand = null;
            player.current = false
        }
    }
}

/**
 * @description 检查将军
 * @author LuBing
 */
function checkGeneral() {
    let mark = 0;
    let num = 0;
    piecesList.forEach(function (value, index) {
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
            console.log(result);
            if (result) {
                // console.log("B result:"+result);
                console.log({
                    v: value
                })
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
            console.log(piecesList[4])
            console.log(result);
            if (result) {
                // console.log("R result:"+result);
                // console.log({
                //     v: value
                // })
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
    let bool = false;
    piecesList.forEach(function (value,index) {
        if(!value.survive){
            return false;
        }
        let isOwn = player.redCamp ?
        value.id > 15 :
        value.id < 16;
        if(isOwn){
            let sign =  rulesChecker(piece,{x:piece.position.x,y:piece.position.y},{n_x:x,n_y:y})
            if(value.position.x != x && value.position.y != y && sign ){
                bool = true;
                return;
            }
        }
    })
    return bool
}

/**
 * @description 检查是否困毙
 */
function trappedDead() {
    let result = true;
    let sign = false;
    piecesList.forEach(function (value, index) {
        if (!value.survive) {
            return true;
        }
        let isOwn = player.redCamp ?
            value.id > 15 :
            value.id < 16;
        if (isOwn) {
            console.log(value)
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 10; j++) {

                    sign = checkPiecesMove(value,{x:i,y:j});
                    if (sign) {
                        //保存之前状态         
                        let t_x = piecesList[index].position.x;
                        let t_y = piecesList[index].position.y;

                        //更新子的相对坐标
                        piecesList[index].position.x = i;
                        piecesList[index].position.y = j;

                        let mark = checkGeneral();

                        console.log("id:" + value.id + "Mark ---- " + mark)
                        console.log('i-->'+i+'j-->'+j)

                        //恢复原来的相对坐标
                        piecesList[index].position.x = t_x;
                        piecesList[index].position.y = t_y;

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