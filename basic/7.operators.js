// ========== 7. 运算符（Operators）详解 ==========

/*
  运算符 = 对值进行「计算/比较/赋值」等操作的符号。
  JS 的运算符按用途分为：算术、赋值、比较、逻辑、
  三元、空值合并、可选链、一元、位运算、逗号等。
*/


// ----------------------------------------
// 1. 算术运算符
// ----------------------------------------

console.log("=== 1. 算术运算符 ===");

console.log("7 + 2 =", 7 + 2);    // 9
console.log("7 - 2 =", 7 - 2);    // 5
console.log("7 * 2 =", 7 * 2);    // 14
console.log("7 / 2 =", 7 / 2);    // 3.5（永远得小数，呼应 6.3）
console.log("7 % 2 =", 7 % 2);    // 1（取余）
console.log("7 ** 2 =", 7 ** 2);  // 49（幂运算 ES2016）

// + 的双重身份：数字相加 vs 字符串拼接
console.log("1 + '2' =", 1 + "2");       // "12"（有字符串就变拼接！）
console.log("'a' + 'b' =", "a" + "b");   // "ab"
console.log("1 + 2 + '3' =", 1 + 2 + "3");   // "33"（先算 1+2=3，再拼 "3"）
console.log("'3' + 1 + 2 =", "3" + 1 + 2);   // "312"（从左往右，一开始就拼接）

// 其他符号想转数字就转不了（只有 + 会拼接）
console.log("'5' - 2 =", "5" - 2);   // 3（自动把 '5' 转数字）
console.log("'5' * 2 =", "5" * 2);   // 10
console.log("'a' - 1 =", "a" - 1);   // NaN


// ----------------------------------------
// 2. 赋值运算符
// ----------------------------------------

console.log("\n=== 2. 赋值运算符 ===");

let count = 10;
count += 5;  console.log("count += 5  →", count);  // 15
count -= 3;  console.log("count -= 3  →", count);  // 12
count *= 2;  console.log("count *= 2  →", count);  // 24
count /= 4;  console.log("count /= 4  →", count);  // 6
count %= 4;  console.log("count %= 4  →", count);  // 2
count **= 3; console.log("count **= 3 →", count);  // 8

// 字符串也能 +=
let log = "开始";
log += " → 处理 → ";
log += "结束";
console.log("字符串 +=:", log);

// 赋值是「表达式」，有返回值（返回被赋的值），可以连锁
let a1, a2, a3;
a3 = a2 = a1 = 7;
console.log("连锁赋值 a1,a2,a3 =", a1, a2, a3); // 7 7 7


// ----------------------------------------
// 3. 自增自减（呼应 5 节学的前后缀）
// ----------------------------------------

console.log("\n=== 3. ++ / -- ===");

let n = 5;
console.log("n++ 返回旧值:", n++);  // 5（先返回再 +1）
console.log("此时 n =", n);          // 6
console.log("++n 返回新值:", ++n);  // 7（先 +1 再返回）

let m = 5;
console.log("m-- 返回旧值:", m--);  // 5
console.log("--m 返回新值:", --m);  // 3

// 实际开发中几乎只在循环里用 i++，单独玩前后缀容易出错


// ----------------------------------------
// 4. 比较运算符
// ----------------------------------------

console.log("\n=== 4. 比较运算符 ===");

console.log("3 > 2  :", 3 > 2);    // true
console.log("3 >= 3 :", 3 >= 3);   // true
console.log("3 < 2  :", 3 < 2);    // false
console.log("3 <= 2 :", 3 <= 2);   // false

// == 会转类型（6.1 学过），规则复杂，记住几个离谱案例：
console.log("'3' == 3   :", "3" == 3);     // true（字符串转数字）
console.log("'' == 0    :", "" == 0);       // true（都转成数字）
console.log("null == 0  :", null == 0);     // false（null 只和 undefined 相等）
console.log("[1] == 1   :", [1] == 1);      // true（数组转字符串 '1' 再转数字）

// 关系运算符遇到字符串也按 Unicode 码点比（6.5 学过 'B' < 'a'）
console.log("'apple' < 'banana' :", "apple" < "banana"); // true
console.log("'12' > '9'         :", "12" > "9");         // false！逐字符比，'1' < '9'


