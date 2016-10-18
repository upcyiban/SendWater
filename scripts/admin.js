/**
 * Created by Jaxlying on 2016/10/18.
 */

//cookie 跨域
Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
});
function checkAdmin() {
    Vue.http.get(config.appurl + '/isadmin').then((response)=> {
        if (response.data != 1) {
            console.log("not admin");
            window.location.href = "index.html";
        }
    });
}
var filelist = new Vue({
    el: '#filelist',
    data: {
        lists: []     
    }
})
checkAdmin();
Vue.http.get(config.appurl + '/showfilelist').then((response)=> {
	filelist.lists = response.data;
});



