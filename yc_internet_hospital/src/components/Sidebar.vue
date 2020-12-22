<template>
    <div class="sidebar sidebarScroll">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" 
            text-color="#fff" active-text-color="#e04f56" router-link-active="#e04f56" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" >
                        <template slot="title" style="color:#fff;">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else-if="item.key=='1'">
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" ></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    import "@/assets/css/sidebar.css";
    export default {
        data() {
            return {
                collapse: false,
                items:'',
                json:{},
            }
        },
        watch:{
            items(val){
                this.items = val;
            },
        },
        computed:{
            onRoutes:{
                get(){
                    let path =  this.$route.path;
                    if(path=="/newly"){
                        return "client"
                    }else if(path=="/clicenDetails"||path=="/video"||path=="/office"){
                        return 'administrative'
                    }else if(path=="/evaluate"||path=="/particulars"){
                        return 'informatization'
                    }else if(path=="/ChangeDrugStore"){
                        return 'drugstore'
                    }else if(path=="/addPhar"){
                        return 'pharmacist'
                    }else if(path=="/doctorDetails"){
                        return 'doctorCheck'
                    }else if(path=="/pharmaDetails"){
                        return 'pharmaCheck'
                    }else if(path=="/changeBanner"){
                        return 'banner'
                    }else if(path=="/addBanner"){
                        return 'banner'
                    }else if(path=="/publish"){
                        return 'information'
                    }else if(path=="/changePublish"){
                        return 'information'
                    }else if(path=="/changeNewly"){
                        return 'client'
                    }else if(path=="/addBasicData"){
                        return 'BasicData'
                    }else if(path=="/changeBasicData"){
                        return 'BasicData'
                    }else if(path=="/particularsDetails"){
                        return 'informatization'
                    }else if(path=="/rate"){
                        return 'informatization'
                    }else if(path=="/safeUser"){
                        return 'safeUser'
                    }else if(path=="/loginCheck"){
                        return 'loginCheck'
                    }else if(path=="/pverification"){
                        return 'pverification'
                    }else if(path=="/audit"){ 
                        return 'audit'
                    }else{
                        return this.$route.path.replace('/','');
                    }
                },
                set(newP,old){
                    if(newP=="/clicenDetails"||newP=="/video"||newP=="/office"){
                        this.onRoutes="/administrative";
                    }else if(newP=="/newly"){
                        this.onRoutes="/client";
                    }else if(newP=="/evaluate"||newP=="/particulars"){
                        this.onRoutes="/informatization";
                    }else if(newP=="/ChangeDrugStore"){
                        this.onRoutes="/drugstore";
                    }else if(newP=="/addPhar"){
                        return 'pharmacist'
                    }else if(newP=="/doctorDetails"){
                        return 'doctorCheck'
                    }else if(newP=="/pharmaDetails"){
                        return 'pharmaCheck'
                    }else if(newP=="/addBanner"){
                        return 'banner'
                    }else if(newP=="/changeBanner"){
                        return 'banner'
                    }else if(newP=="/changePublish"){
                        return 'information'
                    }else if(newP=="/publish"){
                        return 'information'
                    }else if(newP=="/changeNewly"){
                        return 'client'
                    }else if(newP=="/addBasicData"){
                        return 'BasicData'
                    }else if(newP=="/changeBasicData"){
                        return 'BasicData'
                    }else if(newP=="/particularsDetails"){
                        return 'informatization'
                    }else if(newP=="/rate"){
                        return 'informatization'
                    }else if(newP=="/safeUser"){
                        return 'safeUser' 
                    }else if(newP=="/loginCheck"){
                        return 'loginCheck'
                    }else if(newP=="/pverification"){
                        return 'pverification'
                    }else if(newP=="/audit"){
                        return 'audit'
                    }
                }
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            let key = this.$store.state.login.user_type,keyVal;
            if(key=='9'){
                keyVal = '1';
            }
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.json = this.$store.state.login ;
            this.items = [{
                        icon: 'el-icon-s-home',
                        index: 'physician',
                        title: '首页',
                        key:this.json.title_menu1
                    },
                    {
                        icon: 'el-icon-document-checked',
                        index: 'doctorCheck',
                        title: '医师审核',
                        key:this.json.title_menu2 
                    },
                    {
                        icon: 'el-icon-postcard',
                        index: 'pharmaCheck',
                        title: '药师审核',
                        key:this.json.title_menu3 
                    },
                    {
                        icon: 'el-icon-s-order',
                        index: 'recipe',
                        title: '处方审核',
                        key:this.json.title_menu4 
                    },
                    {
                        icon: 'el-icon-s-shop',
                        index: 'drugstore',
                        title: '药店管理',
                        key:this.json.title_menu5 
                    },
                    {
                        icon: 'el-icon-user-solid',
                        index: 'pharmacist',
                        title: '药师管理',
                        key:this.json.title_menu18
                    },
                    {
                        icon: 'el-icon-s-platform',
                        index: 'drug',
                        title: '药品库管理',
                        key:this.json.title_menu10
                    },
                    {
                        icon: 'el-icon-s-help',
                        index: 'administrative',
                        title: '订单管理',
                        key:this.json.title_menu11 
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'firstLeve',
                        title: '一级科室管理',
                        key:this.json.title_menu6 
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'secondLevel',
                        title: '二级科室管理',
                        key:this.json.title_menu17 
                    },
                    {
                        icon: 'el-icon-circle-plus-outline',
                        index: 'doctotTeam',
                        title: '医师团队管理',
                        key:this.json.title_menu7
                    },
                    {
                        icon: 'el-icon-s-data',
                        index: 'informatization',
                        title: '医师管理',
                        key:this.json.title_menu8
                    },
                    {
                        icon: 'el-icon-copy-document',
                        index: 'quality',
                        title: '处方管理',
                        key:this.json.title_menu9 
                    },
                    {
                        icon: 'el-icon-aim',
                        index: 'BasicData',
                        title: '协议管理',
                        key:this.json.title_menu12 
                    },
                    {
                        icon:"el-icon-s-custom",
                        index: 'client',
                        title: '患者管理',
                        key:this.json.title_menu13
                    },
                    {
                        icon:"el-icon-notebook-1",
                        index: 'information',
                        title: '信息发布管理',
                        key:this.json.title_menu14 
                    },
                    {   icon:"el-icon-picture-outline",
                        index: 'banner',
                        title: 'banner管理',
                        key:this.json.title_menu15 
                    },
                    // {
                    //     icon: 'el-icon-place',
                    //     index: 'adminUser',
                    //     title: '用户管理',
                    //     key: 1 
                    // },
                    {
                        icon: 'el-icon-place',
                        index: 'system',
                        title: '版本更新管理',
                        key:this.json.title_menu16 
                    },
                    // {
                    //     icon: 'el-icon-collection',
                    //     index: 'statistics',
                    //     title: '权限分配管理',
                    //     key:'1'
                    // },
                    {
                        icon: 'el-icon-s-custom',
                        index: 'safeUser',
                        title: '用户管理',
                        key:this.json.title_menu19 
                    },
                    {
                        icon: 'el-icon-key',
                        index: 'loginCheck',
                        title: '登录校验',
                        key:this.json.title_menu20 
                    },
                    {
                        icon: 'el-icon-unlock',
                        index: 'pverification',
                        title: '密码校验',
                        key:this.json.title_menu21 
                    },
                    {
                        icon: 'el-icon-s-order',
                        index: 'audit',
                        title: '首页',
                        key:this.json.title_menu22
                    },
                    {
                        icon: 'el-icon-s-tools',
                        index: 'details',
                        title: '账号设置',
                        key:keyVal
                    }
                    ]
        },mounted () {
            bus.$on('path', msg => {
                this.onRoutes = msg;
            })
        }
    }
</script>

<style scoped>
    @import "../assets/css/sidebar";
    .sidebar{
        display: block;
        padding-top: 100px;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
        text-align: left;
    }
    .sidebar > ul >li,.el-menu{
        /* background: rgba(0,0,0,0); */
        border: none;
        color: #fff;
    }
    .el-submenu__title i{
        color: #fff!important;
        font-size: 16px!important;/*no*/
    }
    .el-submenu__icon-arrow .el-icon-arrow-down{
        color: #fff;
    }
    .el-menu-item:hover{
        /* background:#5953A2!important; */
            background:rgb(2,45,90)!important;
    }
   
    .el-submenu__title:hover /deep/{
        /* background:#5953A2!important; */
        background:rgb(2,45,90)!important;
    }
    /deep/ .el-tooltip{
        display: flex;
        justify-content: center;
    }
    .el-menu-item{
        font-size: 13px!important;/*no*/
    }
    /deep/ .el-menu-item i {
        font-size: 16px!important;/*no*/
        color:#fff;
    }
    .el-menu--collapse>.el-menu-item [class^=el-icon-], .el-menu--collapse>.el-submenu>.el-submenu__title [class^=el-icon-]{
        margin-left: -7px!important;
    }
    .el-menu-item.is-active i{
        color:#e04f56 ;
    }
    .el-menu-item.is-active{
        color:#e04f56 ;
        background: #fff;
    }
    .sidebarScroll{
        overflow: hidden;
    }
    
</style>
