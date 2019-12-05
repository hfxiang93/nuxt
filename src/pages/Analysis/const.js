import dayjs from 'dayjs'
export const seviceData = [
  {
    State: '当日客流',
    男: 51896,
    女: 67358,
  },
  {
    State: '昨日客流',
    男: 72083,
    女: 85640,
  },
  {
    State: '上周客流',
    男: 13244,
    女: 435455,
  },
  {
    State: '上月客流',
    男: 28888,
    女: 34334,
  },
  {
    State: '去年客流',
    男: 232323,
    女: 45454,
  },
]
export const vipData = [
  {
    type: '会员',
    percent: 0.43,
  },
  {
    type: '非会员',
    percent: 0.58,
  },
]

export const gustData = [
  {
    name: '男',
    大门: 200,
    侧门: 200,
    扶梯: 300,
    直梯: 222,
    安全通道: 437,
    其他: 333,
  },
  {
    name: '女',
    大门: 124,
    侧门: 232,
    扶梯: 345,
    直梯: 997,
    安全通道: 526,
    其他: 354,
  },
]
export const memberData = [
  {
    type: '女',
    percent: 0.33,
  },
  {
    type: '男',
    percent: 0.67,
  },
]
export const finishData = [
  {
    time: '01',
    sales: 38,
  },
  {
    time: '02',
    sales: 98,
  },
  {
    time: '04',
    sales: 34,
  },
  {
    time: '05',
    sales: 45,
  },
  {
    time: '06',
    sales: 56,
  },
  {
    time: '07',
    sales: 78,
  },
  {
    time: '08',
    sales: 45,
  },
  {
    time: '09',
    sales: 33,
  },
  {
    time: '10',
    sales: 44,
  },
  {
    time: '11',
    sales: 45,
  },
  {
    time: '12',
    sales: 78,
  },
  {
    time: '13',
    sales: 34,
  },
  {
    time: '14',
    sales: 23,
  },
  {
    time: '15',
    sales: 24,
  },
  {
    time: '16',
    sales: 45,
  },
  {
    time: '17',
    sales: 34,
  },
  {
    time: '18',
    sales: 34,
  },
  {
    time: '19',
    sales: 43,
  },
  {
    time: '20',
    sales: 23,
  },
  {
    time: '21',
    sales: 34,
  },
  {
    time: '22',
    sales: 33,
  },
  {
    time: '23',
    sales: 22,
  },
  {
    time: '24',
    sales: 13,
  },
]
export const waitData = [
  {
    time: '区域1',
    sales: 13,
  },
  {
    time: '区域2',
    sales: 43,
  },
  {
    time: '区域3',
    sales: 11,
  },
  {
    time: '区域4',
    sales: 23,
  },
  {
    time: '区域5',
    sales: 13,
  },
]

