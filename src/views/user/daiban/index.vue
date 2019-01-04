<template>
  <div class="app-container">
 
            <el-table :data="tableData"   stripe style="width: 100%" 
                v-loading="loading"  element-loading-text="数据加载中"
                element-loading-spinner="el-icon-loading">

                <el-table-column   prop="bx_id" label="编号"  width="80"> </el-table-column>
                <el-table-column  prop="sxs_name"  label="机房" width="80"  > </el-table-column>
                <el-table-column  prop="c_code"  label="电脑编号"   width="80"> </el-table-column>
                <el-table-column  prop="bx_peijian"  label="报修配件"   width="200"> 
                  <template slot-scope="scope" style="color:red">
                    <div v-if="scope.row.bx_peijian!=''">
                      <el-tag  size="mini"   v-if="scope.row.bx_peijian.indexOf('cpu')!=-1">CPU</el-tag>
                      <el-tag   size="mini" v-if="scope.row.bx_peijian.indexOf('yp')!=-1">硬盘</el-tag>
                      <el-tag   size="mini" v-if="scope.row.bx_peijian.indexOf('nc')!=-1">内存</el-tag>
                      <el-tag   size="mini" v-if="scope.row.bx_peijian.indexOf('xk')!=-1">显卡</el-tag>
                      <el-tag   size="mini" v-if="scope.row.bx_peijian.indexOf('zb')!=-1">主板</el-tag>
                      <el-tag  size="mini" v-if="scope.row.bx_peijian.indexOf('jp')!=-1">键盘</el-tag>
                      <el-tag  size="mini" v-if="scope.row.bx_peijian.indexOf('sb')!=-1">鼠标</el-tag>
                      <el-tag  size="mini" v-if="scope.row.bx_peijian.indexOf('xsq')!=-1">显示器</el-tag>
                    </div>

                  </template>                  
                </el-table-column>
                <el-table-column  prop="admin_username"  label="报修人"   > </el-table-column>
                <el-table-column  prop="bx_content"  label="报修描述"  > </el-table-column>
                <el-table-column  prop="bx_time" :formatter="dateFormat"  label="报修日期"   ></el-table-column>
                <el-table-column  prop="c_jianpan"  label="目前进度"  width="200">
                  <template slot-scope="scope">
                    <el-tag type="primary" v-show="scope.row.c_flag==1">维修申请，请审核</el-tag>
                    <el-tag type="success" v-show="scope.row.c_flag==3">已完成维修，请确认</el-tag>
                  </template>
                </el-table-column>
               
                <el-table-column fixed="right"  label="操作"  width="100" >
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.c_flag==1"  type="text" size="medium "    @click="chuli(scope.row)">处理</el-button>
                      <el-button v-else type="text" size="medium "    @click="chuli_end(scope.row)">处理</el-button>
                    
                    </template>
                </el-table-column>
            </el-table>
        

            <el-dialog title="办理" :visible.sync="dialogVisible"  >
       
                <div>
                  <el-select v-model="yijian" placeholder="请选择" >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </div>
                <div style="margin-top:15px">          
                    <el-input v-model="content" auto-complete="off" type="textarea" placeholder="请输入处理意见" clearable> </el-input>
        
                </div>
                  
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="chuliOk">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="已确认完成维修" :visible.sync="dialogVisible1"  >
 
                <div style="margin-top:15px">          
                    <el-input v-model="content" auto-complete="off" type="textarea" placeholder="请输入处理意见" clearable> </el-input>
        
                </div>
                  
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="chuliOk">确 定</el-button>
                </div>
            </el-dialog>
 
  </div>
</template>
 

<script>
import { getMyEvents,deletebxByid,chuli} from '@/api/baoxiu'

  export default {
    name:'repair',
 
    data() {
      return {
        options: [{
          value: '1',
          label: '同意维修'
        }, {
          value: '0',
          label: '不同意维修'
        } ],
        dialogVisible1:false,
        bxid:'',
        sbid:'',
        yijian:'',
        content:'',
        dialogVisible:false,
        loading:true,
        tableData:[],
      }
    },
    created:function(){
      this.getMyEvents();
    },
    methods:{
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]*1000
       
          if(daterc!=null){
            const dateMat= new Date(parseInt(daterc.toString().replace("/Date(", "").replace(")/", ""), 10));
           const year = dateMat.getFullYear();
          const month = dateMat.getMonth() + 1;
          const day = dateMat.getDate();
  
          const timeFormat= year + "-" + month + "-" + day;
          return timeFormat;
          }
           
      },
      getMyEvents(){
        this.loading=false;
        getMyEvents().then((res) => {
          if(res.data!=-1){
            this.tableData=res.data;
          }else{

          }
            this.loading=false;
        }) 
      },
      chuli(row){
        this.dialogVisible=true;
        this.yijian='';
        this.bxid=this.tableData[this.tableData.indexOf(row)].bx_id;
        this.sbid=this.tableData[this.tableData.indexOf(row)].bx_sbid;
      },
      chuli_end(row){
        this.dialogVisible1=true;
        this.yijian='2';
        this.bxid=this.tableData[this.tableData.indexOf(row)].bx_id;
        this.sbid=this.tableData[this.tableData.indexOf(row)].bx_sbid;
      },
      chuliOk(){
        if(this.yijian==''){
           this.$message.error('请选择处理意见....');         
           return;
        }
        chuli(this.bxid,this.sbid,this.yijian,this.content).then((res) => {
          if(res.data!=-1){
            this.getMyEvents();
            this.$message({message: '处理成功',type: 'success'});
          }else{

          }
          this.dialogVisible=false;
          this.dialogVisible1=false;
        }) 
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  >
 .el-table{
  cursor:pointer;
}
</style>




