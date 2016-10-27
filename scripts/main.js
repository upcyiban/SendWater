function login() {
    var url = window.location.href;
    if (url.indexOf("verify_request") != -1) {
        var vq = window.location.href.split('=')[1].split('&')[0];
        if (vq != '') {
            Vue.http.get(config.appurl + '/auth?vq=' + vq).then((response)=> {
                console.log(response.data)
            });
        }
    }
    Vue.http.get(config.appurl + '/isauth').then((response)=> {
        console.log(response.data);
        if (response.data == 0) {
            window.location.href = "https://openapi.yiban.cn/oauth/authorize?client_id=" + config.client_id + "&redirect_uri=" + config.redirect_uri + "&display=html"
        }
    });
}
function checknumber(tel) {
    var reg = /^1[34578]\d{9}$/;
    console.log(tel)
    if (reg.test(tel)) {
        console.log(true);
        return true;
    } else {
        console.log(false);
        return false;
    }
}
//cookie 跨域
Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
})
var sub = new Vue({
    el: '#sub-form',
    data:{
        name: '',
        block: '',
        dormitory: '',
        phone: '',
        num: 1,
        ticket: 0

    },
    methods: {
        sub: function () {
            if ($('#dormitory').val() == '') {
                alert('请输入宿舍号');
                return false;
            } else if ($('#num').val() == '') {
                alert('请输入桶数');
                return false;
            } else if ($('#tiket').val() == '') {
                alert('请输入水票数');
                return false;
            } else if (isNaN($('#num').val()) == true) {
                alert('桶数不符合规范');
                return false;
            } else if (isNaN($('#ticket').val()) == true) {
                alert('水漂数不符合规范');
                return false;
            }
            params = {
                blockNumber: $('#block').val(),
                dormitory: $('#dormitory').val(),
                num: $('#num').val(),
                ticket: $('#ticket')
            };
            this.$http.get(config.appurl, {params: params}).then((response)=> {
                console.log(response.data)
                if (response.data.code == 1) {
                    $('#dormitory').val('');
                    $('#num').val('');
                     $('#ticket').val('');
                    $('#subModal').modal('hide');
                    $('#success').modal('show');

                }else {
                    alert("未知错误");
                }
            });
        }
    }
})