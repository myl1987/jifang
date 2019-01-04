<template>
  <div class="app-container">
    <el-tabs  >
        <el-tab-pane>
            <span slot="label"><i class="el-icon-time"></i>  进行中</span>
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
                <el-table-column  prop="bx_content"  label="报修描述"   show-overflow-tooltip> </el-table-column>
                <el-table-column  prop="bx_time" :formatter="dateFormat"  label="报修日期"   width="200" ></el-table-column>
                <el-table-column  prop="c_jianpan"  label="目前进度"  width="200">
                  <template slot-scope="scope">
                    <el-tag type="danger" v-show="scope.row.c_flag==1">主任审核</el-tag>
                    <el-tag type="warning" v-show="scope.row.c_flag==2">已同意维修，请维修</el-tag>
                    <el-tag type="warning" v-show="scope.row.c_flag==3">已维修，待领导审核</el-tag>
                    <el-tag type="danger" v-show="scope.row.c_flag==4">申请被退回</el-tag>
                  </template>
                </el-table-column>
               
                <el-table-column fixed="right"  label="操作"  width="150" >
                    <template slot-scope="scope">
                    <el-button :disabled="scope.row.c_flag!=1" type="text" size="medium "    @click="deleteRow(scope.row)">撤销</el-button>
                    <el-button :disabled="scope.row.c_flag!=2" type="text" size="medium "    @click="chuli(scope.row)">完成维修</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="已完成维修" :visible.sync="dialogVisible"  >
       
          
              <div style="margin-top:15px">          
                  <el-input v-model="content" auto-complete="off" type="textarea" placeholder="请输入处理结果" clearable> </el-input>
       
              </div>
                
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="chuliOk">确 定</el-button>
              </div>
            </el-dialog>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-success"></i>  已结束</span>
            <el-table :data="tableData_end"   stripe style="width: 100%" 
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
              
                <el-table-column  prop="c_jianpan"  label="结果"  width="200">
                  <template slot-scope="scope">
                    <el-tag type="danger" v-show="scope.row.bx_flag==1">完成</el-tag>
                    <el-tag type="danger" v-show="scope.row.bx_flag==2">申请被退回</el-tag>
 

                  </template>
                </el-table-column>
                <el-table-column  prop="c_jianpan"  label="审批记录"  width="200">
                  <template slot-scope="scope">
                 
                   <el-button type="text" size="medium "   @click="lookDetails(scope.row)">查看</el-button>

                  </template>
                </el-table-column>          
  
            </el-table>
            <el-dialog title="审批记录" :visible.sync="dialogVisible_sp"  >
       
          
               
               <el-table :data="bxDetails"   stripe style="width: 100%" 
                v-loading="loading"  element-loading-text="数据加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column   label="序号" width="50">
                    <template slot-scope="scope">
                      {{scope.$index+1}} 
                    </template>
                </el-table-column>

                <el-table-column   prop="admin_username" label="处理人"   width="100"> </el-table-column>
                <el-table-column  prop="bxmx_time"  :formatter="dateFormat" label="处理时间"   > </el-table-column>
                <el-table-column  prop="bxmx_yjid"  label="进度"    > 
                   <template slot-scope="scope">
                    <el-tag type="danger" v-show="scope.row.bxmx_yjid==0">申请被退回</el-tag>
                    <el-tag type="success" v-show="scope.row.bxmx_yjid==1">同意维修申请</el-tag>
                    <el-tag type="success" v-show="scope.row.bx_bxrid==scope.row.bxmx_clrid&&scope.row.bxmx_yjid==2">已完成维修，等待审核</el-tag>
                    <el-tag type="success" v-show="scope.row.bx_bxrid!=scope.row.bxmx_clrid&&scope.row.bxmx_yjid==2">已审核，确认维修完成</el-tag>
 
 

                  </template>
                </el-table-column>
                <el-table-column  prop="bxmx_clyj"  label="处理意见"    > </el-table-column>
               
               </el-table>
              
                
              <div slot="footer" class="dialog-footer">
                
                <el-button type="primary" @click="dialogVisible_sp = false">关 闭</el-button>
              </div>
            </el-dialog>
        </el-tab-pane>    
    </el-tabs>
  </div>
</template>
 

<script>
import { getbxInfo,deletebxByid,getbxInfo_end,chuli_fqr,getBxDetails} from '@/api/baoxiu'

  export default {
    name:'repair',
 
    data() {
      return {
        bxid:'',
        sbid:'',
        dialogVisible_sp:false,
        content:'',
        loading:true,
        dialogVisible:false,
        tableData:[],
        tableData_end:[],
        bxDetails:[],
      }
    },
    created:function(){
      this.getAllbx();
      this.getAllbx_end();
    },
    methods:{
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]*1000
       
          if(daterc!=null){
            const dateMat= new Date(parseInt(daterc.toString().replace("/Date(", "").replace(")/", ""), 10));
           const year = dateMat.getFullYear();
          const month = dateMat.getMonth() + 1;
          const day = dateMat.getDate();
        const hh = dateMat.getHours();
          const mm = dateMat.getMinutes();
          const ss = dateMat.getSeconds();
          const timeFormat= year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
          return timeFormat;
 
          }
           
      },

      getAllbx(){
        this.loading=false;
        getbxInfo().then((res) => {
          if(res.data!=-1){
            this.tableData=res.data;
          }else{

          }
            
            this.loading=false;
        }) 
      },
      getAllbx_end(){
        this.loading=false;
        getbxInfo_end().then((res) => {
          if(res.data!=-1){
            this.tableData_end=res.data;
          }else{

          }
            
            this.loading=false;
        }) 
      },
      deleteRow(row){
        this.$confirm('确认撤回该报修吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletebxByid(this.tableData[this.tableData.indexOf(row)].bx_id,this.tableData[this.tableData.indexOf(row)].bx_sbid).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '撤销成功!'});
              this.tableData.splice(this.tableData.indexOf(row), 1); 
            }
          
          })
        }).catch(() => {});
      },
      chuli(row){
        this.dialogVisible=true;
        this.bxid=this.tableData[this.tableData.indexOf(row)].bx_id;
        this.sbid=this.tableData[this.tableData.indexOf(row)].bx_sbid;
      },
      chuliOk(){
        chuli_fqr(this.bxid,this.sbid, this.content).then((res) => {
          if(res.data){
             this.getAllbx();
          }else{

          }
          this.dialogVisible=false;
        }) 
      },
      lookDetails(row){
        this.dialogVisible_sp=true;
        getBxDetails(this.tableData_end[this.tableData_end.indexOf(row)].bx_id).then((res) => {
          if(res.data!=-1){
            this.bxDetails=res.data;
          }else{}
        });
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss"  >
 .el-table{
  cursor:pointer;
}
</style>


