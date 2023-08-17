# behaviors-ui

### 环境要求

- uni-app
- vue3
- ts

### 安装

npm install behaviors-ui

### 使用方法

- 在 uni-app 中配置 easycom（推荐）

```json
"^be-(.*)": "behaviors-ui/components/be-$1/index.vue"
```

- 自行引入组件

```javascript
import { Button } from 'behaviors-ui';
app.use(Button);
```

或者

```javascript
import { Button } from 'behaviors-ui';
app.component('be-button', Button);
```
