let state = {
    isLogin: false,
    userInfo:{},
    token: ''
}

let getters = {
    isLogin:state=>state.isLogin,
    userInfo:state=>state.userInfo
}

let mutations = {
    isLoginMutation(state,status){
        state.isLogin = status;
        window.localStorage.setItem('isLogin', status);
    },
    tokenMutation(state,value){
        state.token = value;
        window.localStorage.setItem('token', value);
    },
    userInfoMutation(state,user){
        state.userInfo = user;
        window.localStorage.setItem('userInfo', JSON.stringify(user));
    }
}

let actions = {
    isLoginAction({commit},status){
        commit("isLoginMutation",status)
    },
    tokenAction({commit},value){
        commit('tokenMutation',value)
    },
    userInfoAction({commit},user){
        commit('userInfoMutation',user)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}