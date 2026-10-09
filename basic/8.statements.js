// ========== 8. 语句（Statements）详解 ==========

/*
  语句 = 程序执行的「指令单元」，和表达式不同：
  - 表达式：求值后会产生一个值（如 1 + 2）
  - 语句：执行一个动作（如 if 判断、for 循环）

  本节覆盖：条件语句、循环语句、break/continue、try-catch
*/


// ----------------------------------------
// 1. if / else if / else
// ----------------------------------------

console.log("=== 1. if 条件语句 ===");

let score = 75;

if (score >= 90) {
  console.log("优秀");
} else if (score >= 60) {
  console.log("及格");        // ← 命中这条
} else {
  console.log("不及格");
}

// 条件表达式会自动转布尔（6.2 学的假值规则）
let userName = "";
if (userName) {
  console.log("有名字");
} else {
  console.log("名字为空");    // ← 空字符串是假值
}

// ⚠️ 推荐永远写花括号，即使只有一行（避免后面加代码时出 bug）


// ----------------------------------------
// 2. switch
// ----------------------------------------

console.log("\n=== 2. switch ===");

let day = 3;
switch (day) {
  case 1:
    console.log("周一");
    break;
  case 2:
    console.log("周二");
    break;
  case 3:
    console.log("周三");      // ← 命中
    break;
  case 4:
  case 5:
    console.log("周四或周五"); // 多个 case 共享代码
    break;
  default:
    console.log("周末");
}

// ⚠️ 忘记 break 会「穿透」（fall-through）
let x = 1;
switch (x) {
  case 1: console.log("一");
  case 2: console.log("二");  // 没有 break，会继续执行
  case 3: console.log("三");  // 继续执行
  default: console.log("默认");
}
// 输出：一 二 三 默认 —— 全部穿透！

// switch 用严格相等 === 比较
switch ("1") {
  case 1:
    console.log("数字 1");
    break;
  case "1":
    console.log("字符串 1");  // ← 命中这个
    break;
}


// ----------------------------------------
// 3. 三元表达式（单行条件，7.6 学过）
// ----------------------------------------

console.log("\n=== 3. 三元（回顾）===");

let age = 20;
let label = age >= 18 ? "成年" : "未成年";
console.log(label);

// 三元 vs if：三元是表达式（有返回值），if 是语句（无返回值）


// ----------------------------------------
// 4. for 循环
// ----------------------------------------

console.log("\n=== 4. for 循环 ===");

// 经典三段式：初始化; 条件; 更新
for (let i = 0; i < 3; i++) {
  console.log("第", i, "次");
}

// 倒序
for (let i = 3; i > 0; i--) {
  console.log("倒计时:", i);
}

// 省略任意一段（条件为空 = 永远为 true，要靠 break 跳出）
// for (;;) { ... } // 无限循环，慎用


// ----------------------------------------
// 5. while 循环
// ----------------------------------------

console.log("\n=== 5. while 循环 ===");

// 先判断条件，再执行体
let n = 3;
while (n > 0) {
  console.log("while:", n);
  n--;
}
// while: 3 → while: 2 → while: 1

// 条件一开始就为 false → 一次都不执行
let flag = false;
while (flag) {
  console.log("不会执行");
}


// ----------------------------------------
// 6. do...while 循环
// ----------------------------------------

console.log("\n=== 6. do...while ===");

// 先执行体，再判断条件 —— 至少执行一次
let m = 0;
do {
  console.log("do...while:", m);
  m++;
} while (m < 3);
// 0 → 1 → 2

// 即使条件一开始就为 false，也会执行一次
let k = 5;
do {
  console.log("至少执行一次, k =", k);
  k++;
} while (k < 3); // false，但已经执行过了


// ----------------------------------------
// 7. for...of 遍历可迭代对象
// ----------------------------------------

console.log("\n=== 7. for...of ===");

// 遍历数组（最推荐的方式）
let fruits = ["苹果", "香蕉", "橙子"];
for (const fruit of fruits) {
  console.log("水果:", fruit);
}

// 遍历字符串（6.5 学过，能正确处理 emoji）
for (const ch of "a😀b") {
  console.log("字符:", ch);
}

// 遍历 Map（后面学）
// 遍历 Set（后面学）

/*
  ⚠️ for...of 不能遍历普通对象！
  let obj = { a: 1, b: 2 };
  for (const v of obj) { ... }  // ❌ TypeError: obj is not iterable
  普通对象用 for...in 或 Object.entries()
*/


// ----------------------------------------
// 8. for...in 遍历对象属性
// ----------------------------------------

console.log("\n=== 8. for...in ===");

let person = { name: "张三", age: 25, city: "北京" };

// 遍历键名
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

// 也能遍历数组（但不推荐，会遍历到原型属性且顺序不保证）
let arr = [10, 20, 30];
for (const index in arr) {
  console.log("索引:", index, "值:", arr[index]);
}

/*
  for...in vs for...of 对比：
  ┌──────────┬──────────────────┬──────────────────┐
  │          │ for...in          │ for...of         │
  ├──────────┼──────────────────┼──────────────────┤
  │ 遍历什么  │ 键名（属性名）     │ 值（元素本身）    │
  │ 数组返回  │ "0","1","2" 字符串│ 10, 20, 30 数字  │
  │ 普通对象  │ ✅ 可以            │ ❌ 不行          │
  │ 数组      │ ⚠️ 不推荐          │ ✅ 推荐          │
  │ 字符串    │ 索引数字           │ 字符本身          │
  └──────────┴──────────────────┴──────────────────┘
*/


