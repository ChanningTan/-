/**
 * Created by Channing on 2016/12/15.
 */

//绑定事件
var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on"+type, handler);
        } else {
            element["on"+type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on"+type, handler);
        } else{
            element["on"+type] = null;
        }
    }
};

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
            if (ele.parentNode && ele.parentNode != firstEle){
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

//查找和遍历
function traverse() {
    var nextEle = firstEle,
        button = document.querySelector('.begin'),
        buttonSearch = document.querySelector('.search'),
        input = document.querySelector('input'),
        searchText,
        interval;

    //获取输入框搜索文本
    EventUtil.addHandler(input, 'change', function() {
        searchText = input.value;
        // console.log(searchText);
    });

    //提示文字
    function log(ele, text) {
        ele.insertAdjacentHTML('beforeEnd', "<p class = 'log'>"+text+"</p>");
    }

    //切换颜色  删除前一个selected状态，并设置后一个元素selected状态
    function begin() {
        nextEle.classList.remove('selected');
        nextEle = next(nextEle);
        if (nextEle != null){
            nextEle.classList.add('selected');
        } else {
            clearInterval(interval);
            nextEle = firstEle;                             //重置 便于再次遍历
        }
    }
    EventUtil.addHandler(button, 'click', function () {
        interval = setInterval(begin, 500);
    });

    //切换颜色并查找
    function search() {
        nextEle.classList.remove('selected');
        nextEle = next(nextEle);

        if (nextEle != null){

            if (nextEle.firstChild.nodeValue.trim() == searchText){
                nextEle.classList.add('selected-red');
                clearInterval(interval);
                nextEle = firstEle;                         //重置 便于再次遍历
            } else {
                nextEle.classList.add('selected');
            }
        } else {
            log(document.body, '没有查找到符合的节点');
            clearInterval(interval);
            nextEle = firstEle;      //重置 便于再次遍历
        }
    }
    EventUtil.addHandler(buttonSearch, 'click', function () {
        interval = setInterval(search, 500);
    })

}

//元素的选择 增加 删除
function option() {
    var deleteButton = document.querySelector('.delete'),
        addButton = document.querySelector('.add'),
        input = document.querySelector("input[name = 'add']"),
        addText = '',
        selected = [];

    //事件代理 获取点击的元素 并设置颜色
    function getSelected() {
        var e = event || window.event,
            ele = e.target,
            index = selected.indexOf(ele);

        if (index != -1){
            selected.splice(index, 1);
            ele.classList.remove('selected');
        } else {
            selected.push(ele);
            ele.classList.add('selected');
        }
    }
    EventUtil.addHandler(firstEle, 'click', getSelected);

    //删除元素
    function deleteElement() {
        selected.forEach(function (element) {
            element.parentNode.removeChild(element);
        });
        selected = [];
    }
    EventUtil.addHandler(deleteButton, 'click', deleteElement);

    // 1.更新输入内容 2.添加元素
    EventUtil.addHandler(input, 'change', function() {
        addText = input.value;
    });
    function addElement(element) {
        var num = element.className.substr(10, 1);
        num ++;
        if (num<=4){
            element.insertAdjacentHTML('beforeEnd', '<div class="container-'+num+'">'+addText+'</div>');
        }
    }
    EventUtil.addHandler(addButton, 'click', function () {
        selected.forEach(addElement);
    })

}

// main -------------------------------------------------------
var firstEle = document.querySelector('.tree');
traverse(firstEle);
option(firstEle);


























