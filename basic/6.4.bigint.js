// ========== 6.4 BigInt 大整数详解 ==========

/*
  BigInt 是 ES2020 引入的原始类型，用于表示任意精度的整数。
  解决的核心问题：number 只能安全表示 -(2^53-1) ~ 2^53-1，
  超出范围会丢精度（如订单号、雪花 ID、数据库大整数）。

  注意：BigInt 只能表示「整数」，没有小数。
*/


// ----------------------------------------
// 1. 创建 BigInt 的两种方式
// ----------------------------------------

console.log("=== 1. 创建 ===");

// 方式①：字面量末尾加 n（最常用）
let big1 = 123n;
let big2 = 9007199254740993n; // number 无法精确表示这个数，BigInt 可以

// 方式②：BigInt() 函数（参数可以是数字、字符串）
let big3 = BigInt(42);
let big4 = BigInt("9007199254740993"); // 字符串形式最保险

console.log("123n =", big1);
console.log("9007199254740993n =", big2);
console.log("BigInt(42) =", big3);
console.log('BigInt("9007199254740993") =', big4);
console.log("两种方式结果一致 ?", big2 === big4); // true

// 对比：number 已经失真，BigInt 精确
let asNumber = 9007199254740993; // 会被转成 ...92
console.log("number 失真:", asNumber);        // 9007199254740992
console.log("BigInt 精确:", big4);            // 9007199254740993

/*
  ⚠️ BigInt() 不能接受小数：
  BigInt(3.14);       // ❌ RangeError: The number 3.14 cannot be converted to a BigInt
  也不能带非法字符：
  BigInt("abc");      // ❌ SyntaxError
*/


// ----------------------------------------
// 2. 常用运算与函数
// ----------------------------------------

console.log("\n=== 2. 常用运算 ===");

let a = 10n;
let b = 3n;

console.log("加法 10n + 3n =", a + b);        // 13n
console.log("减法 10n - 3n =", a - b);        // 7n
console.log("乘法 10n * 3n =", a * b);        // 30n
console.log("除法 10n / 3n =", a / b);        // 3n —— 注意：直接「截断取整」，不是 3.33...
console.log("取余 10n % 3n =", a % b);        // 1n
console.log("幂   10n ** 3n =", a ** b);      // 1000n

// 负数、一元运算
console.log("-a =", -a);                       // -10n（一元负号支持）

/*
  ⚠️ 一元正号 + 不支持 BigInt！
  +b;  // ❌ TypeError: Cannot convert a BigInt value to a number
  因为 +x 的本质是把 x 转成 number，而 BigInt 禁止隐式转数字。
*/

// 位运算（BigInt 全部支持）
console.log("10n & 3n =", 10n & 3n);          // 2n
console.log("10n | 3n =", 10n | 3n);          // 11n
console.log("10n << 2n =", 10n << 2n);        // 40n

// typeof 检测
console.log("typeof 10n =", typeof 10n);      // "bigint"

// 转回 number（可能丢精度，仅用于确认安全的场景）
console.log("Number(10n) =", Number(a));      // 10
console.log("10n 转字符串:", String(a));       // "10"
console.log("10n.toString():", a.toString()); // "10"

// toString 支持进制参数（和 number 一样）
console.log("255n.toString(16) =", (255n).toString(16)); // "ff"


// ----------------------------------------
// 3. BigInt 与 number 的对比规则
// ----------------------------------------

console.log("\n=== 3. 与 number 比较 ===");

console.log("10n == 10  ?", 10n == 10);   // true —— 宽松比较允许跨类型
console.log("10n === 10 ?", 10n === 10);  // false —— 严格比较类型不同
console.log("10n > 5    ?", 10n > 5);     // true —— 关系运算可以混用
console.log("9007199254740993n > 9007199254740992 ?", 9007199254740993n > 9007199254740992); // true
// 最后一行说明：BigInt 的比较是精确的，number 早就失真了

/*
  ⚠️ 运算不能混用（但比较可以）：
  10n + 5;    // ❌ TypeError: Cannot mix BigInt and other types, use explicit conversions
  必须显式转换：10n + BigInt(5)
*/


// ----------------------------------------
// 4. JSON 序列化的坑（重点）
// ----------------------------------------

console.log("\n=== 4. JSON 序列化的坑 ===");

/*
  坑 ①：JSON.stringify 遇到 BigInt 直接抛 TypeError
  这是最常见的报错场景：接口返回的大数字段被解析成 BigInt 后，
  想存到 localStorage 或再发出去，就会崩。

  示例对象 order 在第 5 节就近声明，下面用注释演示报错：
  // JSON.stringify(order);
  // ❌ TypeError: Do not know how to serialize a BigInt
*/

/*
  坑 ②：JSON.parse 根本不会产出 BigInt
  后端返回 {"id": 9007199254740993}，前端 JSON.parse 后得到的是
  已经失真的小数字 9007199254740992 —— 报错都发生在更早的阶段。
*/