// ----------------------------------------
// 5. 逻辑运算符 && || !
// ----------------------------------------

console.log("\n=== 5. 逻辑运算符 ===");

// 真值表
console.log("true && false :", true && false);  // false（一假全假）
console.log("true || false :", true || false);  // true （一真全真）
console.log("!true         :", !true);          // false

// ⚠️ && 和 || 返回的是「操作数原值」，不是布尔（6.2 学过）
console.log("1 && 2       :", 1 && 2);           // 2（都真，返回后者）
console.log("0 && 'a'     :", 0 && "a");         // 0（遇假短路，返回假的那个）
console.log("'a' || 'b'   :", "a" || "b");       // "a"（遇真短路，返回真的那个）
console.log("null || '默认':", null || "默认");   // "默认"（经典兜底写法）

// 短路特性：左边定胜负，右边根本不执行
function shout() { console.log("我被调用了！"); return true; }
false && shout();   // 左边 false，shout() 不执行
console.log("短路验证完毕（上面没打印'我被调用了'）");


// ----------------------------------------
// 6. 三元运算符（条件运算符）
// ----------------------------------------

console.log("\n=== 6. 三元运算符 ===");

// 语法：条件 ? 值A : 值B —— 条件为真取 A，否则取 B
let score = 85;
let grade = score >= 60 ? "及格" : "不及格";
console.log("score =", score, "→", grade);

// 可以嵌套（但可读性差，最多套一层）
let level = score >= 90 ? "优秀" : score >= 60 ? "及格" : "不及格";
console.log("嵌套三元:", level);

// 常见用途：渲染时切换内容（以后写前端会大量用到）
let isLoggedIn = false;
let tip = isLoggedIn ? "欢迎回来" : "请先登录";
console.log(tip);


// ----------------------------------------
// 7. 空值合并 ??（ES2020）
// ----------------------------------------

console.log("\n=== 7. 空值合并 ?? ===");

/*
  a ?? b：只有 a 是 null 或 undefined 时才取 b。
  对比 ||：|| 会把所有「假值」（0、""、false、NaN）都替换，常常误伤。
*/

let userAge = 0;  // 0 是合法年龄！
console.log("userAge || 18 :", userAge || 18);   // 18 ← 被误伤，0 被当成"没值"
console.log("userAge ?? 18 :", userAge ?? 18);   // 0  ← 只防空值，0 被保留

let nickname = null;
console.log("nickname ?? '游客' :", nickname ?? "游客"); // "游客"

// ?? 不能和 && || 直接混写（语法错误），要加括号
let flag = true;
console.log("(a ?? b) && flag :", ((null ?? "x") && flag)); // true


// ----------------------------------------
// 8. 可选链 ?.（ES2020）
// ----------------------------------------

console.log("\n=== 8. 可选链 ?. ===");

/*
  a?.b：a 是 null/undefined 时直接返回 undefined，不再往下取 .b，
  防止「读取空属性的值」报错。
*/

let resp = {
  data: {
    user: {
      name: "李四",
      address: null
    }
  }
};

console.log("resp?.data?.user?.name :", resp?.data?.user?.name); // "李四"
console.log("深层不存在 address.city?.zip :", resp?.data?.user?.address?.city?.zip); // undefined（安全！）

/*
  没有 ?. 的话：
  resp.data.user.address.city.zip
  // ❌ TypeError: Cannot read properties of null (reading 'city')
  旧写法要一层层 &&：
  resp && resp.data && resp.data.user && ... （繁琐）
*/

// ?. 也支持函数调用和数组下标
let obj2 = { fn: () => "hi" };
console.log("obj2.fn?.()   :", obj2.fn?.());      // "hi"
console.log("obj2.x?.()    :", obj2.x?.());       // undefined（x 不存在也不报错）
let arr = [10, 20];
console.log("arr?.[1]      :", arr?.[1]);         // 20
console.log("arr?.[99]     :", arr?.[99]);        // undefined

// 配合 ?? 兜底是黄金搭档
let city = resp?.data?.user?.address?.city ?? "未知城市";
console.log("?. + ?? 兜底:", city); // "未知城市"


// ----------------------------------------
// 9. 一元运算符
// ----------------------------------------

