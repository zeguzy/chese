/**
 * 产生音效
 * @param audioSrc ：音频路径
 */
function showSound(audioSrc) {
    $("#hint").remove(); /**因为音效元素是追加的，所以每次生成之前，将原来的删除掉*/
    var audioJQ = $("<audio src='" + audioSrc + "' autoplay id='hint'/>");
    audioJQ.appendTo("body"); /**创建 audio 标签的 Jquery 对象，然后追加到 body 进行播放*/
}


/*按钮控制音效 */
$(".btn5 div").on("click", function() {
    if ($(".btn5 div").attr("data-index") == 0) {
        $(".btn5 div").css({
            "background": "url(../image/bg/wMusic2.png) no-repeat",
            "background-size": "cover",
            "-moz-background-size": "cover"
        });
        /*设置自定义属性值 */
        $(".btn5 div").attr("data-index", "1");
        player.backMusic.pause(); //关闭音效
        // $("audio").trigger("pause");
    } else if ($(".btn5 div").attr("data-index") == 1) {
        $(".btn5 div").css({
            "background": "url(../image/bg/wMusic.png) no-repeat",
            "background-size": "cover",
            "-moz-background-size": "cover"
        });
        $(".btn5 div").attr("data-index", "0");
        player.backMusic.play(); //打开音效
        // $("audio").trigger("play");
    }
})