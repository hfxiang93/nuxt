// const baseApi = '/mall-application-api'
const EAGLE_EYE = `/Eagle_eye`
// 客流概览-当日客流详情
export const curDayDetail = `${EAGLE_EYE}/overview/theDayDetails`
// 客流概览-获取年龄分布数据
export const ageInfo = `${EAGLE_EYE}/overview/theDayAgeDistribution`
// 客流概览-获取性别分布数据
export const sexInfo = `${EAGLE_EYE}/overview/theDayGenderDistribution`
// 客流概览-获取会员分布数据
export const vipInfo = `${EAGLE_EYE}/overview/theDayMemberDistribution`
// 客流概览-获取人流量实时分布
export const realInfo = `${EAGLE_EYE}/overview/theDayRealTimeDistribution`
//客流概览-获取当日设备客流Top排名
export const deviceInfo = `${EAGLE_EYE}/overview/theDayDeviceRanking`
//客流概览-获取当日到访次数排行top10
export const visitInfo = `${EAGLE_EYE}/overview/theDayVisitNumRanking`

//客流分析-日报
export const passengerFlow = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlow`
// 当日与历史同期客流趋势对比
export const dayHistory = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDayCompareHistory`
// 当日与历史同期客流量对比
export const dayCompare = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDayCompareLastDay`
// 年龄统计
export const ageAnalyse = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowAgeAnaly`
// 性别分布
export const sexAnalyse = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowSexAnaly`
// 各设备实时客流 Top5
export const topFive = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowTopFive`
// 各位置客流分析
export const areaAnalyse = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowAreaAnaly`
// 区域日均驻留时长
export const areaTime = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowAreaAverageStayTime`
// 楼层客流分布
export const flowFloor = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowFloor`
// 当日各设备客流详情
export const flowDetail = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDetail`

// 周报
export const passengerFlowWeek = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowWeek`
// 本周与历史同期客流量对比
export const passengerFlowDayCompareWeek = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDayCompareWeek`
// 本周与历史同期客流趋势对比
export const passengerFlowDayCompareHistoryWeek = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDayCompareHistoryWeek`

//月报
export const passengerFlowMonth = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowMonth`
// 本月与历史同期客流量对比
export const passengerFlowDayCompareMonth = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDayCompareMonth`
// 本月与历史同期客流趋势对比
export const passengerFlowDayCompareHistoryMonth = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDayCompareHistoryMonth`

//同比环比
// 日客流环比
export const dayRate = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowDayRate`
// 日人均驻留时长同比环比
export const averageStayTime = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowAverageStayTime`
// 月客流同比环比
export const monthRate = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowMonthRate`
// 月人均驻留时长同比环比
export const averageMonthTime = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowMonthAverageStayTime`

