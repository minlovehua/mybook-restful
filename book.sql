/*
 Navicat Premium Data Transfer

 Source Server         : mybook
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : book

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 05/12/2019 09:47:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '三国演义', '罗贯中', '文学', '一个杀伐纷争的年代啊啊啊');
INSERT INTO `book` VALUES (2, '水浒传', '施耐庵', '文学', '108条好汉的故事');
INSERT INTO `book` VALUES (3, '红楼梦-Love Stroy', '曹雪芹', '文学', '一个封建王朝的缩影');
INSERT INTO `book` VALUES (4, '浪潮之巅', '吴军', '计算机', 'IT巨头的兴衰史');
INSERT INTO `book` VALUES (5, '笑傲江湖', '金庸', '文学', '武侠小说');
INSERT INTO `book` VALUES (6, '开心最重要呀呀呀', '冯宝宝', '杂谈', '健康、爱、快乐、自由、幸福呀呀呀');
INSERT INTO `book` VALUES (7, '小两口的暖心事', '冯宝宝', '杂谈', '夫妻之间的暖心小动作有助于增进感情。');
INSERT INTO `book` VALUES (8, '哈哈哈', '小小', '可爱', '开心是件大事');
INSERT INTO `book` VALUES (9, '如果可以', '鸟儿', '幻想', '随便想想');
INSERT INTO `book` VALUES (10, '红楼梦 good', '小冬', '文学', '爱情故事');
INSERT INTO `book` VALUES (11, '电影大全', '风儿', '娱乐', '这里有很多好看的电影的影评哦');
INSERT INTO `book` VALUES (12, '大学生', '西西', '杂志', '励志大学生的故事');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123');

SET FOREIGN_KEY_CHECKS = 1;
