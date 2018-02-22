<template>
    <header>
        <div class="row">
            <div class="col-md-12">
                <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#/">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#/test">Test</a>
                            </li>
                            <li class="nav-item" v-if="isLogin() == 1">
                                <a class="nav-link" href="#/todo">Todo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#/login" v-if="isLogin() == 0">Login</a>
                            </li>
                            <li class="nav-item" v-if="isLogin() == 1">
                                <a class="nav-link" href="#/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
</template>
<style>
    nav {
        background-color: #42A5F5 !important;
    }
    nav li a {
        color: #fff !important;
    }

</style>
<script>
    export default {
        methods: {
            isLogin: function () {
                let return_value = 0
                if(this.$store.state.login == true) {
                    return_value = 1
                }
                return return_value
            }
        }
    }
</script>