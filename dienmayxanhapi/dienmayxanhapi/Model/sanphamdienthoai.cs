using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Options;
using MongoDB.Driver;

namespace dienmayxanhapi
{
    public class sanphamdienthoai
    {
        
        public Int32? _id { get; set; }
        public String ten { get; set; }
        public String thuonghieu { get; set; }
        public IList<hinh> hinh { get; set; }
        public String dacdiemnoibat { get; set; }
        public int? giaban { get; set; }
        public int? giamgia { get; set; }
        [BsonRepresentation(BsonType.Int32, AllowTruncation = true)]
        public int? sosao { get; set; }
        public int? _id_loaisanpham { get; set; }
        public String hinhdaidien { get; set; }
        public IList<hinh> gioithieu { get; set; }
        [BsonElement("thongsokythuat")]
        public IList<dynamic> thongsokythuat { get; set; }


    }
    public class hinh
    {
        public String hinhanh { get; set; }
        public String mota { get; set; }
    }
    public class thongsokythuat
    {
        [BsonElement("Màn hình")]
        public List<manhinh> manhinh { get; set; }
        

        [BsonElement("Camera sau")]
        public List<Camerasau> Camerasau { get; set; }

        [BsonElement("Camera trước")]
        public List<Cameratruoc> Cameratruoc { get; set; }

        [BsonElement("Hệ điều hành - CPU")]
        public List<hdh> hdh { get; set; }

        [BsonElement("Bộ nhớ & Lưu trữ")]
        public List<bonhovaluutru> bonhovaluutru { get; set; }

        [BsonElement("Kết nối")]
        public List<ketnoi> ketnoi { get; set; }

        [BsonElement("Thiết kế & Trọng lượng")]
        public List<thietkevatrongluong> thietkevatrongluong { get; set; }

        [BsonElement("Thông tin pin & Sạc")]
        public List<pinvasac> pinvasac { get; set; }

        [BsonElement("Tiện ích")]
        public List<tienich> tienich { get; set; }

        [BsonElement("Thông tin khác")]
        public List<thongtinkhac> thongtinkhac { get; set; }
        
    }


    public class manhinh
    {
        [BsonElement("Công nghệ màn hình")]
        public String congnghemanhinh {
            get; set;
        }

        [BsonElement("Độ phân giải")]
        public String dophangiai { get; set; }

        [BsonElement("Màn hình rộng")]
        public String manhinhrong { get; set; }

        [BsonElement("Mặt kính cảm ứng")]
        public String matkinhcamung { get; set; }
    }

    public class Camerasau
    {
        [BsonDefaultValue("Độ phân giải")]       

        [BsonElement("Độ phân giải")]
        public String dophangiai { get; set; }
        
        [BsonElement("Quay Phim")]
        public string quayphim { get; set; }
        
        [BsonElement("Đèn Flash")]
        public String denflash { get; set; }

        [BsonElement("Chụp ảnh nâng cao")]
        public String chupanhnangcao { get; set; }
    }

    public class Cameratruoc
    {
        [BsonElement("Độ phân giải")]
        public String dophangiai { get; set; }

        [BsonElement("Videocall")]
        public String Videocall { get; set; }

        [BsonElement("Thông tin khác")]
        public String thongtinkhac { get; set; }
    }

    public class hdh
    {
        [BsonElement("Hệ điều hành")]
        public String hedieuhanh { get; set; }
        
        [BsonElement("Chipset (hãng SX CPU)")]
        public String chipset { get; set; }

        [BsonElement("Tốc độ CPU")]
        public String tocdocpu { get; set; }

        [BsonElement("Chip đồ họa (GPU)")]
        public String gpu { get; set; }
    }

    public class bonhovaluutru
    {
        [BsonElement("RAM")]
        public String ram { get; set; }

        [BsonElement("Bộ nhớ trong")]
        public String rom { get; set; }

        [BsonElement("Bộ nhớ còn lại (khả dụng)")]
        public String romkd { get; set; }

        [BsonElement("Thẻ nhớ ngoài")]
        public String sd { get; set; }
    }

    public class ketnoi
    {
        [BsonElement("Mạng di động")]
        public String mangdidong { get; set; }

        [BsonElement("SIM")]
        public String sim { get; set; }

        [BsonElement("HOT")]
        public String hot { get; set; }

        [BsonElement("Wifi")]
        public String wifi { get; set; }

        [BsonElement("GPS")]
        public String gps { get; set; }

        [BsonElement("Bluetooth")]
        public String bluetooth { get; set; }

        [BsonElement("Cổng kết nối/sạc")]
        public String congknvasac { get; set; }

        [BsonElement("Jack tai nghe")]
        public String jacktainghe { get; set; }

        [BsonElement("Kết nối khác")]
        public String knkhac { get; set; }
    }

    public class thietkevatrongluong
    {
        [BsonElement("Thiết kế")]
        public String thietke { get; set; }

        [BsonElement("Chất liệu")]
        public String chatlieu { get; set; }

        [BsonElement("Kích thước")]
        public String kichthuoc { get; set; }

        [BsonElement("Trọng lượng")]
        public String trongluong { get; set; }
    }

    public class pinvasac
    {
        [BsonElement("Loại pin")]
        public String loaipin { get; set; }

        [BsonElement("Dung lượng pin")]
        public String dunglưongpin { get; set; }

        [BsonElement("Công nghệ pin")]
        public String congnghepin { get; set; }
    }

    public class tienich
    {
        [BsonElement("Bảo mật nâng cao")]
        public String baomatnc { get; set; }

        [BsonElement("Tính năng đặc biệt")]
        public String tinhnangdacbiet { get; set; }

        [BsonElement("Ghi âm")]
        public String ghiam { get; set; }

        [BsonElement("Xem phim")]
        public String xemphim { get; set; }

        [BsonElement("Nghe nhạc")]
        public String nghnhac { get; set; }
    }

    public class thongtinkhac
    {
        [BsonElement("Thời điểm ra mắt")]
        public String thoidiemramat { get; set; }
    }
}
