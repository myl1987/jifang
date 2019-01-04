<template>
    <div class="showdiv">
        <el-tabs v-model="activeName"   type="card">
            <el-tab-pane label="院系课表" name="yx">
                <el-form :inline="true" :model="formInline" ref="cxyxForm" class="demo-form-inline" :rules="rules">
                   <el-form-item label="院系"   prop="yuanxi"    >
                            <el-select size='small'  @change='slectYuanxi'  v-model="formInline.yuanxi" placeholder="请选择院系">
                                <el-option v-for="item in xueyuan" :key="item.yx_id"   :label="item.yx_name"  :value="item.yx_code"> </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="年级"   prop="year"  >
                        <el-date-picker size='small' @change='slectYear' v-model="formInline.year" type="year" value-format='yyyy'  placeholder="选择年级">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="专业" prop="zhuanye"  >
                        <el-select size='small' @change='selectZhuanye' v-model="formInline.zhuanye"   placeholder="专业"  >
                        <el-option v-for="item in zhuanyedata"  :key="item.zy_id"  :label="item.zy_name" 
                        :value="item.zy_id">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" prop="class">
                        <el-select size='small' v-model="formInline.class"   placeholder="班级">
                        <el-option v-for="item in classdata"  :key="item.bj_id"  :label="item.bj_name" 
                        :value="item.bj_id">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  size="small" icon="el-icon-search" @click="chaxun_yx">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="downloadLoading"   size="small"  @click="handleDownload" type="success" icon="el-icon-download" >导出</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData_yx"  border    style="width: 100%">
                    <el-table-column  prop="jieci"  label="节次\周次"  ></el-table-column>
                    <el-table-column  prop="w1"  label="周一"   >
                        <template slot-scope="scope">
                            <p v-html='scope.row.w1'></p>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="w2"  label="周二"  >                        
                        <template slot-scope="scope">
                            <p v-html='scope.row.w2'></p>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="w3"  label="周三"  >
                        <template slot-scope="scope">
                            <p v-html='scope.row.w3'></p>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="w4"  label="周四"   >
                        <template slot-scope="scope">
                            <p v-html='scope.row.w4'></p>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="w5"  label="周五"   >
                        <template slot-scope="scope">
                            <p v-html='scope.row.w5'></p>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>


            <el-tab-pane label="机房课表" name="sxs"  >
                <el-form :inline="true" :model="form" ref="cxsxsForm" class="demo-form-inline" :rules="rules1">
 
                    <el-form-item label="楼号"  prop="building"  >
                    <el-select size='small' v-model="form.building" placeholder="请选择机房楼号" @change="changeBuilding">
                        <el-option v-for="item in options_ssx"  :key="item.sxs_building"  :label="item.sxs_building"  :value="item.sxs_building"> </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="机房名称"   prop="name"  >
                        <el-select size='small' v-model="form.name" placeholder="请选择房间号" >
                            <el-option v-for="item in options_name"  :key="item.sxs_name"  :label="item.sxs_name"  :value="item.sxs_name"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size='small' icon="el-icon-search" @click="chaxun_sxs">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="downloadLoading" size='small'   @click="handleDownload_sxs" type="success" icon="el-icon-download" >导出</el-button>
                    </el-form-item>
                </el-form> 

                <el-table :data="tableData"   stripe style="width: 100%" 
                        v-loading="loading"  element-loading-text="数据加载中"
                        element-loading-spinner="el-icon-loading">

                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="上课教师:">
                                <span>{{ props.row.kc_teacher }}</span>
                                </el-form-item>
                                <br/>
                                <el-form-item label="班级:">
                                 <span>{{ props.row.kc_year }}级--{{ props.row.bj_name }}班</span>
                                </el-form-item>
                                <br/>
                                
                            </el-form>
                        </template>
                    </el-table-column>

                    <el-table-column   label="序号" width="50">
                        <template slot-scope="scope">
                            {{scope.$index+1}} 
                        </template>
                    </el-table-column>
                    <el-table-column   prop="yx_name" label="机房"  >
                        <template slot-scope="scope">
                            <span>{{ scope.row.sxs_building }}/{{ scope.row.sxs_room }}/{{ scope.row.sxs_name }}</span>  
                        </template>
                    </el-table-column>
                    <el-table-column    label="星期"   > 
                        <template slot-scope="scope">
                          <span>周{{scope.row.kc_day}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column    label="节次"  > 
                        <template slot-scope="scope">
                          <span>第{{scope.row.kc_jieci}}节</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="yx_name"  label="院系"  > </el-table-column>
                    <el-table-column  prop="zy_name"  label="专业"  > </el-table-column>
                    <el-table-column  prop="kc_name"  label="课程名称"  > </el-table-column>
                    <el-table-column     label="上课周次"  >
                        <template slot-scope="scope">
                          <span v-show="scope.row.kc_weeks==null">每周重复 </span>
                          <span v-show="scope.row.kc_weeks!=null">第{{ scope.row.kc_weeks }}周 </span>
                        </template>
                       
                    </el-table-column>
                   
                    <!-- <el-table-column fixed="right"  label="操作"   >
                        <template slot-scope="scope">
                        <el-button type="text" size="medium " icon="el-icon-edit"></el-button>
                        <el-button type="text" size="medium " @click.native="deleteRow(scope.row)" icon="el-icon-delete"></el-button>
                        </template>
                    </el-table-column> -->
                </el-table>

            </el-tab-pane>
           
        </el-tabs>

        
    </div>
</template>


<script>
import {  getYuanxi } from '@/api/login'

import { getclassByyear, getclassByzy, getkb_yx,getkb_sxs,getExcelName} from '@/api/table'
import { getbuilding_sxs, getroom} from '@/api/trainingroom'
import checkPermission from '@/utils/permission'
  export default {
    data() {
      return {
        excelName:'课程表',
        downloadLoading:false,  
        loading:false,
        activeName:'yx',
        xueyuan:[],
        formInline: {
          yuanxi:'',
          year:'',
          class:  '',
          zhuanye:  '',
        },
        form:{
            building:'',
            name:''
        },
        zhuanyedata:[],
        classdata:[],
        options_ssx:[],
        options_name:[],
        tableData_yx:[],
        tableData:[],
        rules: {
          yuanxi: [{ required: true, message: '请选择院系', trigger: 'blur' },],
          year: [{ required: true, message: '请选择学年', trigger: 'blur' },],
          class: [{ required: true, message: '请选择班级', trigger: 'blur' }],
          zhuanye: [ {   required: true, message: '请选择专业', trigger: 'blur' }]
        },
        rules1:{
          building: [
            { required: true, message: '请选择楼号', trigger: 'blur' },
    
          ],
          name: [
            { required: true, message: '请选择房间', trigger: 'blur' }
          ] 
        }
      }
    },
    created(){
        
        this.getbuilding();
        this.getYuanxiData();

     
    },
    methods: {
        checkPermission,
        getYuanxiData(){
            getYuanxi().then(response => {
                if(response.data){
                    this.xueyuan = response.data;
                }
                this.loading=false;
            })
        },
        getbuilding(){
            getbuilding_sxs().then(response => {
                if(response.data){
                    if(response.data==-1){
                    this.options_ssx=[];
                    }else
                    this.options_ssx = response.data;
                }
            })
        },
        slectYuanxi(){
            this.zhuanyedata=[];
            this.classdata=[];
            this.formInline.class='';
            this.formInline.zhuanye='';
            this.formInline.year='';
        },
        slectYear(val){
            this.zhuanyedata=[];
            this.classdata=[];
            this.formInline.class='';
            this.formInline.zhuanye='';
            if(this.formInline.yuanxi==''){
                this.$message.error('请先选择院系!');
                this.formInline.year=null;
                return;
            }
            getclassByyear(val,this.formInline.yuanxi).then(response => {
                if(response.data){
                    if(response.data==-1){
                    this.zhuanyedata=[];
                    }else
                    this.zhuanyedata = response.data;
                }
                this.loading=false;
            })
        },
        selectZhuanye(val){
            this.classdata=[];
            this.formInline.class='';

            getclassByzy(this.formInline.year,val).then(response => {
                if(response.data){
                    if(response.data==-1){
                    this.classdata=[];
                    }else
                    this.classdata = response.data;
                }
                this.loading=false;
            })
        },
        chaxun_yx(){
            this.$refs['cxyxForm'].validate((valid) => {
                if (valid) {
                    getkb_yx(this.formInline).then(response => {
                        if(response.data){
                            if(response.data==-1){
                             this.tableData_yx=[];
                                this.$message({type: 'success',message: '没有相关课程信息!'});

                            }else
                            this.tableData_yx = response.data;
                            
                        }
                    })
                }
            })
 
        },
        chaxun_sxs(){
            this.$refs['cxsxsForm'].validate((valid) => {
                if (valid) {
                    getkb_sxs(this.form).then(response => {
                        if(response.data){
                            if(response.data==-1){
                             this.tableData=[];
                                this.$message({type: 'success',message: '没有相关课程信息!'});

                            }else
                            this.tableData = response.data;
                            
                        }
                    })
                }
            })
 
        },
        changeBuilding(val){
            this.options_name=[];
            this.form.room='';

            getroom(val).then(response => {
                if(response.data){
                    if(response.data==-1){
                    this.options_name=[];
                    }else
                    this.options_name = response.data;
                }
            })
        },
        handleDownload(){
           var _this=this;
            if(this.tableData_yx.length==0){
                this.$message.error('暂无数据可导出!');                
                return false;
            }

            getExcelName(this.formInline.yuanxi,this.formInline.zhuanye,this.formInline.class).then(response => {
                if(response.data){
                
                    _this.excelName = response.data;
                    
                }
            })


            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['节次-周次', '周一', '周二', '周三', '周四', '周五']
                const filterVal = ['jieci', 'w1', 'w2', 'w3', 'w4', 'w5']
                const list = this.tableData_yx
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: this.formInline.year+'学年'+_this.excelName,
                autoWidth: true,
                bookType: 'xlsx'
                })
                this.downloadLoading = false
            })
        },
        handleDownload_sxs(){
            if(this.tableData.length==0){
                this.$message.error('暂无数据可导出!');                
                return false;
            }
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['教学楼位置', '房间号','名称', '星期', '节次', '院系','专业', '级别', '班级', '课程名称', '教师', '上课周次(为空表示每周均有课)', ]
                const filterVal = ['sxs_building', 'sxs_room', 'sxs_name', 'kc_day', 'kc_jieci', 'yx_name','zy_name','kc_year','bj_name','kc_name','kc_teacher','kc_weeks']
                const list = this.tableData
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: this.form.building+'---'+this.form.room+'课表',
                autoWidth: true,
                bookType: 'xlsx'
                })
                this.downloadLoading = false
            })
        },

        
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                return parseTime(v[j])
                } else {
                return v[j]
                }
            }))
        }
    }
  }
</script>

<style    >
.showdiv{
    margin: 10px
}
.showdiv .cell{
 text-align: center

}
.showdiv .el-table {
 color: black;
 
 }
.showdiv .el-table{
  cursor:pointer;
  margin-top: 20px
}
.showdiv .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid#D1D1D1;
}
.showdiv .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #D1D1D1;
}
.showdiv .el-table--border, .el-table--group {
    border: 1px solid#D1D1D1;
}

.showdiv td{
    height: 80px
}

.showdiv .el-input{
    width:170px
}
</style>
