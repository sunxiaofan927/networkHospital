import api from './axios';
// import { Base64 } from 'js-base64'
import md5 from 'js-md5';
import store from '../store/index.js'
import router from '@/router'
import formData from '../../static/js/formDate.js';
let formData_ = formData.formDate()
let pares = function (data) {
    let parame = '';
    for (let key in data) {
        parame += "&" + key + "=" + data[key]
    }
    return parame.substr(1);
}
// let code = Base64.decode(sessionStorage.getItem(Base64.encode('go')));
// const level = code;

let md5_ = md5(md5("yc1805_jz_gluce") + formData_)//加密规则
export default {
    MobileSend(data) {
        //获取验证码(签章登录)
        return api.post("/PatientController/MobileSend.do", data);
    },
    signLoginH5(data) {
        //获取验证码(签章登录)
        data.yc_key = md5_;
        return api.post("/dataController/loginByAccountAndPwdToH5.do", data);
    },
    updateDocSignByid(data) {
        //更改医师，药师手签base64
        data.yc_key = md5_;
        return api.post("/dataController/updateDocSignByid.do", data);
    },
    updateSignByid(data) {
        //更改医师，药师手签base64
        data.yc_key = md5_;
        return api.post("/dataController/updateSignByid.do", data);
    },
    upLoad(data) {
        //权限页面
        return api.post("/PatientController/file_upload1.do?type=1", data);
    },
    login(data) {
        //登录
        return api.post("/PatientController/LoginByPhone.do?", data);
    },
    HomePage(data) {
        //首页接口文档
        // //data.deanid = level;
        console.log(data)
        data.yc_key = md5_;
        return api.post("/YcManage/homePageManage.do?", data);
    },
    twoDepartment(data) {
        //二级科室列表
        ////data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/twoDepartment.do?", data);
    },
    firstDepartment(data) {
        //一级科室列表
        ////data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/firstDepartment.do?", data);
    },
    userManage(data) {
        //用户管理
        ////data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userManage.do?", data);
    },
    doctorManage(data) {
        //医生管理
        ////data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/doctorManage.do?", data);
    },
    userPrescriptionInfo(data) {
        //查看处方信息 （未调）
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userPrescriptionInfo.do?", data);
    },
    clDocInfo(data) {
        //常用语查询
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/clDocInfo.do?", data);
    },
    clDocup(data) {
        //常用语设置 
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/clDocup.do?", data);
    },
    userDescribeInfo(data) {
        //查看患者病情描述 （未调）
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userDescribeInfo.do?", data);
    },
    orderManage(data) {
        //订单管理数据
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/orderManage.do?", data);
    },
    orderManage(data) {
        //订单管理数据
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/orderManage.do?", data);
    },
    orderCrManage(data) {
        //查询订单聊天对话(订单管理中的)
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/orderCrManage.do?", data);
    },
    doctorManageIns(data) {
        //添加医师账号
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/doctorManageIns.do?", data);
    },
    doctorManageIns2(data) {
        //添加医师账号
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/doctorManageIns2.do?", data);
    },
    doctorManageup(data) {
        //修改医师账号
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/doctorManageup.do?", data);
    },
    mInfo(data) {
        //药店的详细信息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/mInfo.do?", data);
    },
    mManage(data) {
        //药店管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/mManage.do?", data);
    },
    tmdocManage(data) {
        //医生审核
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/tmdocManage.do?", data);
    },
    getaddress(data) {
        //二级联动
        data.yc_key = md5_;
        return api.post("/PatientController/getaddress.do?", data);
    },
    mManageup(data) {
        //修改药店信息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/mManageup.do?", data);
    },
    mManageins(data) {
        //添加药店信息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/mManageins.do?", data);
    },
    mInfoList(data) {
        //药店列表
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/mInfoList.do?", data);
    },
    pManage(data) {
        //药师管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/pManage.do?", data);
    },
    pManageup(data) {
        //修改药师账号(提交审核操作)
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/pManageup.do?", data);
    },
    pManageins(data) {
        //（添加）添加药师账号
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/pManageins.do?", data);
    },
    pStatusManageup(data) {
        //修改药师账号(驳回)
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/pStatusManageup.do?", data);
    },
    tmpmtManage(data) {
        //药师审核
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/tmpmtManage.do?", data);
    },
    docEvaluate(data) {
        //查看评价管理信息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/docEvaluate.do?", data);
    },
    titleInfo(data) {
        //职称信息  权限列表
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/titleInfo.do?", data);
    },
    pnStatisticsManage(data) {
        //#（查询）处方统计信息（处方审核、处方管理）
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/pnStatisticsManage.do?", data);
    },
    // pnStatisticsManage(data){
    //     //#（查询）处方统计信息（处方审核、处方管理）
    //     data.deanid = level ;
    //     data.yc_key = md5_ ;
    //     return api.post("/YcManage/getAllPrescriptionByPid.do?",data);
    // },
    // tmpcnManage(data){
    //     //处方审核 处方目录
    //     data.deanid = level ;
    //     data.yc_key = md5_ ;
    //     return api.post("/YcManage/tmpcnManage.do?",data);
    // },
    userPrescriptionInfo(data) {
        //处方审核 处方目录
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userPrescriptionInfo.do?", data);
    },
    agreementXxInfo(data) {
        //协议详情
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/agreementXxInfo.do?", data);
    },
    agreementInfo(data) {
        //协议管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/agreementInfo.do?", data);
    },
    agreementup(data) {
        //协议修改或添加
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/agreementup.do?", data);
    },
    drugsModeManageup(data) {
        //修改给药方式
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/drugsModeManageup.do?", data);
    },
    drugsModeManage(data) {
        //给药管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/drugsModeManage.do?", data);
    },
    drugsManage(data) {
        //药品管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/drugsManage.do?", data);
    },
    drugsModeManageins(data) {
        //添加给药方式
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/drugsModeManageins.do?", data);
    },
    versionInfo(data) {
        //版本更新管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/versionInfo.do?", data);
    },
    msgInfo(data) {
        //信息发布管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/msgInfo.do?", data);
    },
    selectAllBanner(data) {
        //banner管理(未调完)
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/selectAllBanner.do?", data);
    },
    sdManage(data) {
        //二级科室管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/sdManage.do?", data);
    },
    fdManage(data) {
        //一级科室管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/fdManage.do?", data);
    },
    orderPaymentManage(data) {
        //订单结算
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/orderPaymentManage.do?", data);
    },
    titleManageInfo(data) {
        //订单结算
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/titleManageInfo.do?", data);
    },
    userManageIns(data) {
        //添加患者账号
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userManageIns.do?", data);
    },
    teamManage(data) {
        //团队管理
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/teamManage.do?", data);
    },
    insertBanner(data) {
        //添加banner
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/insertBanner.do?", data);
    },
    updateBanner(data) {
        //修改banner
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/updateBanner.do?", data);
    },
    pswdup(data) {
        //修改密码
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/pswdup.do?", data);
    },
    deanInfoup(data) {
        //修改账号设置
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/deanInfoup.do?", data);
    },
    deanInfo(data) {
        //修改账号设置查询
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/deanInfo.do?", data);
    },
    versionInfoup(data) {
        //修改版本信息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/versionInfoup.do?", data);
    },
    versionInfoins(data) {
        //添加版本信息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/versionInfoins.do?", data);
    },
    msgInfoins(data) {
        //发布消息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/msgInfoins.do?", data);
    },
    msgXxInfo(data) {
        //发布消息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/msgXxInfo.do?", data);
    },
    msginfoup(data) {
        //修改发布消息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/msginfoup.do?", data);
    },
    userPrescriptionInfo(data) {
        //处方信息（审核、管理页面共用）
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userPrescriptionInfo.do?", data);
    },
    tmpcnManage(data) {
        //处方审核 （详情）
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/dataController/getAllPrescriptionByPid.do?", data);
    },
    dTmpcnManage(data) {
        //处方审核 （详情） 新处方管理的接口
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/tmpcnManage.do?", data);
    },
    pullPrip(data) {
        //药师获取处方
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/dataController/takePrescriptionByPidOrRid.do?", data);
    },
    prescriptionStateup(data) {
        //修改）修改处方核对状态
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/prescriptionStateup.do?", data);
    },
    fdManageins(data) {
        //添加一级科室
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/fdManageins.do?", data);
    },
    fdManageup(data) {
        //添加一级科室
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/fdManageup.do?", data);
    },
    sdManageins(data) {
        //添加二级科室
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/sdManageins.do?", data);
    },
    sdManageup(data) {
        //修改二级科室
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/sdManageup.do?", data);
    },
    orderPaymentup(data) {
        //（修改）修改订单结算状态
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/orderPaymentup.do?", data);
    },
    docInfo(data) {
        //（查询）查看医师详细信息
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/docInfo.do?", data);
    },
    docStatusManageup(data) {
        //（修改）医师审核状态
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/docStatusManageup.do?", data);
    },
    drugsManageins(data) {
        //（修改）医师审核状态
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/drugsManageins.do?", data);
    },
    drugsManageup(data) {
        //（修改）医师审核状态
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/drugsManageup.do?", data);
    },
    docStatusManageup(data) {
        //修改药师审核状态  
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/docStatusManageup.do?", data);
    },
    deleteBanner(data) {
        //删除banner  
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/deleteBanner.do?", data);
    },
    evaluateup(data) {
        //删除banner  
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/evaluateup.do?", data);
    },
    prohibitTeam(data) {
        //删除banner  
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/prohibitTeam.do?", data);
    },
    userEvaluateInfo(data) {
        //查看评价信息 
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userEvaluateInfo.do?", data);
    },
    addPersonalAcct(data) {
        //注册用户到E签宝（后台注册医生或者药师）
        //data.deanid = level;
        data.ycgl_key = md5_;
        return api.post("/esign/addPersonalAcct.do?", data);
    },
    electroniCseal(data) {
        //注册用户到E签宝（医师手机端完成签章,因为拿不到level,所以写两次）
        // data.deanid = level ;
        data.ycgl_key = md5_;
        return api.post("/esign/addPersonalAcct.do?", data);
    },
    // pnStatusManageup(data){
    //     //处方审核  （修改处方状态）
    //     data.deanid = level ;
    //     data.yc_key = md5_ ;
    //     return api.post("/YcManage/pnStatusManageup.do?",data);
    // },
    pnStatusManageup(data) {
        //处方审核  （修改处方状态）
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/dataController/actionPrescriptionByPidOrRid.do?", data);
    },
    pharSign(data) {
        //审核药师签名（后台调用）
        //data.deanid = level;
        data.ycgl_key = md5_;
        return api.post("/esign/pharSign.do?", data);
    },
    RharSign(data) {
        //复核药师签名（后台调用）
        //data.deanid = level;
        data.ycgl_key = md5_;
        return api.post("/esign/reviewPharSign.do?", data);
    },
    userSummaryInfo(data) {
        //查看问诊小结
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userSummaryInfo.do?", data);
    },
    prohibitUser(data) {
        //修改账号封禁状态
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/prohibitUser.do?", data);
    },
    userInfo(data) {
        //患者账号详情
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userInfo.do?", data);
    },
    userManageup(data) {
        //患者账号修改
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/userManageup.do?", data);
    },
    selectBannerById(data) {
        //banner 详情
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/YcManage/selectBannerById.do?", data);
    },
    pInfo(data) {
        //pInfo 药师详情
        // data.deanid = level ;
        data.yc_key = md5_;
        return api.post("/YcManage/pInfo.do?", data);
    },
    addPrint(data) {
        //pInfo 药师详情
        // data.deanid = level ;
        data.yc_key = md5_;
        return api.post("/YcManage/docpointsup.do?", data);
    },
    SendPrescription(data) {
        //药师审核通过发送处方详情
        //data.deanid = level;
        data.yc_key = md5_;
        return api.post("/PrescriptionController/SendPrescription.do?", data);
    },
    queryUserInfo(data) {
        //安全端查询用户信息
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/loginVerify/queryUserInfo", data)
    },
    queryLoginVerifyInfo(data) {
        //安全端查询用户信息
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/loginVerify/queryLoginVerifyInfo", data)
    },
    saveVerifyInfo(data) {
        //安全端登录校验
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/loginVerify/saveVerifyInfo", data)
    },
    queryPwdSlgInfo(data) {
        //安全端密码校验查询
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/passwordStrategy/queryPwdSlgInfo", data)
    },
    saveStrategyInfo(data) {
        //安全端密码校验添加修改
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/passwordStrategy/saveStrategyInfo", data)
    },
    getAllAuditsByAccount(data) {
        //安全端密码校验添加修改
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/passwordStrategy/getAllAuditsByAccount", data)
    },
    getAllAuditsByAccount(data) {
        //安全端密码校验添加修改
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/passwordStrategy/getAllAuditsByAccount", data)
    },
    sendCode(data) {
        data.yc_key = md5_;
        return api.post("/YcLoginManageController/captcha", data)
    }, 
    quitLogin(data) {
        return api.post("/YcLoginManageController/quit", data)
    }
}
//权限空开
