<template>
  <div class="app-container">
 
    <el-form :inline="true" size="small"   class="demo-form-inline">
 
           
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="add">新增配件</el-button>
            <el-button  size="small"   type="success" icon="el-icon-download" >导出</el-button>
       
      
    </el-form>
    <el-table :data="tableData"   stripe style="width: 100%" 
     v-loading="loading"  element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading">
 

      <el-table-column   label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}} 
          </template>
      </el-table-column>
      <el-table-column   prop="pj_name" label="类别"    
      :filters="filter_flag"
          :filter-method="filterTag"
          filter-placement="bottom-end"> </el-table-column>
      <el-table-column  prop="kc_name"  label="名称"   > </el-table-column>
      <el-table-column  prop="kc_pinpai"  label="品牌"   > </el-table-column>
      <el-table-column  prop="kc_guige"   label="型号规格"   ></el-table-column>
 
      <el-table-column  prop="kc_num"  label="库存数量"  > </el-table-column>
      <el-table-column  prop="kc_gongyingshang"  label="供应商"  > </el-table-column>
      <el-table-column  prop="kc_jiage"  label="价格"  > </el-table-column>
      <el-table-column  prop="kc_creattime"  :formatter="dateFormat"  label="入库日期"  > </el-table-column>
      <el-table-column fixed="right"  label="操作"   >
        <template slot-scope="scope">
          <el-button type="text" size="medium " icon="el-icon-plus" @click="addPjNum(scope.row)"></el-button>
          <el-button type="text" size="medium " icon="el-icon-edit" @click="editpj(scope.row)"></el-button>
          <el-button type="text" size="medium " @click.native="deleteRow(scope.row)" icon="el-icon-delete"></el-button>
          <el-button type="text" size="medium " @click.native="lookhistory(scope.row)" icon="el-icon-date"></el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog :title="dlgtitle" :visible.sync="addDialog"   center>
      <el-form :model="form" ref="pjaddForm" :rules="rules">
        <el-form-item label="配件类别" :label-width="formLabelWidth" prop="pjid" >
            <el-select v-model="form.pjid" placeholder="请选择">
             <el-option v-for="item in peijian"  :key="item.pj_id"  :label="item.pj_name" 
           :value="item.pj_code"></el-option>
            </el-select>
        </el-form-item>
 
        <el-form-item label="名称" :label-width="formLabelWidth" prop="pjname"  >
          <el-input v-model="form.pjname" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="品牌" :label-width="formLabelWidth" prop="pinpai"  >
          <el-input v-model="form.pinpai" auto-complete="off" clearable></el-input>
        </el-form-item>       
        <el-form-item label="型号规格" :label-width="formLabelWidth" prop="guige"  >
          <el-input v-model="form.guige" auto-complete="off" clearable></el-input>
        </el-form-item>    
        <el-form-item label="数量" :label-width="formLabelWidth" prop="num"  >
          <el-input type="number" :disabled="dlgtitle=='修改信息'" v-model="form.num" auto-complete="off" clearable></el-input>
        </el-form-item>   
        <el-form-item label="供应商" :label-width="formLabelWidth" prop="gongyingshang"  >
          <el-input v-model="form.gongyingshang" auto-complete="off" clearable></el-input>
        </el-form-item>  
        <el-form-item label="价格" :label-width="formLabelWidth" prop="jiage"  >
          <el-input v-model="form.jiage" auto-complete="off" clearable></el-input>
        </el-form-item>  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addeditpj">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增配件" :visible.sync="addPjNumDialog"   >
      <el-input type="number" min='0' v-model="pjNum" placeholder="请输入新增配件数量" clearable></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPjNumDialog = false">取 消</el-button>
        <el-button type="primary" @click="addPjNum_OK">确 定</el-button>
      </div>
    </el-dialog>
 
    <el-dialog title="使用记录" :visible.sync="historyDialog"   >
      <el-table :data="pjHistory"   stripe style="width: 100%" 
        v-loading="loading1"  element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading">
        <el-table-column   label="序号" width="50">
            <template slot-scope="scope">
              {{scope.$index+1}} 
            </template>
        </el-table-column>
        <el-table-column   prop="admin_username" label="操作人"   width="100"> </el-table-column>
        <el-table-column  prop="kcsy_time"  :formatter="dateFormat" label="操作时间"   > </el-table-column>
        <el-table-column  prop="kcsy_flag"   label="操作"   > 
          <template slot-scope="scope">
             <el-tag type="danger" v-show="scope.row.kcsy_flag==0">减少</el-tag>
             <el-tag type="success" v-show="scope.row.kcsy_flag==1">增加</el-tag>
          </template>
        </el-table-column>
        <el-table-column  prop="kcsy_num"  label="数量"   > </el-table-column>
 
        
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="historyDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>
 

