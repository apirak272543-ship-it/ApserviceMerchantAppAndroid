# AP Store — Android capability boundary

## ใช้ใน APK

AP Store ใช้ `INTERNET` เพื่อเปิด Store Console, `POST_NOTIFICATIONS` สำหรับออร์เดอร์และข้อความใหม่ และ `ACCESS_COARSE_LOCATION`/`ACCESS_FINE_LOCATION` แบบ foreground เพื่อเปิดแผนที่และยืนยันจุดให้บริการในฟังก์ชันที่ผู้ใช้เลือกใช้

การแจ้งเตือนจะขอสิทธิ์เมื่อร้านค้าเปิดการแจ้งเตือนในเมนูของแอป ส่วนตำแหน่งจะขอเมื่อหน้าเว็บร้องขอการใช้ตำแหน่งหรือเมื่อผู้ใช้ใช้งานแผนที่เท่านั้น แอปไม่เปิดการติดตามตำแหน่งเบื้องหลัง

## ไม่ขอสิทธิ์

ไม่มีการขอกล้อง ไมโครโฟน ภาพ/สื่อ รายชื่อ หรือสิทธิ์ตำแหน่งเบื้องหลัง เพราะ shell ปัจจุบันไม่มี native feature ที่ใช้สิทธิ์เหล่านั้น การอัปโหลดไฟล์จากหน้าเว็บใช้ browser/WebView flow ของเว็บไซต์ตามเดิม

## ข้อตกลง WebView bridge

เว็บไซต์สามารถส่ง `ap-service-store-confirm-action` เพื่อยืนยันการกระทำสำคัญ และสามารถรองรับ `ap-service-native-notification` สำหรับออร์เดอร์หรือข้อความใหม่ได้ Native shell ตรวจข้อมูลก่อนแจ้งเตือนและไม่ยอมรับคำสั่ง native ทั่วไปจากเว็บ

## ข้อจำกัดการส่ง Push จาก server

source มี EAS project ID, Google services และ Expo notification channel แล้ว การส่ง remote push ต้องลงทะเบียน Expo token ของอุปกรณ์กับ backend หลังผู้ใช้อนุญาตการแจ้งเตือน
