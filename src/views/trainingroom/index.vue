<template>
  <div class="app-container">
    <div class="btnDiv">
      <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addsxs">添加</el-button>
       <!-- <el-button type="success" icon="el-icon-upload2">导入</el-button> -->
       <!-- <el-button type="success" icon="el-icon-download">导出</el-button> -->

    </div>
    <el-table :data="tableData"   stripe style="width: 100%" 
     v-loading="loading"  element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading">

    <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="已装软件：">
              <span>{{ props.row.sxs_soft }}</span>
            </el-form-item>
            <br>
            <el-form-item label="机房简介：">
              <span>{{ props.row.sxs_content }}</span>
            </el-form-item>
            
          </el-form>
        </template>
      </el-table-column>

      <el-table-column   label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}} 
          </template>
      </el-table-column>
      <el-table-column   prop="sxs_name" label="名称"  > </el-table-column>
      <el-table-column  prop="sxs_building"  label="教学楼"   > </el-table-column>
      <el-table-column  prop="sxs_room"  label="房间号"   > </el-table-column>
      <el-table-column  prop="sxs_capacity"   label="容纳人数"   ></el-table-column>
      <el-table-column  prop="admin_username"  label="管理员"   > </el-table-column>
      <el-table-column  prop="admin_phone"  label="联系方式"  > </el-table-column>
      <el-table-column fixed="right"  label="操作"   >
        <template slot-scope="scope">
          <el-button type="text" size="medium " icon="el-icon-edit" @click="editsxs(scope.row)"></el-button>
          <el-button type="text" size="medium " @click.native="deleteRow(scope.row)" icon="el-icon-delete"></el-button>
          <el-button type="text" size="medium "  @click.native="skip(scope.row)"  >设备管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    


    <el-dialog :title="dlgtitle" :visible.sync="dialogFormVisible"   center>
      <el-form :model="form" ref="sxsaddForm" :rules="rules">
        <el-form-item label="机房名称" :label-width="formLabelWidth" prop="name"  >
          <el-input v-model="form.name" auto-complete="off" clearable  ></el-input>
        </el-form-item>
        <el-form-item label="楼号" :label-width="formLabelWidth" prop="building" required>
          <el-select v-model="form.building" placeholder="请选择机房楼号">
            <el-option v-for="item in options_ssx"  :key="item.b_id"  :label="item.b_name"  :value="item.b_name"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层/房间" :label-width="formLabelWidth" prop="room" required>
          <el-input v-model="form.room" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="容纳人数" :label-width="formLabelWidth" prop="capacity">
          <el-input v-model="form.capacity" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="已装软件" :label-width="formLabelWidth" prop="soft"> 
          <el-checkbox-group v-model="form.soft">
            <el-checkbox v-for="item in options_soft"  :key="item.s_id" :label="item.s_name" name="type" ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="管理员" :label-width="formLabelWidth" prop="managerID">
          <el-select v-model="form.managerID" placeholder="请选择管理员">
            <el-option v-for="item in managers"  :key="item.admin_id"  :label="item.admin_username"  :value="item.admin_id"> </el-option>
          </el-select>
        </el-form-item>
   
        <el-form-item label="简介" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content" auto-complete="off" type="textarea" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addeditsxs">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
 

<script>
 
import { addsxs, getbuilding, getsoft, getAllsxs, getsxsPk,deleteSxsByid ,editsxs, getManagers} from '@/api/trainingroom'

  export default {
    name:'trainingroom',
    data() {
      return {
        managers:[],
        loading:true,
        dlgtitle:'',
        editadminid:'',
        form: {
          name: '',
          building: '',
          room: '',
          capacity: '',
          soft: [],
          managerID: '',
          content: ''
        },
        options_ssx: [],
        options_soft: [],
        dialogFormVisible:false,
        formLabelWidth:"120px",
        tableData: [],
        rules: {
          name: [
            { required: true, message: '请输入机房名称', trigger: 'blur' },
    
          ],
          building: [
            { required: true, message: '请输入所在位置楼号', trigger: 'blur' }
          ],
          room: [
            {   required: true, message: '请输入所在房间号', trigger: 'blur' }
          ],
          capacity: [
            {  required: true, message: '请输入机房容纳人数', trigger: 'blur' }
          ],
          managerID: [
            { required: true, message: '请输入该机房管理员', trigger: 'blur' }
          ] 
        }
      }
    },
    created:function(){
      this.Getbuilding();
      this.Getsoft();
      this.GetAllsxs();
      this.GetManagers();
    },
    methods:{
      GetManagers(){
        getManagers().then((res) => {
          this.managers=res.data;
            
        }).catch(() => {})
      },
      Getbuilding(){
          getbuilding().then((res) => {
             this.options_ssx=res.data;
            
          }).catch(() => {})
      },
      Getsoft(){
          getsoft().then((res) => {
             this.options_soft=res.data;
          }).catch(() => {})
      },
      GetAllsxs(){
          getAllsxs().then((res) => {
             this.tableData=res.data;
             this.loading=false;
          }) 
      },
      addsxs(){
        
        this.dialogFormVisible=true;
        this.dlgtitle='新增机房信息'
      },
      editsxs(row){
        this.dialogFormVisible=true;
        this.dlgtitle='修改机房信息';
        this.form.name=this.tableData[this.tableData.indexOf(row)].sxs_name;
        this.form.building=this.tableData[this.tableData.indexOf(row)].sxs_building;
        this.form.room=this.tableData[this.tableData.indexOf(row)].sxs_room;
        this.form.capacity=this.tableData[this.tableData.indexOf(row)].sxs_capacity;
        this.form.soft=JSON.parse(this.tableData[this.tableData.indexOf(row)].sxs_soft);
        this.form.managerID=this.tableData[this.tableData.indexOf(row)].sxs_managerid;
     
        this.form.content=this.tableData[this.tableData.indexOf(row)].sxs_content;

        this.editadminid=this.tableData[this.tableData.indexOf(row)].sxs_id;

      },
      addeditsxs() {
        this.$refs['sxsaddForm'].validate((valid) => {
          if (valid) {
            if(this.dlgtitle=='新增机房信息'){
              addsxs(this.form).then((response) => {
                  if(response.data){
                    this.$message({message: '添加成功',type: 'success'});
                    this.$refs['sxsaddForm'].resetFields();
                    this.GetAllsxs();
                  }
              }).catch(() => {})
            }else{
              editsxs(this.form,this.editadminid).then((response) => {
                  if(response.data){
                    this.$message({message: '修改成功',type: 'success'});
                    this.$refs['sxsaddForm'].resetFields();
                    this.GetAllsxs();
                  }
              }).catch(() => {})
            }
            this.dialogFormVisible=false;
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
         
        deleteSxsByid(this.tableData[this.tableData.indexOf(row)].sxs_id).then(response => {
            console.log(response.data)
            switch (response.data) {
              case 0:
              case -1:
                  this.$message.error(response.msg);
                  break;
              default:
                  this.$message({type: 'success',message: '删除成功!'});
                  this.tableData.splice(this.tableData.indexOf(row), 1); 
                break;
            }
         
          })
        }).catch(() => {
             console.log('123')

        });
      },
      skip(row){
        this.$router.push({ name: 'shebei', params: { id: this.tableData[this.tableData.indexOf(row)].sxs_id }})
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
.btnDiv{
  margin-bottom: 20px
}
 
</style>


