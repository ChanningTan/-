/**
 * Created by Channing on 2016/12/20.
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


function Form(element, formList) {
    this.container = element;
    this.form = {};
    this.formList = formList;

}
Form.prototype = {
    constructor: Form,

    //创建Form表单
    setForm: function () {
        this.form = document.createElement('FORM');
        this.form.action = this.formList.form.action;
        this.form.name = this.formList.form.name;

        //枚举formList属性，并生成对应的html字符串
        for (var i in this.formList){
            var item = this.formList[i];

            if (i != 'form'){

                if (item.type.split(' ')[0] == 'input'){
                    var name = i,
                        label = item.label,
                        type = item.type.split(' ')[1],
                        html = '';

                    if (type == 'text' || type == 'password'){
                        html = '<div><label><i>'+label+'</i><input type="'+type+'" name="'+name+'"></label><p class="hidden"></p></div>';

                    } else if (type == 'radio'){
                        var htmlOfOption = '';
                        item.option.map(function (text) {
                            htmlOfOption += '<label><input type="radio" name="'+name+'">'+text+'</label>'
                        });
                        html = '<div class="div-radio">'+htmlOfOption+'</div>'
                    }

                    this.form.innerHTML += html;
                }
            }
        }

        //插入form到容器
        this.form.innerHTML += '<input type="submit">';
        this.container.appendChild(this.form);
        return this;
    },

    //设置表单的focus提示和输入内容检验
    setInfo: function () {
        var inputs = this.form.querySelectorAll('input[type="text"], input[type="password"]'),
            formList = this.formList;

        inputs.forEach(function (element) {
            var p = element.parentNode.parentNode.querySelector('p'),
                name = element.name;

            EventUtil.addHandler(element, 'focus', function () {
                p.className = '';
                p.textContent = formList[name].rules;
            });

            EventUtil.addHandler(element, 'blur', function (event) {
                var element = event.target;
                p.textContent = formList[name].test(element.value);

                if (p.textContent == formList[name].success){
                    element.className = 'input-right';
                    p.className = 'info-right';
                } else {
                    element.className = 'input-error';
                    p.className = 'info-error';
                }
            });
        });

        return this;
    },

    //提交验证
    submitTest: function (submitElement) {
        var inputs = this.form.querySelectorAll('label input'),
            formList = this.formList,
            i = '';

        //点击提交时，对每一项 input 检测，最后全部为 true 时 alert('提交成功')
        function handle() {
            var e = event || window.event;
            e.preventDefault();

            inputs.forEach(function (element) {
                var obj = formList[element.name];

                if (element.type == 'radio'){
                    i += obj.test(element.name) == obj.success;
                } else {
                    i += obj.test(element.value) == obj.success;
                }
            });

            if (/false/.test(i)){
                alert('格式错误');
            } else {
                alert('提交成功');
            }
            i = '';
        }

        EventUtil.addHandler(submitElement, 'click', handle);
        return this;
    }
};


//======== main ==========================================================
var form = new Form(document.querySelector('.container'), formList);
form.setForm().setInfo().submitTest(document.querySelector('input[type="submit"]'));





































