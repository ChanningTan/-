/**
 * Created by Channing on 2016/12/16.
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
function next(ele,firstEle, tagName) {
    var element = ele;

    function nextElement(ele, firstEle) {
        if (ele.firstElementChild) {
            return ele.firstElementChild;
        } else if (ele.nextElementSibling) {
            return ele.nextElementSibling;
        } else {                                    //向上找到有后一个相邻元素的父级元素并返回
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

    do{
        element = nextElement(element, firstEle);
        if (element == null || element.tagName == tagName){
            return element;
        }
    } while (true);
}

//查找和遍历
function traverse(firstEle) {
    var nextEle = firstEle,
        buttonSearch = document.querySelector('.search'),
        input = document.querySelector('input'),
        searchText,
        interval;

    //获取输入框搜索文本
    EventUtil.addHandler(input, 'change', function() {
        searchText = input.value;
    });

    //提示文字
    function log(ele, text) {
        ele.insertAdjacentHTML('beforeEnd', "<p class = 'log'>"+text+"</p>");
    }

    //查询
    function search() {
        // nextEle.classList.remove('selected');
        nextEle = next(nextEle, firstEle, 'DIV');

        if (nextEle != null && nextEle.childNodes.item(1).nodeValue.trim() == searchText){
            nextEle.classList.add('selected');
            selected.push(nextEle);
            // clearInterval(interval);
            // nextEle = firstEle;                         //重置 便于再次遍历
        } else if (nextEle == null){
            log(document.body, '没有查找到符合的节点');
            clearInterval(interval);
            nextEle = firstEle;                         //重置 便于再次遍历
        }
    }
    EventUtil.addHandler(buttonSearch, 'click', function () {
        interval = setInterval(search, 0);
    });

}

//元素的选择 增加 删除
function option(firstEle) {
    var deleteButton = document.querySelector('.delete'),
        addButton = document.querySelector('.add'),
        input = document.querySelector("input[name = 'add']"),
        addText = '';

    //事件代理 获取点击的元素 并设置颜色
    function getSelected() {
        var e = event || window.event,
            ele = e.target,
            index = selected.indexOf(ele);

        if (index != -1){
            selected.splice(index, 1);
            ele.classList.remove('selected');
        } else if (ele != firstEle){
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
        element.insertAdjacentHTML('beforeEnd', '<div class=""><span class="arrow-0"></span> '+addText+'</div>');

    }
    EventUtil.addHandler(addButton, 'click', function () {
        selected.forEach(addElement);
    })

}

//展开和收回
function turn(firstEle) {

    function turnHandle() {
        var e = event || window.event,
            ele = e.target;
        console.log(ele.parentNode.childNodes);
        var nodes = ele.parentNode.childNodes,
            len = nodes.length;

        if (ele.tagName == 'SPAN' && ele.classList.contains('arrow-1')){
            ele.classList.remove('arrow-1');
            ele.classList.add('arrow-2');
            for (i=0; i<len; i++){
                if (nodes.item(i).tagName == 'DIV'){
                    nodes.item(i).classList.add('hidden');
                }
            }
        } else if(ele.tagName == 'SPAN' && ele.classList.contains('arrow-2')){
            ele.classList.remove('arrow-2');
            ele.classList.add('arrow-1');
            for (i=0; i<len; i++){
                if (nodes.item(i).tagName == 'DIV'){
                    nodes.item(i).classList.remove('hidden');
                }
            }
        }
        console.log(ele);
    }
    EventUtil.addHandler(firstEle, 'click', turnHandle);
}


//=====main============================================
var firstEle = document.querySelector('.tree'),
    selected = [];
traverse(firstEle);
option(firstEle);
turn(firstEle);

