console.log("\n=== 9. 一元运算符 ===");

console.log("+ '42'  :", +"42");     // 42（转数字，比 Number() 顺手）
console.log("- '42'  :", -"42");     // -42
console.log("+ 'abc' :", +"abc");    // NaN
console.log("typeof 1 :", typeof 1);        // "number"（typeof 是运算符不是函数）
let undeclaredCheck;
console.log("typeof 未声明变量 :", typeof someNeverSeen); // "undefined"（不报错，安全检测）

// void：求值并返回 undefined（少见，知道即可）
console.log("void 0 :", void 0); // undefined


// ----------------------------------------
// 10. 位运算符（了解即可）
// ----------------------------------------

console.log("\n=== 10. 位运算符 ===");

// 按二进制位操作，日常少用，但面试常考
console.log("5 & 3  :", 5 & 3);    // 1  （101 & 011 = 001）
console.log("5 | 3  :", 5 | 3);    // 7  （101 | 011 = 111）
console.log("5 ^ 3  :", 5 ^ 3);    // 6  （异或：相同为0不同为1）
console.log("~5     :", ~5);       // -6 （按位取反）
console.log("5 << 1 :", 5 << 1);   // 10 （左移1位 = ×2）
console.log("5 >> 1 :", 5 >> 1);   // 2  （右移1位 = ÷2 取整）

// 冷知识：~~x 可以快速取整（比 Math.floor 快，但不支持大数）
console.log("~~3.9  :", ~~3.9);    // 3


// ----------------------------------------
// 11. 其他运算符
// ----------------------------------------

console.log("\n=== 11. 其他 ===");

// in：判断属性（含原型链）是否存在
let car = { brand: "BYD", price: 100000 };
console.log("'brand' in car :", "brand" in car);   // true
console.log("'color' in car :", "color" in car);   // false
console.log("'toString' in car :", "toString" in car); // true（原型链上的！）

// delete：删除对象属性
delete car.price;
console.log("删除后 car =", car); // { brand: 'BYD' }

// 逗号运算符：从左到右全执行，返回最后一个
let cc = (console.log("先执行"), "最后一项");
console.log("逗号表达式结果:", cc); // "最后一项"


// ----------------------------------------
// 12. 运算符优先级（简版）
// ----------------------------------------

console.log("\n=== 12. 优先级 ===");

/*
  从高到低（记不住就加括号！）：
  ()  一元(++ -- ! typeof)  ** 
  >  * / %
  >  + -
  >  比较(< > <= >=)
  >  == != === !==
  >  ?? 
  >  &&
  >  ||
  >  三元 ?:
  >  赋值 = += 等
  >  逗号 ,

  例：** 优先级高于取负，所以 -2 ** 2 有争议被禁止：
  // -2 ** 2;  // ❌ SyntaxError，必须写 (-2) ** 2 或 -(2 ** 2)
*/

console.log("(-2) ** 2 =", (-2) ** 2);   // 4
console.log("-(2 ** 2) =", -(2 ** 2));   // -4
console.log("1 + 2 * 3 =", 1 + 2 * 3);   // 7（先乘后加）
console.log("(1 + 2) * 3 =", (1 + 2) * 3); // 9（括号改变一切）


// ----------------------------------------
// 13. 记忆要点
// ----------------------------------------

/*
  1. + 是唯一会"字符串拼接"的算术运算符，'1'+2='12' 但 '5'-2=3
  2. 比较永远用 ===，== 的转换规则离谱（'' == 0 为 true）
  3. && || 返回原值不返回布尔；?? 只防 null/undefined，不误伤 0 和 ""
  4. ?. 防深层访问报错，和 ?? 搭配兜底是黄金组合
  5. 短路特性：false && 后面不执行，true || 后面不执行
  6. 优先级记不住就加括号，代码可读性 > 炫技
*/

/*
  练习建议：
  1. 预测再验证：1 + '2' * 3、'10' - 5 - 1、true + 1
  2. 用 ?. 和 ?? 安全读取一个深层不存在的属性并给默认值
  3. 把 if (x) {...} else {...} 改写成一行的三元表达式
  4. 查 MDN 运算符优先级表，找出 ** 和一元 - 的特殊规则
*/
