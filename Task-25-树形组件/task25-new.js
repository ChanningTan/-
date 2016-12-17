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

//整个树结构生成一个对象
function Tree(node, nodeTagName) {
    this.firstNode = node;
    this.focusNode = node;
    this.nodeTagName = nodeTagName;
    this.selectedNodes = [];
}
Tree.prototype = {

    constructor: Tree,

    //下一个树节点
    nextNode: function () {
        var element = this.focusNode;

        function nextElement(ele) {
            if (ele.firstElementChild) {
                return ele.firstElementChild;
            } else if (ele.nextElementSibling) {
                return ele.nextElementSibling;
            } else {   //向上找到有后一个相邻元素的父级元素并返回
                var parent = null;

                (function (ele) {
                    if (ele.parentNode && ele.parentNode != this.firstNode){
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
            element = nextElement(element);
            if (element == null || element.tagName == this.nodeTagName){
                this.focusNode = element;
                return this;
            }
        } while (true);
    },

    //查询不到的提示
    canNotFind: function (ele, text) {
        ele.insertAdjacentHTML('beforeEnd', "<p class = 'log'>"+text+"</p>");
    },

    //选中的节点展开到可见
    setShow: function () {
        var firstNode = this.firstNode;

        function getParents(element) {
            var node = element,
                parents = [];

            do {
                node = node.parentNode;
                parents.push(node);
            } while (node != firstNode);

            return parents;
        }

        this.selectedNodes.forEach(function (element) {
            getParents(element).forEach(function (element) {
                var nodes = element.childNodes,
                    len = nodes.length,
                    span = element.querySelector('span');

                for (i=0; i<len; i++){
                    if (nodes.item(i).tagName == 'DIV'){
                        nodes.item(i).classList.remove('hidden');
                    }
                }

                span.classList.remove('arrow-1');
                span.classList.add('arrow-2');
            });
        });
    },

    //查询节点
    search: function (searchText) {
        this.selectedNodes = [];
        var find = false;

        do {
            console.log(this.focusNode);
            this.focusNode.classList.remove('selected');
            this.nextNode();
            if(this.focusNode != null && this.focusNode.childNodes.item(1).nodeValue.trim() == searchText){
                this.selectedNodes.push(this.focusNode);
                find = true;
            } else if(this.focusNode == null){
                if (find == true){
                    break;
                } else {
                    this.canNotFind(this.firstNode, '没有找到符合的节点');
                    break;
                }
            }
        } while (true);

        this.setShow();
        this.focusNode = this.firstNode;
        this.selectedNodes.forEach(function (element) {
            element.classList.add('selected');
        });

    },

    //切换选中状态
    toggleSelected: function () {
        var e = event || window.event,
            ele = e.target,
            index = this.selectedNodes.indexOf(ele);


        if (index != -1){
            this.selectedNodes.splice(index, 1);
            ele.classList.remove('selected');
        } else if (ele != this.firstNode && ele.tagName == this.nodeTagName){
            this.selectedNodes.push(ele);
            ele.classList.add('selected');
        }
    },

    //删除节点
    deleteNode: function () {
        this.selectedNodes.forEach(function (element) {
            if (element != this.firstNode.firstElementChild){
                element.parentNode.removeChild(element);
            }
        });
        this.selectedNodes = [];
    },

    //增加节点
    addNode: function (addText) {
        if (addText != ''){
            this.setShow();
            this.selectedNodes.forEach(function (element) {
                element.insertAdjacentHTML('beforeEnd', '<div class=""><span class="arrow-0"></span> '+addText+'</div>');
                element.querySelector('span').classList.remove('arrow-1');
                element.querySelector('span').classList.add('arrow-2');

                //展开添加节点的项
                var nodes = element.childNodes,
                    len = nodes.length;

                for (i=0; i<len; i++){
                    if (nodes.item(i).tagName == 'DIV'){
                        nodes.item(i).classList.remove('hidden');
                    }
                }
            });
        }
    },

    //展开和收回
    switch: function () {
        var e = event || window.event,
            ele = e.target,
            nodes = [],
            len,
            i;

        if (ele.tagName == 'SPAN'){
            nodes = ele.parentNode.childNodes;
            len = nodes.length;

            if (ele.classList.contains('arrow-1')){
                ele.classList.remove('arrow-1');
                ele.classList.add('arrow-2');
                for (i=0; i<len; i++){
                    if (nodes.item(i).tagName == 'DIV'){
                        nodes.item(i).classList.remove('hidden');
                    }
                }
            }else if (ele.classList.contains('arrow-2')){
                ele.classList.remove('arrow-2');
                ele.classList.add('arrow-1');
                for (i=0; i<len; i++){
                    if (nodes.item(i).tagName == 'DIV'){
                        nodes.item(i).classList.add('hidden');
                    }
                }
            }
        }
    }

};

//=======main================================

var firstNode = document.querySelector('.tree'),
    buttonSearch = document.querySelector('.search'),
    buttonAdd = document.querySelector('.add'),
    buttonDelete = document.querySelector('.delete'),
    search = document.querySelector('input[name="search"]'),
    add = document.querySelector('input[name="add"]'),
    searchText = '',
    addText = '';

var tree = new Tree(firstNode, 'DIV');


//更新输入的内容
EventUtil.addHandler(search, 'change', function () {
    searchText = search.value;
});
EventUtil.addHandler(add, 'change', function () {
    addText = add.value;
});

//绑定按钮事件
EventUtil.addHandler(buttonSearch, 'click', function () {
    tree.search(searchText);
});
EventUtil.addHandler(buttonAdd, 'click', function () {
    tree.addNode(addText);
});
EventUtil.addHandler(buttonDelete, 'click', function () {
    tree.deleteNode();
});
EventUtil.addHandler(firstNode, 'click', function () {
    tree.toggleSelected();
});
EventUtil.addHandler(firstNode, 'click', function () {
    tree.switch();
});
































