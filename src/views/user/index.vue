<template>
  <div class="app-container">
    <div class="btnDiv">
      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addUser">添加管理员</el-button>

    </div>
    <el-table :data="tableData" stripe  style="width: 100%"  v-loading="loading"  element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading">
      <el-table-column   label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}} 
          </template>
      </el-table-column>
      <el-table-column   prop="yx_name" label="院系"  > </el-table-column>
      <el-table-column  prop="admin_name"  label="账号"   > </el-table-column>
      <el-table-column  prop="r_name"  label="角色"   > </el-table-column>
      <el-table-column  prop="admin_start" :formatter="dateFormat"  label="开始选课日期"   > </el-table-column>
      <el-table-column  prop="admin_end" :formatter="dateFormat"  label="结束选课日期"   > </el-table-column>
      <el-table-column  prop="admin_username"    label="使用人"   > </el-table-column>
   <el-table-column fixed="right"  label="操作"    width="200">
        <template slot-scope="scope">
          <el-button type="text" size="medium " icon="el-icon-edit"   @click="edituser(scope.row)"></el-button>
          <el-button type="text" size="medium " icon="el-icon-delete" @click.native="deleteRow(scope.row)" ></el-button>
          <el-button type="text" size="medium "  @click="setManager(scope.row)" >设置为</el-button>
          <el-button type="text" size="medium "  @click="resetPwd(scope.row)" >重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
 


    <el-dialog :title="digtitle" :visible.sync="dialogFormVisible"  >
        <el-form :model="form" ref="UseraddForm" :rules="rules">
 
        <el-form-item label="院系" :label-width="formLabelWidth" prop="yuanxi"  >
                <el-select v-model="form.yuanxi" placeholder="请选择院系">
                    <el-option v-for="item in xueyuan" :key="item.yx_id"   :label="item.yx_name"  :value="item.yx_code"> </el-option>
                </el-select>
        </el-form-item>

        <el-form-item label="账号" :label-width="formLabelWidth" prop="account"  >
            <el-col :span="11">
                <el-input v-model="form.account" auto-complete="off" clearable></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role"  >
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option  label="选课教师"  value="4"> </el-option>
            <el-option  label="机房管理员"  value="1"> </el-option>
            <el-option  label="普通管理员(审批人员)"  value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始选课日期" :label-width="formLabelWidth" prop="start"  >
          <el-date-picker  type="date"  v-model="form.start" format="yyyy 年 MM 月 dd 日"
      value-format="timestamp"   placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束选课日期" :label-width="formLabelWidth" prop="end"  >
          <el-date-picker  type="date"  v-model="form.end" format="yyyy 年 MM 月 dd 日"
      value-format="timestamp"   placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item label="使用人姓名" :label-width="formLabelWidth" prop="username" >
            <el-col :span="11">
                <el-input v-model="form.username"   clearable></el-input>
            </el-col>
        </el-form-item>  
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone" >
            <el-col :span="11">
                <el-input v-model="form.phone"  clearable></el-input>
            </el-col>
        </el-form-item>      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addoreditUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置为" :visible.sync="dialogManagerVisible"  >
       
      <div>
          <el-radio-group v-model="manageID">
            <el-radio-button label="4">选课教师</el-radio-button>
            <el-radio-button label="1">机房管理员</el-radio-button>
            <el-radio-button label="2">普通管理员(审批人员)</el-radio-button>
            <el-radio-button label="3">系统管理员</el-radio-button>
          </el-radio-group>
      </div>
         
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogManagerVisible = false">取 消</el-button>
        <el-button type="primary" @click="setManagerOK">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getAllUser,addUser,editUser,getYuanxi,deleteUserByid,resetUserPwd,setManager} from '@/api/login'
  export default {
    data() {
      return {
        manageID:'',
        dialogManagerVisible:false,
        digtitle:'',
        editadminid:'',
        xueyuan:[],
        loading:true,
        form: {
          yuanxi: '',
          account: '',
          role: '',
          start: '',
          end: '',
          username:'',
          phone:''
        },
     
        dialogFormVisible:false,
        formLabelWidth:"150px",
        tableData: [],
        rules: {
          yuanxi: [
            { required: true, message: '请选择院系', trigger: 'blur' },
    
          ],
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          role: [
            {   required: true, message: '请选择用户角色', trigger: 'blur' }
          ],
          username: [
            {   required: true, message: '请输入使用人名称', trigger: 'blur' }
          ] 
        }
      }
    },
    created:function(){
        this.getAllUserData();
        this.getYuanxiData();
 
    },
    methods:{
      dateFormat(row, column, cellValue, index){
          const daterc = row[column.property]
         
          if(daterc!=null&&daterc!=0){
              const dateMat= new Date(parseInt(daterc.toString().replace("/Date(", "").replace(")/", ""), 10));
            const year = dateMat.getFullYear();
            const month = dateMat.getMonth() + 1;
            const day = dateMat.getDate();
    
            const timeFormat= year + "-" + month + "-" + day;
            return timeFormat;
          }else{
            return '无限制';
          }
          
           
      },
      getAllUserData(){
        getAllUser().then(response => {
            if(response.data){
                this.tableData = response.data;
            }
            this.loading=false;
        })
      },
      getYuanxiData(){
        getYuanxi().then(response => {
            if(response.data){
                this.xueyuan = response.data;
            }
            this.loading=false;
        })
      },
      addUser(){
        this.digtitle='增加用户信息';
        this.dialogFormVisible=true;
        this.form={};
      },
      addoreditUser() {
        this.$refs['UseraddForm'].validate((valid) => {
          if (valid) {
            if(this.digtitle==='增加用户信息'){
              addUser(this.form).then(response => {
              
                if(response.data!=-1){
                  this.$message({message: '添加成功',type: 'success'});
                  
                  this.$refs['UseraddForm'].resetFields();
                  this.getAllUserData();
                  this.dialogFormVisible=false;
                }else{
                  this.$message.error(response.msg);                

                }
              }).catch(() => {}) 
            }else{
              editUser(this.form,this.editadminid).then(response => {
              
                if(response.data!=-1){
                  this.$message({message: '修改成功',type: 'success'});
                  
                  this.$refs['UseraddForm'].resetFields();
                  this.getAllUserData();
                  this.dialogFormVisible=false;
                }else{
                  this.$message.error(response.msg);                

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
        this.$confirm('确认删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUserByid(this.tableData[this.tableData.indexOf(row)].admin_id).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '删除成功!'});
              this.tableData.splice(this.tableData.indexOf(row), 1); 
            }
         
          })
        }).catch(() => {});
      },
      edituser(row){
        this.digtitle='修改用户信息';
        this.dialogFormVisible=true;
        this.form.yuanxi=this.tableData[this.tableData.indexOf(row)].yx_code;
        this.form.account=this.tableData[this.tableData.indexOf(row)].admin_name;
        this.form.role=this.tableData[this.tableData.indexOf(row)].r_code;
        this.form.start=this.tableData[this.tableData.indexOf(row)].admin_start;
        this.form.end=this.tableData[this.tableData.indexOf(row)].admin_end;
        this.form.username=this.tableData[this.tableData.indexOf(row)].admin_username;
        this.form.phone=this.tableData[this.tableData.indexOf(row)].admin_phone;
        this.editadminid=this.tableData[this.tableData.indexOf(row)].admin_id;
       
      },
      resetPwd(row){
        this.editadminid=this.tableData[this.tableData.indexOf(row)].admin_id;
        this.$confirm('确认重置该用户密码吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetUserPwd(this.editadminid).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '密码重置123456成功!'});
            }
         
          })
        }).catch(() => {});
      },
      setManager(row){
        this.editadminid=this.tableData[this.tableData.indexOf(row)].admin_id;
        this.dialogManagerVisible=true;
        this.manageID=this.tableData[this.tableData.indexOf(row)].admin_role;
      },
      setManagerOK(){
        if(this.manageID!=''){
          setManager(this.editadminid,this.manageID).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '设置成功!'});
            }
          })
        this.dialogManagerVisible=false;
        this.getAllUserData();
        }
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


