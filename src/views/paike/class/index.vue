<template>
  <div class="app-container">
    <div class="btnDiv"  >
      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addzy">添加专业</el-button>

    </div>
    <el-table :data="tableData" stripe  style="width: 100%"  v-loading="loading"  element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading">
      <el-table-column   label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}} 
          </template>
      </el-table-column>
      <el-table-column   prop="yx_name" label="学院"  > </el-table-column>
      <el-table-column   prop="zy_name" label="专业"  > </el-table-column>
   
      <el-table-column fixed="right"  label="操作"    >
        <template slot-scope="scope">
          <el-button type="text" size="medium " @click="editZy(scope.row)" icon="el-icon-edit"></el-button>
          <el-button type="text" size="medium " @click="deleteZy(scope.row)" icon="el-icon-delete"></el-button>
          <el-button type="text" size="medium "  @click="classManage(scope.row)">班级管理</el-button>
        </template>
      </el-table-column>
    </el-table>
 

    <!-- 新增专业 -->
    <el-dialog :title="dlgtitle" :visible.sync="dialogFormVisible"   center>
      <el-form :model="form" ref="zyaddForm" :rules="rules">
        <el-form-item label="专业名称" :label-width="formLabelWidth" prop="name"  >
          <el-input v-model="form.name" auto-complete="off" clearable  ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addeditZy">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 班级管理 -->
    <el-dialog :title="classname" :visible.sync="classFormVisible" :fullscreen="true"  >
      <div>

      </div>
      <el-form :inline="true" :model="classform" ref="bjaddForm" :rules="rules1" class="demo-form-inline">
        <el-form-item label="年级" :label-width="formLabelWidth" prop="year"  >
          <el-date-picker v-model="classform.year" type="year" value-format='yyyy'  placeholder="选择年级">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班级数量" prop="num">
          <el-input v-model="classform.num" type="number" placeholder="班级数量"></el-input>
        </el-form-item>
    
        <el-form-item  >
          <el-button type="primary" @click="addClass"  style="margin-left:100px">生成</el-button>
        </el-form-item>
        <el-form-item  >
           【自动生成“专业+级别+序号”班级，例如2017级-软件技术专业，输入班级数量3，自动生成"软件技术1701班、软件技术1702班、软件技术1703班"
        </el-form-item>  
      </el-form>



      <el-table :data="tableData_class" stripe  style="width: 100%"  v-loading="loading"  element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading">
      <el-table-column   label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}} 
          </template>
      </el-table-column>
      <el-table-column   prop="bj_year" label="级别"  > </el-table-column>
      <el-table-column    label="班级名称"  >
        <template slot-scope="scope">
          <span>{{scope.row.zy_name}}{{scope.row.bj_name}}班</span>
        </template>
 
      </el-table-column>
   
      <el-table-column fixed="right"  label="操作"    >
        <template slot-scope="scope">
         
          <el-button type="text" size="medium "  @click="deleteClass(scope.row)"  >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="classFormVisible = false">关闭页面</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
import { getAllzy, addzy, editzy, addClass, getAllclassData, deleteZyByid, deleteBjByid} from '@/api/table'
import { getUseryuanxiID } from '@/utils/auth'
import checkPermission from '@/utils/permission' // 权限判断函数 v-if="checkPermission(['admin'])"
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        dlgtitle:'',
        loading:true,
        form: {
          name: '',
          yxid:''
        },
        classform: {
          num: '',
          year:'',
          yxid:'',
          zyid:''
        },
        classname:'班级管理',
        classFormVisible:false,
        dialogFormVisible:false,
        formLabelWidth:"120px",
        tableData: [],
        tableData_class:[],
        rules: {
          name: [
            { required: true, message: '请输入专业名称', trigger: 'blur' },
    
          ] 
        },
        rules1: {
          num: [
            { required: true, message: '请输入班级数量', trigger: 'blur' },
          ] ,          
          year: [
            { required: true, message: '请选择年级', trigger: 'blur' },
          ] 
        },
      }
    },
    created:function(){
        this.getAllzyData();
        this.form.yxid=getUseryuanxiID()
    },
    methods:{
     checkPermission,
      getAllzyData(){
          getAllzy().then(response => {
              if(response.data){
                  this.tableData = response.data;
              }
              this.loading=false;
          })
      },
      getAllclassData(){
          getAllclassData(this.classform.zyid).then(response => {
              if(response.data){
                if(response.data==-1){
                  this.tableData_class=[];
                }else
                  this.tableData_class = response.data;
              }
              this.loading=false;
          })
      },
      addzy(){
        this.dialogFormVisible=true;
        this.dlgtitle="新增专业信息";
      },
      editZy(row){
        this.dialogFormVisible=true;
        this.dlgtitle="修改专业信息";
        this.form.name=this.tableData[this.tableData.indexOf(row)].zy_name;
        this.editadminid=this.tableData[this.tableData.indexOf(row)].zy_id;
      },
      addeditZy() {
          this.$refs['zyaddForm'].validate((valid) => {
          if (valid) {
              if(this.dlgtitle=='新增专业信息'){
                addzy(this.form).then(response => {
                    if(response.data){
                    this.$message({message:'添加成功!',type: 'success'});
                    
                    this.$refs['zyaddForm'].resetFields();
                    this.getAllzyData();
                    this.dialogFormVisible=false;
                    }
                }).catch(() => {})   
              }else{
                editzy(this.form, this.editadminid).then(response => {
                    if(response.data){
                    this.$message({message:'修改成功!',type: 'success'});
                    
                    this.$refs['zyaddForm'].resetFields();
                    this.getAllzyData();
                    this.dialogFormVisible=false;
                    }
                }).catch(() => {})       

              }
         
          } else {}
        });
      },
      classManage(row){
         
        this.classFormVisible=true;
        this.classname = this.tableData[this.tableData.indexOf(row)].zy_name+'专业-班级管理';
        this.classform.yxid=getUseryuanxiID()
        this.classform.zyid=this.tableData[this.tableData.indexOf(row)].zy_id
        this.getAllclassData()
      },
      addClass(){
          this.$refs['bjaddForm'].validate((valid) => {
          if (valid) {
            
              addClass(this.classform).then(response => {
                  if(response.data){
                  this.$message({message: '添加成功',type: 'success'});
                  
                  this.$refs['bjaddForm'].resetFields();
                  this.getAllclassData();
            
                  }
              }).catch(() => {})            
          } else {}
        });
      },
      deleteZy(row){
        this.$confirm('删除专业后，此专业下的所有班级及班级所排课表将被删除，确认删除该专业吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteZyByid(this.tableData[this.tableData.indexOf(row)].zy_id).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '删除成功!'});
              this.tableData.splice(this.tableData.indexOf(row), 1); 
            }
         
          })
        }).catch(() => {});
      },
      deleteClass(row){
        this.$confirm('删除班级后，此班级下的所排课表将被删除，确认删除该班级吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBjByid(this.tableData_class[this.tableData_class.indexOf(row)].bj_id).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '删除成功!'});
              this.tableData_class.splice(this.tableData_class.indexOf(row), 1); 
            }
         
          })
        }).catch(() => {});
      },
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
.dialog-footer{
  text-align: center
}
</style>


