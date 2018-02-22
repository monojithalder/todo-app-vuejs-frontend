<template>
    <div class="testing">
        <h1>This is testing page {{ counter }}</h1>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>

        <button @click="setValue">Set 500</button>

        <button @click="session_token">Token</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Testing',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed: {
            counter: function () {
                return this.$store.state.count;
            },
            csrf: function () {
                return this.$store.state.user.csrf_token
            }
        },
        methods: {
            increment: function () {
                this.$store.commit('increment')
                this.$store.commit('setLocalStorageValue')
            },
            decrement: function () {
                this.$store.commit('decrement')
                this.$store.commit('setLocalStorageValue')
            },
            setValue: function () {
                let values = {}
                values[0] = 'count'
                values[1]  = 2000
                this.$store.commit('setValue',values)
                this.$store.commit('setLocalStorageValue')
            },
            session_token: function () {
                axios({
                    method: 'post',
                    url: "http://192.168.33.10/todod8/web/" +
                    "",
                    withCredentials: true,
                    cookies: true,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": this.csrf
                    }
                }).then(result=>{
                    console.log(result)
                }).catch(error => {
                    alert("error")
                    console.log(error);
                })
            }
        }
    }
</script>