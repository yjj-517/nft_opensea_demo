 <template>
  <div id="Login">
    <div class="login_box">
      <h1>欢迎来到NFT管理系统</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  // 模板引入
  components: {},
  // 数据
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "", //账号
        pass: "", //密码
      },
      rules: {
        account: [{ validator: validatePass1, trigger: "blur" }],
        pass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  // 方法
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(valid);
          console.log(this.ruleForm);
          this.$router.push({
            path: `/index/Home`,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // 创建后
  created() {},
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
};
</script>

<style lang="less" scoped>
#Login {
  width: 100%;
  height: 100%;
  background-color: #001529;
  color: #fff;
  .login_box {
    width: 30rem;
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    background-color: #002140;
    h1 {
      text-align: center;
      padding: 2rem 0 0;
    }
    .demo-ruleForm {
      margin: 2rem 0 0 -1rem;
      .el-input {
        width: 20rem;
      }
    }
  }
}
</style> 