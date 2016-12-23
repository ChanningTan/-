/**
 * Created by Channing on 2016/12/22.
 */

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

function FloatWindow(floatWindowObject, ShowElement, width, height) {
    this.body = document.createElement('DIV');
    this.body.className = 'float-window hidden';
    this.setWindow(floatWindowObject, width, height);
    this.setWindowShow(ShowElement);
    this.setWindowHidden(this.body);
    this.setWindowHidden(document.querySelector('.float-window-nav i'));
    this.setWindowHidden(document.querySelector('.cancel'));
    this.setMove();
}
FloatWindow.prototype = {
    constructor: FloatWindow,

    noScrollHandler: function () {
        event.preventDefault();
    },

    //根据对象内容创建弹窗
    setWindow: function (floatWindowObject, width, height) {
        this.body.innerHTML = floatWindowObject.windowHTML;
        this.body.querySelector('.float-window-content').innerHTML = floatWindowObject.contentHTML;
        document.body.insertBefore(this.body, document.body.firstChild);

        var a = width || 480,
            b = height || 400;
        this.body.querySelector('.float-window-main').style.width = a + 'px';
        this.body.querySelector('.float-window-main').style.height = b + 'px';
    },

    //显示弹窗按钮的事件
    setWindowShow: function (showElement) {
        var self = this;
         EventUtil.addHandler(showElement, 'click', function () {
             self.body.classList.remove('hidden');
             self.body.style.top = document.body.scrollTop + 'px';
             self.body.style.left = document.body.scrollLeft + 'px';
             //禁止页面滚动
             EventUtil.addHandler(document, 'mousewheel', self.noScrollHandler);
         });
    },

    //关闭弹窗事件
    setWindowHidden: function (hiddenElement) {
        var self = this;
        EventUtil.addHandler(hiddenElement, 'click', function (event) {
            if (event.target == hiddenElement){
                self.body.classList.add('hidden');
                EventUtil.removeHandler(document, 'mousewheel', self.noScrollHandler);
            }
        });
    },

    //浮窗拖动
    setMove: function () {
        var self = this,
            nav = self.body.querySelector('.float-window-nav'),
            main = self.body.querySelector('.float-window-main'),
            x, y;

        function navMove() {
            main.style.top = (event.clientY - y) + 'px';
            main.style.left = (event.clientX - x) + 'px';
        }

        EventUtil.addHandler(nav, 'mousedown', function () {
            x = event.clientX - main.offsetLeft;
            y = event.clientY - main.offsetTop;
            EventUtil.addHandler(self.body, 'mousemove', navMove);
        });
        EventUtil.addHandler(document, 'mouseup', function () {
            EventUtil.removeHandler(self.body, 'mousemove', navMove);
        })
    }
};


//========= main ====================================

//浮窗大小的参数在css中做了限制，width{480, 1000} height{400, 800}
var floatWindow = new FloatWindow(floatWindowObject, document.querySelector('#floatWindow'));

































