// ========== JavaScript 注释学习 ==========

// ----------------------------------------
// 1. 单行注释 (Single-line Comment)
// ----------------------------------------
// 使用两个斜杠 //，注释内容从 // 到行尾

let userName = "Alice"; // 用户名
let age = 25;           // 用户年龄

// 下面这行代码被注释掉了，不会执行
// console.log("这行不会输出");


// ----------------------------------------
// 2. 多行注释 (Multi-line Comment)
// ----------------------------------------
/* 使用斜杠加星号开始，星号加斜杠结束
   可以跨越多行 */

/*
  这是一个多行注释的示例。
  适合用于较长的说明文字，
  或者临时屏蔽一段代码。
*/

let product = {
  name: "Laptop",
  price: 9999,          /* 价格（人民币） */
  stock: 100            /* 库存数量 */
};


// ----------------------------------------
// 3. 注释的用途
// ----------------------------------------

// 3.1 解释代码意图
function calculateDiscount(price, discountRate) {
  // 如果折扣率不合法（小于0或大于1），返回原价
  if (discountRate < 0 || discountRate > 1) {
    return price;
  }
  // 计算折后价格：原价 × (1 - 折扣率)
  return price * (1 - discountRate);
}

// 3.2 临时禁用代码（调试时常用）
/*
console.log("调试信息 A");
console.log("调试信息 B");
console.log("调试信息 C");
*/

// 3.3 标记 TODO / FIXME
// TODO: 添加用户身份验证逻辑
// FIXME: 这里的性能需要优化


// ----------------------------------------
// 4. JSDoc 风格注释（函数文档）
// ----------------------------------------

/**
 * 计算两个数的和
 * @param {number} a - 第一个加数
 * @param {number} b - 第二个加数
 * @returns {number} 两数之和
 * @example
 * // 返回 8
 * add(3, 5);
 */
function add(a, b) {
  return a + b;
}

/**
 * 根据 ID 获取用户信息
 * @param {string} userId - 用户唯一标识
 * @returns {Object|null} 用户对象，找不到则返回 null
 */
function getUserById(userId) {
  // 模拟查询逻辑
  const users = {
    "u001": { name: "张三", age: 20 },
    "u002": { name: "李四", age: 25 }
  };
  return users[userId] || null;
}


// ----------------------------------------
// 5. 运行示例
// ----------------------------------------

console.log("=== 注释学习代码 ===");
console.log("折后价格:", calculateDiscount(1000, 0.2)); // 800
console.log("3 + 5 =", add(3, 5));                    // 8
console.log("用户 u001:", getUserById("u001"));       // { name: "张三", age: 20 }

/*
  练习建议：
  1. 试着取消上面某段被注释的代码，看看输出变化
  2. 给自己写的代码加上清晰的注释
  3. 尝试用 JSDoc 注释描述一个你写的函数
*/
