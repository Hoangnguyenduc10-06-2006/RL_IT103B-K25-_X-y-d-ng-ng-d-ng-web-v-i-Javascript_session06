let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

let isRegistered = false;
let memberName = "";
let memberPhone = "";
let packageType = "";
let isPT;
let currentBill = 0;
let choice;
let comboChoice;
const currentYear = new Date().getFullYear();

do {
  choice = parseInt(
    prompt(`
           HỆ THỐNG QUẢN LÝ PHÒNG TẬP GYM    
    =========================================
    1: Đăng ký và chuẩn hóa hồ sơ hội viên mới.
    2: Tính tiền gói tập và áp dụng chính sách giảm giá.
    3: Quét mã thẻ check-in tại cửa quay.
    4: Xuất báo cáo thống kê ca trực và thoát.
    Vui lòng chọn một tùy chọn (1-4): 
    `),
  );
  switch (choice) {
    case 1:
      memberName = prompt("Nhập tên hội viên: ");
      if (memberName === null || memberName.trim() === "") {
        console.log("Tên hội viên không được để trống. Vui lòng thử lại.");
        break;
      }
      if (/[^a-zA-ZÀ-ỹ\s]/.test(memberName)) {
        console.log("ko được nhập ký tự đặc biệt và số, vui lòng thử lại.");
        break;
      }
      memberName = memberName
        .trim()
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      console.log(memberName);

      memberPhone = prompt("Nhập số điện thoại: ");
      if (memberPhone === null || memberPhone.trim() === "" || !/^\d+$/.test(memberPhone.trim())) {
        console.log("Số điện thoại không hợp lệ (không chứa chữ, số âm hay số thập phân). Vui lòng thử lại.");
        break;
      }
      memberPhone = memberPhone.trim();

      let standardChoice = parseInt(
        prompt(`

    Bạn muốn đăng kí gói tập nào?
    1. STANDARD
    2. VIP
`),
      );

     if (standardChoice === 1) {
        packageType = "STANDARD";
        console.log("Đăng ký gói STANDARD thành công.");
      } else if (standardChoice === 2) {
        packageType = "VIP";
        console.log("Đăng ký gói VIP thành công.");
      } else {
        console.log("Lựa chọn gói tập không hợp lệ. Vui lòng thử lại.");
        break; 
      }
      let PTChoice = parseInt(
        prompt(`

    Bạn muốn tập luyện cùng PT ko?
    1. có 
    2. không
`),
      );

      if (PTChoice === 1) {
        isPT = true;
      } else if (PTChoice === 2) {
        isPT = false;
      } else {
        console.log("Lựa chọn PT không hợp lệ. Vui lòng thử lại.");
        break; 
      }

     comboChoice = parseInt(prompt(`Bạn muốn tập luyện bao nhiêu tháng?`));
      if (isNaN(comboChoice) || comboChoice <= 0) {
        console.log("Số tháng không hợp lệ. Vui lòng thử lại.");
        break;
      }
      isRegistered = true;
      
      break;
    case 2:
      if (isRegistered) {
        if (isPT) {
            currentBill = packageType === "STANDARD" ? 500000 * comboChoice + 300000*30 : 800000 *comboChoice + 300000*30;
        } else {
            currentBill = packageType === "STANDARD" ? 500000 *comboChoice : 800000 *comboChoice;
        }

        if(comboChoice>=12){
            currentBill *= 0.75;
        }else if(comboChoice>=6){
            currentBill *= 0.85;
        }
         console.log("thanh toán thành công, tổng tiền là: " + currentBill + " VNĐ");
        totalRevenue += currentBill;
        registeredMembers++;
        isRegistered = false
      }else {
        console.log("Vui lòng đăng ký hội viên trước khi tính tiền gói tập.");
      }
      
      break;
    case 3:
            let checkIn = prompt("Quét mã thẻ check-in: ");
            if (checkIn === null || checkIn.trim() === "") {
                console.log("Mã thẻ check-in không được để trống. Vui lòng thử lại.");
                break;
            }
            if (checkIn.toUpperCase().startsWith("GYM-") && checkIn.toUpperCase().endsWith(String(currentYear))) {
                checkInCount++;
                console.log("Check-in thành công. Chúc bạn có buổi tập hiệu quả!");
            }else {
                console.log("Mã thẻ check-in không hợp lệ. Vui lòng thử lại.");
            }
    
      break;
    case 4: {
      console.log("\n==================================================");
      console.log("       BÁO CÁO TỔNG KẾT TÀI CHÍNH CA TRỰC        ");
      console.log("==================================================");
      console.log(
        "- Tổng số hội viên đã đăng ký (registeredMembers) : " +
          registeredMembers,
      );
      console.log(
        "- Tổng lượt check-in cửa quay  (checkInCount)      : " + checkInCount,
      );
      console.log(
        "- Tổng doanh thu thực tế thu về (totalRevenue)     : " +
          totalRevenue +
          " VNĐ",
      );

      console.log("==================================================");
      console.log("Đã kết thúc phiên làm việc. Tạm biệt!");
      break;
    }
    default:
      console.log("Lựa chọn không hợp lệ, vui lòng chọn số từ 1 đến 4.");
      break;
  }
} while (choice !== 4);
