/**
 * 为了兼容uni-app奇怪的模块路径规则，需要补全index.js，否则会解析.vue
 * uni-app小程序平台不能用Vue.use注册全局组件
 */
import Icon from './be-icon/index.js';
import Button from './be-button/index.js';
import Image from './be-image/index.js';
import Form from './be-form/index.js';
import Input from './be-input/index.js';
import Textarea from './be-textarea/index.js';
import Popup from './be-popup/index.js';
import Select from './be-select/index.js';
import Gesture from './be-gesture/index.js';
import ViewLoading from './be-view-loading/index.js';
import BeLazyList from './be-lazy-list/index.js';
import Video from './be-video/index.js';

import FormItem from './be-form-item/index.mixin.js';
import Radio from './be-radio/index.mixin.js';
import Checkbox from './be-checkbox/index.mixin.js';
import Upload from './be-upload/index.mixin.js';
import Progress from './be-progress/index.mixin.js';

export {
  /** components */
  Icon,
  Button,
  Image,
  Form,
  Input,
  Textarea,
  Popup,
  Select,
  Gesture,
  ViewLoading,
  BeLazyList,
  Video,
  /** mixins */
  FormItem,
  Radio,
  Checkbox,
  Upload,
  Progress
};
