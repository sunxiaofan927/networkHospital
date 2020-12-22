<template>
    <div>
        <div :id="id" :option="option" ref="contain"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
import HighCharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more';
const that = this;
highchartsMore(HighCharts)
  export default {
      props: ["msg"],
    data () {
      return {
          id: "2",
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
        // this.init(this.data_T)
        window.addEventListener('resize', () => {
          this.draw();
        })
    },
    
    methods: {
        draw(){
            HighCharts.chart(this.id,this.option);
        },
        init(val){
            this.option =  {
                chart: {
                    // spacing : [40, 0 , 40, 0]
                },
                title: {
                    align:'left',
                    text: "患者分布展示"
                },
                credits: {
                    enabled:false//去掉右下角链接
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: -100,
                    floating: true,
                    borderWidth: 1,
                    // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        point: {
                            events: {
                                mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                                    // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                                    // chart.setTitle({//动态数据的时候注释掉即可
                                    //     text: e.target.name+ '\t'+ e.target.y + ' %'
                                    // });
                                }
                                //, 
                                // click: function(e) { // 同样的可以在点击事件里处理
                                //     chart.setTitle({
                                //         text: e.point.name+ '\t'+ e.point.y + ' %'
                                //     });
                                // }
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    name: '患者分布展示',
                    data: [
                        {name:'安徽总数',  y: Number(val.ahnum)},
                        {name:'澳门总数',  y: Number(val.amnum)},
                        {name:'北京总数',  y: Number(val.bjnum)},
                        {name:'重庆总数',  y: Number(val.cqnum)},
                        {name:'福建总数',  y: Number(val.fjnum)},
                        {name:'广东总数',  y: Number(val.gdnum)},
                        {name:'甘肃总数',  y: Number(val.gsnum)},
                        {name:'广西总数',  y: Number(val.gxnum)},
                        {name:'贵州总数',  y: Number(val.gznum)},
                        {name:'海南总数',  y: Number(val.hainannum)},
                        {name:'河北总数',  y: Number(val.hbnum)},
                        {name:'黑龙江总数',y: Number(val.hljnum)},
                        {name:'河南总数',  y: Number(val.hnnum)},
                        {name:'湖北总数',  y: Number(val.hubeinum)},
                        {name:'湖南总数',  y: Number(val.hunannum)},
                        {name:'吉林总数',  y: Number(val.jlnum)},
                        {name:'江苏总数',  y: Number(val.jsnum)},
                        {name:'江西总数',  y: Number(val.jxnum)},
                        {name:'辽宁总数',  y: Number(val.lnnum)},
                        {name:'内蒙总数',  y: Number(val.nmnum)},
                        {name:'宁夏总数',  y: Number(val.nxnum)},
                        {name:'青海总数',  y: Number(val.qhnum)},
                        {name:'四川总数',  y: Number(val.scnum)},
                        {name:'山东总数',  y: Number(val.sdnum)},
                        {name:'陕西总数',  y: Number(val.shanxinum)},
                        {name:'上海总数',  y: Number(val.shnum)},
                        {name:'山西总数',  y: Number(val.sxnum)},
                        {name:'天津总数',  y: Number(val.tjnum)},
                        {name:'台湾总数',  y: Number(val.twnum)},
                        {name:'香港总数',  y: Number(val.xgnum)},
                        {name:'新疆总数',  y: Number(val.xjnum)},
                        {name:'西藏总数',  y: Number(val.xznum)},
                        {name:'云南总数',  y: Number(val.ynnum)},
                        {name:'浙江总数',  y: Number(val.zjnum)},
                    ]
                }]
            }, function(c) { // 图表初始化完毕后的会掉函数
                // 环形图圆心
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                // 动态设置标题位置
                c.setTitle({
                    y:centerY + titleHeight/2
                });
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