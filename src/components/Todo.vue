<template>
    <div class="row mt-5">
        <div class="col-md-12">
            <a href="#/create-todo" class="btn btn-primary">Create New</a>
            <table class="table table-bordered mt-1">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <td>Status</td>
                    <td>Time Taken</td>
                    <td>Deadline</td>

                </tr>
                </thead>
                <tr v-for="item in itemList">
                    <td>{{ item.title }}</td>
                    <td><div v-html="item.body"></div></td>
                    <td>{{ item.field_status }}</td>
                    <td>{{ item.time_taken }}</td>
                    <td>{{ item.field_deadline }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data: function () {
            return {
                itemList: []
            }
        },
        mounted () {
            this.getTaskList()
        },
        methods: {
            getTaskList: function () {
                let server_url = 'http://192.168.33.10/todod8/web/get-tasks'
                let local = this
                axios({
                    method: 'get',
                    responseType: 'json',
                    url: server_url,
                    data: {

                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/hal+json'
                    }
                }).then(function (response) {
                    if (response.status === 200) {
                        console.log(response.data);
                        for(let i=0; i ,i < response.data.length; i++) {
                            local.itemList.push(response.data[i])
                        }
                        console.log(local.itemList);
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }
</script>