// ========== 6.3 Number 数值类型详解 ==========

/*
  number 是 JS 的数值类型：
  - 不区分整数和浮点数，统一都是 number（采用 IEEE 754 双精度浮点）
  - 安全整数范围：-(2^53 - 1) 到 2^53 - 1
  - 特殊值：Infinity、-Infinity、NaN
*/


// ----------------------------------------
// 1. 数字的写法（字面量）
// ----------------------------------------

let integer = 42;          // 整数
let decimal = 3.14;        // 小数
let negative = -8;         // 负数
let exponent = 1.5e3;     // 科学计数法：1.5 × 10^3 = 1500
let smallNum = 2.5e-4;    // 2.5 × 10^-4 = 0.00025

console.log("=== 1. 数字写法 ===");
console.log("整数:", integer);
console.log("小数:", decimal);
console.log("负数:", negative);
console.log("科学计数法 1.5e3:", exponent);
console.log("科学计数法 2.5e-4:", smallNum);

// 小数的简写
let a1 = .5;    // 等价于 0.5
let a2 = 5.;    // 等价于 5（但不推荐，容易看错）
console.log(".5 =", a1, "| 5. =", a2);


// ----------------------------------------
// 2. 数值分隔符 _（ES2021）
// ----------------------------------------

// 用下划线 _ 分隔数字，纯为了可读性，不影响实际值
let million = 1_000_000;          // 一百万，比 1000000 好读
let cardLike = 1234_5678_9012_3456; // 模拟银行卡号分组
let bytes = 0xFF_FF_FF_FF;        // 也能用在十六进制里
let parts = 1_2.3_4;             // 小数部分也能分隔

console.log("\n=== 2. 数值分隔符 _ ===");
console.log("1_000_000 =", million);
console.log("1234_5678_9012_3456 =", cardLike);
console.log("0xFF_FF_FF_FF =", bytes);
console.log("1_2.3_4 =", parts);

/*
  分隔符规则（违反会报 SyntaxError）：
  - 只能分隔数字，不能放在最开头、最结尾
  - 不能连着写两个 __
  - 小数点前后不能紧贴：1_.5、1._5 都不行
*/
// let bad1 = _100;   // ❌ 开头不行
// let bad2 = 100_;   // ❌ 结尾不行
// let bad3 = 1__00;  // ❌ 连续两个不行


// ----------------------------------------
// 3. 进制表示
// ----------------------------------------

console.log("\n=== 3. 进制 ===");

// 十进制（默认）
let dec2 = 255;

// 二进制：0b 开头（binary）
let bin = 0b11111111;

// 八进制：0o 开头（octal）
let oct = 0o377;

// 十六进制：0x 开头（hex，字母大小写都行）
let hex = 0xff;
let hex2 = 0xFF;

console.log("十进制 255       =", dec2);
console.log("二进制 0b11111111 =", bin);
console.log("八进制 0o377      =", oct);
console.log("十六进制 0xff     =", hex, "| 0xFF =", hex2);
// 全部等于 255，只是写法不同

/*
  进制互转：
  - 其他进制转十进制：parseInt(字符串, 进制)
  - 十进制转其他进制：数字.toString(进制)
*/
console.log("parseInt('ff', 16) =", parseInt("ff", 16));     // 255
console.log("parseInt('1010', 2) =", parseInt("1010", 2));   // 10
console.log("(255).toString(16) =", (255).toString(16));     // "ff"
console.log("(10).toString(2)   =", (10).toString(2));       // "1010"
console.log("(255).toString(8)   =", (255).toString(8));     // "377"


// ----------------------------------------
// 4. 算术运算
// ----------------------------------------

console.log("\n=== 4. 算术运算 ===");
console.log("7 + 2 =", 7 + 2);   // 加：9
console.log("7 - 2 =", 7 - 2);   // 减：5
console.log("7 * 2 =", 7 * 2);   // 乘：14
console.log("7 / 2 =", 7 / 2);   // 除：3.5（注意！不是整数除法）
console.log("7 % 2 =", 7 % 2);   // 取余：1
console.log("2 ** 3 =", 2 ** 3); // 幂：8（2 的 3 次方）

