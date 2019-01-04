<template>
  <div class="app-container">
    <h4 class='warntext'>{{warnText}}</h4>
    <div class="btnDiv"  >
      <el-button type="primary" size="small" v-if="paikeDate" icon="el-icon-circle-plus" @click="addkc">添加</el-button>
    
    </div>
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
              <el-form-item label="机房位置:">
                <span>{{ props.row.sxs_building }}---{{ props.row.sxs_room }}---{{ props.row.sxs_name }}</span>
              </el-form-item>
              <br/>
              <el-form-item label="重复周次:">
                <span v-show="props.row.kc_weeks==null">每周重复 </span>
                <span v-show="props.row.kc_weeks!=null">第{{ props.row.kc_weeks }}周 </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

      <el-table-column   label="序号" width="50">
          <template slot-scope="scope">
            {{scope.$index+1}} 
          </template>
      </el-table-column>
      <el-table-column   prop="yx_name" label="学院"  > </el-table-column>
      <el-table-column  prop="kc_year"  label="级别"   > </el-table-column>
      <el-table-column  prop="zy_name"  label="专业"   > </el-table-column>
      <el-table-column     label="班级"   >
        <template slot-scope="scope">
          <span>{{scope.row.bj_name}}班</span>
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
      <el-table-column  prop="kc_name"  label="课程名称"  > </el-table-column>
      <el-table-column fixed="right"  label="操作"   >
        <template slot-scope="scope">
          <el-button type="text" size="medium " @click="editkc(scope.row)" icon="el-icon-edit"></el-button>
          <el-button type="text" size="medium " @click="deleteRow(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    


    <el-dialog :title="dlgtitle" :visible.sync="dialogFormVisible">
      <el-dialog title="机房选择" :visible.sync="selectSxsDialog" :fullscreen='full' center append-to-body>
          <div style="margin-bottom:15px;font-size:16px;color:red"> 周{{formInline.zhouci}}/第{{formInline.jieci}}节未被占用机房</div>
          <el-table :data="sxsData" border stripe style="width: 100%"  >

            <el-table-column label="选择" width="70" center>
                <template  slot-scope="scope">
                    <el-radio :label="scope.row.sxs_id" v-model="selectSxsRadio" @change.native="getCurrentRow(scope.$index,scope.row)">&nbsp</el-radio>
                </template>
            </el-table-column>
    

            <el-table-column   label="序号" width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}} 
                </template>
            </el-table-column>
            <el-table-column  prop="sxs_building"  label="教学楼"  > </el-table-column>
            <el-table-column  prop="sxs_room"  label="房间号"  > </el-table-column>
            <el-table-column   prop="sxs_name" label="名称"  > </el-table-column>
            <el-table-column  prop="sxs_capacity"   label="容量"   ></el-table-column>
            <el-table-column  prop="sxs_soft"  label="已装软件"   :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column  prop="sxs_managername"  label="管理员"   > </el-table-column>
            <el-table-column  prop="sxs_managerphone"  label="联系方式"   > </el-table-column>
          
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectSxsDialog=false">取 消</el-button>
          <el-button type="primary" @click="selectSxs">确 定</el-button>
        </div>
      </el-dialog>

     <el-form  :inline="true" :label-position="labelPosition"   :model="formInline" ref="kcaddForm" :rules="rules"  > 
      <el-form-item label="本节课本学期是否每周重复" prop="status">
        <el-select @change="changeYesNO" v-model="formInline.status" placeholder="选择">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择本节课上课周次" prop="weeks" v-show="showWeek">
        <el-checkbox-group v-model="formInline.weeks"  >
          <el-checkbox v-for="item in weeks" :label="item" :key="item">第{{item}}周</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="年级"   prop="year"  >
          <el-date-picker @change='slectYear' v-model="formInline.year" type="year" value-format='yyyy'  placeholder="选择年级">
          </el-date-picker>
      </el-form-item>
      <el-form-item label="专业" prop="zhuanye"  >
        <el-select @change='selectZhuanye' v-model="formInline.zhuanye"   placeholder="专业"  >
          <el-option v-for="item in zhuanyedata"  :key="item.zy_id"  :label="item.zy_name" 
           :value="item.zy_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-select v-model="formInline.class"   placeholder="班级">
          <el-option v-for="item in classdata"  :key="item.bj_id"  :label="item.bj_name" 
           :value="item.bj_id">
          </el-option>
        </el-select>
      </el-form-item>
 
      <el-form-item label="星期" prop="zhouci">
        <el-select v-model="formInline.zhouci" placeholder="星期">
          <el-option label="周一" value="1"></el-option>
          <el-option label="周二" value="2"></el-option>
          <el-option label="周三" value="3"></el-option>
          <el-option label="周四" value="4"></el-option>
          <el-option label="周五" value="5"></el-option>
          <el-option label="周六" value="6"></el-option>
          <el-option label="周日" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="节次" prop="jieci">
        <el-select v-model="formInline.jieci"   placeholder="节次">
          <el-option v-for="item in jieci"  :key="item.value"  :label="item.label" 
           :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="formInline.name" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="教师名称" prop="teacher">
        <el-input v-model="formInline.teacher" placeholder="教师名称"></el-input>
      </el-form-item>
 
      <el-form-item label="机房" prop="sxs">
        <el-button   icon="el-icon-plus" @click="selectDialog">{{sxsname}}</el-button>
        <el-input v-model="formInline.sxs"  v-show="false"></el-input>
 
      </el-form-item>

  

    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addeditKecheng">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
 

