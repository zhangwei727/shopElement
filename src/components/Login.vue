<template>
  <div class="login_content">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" class="logo" />
      </div>
      <el-form :model="loginForm" :rules="formRules" ref="loginFormRef" class="form">
        <el-form-item prop="username" class="form-input">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-input">
          <el-input
            v-model="loginForm.password"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-btns">
          <el-button type="primary" @click="goLogin">登录</el-button>
          <el-button type="info" @click="resetFormData">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    resetFormData() {
      //表单重置resetFields()
      this.$refs.loginFormRef.resetFields();
    },
    goLogin() {
      // 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.loginFormRef.validate(valid => {
        console.log(valid);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login_content {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px #ddd;
      padding: 10px;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -65px;
      background-color: #fff;
      .logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .form-btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
