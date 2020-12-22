<template>
    <div>
        <div>
            <span class="span">性别占比堆叠图</span>
        </div>
        <div :id="id" ref="container" class="container"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
import {Chart} from '@antv/g2';
import DataSet from '@antv/data-set';
const { DataView } = DataSet;
  export default {
    props:["msg"],
    data () {
      return {
          id:"id1",
          chart: {},
          data_T:[{ action: '男', pv: '1' },{ action: '女', pv: '2' },{ action: '未知性别', pv: '0' },{ action: '未说明性别', pv: '3' }],
          cont:'',
          num:1,
          dv:new DataView(),
      }
    },
    beforeCreate(){
        
    },
    created(){
    },
     watch: {
        msg(val){
            // console.log(val,"nsex")
            let arry = [{ action: '男', pv: '1' },{ action: '女', pv: '2' },{ action: '未知性别', pv: '0' },{ action: '未说明性别', pv: '3' }]
            if(val.nannum =='0'){
                arry[0].pv = 0;
            }else{
                arry[0].pv = Number(val.nannum);
            }
            if(val.nvnum =='0'){
                arry[1].pv = 0;
            }else{
                arry[1].pv = Number(val.nvnum) ;
            }
           if(val.wznum =='0'){
                arry[2].pv = 0;
            }else{
                arry[2].pv = Number(val.wznum) ;
            }
             if(val.wsmnum =='0'){
                arry[3].pv = 0;
            }else{
                arry[3].pv = Number(val.wsmnum) ;
            }
            arry[1].action="女";
            arry[0].action="男";
            arry[2].action="未知性别";
            arry[3].action="未说明性别";
            this.data_T = arry;
        },
        data_T(val){
            this.data_T = val;
            let num = this.num,dv= this.dv;
            num++;
            this.num = num;
            if(num>2){
                dv.dataSet = [
                    { action: '男', pv: 0 },
                    { action: '女', pv: 0},
                    { action: '未知性别', pv: 0},
                    { action: '未说明性别', pv: 0},
                ]
            }
            this.init(val) ;
        },
    },
    mounted () {
        
    },
    methods: {
        init(val){
            let nvnum = val[1].pv;
            let nannum = val[0].pv;
            let wznum = val[2].pv;
            let wsmnum = val[3].pv;
            const dv = this.dv;
            dv.source([
                { action: '男', pv: nannum },
                { action: '女', pv: nvnum },
                { action: '未知性别', pv: wznum },
                { action: '未说明性别', pv: wsmnum },
            ]);
            if(this.num<3){
                dv.transform({
                type: 'map',
                callback(row) {
                    row.percent = row.pv / (nvnum + nannum + wznum + wsmnum);
                    return row;
                },
                });
                const data = dv.rows;
                const chart = new Chart({
                    container: this.id,
                    autoFit: true,
                    height: 380,
                    padding: [20, 60, 95],
                });
                chart.data(data);
                chart.axis(false);
                chart.tooltip({
                showTitle: false,
                showMarkers: false,
                itemTpl:
                    '<li style="margin-bottom:4px;list-style-type:none;padding: 0;">' +
                    '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
                    '{name}<br/>' +
                    '<span style="padding-left: 16px;line-height: 16px;">人数：{pv}</span><br/>' +
                    '<span style="padding-left: 16px;line-height: 16px;">占比：{percent}</span><br/>' +
                    '</li>',
                });
                chart
                .coordinate('rect')
                .transpose()
                .scale(1, -1);
                chart
                .interval()
                .adjust('symmetric')
                .position('action*percent')
                .shape('funnel')
                .color('action', ['#0050B3', '#1890FF'])
                .label(
                    'action*pv',
                    (action, pv) => {
                        
                    return {
                        content: `${action} ${pv}`,
                    };
                    },
                    {
                    offset: 35,
                    labelLine: {
                        style: {
                        lineWidth: 1,
                        stroke: 'rgba(0, 0, 0, 0.15)',
                        },
                    },
                    }
                )
                .tooltip('action*pv*percent', (action, pv, percent) => {
                    // var percent_ = percent.toFixed(0);
                    var percent_ = (percent * 100).toFixed(0);
                    return {
                    name: action,
                    percent: + percent_ + '%',
                    pv,
                    };
                })
                .animate({
                    appear: {
                        animation: 'fade-in'
                    },
                    update: {
                        annotation: 'fade-in'
                    }
                });

                chart.interaction('element-active');

                chart.on('beforepaint', () => {
                chart.annotation().clear(true);
                const chartData = chart.getData();
                // 中间标签文本
                chartData.forEach((obj) => {
                     var percent_ = (obj.percent * 100).toFixed(0)
                    // console.log(obj,"123")
                    chart.annotation().text({
                    top: true,
                    position: {
                        action: obj.action,
                        percent: 'median',
                    },
                    content: + percent_ + '%', // 显示的文本内容
                    style: {
                        stroke: null,
                        fill: '#fff',
                        textAlign: 'center',
                    },
                    });
                });
                });

                this.chart = chart ;
                
                this.chart.render();
            }
        }
    }
  }
</script>

<style  scoped type='text/css'>
  .container,.container_ div{
    width: 100%;
    padding-top: 10px;
}
.span{
    display: block;
    font-size: 25px;
    text-align: center;
}
.container{
    max-height: 560px;
}
</style>