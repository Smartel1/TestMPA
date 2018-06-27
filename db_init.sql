﻿INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
  (1, 'Пицца', '2018-03-04 06:09:46', '2018-03-04 06:09:46'),
  (2, 'Роллы', '2018-03-04 06:09:55', '2018-03-04 06:09:55'),
  (3, 'Блюда WOK', '2018-03-08 01:21:04', '2018-03-08 01:21:04');

INSERT INTO `templates` (`id`, `name`, `category_id`, `image`, `created_at`, `updated_at`, `description`) VALUES
  (1, 'Ассорти', 1, 'assorti.png', '2018-03-04 06:10:48', '2018-03-04 06:10:48', 'Сервелат, ветчина, грудка копченая\r\nкуриная, шампиньоны, маслины,\r\nтоматный соус, помидоры, сыр '),
  (2, 'Филадельфия maxi', 2, 'filamax.png', '2018-03-04 06:31:12', '2018-03-04 06:31:12', 'no description defined'),
  (3, 'Охотничья', 1, 'hunt.png', '2018-03-05 09:42:21', '2018-03-05 09:42:21', 'Сервелат, охотничьи колбаски,\r\nшампиньоны, сочные помидоры,\r\nсоус «Фирменный», сыр'),
  (4, 'Классическая', 1, 'classic.png', '2018-03-07 12:32:49', '2018-03-07 12:32:49', 'Ветчина, шампиньоны, томатный соус, сыр \"Моцарелла\"'),
  (5, 'Мясная', 1, 'meat.png', '2018-03-07 12:33:55', '2018-03-07 12:33:55', 'Сервелат, бекон, ветчина, свинина\r\nмаринованная, сочные помидоры,\r\nтоматный соус, сыр'),
  (6, 'Сомен с курицей в кис-сл', 3, 'somenks.png', '2018-03-08 01:24:04', '2018-03-08 01:24:04', 'Пшеничная лапша сомен с кусочками куриного филе');

INSERT INTO `items` (`id`, `template_id`, `unit`, `price`, `created_at`, `updated_at`) VALUES
  (1, 1, '30см', 419, '2018-03-04 06:21:00', '2018-03-04 06:21:00'),
  (2, 1, '40см', 569, '2018-03-04 06:21:14', '2018-03-04 06:21:14'),
  (3, 2, '260гр', 299, '2018-03-04 06:32:04', '2018-03-04 06:32:04'),
  (4, 3, '30см', 359, '2018-03-05 09:43:58', '2018-03-05 09:43:58'),
  (5, 3, '40см', 509, '2018-03-07 12:35:54', '2018-03-07 12:35:54'),
  (6, 5, '30см', 419, '2018-03-07 12:37:32', '2018-03-07 12:37:32'),
  (7, 5, '40см', 569, '2018-03-07 12:38:10', '2018-03-07 12:38:10'),
  (8, 4, '40см', 509, '2018-03-07 12:38:22', '2018-03-07 12:38:22'),
  (9, 4, '30см', 359, '2018-03-07 12:38:30', '2018-03-07 12:38:30'),
  (10, 6, '330гр', 237, '2018-03-08 01:37:30', '2018-03-08 01:37:30');

INSERT INTO `users` (`id`, `email`, `tel`, `address`, `name`, `isAdmin`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
  (6, 'smartel93@mail.ru', '89127756485', 'Металлургов, 15-12', 'Андрей', 1, '$2y$10$hGBQiE6nkKfWfBIdzz/iQuqExeE7djtMIHw1IZn3aFHGkVknDXA8y', '2pWMI71j0SGgE1Q9FJXnIeUYG13xIpwm35hYKehj4Vn6AuD6V7EiKbiIraLi', '2018-03-22 10:10:39', '2018-03-31 05:36:38');