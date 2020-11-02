$(function() {
    // let backMusic = $("<audio src='../music/background.mp3' autoplay id='hint'/>");//加bg音乐
    // backMusic.appendTo("body");
    /*自动播放 */
    let index = 0; //当前按钮的位置
    let next = 0;
    let per = 0;
    let btnT = false; //判断是否能继续点击
    let backMusic = document.getElementsByClassName("backMusic")[0];
    $("body").on("click", function() {
        setTimeout(function() {
            backMusic.play(); //继续bg音乐 
        }, 2000);

    })

    /*点击门打开 */
    $(".door").on("click", function() {
            showSound("../music/playDoor.mp3");
            $(".leftDoor").css({
                animation: "leftRun 3s linear forwards"
            })
            $(".rightDoor").css({
                animation: "rightRun 3s linear forwards"
            })
            setTimeout(function() {
                $(".door").css({
                    "left": "-200%"
                });
            }, 3000);

            // $(".leftDoor").animate({transform: "rotateY(120deg)"},5000)
            // $(".rightDoor").animate({transform: "rotateY(-120deg)"},5000,function(){
            //     $(".door").css({left:"-200%"});
            // })
        })
        //点击按钮播放视频
    $(".playBtn").on("click", function() {
            showSound("../music/clickOn.mp3");
            $(".videos").css({
                "left": "50%"
            });
            $(".videos video").trigger("load"); //重新加载视频
            $(".videos video").trigger("play"); //播放视频
            backMusic.pause(); //暂停bg音乐
        })
        //点击X按钮关闭视频
    $(".close").on("click", function() {
        showSound("../music/clickOn.mp3");
        $(".videos").css({
            "left": "500%"
        });
        $(".videos video").trigger("pause"); //暂停视频
        backMusic.play(); //继续bg音乐
    })

    let srcArr = [{
            src1: "../image/promptBox/star2.png",
            src2: "../image/promptBox/star1.png"
        },
        {
            src1: "../image/promptBox/ruleGame2.png",
            src2: "../image/promptBox/ruleGame1.png"
        },

        {
            src1: "../image/promptBox/setGame2.png",
            src2: "../image/promptBox/setGame1.png"
        },
        {
            src1: "../image/promptBox/exitGame2.png",
            src2: "../image/promptBox/exitGame1.png"
        }
    ]
    for (let i = 0; i < $(".lunbo").length; i++) {
        //鼠标放在标签上改变图片
        $(".lunbo").eq(i).mouseover(function() {
            $(".lunbo:eq(" + i + ") img").attr({
                src: srcArr[i].src1
            })
        });
        //鼠标移开标签上改变图片
        $(".lunbo").eq(i).mouseout(function() {
            $(".lunbo:eq(" + i + ") img").attr({
                src: srcArr[i].src2
            })
        });
    }
    //点击左边按钮左移
    $(".left").on("click", function() {
            showSound("../music/clickOn.mp3");
            //判断是否继续执行
            if (btnT == true) {
                return;
            }
            btnT = true;
            for (let i = 0; i < $(".lunboContent .lunbo").length; i++) {
                if (i > index) {
                    $(".lunboContent .lunbo").eq(i).css({
                        "left": "100%"
                    })

                }
                if (i < index) {
                    $(".lunboContent .lunbo").eq(i).css({
                        "left": "-70%"
                    })
                }
                if (index == 3) {
                    $(".lunboContent .lunbo").eq(0).css({
                        "left": "100%"
                    })
                }
            }
            next = index + 1;
            if (next == 4) {
                next = 0
            }
            $(".lunboContent .lunbo").eq(next).addClass("lunbo1");
            $(".lunboContent .lunbo").eq(next).animate({
                "left": "15%"
            }, 1000)
            $(".lunboContent .lunbo").eq(index).animate({
                "left": "-70%"
            }, 1000, function() {
                $(".lunboContent .lunbo").eq(index).removeClass("lunbo1");
                index++;
                if (index == 4) {
                    index = 0;
                }
                btnT = false;
            });

        })
        //点击右边按钮左移
    $(".right").on("click", function() {
            showSound("../music/clickOn.mp3");
            //判断是否继续执行
            if (btnT == true) {
                return;
            }
            btnT = true;
            for (let i = 0; i < $(".lunboContent .lunbo").length; i++) {
                if (i > index) {
                    $(".lunboContent .lunbo").eq(i).css({
                        "left": "100%"
                    })
                }
                if (i < index) {
                    $(".lunboContent .lunbo").eq(i).css({
                        "left": "-70%"
                    })
                }
                if (index == 0) {
                    $(".lunboContent .lunbo").eq(3).css({
                        "left": "-70%"
                    })
                }
            }
            per = index - 1;
            if (per == -1) {
                per = 3;
            }
            $(".lunboContent .lunbo").eq(per).addClass("lunbo1");
            $(".lunboContent .lunbo").eq(per).animate({
                "left": "15%"
            }, 1000)
            $(".lunboContent .lunbo").eq(index).animate({
                "left": "100%"
            }, 1000, function() {
                $(".lunboContent .lunbo").eq(index).removeClass("lunbo1");
                index--;
                if (index == -1) {
                    index = 3;
                }
                btnT = false;
            });
        })
        /*点击退出游戏按钮 */
    $(".exit").on("click", function() {
            showSound("../music/clickOn.mp3");
            $(".quit").css({
                "left": "0"
            })
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
            window.close();
        })
        /**
         * 产生音效
         * @param audioSrc ：音频路径
         */
    function showSound(audioSrc) {
        $("#hint").remove(); /**因为音效元素是追加的，所以每次生成之前，将原来的删除掉*/
        var audioJQ = $("<audio src='" + audioSrc + "' autoplay id='hint'/>");
        audioJQ.appendTo("body"); /**创建 audio 标签的 Jquery 对象，然后追加到 body 进行播放*/
    }
    /*滚动滚轮事件,通过滑动滚轮实现按钮上下移动 */
    $(".lunboContent").on("mousewheel DOMMouseScroll", function(e) {
        let delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); //获得当前对象的位置
        if (delta > 0) { //判断滚轮是向上滚动还是向下滚动
            $(".right").click();
        }
        if (delta < 0) {
            $(".left").click();
        }

    });

    let mid = document.getElementsByClassName("mid")[0];
    let shuoming = document.getElementById("shuoming");
    let gameset = document.getElementById("gameset")
    let setflag = 0;
    let settings = document.getElementsByClassName("settings")[0];
    gameset.addEventListener("click", function() {
        if (setflag == 0) {
            settings.style.display = "block";
            setflag = 1;
        } else {
            settings.style.display = "none";
            setflag = 0;
        }

    });
    shuoming.addEventListener("click", function() {
        mid.style.display = "block";
    });
    let close1 = document.getElementsByClassName("close1")[0];
    close1.addEventListener("click", function() {
        mid.style.display = "none";
    });
    let pros = document.getElementById("changePro").getElementsByTagName("ul")[0].getElementsByTagName("li");
    let proshow = document.getElementsByClassName("info")
    for (let i = 0; i < pros.length; i++) {
        pros[i].onmouseover = () => {
            let new_index1 = i;
            index1 = new_index1;
            changePro(index1)
            changeProshow(index1)
        }
    }

    function changeProshow(index1) {
        for (let i = 0; i < proshow.length; i++) {
            proshow[i].style.display = "none";
        }
        proshow[index1].style.display = "block";
    }

    function changePro(index1) {
        for (let i = 0; i < pros.length; i++) {
            pros[i].className = "";
        }
        pros[index1].className = "on";
    }
})