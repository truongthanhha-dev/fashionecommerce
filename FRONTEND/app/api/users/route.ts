import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

// GET: lấy thông tin người dùng
export const GET = async (req: NextRequest) => {
  try {
    // nơi xác thực người dùng
    const { userId } = await auth();
    console.log("User ID from Clerk:", userId);
    if (!userId) {
      // return new NextResponse(JSON.stringify({ message: "Người dùng chưa đăng nhập" }), { status: 401 })
      return new NextResponse("Người dùng chưa đăng nhập" , { status: 401 })
    }
 
    await connectToDB()
    
    // Tìm kiếm người dùng có clerkId trùng với userId trong cơ sở dữ liệu.
    let user = await User.findOne({ clerkId: userId })

    // Tạo người dùng mới nếu chưa có trong cơ sở dữ liệu
    if (!user) {
      user = await User.create({ clerkId: userId })
      await user.save()
    }

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[users_GET]", err)
    return new NextResponse("Lỗi máy chủ nội bộ", { status: 500 })
  }
}

// function auth(): { userId: any; } {
//   throw new Error("Chức năng chưa được triển khai(api/users/route");
// }
