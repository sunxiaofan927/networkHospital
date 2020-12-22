<template>
    <div class="wrapper" >
        <div class="flex">
            <div class="left flexBox_" :collapse="collapse">
                <div class="headerF" v-if="collapse==false">管理系统</div>
                <div class="headerF" :class="{'collapse_':collapse}" v-if="collapse==true">
                    <i class="el-icon-s-unfold"></i>                    
                </div>
                <v-sidebar :class="{'sidebar_':!collapse}" ></v-sidebar>
            </div>
             <div class="right">
                <div class="topBox">
                    <v-head></v-head>
                </div>
                <div class="content-box" :class="{'content-collapse':collapse}" >
                    <div class="content">
                        <transition name="slide-left" mode="out-in">
                            <keep-alive :include="tagsList">
                                <router-view></router-view>
                            </keep-alive>
                        </transition>
                    </div>  
                </div>
               <div class="boxBottom">
                   Copyright © 银川怡成互联网医院有限公司 <a style= "color:#2c3e50" target="_blank" href="http://beian.miit.gov.cn">宁ICP备20001199号</a> 
                </div>
             </div>
            
        </div>
        
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                transitionName:'',
                json:{},
            }
        },
        components:{
            vHead, vSidebar
        },
        mounted () {
        },
        methods: {
            
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
         watch:{
            $route(to,from){
                // if(to.meta > from.meta){
                //     this.transitionName = "slide-left"
                // }else{
                //     this.transitionName = "slide-right"
                // }
            }
        }
    }
</script>
<style scoped>
.sidebar_{
    margin-right: -17px;/*no*/
}
.wrapper {
    font-size: 14px!important;/*no*/
}
/deep/ .el-tabs__item{
    font-size: 14px!important;/*no*/
}
/deep/ .el-table{
    font-size: 14px!important;/*no*/
}
/deep/ .el-button--small{
    font-size: 14px!important;/*no*/
}
   
    .flex{
        display: flex;
    }
    .boxBottom{
        position: absolute;
        bottom: 0px;
        left: 0px;
        z-index: 99;
        padding: 20px;
        width: 100%;
        background: #fff;
    }
    .right{
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        padding: 100px 0px 60px;
        background:rgb(238,245,255);
    }
    .topBox{
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 100;
        width: 100%;
    }
    .wrapper,.flex{
        height: 100%;
    }
    .headerF{
        height: 100px;
        width: 220px;
        display: flex;
        justify-content: center;
        align-items: center;
       /* background: linear-gradient(225deg,rgba(89,83,162,1) 0%,rgba(56,51,86,1) 100%); */
       border: none;
       box-sizing: border-box;
        font-size:24px;
        /* font-family:PingFangSC-Semibold,PingFang SC; */
        font-weight:600;
        color:rgba(255,255,255,1);
        position: fixed;
        left: 0px;
        white-space: nowrap;
        top: 0px;
        z-index: 1;
        background: rgb(0,30,61);
    }
    .flexBox_{
        position: relative;
    }
        /* width: 250px; */
    .left{
        overflow: hidden;
        margin-right: -25px;
        overflow-y: scroll;
        /* background: url('../assets/img/bg.png')0 0 no-repeat; */
        background: rgb(0,31,59);
    }
    .content{
            width: 100%;
    }
    .content-box{
        width: 100%;
        height: 100%;
        overflow: auto;
    display: flex;justify-content: center;
        box-sizing: border-box;
    }
.sidebar-el-menu:not(.el-menu--collapse){
    width: 250px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 400ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(0, 0, -100%);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(0, 0, 100%);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(0, 0, 100%);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(0, 0, -100%);
}
/deep/ .el-input__inner{
    height: 50px;
}
/deep/.el-date-editor .el-range-separator{
  line-height: 50px;
}
/deep/ .el-range-separator {
    display: flex;
    align-items: center;
}
   /deep/ .el-button{
      font-size: 16px!important;
    }
     .collapse_{
        width: auto!important;
        padding: 20px!important;
    }
</style>