// 除数为 0
console.log("5 / 0 =", 5 / 0);    // Infinity
console.log("-5 / 0 =", -5 / 0);  // -Infinity
console.log("0 / 0 =", 0 / 0);    // NaN

// 取整除法（JS 没有专门的整除运算符，用 Math.floor 或 | 0）
console.log("Math.floor(7 / 2) =", Math.floor(7 / 2)); // 3


// ----------------------------------------
// 5. 浮点数精度问题（经典大坑）
// ----------------------------------------

console.log("\n=== 5. 浮点精度问题 ===");
console.log("0.1 + 0.2 =", 0.1 + 0.2); // 0.30000000000000004 —— 不是 0.3！
console.log("0.1 + 0.2 === 0.3 ?", 0.1 + 0.2 === 0.3); // false

/*
  原因：0.1 在二进制浮点里是无限循环小数，无法精确表示，
  和十进制下无法写尽 1/3 = 0.333... 是一个道理。

  实际开发中的处理：
  1. 不要直接比较浮点数，而是判断差值是否足够小
  2. 涉及钱的计算，用「分」做单位转成整数，或用专门的库
*/

// 方法 1：比较差值
let sum2 = 0.1 + 0.2;
console.log("差值法判断相等:", Math.abs(sum2 - 0.3) < 1e-10); // true

// 方法 2：toFixed 保留位数（返回字符串）
console.log("(0.1 + 0.2).toFixed(2) =", (0.1 + 0.2).toFixed(2)); // "0.30"

// 方法 3：转成整数算（金额用分）
let priceFen = 10;  // 0.1 元 = 10 分
let totalFen = priceFen + 20;
console.log("用分计算:", (totalFen / 100).toFixed(2), "元"); // 0.30 元


// ----------------------------------------
// 6. 赋值运算符与自增自减
// ----------------------------------------

console.log("\n=== 6. 赋值与自增 ===");
let n = 10;
n += 5;  console.log("n += 5 →", n);  // 15
n -= 3;  console.log("n -= 3 →", n);  // 12
n *= 2;  console.log("n *= 2 →", n);  // 24
n /= 4;  console.log("n /= 4 →", n);  // 6
n %= 4;  console.log("n %= 4 →", n);  // 2
n **= 3; console.log("n **= 3 →", n); // 8

// ++ 和 --
let p = 5;
console.log("p++ =", p++, "（先用后加，此时 p =", p + ")"); // 5，之后变 6
console.log("++p =", ++p, "（先加后用）");                   // 7
console.log("p-- =", p--, "（先用后减）");                   // 7，之后变 6
console.log("--p =", --p);                                   // 5


// ----------------------------------------
// 7. 特殊值：Infinity 与 NaN
// ----------------------------------------

console.log("\n=== 7. Infinity 与 NaN ===");
console.log("Infinity =", Infinity);
console.log("1 / Infinity =", 1 / Infinity);        // 0
console.log("Infinity + 1 =", Infinity + 1);        // Infinity
console.log("Infinity - Infinity =", Infinity - Infinity); // NaN
console.log("Infinity === Infinity ?", Infinity === Infinity); // true

// NaN：参与任何数学运算结果都是 NaN
let bad = NaN;
console.log("NaN + 5 =", bad + 5);   // NaN
console.log("NaN * 2 =", bad * 2);   // NaN


// ----------------------------------------
// 8. 安全整数与大数
// ----------------------------------------

