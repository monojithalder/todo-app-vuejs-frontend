<template>
    <div>
        <div id="loading">
            <img src="../assets/loader.gif">
        </div>
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
</style>

<script>
    import axios from 'axios'
    import router from '../router'
    export default {
        data: function () {
            return {
                itemList: []
            }
        },
        router,
        mounted () {
            this.logout()
        },
        methods: {
            csrf: function () {
                return this.$store.state.user.csrf_token
            },
            logout: function () {
                let server_url = 'http://192.168.33.10/todod8/web/user/logout'
                let local = this
                axios({
                    method: 'get',
                    withCredentials: true,
                    responseType: 'json',
                    url: server_url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/hal+json',
                        'X-CSRF-Token': this.csrf()
                    }
                }).then(function (response) {
                    let values = {
                        'user': {

                        },
                        'login': false
                    }
                    local.$store.commit('setValue',values)
                    local.$store.commit('setLocalStorageValue')
                    router.push('login')
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }
</script>