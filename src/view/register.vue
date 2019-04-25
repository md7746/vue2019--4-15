<template>
    <div>
        用户名：<input v-model="userName" type="text" name="name"><br><br>
        邮&nbsp;&nbsp;&nbsp;&nbsp;箱：<input v-model="email" type="text" name="email"><br><br>
        密&nbsp;&nbsp;&nbsp;&nbsp;码：<input v-model="password" type="password" name="password"><br><br>
        确认密码：<input v-model="password2" type="password" name="password2"><br><br>
        <button @click.prevent=onSubmit>注册</button><br>
        <div v-if="status">
            <div v-for="(item, index) in errs" :key="index">{{item}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userName:'',
            email:'',
            password:'',
            password2:'',
            status:0,
            errs:{}
        }
    },
    methods:{
        onSubmit(){
            let reqDate = {
                email:this.email,
                name:this.userName,
                password:this.password,
                password2:this.password2
            }
            this.axios.post('/register',reqDate)
                .then(res=>{
                    if(res.data.status===400){
                        this.errs = res.data.errs;
                        this.status = 1;
                    }
                    if(res.data.status===200){
                        this.$router.push('/login');
                    }
                })
                .catch(err=>console.log(err))
        }
    }
}
</script>
<style>
    
</style>