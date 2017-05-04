/**
 * Created by 段晓博 on 2017/4/30.
 */


window.onload=function(){
    banner();

}
var banner = function(){
    /*大容器*/
    var banner = document.querySelector('.NARUTO_banner');
    /*轮播图宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');
    var addTransition = function(){
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';/*兼容*/
    }
    /*清过渡*/
    var removeTransition = function(){
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';/*兼容*/
    }
    /*设置位移*/
    var setTranslateX = function(translateX){
        imageBox.style.transform = 'translateX('+translateX+'px)';/*移轮播图宽度*/
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';/*兼容*/
    }
    var index = 1;/*默认索引*/
    var timer = setInterval(function(){
        index ++;
        /*过渡*/
        addTransition();
        /*位移*/
        setTranslateX(-index*width);
    },3000);

    imageBox.addEventListener('transitionend',function(){
        if(index >=5 ){
            index = 1;
            removeTransition();
            setTranslateX(-index*width);
        }
        /*无缝滑动*/
        else if(index <= 0){
            index = 4;
            removeTransition();
            setTranslateX(-index*width);
        }
        setPoint();
    });

    var setPoint = function(){
        for(var i = 0 ; i < points.length ; i ++){
            points[i].classList.remove('now');
        }
        points[index-1].classList.add('now');
    }
    var startX = 0;/*记录开始的X坐标*/
    var distanceX = 0;/*记录坐标坐标轴的改变的*/
    /*严谨判断*/
    var isMove = false;

    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);

        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = -index*width + distanceX;
        /*清除过渡*/
        removeTransition();
        /*做定位*/
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend',function(e){
        if(isMove){
            if(Math.abs(distanceX) < width/3){
                addTransition();
                setTranslateX(-index*width);
            }else{
                if(distanceX > 0 ){
                    /*向右滑  上一张*/
                    index -- ;
                }else{
                    /*向左滑 下一张*/
                    index ++ ;
                }
                /*加过渡*/
                addTransition();
                /*定位*/
                setTranslateX(-index*width);
            }
        }
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            /*过渡*/
            addTransition();
            /*位移*/
            setTranslateX(-index*width);
        },3000);
        startX = 0;
        distanceX = 0;
        isMove = false;

    });



};

