/**
 * 为了兼容uni-app奇怪的模块路径解析规则，需要补全index.js，否则会优先解析.vue
 * uni-app小程序平台不能用Vue.use注册全局组件，只能在main.js中注册（疑似官方BUG）
 */
import Icon from "./components/be-icon/index.js";
import Button from "./components/be-button/index.js";
import Image from "./components/be-image/index.js";
import Form from "./components/be-form/index.js";
import Input from "./components/be-input/index.js";
import Textarea from "./components/be-textarea/index.js";
import Popup from "./components/be-popup/index.js";
import DataPopup from "./components/be-data-popup/index.js";
import Select from "./components/be-select/index.js";
import SelectView from "./components/be-select-view/index.js";
import Gesture from "./components/be-gesture/index.js";
import ViewLoading from "./components/be-view-loading/index.js";
import BeLazyList from "./components/be-lazy-list/index.js";
import Video from "./components/be-video/index.js";
import AppPage from "./components/be-app-page/index.js";
import Picker from "./components/be-picker/index.js";
import PickerView from "./components/be-picker-view/index.js";

import FormItem from "./components/be-form-item/index.mixin.js";
import Radio from "./components/be-radio/index.mixin.js";
import Checkbox from "./components/be-checkbox/index.mixin.js";
import Upload from "./components/be-upload/index.mixin.js";
import Progress from "./components/be-progress/index.mixin.js";

export {
  /** components */
  Icon,
  Button,
  Image,
  Form,
  Input,
  Textarea,
  Popup,
  DataPopup,
  Select,
  SelectView,
  Gesture,
  ViewLoading,
  BeLazyList,
  Video,
  AppPage,
  Picker,
  PickerView,
  /** mixins style components */
  FormItem,
  Radio,
  Checkbox,
  Upload,
  Progress,
};
