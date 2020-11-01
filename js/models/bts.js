/*退出游戏按钮 */
$(".btn4").on("click", function() {
    showSound("../music/clickOn.mp3");
    $(".quit").css({
        "left": "0"
    });
})

/*点击取消退出游戏 */
$(".quitNo").on("click", function() {
    showSound("../music/clickOn.mp3");
    $(".quit").css({
        "left": "-200%"
    });
})

/*点击确定退出游戏 */
$(".quitOk").on("click", function() {
    showSound("../music/clickOn.mp3");
    /*回到欢迎界面 */
    $(window).attr('location', "../html/index.html");
})

/*认输按钮 */
$(".btn3").on("click", function() {
    showSound("../music/clickOn.mp3");
    $(".giveUp").css({
        "left": "0"
    });
})

/*点击取消认输 */
$(".giveUpNo").on("click", function() {
    showSound("../music/clickOn.mp3");
    $(".giveUp").css({
        "left": "-200%"
    });
})

/*出现平局页面 */
$(".btn2").on("click", function() {
    showSound("../music/clickOn.mp3");
    $(".tieGame").css({
        "left": "0"
    });
})

/*悔棋 */
$(".btn1").on("click", function() {
    showSound("../music/clickOn.mp3");
    alert("对面是否同意悔棋");
})

/*点击任意地方平局界面消失 */
$(".tieGame").on("click", function() {
    showSound("../music/clickOn.mp3");
    $(".tieGame").css({
        "left": "-200%"
    });
})

/*点击任意地方成功界面消失 */
$(".win").on("click", function() {
    showSound("../music/clickOn.mp3");
    $(".win").css({
        "left": "-200%"
    });
})