// đại diện cho người dùng trong cơ sở dữ liệu, cho phép thực hiện các thao tác tạo, đọc, cập nhật và xóa (CRUD)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: String,
  wishlist: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;