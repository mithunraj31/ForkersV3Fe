export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Back To Top',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    EventSummary: 'Event Summary',
    EventDetail: 'Event Detail',
    EventMap: 'Event Map',
    EventVideo: 'Event Video',
    DriveSummary: 'Drive Summary',
    DriveRoute: 'Drive Route',
    CreateVideo: 'Create Video',
    DeviceListing: 'Device Listings',
    OperatorListing: 'Operator Listings',
    newDriver: 'New Operator',
    editDriver: 'Edit Operator',
    RfidListing: 'RFID Listings',
    newRfid: 'New RFID',
    editRfid: 'Edit RFID',
    rfidHistory: 'Rfid History',
    driverDetail: 'Operator Information',
    assignOperator: 'Assign Operator',
    assignRFID: 'Assign RFID',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile',
    userListings: 'User listings',
    customerListings: 'Company listings',
    newCustomer: 'New customer',
    editCustomer: 'Edit customer',
    roleListings: 'Role listings',
    newRole: 'New role',
    editRole: 'Edit role',
    groupManagement: 'Group Manangement',
    newUser: 'New user',
    editUser: 'Edit User',
    manufacturerListings: 'Manufacturer listings',
    newManufacturer: 'New manufacturer',
    editManufacturer: 'Edit manufacturer',
    vehicleModelListings: 'Vehicle model listings',
    newVehicleModel: 'New vehicle model',
    editVehicleModel: 'Edit vehicle model',
    vehicleListings: 'Vehicle listings',
    newVehicle: 'New vehicle',
    editVehicle: 'Edit vehicle'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login',
    logIn: 'Login',
    username: 'Username',
    password: 'Password'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  message: {
    languageChanged: 'Language has been changed',
    invalidDatetimeRange: 'Datetime range, Duration should be between',
    videoDuration: 'Video duration should be between',
    noVideo: 'No video',
    videoIsProcessing: 'Video is processing',
    driverIdRequired: 'OperatorId is Required',
    nameRequired: 'Name is Required',
    dobRequired: 'DOB is Required',
    addressRequired: 'Address is Required',
    licenseNoRequired: 'License Number is Required',
    licenseReceivedDateRequired: 'License ReceivedDate is Required',
    licenseRenewalDateRequired: 'License ExpiryDate is Required',
    licenseLocationRequired: 'License Location is Required',
    phoneNumberRequired: 'Phone Number is Required',
    driverHasBeenCreated: 'Operator is created',
    driverHasBeenEdited: 'Operator has been edited',
    confirmDelete: 'Are you sure you want to delete {0}?',
    confirmRemove: 'Are you sure you want to UnAssign Operator and RFID for {0}?',
    userNameRequired: 'User Name is Required',
    stkUserRequired: 'STK user is Required',
    emailRequired: 'Email is Required',
    roleRequired: 'Role is Required',
    passwordRequired: 'Password is Required',
    confirmPasswordRequired: 'Confirm Password is Required',
    passwordMismatch: 'Confirm Password should be same as Password',
    invalidLength: 'Password should be minimum 6 characters.',
    emailNotValid: 'Enter a valid email',
    emailAlreadyRegistered: 'Email Already Registered',
    customerNameRequired: 'Customer Name Required',
    customerDescriptionRequired: 'Customer Desceiption  Required',
    deviceNameRequired: 'Device name is required',
    serialNumberRequired: 'Serial number is required',
    deviceHasBeenCreated: 'Device has been created',
    somethingWentWrong: 'Something went wrong',
    deviceHasBeenDeleted: 'Device has been deleted',
    deviceHasBeenEdited: 'Device has been edited',
    userHasBeenCreated: 'User has been created',
    userHasBeenDeleted: 'User has been deleted',
    userHasBeenEdited: 'User has been edited',
    customerHasBeenCreated: 'Customer has been created',
    customerHasBeenDeleted: 'Customer has been deleted',
    customerHasBeenEdited: 'Customer has been edited',
    maintenanceInfoHasBeenCreated: 'Maintenance has been created',
    maintenanceInfoHasBeenDeleted: 'Maintenance has been deleted',
    maintenanceInfoHasBeenEdited: 'Maintenance has been edited',
    descriptionRequired: 'Description is required',
    operatorHasAssigned: 'Operator has been Assigned',
    operatorIsRemoved: 'Operator is Removed',
    rfidDataHasBeenCreated: 'RFID has been created',
    rfidDataHasBeenEdited: 'RFID has been edited',
    driverIdNotFound: 'OperatorId Not Found',
    roleHasBeenCreated: 'Role has been created',
    roleHasBeenDeleted: 'Role has been deleted',
    roleHasBeenEdited: 'Role has been edited',
    groupHasBeenCreated: 'Group has been created',
    groupHasBeenDeleted: 'Group has been deleted',
    groupHasBeenEdited: 'Group has been edited',
    rfidHasAssigned: 'RFID has been Assigned',
    rfidIsRemoved: 'RFID is Removed',
    rfidRequired: 'RFID is Required',
    driverHasBeenDeleted: 'Operator Has been Deleted',
    rfidHasBeenDeleted: 'RFID Has been Deleted',
    customerRequired: 'Customer Required',
    ownerRequired: 'Owner Required',
    groupRequired: 'Group reguired',
    manufacturerRequired: 'Manufacturer name is required',
    manufacturerHasBeenCreated: 'Manufacturer has been created',
    manufacturerHasBeenDeleted: 'Manufacturer has been deleted',
    manufacturerHasBeenEdited: 'Manufacturer has been edited',
    vehicleModelNameRequired: 'Vehicle model name is required',
    seriesNameRequired: 'Series name is required',
    vehicleModelHasBeenCreated: 'Vehicle model has been created',
    vehicleModelHasBeenDeleted: 'Vehicle model has been deleted',
    vehicleModelHasBeenEdited: 'Vehicle model has been edited',
    selectCustomer: 'Select Customer First to View Suggestions',
    vehicleHasBeenCreated: 'Vehicle has been created',
    vehicleHasBeenDeleted: 'Vehicle has been deleted',
    vehicleHasBeenEdited: 'Vehicle has been edited'
  },

  event: {
    eventId: 'Event ID',
    deviceId: 'Device ID',
    type: 'Type',
    video: 'Video',
    company: 'Company',
    driverId: 'Drive ID',
    latitude: 'Latitude',
    longitude: 'Longitude',
    gx: 'GX',
    gy: 'GY',
    gz: 'GZ',
    roll: 'Roll',
    pitch: 'Pitch',
    status: 'Status',
    direction: 'Direction',
    speed: 'Speed',
    videoId: 'Video ID',
    time: 'Time',
    username: 'Username',
    title: 'Title',
    value: 'Value',
    yaw: 'YAW',
    deviceDetails: 'Device details',
    mapsView: 'Maps view',
    videoProcessing: 'Still processing video please wait'

  },

  device: {
    deviceId: 'Device ID',
    type: 'Type',
    userName: 'User',
    driverId: 'Driver ID',
    drive: 'Drive',
    route: 'Route',
    video: 'Video',
    device: 'Device'
  },

  type: {
    Manual: 'Manual',
    Time: 'Time',
    Motion: 'Motion',
    Speed: 'Speed',
    Gsensor: 'Gsensor',
    Temperature: 'Temperature',
    Alaram: 'Alaram',
    Button: 'Button',
    RFID: 'RFID',
    Accelerate: 'Accelerate',
    Deceleration: 'Deceleration',
    TurnAngle: 'TurnAngle',
    TurnGyroscope: 'TurnGyroscope',
    Impact: 'Impact',
    TurnLeft: 'Turn Left',
    TurnRight: 'Turn Right',
    clip: 'Clip',
    default: 'default',
    none: 'none',
    Acceleration: 'Acceleration'
  },

  video: {
    available: 'Available',
    noCamera: 'No Camera'
  },

  general: {
    action: 'Action',
    minutes: 'Minutes',
    seconds: 'Seconds',
    thisHour: 'This hour',
    toDay: 'Today',
    thisWeek: 'This week',
    thisMonth: 'This month',
    begin: 'Begin',
    end: 'End',
    and: 'and',
    video: 'Video',
    create: 'Create',
    history: 'History',
    edit: 'Edit',
    delete: 'Delete',
    reset: 'Reset',
    save: 'Save',
    images: 'Images',
    description: 'Description',
    back: 'Return',
    cancel: 'Cancel',
    confirm: 'Confirm',
    warning: 'Warning',
    id: 'ID',
    company: 'Company',
    image: 'Image',
    createdAt: 'Created at',
    updatedAt: 'Updated at',
    newest: 'Newest',
    oldest: 'Oldest',
    admin: 'Admin',
    user: 'User',
    readOnly: 'Read only',
    all: 'All',
    latitude: 'Latitude',
    longitude: 'Longitude',
    clear: 'Clear',
    add: 'Add',
    view: 'View',
    select: 'Select',
    assigned: 'Assigned',
    unAssigned: 'UnAssigned'
  },
  maps: {
    status: {
      running: 'Running',
      stopping: 'Stopping'
    },
    event: {
      suddenAccelaration: 'Sudden acceleration',
      suddenDeceleration: 'Sudden deceleration',
      suddenHandle: 'Sudden handle',
      accident: 'Accident'
    },
    online: 'Online',
    offline: 'Offline'
  },

  onDemandVideo: {
    videoPeriod: 'Video period',
    fromBegin: 'From begin',
    fromEnd: 'From end',
    customRange: 'Custom range',
    timeRange: 'Time range',
    duration: 'Duration',
    datetime: 'Datetime',
    submitButton: 'Create',
    clearButton: 'Clear'
  },

  driveSummary: {
    drivingData: '\'s Driving data',
    event: '\'s Event',
    vehicleDrivingData: 'Vehicle driving data',
    operatorDrivingData: 'Operator driving data',
    discovered: 'discovered',
    totalEngineDuration: 'Total Engine Duration',
    totalDriveDuration: 'Total Drive Duration',
    engine: 'Engine',
    driver: 'Driver',
    eventLabel: 'Event',
    operator: 'Operator',
    routeMap: '',

    startDatetime: 'Start',
    endDatetime: 'End',
    type: 'type',
    duration: 'Duration',
    operations: 'Operations',
    datetime: 'Datetime',
    maps: 'Maps',
    running: 'Running'
  },

  driver: {
    listings: {
      id: 'ID',
      driverId: 'Operator',
      age: 'Age',
      name: 'Name',
      licenseNo: 'License Number',
      licensevalidTill: 'License Valid Till',
      phoneNo: 'Phone Number',
      rfid: 'RFID',
      unMapRFID: 'Remove RFID',
      mapRFID: 'Assign RFID',
      customer: 'Customer'

    },
    new: {
      title: 'New Operator',
      assignRfid: 'Assign RFID'
    },
    edit: {
      title: 'Edit Operator'
    },
    form: {
      driverId: 'OperatorId',
      dob: 'DOB',
      name: 'Name',
      licenseNo: 'License Number',
      phoneNo: 'Phone Number',
      address: 'Address',
      licenseLocation: 'License Location',
      licenseReceived: 'License Received Date',
      licenseRenewal: 'License Valid Till',
      operatorName: 'Operator Name',
      customer: 'Customer'
    }
  },

  rfid: {
    listings: {
      id: 'Id',
      rfid: 'RFID',
      createdBy: 'Created By',
      assignStatus: 'Assign Status',
      notAssigned: 'Not Assigned',
      assigned: 'Operator Assigned',
      mapOperator: 'Assign Operator',
      unMapOperator: 'Remove Operator',
      assignedFrom: 'Start Date',
      assignedTill: 'End Date',
      total: 'Total'
    },
    new: {
      title: 'New RFID',
      operatorHistory: 'RFID Operator History',
      assignOperator: 'Assign Operator'
    },
    edit: {
      title: 'Edit RFID'
    },
    form: {
      rfid: 'RFID',
      customer: 'Customer',
      owner: 'Owner',
      group: 'Group'

    }
  },
  user: {
    listings: {
      userId: 'ID',
      userName: 'Name',
      userEmail: 'Email',
      userRole: 'Role',
      userUpdated: 'Last updated',
      selectUser: 'Select user',
      total: 'Total'
    },
    new: {
      title: 'New User'
    },
    edit: {
      title: 'Edit User'
    },
    form: {
      firstName: 'First name',
      lastName: 'Last name',
      userEmail: 'Email',
      userRole: 'Role',
      userPassword: 'Password',
      userConfirmPassword: 'Confirm',
      changePassword: 'Change Password',
      sysRole: 'System role',
      groups: 'Groups',
      pleaseSelectUserGroup: 'Please select group'
    }
  },

  customer: {
    new: {
      title: 'New company'
    },

    edit: {
      title: 'Edit company'
    },

    listings: {
      id: 'ID',
      name: 'Name',
      stkUser: 'STK User',
      updated: 'Last updated'
    },

    form: {
      name: 'Name',
      description: 'Description',
      stkUser: 'STK user'
    }
  },

  role: {
    new: {
      title: 'New role'
    },

    edit: {
      title: 'Edit role'
    },

    listings: {
      id: 'ID',
      name: 'Name',
      resources: 'Resources',
      updated: 'Last updated'
    },

    form: {
      name: 'Name',
      description: 'Description',
      companyListings: 'Company listings',
      resources: 'Resources',
      device: 'Device',
      event: 'Event',
      operator: 'Operator',
      user: 'User',
      role: 'Role',
      group: 'Group',
      customer: 'Customer',
      vehicle: 'Vehicle',
      rfid: 'RFID',
      driver: 'Driver',
      manufacturer: 'Manufacturer'
    }
  },

  group: {
    id: 'Group ID',
    new: {
      title: 'New group'
    },
    newest: 'Newest group',
    form: {
      name: 'Group name',
      description: 'description'
    },
    filterPlaceholder: 'Search by group name',
    append: 'Append',
    delete: 'Delete'
  },
  manufacturer: {
    new: {
      title: 'New Manufacturer'
    },
    listings: {
      id: 'ID',
      name: 'Name',
      description: 'Description',
      updated: 'Last updated'
    },
    form: {
      customer: 'Customer',
      name: 'Name',
      description: 'Description'
    }
  },
  vehicleModel: {
    listings: {
      id: 'ID',
      name: 'Name',
      seriesName: 'Series name',
      updated: 'Last updated'
    },
    new: {
      title: 'New model'
    },
    edit: {
      title: 'Edit model'
    },
    form: {
      manufacturer: 'Manufacturer',
      name: 'Name',
      seriesName: 'Series name',
      modelName: 'Model Name',
      powerType: 'Power Type',
      structuralMethod: 'Structural Method',
      engineModel: 'Engine Model',
      ratedLoad: 'Rated Load(kg)',
      forkLength: 'Fork Length(mm)',
      forkWidth: 'Fork Width(mm)',
      standardLift: 'Standard Lift(mm)',
      maximumLift: 'Maximum Lift(mm)',
      batteryVoltage: 'Battery Voltage(V)',
      batteryCapacity: 'Battery Capacity(Ah)',
      fuelTankCapcity: 'Fuel Tank Capacity(L)',
      bodyWeight: 'Body Weight(kg)',
      bodyLength: 'Body Length(mm)',
      bodyWidth: 'Body Width(mm)',
      headGuardHeight: 'Head Guard Height(mm)',
      minTurningRadius: 'Minimum Turning Radius(mm)',
      refLoadCenter: 'Reference Load Center(mm)',
      tireSizeFrontWheel: 'Tire Size Front Wheel',
      tireSizeRearWheel: 'Tire Size Rear Wheel',
      remarks: 'Remarks'
    }
  },
  vehicle: {
    listings: {
      id: 'ID',
      name: 'Name',
      description: 'description',
      updated: 'Last updated'
    },
    new: {
      title: 'New vehicle'
    },
    edit: {
      title: 'Edit vehicle'
    },
    form: {
      name: 'Name',
      description: 'description'
    }
  }
}
