//导入核心模块
const path = require('path')
const fs = require('fs')

//递归 （文件夹套文件夹）的结构，直到拿到文件为止

// 获取oldFile文件夹，newFile的绝对路径
let OriginFilePath = path.resolve(__dirname,'../build')
let CopyFilePath = path.resolve(__dirname,'../../media')

//判断要创建的文件夹（newFile）是否存在，不存在就创建一个
if(!fs.existsSync(CopyFilePath)){
  fs.mkdir(CopyFilePath,err=>{
    // console.log(err)
  })
}
//传入路径
getFiles(OriginFilePath,CopyFilePath)
function getFiles(OriginFilePath){
//读取newFile文件夹下的文件
  fs.readdir(OriginFilePath,{withFileTypes:true}, async (err,files)=>{
      for(let file of files){
      	//判断是否是文件夹，不是则直接复制文件到newFile中
        if(!file.isDirectory()){
					if(/main(\.[0-9A-Za-z]{0,}){0,}\.(js|css)$/.test(file.name)) {
						const targetFileName = file.name.replace(/(main)(\.[0-9A-Za-z]{0,}){0,}(\.)(js|css)$/, '$1$3$4')
						//获取旧文件夹中要复制的文件
						const OriginFile = path.resolve(OriginFilePath,file.name);
						//获取新文件夹中复制的地方
						const CopyFile = path.resolve(CopyFilePath, targetFileName);
						console.log(CopyFile)
						if(fs.existsSync(CopyFile)) {
							await fs.unlink(CopyFile, (err) => {});
						}
						//将文件从旧文件夹复制到新文件夹中
						fs.copyFileSync(OriginFile,CopyFile);
					}
        }else{//如果是文件夹就递归变量把最新的文件夹路径传过去
					const OriginDirPath = path.resolve(OriginFilePath,file.name)
					const CopyDirPath = path.resolve(CopyFilePath,file.name)
					// fs.mkdir(CopyDirPath,(err)=>{})
          getFiles(OriginDirPath,CopyDirPath)
        }
      }
  })
}