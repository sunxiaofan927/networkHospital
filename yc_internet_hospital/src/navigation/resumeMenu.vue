<template>
  <div class="app" id="capture">
    <div>
      <div class="Index_app-box">
        <h3>
          <img
            class="img_2"
            :src="
              'data:image/png;base64,' + json.prescriptionManageBean.h_esign
            "
            alt=""
            srcset=""
          />
        </h3>
        <!-- <div class="code">
           医疗机构编码：WEBH007
         </div> -->
      </div>
      <div class="preTop">
        <div class="conBoxTopRight">
          <img id="barcode" />
        </div>
      </div>
      <div class="title">怡成互联网医院 处方笺</div>
      <div class="price">
        <div class="div_">
          <div>费别：</div>
          <div>处方编号：{{ json.prescriptionManageBean.p_number || "" }}</div>
          <div>医疗证/医保卡号：</div>
        </div>
      </div>
      <div class="appDiv">
        <div>姓名：{{ json.prescriptionManageBean.user_nickname || "" }}</div>
        <div>
          性别：{{
            json.prescriptionManageBean.user_gender == "1"
              ? "男"
              : json.prescriptionManageBean.user_gender == "2"
              ? "女"
              : json.prescriptionManageBean.user_gender == "9"
              ? "未说明性别"
              : "未知"
          }}
        </div>
        <div>年龄：{{ json.prescriptionManageBean.user_age || "--" }}岁</div>
        <div>门诊/住院病历号：</div>
        <div>
          科室(病区/床位号)：{{ json.prescriptionManageBean.department || "" }}
        </div>
        <div>电话：</div>
        <div>
          开具日期：{{
            json.prescriptionManageBean.p_uptime
              ? json.prescriptionManageBean.p_uptime.substring(0, 19)
              : ""
          }}
        </div>
        <div class="flexBoxF_ flexBoxF_Add">
          <div class="div_Title">
            临床诊断：{{ json.prescriptionManageBean.p_result }}
          </div>
        </div>
      </div>
      <div>
        <!-- rp -->
        <div class="flexBoxS">
          <div class="fontSize">Rp</div>
          <div class="content">
            <ul
              class="ul"
              v-for="(item, index) in json.drugsManageBean"
              :key="index"
            >
              <!-- <li class="circle">{{index+1}}</li> -->
              <li>{{ index + 1 }}、{{ item.drugs_name }}{{ item.drugs_jx }}</li>
              <li>
                {{ item.drugs_specifications }}*{{ item.drugs_numbers
                }}{{ json.prescriptionManageBean.drugs_p_unit }}
              </li>
              <div class="line"></div>
              <li style="width: 100%">
                用法用量：{{
                  item.mode_channel == "1"
                    ? "口服"
                    : item.mode_channel == "2"
                    ? "含服"
                    : item.mode_channel == "3"
                    ? "嚼服"
                    : item.mode_channel == "4"
                    ? "外服"
                    : "其他"
                }}
                {{ item.mode_consumption }} ,{{ item.mode_frequency }}
              </li>
              <div class="line"></div>
            </ul>
          </div>
          <div class="blockAdd">
            <!-- <img  class="img_2" :src="'data:image/png;base64,'+json.prescriptionManageBean.h_esign" alt="" srcset=""> -->
            （以下空白）
          </div>
        </div>
        <!-- 临床诊断 -->
        <!-- <div class="flexBoxF">
            <div class="fontSize_0">补充说明：</div>
            <div class="indent">
              
            </div>
        </div> -->
      </div>
      <div class="foot fontDiv">
        <div class="flex_1">
          <div class="popenpal">药品金额：</div>
          <div class="popenpal">
            核对发药药师：
            <img
              class="penpal"
              src="@/assets/img/2.png"
              alt=""
              srcset=""
              v-if="show"
            />
          </div>
          <div class="popenpal">审核/调配签名：</div>
        </div>
        <div>
          <div class="popenpal">
            医师：
            <!-- <img
              class="penpal2"
              :src="
                'data:image/png;base64,' + json.prescriptionManageBean.d_esign
              "
              alt=""
              srcset=""
            /> -->
            <div class="widMax">
              <img
                class="penpal"
                :src="
                  'data:image/png;base64,' +
                  json.prescriptionManageBean.sh_doc_esign
                "
                alt=""
              />
            </div>
          </div>
          <div class="popenpal" v-show="isImage">
            审核药师：
            <!-- <img
              class="penpal3"
              :src="
                'data:image/png;base64,' + json.prescriptionManageBean.p_esign
              "
              alt=""
              srcset=""
            /> -->
            <div class="widMax">
              <img
                class="penpal"
                :src="
                  'data:image/png;base64,' +
                  json.prescriptionManageBean.sh_p_esign
                "
                alt=""
              />
            </div>
          </div>
          <div class="popenpal" v-show="R_Image">
            复核药师：
            <!-- <img
              class="penpal3"
              :src="
                'data:image/png;base64,' +
                json.prescriptionManageBean.r_esign_sealData
              "
              alt=""
              srcset=""
            /> -->
            <div class="widMax">
              <img
                class="penpal"
                :src="
                  'data:image/png;base64,' +
                  json.prescriptionManageBean.r_esign_sxsealData
                "
                alt=""
                srcset=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="foot nowarp">
        <div class="pading_">(处方金额以实际收费为准)</div>
        <div>1.请遵循医嘱服用; 2.请拿到药品时点清药品; 3.仅于3日内有效.</div>
      </div>
    </div>
    <img id="pringObj" :src="srcPrint" alt="" srcset="" class="optice" />
  </div>