export const orderData = [
  {
    time: '01',
    sales: 0,
  },
  {
    time: '02',
    sales: 0,
  },
  {
    time: '03',
    sales: 0,
  },
  {
    time: '04',
    sales: 0,
  },
  {
    time: '05',
    sales: 0,
  },
  {
    time: '06',
    sales: 0,
  },
  {
    time: '07',
    sales: 116,
  },
  {
    time: '08',
    sales: 333,
  },
  {
    time: '09',
    sales: 333,
  },
  {
    time: '10',
    sales: 123,
  },
  {
    time: '11',
    sales: 234,
  },
  {
    time: '12',
    sales: 122,
  },
  {
    time: '13',
    sales: 122,
  },
  {
    time: '14',
    sales: 122,
  },
  {
    time: '15',
    sales: 122,
  },
  {
    time: '16',
    sales: 242,
  },
  {
    time: '17',
    sales: 456,
  },
  {
    time: '18',
    sales: 222,
  },
  {
    time: '19',
    sales: 652,
  },
  {
    time: '20',
    sales: 452,
  },
  {
    time: '21',
    sales: 156,
  },
  {
    time: '22',
    sales: 78,
  },
  {
    time: '23',
    sales: 0,
  },
  {
    time: '24',
    sales: 0,
  },
]
export const deviceColumns = [
  {prop: 'name', label: '设备名称'},
  {prop: 'time00', label: '00时'},
  {prop: 'time01', label: '01时'},
  {prop: 'time02', label: '02时'},
  {prop: 'time03', label: '03时'},
  {prop: 'time04', label: '04时'},
  {prop: 'time05', label: '05时'},
  {prop: 'time06', label: '06时'},
  {prop: 'time07', label: '07时'},
  {prop: 'time08', label: '08时'},
  {prop: 'time09', label: '09时'},
  {prop: 'time10', label: '10时'},
  {prop: 'time11', label: '11时'},
  {prop: 'time12', label: '12时'},
  {prop: 'time13', label: '13时'},
  {prop: 'time14', label: '14时'},
  {prop: 'time15', label: '15时'},
  {prop: 'time16', label: '16时'},
  {prop: 'time17', label: '17时'},
  {prop: 'time18', label: '18时'},
  {prop: 'time19', label: '19时'},
  {prop: 'time20', label: '20时'},
  {prop: 'time21', label: '21时'},
  {prop: 'time22', label: '22时'},
  {prop: 'time23', label: '23时'},
]
export const tableData = new Array(10).fill(
  ...[
    {
      name: '设备1',
      time01: '111',
      time02: '111',
      time03: '5',
      time04: '13511',
      time05: '111',
      time06: '113551',
      time07: '111',
      time08: '1135351',
      time09: '111',
      time10: '1353511',
      time11: '111',
      time12: '111',
      time13: '135511',
      time14: '111',
      time15: '1353511',
      time16: '111',
      time17: '111',
      time18: '1135351',
      time19: '111',
      time20: '111',
      time21: '3535',
      time22: '111',
      time23: '43545',
    },
  ],
)
export const dayData = [
  {
    time: '元旦',
    今年: 35578,
    去年: 23334,
    前年: 33234,
  },
  {
    time: '春节',
    今年: 45567,
    去年: 34435,
    前年: 12345,
  },
  {
    time: '清明节',
    今年: 45466,
    去年: 23235,
    前年: 13233,
  },
  {
    time: '劳动节',
    今年: 23233,
    去年: 76744,
    前年: 23367,
  },
  {
    time: '端午节',
    今年: 35455,
    去年: 46663,
    前年: 34234,
  },
  {
    time: '中秋节',
    今年: 34556,
    去年: 23676,
    前年: 46624,
  },
  {
    time: '国庆节',
    今年: 35446,
    去年: 45622,
    前年: 35222,
  },
]
export const flowData = [
  {
    name: '男',
    第一季度: 200,
    第二季度: 200,
    第三季度: 300,
    第四季度: 222,
  },
  {
    name: '女',
    第一季度: 124,
    第二季度: 232,
    第三季度: 345,
    第四季度: 997,
  },
]
export const monthData = [
  {
    name: '男',
    '1': 222,
    '2': 178,
    '3': 256,
    '4': 184,
    '5': 134,
    '6': 178,
    '7': 143,
    '8': 252,
    '9': 355,
    '10': 266,
    '11': 415,
    '12': 290,
  },
  {
    name: '女',
    '1': 122,
    '2': 278,
    '3': 156,
    '4': 284,
    '5': 234,
    '6': 278,
    '7': 243,
    '8': 152,
    '9': 155,
    '10': 166,
    '11': 215,
    '12': 390,
  },
]
export const monthOrderFields = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]
export const monthOrderData = [
  {
    name: '会员',
    '01': 222,
    '02': 178,
    '03': 256,
    '04': 184,
    '05': 134,
    '06': 178,
    '07': 143,
    '08': 252,
    '09': 355,
    '10': 266,
    '11': 415,
    '12': 290,
  },
  {
    name: '非会员',
    '01': 122,
    '02': 278,
    '03': 156,
    '04': 284,
    '05': 234,
    '06': 278,
    '07': 243,
    '08': 152,
    '09': 155,
    '10': 166,
    '11': 215,
    '12': 390,
  },
]
export const saleData = [
  {
    time: '1',
    sales: 81,
  },
  {
    time: '2',
    sales: 198,
  },
  {
    time: '3',
    sales: 134,
  },
  {
    time: '4',
    sales: 145,
  },
  {
    time: '5',
    sales: 136,
  },
  {
    time: '6',
    sales: 278,
  },
  {
    time: '7',
    sales: 145,
  },
  {
    time: '8',
    sales: 233,
  },
  {
    time: '9',
    sales: 144,
  },
  {
    time: '10',
    sales: 245,
  },
  {
    time: '11',
    sales: 178,
  },
  {
    time: '12',
    sales: 178,
  },
]
export const trendData = [
  {
    name: '男',
    卖场一: 200,
    卖场二: 200,
    卖场三: 300,
    卖场四: 222,
    卖场五: 437,
    卖场六: 333,
  },
  {
    name: '女',
    卖场一: 124,
    卖场二: 232,
    卖场三: 345,
    卖场四: 997,
    卖场五: 526,
    卖场六: 354,
  },
]
export const newData = [
  {
    time: '卖场一',
    sales: 6138,
  },
  {
    time: '卖场二',
    sales: 1138,
  },
  {
    time: '卖场三',
    sales: 2345,
  },
  {
    time: '卖场四',
    sales: 3412,
  },
  {
    time: '卖场五',
    sales: 2138,
  },
  {
    time: '卖场六',
    sales: 1138,
  },
]
export const dayTrendData = [
  {
    time: '01',
    卖场一: 0,
    卖场二: 0,
    卖场三: 3,
    卖场四: 2,
  },
  {
    time: '02',
    卖场一: 0,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '03',
    卖场一: 0,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '04',
    卖场一: 0,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '05',
    卖场一: 0,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '06',
    卖场一: 0,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '07',
    卖场一: 116,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '08',
    卖场一: 333,
    卖场二: 223,
    卖场三: 233,
    卖场四: 422,
  },
  {
    time: '09',
    卖场一: 333,
    卖场二: 322,
    卖场三: 112,
    卖场四: 224,
  },
  {
    time: '10',
    卖场一: 123,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '11',
    卖场一: 234,
    卖场二: 322,
    卖场三: 112,
    卖场四: 224,
  },
  {
    time: '12',
    卖场一: 122,
    卖场二: 333,
    卖场三: 222,
    卖场四: 114,
  },
  {
    time: '13',
    卖场一: 122,
    卖场二: 322,
    卖场三: 122,
    卖场四: 984,
  },
  {
    time: '14',
    卖场一: 122,
    卖场二: 113,
    卖场三: 222,
    卖场四: 422,
  },
  {
    time: '15',
    卖场一: 122,
    卖场二: 322,
    卖场三: 222,
    卖场四: 214,
  },
  {
    time: '16',
    卖场一: 242,
    卖场二: 322,
    卖场三: 222,
    卖场四: 114,
  },
  {
    time: '17',
    卖场一: 456,
    卖场二: 344,
    卖场三: 562,
    卖场四: 784,
  },
  {
    time: '18',
    卖场一: 222,
    卖场二: 355,
    卖场三: 332,
    卖场四: 422,
  },
  {
    time: '19',
    卖场一: 652,
    卖场二: 463,
    卖场三: 672,
    卖场四: 344,
  },
  {
    time: '20',
    卖场一: 342,
    卖场二: 343,
    卖场三: 232,
    卖场四: 124,
  },
  {
    time: '20',
    卖场一: 452,
    卖场二: 323,
    卖场三: 223,
    卖场四: 124,
  },
  {
    time: '21',
    卖场一: 156,
    卖场二: 334,
    卖场三: 232,
    卖场四: 234,
  },
  {
    time: '22',
    卖场一: 78,
    卖场二: 233,
    卖场三: 122,
    卖场四: 124,
  },
  {
    time: '23',
    卖场一: 0,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
  {
    time: '24',
    卖场一: 0,
    卖场二: 3,
    卖场三: 2,
    卖场四: 4,
  },
]
//日周月报常量
// 当前一周
export const CUR_WEEK_VALUE = [
  dayjs(new Date().getTime() - 3600 * 1000 * 24 * 7).format('YYYY-MM-DD'),
  dayjs(new Date().getTime()).format('YYYY-MM-DD'),
]

// 基本日信息
export const DAY_KEY_INFO = {
  passengerNum: '当日客流',
  passengerNewNum: '当日新增',
  passengerOldNum: '当日回访',
  lastPassengerNum: '昨日客流',
  rate: '昨日环比',
}
// 基本周信息
export const WEEK_KEY_INFO = {
  passengerNum: '本周客流',
  lastPassengerNum: '上周客流',
  rate: '日均环比',
  avgPassengerNum: '本周日均',
  lastWeekAvgPassengerNum: '上周日均',
}
// 基本月信息
export const MONTH_KEY_INFO = {
  passengerNum: '当月客流',
  lastMonthPassengerNum: '上月客流',
  rate: '月环比',
  lastYearPassengerNum: '去年同月',
  lastYearAverageMonthPassengerNum: '去年月均',
}
// 同期客流对比
export const HISTORY_FLOW = [
  '当日与历史同期客流量对比',
  '本周与历史同期客流量对比',
  '本月与历史同期客流量对比',
]
// 趋势对比
export const HISTORY_TREND = [
  '当日与历史同期客流趋势对比',
  '本周与历史同期客流趋势对比',
  '本月与历史同期客流趋势对比',
]
// 时间
export const TIME = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
]
// 周
export const WEEK = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
// 月份
export const MONTH = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
]