console.log("\n=== 8. 安全整数 ===");
console.log("最大安全整数 Number.MAX_SAFE_INTEGER =", Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log("最小安全整数 Number.MIN_SAFE_INTEGER =", Number.MIN_SAFE_INTEGER);

// 超过安全范围会丢失精度
let big1 = 9007199254740991;
let big2n = 9007199254740992;
let big3 = 9007199254740993;
console.log("超出后 9007199254740992 == 9007199254740993 ?", big2n === big3); // true！精度丢失

// 判断是否安全整数
console.log("Number.isSafeInteger(42) =", Number.isSafeInteger(42));       // true
console.log("Number.isSafeInteger(big3) =", Number.isSafeInteger(big3));   // false

// 超大整数用 BigInt（末尾加 n），不要与 number 混算
let precise = 9007199254740993n;
let another = 1n;
console.log("BigInt 精确计算:", precise + another); // 9007199254740994n（精确）
// precise + 1; // ❌ TypeError：不能把 BigInt 和 number 混算


// ----------------------------------------
// 9. 常用 Math 方法
// ----------------------------------------

console.log("\n=== 9. Math 常用方法 ===");
console.log("Math.floor(3.9) 向下取整 =", Math.floor(3.9));   // 3
console.log("Math.ceil(3.1) 向上取整  =", Math.ceil(3.1));    // 4
console.log("Math.round(3.5) 四舍五入 =", Math.round(3.5));   // 4
console.log("Math.trunc(3.9) 去掉小数 =", Math.trunc(3.9));   // 3
console.log("Math.abs(-8) 绝对值      =", Math.abs(-8));      // 8
console.log("Math.max(3, 7, 2) 最大值  =", Math.max(3, 7, 2));// 7
console.log("Math.min(3, 7, 2) 最小值  =", Math.min(3, 7, 2));// 2
console.log("Math.sqrt(16) 平方根      =", Math.sqrt(16));    // 4
console.log("Math.pow(2, 10) 幂        =", Math.pow(2, 10));  // 1024
console.log("Math.random() 随机数      =", Math.random());    // 0~1 之间（含0不含1）

// 生成 1~100 的随机整数（含两端）
let randomInt = Math.floor(Math.random() * 100) + 1;
console.log("1~100 随机整数 =", randomInt);


// ----------------------------------------
// 10. 其他常用 Number 方法
// ----------------------------------------

console.log("\n=== 10. Number 方法 ===");
console.log("Number.parseInt('12.9元') =", Number.parseInt("12.9元"));  // 12
console.log("Number.parseFloat('3.14元') =", Number.parseFloat("3.14元")); // 3.14
console.log("Number.isInteger(4) =", Number.isInteger(4));    // true
console.log("Number.isInteger(4.0) =", Number.isInteger(4.0));// true（4.0 也算整数）
console.log("Number.isInteger(4.5) =", Number.isInteger(4.5));// false
console.log("Number.isFinite(100) =", Number.isFinite(100));  // true
console.log("Number.isFinite(Infinity) =", Number.isFinite(Infinity)); // false
console.log("Number.isNaN(NaN) =", Number.isNaN(NaN));        // true

// toFixed：保留小数位（返回字符串，常用于金额显示）
let rate = 0.3333;
console.log("rate.toFixed(2) =", rate.toFixed(2)); // "0.33"


// ----------------------------------------
// 11. 记忆要点
// ----------------------------------------

/*
  1. 整数小数都是 number，除法 7/2 得到 3.5 不是 3
  2. 数字长就用 _ 分隔：1_000_000，只能分隔数字
  3. 进制前缀：0b 二、0o 八、0x 十六
  4. 0.1 + 0.2 不精确：金额用「分」当整数算，不要直接比浮点
  5. 超大整数超 2^53 会失真，改用 BigInt（加 n，不能和 number 混算）
  6. 取整三兄弟：floor 向下、ceil 向上、round 四舍五入
*/

/*
  练习建议：
  1. 用不同进制写出数字 16，并打印验证
  2. 计算 0.1 + 0.2，用差值法和 toFixed 两种方式处理
  3. 用 Math.random() 写一个 1~10 的随机整数
  4. 把你的手机号/大数用 _ 分隔符写出来
*/
