<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12" class="jfName"><svg-icon icon-class="peijian" />  {{sxsname}}</el-col>
      
      <el-col :span="12">
        <div class="sb_btnDiv">
          <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addshebei">添加</el-button>
       
          <upload-excel-component :on-success="handleSuccess"  class="excelupbtn"/>
          <el-button :loading="downloadLoading"   size="small"  @click="handleDownload" type="success" icon="el-icon-download" >导出</el-button>
          <el-button type="text" size="small "  @click.native="downExcel"  >下载导入excel模板</el-button>
          
        </div>
      </el-col>
    </el-row>
    
    
    <el-table :data="tableData"   stripe style="width: 100%" 
     v-loading="loading"  element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading">

    <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
       
            <el-form-item label="备注">
              <span>{{ props.row.c_beizhu }}</span>
            </el-form-item>
            
          </el-form>
        </template>
      </el-table-column>

    
      <el-table-column   prop="c_code" label="编号"  width="80"> </el-table-column>
      <el-table-column  prop="c_cpu"  label="CPU"   > </el-table-column>
      <el-table-column  prop="c_neicun"  label="内存"   width="200"> </el-table-column>
      <el-table-column  prop="c_yingpan"   label="硬盘"   ></el-table-column>
      <el-table-column  prop="c_xianka"  label="显卡"   > </el-table-column>
      <el-table-column  prop="c_jianpan"  label="键盘"  > </el-table-column>
      <el-table-column  prop="c_shubiao"  label="鼠标"  > </el-table-column>
      <el-table-column  prop="c_xianshiqi"  label="显示器"  > </el-table-column>
     
      <el-table-column prop="c_flag"  label="状态"
          :filters="filter_flag"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
          
            <el-tag v-show="scope.row.c_flag==0" type="success">正常</el-tag>
            <el-tag v-show="scope.row.c_flag!=0" type="warning">维修中</el-tag>       
          </template>
      </el-table-column>

      <el-table-column fixed="right"  label="操作"  width="180" >
        <template slot-scope="scope">
          <el-button type="text" size="medium "    @click="editsb(scope.row)">编辑</el-button>
          <el-button type="text" size="medium " @click.native="deleteRow(scope.row)"  >删除</el-button>
          <el-button type="text" size="medium "   @click.native="baoxiu(scope.row)"  >报修</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dlgtitle" :visible.sync="dialogFormVisible"   >
      <el-form :model="form" ref="sbaddForm" :rules="rules" >
        <el-form-item label="设备编号" :label-width="formLabelWidth" prop="code"  >
          <el-input v-model="form.code" size="mini"   clearable  ></el-input>
        </el-form-item>
        <el-form-item label="CPU" :label-width="formLabelWidth" prop="cpu"  >
          <el-input v-model="form.cpu" size="mini"    clearable  ></el-input>
        </el-form-item>
        <el-form-item label="内存" :label-width="formLabelWidth" prop="neicun" >
          <el-input v-model="form.neicun"  size="mini"  clearable  ></el-input>
          
        </el-form-item>
        <el-form-item label="硬盘" :label-width="formLabelWidth" prop="yingpan" >
          <el-input v-model="form.yingpan"  size="mini"   clearable></el-input>
        </el-form-item>
        <el-form-item label="显卡" :label-width="formLabelWidth" prop="xianka">
          <el-input v-model="form.xianka"  size="mini"   clearable></el-input>
        </el-form-item>
        <el-form-item label="键盘" :label-width="formLabelWidth" prop="jianpan"> 
          <el-input v-model="form.jianpan"  size="mini"   clearable></el-input>
          
        </el-form-item>
        <el-form-item label="鼠标" :label-width="formLabelWidth" prop="shubiao">
          <el-input v-model="form.shubiao"  size="mini"  clearable></el-input>
        </el-form-item>
        <el-form-item label="显示器" :label-width="formLabelWidth" prop="xianshiqi">
          <el-input v-model.number="form.xianshiqi"  size="mini"   clearable></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="beizhu">
          <el-input v-model="form.beizhu"  size="mini"   type="textarea" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small"  @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small"  type="primary" @click="addeditsxs">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提交报修申请" :visible.sync="dialogBaoxiu"   >

      <el-dialog title="申请库存配件" :visible.sync="selectbxDialog" :fullscreen='full' center append-to-body>
        <el-tag>仅显示库存数量不为0的配件</el-tag>
        <el-table :data="tableData_pj"   stripe style="width: 100%" 
          v-loading="loadingbx"  element-loading-text="数据加载中"
          element-loading-spinner="el-icon-loading"  @selection-change="handleSelectionChange">
      
          <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column   label="序号" width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}} 
                </template>
            </el-table-column>
            <el-table-column   prop="pj_name" label="类别"  > </el-table-column>
            <el-table-column  prop="kc_name"  label="名称"   > </el-table-column>
            <el-table-column  prop="kc_pinpai"  label="品牌"   > </el-table-column>
            <el-table-column  prop="kc_guige"   label="型号规格"   ></el-table-column>
      
            <el-table-column  prop="kc_num"  label="库存数量"  > </el-table-column>
            <el-table-column  prop="kc_gongyingshang"  label="供应商"  > </el-table-column>
            <el-table-column  prop="kc_jiage"  label="价格"  > </el-table-column>
           
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectbxDialog=false">取 消</el-button>
          <el-button type="primary" @click="selectPj">确 定</el-button>
        </div>
      </el-dialog>



      <el-steps :space="200" :active="1"   align-center style="margin-bottom:20px">
        <el-step title="发起申请" icon="el-icon-edit-outline"></el-step>
        <el-step title="审核" ></el-step>
        <el-step title="更换维修"></el-step>
        <el-step title="审核"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="baoxiuform" ref="bxForm" :rules="bxrules" >


      <el-form-item label="维修配件选择" prop="peijian" label-width="120px" >
        <el-button   icon="el-icon-plus" @click="selectDialog">选择</el-button>
        <div v-show="baoxiuform.peijianCode!=''">
          <el-tag  size="mini"   v-if="baoxiuform.peijianCode.indexOf('cpu')!=-1">CPU</el-tag>
          <el-tag   size="mini" v-if="baoxiuform.peijianCode.indexOf('yp')!=-1">硬盘</el-tag>
          <el-tag   size="mini" v-if="baoxiuform.peijianCode.indexOf('nc')!=-1">内存</el-tag>
          <el-tag   size="mini" v-if="baoxiuform.peijianCode.indexOf('xk')!=-1">显卡</el-tag>
          <el-tag   size="mini" v-if="baoxiuform.peijianCode.indexOf('zb')!=-1">主板</el-tag>
          <el-tag  size="mini" v-if="baoxiuform.peijianCode.indexOf('jp')!=-1">键盘</el-tag>
          <el-tag  size="mini" v-if="baoxiuform.peijianCode.indexOf('sb')!=-1">鼠标</el-tag>
          <el-tag  size="mini" v-if="baoxiuform.peijianCode.indexOf('xsq')!=-1">显示器</el-tag>
        </div>
      </el-form-item>

 
        <el-form-item label="故障描述"   prop="miaoshu" label-width="120px" >
          <el-input v-model="baoxiuform.miaoshu" type="textarea"    clearable  ></el-input>
        </el-form-item>
        <el-form-item label="审核人" label-width="120px"  prop="shenheren" >
          <el-select v-model="baoxiuform.shenheren" placeholder="请选择审核人">
            <el-option  v-for="item in shenheren" :label="item.admin_username" :key="item.admin_id"   :value="item.admin_id"> </el-option>
          </el-select>
        </el-form-item>
 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small"  @click="dialogBaoxiu = false">取 消</el-button>
        <el-button size="small"  type="primary" @click="tijiaoShenhe">提 交</el-button>
      </div>
    </el-dialog>



  </div>
