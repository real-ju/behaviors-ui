# behaviors-ui

### 安装

npm install behaviors-ui

### 使用方法

- 在 uni-app 中配置 easycom（推荐）

```json
"^be-(.*)": "behaviors-ui/components/be-$1/index.vue"
```

- 自行引入组件

```javascript
import { Button } from "behaviors-ui";
Vue.use(Button);
```

或者

```javascript
import Button from "behaviors-ui/components/be-button/index.vue";
Vue.component("be-button", Button);
```
