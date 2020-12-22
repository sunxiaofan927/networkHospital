<template>
    <div>
        <div :id="id" :option="option" ref="contain" ></div>    
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
        id: "1",
        option:{},
        masterContainer:{},
        data_:{
        },
      }
    },
    beforeCreate(){

    },
    created(){
        // console.log(this.msg)
    },
     watch: {
        option () {
            HighCharts.chart(this.id,this.option);
        },
        msg(n){
                this.data_ = n;
        },
        data_(val){
            this.data_ = val;
            this.init();
        },
    },
    mounted () {
        window.addEventListener('resize', () => {
          this.draw();
        })
    },
    
    methods: {
        draw(){
            HighCharts.chart(this.id,this.option);
        },
        init(){
             let arry = [],spCountnum = [],twCountnum=[],zjCountnum=[];
             let n = this.data_;
            for(var i = 0 ;i<n.length; i++){
               arry.push(n[i].order_timeDay);
               spCountnum.push(n[i].spCountnum);
               twCountnum.push(n[i].twCountnum);
               zjCountnum.push(n[i].zjCountnum);
            }
            this.option = {
                exporting: {
                    enabled:false//右上角打印
                },
                credits: {
                    enabled:false//去掉右下角链接
                },
                chart: {
                    type: 'spline',
                    color:'#8AA7CE',
                    backgroundColor: 'rgba(0,0,0,0)',
                },
                title: {
                    text: "问诊统计图"
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    categories: arry,
                    title: {
                        text: null,
                    },
                    labels: {
                        style:{
                            color:"#8AA7CE"
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: null,
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify',
                        style:{
                            color:"#8AA7CE"
                        }
                    },
                    gridLineDashStyle: 'longdash',//虚线
                    gridLineColor :"rgba(138,167,209,0.2)",//折线颜色
                },
                tooltip: {
                    // valueSuffix: null,//显示单个数据线
                    // show:false
                    crosshairs: true,//显示整个该部分数据
                    shared: true
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            allowOverlap: true // 允许数据标签重叠
                        }
                    }
                },
                // legend: {
                //     layout: 'vertical',
                //     align: 'right',
                //     verticalAlign: 'top',
                //     x: -40,
                //     y: -100,
                //     floating: true,
                //     borderWidth: 1,
                //     // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                //     shadow: true
                // },
                series: [{
                            name: '视频问诊',
                            color:'#bd8def',
                            marker: {
                                symbol: 'circle'//diamond 菱形 query 方块
                            },
                            data: spCountnum
                        },{
                            name: '咨询问诊',
                            color:'#2fa1f5',
                            marker: {
                                symbol: 'circle'
                            },
                            data:zjCountnum
                        },{
                            name: '图文问诊',
                            color:'#ffa896',
                            marker: {
                                symbol: 'circle'
                            },
                            data:twCountnum
                        }
                ],
                responsive: {
                    rules: [{              // 在图表小于 500px 的情况下关闭图例
                        condition: {         // 响应条件
                        maxWidth: "100%"
                        },
                        chartOptions: {      // 响应内容
                        legend: {
                            enabled: false
                        }
                        }
                    }]
                }
            }
        },
        init2 (){
                return Highcharts.chart(masterContainer, {
                    chart: {
                        reflow: false,
                        borderWidth: 0,
                        backgroundColor: null,
                        marginLeft: 50,
                        marginRight: 20,
                        zoomType: 'x',
                        events: {
                            // listen to the selection event on the master chart to update the
                            // extremes of the detail chart
                            selection: function (event) {
                                var extremesObject = event.xAxis[0],
                                    min = extremesObject.min,
                                    max = extremesObject.max,
                                    detailData = [],
                                    xAxis = this.xAxis[0];
                                Highcharts.each(this.series[0].data, function(d) {
                                    if(d.x > min && d.x < max) {
                                        detailData.push([d.x, d.y]);
                                    }	
                                });
                                // move the plot bands to reflect the new detail span
                                xAxis.removePlotBand('mask-before');
                                xAxis.addPlotBand({
                                    id: 'mask-before',
                                    from: Date.UTC(2006, 0, 1),
                                    to: min,
                                    color: 'rgba(0, 0, 0, 0.2)'
                                });
                                xAxis.removePlotBand('mask-after');
                                xAxis.addPlotBand({
                                    id: 'mask-after',
                                    from: max,
                                    to: Date.UTC(2008, 11, 31),
                                    color: 'rgba(0, 0, 0, 0.2)'
                                });
                                detailChart.series[0].setData(detailData);
                                return false;
                            }
                        }
                    },
                    title: {
                        text: null
                    },
                    xAxis: {
                        type: 'datetime',
                        showLastTickLabel: true,
                        maxZoom: 14 * 24 * 3600000, // fourteen days
                        plotBands: [{
                            id: 'mask-before',
                            from: Date.UTC(2006, 0, 1),
                            to: Date.UTC(2008, 7, 1),
                            color: 'rgba(0, 0, 0, 0.2)'
                        }],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        gridLineWidth: 0,
                        labels: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        min: 0.6,
                        showFirstLabel: false
                    },
                    tooltip: {
                        formatter: function () {
                            return false;
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            fillColor: {
                                linearGradient: [0, 0, 0, 70],
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, 'rgba(255,255,255,0)']
                                ]
                            },
                            lineWidth: 1,
                            marker: {
                                enabled: false
                            },
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: [{
                        type: 'area',
                        name: 'USD to EUR',
                        pointInterval: 24 * 3600 * 1000,
                        pointStart: Date.UTC(2006, 0, 1),
                        data: data
                    }],
                    exporting: {
                        enabled: false
                    }
                }, function (masterChart) {
                    createDetail(masterChart);
                });
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