const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const participantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, 'Nama depan harus diisi'],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      require: [true, 'Email harus diisi'],
    },
    password: {
      type: String,
      required: [true, 'Password harus diisi'],
    },
    role: {
      type: String,
      default: '-',
    },
    status: {
      type: String,
      enum: ['aktif', 'tidak aktif'],
      default: 'tidak aktif',
    },
    otp: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

participantSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next()
});

participantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Participants', participantSchema);