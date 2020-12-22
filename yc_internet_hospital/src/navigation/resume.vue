<template>
  <div class="app">
      <div class="Index_app-box">
        <!-- <div class="Index_flex flexWarp">
          <div>
              <el-button type="success" round @click="deleteRow('capture')">打印</el-button>
          </div>
        </div> -->
        <div class="table" id="capture">
            <div class="colsDivBox">
                <div class="colsDiv">
                    <div class="cols margin padding">姓名</div>
                    <div class="cols margin padding">{{form.nickname}}</div>
                    <div class="cols margin padding">性别</div>
                    <div class="cols margin padding">{{form.gender=='1'?'男':form.gender=='2'?'女':form.gender=='0'?"未知性别":'未说明性别'}}</div>
                    <div class="cols margin padding">出生年月</div>
                    <div class="cols margin padding wid_">{{form.doctor_bir}}</div>
                </div>
                <div class="colsDiv">
                  <div class="cols margin padding">身份证</div>
                  <div class="colsRight margin padding wid_">{{form.idcard}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">《医生资格证书》编码</div>
                    <div class="cols margin padding">{{form.cert_no}}</div>
                    <!-- <div class="cols margin padding"></div>
                    <div class="cols margin padding"></div> -->
                    <div class="cols margin padding">取得时间</div>
                    <div class="cols margin padding wid_">{{form.cert_rec_date}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">《医师职业证书》编码</div>
                    <div class="cols margin padding">{{form.prac_no}}</div>
                    <!-- <div class="cols margin padding"></div>
                    <div class="cols margin padding"></div> -->
                    <div class="cols margin padding">注册时间</div>
                    <div class="cols margin padding wid_">{{form.prac_rec_date}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">职业类别</div>
                    <div class="cols margin padding">{{form.prac_type}}</div>
                    <!-- <div class="cols margin padding"></div>
                    <div class="cols margin padding"></div> -->
                    <div class="cols margin padding">执业范围</div>
                    <div class="cols margin padding wid_">{{form.prac_scope}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">职业职称</div>
                    <div class="cols margin padding">{{titleName}}</div>
                    <!-- <div class="cols margin padding"></div>
                    <div class="cols margin padding"></div> -->
                    <div class="cols margin padding">取得时间</div>
                    <div class="cols margin padding wid_">{{form.mount}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">第一执业医疗机构全称</div>
                    <div class="colsRight margin padding wid_">{{form.hospital}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">申请多点执业医疗机构全称</div>
                    <div class="colsRight margin padding wid_">{{form.doc_multi_sited}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">医师多点执业起始时间</div>
                    <div class="colsRight margin padding wid_">{{form.doc_multi_sited_date_start}}</div>
                </div>
                <div class="colsDiv">
                    <div class="cols margin padding">第一执业医疗机构意见</div>
                    <div class="colsRight margin padding wid_">
                      本机构承诺所有信息， 材料均按互联网医院诊疗科目范围和互联网医院医师多点执业备案要求提交且真实有效。 如因隐瞒真实情况或者提交虚假材料导致该欣慰被撤销，相关责任由本机构 承担。本机构承诺取得备案后， 自觉遵守法律，法规及各项管理要求，依法开展互联网医疗服务活动
                    </div>
                </div>
            </div>
            <div class="photo_">
              <img class="img_" :src="form.icon" alt="" srcset="">
              <img  class="img_2" src="@/assets/img/cp.png" alt="" srcset="">
            </div>
        </div>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import bus from '../components/bus';
  import html2canvas from 'html2canvas';
  export default {
    props:['dataIframe'],
    data() {
      return {
        lazy:true,
        form:{
        },
        arr:[],
        title:'',
        titleName:'',
      }
    },
    created(){
      this.titleInfo();
    },
    watch:{
      dataIframe(val){
        this.form = val;
        this.title = val.title;
      },title(val){
         this.title_(val,this.arr)
      }
    },
    methods: {
      title_(val,arr){
        let that = this;
        for(var i = 0 ;i<arr.length; i++){
                if(val == arr[i].id){
                  that.titleName = arr[i].title_name;
                }
        }
      },
      titleInfo(){//职称
        let type = this.$store.state.login.user_type;
        let titleInfo = this.$store.state.titleInfo ;
        if(type == '9'){
          type = '3'
        }
        let data = {
          type:type
        };
        if(!titleInfo){
            this.$api.titleInfo(data)
                  .then(res => {
                    this.arr = res.data;
                  })
        }else{
          this.arr = titleInfo;
        }
      },
       dataURLToBlob(dataurl) {//ie 图片转格式
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
         while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type: mime})
        },
        downloadResult(name) {
            let that = this;
            let canvasID = document.querySelector("#capture")
            let a = document.createElement('a');
            html2canvas(canvasID,{async: true,useCORS: true}).then(canvas => {
              let dom = document.body.appendChild(canvas);
              dom.style.display = "none";
              a.style.display = "none";
              document.body.removeChild(dom);
              let blob = this.dataURLToBlob(dom.toDataURL("image/jpg"));
              that.getBase64(blob).then(res => {
                  
                  this.$parent.submit(res);
                });
              //图片下载
              // a.setAttribute("href", URL.createObjectURL(blob));
              // a.setAttribute("download", name + ".jpg")
              // document.body.appendChild(a);
              // a.click();
              // URL.revokeObjectURL(blob);
              // document.body.removeChild(a);
            });
          },
          deleteRow() {
            this.downloadResult('capture')
          },
          getBase64(file) {//base64 格式装换
                return new Promise(function(resolve, reject) {
                  let reader = new FileReader();
                  let imgResult = "";
                  reader.readAsDataURL(file);
                  reader.onload = function() {
                    imgResult = reader.result;
                  };
                  reader.onerror = function(error) {
                    reject(error);
                  };
                  reader.onloadend = function() {
                    resolve(imgResult);
                  };
              });
          },
        },
        
  }
</script>

<style scoped type='text/css'>
.img{
  width: 100%;
}
.app{
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  /* background: #fff; */
  margin-bottom: -100px;
}
.Index_flex{
  display: flex;
    padding: 40px;
  box-sizing: border-box;
}
.Index_flex_{
  margin-right: 40px;
  margin-bottom: 10px;
}
.Index_app-box{
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
  border-radius:8px;
}
.bg{
  background: #D3D5FF;
}
.table{
  margin: 10px;
  display: flex;
  border: 1px solid #999;
  border-radius: 15px;
  overflow: hidden;
  padding: 10px;
  font-size: 18px;
}
.colsDiv{
  display: flex;
  width: 100%;
}
.cols{
  width: calc( 100% / 6 );
  border: 1px solid #999;
}
.padding{
    padding: 10px;
  box-sizing: border-box;
  border-bottom:none ;
}
.photo_{
  width: 20%;
  border: 1px solid #999;
  display: flex;
  position: relative;
}
.colsRight{
  width: calc( (100% / 6)*5);
  border: 1px solid #999;
  border-bottom:none ;
}
.margin{
  margin: -1px;
}
.colsDivBox{
  width: 80%;
  border-bottom: 1px solid #999;
}
.wid_{
  width: auto!important;
  flex: 1;
}
.img_{
  width: 80%;
  max-height: 200px;
  /* height: auto; */
  margin:10px auto auto;
}
.img_2{
  width: 80%;
  max-height: 200px;
  /* height: auto; */
  margin:10px auto auto;
  position: absolute;
  bottom: 10px;
}
 
</style>