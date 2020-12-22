import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    signToken:"",
    json:{},
    login:{},
    type:'0',//0 为修改 1 为添加
    ID:{},
    Check:'',
    cookie_:'',
    token:'',
    firstDepartment:[],//部门
    titleInfo:[],//职称
    clDocInfo:'',//
    mInfoList:[],//所属药店
    phoneBase64:"",  //手机端签名Base64
  },
  mutations:{
    token(state,edoit){
      state.token= edoit||sessionStorage.getItem(Base64.encode("token"));
    },
    signToken(state,edoit) {
      state.signToken= edoit||sessionStorage.getItem(Base64.encode("signToken"));
    },
    updateCheck(state,edoit){
      state.Check= edoit||Base64.decode(JSON.parse(sessionStorage.getItem(Base64.encode("Check"))));
    },
    firstDepartment(state,edoit){
      state.firstDepartment= edoit||Base64.decode(JSON.parse(sessionStorage.getItem(Base64.encode("firstDepartment"))));
    },
    titleInfo(state,edoit){
      state.titleInfo= edoit||Base64.decode(JSON.parse(sessionStorage.getItem(Base64.encode("titleInfo"))));
    },
    mInfoList(state,edoit){
      state.mInfoList= edoit||Base64.decode(JSON.parse(sessionStorage.getItem(Base64.encode("mInfoList"))));
    },
    clDocInfo(state,edoit){
      state.clDocInfo= edoit||Base64.decode(JSON.parse(sessionStorage.getItem(Base64.encode("clDocInfo"))));
    },
    updateLogin(state,edoit){
      state.login= edoit||Base64.decode(JSON.parse(sessionStorage.getItem(Base64.encode("login"))));
    },
    updateEdoit(state,edoit){
      state.json= edoit||JSON.parse(Base64.decode(sessionStorage.getItem(Base64.encode("json"))));
    },
    type(state,edoit){
      state.type= edoit||JSON.parse(Base64.decode(sessionStorage.getItem(Base64.encode("type"))));
    },
    updateId(state,edoit){
      state.ID= edoit||JSON.parse(Base64.decode(sessionStorage.getItem(Base64.encode("ID"))));
    },
    cookie_(state,edoit){
      state.cookie_= edoit||JSON.parse(Base64.decode(sessionStorage.getItem(Base64.encode("cookie_"))));
    },
    signPhoneImang(state,edoit){
      state.phoneBase64= edoit;
    },
  },actions:{
    signPhoneImang({ commit }, data){
      sessionStorage.setItem("signPhoneImang",data);
      return new Promise((resolve, reject) => {
        commit("signPhoneImang",data);
      })
    },
    token({ commit }, data) {
      sessionStorage.setItem(Base64.encode("token"),data);
      return new Promise((resolve, reject) => {
        commit("token",data);
      })
    },
    signToken({ commit }, data) {
      sessionStorage.setItem(Base64.encode("signToken"),data);
      return new Promise((resolve, reject) => {
        commit("signToken",data);
      })
    },
    updateCheck({ commit }, data) {
      sessionStorage.setItem(Base64.encode("Check"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("updateCheck",data);
      })
    },
    firstDepartment({ commit }, data) {//部门
      sessionStorage.setItem(Base64.encode("firstDepartment"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("firstDepartment",data);
      })
    },
    titleInfo({ commit }, data) {//职称
      sessionStorage.setItem(Base64.encode("titleInfo"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("titleInfo",data);
      })
    },
    mInfoList({ commit }, data) {//所属药店
      sessionStorage.setItem(Base64.encode("mInfoList"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("mInfoList",data);
      })
    },
    clDocInfo({ commit }, data) {//c常用语
      sessionStorage.setItem(Base64.encode("clDocInfo"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("clDocInfo",data);
      })
    },
    update({ commit }, data) {
      sessionStorage.setItem(Base64.encode("json"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("updateEdoit",data);
      })
    },
    type({ commit }, data) {
      sessionStorage.setItem(Base64.encode("type"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("type",data);
      })
    },
    login({ commit }, data) {
      sessionStorage.setItem(Base64.encode("login"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("updateLogin",data);
      })
    },
    ID_({ commit }, data) {
      sessionStorage.setItem(Base64.encode("ID"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("updateId",data);
      })
    },
    cookie_({ commit }, data) {
      sessionStorage.setItem(Base64.encode("cookie_"),Base64.encode(JSON.stringify(data)));
      return new Promise((resolve, reject) => {
        commit("cookie_",data);
      })
    },
  }
})

//vuex 状态管理