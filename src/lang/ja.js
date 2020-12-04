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
    DeviceListing: 'デバイスリスト',
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
    profile: 'プロフィール'
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
    videoIsProcessing: 'ビデオは処理中'
  },

  user: {
    listings: {
      userId: 'ID',
      userName: '会社名',
      userVehicle: '車両',
      userRunning: '走っている'
    }
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
    none: '無し'
  },

  device: {
    deviceId: 'デバイスID',
    type: 'タイプ',
    userName: 'ユーザー',
    driverId: 'ドライバーID',
    drive: '概要',
    route: 'ルート',
    video: 'ビデオ'
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
    end: '終了'
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
    duration: '期限',
    datetime: '日付時刻',
    submitButton: '作成',
    clearButton: 'クリアー'
  }
}
