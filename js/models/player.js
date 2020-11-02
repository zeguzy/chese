/**
 * 登陆成功后
 * @author zegu
 */


function afterLogin(data) {
    showSound("../music/clickOn.mp3");

    $(".login").css({
        "left": "-200%"
    });
    $(".gameStar").css({
        "left": "0"
    });

    player.userInfo = data.userInfo;
    let danGrad = chessBit[parseInt(data.userInfo.score / 1000) % 6]
    $('.play2 .userRank span').eq(1).html(danGrad.bit)
    $(".play2 .userName span").eq(1).html(data.userInfo.username);
    $('.play2 .userStep span').eq(1).html(player.steps)
}

function gameStart() {
    showSound("../music/clickOn.mp3");
    $(".gameStar").css({
        "left": "-200%"
    });
    $(".pieces").css({
        "z-index": "1"
    });
    $(".page1").css({
        "left": "0"
    }); //蒙版图像显示
}

/**
 * 点击棋盘后
 * @author zegu  lubing
 */
//点击棋盘
$(".mid").on('click', '#board', function() {
    // alert('emmm')
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