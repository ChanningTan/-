/**
 * Created by Channing on 2016/12/20.
 */

var formList = {

    form: {
        action: '#',
        name: 'info'
    },

    name: {
        label: '名称',
        type: 'input text',
        test: function (text) {
            var len = 0;

            for (var i = 0; i < text.length; i++) {
                var length = text.charCodeAt(i);
                if (length>=0 && length<=128){
                    len += 1;
                } else {
                    len += 2;
                }
            }

            if (len == 0){
                return this.empty;
            } else if (len<4 || len>16){
                return this.fail;
            } else {
                return this.success;
            }
        },
        rules: '必填，长度为4-16个字符',
        empty: '名称不能为空',
        success: '名称格式正确',
        fail: '长度应为4-16个字符'
    },

    password: {
        label: '密码',
        type: 'input password',
        test: function (text) {
            var len = 0;

            for (var i = 0; i < text.length; i++) {
                var length = text.charCodeAt(i);
                if (length>=0 && length<=128){
                    len += 1;
                } else {
                    len += 2;
                }
            }

            if (len == 0){
                return this.empty;
            } else if (len<4 || len>16){
                return this.fail;
            } else {
                return this.success;
            }
        },
        rules: '必填，长度为4-16个字符',
        empty: '密码不能为空',
        success: '密码格式正确',
        fail: '长度应为4-16个字符'
    },

    email: {
        label: '邮箱',
        type: 'input text',
        test: function (text) {
            var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

            if (text == ''){
                return this.empty;
            } else if (reg.test(text)){
                return this.success;
            } else {
                return this.fail;
            }
        },
        rules: '请正确填写邮箱地址',
        empty: '邮箱不能为空',
        success: '邮箱格式正确',
        fail: '邮箱格式错误'
    },

    phone: {
        label: '手机',
        type: 'input text',
        test: function (text) {
            var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

            if (text == ''){
                return this.empty;
            } else if (reg.test(text)){
                return this.success;
            } else {
                return this.fail;
            }
        },
        rules: '请正确填写手机号',
        empty: '手机号不能为空',
        success: '手机号格式正确',
        fail: '手机号格式错误'
    },

    ifSchool: {
        label: '',
        type: 'input radio',
        test: function (name) {
            var radios = document.querySelectorAll('input[name="'+name+'"]'),
                index = -1;

            for (var i=0; i<radios.length; i++){
                if (radios.item(i).checked){
                    index = i;
                    break;
                }
            }

            if (index == -1){
                return this.fail;
            } else {
                return this.success;
            }
        },
        option: ['在校生', '非在校生'],
        success: 'true',
        fail: 'false'
    }
};


































