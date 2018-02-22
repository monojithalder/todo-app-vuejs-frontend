<template>
    <div>
        <form role="form" method="POST" action="/login" id="login_form" :class="['form-horizontal',{ 'form-opacity' : loader }]">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <h2>Please Login</h2>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only" for="username">Username</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                            <input type="text" name="username" class="form-control" id="username" v-model="username"
                                   placeholder="username" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-control-feedback">
                        <span class="text-danger align-middle">
                            <i class="fa fa-close"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="sr-only" for="password">Password</label>
                        <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
                            <input type="password" name="password" class="form-control" id="password" v-model="password"
                                   placeholder="Password" required>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-control-feedback">
                        <span class="text-danger align-middle">
                        <!-- Put password error message here -->
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6" style="padding-top: .35rem">
                    <div class="form-check mb-2 mr-sm-2 mb-sm-0">
                        <label class="form-check-label">
                            <input class="form-check-input" name="remember"
                                   type="checkbox" >
                            <span style="padding-bottom: .15rem">Remember me</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="row" style="padding-top: 1rem">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <button type="submit" class="btn btn-success" @click.prevent="login()"><i class="fa fa-sign-in"></i> Login</button>
                    <a class="btn btn-link" href="/password/reset">Forgot Your Password?</a>
                </div>
            </div>
        </form>
        <template v-if="loader == true">
            <div id="loading">
                <img src="../assets/loader.gif">
            </div>
        </template>

    </div>
</template>
<style>
    #loading {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        top: 79px;
        z-index: 100;
    }
    .form-opacity {
        opacity: .3;
    }
</style>

<script>
    import axios from 'axios'
    import router from '../router'
    export default {
        data: function () {
            return {
                username: '',
                password: '',
                loader: false
            }
        },
        router,
        methods: {
            login: function () {
                let server_url = 'http://192.168.33.10/todod8/web/user/login?_format=json'
                let local = this
                let cred = {}
                cred.name = this.username
                cred.pass = this.password
                //console.log(cred)
                //jquery("#loading").css('display','flex')
                //jquery("#")
                //jquery()
                this.loader = true
                axios({
                    method: 'post',
                    withCredentials: true,
                    url: server_url,
                    data: JSON.stringify(cred),
                    returnType: 'json',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/hal+json"
                    },
                    cookies: true,
                }).then(result=>{
                    //console.log(result);
                    local.loader = false
                    let values = {
                        'user': {
                            uid: result.data.current_user.uid,
                            roles: result.data.current_user.roles,
                            name: result.data.current_user.name,
                            csrf_token: result.data.csrf_token,
                            logout_token: result.data.logout_token
                        },
                        'login': true
                    }
                    //console.log(values)
                    this.$store.commit('setValue',values)
                    this.$store.commit('setLocalStorageValue')
                    router.push('test')

                }).catch(error => {
                    local.loader = false
                    alert("error")
                    console.log(error);
                })
            }
        }
    }
</script>