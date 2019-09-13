/*
  npm install gulp gulp-ssh
 */
const gulp = require('gulp')
const GulpSSH = require('gulp-ssh')
// 需要上传到服务器的路径
const remotePath = '/root/myblog/www/nuxtApp/'
const config = {
  ssh: { // 正式
    host: '47.98.200.192',
    port: 22,
    username: 'root',
    password: 'octobershen~19951006'
  },
  remotePath: remotePath,
  commands: [
    // 删除现有文件
    `rm -rf ${remotePath}nuxt.config.js`,
    `rm -rf ${remotePath}package.json`,
    `rm -rf ${remotePath}server/*`,
    `rm -rf ${remotePath}static/*`,
    `rm -rf ${remotePath}.nuxt/*`
  ]
}

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config.ssh
})

/**
 * 上传前先删除服务器上现有文件...
 */
gulp.task('execSSH', async() => {
  console.log('删除服务器上现有文件...')
  return await gulpSSH.shell(config.commands, { filePath: 'commands.log' }).pipe(gulpSSH.dest(config.remotePath))
})

/**
 * 上传文件到服务器
 */

gulp.task('deploy', gulp.series('execSSH', async() => {
  console.log('2s后开始上传文件到服务器...')
  await setTimeout(() => {
    gulp.src(['./.nuxt/**']).pipe(gulpSSH.dest(`${config.remotePath}/.nuxt/`))
    gulp.src(['./server/**']).pipe(gulpSSH.dest(`${config.remotePath}/server/`))
    gulp.src(['./static/**']).pipe(gulpSSH.dest(`${config.remotePath}/static/`))
    return gulp.src([ './nuxt.config.js', './package.json']).pipe(gulpSSH.dest(config.remotePath))
  }, 2000)
}))
