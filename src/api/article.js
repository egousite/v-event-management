import request from '@/api/request'

/**
 * 获取频道列表
 * @returns 
 */
export const getChannelList = () => request({
    url: '/channels',
    method: 'GET',
})

/**
 * 获取文章列表
 * * Query 参数
 * @param {String} status 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部
 * @param {String} channel_id 必须 频道id，不传为全部
 * @param {String} begin_pubdate 起始时间，格式为yyyy-MM-dd HH:mm:ss
 * @param {String} end_pubdate 截止时间，格式为yyyy-MM-dd HH:mm:ss
 * @param {String} page 页码 默认为1页
 * @param {String} per_page 每页数量 不传为默认10
 * @returns Object
 */
export const getArticleList = (params) => request({
    url: '/mp/articles',
    method: 'GET',
    params
})


/**
 * 获取文章详情
 * @param {String} target 文章id
 * @returns Object data
 */
export const getArticleDetail = (target) => request({
    url: `/mp/articles/${target}`,
    method: 'GET'
})


/**
 * 发布文章
 * @param {string} title        必须    文章标题
 * @param {string} content      必须    文章内容
 * @param {object} cover        必须    文章封面
 * @param {string} cover.type   必须    封面类型 -1:自动，0-无图，1-1张，3-3张	
 * @param {array} cover.images  必须    封面图片地址，item 类型: string	
 * @param {number} channel_id   必须    文章所属频道id
 * @param {String} draft        可选    是否存为草稿，true是 false否
 * @returns 
 */
export const publishArticle = (data) => request({
    url: `/mp/articles`,
    method: 'POST',
    data
})

/**
 * 编辑文章
 * @param {string} target 文章id
 * @param {string} title        必须    文章标题
 * @param {string} content      必须    文章内容
 * @param {object} cover        必须    文章封面
 * @param {string} cover.type   必须    封面类型 -1:自动，0-无图，1-1张，3-3张	
 * @param {array} cover.images  必须    封面图片地址，item 类型: string	
 * @param {number} channel_id   必须    文章所属频道id
 * @param {String} draft        可选    是否存为草稿，true是 false否
 * @returns 
 */
export const editArticle = (target, data) => request({
    url: `/mp/articles/${target}`,
    method: 'PUT',
    data
})

/**
 * 上传文章图片
 * @param {file} image 必须    图片file
 * @returns {string} url 上传成功的图片url
 * // 请求参数
 * cover 中 传递样例为   
 * { type: 0, images: []  }（无图） 
 * { type: 1, images: [“地址1”]  }（单图）  
 * { type: 3, images: [“地址1”，‘地址2’，‘地址3’]  }
 */
export const uploadImages = (data) => new Promise((resolve, reject) => {
    request({
        url: '/upload',
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        if (res.message === "OK") {
            resolve(res);
        } else {
            reject(res.message || "图片上传失败");
        }
    }).catch(err => {
        reject(err);
    })
})

/**
 * 删除文章
 * @param {string} target 文章id
 * @returns 
 */
export const deleteArticle = (target) => request({
    url: `/mp/articles/${target}`,
    method: 'DELETE'
})
