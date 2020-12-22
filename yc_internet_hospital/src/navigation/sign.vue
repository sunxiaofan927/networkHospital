<template>
  <div class="app">
    <canvas
      id="capture_"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="canvasF"
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
    ></canvas>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      color: "red",
      linewidth: 3,
      isDraw: false, //签名标记
    };
  },
  mounted() {
    
    let canvas = this.$refs.canvasF;
    canvas.height = this.$refs.canvasF.offsetHeight + 10;
    canvas.width = this.$refs.canvasF.offsetWidth;
    this.canvasTxt = canvas.getContext("2d");
    this.canvasTxt.strokeStyle = this.color;
    this.canvasTxt.lineWidth = this.linewidth;
  },
  methods: {
    //电脑设备事件
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();

      let obj = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath(); //开始作画
      this.points.push(obj); //记录点
      this.isDown = true;
    },
    //移动设备事件
    touchStart(ev) {
      console.log(document.body);
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        this.isDraw = true; //签名标记
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasF.offsetHeight * 0.1),
        }; //y的计算值中：document.body.offsetHeight*0.5代表的是除了整个画板signatureBox剩余的高，this.$refs.canvasF.offsetHeight*0.1是画板中标题的高
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath(); //开始作画
        this.points.push(obj); //记录点
      }
    },
    mounted() {
      let canvas = this.$refs.canvasF;
      canvas.height = this.$refs.canvasF.offsetHeight - 100;
      canvas.width = this.$refs.canvasF.offsetWidth - 10;
      this.canvasTxt = canvas.getContext("2d");
      this.canvasTxt.strokeStyle = this.color;
      this.canvasTxt.lineWidth = this.linewidth;
    }, //电脑设备事件
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点
      }
    }, //移动设备事件
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasF.offsetHeight * 0.1),
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY); //移动画笔
        this.canvasTxt.lineTo(obj.x, obj.y); //创建线条
        this.canvasTxt.stroke(); //画线
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj); //记录点
      }
    }, //电脑设备事件
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    }, //移动设备事件
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasF.offsetHeight * 0.1),
        };
        this.canvasTxt.closePath(); //收笔
        this.points.push(obj); //记录点
        this.points.push({ x: -1, y: -1 }); //记录点
      }
    }, //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.isDraw = false; //签名标记
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
        // console.log(blob)
        that.getBase64(blob).then((res) => {
          // this.srcPrint = res;
          this.touMing(res, this.urlBase64);
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
    urlBase64(res) {
      // console.log(this.$parent.$parent,this.$parent)
      this.$parent.$parent.callBackUrl("data:image/bmp;base64," + res);
      console.log("data:image/bmp;base64," + res)
    },

    touMing(dataImg, callback) {
      let self = this;
      var base64Img = document.createElement("base64Img"),
        canvas = this.$refs.canvasF,
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
          }
        },
        false
      );
    },
  },
};
</script>

<style>
canvas {
  width: 100%;
  height: 100%;
}
</style>