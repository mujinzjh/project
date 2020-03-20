<template>
  <div class="login-c">
      <shy class="shap"></shy>
    <el-row type="flex" class="row-bg" justify="center" align="bottom">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-col>
          <h1>商城后台管理系统</h1>
        </el-col>
        <el-form-item label="帐号" prop="username">
          <el-input type="text" v-model="ruleForm.username" :span="12" placeholder="请输入帐号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="subButton">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              size="medium"
              style="width:100%"
            >登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-row>
  
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入用户名"));
      } else if (value.length < 5) {
        return callback(new Error("用户名输入错误，请确认后再次输入"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码长度在8-16位，请再次输入密码"));
      }
      callback();
    };
    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var modelObj = this.$refs[formName].model,
            date = new Date();
          localStorage.setItem("userInfo", modelObj.username);
          this.axios
            .get("/backmanagement/login", {
              params: modelObj
            })
            .then(res => {
              if (res && res.data && res.status === 200) {
                if (res.data.code === 1) {
                  localStorage.setItem("loginTime", date);
                  this.$router.push("backManagementMain/baseinfo");
                  this.$notify({
                    title: "登录成功",
                    type: "success"
                  });
                } else {
                  this.$notify.error({
                    title: "密码错误",
                    type: "error",
                    duration: 4500
                  });
                }
              } else {
                this.$notify.error({
                  title: "获取数据失败",
                  type: "error",
                  duration: 4500
                });
              }
            })
            .catch(function(err) {
              this.$notify.error({
                title: "获取数据失败",
                type: "error",
                duration: 4500
              });
            });
        } else {
          this.$notify.error({
            title: "error submit",
            type: "error",
            duration: 4500
          });
          return false;
        }
      });
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.shap{
  width: 100%;
  height: 100%;
  position: relative;
}
.login-c {
  width: 100%;
  height: 752px;
  background-image: url("../../assets/timg .jpg");
  /* display: flex;
  align-items: center; */
}
.login-c h1 {
  text-align: center;
  color: #fff;
  font-size: 48px;
  margin-bottom: 30px;
}
.row-bg {
  color: #fff;
  font-size: 18px;
  /* margin: 0 auto; */
  position: absolute;
  top: 200px;
  left: 40%;
}
.el-form-item__content {
  margin-left: 40px !important;
}
.el-form-item__label {
  width: 40px !important;
  text-align: center;
  color: #fff;
}
</style>