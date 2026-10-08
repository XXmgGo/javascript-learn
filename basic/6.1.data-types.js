// ========== JavaScript 数据类型学习 ==========

/*
  JavaScript 的数据类型分为两大类：
  1. 原始类型（基本类型 / Primitive Types）：7 种
  2. 引用类型（Reference Types）：Object 及其子类型
*/


// ----------------------------------------
// 1. 原始类型（7 种）
// ----------------------------------------

// ① number 数字（整数和小数都是 number）
let intNum = 42;
let floatNum = 3.14;
let negativeNum = -10;
let specialInfinity = Infinity;  // 无穷大
let specialNaN = NaN;            // Not a Number，不是数字
console.log("number:", intNum, floatNum, negativeNum, specialInfinity, specialNaN);

// ② string 字符串（单引号、双引号、反引号都可以）
let single = '单引号';
let double = "双引号";
let backtick = `模板字符串，可以嵌入变量：${intNum}`;
console.log("string:", single, double, backtick);

// ③ boolean 布尔值（只有两个值）
let isTrue = true;
let isFalse = false;
console.log("boolean:", isTrue, isFalse);

// ④ undefined 未定义（声明了但没赋值）
let unassigned;
console.log("undefined:", unassigned); // undefined

// ⑤ null 空值（表示"故意没有值"，需要手动设置）
let emptyValue = null;
console.log("null:", emptyValue); // null

// ⑥ symbol 符号（ES6 新增，唯一且不可变，用作对象属性标识符）
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log("symbol:", sym1);
console.log("sym1 === sym2 ?", sym1 === sym2); // false（每个 Symbol 都不同）

// ⑦ bigint 大整数（ES2020，用于安全表示超过 Number 安全范围的整数）
let bigNum = 123456789012345678901234567890n; // 末尾加 n
console.log("bigint:", bigNum);


// ----------------------------------------
// 2. 引用类型
// ----------------------------------------

// 对象 Object：键值对的集合
let person = {
  name: "Alice",
  age: 25,
  isStudent: true
};
console.log("object:", person);

// 数组 Array：有序列表（本质也是对象）
let fruits = ["苹果", "香蕉", "橙子"];
console.log("array:", fruits);

// 函数 Function：可执行的代码块（本质也是对象）
function greet(name) {
  return `你好，${name}！`;
}
console.log("function:", greet("小明"));

// 日期 Date
let now = new Date();
console.log("date:", now);


// ----------------------------------------
// 3. typeof 运算符：检测数据类型
// ----------------------------------------

console.log("\n=== typeof 检测 ===");
console.log("typeof 42        →", typeof 42);          // number
console.log("typeof 3.14      →", typeof 3.14);        // number
console.log("typeof 'hello'   →", typeof "hello");     // string
console.log("typeof true      →", typeof true);        // boolean
console.log("typeof undefined →", typeof undefined);   // undefined
console.log("typeof Symbol()  →", typeof Symbol());    // symbol
console.log("typeof 10n       →", typeof 10n);         // bigint

console.log("typeof {}        →", typeof {});          // object
console.log("typeof []        →", typeof []);          // object（数组也是对象）
console.log("typeof function  →", typeof function(){});// function

// ⚠️ typeof 的两个历史遗留坑
console.log("typeof null      →", typeof null);        // object（历史 Bug，无法修复）
console.log("typeof NaN       →", typeof NaN);         // number（NaN 是特殊数字）


// ----------------------------------------
// 4. null 和 undefined 的区别
// ----------------------------------------

console.log("\n=== null vs undefined ===");
let a;
console.log("声明未赋值:", a);              // undefined（系统默认：还没给值）
let b = null;
console.log("手动赋空值:", b);              // null（开发者主动表示：这里没值）

// 相等性
console.log("null == undefined ?", null == undefined); // true（值都近似"空"）
console.log("null === undefined ?", null === undefined); // false（类型不同）

/*
  ┌─────────────────────────────────────────────────────────┐
  │ == 和 === 的区别                                         │
  ├─────────────────────────────────────────────────────────┤
  │ ==   宽松相等（Loose Equality）                           │
  │      比较前会先「自动转换类型」，再比值。                      │
  │      类型不同时，尽量转成同一类型再比较。                     │
  │                                                         │
  │ ===  严格相等（Strict Equality）                          │
  │      不转换类型，必须「类型相同 且 值相同」才为 true。         │
  │                                                         │
  │ 规则记忆：== 只比值（先转型），=== 既比值又比类型。             │
  └─────────────────────────────────────────────────────────┘
*/

