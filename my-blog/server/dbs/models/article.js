// import mongoose from 'mongoose'
const mongoose =require('mongoose')
const Schema = mongoose.Schema
const ArticleSchema = new Schema({
  title: {
    //文章标题
    type: String
  },
  createTime: {
    type: String
  },
  cover: {
    //封面图片
    type: String
  },
  cont: {
    //内容
    type: String
  },
  md: {
    //markdown语法内容
    type: String
  },
  tag: {
    //标签
    type: String
  }
})

// export default mongoose.model('ArticleSchema', ArticleSchema);
module.exports = mongoose.model('ArticleSchema', ArticleSchema);