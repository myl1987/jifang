<template>
  <div class="dashboard-container"  >
 
    <div class="dashboard-text">欢迎使用许昌职业技术学院机房管理系统!</div>
      <div  v-if="checkPermission(['4'])">
        <h3   class='warntext'>{{warnText}}</h3>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import checkPermission from '@/utils/permission'
import Cookies from 'js-cookie'
import CountTo from 'vue-count-to'
export default {
  name: 'Dashboard',
  components: {
    CountTo
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return{
      warnText:'',
    }
  },
  created(){
    this.checkDate();
  },
  methods:{

    checkPermission,

    checkDate(){
      var beginDate=Cookies.get('admin_start')/1000;
      var endDate=Cookies.get('admin_end')/1000;
      var nowDate = Date.parse(new Date())/1000;

      if (nowDate<beginDate||nowDate>endDate) {
        this.warnText="当前时间不在您允许的排课时间内("+this.formatDateTime(beginDate)+'至'+this.formatDateTime(endDate)+")，如需更改时间请联系管理员！";
       
      }else{
        this.warnText='您的排课时间为：'+this.formatDateTime(beginDate)+'至'+this.formatDateTime(endDate)+",请在当前时间内完成排课！";
       

      }
    },
    formatDateTime(unixtimestamp) {  
      var unixtimestamp = new Date(unixtimestamp*1000);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      
      return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
          ;

    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 
.dashboard {
  &-container {
    text-align: center;
 
    margin-top:200px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.warntext{
  color: red;
  text-align: center
}
</style>