let rawJson = '{"id": 9007199254740993}';
let parsed = JSON.parse(rawJson);
console.log("JSON.parse 解析大数:", parsed.id); // 9007199254740992 —— 精度已丢失！

/*
  坑 ③：序列化后类型变了
  即使成功把 BigInt 转成字符串存下来，读回来时它变成 string，
  不再是 bigint，后续运算还要手动转。
*/


// ----------------------------------------
// 5. JSON 序列化的解决方案
// ----------------------------------------

console.log("\n=== 5. 解决方案 ===");

// 示例对象（就近声明，供本节和下一节使用）
let order = {
  id: 9007199254740993n,  // 订单号用 BigInt 保证精确
  amount: 100,
  name: "订单A"
};

// 方案①：replacer 把 BigInt 转成字符串（最简单常用）
let jsonStr1 = JSON.stringify(order, (key, value) =>
  typeof value === "bigint" ? value.toString() : value
);
console.log("方案① 转字符串:", jsonStr1);
// {"id":"9007199254740993","amount":100,"name":"订单A"}
// 读回来时 id 是字符串，需要 BigInt(data.id) 手动还原

// 方案②：加标记前缀，读回时识别并还原成 BigInt
let jsonStr2 = JSON.stringify(order, (key, value) =>
  typeof value === "bigint" ? "BIGINT:" + value : value
);
console.log("方案② 带标记:", jsonStr2);

// 模拟读取还原
let restored = JSON.parse(jsonStr2, (key, value) => {
  if (typeof value === "string" && value.startsWith("BIGINT:")) {
    return BigInt(value.slice(7));
  }
  return value;
});
console.log("还原后 id 类型:", typeof restored.id, "值:", restored.id); // bigint 9007199254740993n

// 方案③：给 BigInt.prototype 全局加 toJSON（一劳永逸，但污染原型）
BigInt.prototype.toJSON = function () {
  return this.toString();
};
console.log("方案③ 自动序列化:", JSON.stringify(order));
// 之后所有 JSON.stringify 遇到 BigInt 都不再报错

/*
  方案④：使用第三方库 json-bigint
  import JSONbig from 'json-bigint';
  JSONbig.parse(rawJson)  —— 解析时自动把超大整数变成 BigInt
  适合处理后端返回大 ID 的场景（这是唯一能在「解析阶段」防失真的方案）
*/


// ----------------------------------------
// 6. 其他容易踩的坑
// ----------------------------------------

console.log("\n=== 6. 其他坑 ===");

// 坑①：Math 方法不接受 BigInt
/*
  Math.max(1n, 2n);  // ❌ TypeError
  Math 的所有方法都只认 number
*/

// 坑②：不能混用运算（前面提过）
/*
  1n + 1;  // ❌ TypeError: Cannot mix BigInt and other types
*/

// 坑③：除法会截断，不是四舍五入
console.log("7n / 2n =", 7n / 2n);   // 3n（截断）
console.log("-7n / 2n =", -7n / 2n); // -3n（向零截断）

// 坑④：小数根本不存在
/*
  1.5n;  // ❌ SyntaxError: Invalid or unexpected token
  BigInt 没有小数写法
*/

// 坑⑤：拼接模板字符串没问题，但要注意别把 n 带进字符串
console.log(`订单号: ${order.id}`); // 订单号: 9007199254740993（n 不会出现在字符串里）


// ----------------------------------------
// 7. 什么时候该用 BigInt
// ----------------------------------------

/*
  适用场景：
  1. 后端返回的超大 ID（雪花算法 ID、数据库 BIGINT）
  2. 精确的大整数计算（密码学、计数器、金融整数分账）
  3. 需要 64 位整数位运算的场景

  不适用场景：
  1. 普通计算（BigInt 运算比 number 慢很多）
  2. 需要小数的场景（BigInt 只有整数）
  3. 大量参与 JSON 传输又没做序列化处理的场景

  日常原则：
  - 前端拿到后端大 ID，优先让后端返回「字符串」而不是自己处理 BigInt
  - 只有确实要做数值运算/比较时，才转成 BigInt
*/


// ----------------------------------------
// 8. 记忆要点
// ----------------------------------------

/*
  1. 创建：末尾加 n 或 BigInt()，不能带小数
  2. 运算：+ - * % ** 和位运算都行；/ 是截断取整
  3. 比较：可以跨类型（==、>），但 10n === 10 是 false
  4. 混算：1n + 1 报 TypeError，必须显式转换
  5. JSON 大坑：
     - JSON.stringify 遇 BigInt 直接抛 TypeError
     - JSON.parse 不会产出 BigInt，大数在解析时已失真
     - 解决：replacer 转字符串 / toJSON / json-bigint 库
*/

/*
  练习建议：
  1. 创建一个超过 2^53 的 BigInt，对比同值 number 的失真
  2. 把带 BigInt 的对象用三种方案序列化，比较输出差异
  3. 用 JSON.parse 解析 '{"n": 123456789012345678901}'，观察精度丢失
  4. 试一下 1n + 1 和 Math.max(1n, 2n)，记住报错信息
*/
