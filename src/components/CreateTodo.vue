<template>
    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <h1>Create Todo</h1>
            <form>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" v-model="title"  placeholder="Enter title">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="time_tacken">Time Tacken</label>
                    <input type="text" class="form-control" id="time_tacken" v-model="time_taken"  placeholder="Enter time tacken">
                </div>
                <div class="form-group">
                    <label for="deadline">Deadline</label>
                    <input type="date" class="form-control" id="deadline" v-model="deadline"  placeholder="Enter deadline">
                </div>
                <div class="form-group">
                    <label for="status">Status</label>
                    <select class="form-control" name="status" id="status" v-model="status">
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <input type="submit" value="Create" class="btn btn-primary" @click.prevent="createTodo()">
            </form>
        </div>
        <span>{{ status }}</span>
        <p>Counter: {{ counter }}</p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        data () {
            return {
                title: '',
                description: '',
                time_taken: '',
                deadline: '',
                status: ''
            }
        },
        computed: {
            counter: function () {
                return this.$store.state.count
            },
            csrf: function () {
                return this.$store.state.user.csrf_token
            },
            uid: function () {
                return this.$store.state.user.uid
            }
        },
        methods: {
            createTodo: function () {
                let node = {
                    "type": [{"target_id": "task"}],
                    "title": [{"value": this.title}],
                    "body": [{"value": this.description}],
                    "field_deadline": [{"value": this.deadline}],
                    "field_status": [{"value": this.statue}],
                    "field_user": [{"target_id": this.uid}],
                    "field_time_taken": [{"value": this.time_taken}]
                };
                //console.log(this.csrf)
                axios({
                    method: 'post',
                    withCredentials: true,
                    url: "http://192.168.33.10/todod8/web/node?_format=json",
                    data: node,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": this.csrf
                    },
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