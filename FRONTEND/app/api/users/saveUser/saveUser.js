
import User from "@/lib/models/User"; // Mô hình người dùng 
import { connectToDB } from "@/lib/mongoDB"; 
import { auth } from "@clerk/nextjs/server";

const saveUserToDB = async (userId) => {
  try {
    await connectToDB();

    // Tìm người dùng trong cơ sở dữ liệu với clerkId
    const existingUser = await User.findOne({ clerkId: userId });

    // Nếu không tìm thấy người dùng, tạo một người dùng mới
    if (!existingUser) {
      const newUser = new User({ clerkId: userId, wishlist: [] });
      await newUser.save();
      console.log('New user saved:', newUser);
    } else {
      console.log('User already exists:', existingUser);
    }
  } catch (error) {
    console.error('Error saving user to DB:', error);
  }
};

export default async function handler(req, res) {
  const { userId } = auth();

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await saveUserToDB(userId);
  res.status(200).json({ message: 'User saved successfully' });
}
