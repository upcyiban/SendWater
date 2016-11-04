/**
 * Created by Jaxlying on 2016/11/4.
 */
function login(appurl,client_id,redirect_uri,Vue) {
    var url = window.location.href;
    if (url.indexOf("verify_request") != -1) {
        var vq = window.location.href.split('=')[1].split('&')[0];
        if (vq != '') {
            Vue.http.get(appurl + '/auth?vq=' + vq).then((response)=> {
                console.log(response.data)
            });
        }
    }
    Vue.http.get(appurl + '/isauth').then((response)=> {
        console.log(response.data);
        if (response.data == 0) {
            window.location.href = "https://openapi.yiban.cn/oauth/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&display=html"
        }
    });
}
function checkIsLogin() {
}