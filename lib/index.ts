import type { App } from 'vue';

import AppPage from './components/be-app-page/index.vue';
import Button from './components/be-button/index.vue';
import Checkbox from './components/be-checkbox/index.vue';
import DataPopup from './components/be-data-popup/index.vue';
import Form from './components/be-form/index.vue';
import FormItem from './components/be-form-item/index.vue';
import Gesture from './components/be-gesture/index.vue';
import Icon from './components/be-icon/index.vue';
import Image from './components/be-image/index.vue';
import Input from './components/be-input/index.vue';
import LazyList from './components/be-lazy-list/index.vue';
import Picker from './components/be-picker/index.vue';
import PickerView from './components/be-picker-view/index.vue';
import Popup from './components/be-popup/index.vue';
import Progress from './components/be-progress/index.vue';
import Radio from './components/be-radio/index.vue';
import Select from './components/be-select/index.vue';
import SelectView from './components/be-select-view/index.vue';
import Textarea from './components/be-textarea/index.vue';
import Upload from './components/be-upload/index.vue';
import Video from './components/be-video/index.vue';
import ViewLoading from './components/be-view-loading/index.vue';

const components: any[] = [
  AppPage,
  Button,
  Checkbox,
  DataPopup,
  Form,
  FormItem,
  Gesture,
  Icon,
  Image,
  Input,
  LazyList,
  Picker,
  PickerView,
  Popup,
  Progress,
  Radio,
  Select,
  SelectView,
  Textarea,
  Upload,
  Video,
  ViewLoading
];

// 包装组件，使其变为一个Vue插件
const wrapComponents = () => {
  components.forEach((comp) => {
    comp.install = (app: App, options: any) => {
      app.component(comp.name, comp);
    };
  });
};

wrapComponents();

const plugin = {
  install: (app: App) => {
    components.forEach((comp) => {
      app.use(comp);
    });
  }
};

export {
  AppPage,
  Button,
  Checkbox,
  DataPopup,
  Form,
  FormItem,
  Gesture,
  Icon,
  Image,
  Input,
  LazyList,
  Picker,
  PickerView,
  Popup,
  Progress,
  Radio,
  Select,
  SelectView,
  Textarea,
  Upload,
  Video,
  ViewLoading
};

export default plugin;
