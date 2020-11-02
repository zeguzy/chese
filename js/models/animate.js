//将军动画
function jj() {
    $(".jj").css({
        "left": "0"
    });
    setTimeout(function() {
        $(".jj").css({
            "left": "-200%"
        });
    }, 2500);
}