// ----------------------------------------
// 9. break 和 continue
// ----------------------------------------

console.log("\n=== 9. break / continue ===");

// break：彻底跳出循环
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    console.log("break at", i);
    break; // i=3 时整个循环结束
  }
  console.log("i =", i);
}
// 输出：0, 1, 2, 然后输出 "break at 3"，结束

// continue：跳过本轮，继续下一轮
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // 跳过 i=2 这一轮
  }
  console.log("continue 跳过 i=2, i =", i);
}
// 输出：0, 1, 3, 4（2 被跳过）

// 实用：找第一个符合条件的元素
let numbers = [4, 7, 2, 9, 5];
let firstEven;
for (const num of numbers) {
  if (num % 2 === 0) {
    firstEven = num;
    break; // 找到就停，不用继续
  }
}
console.log("第一个偶数:", firstEven); // 4


// ----------------------------------------
// 10. break 跳出多层循环（带标签）
// ----------------------------------------

console.log("\n=== 10. 标签跳多层 ===");

// 给循环起个名字，break 标签名 可以跳出外层
outer:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      console.log("跳出整个外层循环");
      break outer; // 不加 outer 只能跳出内层
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// 输出：0,0 → 0,1 → 0,2 → 1,0 → 跳出（1,1 及之后都不执行）


// ----------------------------------------
// 11. 无限循环
// ----------------------------------------

console.log("\n=== 11. 无限循环 ===");

// 两种写法：for(;;) 或 while(true)，都靠 break 跳出
let counter = 0;
while (true) {
  counter++;
  if (counter >= 3) {
    console.log("到达 3，退出");
    break;
  }
}

// for (;;) 和 while(true) 等价，选哪个看个人喜好


// ----------------------------------------
// 12. try...catch 错误处理
// ----------------------------------------

console.log("\n=== 12. try...catch ===");

// 语法：try { 可能出错的代码 } catch(err) { 处理 } finally { 无论对错都执行 }

try {
  let data = JSON.parse('{"name":"张三"}');
  console.log("解析成功:", data.name);
} catch (err) {
  console.log("解析失败:", err.message);
} finally {
  console.log("finally 总是执行");
}

// 捕获真正会报错的代码
try {
  // undefined.prop;  // ❌ 会报错
  // undefinedVar 未声明就使用，会报 ReferenceError
  let result = undefinedVar;
} catch (err) {
  console.log("捕获到错误:", err.name, "-", err.message);
}

// try 里面只有「运行时错误」能被捕获，语法错误不行
// try { let @x = 1; } // 这是语法错误，整个文件都解析不了，catch 也救不了

// 可选的 catch 绑定（不需要 err 参数时）
try {
  JSON.parse("不是 JSON");
} catch {
  console.log("不需要错误对象也能 catch");
}


// ----------------------------------------
// 13. throw 主动抛出错误
// ----------------------------------------

console.log("\n=== 13. throw ===");

function divide(a, b) {
  if (b === 0) {
    throw new Error("除数不能为 0"); // 主动抛出
  }
  return a / b;
}

try {
  console.log("10 / 2 =", divide(10, 2));
  console.log("10 / 0 =", divide(10, 0)); // 会抛错
} catch (err) {
  console.log("捕获:", err.message); // "除数不能为 0"
}

// 可以 throw 任何值（但不推荐，最好 throw new Error()）
try {
  throw "自定义字符串错误";
} catch (err) {
  console.log("throw 字符串:", err);
}


// ----------------------------------------
// 14. 其他常用语句
// ----------------------------------------

console.log("\n=== 14. 其他语句 ===");

// return：函数中返回值并退出（后面学函数时详细讲）
//  function add(a, b) { return a + b; }

// label：除了配合 break，几乎不用（第 10 节见过）
//  label: for (...) { break label; }

// 空语句：分号单独出现，偶尔用在循环体为空的场景
for (let i = 0; i < 3; i++); // 循环体为空，只是让 i 走到 3
console.log("空语句后 i 走完");

// debugger：手动设断点（浏览器中暂停）
// debugger; // 取消注释后浏览器会暂停在此处


// ----------------------------------------
// 15. 记忆要点
// ----------------------------------------

/*
  1. 条件：if/else if/else 多分支、switch 适合离散值（别忘了 break）
  2. 循环四兄弟：for（次数）、while（先判后做）、do...while（先做后判）、
     for...of（遍历值，推荐数组用）、for...in（遍历键，推荐对象用）
  3. break 彻底跳出，continue 只跳过本轮
  4. break 标签名 可以跳出多层循环
  5. try-catch-finally：运行时错误能捕获，语法错误不能
  6. throw 主动抛错，配合 try-catch 使用
  7. for...of 遍历数组，for...in 遍历对象 —— 记住这个分工
*/

/*
  练习建议：
  1. 用 switch 写一个根据月份返回季节的函数（注意 break）
  2. 用 for...of 遍历数组求所有偶数的和
  3. 用 while 模拟「倒计时 3 2 1 发射」
  4. 写一个双层循环，用 break 标签在找到目标时一次性跳出
  5. 用 try-catch 包裹 JSON.parse，处理非法 JSON 的情况
*/