</template>
<script type='text/ecmascript-6'>
import JsBarcode from "jsbarcode";
import bus from "../components/bus";
import html2canvas from "html2canvas";
export default {
  props: ["dataIframe"],
  data() {
    return {
      R_Image: false,
      isImage: false,
      show: false,
      srcPrint: "",
      lazy: true,
      form: {},
      arr: [],
      title: "",
      titleName: "",
      json: {
        codechufan: "",
        drugsManageBean: [],
        prescriptionManageBean: {},
      },
    };
  },
  created() {},
  mounted() {},
  watch: {
    dataIframe(val) {
      this.srcPrint = "";
      this.json = val;
      if (val.status_ == "2") {
        if (this.$store.state.login.user_type == "4") {
          this.show = true;
        }
      }
      if (val.prescriptionManageBean.p_state == 1) {
            this.R_Image = true;
            this.isImage = true;
          } else if (val.prescriptionManageBean.p_state == 5) {
            this.R_Image = false;
            this.isImage = true;
          } else {
            this.R_Image = false;
            this.isImage = false;
          }
      setTimeout(() => {
        this.chufan(val.prescriptionManageBean.p_number);
        this.deleteRow();
      }, 100);
    },
  },
  methods: {
    chufan(code) {
      JsBarcode("#barcode", code, {
        format: "CODE128", //选择要使用的条形码类型
        text: code,
        displayValue: true, //是否在条形码下方显示文字
        textPosition: "bottom", //设置文本的垂直位置
      });
    },
    title_(val, arr) {
      let that = this;
      for (var i = 0; i < arr.length; i++) {
        if (val == arr[i].id) {
          that.titleName = arr[i].title_name;
        }
      }
    },
    titleInfo() {
      //职称
      let type = this.$store.state.login.user_type;
      let titleInfo = this.$store.state.titleInfo;
      if (type == "9") {
        type = "3";
      }
      let data = {
        type: type,
      };
      if (!titleInfo) {
        this.$api.titleInfo(data).then((res) => {
          this.arr = res.data;
        });
      } else {
        this.arr = titleInfo;
      }
    },
    dataURLToBlob(dataurl) {
      //ie 图片转格式
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    downloadResult(name) {
      let that = this;
      let canvasID = document.querySelector("#capture");
      let a = document.createElement("a");
      html2canvas(canvasID, { async: true, useCORS: true }).then((canvas) => {
        let dom = document.body.appendChild(canvas);
        dom.style.display = "none";
        a.style.display = "none";
        document.body.removeChild(dom);
        let blob = this.dataURLToBlob(dom.toDataURL("image/jpg"));
        // console.log(blob)
        that.getBase64(blob).then((res) => {
          this.srcPrint = res;
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
      this.downloadResult("capture");
    },
    getBase64(file) {
      //base64 格式装换
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
  },
};
</script>

<style scoped type='text/css' @media = "print">
.title {
  font-size: 25px;
  font-weight: 600;
  text-align: center;
}
@page {
  size: 2;
  margin: 10mm;
}

.img {
  width: 100%;
}
.app {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: -100px;
  position: relative;
  font-size: 14px;
}
.appDiv {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0px;
  /* padding-bottom: 0px; */
  border-top: 1px solid #000;
  border-right: none;
  border-left: none;
  padding-bottom: 0px;
  align-items: center;
}
.appDiv div {
  padding: 10px;
  box-sizing: border-box;
  min-width: 200px;
}
h3 {
  text-align: center;
  position: relative;
}
#barcode {
  width: 100%;
  height: 60px;
}
.preTop {
  display: flex;
  position: relative;
  justify-content: flex-end;
  /* width: 40%; */
  width: 200px;
  /* top: -60px; */
  left: 0px;
}
.pad {
  padding: 10px 20px;
  border: 1px solid rgb(224, 224, 224);
  box-sizing: border-box;
  text-align: center;
  position: relative;
  z-index: 99;
  color: rgb(224, 224, 224);
  width: 60%;
  margin: 0 auto;
  background: #fff;
}
.conBoxTopRight {
  width: 300px;
  height: 100%;
  /* display: flex; */
  /* justify-content: center; */
}
.code {
  padding: 20px 0px;
}
.img_2 {
  width: 100px;
  position: absolute;
  top: 40px;
  left: 55%;
  margin-left: -75px;
  z-index: 101;
}
.flexBox {
  display: flex;
}
.flexBoxF {
  width: 300px;
  word-wrap: break-word;
  word-break: break-all;
  padding: 20px 10px;
  box-sizing: border-box;
}
.flexBoxS {
  flex: 1;
  word-wrap: break-word;
  word-break: break-all;
  margin-left: -1px;
  padding: 20px 10px;
  min-height: 400px;
  box-sizing: border-box;
  position: relative;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}

.content {
  min-height: 100px;
}
.bottom {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  padding: 20px 10px;
  box-sizing: border-box;
  align-items: flex-end;
  justify-content: space-between;
}
.widMax{
  display: flex;
  align-items: center;
  /* background: #000; */
}
.penpal {
  width: 130px;
  /* min-height: 80px; */
  /* height: 120px; */
  
}
.penpal2,
.penpal3 {
  width: 80px;
}
.popenpal {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
}
.fontSize {
  font-size: 30px;
  text-indent: 10px;
  font-weight: 700;
  position: relative;
}
.fontSize_0 {
  font-size: 25px;
  font-weight: 700;
}
.foot {
  display: flex;
  padding: 10px 0px;
}
.foot div {
  padding: 0px 10px;
}
.fontDiv {
  display: flex;
  border-top: 1px solid #000;
  /* flex-wrap: wrap; */
  overflow: hidden;
}
.fontDiv div {
  padding: 10px;
  min-width: 200px;
  box-sizing: border-box;
}
.nowarp {
  flex-direction: column;
  padding-top: 0px;
}
.ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  width: 90%;
  margin: auto;
}
ul li {
  list-style: none;
  width: 30%;
  padding: 15px 10px;
}
.line {
  width: 100%;
  height: 0px;
  border-bottom: 1px dashed #cecece;
}
.circle {
  padding: 0px;
  /* margin-left: -20px; */
  border: 3px solid red;
  border-radius: 50%;
  width: 20px;
  text-align: center;
  font-weight: 600;
}
.ul {
  position: relative;
}
.circle {
  position: absolute;
  left: 20px;
}
#capture {
  padding: 20px 0px;
}
.optice {
  position: absolute;
  left: 0;
  top: 0px;
  z-index: -99;
  width: 100%;
}

.div_ {
  display: flex;
  flex-wrap: wrap;
}
.div_ div {
  display: flex;
  min-width: 33%;
  padding: 10px;
  box-sizing: border-box;
}
.price {
  padding: 10px 0px;
}
.indent {
  text-indent: 40px;
}
.por {
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 15px;
}
.flex_ {
  width: 100%;
}
.flexBoxF_ {
  padding: 10px;
  padding-top: 0px;
}
.appDivAdd {
  border-top: none;
  padding-top: 0px;
}
.blockAdd {
  display: flex;
  height: 300px;
  justify-content: center;
  position: relative;
  display: flex;
  align-items: center;
}
.circlePu {
  position: absolute;
  right: 0px;
  border-radius: 50%;
  border: 4px solid #000;
  width: 50px;
  height: 50px;
  line-height: 45px;
  top: -20px;
  box-sizing: border-box;
}
.div_Title {
  padding: 10px 0px;
}
.flexBoxF_Add {
  display: flex;
  align-items: center;
}
.pading_ {
  padding: 10px !important;
}
.flex_1 {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
}
</style>