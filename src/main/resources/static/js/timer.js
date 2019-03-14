allChild[index].onclick = function(){//当点击目标且满足下面的条件时 让计时器时间暂停
    if(gamInt == true){
        $("#tu").css("display","block");//显示
//计时器暂停（清除定时器）
        clearInterval(countdownTimer);
//延迟2s后游戏继续 计时器暂停结束
        setTimeout(function(){
// 移除所有的图片
            removeImgFun();
            $("#tu").css("display","none");
            imgNum++;
            if(imgNum >= 10){
                imgNum = 10;
            }
            createImgFun();
//定时器继续接之前的时间增加 继续播放（将之前的定时器重新引用一次 包括定时器的名字（必须要有 不然容易引起电脑死机）完整引入）
            countdownTimer = setInterval(function (){
                countdownNum -= 0.01;
//保留两位小数
                countdownNum = countdownNum.toFixed(2);
                if (countdownNum <= 0){
                    clearInterval(countdownTimer);
//游戏结束
                    alert("游戏结束！");
//房祖名不能再点击（分数不再计数）
                    gamInt = false;
                }
                time.innerHTML = "倒计时:" + countdownNum + "秒";
            },10);
        },2000)
//计分
        scores += 1;
        score.innerHTML = "第" + scores + "关";
        if(scores > 8){
            $("#wc").css("display","block");
            $("#haha").css("display","none");
            $("#cj").on("click",award());
            $("#sm").on("click",explain());
        }
    }
}