// 其他报表
// 节假日客流
export const passengerFlowAnalyse = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowAnaly`
// 往年同期节假日日均客流
export const passengerLastFlowAnalyse = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowLastYearHolidayAnaly`
// 各季度客流
export const passengerFlowEveryThreeMonth = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowEveryThreeMonth`
// 各月份客流
export const passengerFlowEveryMonth = `${EAGLE_EYE}/passengerFlowAnalyse/passengerFlowEveryMonth`

// 商铺客流
export const storeList = `${EAGLE_EYE}/passengerFlowAnalyse/storeList`
// 日客流趋势
export const compareDayPassengerFlow = `${EAGLE_EYE}/passengerFlowAnalyse/compareDayPassengerFlow`
// 月日均客流
export const compareMonthPassengerFlow = `${EAGLE_EYE}/passengerFlowAnalyse/compareMonthPassengerFlow`
// 月日均驻留时长
export const compareMonthPassengerFlowTime = `${EAGLE_EYE}/passengerFlowAnalyse/compareMonthPassengerFlowTime`
// 月客流趋势
export const compareMonthPassengerFlowTrend = `${EAGLE_EYE}/passengerFlowAnalyse/compareMonthPassengerFlowTrend`
// 月新客占比
export const compareMonthNewPassengerFlowRate = `${EAGLE_EYE}/passengerFlowAnalyse/compareMonthNewPassengerFlowRate`
// 客流记录查询
export const passengerQuery = `${EAGLE_EYE}/passenger/query`
//客流详情
export const passengerDetail = `${EAGLE_EYE}/passenger/detail`
//客流采集记录
export const collectRecordList = `${EAGLE_EYE}/passenger/collectRecordList`
// 分页查询卖场管理
export const pageStore = `${EAGLE_EYE}/store/pageStore`

// 商铺列表
export const passengerFlowAnalyseStoreList = `${EAGLE_EYE}/passengerFlowAnalyse/storeList`

// 商铺客流排名
export const passengerFlowAnalyseStoreTop = `${EAGLE_EYE}/passengerFlowAnalyse/storeTop`

// 搜索卖场接口
export const SearchMall = `${EAGLE_EYE}/mall/searchMall`
// 修改卖场信息
export const UpdateMall = `${EAGLE_EYE}/mall/updateMall`
// 删除卖场接口
export const DeleteMall = `${EAGLE_EYE}/mall/deleteMall`
// 卖场管理新增卖场接口
export const SaveMall = `${EAGLE_EYE}/mall/saveMall`
// 卖场管理新增卖场接口
export const detailsMall = `${EAGLE_EYE}/mall/detailsMall`
// 卖场管理分页列表接口
export const pageMall = `${EAGLE_EYE}/mall/pageMall`
// 关联查询接口
export const relationMall = `${EAGLE_EYE}/mall/relationMall`
// 关联查询楼层区域接口
export const getGeginAndFloor = `${EAGLE_EYE}/mall/getGeginAndFloor`

// 设备新增接口
export const saveDevice = `${EAGLE_EYE}/device/saveDevice`
// 设备搜索接口
export const searchDevice = `${EAGLE_EYE}/device/searchDevice`
// 设备删除接口
export const deleteDevice = `${EAGLE_EYE}/device/deleteDevice`
// 设备修改接口
export const updateDevice = `${EAGLE_EYE}/device/updateDevice`
// 设备分页列表接口
export const pageDevice = `${EAGLE_EYE}/device/pageDevice`

// 商铺新增接口
export const saveStore = `${EAGLE_EYE}/store/saveStore`
// 商铺删除接口
export const deleteStore = `${EAGLE_EYE}/store/deleteStore`
// 商铺修改接口
export const updateStore = `${EAGLE_EYE}/store/updateStore`
// 商铺分页查询接口
export const pagStore = `${EAGLE_EYE}/store/pageStore`
// 商铺名称编号模糊搜索接口
export const searchStore = `${EAGLE_EYE}/store/searchStore`
// 角色管理
// 查询
export const pageRole = `${EAGLE_EYE}/role/pageRole`
// 搜索
export const searchRole = `${EAGLE_EYE}/role/searchRole`
// 新增角色
export const saveRole = `${EAGLE_EYE}/role/saveRole`
// 修改角色
export const updateRole = `${EAGLE_EYE}/role/updateRole`
// 删除角色
export const deleteRole = `${EAGLE_EYE}/role/deleteRole`

// 人员管理
// 人员列表
export const pageEmployee = `${EAGLE_EYE}/employee/pageSearchEmployees`
// 新增人员
export const saveEmployee = `${EAGLE_EYE}/employee/saveEmployee`
// 编辑人员
export const editEmployee = `${EAGLE_EYE}/employee/editEmployee`
// 删除人员
export const deleteEmployee = `${EAGLE_EYE}/employee/deleteEmployee`
// 参数设置
// 参数设置-查询
export const paramSettingSearch = `${EAGLE_EYE}/paramSetting/search`
// 参数设置-新增
export const paramSettingSave = `${EAGLE_EYE}/paramSetting/save`
// 参数设置-更新
export const paramSettingUpdate = `${EAGLE_EYE}/paramSetting/update`
// 关联角色
export const personnelAssociation = `${EAGLE_EYE}/role/personnelAssociation`
