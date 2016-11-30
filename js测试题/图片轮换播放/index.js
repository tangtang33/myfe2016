(function(){
    var oContainer = document.getElementById('container');
    var oSmallImg = document.getElementById('small-img');
    var oBigImg = document.getElementById('big-img');
    var aBImg = oBigImg.getElementsByTagName('img');
    var oPrev = document.getElementById('prev');
    var oNext = document.getElementById('next');
    var oInfo = document.getElementById('info');
    var oCurrentPage = document.getElementById('current-page');
    var aSImg = oSmallImg.getElementsByTagName('img');
    var iNow = 0;
    var zIndex = 1;
    var timer;
    for(var i=0; i<aSImg.length; i++){
        aSImg[i].index = i;
        aSImg[i].onmouseover = function(){
            animate(this, {
                opacity: 100
            });
        };
        aSImg[i].onmouseout = function(){
            if(this.index != iNow){
                animate(this, {
                        opacity: 30
                    }
                );
            }
        };
        aSImg[i].onclick = function(){
            if(this.index != iNow){
                changeImg(this.index);
            }
        };

    }
    oPrev.onclick = oNext.onclick = function(){
        if(this == oPrev){
            iNow--;
            if(iNow == -1){
                iNow = aBImg.length - 1;
            }
            changeImg(iNow);
        }else{
            iNow++;
            if(iNow == aBImg.length){
                iNow = 0;
            }
            changeImg(iNow);
        }
    };
    oPrev.onmouseover = oNext.onmouseover = function(){
        if(this == oPrev){
            animate(oPrev, {
                opacity: 100
            });
        }else{
            animate(oNext, {
                opacity : 100
            });
        }
    };
    oPrev.onmouseout = oNext.onmouseout = function(){
        if(this == oPrev){
            animate(oPrev, {
                opacity: 0
            });
        }else{
            animate(oNext, {
                opacity : 0
            });
        }
    };
    function changeImg(idx){
        iNow = idx;  //¸üÐÂÍ¼Æ¬Ë÷Òý
        for(var i=0; i<aSImg.length; i++){
            aSImg[i].style.opacity = .3;
            aSImg[i].style.filter = 'alpha(opacity = 30)';
        }
        aSImg[idx].style.opacity = 1;
        aSImg[idx].style.filter = 'alpha(opacity = 100)';
        aBImg[idx].style.opacity = 0;
        aBImg[idx].style.filter = 'alpha(opacity = 0)';
        aBImg[idx].style.zIndex = oPrev.style.zIndex = oNext.style.zIndex = oInfo.style.zIndex= zIndex++;
        animate(aBImg[idx], {
            opacity : 100
        });
        oCurrentPage.innerHTML = idx + 1;

        var iLeft = 0;
        if(idx == 0 || idx == 1){
            iLeft = 0;
        }else if(idx == aSImg.length -1 || idx == aSImg.length - 2){
            iLeft = aSImg.length / 2;
        }else{
            iLeft = idx -1;
        }
        animate(oSmallImg, {
                left: - iLeft * aSImg[0].offsetWidth
            }
        );
    }
    function run(){
        timer = setInterval(function(){
            oNext.onclick();
        }, 1000);
    }
    run();
    oContainer.onmouseover = function(){
        clearInterval(timer);
    };
    oContainer.onmouseout = function(){
        run();
    };

})();
