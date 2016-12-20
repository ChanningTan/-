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

var inputs = document.querySelectorAll('input[type="text"], input[type="password"]'),
    nameInput = document.querySelector('input[name="name"]'),
    passwordInput = document.querySelector('input[name="password"]'),
    passwordInput2 = document.querySelector('input[name="password2"]'),
    emailInput = document.querySelector('input[name="email"]'),
    phoneInput = document.querySelector('input[name="phone"]'),
    submitButton = document.querySelector('input[type="submit"]'),
    divIfSchool = document.querySelector('.if-school'),
    radioSchool = document.querySelectorAll('input[name="ifSchool"]').item(0),
    schoolInput = document.querySelector('#school'),
    companyInput = document.querySelector('#company'),
    schoolCitySelect = document.querySelector('select[name="schoolCity"]'),
    schoolSelect = document.querySelector('select[name="school"]'),
    testResult = [0, 0, 0, 0, 0];


var FormHandel = {

    //验证名称
    name: function (input) {
        var info = input.parentNode.parentNode.querySelector('p'),
            i = testResult[0] = FormTest.testName(input);

        if (i == 0){
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '姓名不能为空';
        } else if(i == 1){
            input.className = 'input-right';
            info.className = 'info-right';
            info.textContent = '名称格式正确';
        } else{
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '名称长度应为4-16';
        }
    },

    //验证密码格式
    password: function (input) {
        var info = input.parentNode.parentNode.querySelector('p'),
            i = testResult[1] = FormTest.testName(input);

        if (i == 0){
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '密码不能为空';
        } else if(i == 1){
            input.className = 'input-right';
            info.className = 'info-right';
            info.textContent = '密码可用';
        } else{
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '密码长度应为4-16';
        }
    },

    //验证密码相同
    passwordSame: function (input, another) {
        var info = input.parentNode.parentNode.querySelector('p'),
            i = testResult[2] = FormTest.testSamePassword(input, another);

        if (i == 0){
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '密码输入不一致';
        } else{
            input.className = 'input-right';
            info.className = 'info-right';
            info.textContent = '密码输入一致';
        }
    },

    //验证邮箱格式
    email: function (input) {
        var info = input.parentNode.parentNode.querySelector('p'),
            i = testResult[3] = FormTest.testEmail(input);

        if (i == 0){
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '邮箱不能为空';
        } else if (i == 1){
            input.className = 'input-right';
            info.className = 'info-right';
            info.textContent = '邮箱格式正确';
        } else {
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '邮箱格式错误';
        }
    },

    //验证手机号格式
    phone: function (input) {
        var info = input.parentNode.parentNode.querySelector('p'),
            i = testResult[4] = FormTest.testPhone(input);

        if (i == 0){
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '手机号不能为空';
        } else if (i == 1){
            input.className = 'input-right';
            info.className = 'info-right';
            info.textContent = '手机号格式正确';
        } else {
            input.className = 'input-error';
            info.className = 'info-error';
            info.textContent = '手机号格式错误';
        }
    },

    //切换显示学校和公司
    toggleSchool: function (schoolInput, companyInput) {
        if (radioSchool.checked){
            schoolInput.classList.remove('hidden');
            companyInput.classList.add('hidden');
        } else {
            schoolInput.classList.add('hidden');
            companyInput.classList.remove('hidden');
        }
    },

    //切换select选项内容
    setSchoolSelect: function (schoolList, schoolCitySelect, schoolSelect) {
        var html = '',
            name = schoolCitySelect.selectedOptions[0].textContent.trim(),
            list = schoolList[name];

        for (var i=0; i<list.length; i++){
            html += '<option>'+list[i]+'</option>';
        }

        schoolSelect.innerHTML = html;
    }
};

//显示提示内容
for(var i=0; i<inputs.length; i++){
    EventUtil.addHandler(inputs.item(i), 'focus', function () {
        var e = event || window.event,
            ele = e.target;
        if(ele.parentNode.parentNode.querySelector('p')){
            ele.parentNode.parentNode.querySelector('p').classList.remove('hidden');
        }
    })
}

//绑定验证事件
EventUtil.addHandler(nameInput, 'blur', function () {
    FormHandel.name(nameInput);
});
EventUtil.addHandler(passwordInput, 'blur', function () {
    FormHandel.password(passwordInput);
});
EventUtil.addHandler(passwordInput, 'blur', function () {
    FormHandel.passwordSame(passwordInput2, passwordInput)
});
EventUtil.addHandler(passwordInput2, 'blur', function () {
    FormHandel.passwordSame(passwordInput2, passwordInput)
});
EventUtil.addHandler(emailInput, 'blur', function () {
    FormHandel.email(emailInput);
});
EventUtil.addHandler(phoneInput, 'blur', function () {
    FormHandel.phone(phoneInput);
});


var schoolList = {
    "北京": ['北京大学', '清华大学', '中国传媒大学'],
    "杭州": ['浙江大学', '浙江理工大学', '杭州电子科技大学', '浙江传媒学院'],
    "上海": ['复旦大学', '上海外国语大学', '上海交通大学']
};

//切换学校和公司
EventUtil.addHandler(divIfSchool, 'click', function () {
    var e = event || window.event;

    if (e.target.tagName == 'INPUT'){
        FormHandel.toggleSchool(schoolInput, companyInput);
    }
});
EventUtil.addHandler(schoolCitySelect, 'change', function () {
    FormHandel.setSchoolSelect(schoolList, schoolCitySelect, schoolSelect);
});



//提交表单
EventUtil.addHandler(submitButton, 'click', function () {
    var e = event || window.event;
    e.preventDefault();

    if (testResult.every(function (number) {
            return number == 1;
        })){
        alert('提交成功');
    } else {
        alert('输入有误');
    }
});


























