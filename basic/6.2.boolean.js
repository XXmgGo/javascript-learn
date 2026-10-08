// ========== 6.1 布尔类型学习：真值 (Truthy) 与 假值 (Falsy) ==========

/*
  当一个非布尔值用在需要布尔判断的地方（if、&&、||、!、Boolean()），
  JS 会自动把它转成 true 或 false：
  - 转成 false 的值叫「假值 Falsy」
  - 其他全部叫「真值 Truthy」
*/


// ----------------------------------------
// 1. 假值 Falsy（只有 8 个）
// ----------------------------------------

const falsyValues = [
  false,      // 布尔假
  0,          // 数字零
  -0,         // 负零
  0n,         // BigInt 的零
  "",         // 空字符串（'' 和 "" 都算）
  null,       // 空值
  undefined,  // 未定义
  NaN         // 不是数字
];

console.log("=== 假值 Falsy（只有 8 个）===");
falsyValues.forEach((v, i) => {
  console.log(`假值${i + 1}:`, String(v), "→ Boolean:", Boolean(v));
});


// ----------------------------------------
// 2. 真值 Truthy（除假值外，全部为真）
// ----------------------------------------

const truthyValues = [
  true,        // 布尔真
  1,           // 任何非零数字（包括负数）
  -1,
  3.14,
  Infinity,
  "false",     // ⚠️ 内容是 "false" 的字符串也是真值！
  "0",         // ⚠️ 内容是 "0" 的字符串也是真值！
  " ",         // ⚠️ 带空格的字符串是真值（不是空字符串）
  [],          // ⚠️ 空数组是真值
  {},          // ⚠️ 空对象是真值
  Symbol(),
  function(){}
];

console.log("\n=== 真值 Truthy（除假值外全部为真）===");
truthyValues.forEach((v, i) => {
  console.log(`真值${i + 1}:`, String(v), "→ Boolean:", Boolean(v));
});


// ----------------------------------------
// 3. 在 if 中实际使用
// ----------------------------------------

console.log("\n=== if 判断示例 ===");

let username = "";
if (username) {
  console.log("用户名存在");
} else {
  console.log("用户名为空 → 走 else"); // 空字符串是假值，走这里
}

let count = 0;
if (count) {
  console.log("count 有值");
} else {
  console.log("count 是 0 → 走 else"); // 0 是假值，走这里
}

let list = [];
if (list) {
  console.log("空数组 [] 通过了 if 判断"); // [] 是真值，走这里！
}
// 注意：想判断数组是否为空，要用 list.length
if (list.length === 0) {
  console.log("但 list.length === 0，数组确实是空的");
}


// ----------------------------------------
// 4. 逻辑运算符 || 和 && 的返回值
// ----------------------------------------

/*
  && 和 || 返回的不一定是布尔值，而是「参与运算的某个值本身」：
  - || ：从左往右找，返回第一个「真值」；全假则返回最后一个
  - && ：从左往右找，返回第一个「假值」；全真则返回最后一个
*/

console.log("\n=== || 和 && 的返回值 ===");
console.log('"" || "默认值" =', "" || "默认值");          // "默认值"（空字符串假，用右边兜底）
console.log('"张三" || "默认值" =', "张三" || "默认值");   // "张三"（找到第一个真值）
console.log("null || undefined || 0 =", null || undefined || 0); // 0（全假，返回最后）

console.log('"ok" && "继续" =', "ok" && "继续");          // "继续"（全真，返回最后）
console.log('0 && "继续" =', 0 && "继续");                // 0（找到第一个假值）

// 取反 !：会先转布尔再取反，!! 常用于把任意值转成布尔
console.log("!null =", !null);          // true
console.log('!!"hello" =', !!"hello");  // true（等价于 Boolean("hello")）


// ----------------------------------------
// 5. 记忆要点
// ----------------------------------------

/*
  1. 假值只有 8 个：false / 0 / -0 / 0n / "" / null / undefined / NaN
  2. 反直觉的真值："0"、"false"（非空字符串）、[]、{}
  3. 判断空数组用 arr.length === 0，不要直接 if (arr)
  4. || 常用于设置默认值，!! 常用于转布尔
*/

/*
  练习建议：
  1. 自己写几个值，先用 Boolean() 预测结果，再运行验证
  2. 用 || 给一个可能为 undefined 的变量设置默认值
  3. 对比 if (arr) 和 if (arr.length) 的区别
*/
