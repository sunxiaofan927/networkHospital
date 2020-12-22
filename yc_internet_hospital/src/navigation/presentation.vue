<template>
  <div class="app">
      <div class="Box">
          <ul class="flex warp">
              <li class="flex_ first1 cursor" @click="loading('/administrative')">
                  <span class="title_">总问诊数</span>
                  <span class="title_Nume">
                      {{data.homePageNumBean.allnum||"--"}}
                      
                  </span>
              </li>
              <li class="flex_ first2 cursor" @click="loading('/administrative')">
                  <span class="title_">视频问诊</span>
                  <span  class="title_Nume">{{data.homePageNumBean.spnum||"--"}}
                      
                  </span>
              </li>
              <li class="flex_ first3 cursor" @click="loading('/administrative')">
                  <span class="title_">图文问诊</span>
                  <span  class="title_Nume">{{data.homePageNumBean.twnum||"--"}}
                      
                  </span>
              </li>
              <li class="flex_ first4 cursor" @click="loading('/administrative')">
                  <span class="title_">专家会诊</span>
                  <span  class="title_Nume">{{data.homePageNumBean.zjnum||"--"}}
                      
                  </span>
              </li>
              <li class="flex_ first5 cursor" @click="loading('/administrative')">
                  <span class="title_">今日问诊</span>
                  <span  class="title_Nume">{{data.homePageNumBean.jrnum||"--"}}
                      
                  </span>
              </li>
              <li class="flex_ first6 cursor" @click="loading('/informatization')">
                  <span class="title_">总医师数量</span>
                  <span  class="title_Nume">{{data.homePageNumBean.alldocnum||"--"}}
                      
                  </span>
              </li>
              <li class="flex_ first7 cursor" @click="loading('/informatization')">
                  <span class="title_">今日新增</span>
                  <span  class="title_Nume">{{data.homePageNumBean.jrxznum||"--"}}
                      
                  </span>
              </li>
          </ul>
          <div class="flex_2 flex">
            <div>
                <span class="title">日期</span>
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="btn_">
                <el-button type="primary" round @click="search">查询</el-button>
            </div>
          </div>
          <LineCanvas :msg='data.homePageWzTjtBean'/>
          <div class="draw_Box">
              <div class="div_">
                <Circler :msg='data.provinceNumBean'></Circler>
              </div>
              <div class="div_">
                <Plot :msg='data.genderNumBean'></Plot>
              </div>
              <div class="div_">
                <Pie :msg='data.homePageNumBean'></Pie>
              </div>
          </div>
      </div>
  </div>
</template>

<script>  
  import LineCanvas from "@/components/Line.vue"
  import Plot from "@/components/plot.vue"
  import Pie from "@/components/Pie.vue"
  import Circler from "@/components/Circle.vue"

  export default {
    data () {
      return {
        time:'',
        data:{
           homePageWzTjtBean:{},
           genderNumBean:{},
           provinceNumBean:{},
           homePageNumBean:{}
       },
       startime:"",
       stoptime:"",
      }
    },
    created(){
        this.getData();
        this.axios();
    },
    computed: {
    },
    beforeMount() {},

    mounted() {
    },
    components:{
        LineCanvas,Plot,Pie,Circler
    },
    methods: {
        search(){
            this.startime =  this.time[0];
            this.stoptime =  this.time[1];
            this.axios();
        },
        loading(val){
            this.$router.push(val);
        },
        axios(){
            let data = {
                startime:this.startime,
                stoptime:this.stoptime,
            };
            this.$api.HomePage(data)
                .then(res => {
                    this.data = res.data;
                })
                .catch((response) => {
                    this.$toast(response);
                });
        },
        getData(){
            let d = new Date();
            let year = d.getFullYear(); //获取完整的年份(4位)
            let mounth = d.getMonth()+1; //获取当前月份(0-11,0代表1月)
            let date = d.getDate(); 
            if(String(mounth).length<2){
                mounth = "0" + mounth ;
            }
            if(String(date).length<2){
                date = "0" + date ;
            }
            // 将日期设置为下月一号
            d.setMonth(d.getMonth()+1);
            d.setDate('1');
            // 获取本月最后一天
            d.setDate(d.getDate()-1);
            this.startime = year +'-'+mounth+'-'+"01";
            this.stoptime = year +'-'+mounth+'-'+date;
        },
    },

    watch: {
        data(val){
            this.data = val;
        }
    }

  }

</script>
<style scoped type='text/css'>
.div_{
    width: 33%;
}
.draw_Box{
    display: flex;
    justify-content: space-around;
}
.Box{
    border-radius: 5px;
    margin: 20px;
    box-sizing: border-box;
    background: #fff;
    padding: 20px;
}
.Box ul{
    list-style: none;
    padding: 0px;
}
.Box ul li{
    flex: 1;
    box-shadow: 0px 0px 3px 0px #999;
    text-align: center;
    /* border:1px solid rgba(0,0,0,.3); */
    border-radius: 5px;
    margin: 10px;
    padding: 20px;
    text-align: left;
}
.cursor{
     cursor: pointer;
     display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height:70px;/*no*/
}
.first1{
    background: #8792f2;
    color: #fff;
}
.first2{
    background: #bd8def;
    color: #fff;
}
.first3{
    background: #ffa896;
    color: #fff;
}
.first4{
    background: #2fa1f5;
    color: #fff;
}
.first5{
    background: rgb(252,180,66);
    color: #fff;
}
.first6{
    background: rgb(29,191,75);
    color: #fff;
}
.first7{
    background: rgb(249,35,66);
    color: #fff;
}
.title{
    padding: 20px;

}
.warp{
    flex-wrap: wrap;
}
span{
    white-space: nowrap;
}
.flex{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.flex_ span{
    display: block;
    padding: 5px;
}
.flex_ span:nth-child(1){
    font-weight: 600;
    font-size: 16px;
}
.flex_2{
    display: flex;
}
.radius{
    border-radius: 5px;
}
.flex_2 {
    justify-content: flex-start;
}
.btn_{
    padding: 0 10px;
}
.title_{
    display: block;
    font-size: 16px!important;/*no*/
}
.title_Nume{
    display: block;
    font-size: 30px!important;/*no*/
}

</style>