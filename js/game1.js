$(function () {

    /*播放背景音乐 */
    let backMusic = document.getElementsByClassName("backMusic")[0];
    $("body").on("click", function () {
        backMusic.play();//继续bg音乐
    })

    /*确定登录 */
    $(".loginOk").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".login").css({ "left": "-200%" });
        $(".gameStar").css({ "left": "0" });
    })
    /*对局开始 */
    $(".gameStarImg").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".gameStar").css({ "left": "-200%" });
        $(".pieces").css({ "z-index": "1" });
        $(".page1").css({ "left": "0" });
        addPieces();
    })
    /*退出游戏按钮 */
    $(".btn4").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".quit").css({ "left": "0" });
    })

    /*点击取消退出游戏 */
    $(".quitNo").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".quit").css({ "left": "-200%" });
    })

    /*点击确定退出游戏 */
    $(".quitOk").on("click", function () {
        showSound("../music/clickOn.mp3");
        /*回到欢迎界面 */
        $(window).attr('location', "../html/index.html");
    })

    /*认输按钮 */
    $(".btn3").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".giveUp").css({ "left": "0" });
    })

    /*点击取消认输 */
    $(".giveUpNo").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".giveUp").css({ "left": "-200%" });
    })

    /*点击确定认输 */
    $(".giveUpOk").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".giveUp").css({ "left": "-200%" });//退出页面消失
        $(".fail").css({ "left": "0" });//出现失败页面 
    })
    /*出现平局页面 */
    $(".btn2").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".tieGame").css({ "left": "0" });
    })
    /*悔棋 */
    $(".btn1").on("click", function () {
        showSound("../music/clickOn.mp3");
        alert("对面是否同意悔棋");
    })
    /*点击任意地方平局界面消失 */
    $(".tieGame").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".tieGame").css({ "left": "-200%" });
    })
    /*点击任意地方失败页面消失 */
    $(".fail").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".fail").css({ "left": "-200%" });
    })
    /*点击任意地方成功界面消失 */
    $(".win").on("click", function () {
        showSound("../music/clickOn.mp3");
        $(".win").css({ "left": "-200%" });
    }) 
    let o = -1;
    // 添加棋子
    function addPieces() {
        
        let pieces_html = '';
        for (let i = 31; i >= 0; i--) {
            pieces_html += '<li  style=" width: 50px; height: 50px;position: absolute;top: ' + 280 + 'px;left: ' + 260 + 'px;background: url(' + piecesList[i].pieces.img + ') no-repeat"></li>';
            // pieces_html += '<li  style=" width: 50px; height: 50px;position: absolute;top: '+(piecesList[i].position.y*60+11) +'px;left: '+ (piecesList[i].position.x*60+10)+'px;background: url('+ piecesList[i].pieces.img +') no-repeat"></li>'; 
        }
        $(".piecesImg").html(pieces_html);       // 把象棋的HTML代码放入页面对应的元素中
        /*移动象棋动画 */
       
        function go() {
            o++;
            console.log(piecesList[o].position.x);
            /*移动动画 */
            $(".piecesImg li:last").animate({ top: ((piecesList[o].position.y) * 60 + 12) + 'px', left: (piecesList[o].position.x * 60 + 11) + 'px' }, 500, function () {
                $(".piecesImg li:last").remove();//移除元素
                showSound("../music/playChess.mp3");
                let strDiv = '<div class="is"  style=" width: 50px; height: 50px;position: absolute;top: ' + ((piecesList[o].position.y) * 60 - 11) + 'px;left: ' + (piecesList[o].position.x * 60 - 12) + 'px;background: url(' + piecesList[o].pieces.img + ') no-repeat"></div>';
                /*在相应位置生成相应的图片 */
                $(".pieces").append(strDiv);
                go();
                // o=o+1;
                // console.log(o);
                if (o == 31) {
                    $(".page1").css({ "left": "-200%" });
                    return 0;
                }
            });
        }
        go();
    }
    /*按钮控制音效 */
    $(".btn5 div").on("click", function () {
        if ($(".btn5 div").attr("data-index") == 0) {
            $(".btn5 div").css({
                "background": "url(../image/bg/wMusic2.png) no-repeat",
                "background-size": "cover",
                "-moz-background-size": "cover"
            });
            /*设置自定义属性值 */
            $(".btn5 div").attr("data-index","1");

            $("audio").trigger("pause");
        }
        else if ($(".btn5 div").attr("data-index") == 1) {
            $(".btn5 div").css({
                "background": "url(../image/bg/wMusic.png) no-repeat",
                "background-size": "cover",
                "-moz-background-size": "cover"
            });
            $(".btn5 div").attr("data-index","0");
            $("audio").trigger("play");
        }
    })

    /**
      * 产生音效
      * @param audioSrc ：音频路径
      */
    function showSound(audioSrc) {
        $("#hint").remove();/**因为音效元素是追加的，所以每次生成之前，将原来的删除掉*/
        var audioJQ = $("<audio src='" + audioSrc + "' autoplay id='hint'/>");
        audioJQ.appendTo("body");/**创建 audio 标签的 Jquery 对象，然后追加到 body 进行播放*/
    }
})