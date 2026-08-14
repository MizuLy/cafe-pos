/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `drink`;
CREATE TABLE `drink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `total_price` decimal(10,2) GENERATED ALWAYS AS (`price` * `quantity`) STORED,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `drink` (`id`, `item_name`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
(10, 'Coca Cola', '1.00', 'https://static.vecteezy.com/system/resources/thumbnails/036/573/453/small/a-can-of-coca-cola-drink-isolated-free-png.png', '2026-03-08 12:14:27', '2026-03-11 10:13:47'),
(11, 'Matcha Cream', '2.50', 'https://allpurposeveggies.com/wp-content/uploads/2023/11/IMG_34542-How-to-Make-Sweet-Matcha-Whipped-Cream-300x300.jpg', '2026-03-08 12:15:13', '2026-03-08 12:15:13'),
(12, 'Cafe Latte', '2.70', 'https://images.pexels.com/photos/35747268/pexels-photo-35747268/free-photo-of-artistic-latte-with-beautiful-foam-design.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', '2026-03-08 12:15:49', '2026-03-08 12:15:49'),
(13, 'Choco Latte', '3.00', 'https://www.lifeslittlesweets.com/wp-content/uploads/2018/04/IMG_8541-Chocolate-Latte-www.lifeslittlesweets.com-Caf%C3%A9-Bustelo-680x1020-680x1020.jpg', '2026-03-08 12:16:25', '2026-03-08 12:16:25'),
(14, 'Peach Mint Soda', '1.70', 'https://farm6.staticflickr.com/5695/20798197525_11536a8b70_z.jpg', '2026-03-08 12:19:01', '2026-03-08 12:19:01'),
(16, 'Green Tea', '2.00', 'https://media.istockphoto.com/id/687939536/photo/glass-cups-with-green-tea-and-tea-leaves-isolated-on-white.jpg?s=612x612&w=0&k=20&c=AK1Q7QZA1fbMNPtEocaxIWsTJH8QSNzbfYCZk1EYOjs=', '2026-03-09 09:42:39', '2026-03-09 09:42:39'),
(17, 'Tropical Soda', '3.00', 'https://media.istockphoto.com/id/124014204/photo/cocktail-blue-lagoon.jpg?s=612x612&w=0&k=20&c=CHX_L_0Myh27o-7Ryb86iURRr9Tl2HIrZrOo5rSjhsw=', '2026-03-10 22:18:05', '2026-03-10 22:18:31'),
(19, 'Banana Smoothie', '1.25', 'https://cookingwithelo.com/wp-content/uploads/2022/06/Frozen-banana-smoothie-recipe-720x1080.jpg', '2026-03-11 10:24:07', '2026-03-11 10:24:07'),
(20, 'Hawaii Mai Tai', '5.00', 'https://media.istockphoto.com/id/1371336759/photo/hawaii-mai-tai-drinks-on-waikiki-beach-swimming-pool-bar-travel-vacation-in-honolulu-hawaii.jpg?s=612x612&w=0&k=20&c=EN7SElvkhtEUA90cVIaXOa5j3aqFQg1H2CGoMg92Otg=', '2026-03-15 00:00:08', '2026-03-15 00:00:08');
INSERT INTO `order` (`id`, `item_name`, `price`, `quantity`, `created_at`) VALUES
(5, 'Matcha Cream', '2.50', 5, '2026-03-04 09:25:55'),
(13, 'Coca Cola', '1.00', 12, '2026-03-10 10:22:25'),
(14, 'Peach Mint Soda', '1.70', 4, '2026-03-10 10:36:22'),
(15, 'Cafe Latte', '2.70', 12, '2026-03-10 10:55:12'),
(16, 'Peach Mint Soda', '1.70', 10, '2026-03-10 22:12:23'),
(17, 'Tropical Blue Soda', '3.00', 2, '2026-03-10 22:18:21'),
(19, 'Matcha Cream', '2.50', 15, '2026-03-11 10:07:09'),
(20, 'Banana Smoothie', '1.25', 23, '2026-03-11 23:00:06'),
(21, 'Peach Mint Soda', '1.70', 4, '2026-03-12 22:12:28'),
(22, 'Choco Latte', '3.00', 2, '2026-03-12 22:12:28'),
(23, 'Choco Latte', '3.00', 4, '2026-03-12 22:12:55'),
(24, 'Peach Mint Soda', '1.70', 1, '2026-03-12 22:12:55'),
(25, 'Green Tea', '2.00', 14, '2026-03-12 22:27:44'),
(26, 'Peach Mint Soda', '1.70', 1, '2026-03-12 22:54:47'),
(27, 'Banana Smoothie', '1.25', 1, '2026-03-12 23:00:30'),
(28, 'Tropical Soda', '3.00', 3, '2026-03-12 23:00:30'),
(29, 'Hawaii Mai Tai', '5.00', 8, '2026-03-15 00:00:36'),
(30, 'Tropical Soda', '3.00', 1, '2026-03-15 00:00:36');
INSERT INTO `user` (`id`, `name`, `email`, `password`, `avatar`, `created_at`) VALUES
(1, 'Mizu', 'mizu@gmail.com', '$2b$10$oYyOZHHzuVJLanvbqt.aMOlsCpqjcnlBe3lkwMXW48VRCC4owvXhq', 'https://m.gettywallpapers.com/wp-content/uploads/2023/07/Kisuke-Urahara-Profile-Photo.jpg', '2026-03-04 10:34:02'),
(2, 'Liza', 'liza@gmail.com', '$2b$10$9B5nLmfANUDQ0D0YKumVWeCtb/gho2E2MJmOC0fTFq/3FotT2Uefm', '', '2026-03-04 20:57:53'),
(3, 'Anjing', 'dara@gmail.com', '$2b$10$mIZKtPKFLvw1BgSooAn44O/61k/Znh3cpIwIHzKyfMgIpsCLDHvba', 'https://i.pinimg.com/originals/c9/72/11/c9721154073fa2c22dfbd2040a2580a6.jpg', '2026-03-12 20:41:03'),
(4, 'Houng', 'houng@gmail.com', '$2b$10$GvV/u2a79iLsgbkZG/GkHul8.eO0gq8SC1Z8zLLk822PAIIPKagRm', '', '2026-03-12 20:46:10'),
(5, 'quack', 'quack@gmail.com', '$2b$10$RQsh4YFgI4VGBXri52M9T.LFNnE97GExzgwT886p6AYyYgD1tgFre', '', '2026-03-12 20:51:14'),
(6, 'name', 'name@gmail.com', '$2b$10$erBuJ.l9uG6Wlydot19lReosnoZU2.BMLcmQFv./YAu5RfgXhUkhm', '', '2026-03-12 20:52:44'),
(7, 'Banana', 'banana@gmail.com', '$2b$10$FXk3rCYxMH3rXrO623XgSOTnVOo1bwasaxEw5.zfOuDtUmdDKLUYO', 'https://t4.ftcdn.net/jpg/11/89/01/77/360_F_1189017769_0kQbeVAihIf14w3uvJx70dU1CyHlNgZ7.jpg', '2026-03-14 12:24:32');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;