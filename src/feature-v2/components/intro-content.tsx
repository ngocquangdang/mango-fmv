import React from "react";

const IMAGE_VERSION = "1";

const BRANDS = [
  {
    name: "FACIAL BAR",
    image: "/images/home/brand/facial-bar.png",
  },
  {
    name: "MANGO",
    image: "/images/home/brand/sendoro-retreat.png",
  },
  {
    name: "BEN & TOD",
    image: "/images/home/brand/logo-benTod.png",
  },
  {
    name: "SENDORO",
    image: "/images/home/brand/logo-02.png",
  },
];
const IntroContent: React.FC = () => {

  return (
    <div className="flex flex-col items-center text-center text-[#7b3400] font-normal h-full overflow-y-auto custom-scrollbar px-2 ">
      <div className="flex items-center gap-1 absolute top-10 left-10">
        <img src="/fav.png" alt="" className="w-6.5 h-5.5 object-contain" />
        <span className='uppercase text-[#EC6525] font-sans text-xs font-bold border-l pl-2'>original</span>
      </div>
      <img
        src={`/images/LOGO_GCNMN.png?v=${IMAGE_VERSION}`}
        alt="Logo"
        className="w-30 object-contain mb-2"
      />

      <h3 className="text-[#EC6525] text-[15px] xl:text-lg mb-2">
        Phim tương tác đầu tiên Việt Nam
      </h3>

      <div className="text-xs space-y-2 mb-4 leading-tight text-[#3667EF] text-start px-8 font-sans">
        <p className='mb-1'>
          Gõ Cửa Nhà Mỹ Nam là phim tương tác đầu tiên tại Việt Nam do MangoPlus
          sản xuất với sự tham gia của các nghệ sĩ Hồ Đông Quan, Cường Bạch,
          Thái Lê Minh Hiếu, Lâm Anh, Phúc Nguyên và khách mời Long Hoàng.
        </p>
        <p>
          Khán giả không chỉ xem nội dung và còn có thể tương tác như: lựa chọn
          nội dung, sưu tầm vật phẩm, bình chọn nhân vật yêu thích, sưu tầm thẻ
          ảnh thần tượng,...
        </p>
      </div>
      <hr className="w-[60%] border-[#EC6525]" />
      <div className="pt-2 w-full">
        <h4 className="text-[#EC6525] text-[15px]">
          Cảm ơn sự đồng hành
        </h4>
        <div className="flex flex-wrap justify-center items-center gap-4 opacity-80">
          {BRANDS.map((brand, index) => (
            <img
              key={index}
              src={brand.image}
              alt={brand.name}
              className="max-w-[74px] w-14"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroContent;
