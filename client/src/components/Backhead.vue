<template>
  <div class="Header-content">
    <span style="width:230px;" class="title">在线商城管理系统</span>
    <div class="avatar">
      <el-row class="demo-avatar demo-basic">
        <el-col>
          <div class="demo-basic--circle">
            <div class="block">
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <span class="username">{{username}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">退出</el-dropdown-item>
                  <el-dropdown-item command="2">修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <Modal v-model="modelShow" title="修改密码" :closable="true" :mask-closable="false">
      <div>
        <Form :model="resetPassword" :label-width="80" ref="resetPassword" :rules="restRules">
          <FormItem label="原始密码" prop="oldPassword">
            <Input :maxlength="128" v-model="resetPassword.oldPassword" type="password" />
          </FormItem>
          <FormItem label="新密码" prop="newPassword">
            <Input :maxlength="18" v-model="resetPassword.newPassword" type="password" />
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <Input :maxlength="18" v-model="resetPassword.confirmPassword" type="password" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="closePasswordModal()">取消</Button>
        <Button
          type="warning"
          :loading="savePasswordLoading"
          @click="postResetPassword('resetPassword')"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    var username = localStorage.getItem("userInfo");
    var that = this,
      validatorOldPassword = function(rule, value, callback) {
        if (!value) {
          return callback(new Error("原始密码不能为空"));
        }
        return callback();
      },
      validatorNewPassword = function(rule, value, callback) {
        if (!value) {
          return callback(new Error("新密码不能为空"));
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(value)) {
          return callback(new Error("新密码必须为6-18位字母和数字组合"));
        } else if (that.$refs.resetPassword.model.oldPassword === value) {
          return callback(new Error("新密码不能和原始密码相同"));
        }
        return callback();
      },
      validatorConfirmPassword = function(rule, value, callback) {
        if (!value) {
          return callback(new Error("确认密码不能为空"));
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(value)) {
          return callback(new Error("确认密码必须为6-18位字母和数字组合"));
        } else if (that.$refs.resetPassword.model.newPassword !== value) {
          return callback(new Error("新密码必须和确认密码相同"));
        }
        return callback();
      };
    return {
      circleUrl: "",
      username: username,
      modelShow: false,
      savePasswordLoading: false,

      resetPassword: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      restRules: {
        oldPassword: [
          {
            required: true,
            validator: validatorOldPassword,
            trigger: "blur,change"
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validatorNewPassword,
            trigger: "blur,change"
          }
        ],
        confirmPassword: [
          {
            required: true,
            validator: validatorConfirmPassword,
            trigger: "blur,change"
          }
        ]
      }
    };
  },
  methods: {
    handleCommand: function(command) {
      var that = this;
      if (command === "1") {
        that.$router.push("/backmanagementLogin");
      } else {
        that.modelShow = true;
      }
    },
    postResetPassword(name) {
      var that = this,
        data;
      data = {
        aname: localStorage.getItem("userInfo"),
        newPassword: this.resetPassword.newPassword
      };
      this.$refs[name].validate(valid => {
        if (valid) {
          this.axios
            .post("/backmanagement/updatepwd", data)
            .then(res => {
              if(res&&res.data){
                if(res.data.code===1){

                  this.modelShow=false;
                  this.$Message.success('修改成功');
                  this.$router.push('/backmanagementLogin');
                }
              }
            })
            .catch(function(err) {

            });
        }
      });
    }
  }
};
</script>
<style>
.Header-content {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
.el-dropdown-link {
  color: #333;
  font-size: 18px;
}
.Header-content span {
  color: #fff;
  font-size: 12px;
  text-align: center;
}
.Header-content span:nth-child(1) {
 font-size: 18px;
}
.title {
  background-color: #21a5ff;
}
.el-dropdown-menu {
  top: 36px !important;
  left: 1386px !important;
}
.block {
  /* width: 60px; */
  margin-right: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.block span {
  font-size: 18px;
  color: black;
}
</style>