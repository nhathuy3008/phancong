// const mongoose = require('mongoose');
// const moment = require('moment-timezone');
// const { Schema } = mongoose;

// const carSchema = new Schema({
//   plateNumber: {
//     type: String,
//     required: [true, 'Biển số xe là bắt buộc'],
//   },
//   carType: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'CateCar',
//     required: [true, 'Loại xe là bắt buộc']
//   },
//   workers: [{
//     worker: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Worker',
//       required: true
//     },
//     role: {
//       type: String,
//       enum: ['main', 'sub'],
//       required: true
//     }
//   }],
//   supervisor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Supervisor'
//   },
//   condition: {
//     type: String,
//     enum: ['vip', 'good', 'normal', 'warranty', 'rescue'],
//     default: null
//   },
//   isLate: {
//     type: Boolean,
//     default: false
//   },
//   location: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Location',
//     required: false
//   },
//   deliveryTime: {
//     type: String,
//     default: null // VD: "20-06-2025 15h"
//   },
//   currentTime: {
//     type: String,
//     default: () => {
//       return moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
//     }
//   },
//   currentDate: {
//     type: String,
//     default: () => {
//       return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
//     }
//   },
//   status: {
//     type: String,
//     enum: [
//       'pending',           // Chờ hàng (chờ linh kiện từ kho)
//       'working',           // Đang sửa  
//       'done',              // Sửa xong
//       'waiting_wash',      // Chờ rửa xe
//       'waiting_handover',  // Chờ bàn giao
//       'delivered',         // Đã giao
//       'additional_repair'  // Sửa phát sinh
//     ],
//     default: 'working'
//   },
//   statusHistory: [{
//     status: {
//       type: String,
//       enum: [
//         'pending', 'working', 'done', 'waiting_wash',
//         'waiting_handover', 'delivered', 'additional_repair'
//       ]
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now
//     },
//     note: String
//   }]
// }, { timestamps: true });

// // Middleware để cập nhật statusHistory và isLate
// carSchema.pre('save', function (next) {
//   // Ghi lại lịch sử khi status thay đổi
//   if (this.isModified('status')) {
//     this.statusHistory.push({
//       status: this.status,
//       timestamp: new Date()
//     });
//   }

//   // Kiểm tra nếu trễ hẹn (chưa giao và quá deliveryTime)
//   if (
//     this.deliveryTime &&
//     this.status !== 'delivered' &&
//     moment().isAfter(moment(this.deliveryTime, 'DD-MM-YYYY HH[h]'))
//   ) {
//     this.isLate = true;
//   } else {
//     this.isLate = false;
//   }

//   next();
// });
//   workerLogs: [{
//     worker: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Worker',
//       required: true
//     },
//     action: {
//       type: String,
//       required: true
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now
//     },
//     note: {
//       type: String
//     }
//   }],

// // Static method để lấy tên trạng thái tiếng Việt
// carSchema.statics.getStatusLabel = function (status) {
//   const statusLabels = {
//     'pending': 'Chờ hàng',
//     'working': 'Đang sửa',
//     'done': 'Sửa xong',
//     'waiting_wash': 'Chờ rửa xe',
//     'waiting_handover': 'Chờ bàn giao',
//     'delivered': 'Đã giao',
//     'additional_repair': 'Sửa phát sinh'
//   };
//   return statusLabels[status] || status;
// };

// // Instance method để lấy trạng thái hiện tại
// carSchema.methods.getCurrentStatusLabel = function () {
//   return this.constructor.getStatusLabel(this.status);
// };

// module.exports = mongoose.model('Car', carSchema);
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const { Schema } = mongoose;

const carSchema = new Schema({
  plateNumber: {
    type: String,
    required: [true, 'Biển số xe là bắt buộc'],
  },
  carType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CateCar',
    required: [true, 'Loại xe là bắt buộc']
  },
  workers: [{
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true
    },
    role: {
      type: String,
      enum: ['main', 'sub'],
      required: true
    }
  }],
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor'
  },
  condition: {
    type: String,
    enum: ['vip', 'good', 'normal', 'warranty', 'rescue'],
    default: null
  },
  isLate: {
    type: Boolean,
    default: false
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: false
  },
  deliveryTime: {
    type: String,
    default: null // VD: "20-06-2025 15h"
  },
  currentTime: {
    type: String,
    default: () => {
      return moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
    }
  },
  currentDate: {
    type: String,
    default: () => {
      return moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
    }
  },
  status: {
    type: String,
    enum: [
      'pending',           // Chờ hàng
      'working',           // Đang sửa
      'done',              // Sửa xong
      'waiting_wash',      // Chờ rửa xe
      'waiting_handover',  // Chờ bàn giao
      'delivered',         // Đã giao
      'additional_repair'  // Sửa phát sinh
    ],
    default: 'working'
  },
  statusHistory: [{
    status: {
      type: String,
      enum: [
        'pending', 'working', 'done', 'waiting_wash',
        'waiting_handover', 'delivered', 'additional_repair'
      ]
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }],
  workerLogs: [{
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true
    },
    action: {
      type: String,
      required: true // 'added' | 'removed'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String
    }
  }]
}, { timestamps: true });


// Middleware: tự động lưu history khi đổi trạng thái và check isLate
carSchema.pre('save', function (next) {
  // Lưu status mới vào lịch sử nếu thay đổi
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date()
    });
  }

  // Kiểm tra trễ hẹn (so sánh thời gian hiện tại và deliveryTime)
  if (
    this.deliveryTime &&
    this.status !== 'delivered' &&
    moment().isAfter(moment(this.deliveryTime, 'DD-MM-YYYY HH[h]'))
  ) {
    this.isLate = true;
  } else {
    this.isLate = false;
  }

  next();
});

// Static method: Trả về nhãn tiếng Việt cho trạng thái
carSchema.statics.getStatusLabel = function (status) {
  const statusLabels = {
    'pending': 'Chờ hàng',
    'working': 'Đang sửa',
    'done': 'Sửa xong',
    'waiting_wash': 'Chờ rửa xe',
    'waiting_handover': 'Chờ bàn giao',
    'delivered': 'Đã giao',
    'additional_repair': 'Sửa phát sinh'
  };
  return statusLabels[status] || status;
};

// Instance method: lấy nhãn trạng thái hiện tại
carSchema.methods.getCurrentStatusLabel = function () {
  return this.constructor.getStatusLabel(this.status);
};

module.exports = mongoose.model('Car', carSchema);
