<template>
    <div>
        <span @click="getInfo">admin</span>
    </div>
</template>
<script>
export default {
    methods:{
        getInfo(){
            this.axios.get('/info')
                .then(res=>{
                    console.log(res.data);
                    
                })
                .catch(err=>console.log(err))
        }
    }
}
</script>
<style>
    
</style>