<script>
import {   getPeijianAll,addpj, editpj,deletePjByid,getpjInfo,addPjNum,lookhistory} from '@/api/kucun'

  export default {

    name:'peijian',
    data() {
      return {
        pjNum:'',
        historyDialog:false,
        addPjNumDialog:false,
        dlgtitle:'配件入库',
        editadminid:'',
        addDialog:false,
        loading:true,
        loading1:true,
        peijian:[],
        pjHistory:[],
        peijianform: {
           
            peijiancode: '',
  
        },
        form:{
            pjid:'',
            pjname:'',
            pinpai:'',
            guige:'',
            num:'',
            gongyingshang:'',
            jiage:''
        },
        rules: {
            pjid: [{ required: true, message: '请选择配件类别', trigger: 'blur' }],
            pjname: [{ required: true, message: '请输入配件名称', trigger: 'blur' }],
            pinpai: [{ required: true, message: '请输入配件品牌', trigger: 'blur' }],
            guige: [{ required: true, message: '请输入配件型号规格', trigger: 'blur' }],
            num: [{  required: true, message: '请输入录入数量', trigger: 'blur' }],
        },
        filter_flag:[
          { text: '内存', value: 'nc' },
          { text: '硬盘', value: 'yp' },
          { text: '显卡', value: 'xk' },
          { text: '显示器', value: 'xsq' },
          { text: '主板', value: 'zb' },
          { text: '键盘', value: 'jp' },
          { text: '鼠标', value: 'sb' },
          { text: 'CPU', value: 'cpu' },
        ],
        formLabelWidth:"120px",
        tableData: [],
 
      }
    },
    created:function(){
        this.GetpjInfo();
        this.GetAllpj();
    },
    methods:{
       filterTag(value, row) {
        return row.kc_pjid == value;
         
      },
      dateFormat(row, column, cellValue, index){
        const daterc = row[column.property]*1000
      
        if(daterc!=null){
          const dateMat= new Date(parseInt(daterc.toString().replace("/Date(", "").replace(")/", ""), 10));
          const year = dateMat.getFullYear();
          const month = dateMat.getMonth() + 1;
          const day = dateMat.getDate();
          const hh = dateMat.getHours();
          const mm = dateMat.getMinutes();
        
          const timeFormat= year + "/" + month + "/" + day + " " + hh + ":" + mm ;
          return timeFormat;
        }
           
      },
      GetpjInfo(){
        getpjInfo().then((res) => {
          if(res.data!=-1){
           this.peijian=res.data;
          }
          this.loading=false;

        }) 
      },
 
      GetAllpj(){
        getPeijianAll(1).then((res) => {
          if(res.data!=-1){
           this.tableData=res.data;
          }
          this.loading=false;

        }) 
      },
      add(){
          this.addDialog=true;
          this.dlgtitle='配件入库';
      },
      editpj(row){
        this.addDialog=true;
        this.dlgtitle='修改信息';
        this.form.pjid=this.tableData[this.tableData.indexOf(row)].kc_pjid;
        this.form.pjname=this.tableData[this.tableData.indexOf(row)].kc_name;
        this.form.pinpai=this.tableData[this.tableData.indexOf(row)].kc_pinpai;
        this.form.guige=this.tableData[this.tableData.indexOf(row)].kc_guige;
        this.form.num=this.tableData[this.tableData.indexOf(row)].kc_num;
        this.form.gongyingshang=this.tableData[this.tableData.indexOf(row)].kc_gongyingshang;
        this.form.jiage=this.tableData[this.tableData.indexOf(row)].kc_jiage;
     
        this.editadminid=this.tableData[this.tableData.indexOf(row)].kc_id;

      },
      addeditpj(){
        this.$refs['pjaddForm'].validate((valid) => {
          if (valid) {
            if(this.dlgtitle=='配件入库'){
              addpj(this.form).then((response) => {
                  if(response.data!=-1){
                    this.$message({message: '添加成功',type: 'success'});
                    this.$refs['pjaddForm'].resetFields();
                    this.GetAllpj();
                  }
              }).catch(() => {})
            }else{
              editpj(this.form,this.editadminid).then((response) => {
                  if(response.data!=-1){
                    this.$message({message: '修改成功',type: 'success'});
                    this.$refs['pjaddForm'].resetFields();
                    this.GetAllpj();
                  }
              }).catch(() => {})
            }
            this.addDialog=false;
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
         
        deletePjByid(this.tableData[this.tableData.indexOf(row)].kc_id).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '删除成功!'});
              this.tableData.splice(this.tableData.indexOf(row), 1); 
            }
         
          })
        }).catch(() => {
             console.log('123')

        });
      },
      addPjNum(row){
        this.addPjNumDialog=true;
        this.editadminid=this.tableData[this.tableData.indexOf(row)].kc_id;
      },
      addPjNum_OK(){
        if(this.pjNum==''||this.pjNum=='0'){
          this.$message.error('请输入新增配件数量！');
          return;
        }
         addPjNum(this.editadminid,this.pjNum).then((response) => {
            if(response.data!=-1){
              this.$message({message: '添加成功',type: 'success'});
              this.GetAllpj();
            }
        }).catch(() => {})        
        this.addPjNumDialog=false;
      },
      lookhistory(row){
        this.historyDialog=true;
        this.editadminid=this.tableData[this.tableData.indexOf(row)].kc_id;
        lookhistory(this.editadminid).then((response) => {
            if(response.data!=-1){
              this.pjHistory=response.data;
            }
        }).catch(() => {}) 

        this.loading1=false;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
 
 
</style>


