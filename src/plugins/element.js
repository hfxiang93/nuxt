/**
 * Created by levy on 2018/2/12.
 */
import Vue from 'vue'
import {
  Button,
  Table,
  Pagination,
  TableColumn,
  Notification,
  Loading,
  Dialog,
  MessageBox,
  Message,
  Radio,
  Checkbox,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  Tooltip,
  Container,
  Main,
  Footer,
  Header,
  Menu,
  Submenu,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Aside,
  Tabs,
  TabPane,
  Tag,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  CheckboxButton,
  Upload,
  Breadcrumb,
  BreadcrumbItem,
  Switch,
  InputNumber,
  // Image
} from 'element-ui'
import ElFormRenderer from '@femessage/el-form-renderer'
import ElDataTable from '@femessage/el-data-table'
import Drawer from 'element-ui/lib/drawer'
import 'element-ui/lib/theme-chalk/drawer.css'
import UploadToAli from '@femessage/upload-to-ali'

Vue.prototype.$ELEMENT = {size: 'medium'}

Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Drawer)
Vue.use(Aside)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Header)
// Vue.use(Aside)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Checkbox)
// Vue.use(Switch)
Vue.use(Loading.directive)
Vue.use(Dialog)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(RadioButton)
Vue.use(Upload)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
// Vue.use(Image)

// Vue.use(Cascader)
// Vue.use(Autocomplete)

// steps
// Vue.use(Steps)
// Vue.use(Step)

Vue.component('el-form-renderer', ElFormRenderer)
Vue.component('el-data-table', ElDataTable)
Vue.component('upload-to-ali', UploadToAli)

Vue.prototype.$notify = Notification
Vue.$notify = Notification
//注册全局事件对象
window.eventBus = new Vue()
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
