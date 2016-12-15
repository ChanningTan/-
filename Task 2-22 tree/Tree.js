/**
 * Created by Channing on 2016/12/15.
 */

function traverse() {
    var nextEle = document.querySelector('.tree');
    var button = document.querySelector('.button');
    var interval;

    //遍历函数 - 1 第一个子元素 2 同级下一个元素 3 有同级下一个元素的父级元素
    function next(ele) {

        if (ele.firstElementChild) {
            return ele.firstElementChild;
        } else if (ele.nextElementSibling) {
            return ele.nextElementSibling;
        } else {

            //向上找到有后一个相邻元素的父级元素并返回
            var parent = null;

            (function back(ele) {
                if (ele.parentNode){
                    if (ele.parentNode.nextElementSibling){
                        parent = ele.parentNode.nextElementSibling;
                    } else {
                        arguments.callee(ele.parentNode);
                    }
                }
            })(ele);

            return parent;
        }
    }

    //删除前一个selected状态，并设置后一个元素selected状态
    function begin() {
        nextEle.classList.remove('selected');
        nextEle = next(nextEle);
        if (nextEle != null){
            nextEle.classList.add('selected');
        } else {
            clearInterval(interval);
            nextEle = document.querySelector('.tree');      //重置 便于再次遍历
        }
    }

    button.addEventListener('click', function () {
        interval = setInterval(begin, 500);
    })
}


// main -------------------------------------------------------

traverse();


























