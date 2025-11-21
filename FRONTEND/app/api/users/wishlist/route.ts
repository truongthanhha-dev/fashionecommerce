// thêm hoặc xóa sản phẩm vào danh sách yêu thích
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    console.log("User ID from Clerk:", userId);
    if (!userId) {
      return new NextResponse("Người dùng chưa đăng nhập", { status: 401 })
    }

    await connectToDB()

    // Tìm người dùng dựa trên clerkId khớp với userId trong cơ sở dữ liệu.
    const user = await User.findOne({ clerkId: userId })
    if (!user) {
      return new NextResponse("Không tìm thấy người dùng", { status: 404 })
    }

    // productId được lấy từ body của yêu cầu POST.
    const { productId } = await req.json()
    if (!productId) {
      return new NextResponse("Mã sản phẩm bắt buộc", { status: 400 })
    }

    // Kiểm tra sản phẩm đã có trong wishlist hay chưa
    const isLiked = user.wishlist.includes(productId)

    if (isLiked) {
      // Xóa sản phẩm khỏi wishlist
      user.wishlist = user.wishlist.filter((id: string) => id !== productId)
    } else {
      // Thêm sản phẩm vào wishlist
      user.wishlist.push(productId)
    }

    // Lưu thay đổi và trả về thông tin người dùng
    await user.save()
    return NextResponse.json(user, { status: 200 })
    
  } catch (err) {
    console.log("[wishlist_POST]", err);
    return new NextResponse("lỗi máy chủ nội bộ", { status: 500 });
  }
}
// function auth(): { userId: any; } {
//   throw new Error("Chức năng chưa được triển khai(api/users/wishlist/route");
// }

