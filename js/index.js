/**
 * Created by ������ on 2017/4/30.
 */


window.onload=function(){
    banner();

}
var banner = function(){
    /*������*/
    var banner = document.querySelector('.NARUTO_banner');
    /*�ֲ�ͼ���*/
    var width = banner.offsetWidth;
    /*ͼƬ����*/
    var imageBox = banner.querySelector('ul:first-child');
    /*������*/
    var pointBox = banner.querySelector('ul:last-child');
    /*���еĵ�*/
    var points = pointBox.querySelectorAll('li');
    var addTransition = function(){
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';/*����*/
    }
    /*�����*/
    var removeTransition = function(){
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';/*����*/
    }
    /*����λ��*/
    var setTranslateX = function(translateX){
        imageBox.style.transform = 'translateX('+translateX+'px)';/*���ֲ�ͼ���*/
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';/*����*/
    }
    var index = 1;/*Ĭ������*/
    var timer = setInterval(function(){
        index ++;
        /*����*/
        addTransition();
        /*λ��*/
        setTranslateX(-index*width);
    },3000);

    imageBox.addEventListener('transitionend',function(){
        if(index >=5 ){
            index = 1;
            removeTransition();
            setTranslateX(-index*width);
        }
        /*�޷컬��*/
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
    var startX = 0;/*��¼��ʼ��X����*/
    var distanceX = 0;/*��¼����������ĸı��*/
    /*�Ͻ��ж�*/
    var isMove = false;

    imageBox.addEventListener('touchstart',function(e){
        /*�����ʱ��*/
        clearInterval(timer);

        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = -index*width + distanceX;
        /*�������*/
        removeTransition();
        /*����λ*/
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
                    /*���һ�  ��һ��*/
                    index -- ;
                }else{
                    /*���� ��һ��*/
                    index ++ ;
                }
                /*�ӹ���*/
                addTransition();
                /*��λ*/
                setTranslateX(-index*width);
            }
        }
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            /*����*/
            addTransition();
            /*λ��*/
            setTranslateX(-index*width);
        },3000);
        startX = 0;
        distanceX = 0;
        isMove = false;

    });



};

