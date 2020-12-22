<template>
  <div class="layer" ref="layer" @touchmove.prevent>
    <canvas
      class="canvas"
      ref="canvas"
      id="capture_"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    ></canvas>
    <div class="btn-box">
      <el-button type="primary" @click="downloadResult()">去提交</el-button>
      <el-button @click="clear()">清空</el-button>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import formData from "../../static/js/formDate.js";
let formData_ = formData.formDate();
import md5 from "js-md5";
let md5_ = md5(md5("yc1805_jz_gluce") + formData_); //加密规则

export default {
  data() {
    return {
      dialogVisible: true,
      // MediaQueryList 对象，表示指定的媒体查询字符串解析后的结果
      mql: null,
      canvasWidth: null,
      canvasHeight: null,
      canvas: null,
      ctx: null,
      startX: 0,
      startY: 0,
      isSign: false,
      baseImg: "",
      pharmacist_id: "",
      color: "rgb(0,0,0)",
    };
  },
  mounted() {
    // 监听横竖屏切换事件
    this.mql = window.matchMedia("(orientation: portrait)");
    this.mql.addListener(this.handleOrientationChange);
    this.handleOrientationChange();
  },
  beforeDestroy() {
    this.mql.removeListener(this.handleOrientationChange);
  },
  methods: {
    handleOrientationChange() {
      let a = this.$refs.layer;
      a.style.height = "80%";
      if (!this.mql.matches) {
        this.canvas = this.$refs.canvas;
        this.canvas.width = this.$refs.layer.clientWidth - 40;
        this.canvas.height = this.$refs.layer.clientHeight - 20;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = "5";
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      } else {
        this.ctx = "";
        alert("请将手机横屏进行签名");
      }
    },
    touchStart(event) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        event.touches[0].pageX - this.startX,
        event.touches[0].pageY - this.startY
      );
    },
    touchMove(event) {
      this.ctx.lineTo(
        event.touches[0].pageX - this.startX,
        event.touches[0].pageY - this.startY
      );
      this.ctx.stroke();
    },
    touchEnd() {
      this.ctx.closePath();
      this.isSign = true;
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
      let canvasID = document.querySelector("#capture_");
      let a = document.createElement("a");
      html2canvas(canvasID, { async: true, useCORS: true }).then((canvas) => {
        let dom = document.body.appendChild(canvas);
        dom.style.display = "none";
        a.style.display = "none";
        document.body.removeChild(dom);
        let blob = this.dataURLToBlob(dom.toDataURL("image/jpg"));
        that.getBase64(blob).then((res) => {
          this.touMing(res, this.urlBase64);
        });
      });
    },
    urlBase64(res) {
      let image = null;
      this.baseImg = "data:image/bmp;base64," + res;
    },
    addPersonalAcct(data) {
      // let deanid = Base64.decode(sessionStorage.getItem(Base64.encode('go')));
      // data.deanid = deanid;
      this.$api.addPersonalAcct(data).then((res) => {
        if (res.code == 0) {
          self.$router.push({ path: "/signLogin" });
        }
      });
    },
    touMing(dataImg, callback) {
      let self = this;
      var base64Img = document.createElement("base64Img"),
        canvas = this.$refs.canvas,
        context = canvas.getContext("2d");
      // 创建新图片
      var img = new Image();
      img.src = dataImg;
      img.addEventListener(
        "load",
        function () {
          // 绘制图片到canvas上
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          // 将canvas的透明背景设置成白色
          var imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          for (var i = 0; i < imageData.data.length; i += 4) {
            //rgb大于250的透明度y均设置成0
            if (
              imageData.data[i] > 250 &&
              imageData.data[i + 1] > 250 &&
              imageData.data[i + 2] > 250
            ) {
              imageData.data[i + 3] = 0;
            }
          }
          context.putImageData(imageData, 0, 0);
          self.baseImg = canvas.toDataURL("image/png").slice(22); //返回base64
          if (typeof callback !== undefined) {
            if (callback) callback(self.baseImg);
            let signJSON = sessionStorage.getItem("signId");
            let signData = JSON.parse(signJSON);
            let ImgBase64 = self.baseImg.substring(22, self.baseImg.length);
            let data = {
              userid: signData.data.id,
              sign: ImgBase64,
            };
            if (signData.data.user_type == 3) {
              self.$api
                .updateSignByid(data)
                .then((res) => {
                  self.$message.success(res.msg);
                  self.$router.push({ path: "/signLogin" });
                })
                .catch((res) => {
                  self.$message.error(res.msg);
                  self.$router.push({ path: "/signLogin" });
                });
            }
            if (signData.data.user_type == 2) {
              self.$api
                .updateDocSignByid(data)
                .then((res) => {
                  // if (res.code == 0) {
                  // let data = {
                  //   userId: signData.data1.doctor_id, //用户ID
                  //   name: signData.data1.doctor_nickname, //姓名
                  //   idcard: signData.data1.doctor_idcard, //身份证号
                  //   deanid: signData.data1.doctor_deanid,
                  // };
                  // self.$api.electroniCseal(data).then((res) => {
                  //   self.$message.success(res.msg);
                  //   self.$router.push({ path: "/signLogin" });
                  // });
                  self.$message.success(res.msg);
                  self.$router.push({ path: "/signLogin" });
                  // }
                })
                .catch((res) => {
                  self.$message.error(res.msg);
                  self.$router.push({ path: "/signLogin" });
                });
            }
          }
        },
        false
      );
    },
    //清除画布
    clear() {
      this.isSign = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  },
};
</script>

<style scoped>
.layer {
  padding: 20px;
  /* height: 240px; */
}
.btn-box {
  text-align: right;
}
</style>
