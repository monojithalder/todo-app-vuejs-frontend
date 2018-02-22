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
                    <td>Action</td>

                </tr>
                </thead>
                <tr v-for="(item,index) in itemList">
                    <td>{{ item.title }}</td>
                    <td><div v-html="item.body"></div></td>
                    <td>{{ item.field_status }}</td>
                    <td>{{ item.field_time_taken }}</td>
                    <td>{{ item.field_deadline }}</td>
                    <td><a href="#" @click="initUpdateItem(item,index)">Edit</a></td>
                </tr>
            </table>
        </div>
        <template v-if="editForm == true">
            <div class="edit-modal">
                <form>
                    <img src="../assets/cross.svg" @click="closeModel" class="cross">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" v-model="tempData.title1"  placeholder="Enter title">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" rows="3" v-model="tempData.description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="time_tacken">Time Tacken</label>
                        <input type="text" class="form-control" id="time_tacken" v-model="tempData.time_taken"  placeholder="Enter time tacken">
                    </div>
                    <div class="form-group">
                        <label for="deadline">Deadline</label>
                        <input type="date" class="form-control" id="deadline" v-model="tempData.deadline"  placeholder="Enter deadline">
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select class="form-control" name="status" id="status" v-model="tempData.status">
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <input type="submit" value="Update" class="btn btn-primary" @click.prevent="updateItem()">
                </form>
                <template v-if="loader == true">
                    <div id="loading">
                        <img src="../assets/loader.gif">
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<style>
    .edit-modal {
        position: absolute;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        top: 68px;
    }
    .edit-modal form {
        position: relative;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        padding: 10px 30px 10px 30px;
        background-color: ghostwhite;
    }
    .cross {
        position: absolute;
        width: 34px;
        right: -2px;
        top: -2px;
        cursor: pointer;
    }
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
    export default {
        data: function () {
            return {
                itemList: [],
                tempData: {},
                editForm: false,
                currentIndex: 0,
                loader: false
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
            },
            initUpdateItem: function (item,index) {
                console.log(item)
                this.tempData.title1 = item.title
                this.tempData.description = item.body
                this.tempData.status = item.field_status
                this.tempData.time_taken = item.field_time_taken
                this.tempData.deadline = item.field_deadline
                this.tempData.nid      = item.nid
                this.editForm = true
                this.currentIndex = index
            },
            csrf: function () {
                return this.$store.state.user.csrf_token
            },
            updateItem: function () {
                this.loader = true
                let local = this
                console.log(this.tempData)
                let node_data = {
                    'title': [{"value": this.tempData.title1}],
                    'type': [{"target_id": "task"}],
                    'field_status': [{"value": this.tempData.status}],
                    'field_time_taken': [{"value": this.tempData.time_taken}]
                }
                console.log("http://192.168.33.10/todod8/web/node/"+this.tempData.nid+"?_format=json")
                axios({
                    method: 'patch',
                    responseType: 'json',
                    withCredentials: true,
                    url: "http://192.168.33.10/todod8/web/node/"+this.tempData.nid+"?_format=json",
                    data: node_data,
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                        "X-CSRF-Token": local.csrf()
                    },
                }).then(result=>{
                    local.loader= false
                    local.editForm = false
                    local.itemList[this.currentIndex]['title'] = local.tempData['title1']
                    local.itemList[this.currentIndex]['body'] = local.tempData['description']
                    local.itemList[this.currentIndex]['field_status'] = local.tempData['status']
                    local.itemList[this.currentIndex]['field_time_taken'] = local.tempData['time_taken']
                    local.itemList[this.currentIndex]['field_deadline'] = local.tempData['deadline']
                }).catch(function (error) {
                    console.log(error)
                    local.loader = false
                })
            },
            closeModel: function () {
                this.editForm = false
            }

        }
    }
</script>