<template>
  <div>
    邮&nbsp;&nbsp;&nbsp;&nbsp;箱：
    <input v-model="email" type="text" name="email">
    <br>
    <br>密&nbsp;&nbsp;&nbsp;&nbsp;码：
    <input v-model="password" type="password" name="password">
    <br>
    <br>
    <button @click.prevent="onSubmit">登录</button>
    <div v-if="status">
      <div v-for="(item, index) in errs" :key="index">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      status: 0,
      errs: {}
    };
  },
  methods: {
    onSubmit() {
      let reqDate = {
        email: this.email,
        password: this.password
      };
      this.axios
        .post("/login", reqDate)
        .then(res => {
          if (res.data.status === 400) {
            this.errs = res.data.errs;
            this.status = 1;
          }
          if (res.data.success) {
            this.$store.commit("isLoginMutation", true);
            this.$store.dispatch("tokenAction", res.data.token);
            this.$store.dispatch("userInfoAction", res.data);
            let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/');
            this.$router.push(redirectUrl);
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
</style>