<script>
 
import { getclassByyear, getclassByzy, getWeeks} from '@/api/table'
import { addkecheng, getAllkc, deletekbByid, editkecheng} from '@/api/paike'
import { addsxs, getbuilding, getsoft, getAllsxs, getsxsPk } from '@/api/trainingroom'
import checkPermission from '@/utils/permission' // 权限判断函数 v-if="checkPermission(['admin'])"
import Cookies from 'js-cookie'
  export default {
  
    data() {
      return {
        paikeDate:true,
        warnText:'',
        editadminid:'',
        dlgtitle:'',
        showWeek:false,
        loading:false,
        labelPosition:'right',
        dialogFormVisible:false,
        selectSxsRadio:0,
        selectSxsRadioText:'',
        full:true,
        sxsData: [],
        selectSxsDialog: false,
        jieci: [{
            value: '1',
            label: '上午 第1大节'
          }, {
            value: '2',
            label: '上午 第2大节'
          },
          {
            value: '12',
            label: '上午 第1-2大节'
          }, {
            value: '3',
            label: '下午 第3大节'
          }, {
            value: '4',
            label: '下午 第4大节'
          }, {
            value: '34',
            label: '下午 第3-4大节'
          }],
        zhuanyedata:[],
        classdata:[],
        weeks:['1','2'],
        sxsname:'选择',
        formInline: {
          year:'',
          zhouci: '',
          jieci: '',
          name: '',
          teacher: '',
          class:  '',
          zhuanye:  '',
          sxs: '',
          status:'是',
          weeks:[]

        },
        rules: {
          year: [{ required: true}],
          zhouci: [{ required: true}],
          jieci: [{ required: true}],
          name: [{ required: true}],
          teacher: [{ required: true}],
          class: [{ required: true}],
           status: [{ required: true}],
           zhuanye: [{ required: true}],

        },
        tableData:[]
      }
    },
    created:function(){
      this.getweeks();
      this.getkechengs();
      this.checkDate();
    },
     methods:{
      checkPermission,
      checkDate(){
        if(Cookies.get('admin_role')!='4'){
          return;
        }
        var beginDate=Cookies.get('admin_start')/1000;
        var endDate=Cookies.get('admin_end')/1000;
        var nowDate = Date.parse(new Date())/1000;

        if (nowDate<beginDate||nowDate>endDate) {
          this.warnText="当前时间不在您允许的排课时间内("+this.formatDateTime(beginDate)+'至'+this.formatDateTime(endDate)+")，如需更改时间请联系管理员！";
          this.paikeDate=false;
        }else{
          this.warnText='您的排课时间为：'+this.formatDateTime(beginDate)+'至'+this.formatDateTime(endDate)+",请在当前时间内完成排课！";
          this.paikeDate=true;
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
      getweeks(){
       getWeeks().then(response => {
              if(response.data){
                if(response.data==-1){
                  this.weeks=[];
                }else
                  this.weeks = response.data;
              }
              
          })
      },
      getkechengs(){
       getAllkc().then(response => {
              if(response.data){
                if(response.data==-1){
                  this.tableData=[];
                }else
                  this.tableData = response.data;
              }
              
          })
      },
      selectDialog(){
        if(this.formInline.zhouci==''||this.formInline.jieci==""){
            this.$message.error('请先选择上课星期，节次!');
            return;
        }
        getsxsPk(this.formInline).then((res) => {
            this.sxsData=res.data;
          
        })
        this.selectSxsDialog=true;
      },
      addkc(){

        if(this.weeks.length==0){
           this.$message.error('本学期信息未设置，请联系管理员设置学期信息！');
           return;
        }

        this.dialogFormVisible=true;
        this.dlgtitle='新增排课';
      },
      editkc(row){
        this.dlgtitle='修改排课信息';
        this.dialogFormVisible=true;
        this.slectYear(this.tableData[this.tableData.indexOf(row)].kc_year);
        this.selectZhuanye(this.tableData[this.tableData.indexOf(row)].zy_id);

        this.formInline.year=this.tableData[this.tableData.indexOf(row)].kc_year;
        this.formInline.zhouci=this.tableData[this.tableData.indexOf(row)].kc_day;
        this.formInline.name=this.tableData[this.tableData.indexOf(row)].kc_name;
        this.formInline.teacher=this.tableData[this.tableData.indexOf(row)].kc_teacher;
        this.formInline.class=this.tableData[this.tableData.indexOf(row)].bj_id;
        this.formInline.jieci=this.tableData[this.tableData.indexOf(row)].kc_jieci;
        this.formInline.zhuanye=this.tableData[this.tableData.indexOf(row)].kc_zyid;
        this.formInline.sxs=this.tableData[this.tableData.indexOf(row)].kc_sxsid;
        this.formInline.status=this.tableData[this.tableData.indexOf(row)].kc_status;
        this.formInline.weeks=JSON.parse(this.tableData[this.tableData.indexOf(row)].kc_weeks);
        this.changeYesNO(this.formInline.status);
        this.editadminid=this.tableData[this.tableData.indexOf(row)].kc_id;
        

      },
      addeditKecheng(){
        this.$refs['kcaddForm'].validate((valid) => {
          if (valid) {
            if (this.dlgtitle=='新增排课') {
              if(this.selectSxsRadio==0){
                  this.$message.error('请选择一个机房!');
                  return;
              }
              addkecheng(this.formInline).then((response) => {
                  if(response.data){
                
                    this.$message({message: '添加成功',type: 'success'});
                    //this.$refs['kcaddForm'].resetFields();
                    this.sxsname='选择';
                    this.selectSxsRadio=0;
                    this.formInline.status='是';
                    this.formInline.jieci='';
                    this.formInline.teacher='';
                    this.formInline.name='';
                    this.showWeek=false;
                    this.getkechengs();
                    this.$refs['kcaddForm'].resetFields();
                  }
              }).catch(() => {})               
            }else{
              editkecheng(this.formInline,this.editadminid).then((response) => {
                  if(response.data){
                
                    this.$message({message: '修改成功',type: 'success'});
                    this.$refs['kcaddForm'].resetFields();
                   
                    this.selectSxsRadio=0;
                  
                    this.showWeek=false;
                    this.getkechengs();
                    this.dialogFormVisible=false;


                  }
              }).catch(() => {}) 
            }
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      selectSxs(){
        if(this.selectSxsRadio==0){
            this.$message.error('请选择一个机房!');
        }else{
            this.formInline.sxs=this.selectSxsRadio;
            this.sxsname=this.selectSxsRadioText;
            this.selectSxsDialog=false;
        }
      },
      getCurrentRow(val,row){
          this.selectSxsRadioText = this.sxsData[this.sxsData.indexOf(row)].sxs_name;

      },
      slectYear(val){
        this.zhuanyedata=[];
        this.classdata=[];
        this.formInline.class='';
        this.formInline.zhuanye='';
        getclassByyear(val,'editor').then(response => {
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
      changeYesNO(val){
        if(val==='是'){
          this.showWeek=false;

        }else{
          this.showWeek=true;
        }
      },
      deleteRow(row){
        this.$confirm('确认删除该条记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletekbByid(this.tableData[this.tableData.indexOf(row)].kc_id).then(response => {
            if(response.data){
              this.$message({type: 'success',message: '删除成功!'});
              this.tableData.splice(this.tableData.indexOf(row), 1); 
            }
          
          })
        }).catch(() => {});
      }, 
    },
   
  }
</script>

<style    >
.el-table {
 color: black;
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
.warntext{
  color: red;
  margin: 5px
   
}
</style>