console.log("'1' == 1 ?", "1" == 1);   // true  —— "1" 被转成数字 1
console.log("'1' === 1 ?", "1" === 1); // false —— string 和 number 类型不同
console.log("0 == false ?", 0 == false);   // true  —— false 被转成 0
console.log("0 === false ?", 0 === false); // false —— 类型不同
console.log("null == undefined ?", null == undefined); // true（== 下这两个特殊相等）
console.log("null === undefined ?", null === undefined); // false（类型不同）

/*
  注意：=== 不会做任何类型转换，所以更安全、结果更可预测。
  最佳实践：日常永远用 ===，避免 == 的隐式转换带来的意外。
  唯一常见的例外：用 x == null 同时判断 null 和 undefined。
*/


// ----------------------------------------
// 5. 原始类型 vs 引用类型的核心区别
// ----------------------------------------

console.log("\n=== 值的复制 ===");

// 原始类型：复制的是「值本身」，两个变量互不影响
let x = 10;
let y2 = x;  // 把 10 复制给 y2
y2 = 20;
console.log("x =", x, "| y2 =", y2); // x=10, y2=20（互不影响）

// 引用类型：复制的是「地址/引用」，两个变量指向同一个对象
let obj1 = { count: 10 };
let obj2 = obj1;  // 复制的是引用，obj1 和 obj2 指向同一个对象
obj2.count = 20;
console.log("obj1.count =", obj1.count, "| obj2.count =", obj2.count); // 都是 20！

// 数组同理
let arr1 = [1, 2];
let arr2 = arr1;
arr2.push(3);
console.log("arr1 =", arr1, "| arr2 =", arr2); // 都是 [1,2,3]


// ----------------------------------------
// 6. 类型转换（基础）
// ----------------------------------------

console.log("\n=== 类型转换 ===");

// 转字符串 String() / .toString()
console.log("数字转字符串:", String(123), typeof String(123));     // "123"
console.log("布尔转字符串:", String(true));                         // "true"

// 转数字 Number() / parseInt() / parseFloat()
console.log("字符串转数字:", Number("456"), typeof Number("456"));  // 456
console.log("parseInt:", parseInt("12.5元"));                       // 12（取整数部分）
console.log("parseFloat:", parseFloat("3.14元"));                   // 3.14
console.log("空字符串转数字:", Number(""));                         // 0
console.log("非数字字符串:", Number("abc"));                        // NaN
console.log("布尔转数字:", Number(true), Number(false));            // 1, 0

// 转布尔 Boolean()
// 假值（falsy）：0, "", null, undefined, NaN, 0n → false
// 其他都是真值（truthy）
console.log("Boolean(0):", Boolean(0));              // false
console.log("Boolean(''):", Boolean(""));            // false
console.log("Boolean(null):", Boolean(null));        // false
console.log("Boolean(NaN):", Boolean(NaN));          // false
console.log("Boolean('hello'):", Boolean("hello"));  // true
console.log("Boolean(123):", Boolean(123));          // true
console.log("Boolean([]):", Boolean([]));            // true（空数组是真值！）
console.log("Boolean({}):", Boolean({}));            // true（空对象也是真值）


// ----------------------------------------
// 7. NaN 详解
// ----------------------------------------

console.log("\n=== NaN ===");
let result = "abc" * 3;
console.log("'abc' * 3 =", result);                  // NaN
console.log("NaN === NaN ?", NaN === NaN);           // false！NaN 连自己都不等于
console.log("isNaN(NaN):", isNaN(NaN));              // true（但 isNaN 会先转型，不够准确）
console.log("Number.isNaN(NaN):", Number.isNaN(NaN));// true（更推荐，不会转型）


// ----------------------------------------
// 8. 数据类型总结
// ----------------------------------------

console.log("\n=== 数据类型总结 ===");
console.log("原始类型（7种）：number / string / boolean / undefined / null / symbol / bigint");
console.log("引用类型：object（含 array、function、date 等）");
console.log("核心区别：原始类型存值，引用类型存地址");

/*
  练习建议：
  1. 用 typeof 检测身边各种值的类型，注意 null 和 [] 的结果
  2. 用 === 比较 null 和 undefined，理解它们的区别
  3. 复制一个对象后修改副本，观察原对象是否跟着变
  4. 把各种值放进 Boolean()，记住哪些是 falsy 假值
*/
