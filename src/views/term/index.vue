<template>
  <div class="app-container">
    <div class="btnDiv">
      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addterm">添加学期</el-button>

    </div>
    <el-table :data="tableData" stripe  style="width: 100%"  v-loading="loading"  element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading">
      <el-table-column   label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}} 
          </template>
      </el-table-column>
      <el-table-column   prop="xq_year" label="学期名称"  >
        <template slot-scope="scope">
          {{scope.row.xq_year}}学年{{scope.row.xq_term}}
        </template>
      </el-table-column>
     
      <el-table-column  prop="xq_start" :formatter="dateFormat"   label="开始时间"  > </el-table-column>
      <el-table-column  prop="xq_end"   :formatter="dateFormat" label="结束时间"  > </el-table-column>
      <el-table-column  prop="xq_week"  label="教学周数"  > </el-table-column>
      <el-table-column     label="状态"  > 
        <template slot-scope="scope">
          <span v-if="scope.row.xq_status==1">  <el-button   type="success" size="mini "  @click="stratTerm(scope.row)">启用中</el-button></span>
          <span v-else><el-button   type="danger" size="mini "  @click="stratTerm(scope.row)">已关闭</el-button></span>
        </template>
      </el-table-column>
      <el-table-column fixed="right"  label="操作"    >
        <template slot-scope="scope">
          <el-button type="text" size="medium " icon="el-icon-edit" @click="editterm(scope.row)"></el-button>
          <el-button type="text" size="medium " @click.native="deleteRow(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
 


    <el-dialog :title="dlgtitle" :visible.sync="dialogFormVisible"   center>
        <el-form :model="form" ref="xqaddForm" :rules="rules">
        <el-form-item label="学年" :label-width="formLabelWidth" prop="year"  >
          <el-date-picker v-model="form.year" type="year" value-format='yyyy'  placeholder="选择学年">
        </el-date-picker>
        </el-form-item>
 
        <el-form-item label="学期名称" :label-width="formLabelWidth" prop="term" required>
          <el-select v-model="form.term" placeholder="请选择学期名称">
            <el-option  label="第一学期"  value="第一学期"> </el-option>
            <el-option  label="第二学期"  value="第二学期"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始上课日期" :label-width="formLabelWidth" prop="start" required>
          <el-date-picker  type="date"  v-model="form.start" format="yyyy 年 MM 月 dd 日"
      value-format="timestamp"   placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束上课日期" :label-width="formLabelWidth" prop="end" required>
          <el-date-picker  type="date"  v-model="form.end" format="yyyy 年 MM 月 dd 日"
      value-format="timestamp"   placeholder="请选择"></el-date-picker>
        </el-form-item>   
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addeditterm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAllxq,addXq,deleteXqByid,editXq,stratTerm} from '@/api/table'
  export default {
 

    data() {
      return {
        dlgtitle:'',
        loading:true,
        editadminid:'',
        form: {
          year: '',
          term: '',
          start: '',
          end: ''
        },
     
        dialogFormVisible:false,
        formLabelWidth:"120px",
        tableData: [],
        rules: {
          year: [
            { required: true, message: '请选择学年', trigger: 'blur' },
    
          ],
          term: [
            { required: true, message: '请选择学期', trigger: 'blur' }
          ],
          start: [
            {   required: true, message: '请选择开始上课时间', trigger: 'blur' }
          ],
          end: [
            {  required: true, message: '请选择结束上课时间', trigger: 'blur' }
          ]
        }
      }
    },
    created:function(){
        this.getAllXqData();
 
    },
    methods:{
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
          if(daterc!=null){
            const dateMat= new Date(parseInt(daterc.toString().replace("/Date(", "").replace(")/", ""), 10));
           const year = dateMat.getFullYear();
          const month = dateMat.getMonth() + 1;
          const day = dateMat.getDate();
  
          const timeFormat= year + "-" + month + "-" + day;
          return timeFormat;
          }
           
      },
      getAllXqData(){
        getAllxq().then(response => {
            if(response.data){
                this.tableData = response.data;
            }
            this.loading=false;
        })
      },
      addterm(){
        this.dialogFormVisible=true;
        this.dlgtitle="新增学期";
        this.form={};
      },
      editterm(row){
        this.dialogFormVisible=true;
        this.dlgtitle="修改学期";
        this.form.year=this.tableData[this.tableData.indexOf(row)].xq_year;
        this.form.term=this.tableData[this.tableData.indexOf(row)].xq_term;
        this.form.start=this.tableData[this.tableData.indexOf(row)].xq_start;
        this.form.end=this.tableData[this.tableData.indexOf(row)].xq_end;

        this.editadminid=this.tableData[this.tableData.indexOf(row)].xq_id;

      },
      addeditterm() {
        this.$refs['xqaddForm'].validate((valid) => {
          if (valid) {
            if (this.dlgtitle=="新增学期") {
              addXq(this.form).then(response => {
                if(response.data){
                  if (response.data!=-1) {
                    this.$message({message: '添加成功',type: 'success'});
                    this.$refs['xqaddForm'].resetFields();
                    this.getAllXqData();
                    this.dialogFormVisible=false;
                  } else {
                    this.$message.error(response.msg);    
                  }
                 
                }
              }).catch(() => {})
            }else{
              editXq(this.form,this.editadminid).then(response => {
                if(response.data){
                  if (response.data!=-1) {
                    this.$message({message: '修改成功',type: 'success'});
                    this.$refs['xqaddForm'].resetFields();
                    this.getAllXqData();
                    this.dialogFormVisible=false;
                  } else {
                    this.$message.error(response.msg);    
                  }
                 
                }
              }).catch(() => {})         
            }
                  
            
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteRow(row){
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteXqByid(this.tableData[this.tableData.indexOf(row)].xq_id).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '删除成功!'});
              this.tableData.splice(this.tableData.indexOf(row), 1); 
            }
         
          })
        }).catch(() => {});
      },
      stratTerm(row){
        
        this.$confirm('确认改变学期状态吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          stratTerm(this.tableData[this.tableData.indexOf(row)].xq_id,this.tableData[this.tableData.indexOf(row)].xq_status).then(response => {
            if(response.data){
              if(response.data==2){
                this.$message.error('同时只能启用一个学期！');
              }else{
                this.$message({type: 'success',message: '切换状态成功!'});
                this.getAllXqData();
              }
            
            
            }
         
          })
        }).catch(() => {});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.btnDiv{
  margin-bottom: 20px
}
 
.el-table .cell {
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
    font-weight: 400;
    color: #616161;
}
.el-table th>.cell {
    
    font-size: 12px;
    color: #313131;
    font-weight: bolder;
    padding: 0 5px;
}
</style>


