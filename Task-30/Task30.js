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

    //验证名称
    testName: function (input) {
        var len = FormTest.getByteLen(input.value);

        if (len == 0){
            return 0;
        } else if (len<4 || len>16){
            return 2;
        } else {
            return 1;
        }
    },

    //验证密码相同
    testSamePassword: function (input1, input2) {
        if (input1.value == input2.value){
            return 1;
        } else {
            return 0;
        }
    },

    //验证邮箱格式
    testEmail: function (input) {
        var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

        if (input.value == ''){
            return 0;
        } else if (reg.test(input.value)){
            return 1;
        } else {
            return 2;
        }
    },

    //验证手机号格式
    testPhone: function (input) {
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

        if (input.value == ''){
            return 0;
        } else if (reg.test(input.value)){
            return 1;
        } else {
            return 2;
        }
    }
};


//===main==============================================================

var input = document.querySelectorAll('input[type="text"], input[type="password"]'),
    submitButton = document.querySelector('input[type="submit"]'),
    testResult = [0, 0, 0, 0, 0];

//显示提示内容
for(var i=0; i<input.length; i++){
    EventUtil.addHandler(input.item(i), 'focus', function () {
        var e = event || window.event,
            ele = e.target;
        ele.parentNode.parentNode.querySelector('p').classList.remove('hidden');
    })
}

//验证名称
EventUtil.addHandler(input.item(0), 'blur', function () {
    var inputBox = input.item(0),
        info = inputBox.parentNode.parentNode.querySelector('p'),
        i = testResult[0] = FormTest.testName(inputBox);

    if (i == 0){
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '姓名不能为空';
    } else if(i == 1){
        inputBox.className = 'input-right';
        info.className = 'info-right';
        info.textContent = '名称格式正确';
    } else{
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '名称长度应为4-16';
    }
});

//验证密码
EventUtil.addHandler(input.item(1), 'blur', function () {
    var inputBox = input.item(1),
        info = inputBox.parentNode.parentNode.querySelector('p'),
        i = testResult[1] = FormTest.testName(inputBox);

    if (i == 0){
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '密码不能为空';
    } else if(i == 1){
        inputBox.className = 'input-right';
        info.className = 'info-right';
        info.textContent = '密码可用';
    } else{
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '密码长度应为4-16';
    }
});

//验证密码相同
EventUtil.addHandler(input.item(2), 'blur', function () {
    var inputBox = input.item(2),
        inputBoxAnother = input.item(1),
        info = inputBox.parentNode.parentNode.querySelector('p'),
        i = testResult[2] = FormTest.testSamePassword(inputBox, inputBoxAnother);

    if (i == 0){
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '密码输入不一致';
    } else{
        inputBox.className = 'input-right';
        info.className = 'info-right';
        info.textContent = '密码输入一致';
    }
});

//验证邮箱格式
EventUtil.addHandler(input.item(3), 'blur', function () {
    var inputBox = input.item(3),
        info = inputBox.parentNode.parentNode.querySelector('p'),
        i = testResult[3] = FormTest.testEmail(inputBox);

    if (i == 0){
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '邮箱不能为空';
    } else if (i == 1){
        inputBox.className = 'input-right';
        info.className = 'info-right';
        info.textContent = '邮箱格式正确';
    } else {
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '邮箱格式错误';
    }
});

//验证手机号格式
EventUtil.addHandler(input.item(4), 'blur', function () {
    var inputBox = input.item(4),
        info = inputBox.parentNode.parentNode.querySelector('p'),
        i = testResult[4] = FormTest.testPhone(inputBox);

    if (i == 0){
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '手机号不能为空';
    } else if (i == 1){
        inputBox.className = 'input-right';
        info.className = 'info-right';
        info.textContent = '手机号格式正确';
    } else {
        inputBox.className = 'input-error';
        info.className = 'info-error';
        info.textContent = '手机号格式错误';
    }
});

//提交
EventUtil.addHandler(submitButton, 'click', function () {
    if (testResult.indexOf(0) == -1){
        alert('提交成功');
    } else {
        alert('输入有误');
    }
});


























