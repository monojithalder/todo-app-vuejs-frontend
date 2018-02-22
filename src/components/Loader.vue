<template>
    <div id="loading" v-if="loader_gif == true">
        <img src="../assets/loader.gif">
    </div>
</template>

<script>
    export default {
        props: ['loader_gif']
    }
</script>