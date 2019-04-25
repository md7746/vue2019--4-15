<template>
  <div>
    <span v-show="loginStatus" class="fr" @click= 'loginOUt'>【退出】</span>
    <span v-show="loginStatus" class="fr">{{userEmail.email}}</span>
    <router-link tag="span" to="register" class="fr" v-show="!loginStatus">注册</router-link>
    <router-link tag="span" to="login" class="fr" v-show="!loginStatus">登录</router-link>
    <router-link tag="span" to="/">首页</router-link>
    <router-link tag="span" to="menu">菜单</router-link>
    <router-link tag="span" to="admin">管理</router-link>
  </div>
</template>
<script>
export default {
  computed:{
    loginStatus(){
      return this.$store.getters.isLogin
    },
    userEmail(){
      return this.$store.getters.userInfo
    }
  },
  methods:{
    loginOUt(){
      this.$store.dispatch("isLoginAction", false);
      this.$store.dispatch("tokenAction", '');
      this.$store.dispatch("userInfoAction", {});
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('isLogin');
      window.localStorage.removeItem('userInfo');
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
span {
  margin: 0 10px;
  cursor: pointer;
}
</style>