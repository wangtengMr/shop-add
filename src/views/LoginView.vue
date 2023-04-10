<template>
  <el-row class="box">
    <el-col :lg="16" :md="12" class="bio">
      <div>
        <div class="bip_div1">欢迎光临</div>
        <div class="bip_div2">《vue3 + viet》实战项目演示网站</div>
      </div>
    </el-col>
    <el-col
      :lg="8"
      :md="12"
      class="bg-light-50 flex items-center justify-center flex-col"
    >
      <h2 class="text-dark-50 font-bold text-3xl mb-4">欢迎回来</h2>
      <div class="mb-4">
        <span style="color: #d1d8e4" class="p-4"
          ><s>&emsp;&emsp;&emsp;</s></span
        >
        <span style="color: #d1d8e4; font-size: 12px">账号</span>
        <span style="color: #d1d8e4; font-size: 12px">密码</span>
        <span style="color: #d1d8e4" class="p-4"
          ><s>&emsp;&emsp;&emsp;</s></span
        >
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            round
            color="#626aef"
            @click="submitForm(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
// import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/http';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const data = reactive({});
    const ruleForm = reactive({
      username: '',
      password: ''
    });

    const rules = reactive({
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 6,
          message: '请输入正确用户格式',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 6,
          message: '请输入正确密码格式',
          trigger: 'blur'
        }
      ]
    });

    const ruleFormRef = ref();
    const submitForm = async (ruleFormRef) => {
      ruleFormRef.validate((valid, fields) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!', fields);
        }
      });
      login(ruleForm).then((res) => {
        console.log(res);
      });
    };
    // const submitForm = () => {
    //   ruleFormRef.value.validate((valid) => {
    //     if (!valid) {
    //       return false;
    //     }
    //     console.log('验证通过');
    //   });
    // };

    return {
      submitForm,
      ruleForm,
      rules,
      ruleFormRef
    };
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.box {
  @apply bg-indigo-500 min-h-screen;
  .bio {
    @apply flex items-center justify-center;
    .bip_div1 {
      @apply text-light-50 font-bold text-3xl mb-4;
    }
    .bip_div2 {
      @apply text-yellow-100;
    }
  }
}
</style>
