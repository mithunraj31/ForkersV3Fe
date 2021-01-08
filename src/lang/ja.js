export default {
  route: {
    dashboard: 'トップ',
    documentation: 'ドキュメント',
    guide: 'ガイド',
    permission: '権限',
    rolePermission: '権限ロール',
    pagePermission: 'ページ権限',
    directivePermission: 'ディレクティブ権限',
    icons: 'アイコン',
    components: 'コンポーネント',
    tinymce: 'TinyMCE',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Drag-And-Drop',
    splitPane: 'パネル',
    avatarUpload: 'アバターアップロード',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'コンポーネントMixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag 看板',
    charts: 'チャート',
    keyboardChart: 'Keyboardチャート',
    lineChart: 'Lineチャート',
    mixChart: 'Mixチャート',
    example: 'Example',
    nested: 'Nested Routes',
    EventSummary: 'イベントの概要',
    EventDetail: 'イベントの詳細',
    EventMap: 'イベントマップ',
    EventVideo: 'イベントビデオ',
    DriveSummary: 'ライブの概要',
    DriveRoute: 'ライブルート',
    CreateVideo: 'ビデオの作成',
    DeviceListing: 'デバイスリスト',
    OperatorListing: 'オペレーターリスト',
    newDriver: 'オペレーターを追加',
    editDriver: 'オペレーターの編集',
    RfidListing: 'RFIDリスト',
    newRfid: 'RFIDを追加',
    editRfid: 'RFIDの編集',
    rfidHistory: 'RFIDの履歴',
    driverDetail: 'オペレーター情報',
    assignOperator: '演算子の割り当て',
    assignRFID: 'RFIDを割り当てる',
    menu1: 'メニュー１',
    'menu1-1': 'メニュー 1-1',
    'menu1-2': 'メニュー 1-2',
    'menu1-2-1': 'メニュー 1-2-1',
    'menu1-2-2': 'メニュー 1-2-2',
    'menu1-3': 'メニュー 1-3',
    menu2: 'メニュー 2',
    Table: 'Table',
    dynamicTable: '可変 Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit Table',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'フォーム',
    createArticle: '投稿作成',
    editArticle: '投稿編集',
    articleList: '投稿リスト',
    errorPages: 'エラーページ',
    page401: '401',
    page404: '404',
    errorLog: 'エラーログ',
    excel: 'Excel',
    exportExcel: '一括エクスポート',
    selectExcel: '複数選択エクスポート',
    mergeHeader: 'ヘッダーマージ',
    uploadExcel: 'アップロード',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'テーマ変更',
    clipboardDemo: 'Clipboard',
    i18n: '多言語',
    externalLink: '外部リンク',
    profile: 'プロフィール',
    userListings: 'ユーザー',
    customerListings: '会社リスト',
    newCustomer: '会社を追加',
    editCustomer: '会社を編集',
    roleListings: 'ロールリスト',
    newRole: 'ロールを追加',
    editRole: 'ロールを編集',
    groupManagement: 'グループを管理',
    newUser: 'ユーザーを追加',
    editUser: 'ユーザーを編集'
  },
  navbar: {
    dashboard: 'トップ',
    github: 'GitHub',
    logOut: 'ログアウト',
    profile: 'プロフィール',
    theme: 'テーマ変更',
    size: '画面サイズ'
  },
  login: {
    title: 'ユーザログイン',
    logIn: 'ログイン',
    username: 'ユーザ名',
    password: 'パスワード'
  },
  documentation: {
    documentation: 'ドキュメント',
    github: 'Github Link'
  },
  permission: {
    addRole: 'ロール追加',
    editPermission: 'ロール変更',
    roles: 'ロール',
    switchRoles: 'ロール切替',
    tips: 'v-permissionは使えない時があります。例えば: Element-UI の el-tab、 el-table-column 及び他の dom。v-ifを使う必要があります。',
    delete: '削除',
    confirm: '確認',
    cancel: 'キャンセル'
  },
  guide: {
    description: 'ガイドは各機能の説明です。',
    button: 'ガイドを見る'
  },
  components: {
    documentation: 'ドキュメント',
    tinymceTips: 'tinymceは管理画面に重要な機能ですが、その同時に落とし穴がありあす。tinymceを使う道のりが大変でした。Tinymceを使う時に各自のプロジェクト状況で判断が必要です。ドキュメントはこちら',
    dropzoneTips: 'Third partyのパッケージを使わず、独自の実装しています。詳細は @/components/Dropzone',
    stickyTips: 'ページの指定位置へスクロールした場合、表示されます。',
    backToTopTips1: 'トップへスクロールが表示されます。',
    backToTopTips2: 'ボタンのスタイルはカスタマイズできます。例えば、show/hide、height、position。 またはElementのel-tooltipを使って、ツールチップを実装できます。',
    imageUploadTips: 'mockjsは使えないため、カスタマイズしています。公式の最新バージョンを使ってください。'
  },
  table: {
    dynamicTips1: '先頭は固定、最後に追加',
    dynamicTips2: '戦後に追加せず、指定列に追加',
    dragTips1: 'デフォルト順番',
    dragTips2: 'Drag後の順番',
    title: 'タイトル',
    importance: '重要',
    type: 'タイプ',
    remark: '評価',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    reviewer: 'レビュアー',
    id: '番号',
    date: '日時',
    author: '作成者',
    readings: '閲覧数',
    status: 'ステータス',
    actions: '操作',
    edit: '編集',
    publish: '公開',
    draft: '下書き',
    delete: 'キャンセル',
    cancel: 'キャンセル',
    confirm: '確認'
  },
  example: {
    warning: '新規作成と編集画面は keep-alive を使えないです。keep-alive の include はrouteのキャッシュは使えないです。そのため、component name を使ってキャッシュさせるようにします。このようなキャッシュ機能を作りたい場合，localStorageを使う手があります。もしくは keep-alive の includeを使って、全ページキャッシュする方法はあります。'
  },
  errorLog: {
    tips: '右上のbugアイコンをクリックしてください。',
    description: '管理画面はspaを使う場合が多い、ユーザ体現向上はできますが、想定外エラーが発生する場合があります。Vueはそのエラーハンドリング機能を提供し、エラーレポートができます。',
    documentation: 'ドキュメント'
  },
  excel: {
    export: 'エクスポート',
    selectedExport: 'エクスポート対象を選択してください。',
    placeholder: 'ファイル名を入力してください。'
  },
  zip: {
    export: 'エクスポート',
    placeholder: 'ファイル名を入力してください。'
  },
  pdf: {
    tips: 'window.print() を使ってPDFダウンロードしています。'
  },
  theme: {
    change: 'テーマ切替',
    documentation: 'ドキュメント',
    tips: 'Tips: テーマの切り替え方法はnavbarのtheme-pickと異なります、使い方はドキュメントを確認してください。'
  },
  tagsView: {
    refresh: '更新',
    close: '閉じる',
    closeOthers: 'その他閉じる',
    closeAll: 'すべて閉じる'
  },
  settings: {
    title: 'システムテーマ',
    theme: 'テーマ色',
    tagsView: 'Tags-View 開く',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  message: {
    languageChanged: '言語が変更されました',
    invalidDatetimeRange: '日時の範囲、期間は',
    videoDuration: 'ビデオの長さは',
    noVideo: 'ビデオはありません',
    videoIsProcessing: 'ビデオは処理中',
    driverIdRequired: 'オペレーターIdが必要です',
    nameRequired: '名前は必須です',
    dobRequired: 'DOBが必要です',
    addressRequired: '住所が必要です',
    licenseNoRequired: '免許番号が必要です',
    licenseReceivedDateRequired: '免許の受領日が必要です',
    licenseRenewalDateRequired: '免許の有効期限が必要です',
    licenseLocationRequired: '免許の場所が必要です',
    phoneNumberRequired: '電話番号が必要です',
    driverHasBeenCreated: '演算子が作成されました',
    driverHasBeenEdited: '演算子が編集されました',
    confirmDelete: '「{0}」を削除してもよろしいでしょうか',
    confirmRemove: '「{0}」オペレーターとRFIDの割り当てを解除してもよろしいですか？',
    userNameRequired: 'ユーザー名が必要があります',
    stkUserRequired: 'STKユーザーが必要があります',
    emailRequired: 'メールが必要があります',
    roleRequired: '役割が必要があります',
    passwordRequired: 'パスワードが必要があります',
    confirmPasswordRequired: 'パスワードが必要であることを確認',
    passwordMismatch: 'パスワードの確認はパスワードと同じである必要があります',
    invalidLength: 'パスワードは6文字以上である必要があります。',
    emailNotValid: '有効なメールアドレスを入力してください',
    emailAlreadyRegistered: 'すでに登録されたメール',
    customerNameRequired: '顧客名が必要',
    customerDescriptionRequired: '顧客説明必須',
    deviceNameRequired: 'デバイス名は必要があります',
    serialNumberRequired: '通し番号は必要があります',
    deviceHasBeenCreated: 'デバイスが作成されました',
    somethingWentWrong: '何かがうまくいきませんでした',
    deviceHasBeenDeleted: 'デバイスが削除されました',
    deviceHasBeenEdited: 'デバイスが編集されました',
    userHasBeenCreated: 'ユーザーが作成されました',
    userHasBeenDeleted: 'ユーザーが削除されました',
    userHasBeenEdited: 'ユーザーが編集されました',
    customerHasBeenCreated: '顧客が作成されました',
    customerHasBeenDeleted: '顧客が削除されました',
    customerHasBeenEdited: '顧客が編集されました',
    maintenanceInfoHasBeenCreated: 'メンテナンス履歴が作成されました',
    maintenanceInfoHasBeenDeleted: 'メンテナンス履歴が削除されました',
    maintenanceInfoHasBeenEdited: 'メンテナンス履歴が編集されました',
    descriptionRequired: '説明は必要があります',
    customerBeenCreated: '会社が作成されました',
    operatorHasAssigned: 'オペレーターが割り当てました',
    operatorIsRemoved: '演算子が削除されました',
    rfidDataHasBeenCreated: 'RFIDが作成されました',
    rfidDataHasBeenEdited: 'RFIDが編集されました',
    driverIdNotFound: 'オペレーターIdが見つかりません',
    roleHasBeenCreated: 'ロールが作成されました',
    roleHasBeenDeleted: 'ロールが削除されました',
    roleHasBeenEdited: 'ロールが編集されました',
    groupHasBeenCreated: 'グループが作成されました',
    groupHasBeenDeleted: 'グループが削除されました',
    groupHasBeenEdited: 'グループが編集されました',
    rfidHasAssigned: 'RFIDが割り当てました',
    rfidIsRemoved: 'RFIDが削除されました',
    rfidRequired: 'RFIDは必要があります',
    driverHasBeenDeleted: 'オペレーターが削除されました',
    rfidHasBeenDeleted: 'RFIDが削除されました',
    customerRequired: '顧客が必要',
    ownerRequired: '所有者が必要',
    groupRequired: 'グループが必要'
  },

  event: {
    eventId: 'イベントID',
    deviceId: 'デバイスID',
    type: 'タイプ',
    video: 'ビデオ',
    company: '会社',
    driverId: 'ドライバーID',
    latitude: '緯度',
    longitude: '経度',
    gx: 'gx',
    gy: 'gy',
    gz: 'gz',
    roll: 'ロール',
    pitch: 'ピッチ',
    status: '状態',
    direction: '方向',
    speed: '速度',
    videoId: 'ビデオID',
    time: '時間',
    username: 'ユーザー名',
    title: '題名',
    value: '値',
    yaw: 'yaw',
    deviceDetails: 'デバイスの詳細',
    mapsView: 'マップビュー',
    videoProcessing: 'まだビデオを処理していますしばらくお待ちください'

  },

  type: {
    Manual: 'マニュアル',
    Time: '時間',
    Motion: 'モーション',
    Speed: '速度',
    Gsensor: 'Gセンサー',
    Temperature: '温度',
    Alaram: 'アララム',
    Button: 'ボタン',
    RFID: 'RFID',
    Accelerate: '加速',
    Deceleration: '減速',
    TurnAngle: '角度',
    TurnGyroscope: 'ターンジャイロスコープ',
    Impact: '影響',
    TurnLeft: '左折してください',
    TurnRight: '右に曲がる',
    clip: 'クリップ',
    default: 'デフォルト',
    none: '無し',
    Acceleration: '加速'
  },

  video: {
    available: '利用可能なビデオ',
    noCamera: 'カメラがない'
  },

  device: {
    deviceId: 'デバイスID',
    type: 'タイプ',
    userName: 'ユーザー',
    driverId: 'ドライバーID',
    drive: '概要',
    route: 'ルート',
    video: 'ビデオ',
    device: 'デバイス'
  },

  general: {
    action: 'アクション',
    minutes: '分',
    seconds: '秒',
    thisHour: 'この時間',
    toDay: '今日',
    thisWeek: '今週',
    thisMonth: '今月',
    begin: '開始',
    end: '終了',
    and: 'と',
    video: 'ビデオ',
    create: '作成',
    history: '作成',
    edit: '編集',
    delete: '削除',
    save: '保存',
    cancel: 'キャンセル',
    reset: 'リセット',
    images: '写真',
    description: '説明',
    back: '戻る',
    confirm: '確認',
    warning: '注意',
    id: '番号',
    company: '会社',
    image: '写真',
    createdAt: '作成日',
    updatedAt: '編集日',
    newest: '最新',
    oldest: '最古',
    admin: '管理者',
    user: '一般のユーザー',
    readOnly: '読み取り専用のユーザー',
    all: 'すべて',
    latitude: '緯度 (Lat)',
    longitude: '経度 (Lng)',
    add: '追加',
    clear: '入力をクリア',
    assigned: '割り当てられた',
    unAssigned: '未割り当て',
    view: '見る',
    select: '選択'
  },
  maps: {
    status: {
      running: '稼働中',
      stopping: '停止中'
    },
    event: {
      suddenAccelaration: '急発進',
      suddenDeceleration: '急停止',
      suddenHandle: '急旋回',
      accident: '事故'
    },
    online: 'オンライン',
    offline: 'オフライン'
  },

  onDemandVideo: {
    videoPeriod: 'ビデオ期間',
    fromBegin: '最初から',
    fromEnd: '最後から',
    customRange: 'カスタム日付時間範囲',
    timeRange: '時間範囲',
    duration: '時間',
    datetime: '日付時刻',
    submitButton: '作成',
    clearButton: 'クリアー'
  },
  driveSummary: {
    drivingData: 'の走行データ',
    event: 'のイベント',
    vehicleDrivingData: '車両の走行データ',
    operatorDrivingData: 'オペレーターの走行データ',
    discovered: 'が見つかりました',
    totalEngineDuration: 'エンジン合計時間',
    totalDriveDuration: 'ドライブ合計時間',
    engine: 'エンジン',
    driver: '運転者',
    eventLabel: 'イベント',
    operator: 'オペレーター',
    routeMap: '路線図',
    startDatetime: '開始',
    endDatetime: '終了',
    type: '種類',
    duration: '時間',
    operations: 'オペレーション',
    datetime: '日付時刻',
    maps: '地図',
    running: '走行'
  },

  driver: {
    listings: {
      id: 'ID',
      driverId: 'オペレーター',
      age: '年齢',
      name: '名前',
      licenseNo: '免許番号',
      licensevalidTill: '免許有効期限',
      phoneNo: '電話番号',
      rfid: 'RFID',
      unMapRFID: 'RFIDを削除',
      mapRFID: 'RFIDの割り当て'

    },
    new: {
      title: 'オペレーターの追加',
      assignRfid: 'RFIDの割り当て'
    },
    edit: {
      title: 'オペレーターの編集'
    },
    form: {
      driverId: 'オペレーターID',
      dob: 'DOB',
      name: '名前',
      licenseNo: '免許番号',
      phoneNo: '電話番号',
      address: '住所',
      licenseReceived: '免許受領日',
      licenseRenewal: '免許有効期限',
      licenseLocation: '免許の場所',
      operatorName: '演算子名',
      customer: '会社'
    }
  },
  rfid: {
    listings: {
      id: 'ID',
      rfid: 'RFID',
      createdBy: '作成されたユーザー',
      assignStatus: 'ステータスの割り当て',
      notAssigned: 'なし',
      assigned: 'オペレーター割り当て済み',
      mapOperator: '演算子の割り当て',
      unMapOperator: '演算子の削除',
      assignedFrom: '開始日',
      assignedTill: '終了日',
      total: '全RFID数'
    },
    new: {
      title: 'RFIDを追加',
      operatorHistory: 'RFIDのオペレーター履歴',
      assignOperator: '演算子の割り当て'
    },
    edit: {
      title: 'RFIDを編集する'
    },
    form: {
      rfid: 'RFID',
      customer: '会社',
      owner: 'オーナー',
      group: 'グループ'
    }
  },
  user: {
    listings: {
      userId: '番号',
      userName: '名',
      userEmail: 'Eメール',
      userRole: '役割',
      userUpdated: '最終更新時刻',
      selectUser: 'ユーザーを選択',
      total: '全ユーザー数'
    },
    new: {
      title: 'ユーザーを追加'
    },
    edit: {
      title: 'ユーザーの編集'
    },
    form: {
      firstName: '名前',
      lastName: '名字',
      userEmail: 'Eメール',
      userRole: '役割',
      userPassword: 'パスワード',
      userConfirmPassword: '確認',
      changePassword: 'パスワードを変更',
      sysRole: 'システムロール',
      groups: 'グループ',
      pleaseSelectUserGroup: 'グループを選択'
    }
  },

  customer: {
    new: {
      title: '会社を追加'
    },

    edit: {
      title: '会社を編集'
    },

    listings: {
      id: '番号',
      name: '名前',
      stkUser: 'STKユーザー',
      updated: '最終更新時刻'
    },

    form: {
      name: '名前',
      description: '説明',
      stkUser: 'STKユーザー'
    }
  },

  role: {
    new: {
      title: 'ロールを追加'
    },

    edit: {
      title: 'ロールを編集'
    },

    listings: {
      id: '番号',
      name: 'ロール名',
      resources: '許可',
      updated: '最終更新時刻'
    },

    form: {
      name: 'ロール名',
      description: '説明',
      companyListings: '会社リスト',
      resources: '許可',
      device: 'デバイス',
      event: 'イベント',
      operator: 'オペレーター',
      user: 'ユーザー',
      role: 'ロール',
      group: 'グループ',
      customer: '会社',
      vehicle: '車両',
      rfid: 'RFID',
      driver: 'ドライバー'
    }
  },

  group: {
    id: 'グループ番号',
    new: {
      title: 'グループを追加'
    },
    newest: '新グループ',
    form: {
      name: 'グループ名',
      description: '説明'
    },
    filterPlaceholder: 'グループ名で検索',
    append: '追加',
    delete: '削除'
  }

}
