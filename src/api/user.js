import request from "./request";

/**
 * 登录
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 * @returns {string} token 登录成功的token
 * @returns {string} refresh_token 登录成功的refresh_token
 * @returns {message} message 登录成功的message
 * 
 */
export function login({ mobile, code }) {
    return request({
        url: '/authorizations',
        method: 'POST',
        data: { mobile, code }
    })
}

/**
 * 获取用户信息		
 * @returns {string} id 用户id
 * @returns {string} name 用户名
 * @returns {string} photo 用户头像
 * @returns {string} is_media 是否是自媒体，0-否，1-是
 * @returns {string} intro 简介
 * @returns {string} certi 自媒体认证说明
 * @returns {string} art_count 发布文章数
 * @returns {string} follow_count 关注的数目
 * @returns {string} fans_count 粉丝数目	
 * @returns {string} like_count 被点赞数
 */
export const getUserInfo = () => request({
    url: '/user',
    method: 'GET',
})

/**
 * 获取用户个人信息
 * @returns {string} id 用户id
 * @returns {string} name 用户名
 * @returns {string} name	用户名		
 * @returns {string} photo	头像		
 * @returns {string} mobile	手机号		
 * @returns {string} gender	性别，0-男，1-女		
 * @returns {string} birthday	生日，格式 '2018-12-20'
 */
export const getUserProfile = () => request({
    url: '/user/profile',
    method: 'GET',
})

/**
 * 更新用户个人信息
 * @param {string} name 用户名
 * @param {string} gender 性别，0-男，1-女
 * @param {string} birthday 生日，格式 '2018-12-20'
 * @param {string} real_name 真实姓名
 * @param {string} intro 个人介绍
 * @returns {object} 更新结果
 */
export const updateProfile = ({ name, gender, birthday, real_name, intro }) => request({
    url: '/user/profile',
    method: 'PATCH',
    data: { name, gender, birthday, real_name, intro }
})


/**
 * 更新用户头像
 * @param {file} photo file 头像文件
 * @returns {string} photo 头像url
 */
export const updatePhoto = (data) => new Promise((resolve, reject) => {
    request({
        url: '/user/photo',
        method: 'PATCH',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        if (res.message === "OK") {
            resolve(res);
        } else {
            reject(res.message || "头像上传失败");
        }
    }).catch(err => {
        reject(err);
    })
})
