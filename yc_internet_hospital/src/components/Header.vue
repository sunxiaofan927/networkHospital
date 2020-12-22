<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">{{title||title2}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="@/assets/img/user.png"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" id="userSlot">
                        <a @click="_blank('user')" class="flex2" v-if="type">
                            <img src="@/assets/img/userdetails.png">
                            <el-dropdown-item>用户资料</el-dropdown-item>
                        </a>
                        <!-- <a @click="_blank('password')" class="flex2" v-if="type">
                            <img src="@/assets/img/paseword.png">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                        </a> -->
                        <a @click="_blank('password')" class="flex2" >
                            <img src="@/assets/img/paseword.png">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                        </a>
                         <a @click="_blank('out')" class="flex2 " :class="{'flex2top':type}">
                            <img src="@/assets/img/out.png">
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </a>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: '管理员',
                message: 2,
                title:'',
                title2:'',
                data:'',
                type:false,
            }
        },
        created () {
            if(this.$store.state.ID.userid=='3'){
                this.type = true ;
            }
        },
        computed:{
            username(){
                let username = this.data.nickname;
                return username ? username : this.name;
            }
        },
        methods:{
            _blank(val){
                switch(val){
                case 'user':
                    this.$router.push('/details')
                break;
                case "out":
                    let data = {
                        user_account: this.$store.state.login.admin_account
                    }
                    this.$api.quitLogin(data).then(res =>{
                        this.$message.success(res.msg)
                    })
                    sessionStorage.clear();
                        this.$router.push('/login');
                break;
                default:
                case "password":
                    this.$router.push('/details')
                break;
                }
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            this.title2 = this.$router.currentRoute.meta.title;
        },
        watch:{
            $route(to,from){
                this.title=this.$router.currentRoute.meta.title;
            }
        },
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        font-size: 22px;
        color: #fff;
        /* background: #fff; */
            background: rgb(0,30,61);
/* background:linear-gradient(225deg,rgba(89,83,162,1) 0%,rgba(56,51,86,1) 100%); */
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 100px;
    }
    .header .logo{
        float: left;
        /* width:250px; */
        line-height: 100px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height:100px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        /* color: #000; */
    }
    .btn-bell .el-icon-bell{
        color: #000;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
        
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .flex2{
            display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        white-space: nowrap;
    }
    .flex2 img{
        width: 30px;
        margin-right: -10px;
    }
    #userSlot{
        padding: 20px;
        width: auto;
    }
    .flex2top{
        padding-top: 5px;
        border-top: 1px solid #EBEEF5;
    }
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
            background-color: rgba(0,0,0,0);
    }
    .user-name{
        font-size: 20px!important;
    }
</style>