</template>
 

<script>
import { getsxsInfo} from '@/api/trainingroom'
import { getpjInfo} from '@/api/kucun'
import { getshebeiInfo , excelUpload ,downExcel, addsb,editsb,deleteSbByid,getshrInfo,addbx} from '@/api/shebei'
import UploadExcelComponent from '@/components/UploadExcel/index.vue' 
import {   getPeijianAll} from '@/api/kucun'
  export default {
    name:'shebei',
    components: { UploadExcelComponent },
    data() {
      return {
        pjSelection:[],
        selectbxDialog:false,
        loadingbx:true,
        full:true,
        rowid:'',
        shenheren:[],
        peijian:[],
        tableData_pj:[],
        dialogBaoxiu:false,
        editadminid:'',
        formLabelWidth:'80px',
        sxsname:'',
        downloadLoading:false,  
        dialogFormVisible:false,
        dlgtitle:'',
        tableData:[],
        baoxiuform:{
          kucunID:'',
          peijianCode:'',
          miaoshu:'',
          shenheren:''
        },
        form:{
          sxsid:'',
          code:'',
          cpu:'',
          neicun:'',
          yingpan:'',
          xianka:'',
          jianpan:'',
          shubiao:'',
          xianshiqi:'',
          beizhu:''
        },
        loading:true,
        filter_flag:[
          { text: '正常', value: '0' },
          { text: '维修中', value: '1' }
        ],
        rules: {
          code: [{ required: true, message: '请输入设备编号信息', trigger: 'blur' }],
          cpu: [{ required: true, message: '请输入CPU信息', trigger: 'blur' }],
          neicun: [{ required: true, message: '请输入内存信息', trigger: 'blur' }],
          yingpan: [{ required: true, message: '请输入硬盘信息', trigger: 'blur' }],
          xianka: [{  required: true, message: '请输入显卡信息', trigger: 'blur' }],
          jianpan: [{ required: true, message: '请输入键盘信息', trigger: 'blur' }],
          shubiao: [{ required: true, message: '请输入鼠标信息' }],
          xianshiqi: [{ required: true, message: '请输入显示器信息' }],
        },
        bxrules: {
          kucunID: [{ required: true,  trigger: 'blur' }],
          miaoshu: [{ required: true, message: '请输入故障描述', trigger: 'blur' }],
          shenheren: [{ required: true, message: '请选择审核人', trigger: 'blur' }]
        }
      }
    },
    created:function(){
      this.getsxsName();
      this.getallShebei();
      this.getbaoxiuInfo();
    },
    methods:{
      filterTag(value, row) {
        return row.c_flag == value;
         
      },
      getsxsName(){
        getsxsInfo(this.$route.params.id).then((res) => {
            this.sxsname=res.data['sxs_name'];
        }) 
      },
      getallShebei(){
        getshebeiInfo(this.$route.params.id).then((res) => {
          if(res.data!=-1){
            this.tableData=res.data;
          
          }
          this.loading=false;
        }) 
      },
      addshebei(){
        this.dlgtitle='新增设备';
        this.dialogFormVisible=true

      },
      editsb(row){
        this.dialogFormVisible=true;
        this.dlgtitle='修改设备信息';
        this.form.code=this.tableData[this.tableData.indexOf(row)].c_code;
        this.form.cpu=this.tableData[this.tableData.indexOf(row)].c_cpu;
        this.form.neicun=this.tableData[this.tableData.indexOf(row)].c_neicun;
        this.form.xianka=this.tableData[this.tableData.indexOf(row)].c_xianka;
        this.form.yingpan=this.tableData[this.tableData.indexOf(row)].c_yingpan;
        this.form.xianshiqi=this.tableData[this.tableData.indexOf(row)].c_xianshiqi;
        this.form.jianpan=this.tableData[this.tableData.indexOf(row)].c_jianpan;
        this.form.shubiao= this.tableData[this.tableData.indexOf(row)].c_shubiao;
        this.form.beizhu=this.tableData[this.tableData.indexOf(row)].c_beizhu;

        this.editadminid=this.tableData[this.tableData.indexOf(row)].c_id;

      },
      addeditsxs(){
        this.$refs['sbaddForm'].validate((valid) => {
          if (valid) {
            if(this.dlgtitle=='新增设备'){
              this.form.sxsid=this.$route.params.id;
              addsb(this.form).then((response) => {
                  if(response.data){
                    this.$message({message: '添加成功',type: 'success'});
                    this.$refs['sbaddForm'].resetFields();
                    this.getallShebei();
                  }
              }).catch(() => {})
            }else{
              editsb(this.form,this.editadminid).then((response) => {
                  if(response.data){
                    this.$message({message: '修改成功',type: 'success'});
                    this.$refs['sbaddForm'].resetFields();
                    this.getallShebei();
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
        if(this.tableData[this.tableData.indexOf(row)].c_flag==1){
           this.$message.error('维修中的设备不允许删除!');         
           return;
        }

        this.$confirm('确认删除该条设备信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
        deleteSbByid(this.tableData[this.tableData.indexOf(row)].c_id).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '删除成功!'});
              this.tableData.splice(this.tableData.indexOf(row), 1); 
            }
         
          })
        }).catch(() => {
             console.log('123')

        });
      },
      downExcel(){
        downExcel().then((res) => {
            if (res.data) {
             console.log(res.data)
              window.location.href=res.data;
              this.$message({type: 'success',message: '下载模板成功!'});
            }else{
                this.$message.error('下载模板失败!');                
            }
        }) 
      },
 
      handleSuccess({ results, header }) {
       
        excelUpload(results,this.$route.params.id).then((res) => {
            if (res.data) {
                this.getallShebei();
                this.$message({type: 'success',message: res.msg});      
            }else{
                this.$message.error(res.msg);                

            }
        }) 
      },
      handleDownload(){
            if(this.tableData.length==0){
                this.$message.error('暂无数据可导出!');                
                return false;
            }
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = ['编号', '内存','CPU', '硬盘', '显卡', '键盘','鼠标', '显示器', '状态', '备注' ]
                const filterVal = ['c_code', 'c_neicun', 'c_cpu', 'c_yingpan', 'c_xianka', 'c_jianpan','c_shubiao','c_xianshiqi','c_flag','c_beizhu']
                const list = this.tableData
                const data = this.formatJson(filterVal, list)
                excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: this.sxsname+'设备明细表',
                autoWidth: true,
                bookType: 'xlsx'
                })
                this.downloadLoading = false
            })
            this.$message({type: 'success',message: '导出数据成功!'});

      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
            return parseTime(v[j])
            } else {
            return v[j]
            }
        }))
      },
      getbaoxiuInfo(){
        getpjInfo().then((res) => {
          if(res.data!=-1){
            this.peijian=res.data;
          }
        }) 
        getshrInfo().then((res) => {
           if(res.data!=-1){
            this.shenheren=res.data;
          }
        })
      },
      baoxiu(row){
        if(this.tableData[this.tableData.indexOf(row)].c_flag!=0){
           this.$message.error('该设备已处于维修中....');         
           return;
        }
        this.dialogBaoxiu=true;
        this.rowid=this.tableData.indexOf(row);
        this.editadminid=this.tableData[this.tableData.indexOf(row)].c_id;
      },
      tijiaoShenhe(){
        if(this.pjSelection.length==0){
          this.$message.error('请先选择需要维修的配件!');
          return;
        }
        this.$refs['bxForm'].validate((valid) => {
          if (valid) {
              addbx(this.baoxiuform,this.editadminid).then((response) => {
                  if(response.data){
                    this.$message({message: '提交成功',type: 'success'});
                    this.$refs['bxForm'].resetFields();
                    this.tableData[this.rowid].c_flag=1;
                  }
              }).catch(() => {})  
              this.dialogBaoxiu=false;          
          }
           
        })
      },
      selectDialog(){
         
        this.selectbxDialog=true;
        getPeijianAll(0).then((res) => {
          if(res.data!=-1){
           this.tableData_pj=res.data;
          }
          this.loadingbx=false;

        }) 
      } ,
      handleSelectionChange(val) {
        this.pjSelection = val;
 
      },
      selectPj(){
        if(this.pjSelection.length==0){
          this.$message.error('请先选择需要维修的配件!');
          return;
        }
        this.baoxiuform.kucunID='';
        this.baoxiuform.peijianCode='';

        for(var i=0;i<this.pjSelection.length;i++){
          this.baoxiuform.kucunID+=this.pjSelection[i]['kc_id'].toString();
          this.baoxiuform.peijianCode+=this.pjSelection[i]['pj_code'];
          if(i!=this.pjSelection.length-1){
            this.baoxiuform.kucunID+=',';
            this.baoxiuform.peijianCode+=',';
          }

        }
    

        this.selectbxDialog=false; 

      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  >
.sb_btnDiv{
  float:right;
}
.jfName{
  color: #409EFF;
  font-size: 24px;
}
.excelupbtn{
  display: inline-block
}
 
.el-table{
  cursor:pointer;
}
.el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid#D1D1D1;
}
.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #D1D1D1;
}
.el-table--border, .el-table--group {
    border: 1px solid#D1D1D1;
}
</style>


