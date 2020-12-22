export default {
    formDate(){
            //获得当前运行环境时间
            var d = new Date(), currentDate = new Date(), tmpHours = currentDate.getHours();
            //算得时区
            var time_zone = -d.getTimezoneOffset() / 60;
            //少于0的是西区 西区应该用时区绝对值加京八区 重新设置时间（西区时间比东区时间早 所以加时区间隔）
            if (time_zone < 0) {
                time_zone = Math.abs(time_zone) + 8; currentDate.setHours(tmpHours + time_zone);
            } else {
                //大于0的是东区  东区时间直接跟京八区相减
                time_zone -= 8; currentDate.setHours(tmpHours - time_zone);
            }
            var myDate2 =currentDate; 
            var monthT,DataT;
            // 年、月、日用字符串“-”拼接
            if(myDate2.getMonth()<9){
                monthT="0"+(myDate2.getMonth()+1);
            }else{
                monthT=(myDate2.getMonth()+1);
            }
            // console.log(myDate2.getDate())
            if(myDate2.getDate()<10){
                DataT="0"+(myDate2.getDate());
            }else{
                DataT=myDate2.getDate();
            }
            var thisDate2 = myDate2.getFullYear()+"-"+monthT+"-"+DataT;
            return thisDate2;
    }
}
