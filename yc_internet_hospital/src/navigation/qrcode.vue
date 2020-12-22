<template>
  <div class="container">
    <p ref="qrCodeUrl" class="qrCode"></p>
    <p class="qrCode">请扫描二维码上传签章</p>
    <p class="qrCode">
      或访问此链接进行签章:https://www.ycyun120.com/#/signLogin
    </p>
    <p class="warning">请确保医师已经添加成功!!!</p>
    <p class="warning">
      请将此链接或二维码保存发给药师,此链接仅用于药师签章!!!
    </p>
    <!-- <p class="warning">拿出手机，打开微信扫一扫</p> -->
    <el-button type="danger" @click="addPhar">返回</el-button>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
// import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
export default {
  data() {
    return {
      closeTk: true,
    };
  },
  methods: {
    creatQrCode() {
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: "https://www.ycyun120.com/#/signLogin",
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    addPhar() {
      this.closeTk = false;
      this.$emit("closeDialog", this.closeTk);
    },
  },
  mounted() {
    this.creatQrCode();
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  .warning {
    color: #ed1941;
  }
}
</style>