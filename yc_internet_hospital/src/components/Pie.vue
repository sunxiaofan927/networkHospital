<template>
    <div>
        <div :id="id" :option="option" ref="contain"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
import HighCharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(HighCharts)
  export default {
    props: ["msg"],
    data () {
      return {
          id: "3",
          option:{},
          data_T:{},
      }
    },
    beforeCreate(){

    },
    created(){
    },
     watch: {
        option () {
            HighCharts.chart(this.id,this.option);
        },
        msg(n){
            this.data_T = n;
        },
        data_T(val){
            this.data_T = val;
            this.init(val);
        },
    },
    mounted () {
        // this.init(this.data_T);
        window.addEventListener('resize', () => {
          this.draw();
        })
    },
    methods: {
        draw(){
            HighCharts.chart(this.id,this.option);
        },
        init(val_){
            let spnum = Number(val_.spnum);
            let twnum = Number(val_.twnum);
            let hznum = Number(val_.zjnum);
            this.option =  {
                chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                },
                credits: {
                    enabled:false//去掉右下角链接
                },
                title: {
                        align:'left',
                        text: '视频图文占比'
                },
                tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                        pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                        enabled: false
                                },
                                showInLegend: true
                        }
                },
                series: [{
                        name: '占比',
                        colorByPoint: true,
                        data: [{
                                name: '视频',
                                y: spnum,
                                color:'#bd8def',
                                sliced: true,
                                selected: true
                        }, {
                                name: '图文',
                                color:'#ffa896',
                                y: twnum
                        }, {
                                name: '会诊',
                                color:'#2fa1f5',
                                y: hznum
                        }]
                }]
            }
        }
    }
  }
</script>

<style  scoped type='text/css'>
  #container_,#container_ div{
    width: 100%;
    padding-top: 10px;
    overflow: hidden;
}
</style>