1. create-react-app monitor-ui
2. npm run eject


3.npm install --save antd
4.npm install babel-plugin-import --save-dev


## 增加webpack alias
```
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        '@src': path.resolve(__dirname, '../src'),
        '@api': path.resolve(__dirname, '../src/component/api')
      },
```

## 不能识别webpack alias?
1. 安装path intellisense?
2. 增加jsconfig.json
```
{
  "compilerOptions": {
    "module": "commonjs",
    "paths": {
      "@src/*": ["./src/*"],
      "@api/*": ["./src/component/api/*"]
    }
  }
}
```

## 与springboot 打成一个包部署
1. 修改paths.js
```
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');//将 / 修改为context-path
  return ensureSlash(servedUrl, true);
}
```
2. 执行  `npm run build`
3. 将build 文件夹copy到springboot的resources文件夹下
