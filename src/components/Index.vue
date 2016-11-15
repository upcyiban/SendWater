<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <h1 class="text-center">石大易送水</h1>
        <form action="" id="sub-form">
            <label>楼号</label>
            <select class="form-control" id="block" v-model="block">
                <option value="1">1号楼</option>
                <option value="2">2号楼</option>
                <option value="3">3号楼</option>
                <option value="4">4号楼</option>
                <option value="5">5号楼</option>
                <option value="6">6号楼</option>
                <option value="7">7号楼</option>
                <option value="8">8号楼</option>
                <option value="9">9号楼</option>
                <option value="10">10号楼</option>
                <option value="11">11号楼</option>
                <option value="12">12号楼</option>
                <option value="13">13号楼</option>
                <option value="14">14号楼</option>
                <option value="15">15号楼</option>
                <option value="16">16号楼</option>
                <option value="17">17号楼</option>
                <option value="18">18号楼</option>
                <option value="19">19号楼</option>
            </select>

            <div class="form-group">
                <label>宿舍号</label>
                <input type="text" class="form-control" name="dormitory" id="dormitory" placeholder="请输入宿舍号" v-model="dormitory">
            </div>


            <div class="form-group">
                <label>桶数</label>
                <input type="text" class="form-control" name="num" id="num" placeholder="输入桶数，纯数字" v-model="num">
            </div>

            <div class="form-group">
                <label>水票数</label>
                <input type="text" class="form-control" name="ticket" id="ticket" placeholder="输入想要订购的水票数，纯数字，默认为0" v-model="ticket">
            </div>
            <div class="form-group">
                <label class="sr-only"></label>
                <button class="form-control btn btn-primary" data-toggle="modal" data-target="#subModal" type="button">提交</button>
            </div>

            <div class="modal fade" id="subModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>

                        </div>
                        <div class="modal-body">
                            您的楼号: {{ block }}
                            <br>
                            您的宿舍: {{ dormitory }}
                            <br>
                            订购桶数: {{num}}
                            <br>
                            订购水票: {{ticket}}
                            <br>
                        </div>
                        <div class="modal-footer">

                            <div class="checkbox">
                                <label>
                                    <input id="subcheck" type="checkbox" checked="checked"> 我同意<router-link to="/mianze">免责声明</router-link></a>
                                </label>
                            </div>
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                            </button>
                            <button @click="sub" type="button" class="btn btn-primary">
                                提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>


        <div class="modal fade" id="success" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title">
                            提交成功
                        </h4>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                        </button>
                    </div>
                </div>
            </div>
        </div>




        <div class="shuoming">
            <h4 class="text-center">说明</h4>
            <div class="text-cneter">
                1.订水票优惠: 订十张送三张<br>
                2.晚上八点以前订水当天派送，逾期次日派送。<br>
                3.由石大利群水站确保水的质量。<br>
                4.石大利群水站电话: 13406802899(吕先生)。<br>
                5.该应用的最总解释权归中国石油大学(华东)易班发展中心所有。
            </div>
        </div>
    </div>
</template>
<style>
    #sub-form{
        margin-left: 10%;
        margin-right: 10%;
    }
    #block{
        margin-bottom: 1%;
    }
    .shuoming{
        margin-left: 10%;
        margin-right: 10%;
    }

</style>
<script>
    import Vue from 'vue';
    import VueRsource from 'vue-resource';
    import VueRouter from 'vue-router';
    import appConfig from '../config/app';
    Vue.use(VueRsource);
    Vue.use(VueRouter);
    Vue.http.interceptors.push((request, next) => {
        request.credentials = true;
        next()
    });
    export default{
        mounted: ()=> {
            var config = appConfig;
            var url = window.location.href;
            if (url.indexOf("verify_request") != -1) {
                var vq = window.location.href.split('=')[1].split('&')[0];
                if (vq != '') {
                    Vue.http.get(config.appurl + '/auth?vq=' + vq).then((response)=> {
                        console.log(response.data);
                    });
                }
            }
            Vue.http.get(config.appurl + '/isauth').then((response)=> {
                if (response.data == 0) {
                    window.location.href = "https://openapi.yiban.cn/oauth/authorize?client_id=" + config.client_id + "&redirect_uri=" + config.redirect_uri + "&display=html"
                }else {
                    window.location.href = config.index_url;
                }
            });
        },
        data () {
            return {
                block: '1',
                dormitory: '',
                num: 1,
                ticket: 0
            }
        },
        methods: {
            sub(){
                var config = appConfig;
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
                    alert('水票数不符合规范');
                    return false;
                }else if($('#subcheck').prop('checked')==false){
                    alert('不同意免责声明');
                    return false;
                }
                var params = {
                    blockNumber: $('#block').val(),
                    dormitory: $('#dormitory').val(),
                    num: $('#num').val(),
                    ticket: $('#ticket')
                };
                Vue.http.get(config.appurl, {params: params}).then((response)=> {
                    if (response.data.code == 1) {
                        this.block = 1;
                        this.dormitory='';
                        this.num=1;
                        this.ticket=0;
                        $('#subModal').modal('hide');
                        $('#success').modal('show');

                    }else {
                        alert("未知错误");
                    }
                });
            }
        }

    }
</script>