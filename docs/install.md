# 安装

## uni-app 各平台支持

| H5  | 微信小程序 |    APP    |
| :-: | :--------: | :-------: |
|  √  |     √      | √(未测试) |

## 项目环境要求

- uni-app Vue3+TS 版本（墙裂推荐使用[uni-app-boot](https://github.com/real-ju/uni-app-boot)搭建项目）
- Sass

## NPM 安装

在项目根目录执行如下命令即可：

```shell
# 如果您的根目录没有package.json文件的话，请先执行如下命令：
# npm init -y

npm install behaviors-ui
```

## 配置

### 在 pages.json 中配置 easycom（推荐）

```json
"easycom": {
  "custom": {
    "^be-(.*)": "behaviors-ui/components/be-$1/index.vue"
  }
}
```

### 自行引入组件

- 全量引入

```js
import BehaviorsUI from 'behaviors-ui';
app.use(BehaviorsUI);
```

- 按需引入

```js
import { Button } from 'behaviors-ui';
app.use(Button); // 或者 app.component('be-button', Button);
```

### 配置 mergeVirtualHostAttributes

由于 [Attributes 透传机制](/note#attributes-透传机制) 在各平台表现不一致，需要在`manifest.json`中配置：

```json
{
  "mp-weixin": {
    "mergeVirtualHostAttributes": true
  }
}
```
