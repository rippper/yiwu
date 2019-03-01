/**
 * 页面接口api
 */
// const API_URL = 'http://test10.jy365.net/api';
// const API_URL = '122.225.101.117:9064/api';
/*const API_URL = '/api';
const Platform = '/wechat';*/
// const API_URL = 'http://122.225.101.119:8989'
/*const API_URL = ''
const Platform = '/mobile'*/
const API_URL = '/ipad/Default.aspx';
const Platform = '';
/*
 * 账号：admin 密码：888888
 * */
export const Api2 = {
  /*2.5接口*/
  /*首页课程导航接口
   * selectType: 1 大图 2 小图
   * */
  getChannelInfoListHP: {
    url: API_URL,
    data: {
      method: 'getChannelInfoListHP',
      selecttype: 1
    }
  },
  /*
   * 课程列表
   * */
  getCourseInfoListAll: {
    url: API_URL,
    data: {
      method: 'getCourseInfoListAll',
      selecttype: 1,
      channelId: '',
      UserID: '',
      Keyword: '',
      Page: 1,
      PageCount: 6
    }
  },
  /**
   * 通知公告
   */
  getNoticeInfoList: {
    url: API_URL,
    data: {
      method: 'getNoticeInfoList',
      Page: 1,
      PageCount: 6
    }
  },
  /**
   * 课程频道
   */
  getChannelInfoList: {
    url: API_URL,
    data: {
      method: 'getChannelInfoList'
    }
  },
  /**
   * 通知内容
   */
  getNoticeInfoContent: {
    url: API_URL,
    data: {
      method: 'getNoticeInfoContent',
      Noticeid: 732
    }
  },
  /**
   * 课程搜索
   */
  getCourseInfoListBySearch: {
    url: API_URL,
    data: {
      method: 'getCourseInfoListBySearch',
      channelID: '',
      Keyword: '',
      Page: 1,
      PageCount: 6,
      UserID: '',
      selecttype: 'coursename',
      year: ''
    }
  },
  /**
   * 文章列表
   */
  getArticleInfoList: {
    url: API_URL,
    data: {
      method: 'getArticleInfoList',
      Channel_id: '',
      Page: 1,
      PageCount: 10,
      Keyword: ''
    }
  },
  /*
   * 系统登入
   * GUID 随机生成
   * */
  ValidateUser: {
    url: API_URL,
    data: {
      method: 'ValidateUser',
      UserID: '',
      Password: '',
      Mac: '',
      code: ''
    }
  },
  /**
   * 验证是否在线
   */
  CheckLoginStatus: {
    url: API_URL,
    data: {
      method: 'CheckLoginStatus',
      UserID: '',
      Mac: ''
    }
  },
  /**
   * 提交学习记录
   */
  UpdateUserCourse: {
    url: API_URL,
    data: {
      method: 'UpdateUserCourse',
      UserID: '',
      CourseNumber: '',
      AddAndDel: 'add'
    }
  },
  /**
   * 单视频提交进度
   */
  UploadTimeNode: {
    url: API_URL,
    data: {
      method: 'UploadTimeNode',
      UserID: '',
      CourseNumber: '',
      TimeNode: '',
      TotalTime: ''
    }
  },
  /**
   * 视频播放续播
   */
  SyncUserStudyData: {
    url: API_URL,
    data: {
      method: 'SyncUserStudyData',
      UserID: '',
      CourseNumber: '',
      data: ''
    }
  },
  /**
   * 文章频道列表
   */
  getArticleChannelInfoList: {
    url: API_URL,
    data: {
      method: 'getArticleChannelInfoList',
      ParentId: 0
    }
  },
  /**
   * 我的课程
   * finish 1 已完成 0 未完成
   */
  getUserCourseInfo: {
    url: API_URL,
    data: {
      method: 'getUserCourseInfo',
      Page: 1,
      PageCount: 10,
      UserID: '',
      CourseNumber: '',
      Finish: ''
    }
  },
  /**
   * 学分考核
   * Tpyeid
   * 15 单位专题培训
   * 18 菜单式讲座
   * 5 专题讲座
   * 9 领导干部上讲台
   * 2 单位中心组学习
   * 7 学习成果
   */
  getUserTrainningClass: {
    url: API_URL,
    data: {
      method: 'getUserTrainningClass',
      UserID: '',
      TypeId: '',
      startTime: '',
      cendTime: ''
    }
  },
  /**
   * 科级干部轮训
   */
  getUserTrainningClassKZ: {
    url: API_URL,
    data: {
      method: 'getUserTrainningClassKZ',
      UserID: '',
      TypeId: '',
      startTime: '',
      endTime: '',
      Page: 0,
      PageCount: 10
    }
  },
  /**
   * 菜单式讲座详情
   */
  GetTrainningDetail: {
    url: API_URL,
    data: {
      method: 'GetTrainningDetail',
      UserID: '',
      tcId: ''
    }
  },
  /**
   * 科职干部培训详细
   */
  GetTrainningDetailKZ: {
    url: API_URL,
    data: {
      method: 'GetTrainningDetailKZ',
      UserID: '',
      tcId: ''
    }
  },
  /**
   * 科职干部轮训报名详细
   */
  UpdateTrainningStudentupDetail: {
    url: API_URL,
    data: {
      method: 'UpdateTrainningStudentupDetail',
      UserID: '',
      tcId: ''
    }
  },
  /**
   * 报名情况
   */
  UpdateTrainningStudentup: {
    url: API_URL,
    data: {
      method: 'UpdateTrainningStudentup',
      UserID: '',
      tcId: ''
    }
  },
  //排行榜 RankType => 1：学时， 2：课程，3：单位
  GetRankInfoList: {
    url: API_URL,
      data: {
      method: 'getRankInfoList',
      RankType: '',
      TotalCount: '20'
    }
  },
  /**
   * 退出系统
   */
  UpdateLoginStatus: {
    url: API_URL,
    data: {
      method: 'UpdateLoginStatus',
      UserID: '',
      Mac: '',
      isLogin: 0
    }
  },
  /**
   * 推荐课程
   */
  getCourseInfoList: {
    url: API_URL,
    data: {
      method: 'getCourseInfoList',
      selecttype: 1,
      channelName: 'recommend',
      UserID: '',
      Keyword: '',
      Page: 1,
      PageCount: 6
    }
  },
  /**
   * 修改密码
   */
  SetUserPassword: {
    url: API_URL,
    data: {
      method: 'SetUserPassword',
      UserID: '',
      oldPwd: '',
      newPwd: ''
    }
  },
  /**
   * 修改个人信息
   */
  SetUserInfo: {
    url: API_URL,
    data: {
      method: 'SetUserInfo',
      UserID: '',
      phoneNum: '',
      moblieNum: '',
      email: ''
    }
  },
  /**
   * 个人学习档案
   */
  GetUserStatistics: {
    url: API_URL,
    data: {
      method: 'GetUserStatistics',
      UserID: '',
      startTime: '',
      endTime: '',
      Page: 1,
      PageCount: 10
    }
  },
  /**
   * 个人学习档案(2016年)
   */
  GetUserHistory: {
    url: API_URL,
    data: {
      method: 'GetUserHistory',
      UserID: '',
      Page: 1,
      PageCount: 10
    }
  },
  /**
   * 考试接口(finish:1 表示已及格)
   */
  GetExamList: {
    url: API_URL,
    data: {
      method: 'GetExamList',
      UserID: '',
      Page: 0,
      PageCount: 10,
      portal: 1,
      finish: 0
    }
  },
  /**
   * 试题
   */
  GetExam: {
    url: API_URL,
    data: {
      method: 'GetExam',
      portal: 1,
      examId: ''
    }
  },
  /**
   * 提交结果
   */
  UpdateUserExam: {
    url: API_URL,
    data: {
      method: 'UpdateUserExam',
      portal: 1,
      examId: '',
      UserID: '',
      Data: '',
      Date: ''
    }
  },
  /**
   * 首页，检查是否领取奖励
   */
  GetExamReward: {
    url: API_URL,
    data: {
      method: 'GetExamReward',
      portal: 1,
      UserID: ''
    }
  },
  /**
   * 申请奖励
   */
  UpdateExamReward: {
    url: API_URL,
    data: {
      method: 'UpdateExamReward',
      portal: 1,
      UserID: '',
      examId: '',
      mobileNum: ''
    }
  },
  // 测试试题列表
  GetRaceList: {
    url: API_URL,
    data: {
      method: 'GetRaceList',
      UserID: '',
      Page: 0,
      PageCount: 10,
      portal: 1,
      finish: 0
    }
  },
  // 获取用户测试信息
  GetUserRaceInfo: {
    url: API_URL,
    data: {
      method: 'GetUserRaceInfo',
      UserID: '',
      portal: 1,
      examId: ''
    }
  },
  GetIsAllowExam: {
    url: API_URL,
    data: {
      method: 'GetIsAllowExam',
      UserID: '',
      portal: 1,
      examId: ''
    }
  },
  GetUserExamHistory: {
    url: API_URL,
    data: {
      method: 'GetUserExamHistory',
      UserID: '',
      portal: 1,
      ExamID: ''
    }
  },
  UpdateRewardPhone: {
    url: API_URL,
    data: {
      method: 'UpdateRewardPhone',
      portal: 1,
      UserID: '',
      examId: '',
      mobileNum: ''
    }
  },
  GetIsAllowLearn: {
    url: API_URL,
    data: {
      method: 'GetIsAllowLearn',
      UserID: '',
      portal: 1
    }
  },
  // 考试错题接口
  GetExamWrongTheme: {
    url: API_URL,
    data: {
      method: 'GetExamWrongTheme',
      examPageId: '',
      portal: 1
    }
  },
  // 在线测试排名接口
  GetUserRaceRank: {
    url: API_URL,
    data: {
      method: 'GetUserRaceRank',
      UserID: '',
      ExamID: '',
      portal: 1
    }
  },
  // 播放页面提示
  GetIsDenyUser: {
    url: API_URL,
    data: {
      method: 'GetIsDenyUser',
      UserID: '',
      portal: 1
    }
  }
};
/*3.0接口*/
export const Api3 = {
  //判断用户是否存在
  CheckUserIsExit: {
    url: API_URL + Platform + '/CheckUserIsExit',
    data: {
      Account: ''
    }
  },
  //判断用户在线状态
  CheckLoginStatus: {
    url: API_URL + Platform + '/CheckLoginStatus',
    data: {
      Mac: ''
    }
  },
  //登陆微信
  Login: {
    url: API_URL + Platform + '/Login',
    data: {
      Code: '',
      Account: '',
      Password: '',
      Mac: '',
      CId: ''
    }
  },
  //登陆2
  Login2: {
    url: API_URL + Platform + '/ValidateUser',
    data: {
      Account: '',
      Password: '',
      Mac: '',
      CId: ''
    }
  },
  //获取用户信息
  GetUserInfo: {
    url: API_URL + Platform + '/GetUserInfo',
    data: {}
  },
  //轮播
  GetLink: {
    url: API_URL + Platform + '/GetLink',
    data: {
      Page: 1,
      Rows: 5
    }
  },
  //课程列表
  GetCourseInfoList: {
    url: API_URL + Platform + '/GetCourseInfoList',
    data: {
      TeacherName: '',
      ChannelId: '',
      Keyword: '',
      Sort: 'Id',
      Order: 'desc',
      Page: '1',
      Rows: '10'
    }
  },
  //热门课程
  WeekCourse: {
    url: API_URL + Platform + '/WeekCourse',
    data: {
      TeacherName: '',
      ChannelId: '',
      Keyword: '',
      Sort: 'Id',
      Order: 'desc',
      Page: '1',
      Rows: '10'
    }
  },
  //课程分类
  GetChannelInfoList: {
    url: API_URL + Platform + '/GetCourseChannelInfoListForWChat',
    data: {
      ParentId: 0
    }
  },
  //获取评论 0:文章，1：课程，2：电子书，3：学习圈，4：成果展示
  GetCommentList: {
    url: API_URL + Platform + '/GetCommentList',
    data: {
      objType: '',
      objId: ''
    }
  },
  //考试分类
  GetExamType: {
    url: API_URL + Platform + '/GetExamType',
    data: {
      ParentId: 0,
      ParentCode: ''
    }
  },
  //考试列表
  GetExamList: {
    url: API_URL + Platform + '/GetExamList',
    data: {
      ExamType: 'All',
      TypeId: '',
      Keyword: '',
      Page: 1,
      Rows: 10
    }
  },
  //获取考试题
  GetExam: {
    url: API_URL + Platform + '/GetExam',
    data: {
      Id: ''
    }
  },
  //提交考试题
  UpdateUserExam: {
    url: API_URL + Platform + '/UpdateUserExam',
    data: {
      ExamId: '',
      Data: null
    }
  },
  //退出登录
  LoginOut: {
    url: API_URL + Platform + '/LoginOut',
    data: {
      Mac: ''
    }
  },
  //消息中心
  GetMessageCenter: {
    url: API_URL + Platform + '/GetMessageCenter',
    data: {
      Page: 1,
      Rows: 10,
      Keyword: ''
    }
  },
  //通知内容
  GetNoticeInfoContent: {
    url: API_URL + Platform + '/GetNoticeInfoContent',
    data: {}
  },
  //课程详情
  GetCourseDetail: {
    url: API_URL + Platform + '/GetCourseDetail',
    data: {
      Id: ''
    }
  },
  //历史记录 Type => All:表示所有， Today:表示今天记录，Earlier:表示更早
  GetHistoryCourse: {
    url: API_URL + Platform + '/GetHistoryCourse',
    data: {
      Type: '',
      Keyword: '',
      Sort: 'sort',
      Order: 'desc',
      Page: 1,
      Rows: 20
    }
  },
  //用户课程列表 Finish => 1：完成课程，0：未完成课程 ,2：表示全部
  GetUserCourseInfoList: {
    url: API_URL + Platform + '/GetUserCourseInfoList',
    data: {
      Finish: '2',
      Keyword: '',
      Page: 1,
      Rows: 10
    }
  },
  //文章频道
  GetArticleChannelInfoList: {
    url: API_URL + Platform + '/GetArticleChannelInfoListForWChat',
    data: {
      ParentId: '',
      ParentCode: ''
    }
  },
  //文章列表
  GetArticleInfoList: {
    url: API_URL + Platform + '/GetArticleInfoList',
    data: {
      CategoryId: '',
      Keyword: '',
      CategoryCode: '',
      Page: '1',
      Rows: '10'
    }
  },
  //文章详情
  ArticleDetail: {
    url: API_URL + Platform + '/ArticleDetail',
    data: {
      Id: ''
    }
  },
  //文章详情
  getArticleInfoContent: {
    url: API_URL + Platform + '/getArticleInfoContent',
    data: {
      Id: ''
    }
  },
  //通知公告
  GetNoticeInfoList: {
    url: API_URL + Platform + '/GetNoticeInfoList',
    data: {
      Keyword: '',
      Page: '1',
      Rows: '10'
    }
  },
  //排行榜 RankType => 1：学时， 2：课程，3：单位
  GetRankInfoList: {
    url: API_URL + Platform + '/GetRankInfoList',
    data: {
      RankType: '',
      TotalCount: '20'
    }
  },
  //培训班分类
  GetTrainingTypeList: {
    url: API_URL + Platform + '/GetTrainingTypeList',
    data: {}
  },
  //培训班列表 JoinStatus => Join：参加； UnJoin：未参加 ；UnAudit：审核中；
  GetTrainingClass: {
    url: API_URL + Platform + '/GetTrainingClass',
    data: {
      TypeId: '',
      TrainName: '',
      JoinStatus: '',
      Page: '1',
      Rows: '20'
    }
  },
  //培训班详情
  GetTrainingDetail: {
    url: API_URL + Platform + '/GetTrainingDetail',
    data: {
      Id: ''
    }
  },
  //签到列表
  GetClassUserSignList: {
    url: API_URL + Platform + '/GetClassUserSignList',
    data: {
      TrainingId: '',
      TodayFlag: '',
      Order: 'desc',
      Page: '1',
      Rows: '20'
    }
  },
  //获取微信签名
  GetWechatWxAuthModel: {
    url: API_URL + Platform + '/GetWechatWxAuthModel',
    data: {
      Url: ''
    }
  },
  //签到或签退
  TrainingSignIn: {
    url: API_URL + Platform + '/TrainingSignIn',
    data: {
      TrainingId: '',
      SignType: '',
      Longitude: '',
      Latitude: '',
      Position: ''
    }
  },
  //取消报名培训班
  UpdateTrainingStudentdown: {
    url: API_URL + Platform + '/UpdateTrainingStudentdown',
    data: {
      Id: ''
    }
  },
  //报名培训班
  UpdateTrainingStudentup: {
    url: API_URL + Platform + '/UpdateTrainingStudentup',
    data: {
      Id: ''
    }
  },
  //电子书
  GetBookInfoList: {
    url: API_URL + Platform + '/GetBookInfoList',
    data: {
      Keyword: '',
      BookTypeId: '',
      BookTypeCode: '',
      Page: '1',
      Rows: '10'
    }
  },
  //电子书章节
  GetBookChapterInfoList: {
    url: API_URL + Platform + '/GetBookChapterInfoList',
    data: {
      BookId: '',
      Page: '1',
      Rows: '30'
    }
  },
  //电子书章节内容
  GetBookChapterContent: {
    url: API_URL + Platform + '/GetBookChapterContent',
    data: {
      Id: ''
    }
  },
  //留言类型
  CommentType: {
    url: API_URL + Platform + '/CommentType',
    data: {}
  },
  //添加留言
  AddMessage: {
    url: API_URL + Platform + '/AddMessage',
    data: {
      MainId: '',
      ParentId: '',
      Title: '',
      Content: '',
      ClassCode: ''
    }
  },
  //修改用户信息
  /*
  * {
  *   "Account": "sample string 1",
      "Name": "sample string 2",
      "DepartmentName": "sample string 3",
      "GroupId": 4,
      "IdCard": "sample string 5",
      "Email": "sample string 6",
      "Grade": 7,
      "Business": "sample string 8",
      "Sex": "sample string 9",
      "Nation": "sample string 10",
      "Degree": 11,
      "Party": "sample string 12",
      "Birthday": "2017-12-07 14:11:25",
      "Tel": "sample string 14",
      "Mobile": "sample string 15",
      "SmgCode": "sample string 16"
  * }
  * */
  UpdateUserInfo: {
    url: API_URL + Platform + '/UpdateUserInfo',
    data: {}
  },
  //获取职级列表
  GetGradeList: {
    url: API_URL + Platform + '/GetGradeList',
    data: {}
  },
  //获取学历列表
  GetDegreeList: {
    url: API_URL + Platform + '/GetDegreeList',
    data: {}
  },
  //修改手机号
  UpdateMobile: {
    url: API_URL + Platform + '/UpdateMobile',
    data: {
      OldMobile: '',
      NewMobile: '',
      SmgCode: ''
    }
  },
  //发送验证码
  SendMsg: {
    url: API_URL + Platform + '/SendMsg',
    data: {
      MobileNo: ''
    }
  },
  //修改密码
  SetUserPassword: {
    url: API_URL + Platform + '/SetUserPassword',
    data: {
      OldPassword: '',
      Password: ''
    }
  },
  //单位列表
  GetGroupList: {
    url: API_URL + Platform + '/GetGroupList',
    data: {
      ParentId: '1'
    }
  },
  //注册
  Register: {
    url: API_URL + Platform + '/Register',
    data: {
      Account: '',
      Password: '',
      Name: '',
      GroupId: '',
      IdCard: '',
      Grade: '',
      Mobile: '',
      SmgCode: '',
      PortalId: 1
    }
  },
  //讨论列表
  DiscussList: {
    url: API_URL + Platform + '/DiscussList',
    data: {
      MainId: '0',
      Sort: 'CreateDate',
      Order: 'desc',
      Page: '1',
      Rows: '10'
    }
  },
  //添加讨论
  AddDiscuss: {
    url: API_URL + Platform + '/AddDiscuss',
    data: {
      MainId: '0',
      ParentId: '0',
      Content: ''
    }
  },
  //课程评论
  getCourseCommentList: {
    url: API_URL + Platform + '/getCourseCommentList',
    data: {
      CourseId: '',
      Keyword: '',
      Page: '1',
      Rows: '10'
    }
  },
  //添加课程评论
  AddCourseComment: {
    url: API_URL + Platform + '/AddCourseComment',
    data: {
      CourseId: '',
      Content: '',
      Score: ''
    }
  },
  //添加评论 objType 0：文章、1：课程、2：电子书、3：学习圈
  AddComment: {
    url: API_URL + Platform + '/AddComment',
    data: {
      ObjType: 1,
      ObjId: 2,
      Content: '',
      Star: ''
    }
  },
  //提交精品课程进度
  SyncUserStudyData: {
    url: API_URL + Platform + '/SyncUserStudyData',
    data: {
      CourseId: '',
      Data: {
        NodeId: '',
        Time: '',
        Status: ''
      }
    }
  },
  //提交Mp4课程进度
  UploadTimeNode: {
    url: API_URL + Platform + '/UploadTimeNode',
    data: {
      CourseId: '',
      TimeNode: ''
    }
  },
  //相关课程
  RelatedCourse: {
    url: API_URL + Platform + '/RelatedCourse',
    data: {
      CourseId: '',
      Page: 1,
      Rows: 10
    }
  },
  //成果展示分类
  GetProductionTypeInfoList: {
    url: API_URL + Platform + '/GetProductionTypeInfoList',
    data: {
      ParentId: '',
      ParentCode: ''
    }
  },
  //成果展示列表
  GetProductionInfoList: {
    url: API_URL + Platform + '/GetProductionInfoList',
    data: {
      CategoryId: '',
      CategoryCode: '0',
      Keyword: '',
      Page: 1,
      Rows: 10
    }
  },
  //成果展示详情
  GetProductionInfo: {
    url: API_URL + Platform + '/GetProductionInfo',
    data: {
      Id: ''
    }
  },
  //学习档案
  GetUserRecordList: {
    url: API_URL + Platform + '/GetUserRecordList',
    data: {
      Page: 1,
      Rows: 10,
      OrderType: '1',
      OrderDesc: 'desc'
    }
  },
  //收藏列表
  GetCollectionList: {
    url: API_URL + Platform + '/GetCollectionList',
    data: {
      startTime: '',
      endTime: ''
    }
  },
  //添加收藏 objType 0：文章、1：课程、2：电子书、3：学习圈
  AddCollectionList: {
    url: API_URL + Platform + '/AddCollectionList',
    data: {
      CollectionName: '',
      Remark: '',
      ObjId: '',
      ObjType: 0
    }
  },
  //删除收藏
  DeleteCollectionList: {
    url: API_URL + Platform + '/DeleteCollectionList',
    data: {
      IdItem: []
    }
  },
  //考试记录
  GetPaperList: {
    url: API_URL + Platform + '/GetPaperList',
    data: {}
  },
  //课程笔记列表
  GetExperience: {
    url: API_URL + Platform + '/GetExperience',
    data: {
      CourseId: ''
    }
  },
  //添加课程笔记
  AddExperience: {
    url: API_URL + Platform + '/AddExperience',
    data: {
      CourseId: '',
      ExperienceContent: '',
      ExperienceTitle: ''
    }
  },
  //课程笔记详情
  GetExperienceById: {
    url: API_URL + Platform + '/GetExperienceById  ',
    data: {
      ExperienceId: ''
    }
  },
  //获取收件箱，发件箱  0：收件、1：发件
  GetUserMessage: {
    url: API_URL + Platform + '/GetUserMessage',
    data: {
      MessageType: ''
    }
  },
  //根据用户名查询用户
  GetUserByName: {
    url: API_URL + Platform + '/GetUserByName',
    data: {
      UserName: ''
    }
  },
  //发送站内信
  AddUserMessage: {
    url: API_URL + Platform + '/AddUserMessage',
    data: {
      ToUser: '',
      MessageContent: '',
      MessageTitle: ''
    }
  },
  //站内信详情
  GetMessage: {
    url: API_URL + Platform + '/GetMessage',
    data: {
      MessageId: ''
    }
  },
  //获取微信签名code
  Auth: {
    url: API_URL + Platform + '/Auth',
    data: null
  },
  //点赞 0：文章 1：课程 2：电子书 3：学习圈 4：成果展示
  AddUserAiss: {
    url: API_URL + Platform + '/AddUserAiss',
    data: {
      ObjId: '',
      ObjType: 4
    }
  }
};
