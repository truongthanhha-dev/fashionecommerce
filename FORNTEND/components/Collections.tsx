// hiển thị danh sách bộ sưu tập (collections) lấy từ một API 

import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

// Khai báo component Collections:lấy dữ liệu các bộ sưu tập và lưu 
const Collections = async () => {
  const collections = await getCollections();

  return (
    // căn giữa và tạo khoảng cách giữa các phần tử bên trong.
    <div className="flex flex-col items-center gap-10 py-0 px-5">
      {/* tiêu đề:hiển thị với kiểu chữ lớn */}
      <p className="text-heading1-bold tracking-wide text-brown shadow-none ">Bộ sưu tập</p>
      {/* Nếu collections không có hoặc rỗng:thông báo "No collections found" */}
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">Không tìm thấy bộ sưu tập nào</p>
      ) : (
        // Nếu có dữ liệu
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}>
              <Image
                key={collection._id}
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                // className="rounded-lg cursor-pointer"
                className="w-[400px] h-[200px] object-cover rounded-lg cursor-pointer shadow-2xl"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
