<template>
    <div @click="back" class="backCon">
        <i class="el-icon-s-promotion"></i>
    </div>
</template>
<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        table:''
      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style  scoped type='text/css'>
@-webkit-keyframes bounce-down {
 25% {-webkit-transform: translateY(-10px);background:rgba(224, 105, 105, 0.9);}
 50%, 100% {-webkit-transform: translateY(0);background:rgba(35, 20, 165, 0.7)}
 75% {-webkit-transform: translateY(10px);background:rgba(6, 187, 15, 0.5);}
}

@keyframes bounce-down {
 25% {transform: translateY(-10px);}
 50%, 100% {transform: translateY(0);}
 75% {transform: translateY(10px);}
}

.animate-bounce-down{ background:rgba(73, 11, 11, 0.5);-webkit-animation: bounce-down 1.5s linear infinite;animation: bounce-down 1.5s linear infinite;
}

@-webkit-keyframes bounce-up {
 25% {-webkit-transform: translateY(10px);}
 50%, 100% {-webkit-transform: translateY(0)}
 75% {-webkit-transform: translateY(-10px)}
}

@keyframes bounce-up {
 25% {transform: translateY(10px);background:rgba(8, 50, 150, 0.5);}
 50%, 100% {transform: translateY(0);background:rgba(83, 2, 2, 0.9);}
 75% {transform: translateY(-10px);background:rgba(163, 13, 58, 0.9);}
}

.animate-bounce-up{ background:rgba(236, 232, 232,0.5);-webkit-animation: bounce-up 1.4s linear infinite;animation: bounce-up 1.4s linear infinite;}
.hide{
  display:none;
}
.show{
  display: block;
}
.backCon{
  position: absolute;
    bottom: 200px;
    right: 80px;
    width: 50px;
    height: 50px;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
}
</style>