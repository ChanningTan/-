/**
 * Created by Channing on 2016/12/19.
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

var FormTest = {

    getByteLen: function(val) {
        var len = 0;

        for (var i = 0; i < val.length; i++) {
            var length = val.charCodeAt(i);
            if (length>=0 && length<=128){
                len += 1;
            } else {
                len += 2;
            }
        }
        return len;
    },

    test1: function (input) {
        var len = FormTest.getByteLen(input.value);

        if (len == 0){
            return 0;
        } else if (len<4 || len>16){
            return 1;
        } else {
            return 2;
        }
    }

};


//===main=============================

var input = document.querySelectorAll('input'),
    testButton = document.querySelectorAll('.test-button');

EventUtil.addHandler(testButton.item(0), 'click', function () {
    var info = testButton.item(0).parentNode.querySelector('p');
    var i = FormTest.test1(input.item(0));

    if (i == 0){
        info.className = 'info-error';
        info.textContent = '姓名不能为空';
    } else if(i == 1){
        info.className = 'info-error';
        info.textContent = '名称长度应为4-16';
    } else{
        info.className = 'info-right';
        info.textContent = '名称格式正确';
    }
});




























