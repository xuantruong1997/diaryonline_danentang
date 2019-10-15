-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 15, 2019 lúc 05:35 PM
-- Phiên bản máy phục vụ: 10.1.29-MariaDB
-- Phiên bản PHP: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nhatki`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diary`
--

CREATE TABLE `diary` (
  `id_diary` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `title` text,
  `content` text NOT NULL,
  `date` date NOT NULL,
  `note` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `diary`
--

INSERT INTO `diary` (`id_diary`, `id_user`, `title`, `content`, `date`, `note`) VALUES
(1, 4, 'Thứ 2', 'Thái nguyên ngày thứ 2 mệt mỏi!\r\ncả ngày lên lớp giữa thời tiết nóng ức thật mệt. bao nhiêu báo cáo, bài tập lớn.. Mệt lắm', '2019-10-07', '#MissYou'),
(3, 4, 'Sinh nhật', 'Hôm nay là sinh nhật mình. Các bạn tới chúc mừng rất đồn. Cô ấy cũng vậy :)\r\nMình sẽ mãi nhớ về hững kỷ niệm này. Cảm ơn Emm :*', '2019-10-11', 'Happy ^_^'),
(8, 4, '#001', 'Hôm nay đi tập Gym 1 mình chán. Uowsc gì có ai đó để đấm 1 phát hahah', '2019-10-11', 'Tired'),
(11, 2, 'Sinh nhat', 'Hôm nay la sinh dua ban than cua toi.', '2019-10-11', 'Trung'),
(13, 4, 'chồng thốiiii ummmm', 'Hôm nay NÔ đánh rắm hơi nhiều. Xin lỗi Hĩm nhé hihi', '2019-10-12', 'Mãi Yêu hĩm111'),
(14, 4, 'Dau qua', 'ngay th01b1ee9 hai k1ec3 t01b1eeb hôm t1eadp tay.th01b1ef1c s01b1ef1 r1ea5t 0111au 01, 0111au l0101eafm k th1ec3 du1ed5i n1ed5i tay ra 011101b001a1ee3', '2019-10-12', '0111au'),
(15, 2, 'tt1', '´dhasdhooomddd n1ea0103s', '2019-10-12', 'h1ea1i 01b001a1eddca');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`) VALUES
(1, 't', '123'),
(2, 'truong', '123'),
(3, 'hihi', '123'),
(4, 'xuantruong', '123'),
(5, 'a', 'a'),
(6, '1', '1'),
(7, 'Yén', '123');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `diary`
--
ALTER TABLE `diary`
  ADD PRIMARY KEY (`id_diary`),
  ADD KEY `k` (`id_user`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `diary`
--
ALTER TABLE `diary`
  MODIFY `id_diary` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `diary`
--
ALTER TABLE `diary`
  ADD CONSTRAINT `k` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
