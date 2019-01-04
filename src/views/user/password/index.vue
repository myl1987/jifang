<template>
  <div class="pwd-container">
    <el-form ref="pwdForm" :model="pwdForm" :rules="Rules"  >
     
        <el-form-item label="请输入旧密码" prop="oldpwd">
            <el-input v-model="pwdForm.oldpwd"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="newpwd">
            <el-input v-model="pwdForm.newpwd" ></el-input>
        </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary"  style="width:100%" @click="editPwd">
          确定修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {  editPwd } from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      pwdForm: {
        oldpwd: '',
        newpwd: ''
      },
      Rules: {
        oldpwd: [{ required: true, trigger: 'blur',  }],
        newpwd: [{ required: true, trigger: 'blur',  }]
      },
      loading: false,

    }
  },
 
  methods: {
      editPwd(){
        this.$refs['pwdForm'].validate((valid) => {
            if (valid) {
                editPwd(this.pwdForm).then(response => {
                    switch (response.data) {
                        case 1:
                        this.$message.error(response.msg);  
                            break;
                        case 2:
                        this.$message({type: 'success',message: response.msg}); 
                            break;
                        case 3:
                            this.$message.error( '修改失败!');
                            break;           
                        default:
                            break;
                    }
                    this.$refs['pwdForm'].resetFields();

                    this.loading=false;
                })
            }
      })

  }
}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.pwd-container{
    width: 300px;
    margin: 0 auto;
    margin-top: 50px
}
</style>

