import Vue from 'vue'
import Router from 'vue-router'
import { Base64 } from 'js-base64'
import store from '../store/index.js'

Vue.prototype.$Base64 = Base64;
Vue.use(Router)

// console.log(Vue.$store)


// let json = this.$store.state.login ;
// console.log(json)

// let a = Base64.decode(JSON.parse(sessionStorage.getItem(Base64.encode("login")))) ;

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/physician'
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Home'], resolve),//懒加载
      meta: { title: '首页' },
      children:[
          {
              path: '/physician',
              component: resolve => require(['@/navigation/presentation'], resolve),
              meta: { title: '首页' }
          },
          {
            path: '/doctorCheck',
            component: resolve => require(['@/navigation/doctorCheck'], resolve),
            meta: { title: '医师审核' }
          },
          {
            path: '/doctorDetails',
            component: resolve => require(['@/navigation/doctorDetails'], resolve),
            meta: { title: '审核详情' }
          },
          {
            path: '/pharmaCheck',
            component: resolve => require(['@/navigation/pharmaCheck'], resolve),
            meta: { title: '药师审核' }
          },
          {
            path: '/pharmaDetails',
            component: resolve => require(['@/navigation/pharmaDetails'], resolve),
            meta: { title: '审核详情' }
          },
          {
            path: '/recipe',
            component: resolve => require(['@/navigation/recipe'], resolve),
            meta: { title: '处方审核' }
          },
          {
            path: '/drugstore',
            component: resolve => require(['@/navigation/drugstore'], resolve),
            meta: { title: '药店管理' }
          },{
            path: '/pharmacist',
            component: resolve => require(['@/navigation/pharmacist'], resolve),
            meta: { title: '药师管理' }
          },
          {
            path: '/addPhar',
            component: resolve => require(['@/navigation/addPhar'], resolve),
            meta: { title: '药师编辑' }
          },
          {
            path: '/ChangeDrugStore',
            component: resolve => require(['@/navigation/ChangeDrugStore'], resolve),
            meta: { title: '药店' }
          },
          {
            path: '/firstLeve',
            component: resolve => require(['@/navigation/firstLeve'], resolve),
            meta: { title: '一级科室管理' }
          },
          {
            path: '/secondLevel',
            component: resolve => require(['@/navigation/secondLevel'], resolve),
            meta: { title: '二级科室管理' }
          },
          {
            path: '/doctotTeam',
            component: resolve => require(['@/navigation/doctotTeam'], resolve),
            meta: { title: '医师管理团队' }
          },
          {
              path: '/administrative',
              component: resolve => require(['@/navigation/administrative'], resolve),
              meta: { title: '订单管理' }
          },
          {
            path: '/diabetes',
            component: resolve => require(['@/navigation/administrative'], resolve),
            meta: { title: '糖尿病患者管理' }
          },
          {
            path: '/clicenDetails',
            component: resolve => require(['@/navigation/clicenDetails'], resolve),
            meta: { title: '图文订单' }
          },
          {
            path: '/particulars',
            component: resolve => require(['@/navigation/particulars'], resolve),
            meta: { title: '添加医师' }
          },
          {
            path: '/particularsDetails',
            component: resolve => require(['@/navigation/particularsDetails'], resolve),
            meta: { title: '修改医师' }
          },
          {
            path: '/video',
            component: resolve => require(['@/navigation/video'], resolve),
            meta: { title: '视频订单' }
          },{
            path: '/office',
            component: resolve => require(['@/navigation/office'], resolve),
            meta: { title: '专家会诊' }
          },
          {
              path: '/informatization',
              component: resolve => require(['@/navigation/informatization'], resolve),
              meta: { title: '医师管理' }
          },
        
          {
            path: '/drug',
            component: resolve => require(['@/navigation/drug'], resolve),
            meta: { title: '药品库管理' }
          },
          {
            path: '/newly',
            component: resolve => require(['@/navigation/newly'], resolve),
            meta: { title: '用户' }
          },{
            path: '/changeNewly',
            component: resolve => require(['@/navigation/changeNewly'], resolve),
            meta: { title: '用户' }
          },
          {
            path: '/evaluate',
            component: resolve => require(['@/navigation/evaluate'], resolve),
            meta: { title: '评价' }
          },
          {
            path: '/client',
            component: resolve => require(['@/navigation/client'], resolve),
            meta: { title: '用户管理' }
          },
          {
            path: '/information',
            component: resolve => require(['@/navigation/information'], resolve),
            meta: { title: '信息发布管理' }
          },
          {
            path: '/banner',
            component: resolve => require(['@/navigation/banner'], resolve),
            meta: { title: 'banner管理' }
          },
          {
            path: '/quality',
            component: resolve => require(['@/navigation/quality'], resolve),
            meta: { title: '处方管理'}
          },
          {
              path: '/BasicData',
              component: resolve => require(['@/navigation/BasicData'], resolve),
              meta: { title: '协议管理' }
          },
          {
              path: '/system',
              component: resolve => require(['@/navigation/system'], resolve),
              meta: { title: '版本更新管理' }
          },{
            path: '/statistics',
            component: resolve => require(['@/navigation/statistics'], resolve),
            meta: { title: '权限管理' }
          },
          {
              path: '/details',
              component: resolve => require(['@/navigation/details'], resolve),
              meta: { title: '账号设置' }
          },
          {
            path: '/addBanner',
            component: resolve => require(['@/navigation/addBanner'], resolve),
            meta: { title: 'Banner' }
          },{
            path: '/changeBanner',
            component: resolve => require(['@/navigation/changeBanner'], resolve),
            meta: { title: 'Banner' }
          },
          {
            path: '/publish',
            component: resolve => require(['@/navigation/publish'], resolve),
            meta: { title: '信息发布' }
          },{
            path: '/changePublish',
            component: resolve => require(['@/navigation/changePublish'], resolve),
            meta: { title: '信息发布' }
          },
          {
            path: '/clicenDetails',
            component: resolve => require(['@/navigation/clicenDetails.vue'], resolve),
            meta: { title: '患者详情' }
          },{
            path: '/changeBasicData',
            component: resolve => require(['@/navigation/changeBasicData.vue'], resolve),
            meta: { title: '编辑协议' }
          },{
            path: '/addBasicData',
            component: resolve => require(['@/navigation/addBasicData.vue'], resolve),
            meta: { title: '添加协议' }
          },
          {
            path: '/rate',
            component: resolve => require(['@/navigation/rate.vue'], resolve),
            meta: { title: '评级管理' }
          },
          {
            path: '/404',
            component: resolve => require(['@/components/404.vue'], resolve),
            meta: { title: '404' }
          },{
            path: '/resume',
            component: resolve => require(['@/navigation/resume.vue'], resolve),
            meta: { title: '简介' }
          }, 
          {
            path: '/Rpharmacist',
            component: resolve => require(['@/navigation/Rpharmacist.vue'], resolve),
            meta: { title: '复核药师' }
          },
          {
            path: '/qrcode',
            component: resolve => require(['@/navigation/qrcode.vue'], resolve),
            // meta: { title: '复核药师' }
          }, //signPhone 
          {
            path: '/safeUser',
            component: resolve => require(['@/navigation/admin/safety/user.vue'], resolve),
            // meta: { title: '复核药师' }
          },
          {
            path: '/loginCheck',
            component: resolve => require(['@/navigation/admin/safety/loginCheck'], resolve),
          },
          {
            path: '/pverification',
            component: resolve => require(['@/navigation/admin/safety/pverification'], resolve),
          },
          {
            path: '/audit',
            component: resolve => require(['@/navigation/admin/Audit/index'], resolve),
          }
      ]
    },
    {
      path: '/signLogin',
      component: resolve => require(['@/navigation/signLogin.vue'], resolve),
      // meta: { title: '签章登录' }
    },
    {
      path: '/signPhone',
      component: resolve => require(['@/navigation/signPhone.vue'], resolve),
      // meta: { title: '复核药师' }
    },
    {
        path: '/login',
        component: resolve => require(['@/navigation/Login.vue'], resolve),
        meta: { title: '登录' }
    },
    {
        path: '*',
        redirect: '/404',
        meta: { title: '404' }
    }
  ]
})

