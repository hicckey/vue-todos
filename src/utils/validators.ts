// 表单验证
import type { FormRules } from 'element-plus'

/**
 * 用户名验证规则
 */
export const usernameRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
  ],
}

/**
 * 密码验证规则
 */
export const passwordRules: FormRules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
}

/**
 * 邮箱验证规则
 */
export const emailRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
}

/**
 * 任务标题验证规则
 */
export const taskTitleRules: FormRules = {
  title: [
    { required: true, message: '请输入任务标题', trigger: 'blur' },
    { max: 100, message: '任务标题不能超过 100 个字符', trigger: 'blur' },
  ],
}
