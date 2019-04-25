<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="content"></router-view>
    <router-view name="Register"></router-view>
    <router-view name="Login"></router-view>
  </div>
</template>

<script>
import appHeader from "./view/header";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    //在页面加载时读取localStorage里的状态信息
    // if (localStorage.getItem("store")) {
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       JSON.parse(localStorage.getItem("store"))
    //     )
    //   );
    // }

    // //在页面刷新时将vuex里的信息保存到localStorage里
    // window.addEventListener("beforeunload", () => {
    //   localStorage.setItem("store", JSON.stringify(this.$store.state));
    // });

    if (window.localStorage.getItem("isLogin"))
      this.$store.commit(
        "isLoginMutation",
        window.localStorage.getItem("isLogin")
      );

    if (window.localStorage.getItem("token"))
      this.$store.dispatch(
        "tokenAction",
        window.localStorage.getItem("token")
      );

    if (window.localStorage.getItem("userInfo"))
      this.$store.dispatch(
        "userInfoAction",
        JSON.parse(window.localStorage.getItem("userInfo"))
      );
  },
  components: {
    appHeader
  }
};
</script>

<style>
.fr {
  float: right;
}
.content {
  padding: 50px;
}
</style>
