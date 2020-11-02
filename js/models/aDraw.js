 /*出现是否同意平局界面 */
 function yesOrNo() {
     $(".yesOrNo").css({
         "left": "0"
     });
 }
 /*不同意平局 */
 $(".nobtn").on("click", function() {
     $(".yesOrNo").css({
         "left": "-200%"
     });
 })

 function draw() {
     $(".draw").css({
         "left": "0"
     });
     setTimeout(function() {
         $(".draw").css({
             "left": "-200%"
         });
         toMatch()
     }, 5000);
 }