// ========== 6.5 String 字符串详解 ==========

/*
  string 是 JS 的原始类型之一，用于表示文本。
  核心特性：
  1. 不可变（immutable）—— 所有"修改"方法都返回新字符串，原串不变
  2. 按 UTF-16 编码存储 —— 这会导致 emoji 等特殊字符的长度陷阱
*/


// ----------------------------------------
// 1. 创建字符串的三种引号
// ----------------------------------------

console.log("=== 1. 三种引号 ===");

let single = '单引号字符串';
let double = "双引号字符串";
let backtick = `反引号（模板字符串）`;

console.log(single, "|", double, "|", backtick);

// 区别：
// - 单/双引号功能几乎一样，习惯上常用单引号（JS 社区）或双引号（部分团队规范）
// - 引号内出现相同引号需要转义
let quote1 = '他说"你好"';       // 外单内双，OK
let quote2 = "她说'你好'";       // 外双内单，OK
let quote3 = 'it\'s ok';         // 外内都是单引号，要转义
console.log(quote1, "|", quote2, "|", quote3);

// 多行字符串：只有反引号支持直接换行
let multi = `第一行
第二行
第三行`;
console.log(multi);


// ----------------------------------------
// 2. 转义字符
// ----------------------------------------

console.log("\n=== 2. 转义字符 ===");
console.log("换行: 你好\\n世界 →");
console.log("制表符: a\\tb → a\tb");
console.log("反斜杠: \\\\ → \\");
console.log("中文 Unicode: \\u4e2d\\u6587 → \u4e2d\u6587");


// ----------------------------------------
// 3. 模板字符串（重点，日常最常用）
// ----------------------------------------

console.log("\n=== 3. 模板字符串 ===");

let userName = "张三";
let age = 20;

// ① 嵌入变量 ${}
let msg1 = `我叫${userName}，今年${age}岁`;
console.log(msg1);

// ② 嵌入任意表达式
let msg2 = `明年${age + 1}岁`;
let msg3 = `是否成年: ${age >= 18}`;
console.log(msg2, "|", msg3);

// ③ 对比旧写法（字符串拼接）
let oldWay = "我叫" + userName + "，今年" + age + "岁";
console.log("拼接写法:", oldWay); // 结果相同，但模板字符串更清晰


// ----------------------------------------
// 4. 不可变性（重要概念）
// ----------------------------------------

console.log("\n=== 4. 不可变性 ===");

let str = "hello";
let upper = str.toUpperCase();
console.log("原串:", str, "→ 方法返回新串:", upper); // hello / HELLO，原串没变

// 想"修改"必须重新赋值
str = str.toUpperCase();
console.log("重新赋值后:", str); // HELLO

/*
  呼应 6.1 学的存储模型：
  字符串不可变，所以 s = s + "!" 不是"在原串尾部加字符"，
  而是"创建一个全新字符串，让 s 指向它"。
*/


// ----------------------------------------
// 5. 长度与索引访问
// ----------------------------------------

console.log("\n=== 5. 长度与索引 ===");

let word = "JavaScript";
console.log("word.length =", word.length);           // 10
console.log("第一个字符:", word[0]);                  // "J"
console.log("最后一个字符:", word[word.length - 1]);  // "t"
console.log("at(-1) 从尾部取:", word.at(-1));         // "t"（ES2022，支持负索引）

// 索引是只读的！
// word[0] = "X";  // 不报错，但静默失败（严格模式也不报错），原串不变

// ⚠️ 长度陷阱：emoji / 特殊字符占 2 个编码单元
let emoji = "😀abc";
console.log("'😀abc'.length =", emoji.length);  // 5，不是 4！
console.log("正确字符数:", [...emoji].length);   // 4（用展开成数组）


// ----------------------------------------
// 6. 查找类方法
// ----------------------------------------

console.log("\n=== 6. 查找 ===");

let text = "I like JavaScript and Java";

console.log("indexOf('Java') =", text.indexOf("Java"));           // 7（命中的是 JavaScript 的开头！）
console.log("indexOf('Java', 14) =", text.indexOf("Java", 14));   // 22（从 14 开始找）
console.log("indexOf('Python') =", text.indexOf("Python"));       // -1（找不到返回 -1）
console.log("lastIndexOf('Java') =", text.lastIndexOf("Java"));   // 22（从尾部找）

console.log("includes('Java') =", text.includes("Java"));         // true（比 indexOf 更语义化）
console.log("startsWith('I like') =", text.startsWith("I like")); // true
console.log("endsWith('Java') =", text.endsWith("Java"));         // true


// ----------------------------------------
// 7. 截取类方法
// ----------------------------------------

console.log("\n=== 7. 截取 ===");

let file = "photo.png";

console.log("slice(0, 5) =", file.slice(0, 5));    // "photo"（左闭右开 [0,5)）
console.log("slice(6) =", file.slice(6));           // "png"（省略第二个参数取到末尾）
console.log("slice(-3) =", file.slice(-3));         // "png"（支持负数，从尾部数）
console.log("substring(0, 5) =", file.substring(0, 5)); // "photo"（不支持负数，参数会自动排序）

// 实际例子：取扩展名
let dotIndex = file.indexOf(".");
let ext = file.slice(dotIndex + 1);
console.log("扩展名:", ext); // "png"


// ----------------------------------------
// 8. 替换与拆分
// ----------------------------------------

console.log("\n=== 8. 替换与拆分 ===");

let sentence = "one two three";
console.log("replace('two', '2') =", sentence.replace("two", "2")); // "one 2 three"（只替换第一个）
console.log("replaceAll('o', '0') =", sentence.replaceAll("o", "0")); // "0ne tw0 three"（全部替换）
console.log("原串不变:", sentence); // 不可变性再次体现

// split：字符串 → 数组
let csv = "苹果,香蕉,橙子";
console.log("split(',') =", csv.split(","));       // ["苹果","香蕉","橙子"]
console.log("split('') =", "abc".split(""));       // ["a","b","c"]（拆成单字符）
console.log("split('', 2) =", "abc".split("", 2)); // ["a","b"]（限制数量）

// join：数组 → 字符串（split 的逆操作）
console.log("join('-') =", ["2026", "10", "09"].join("-")); // "2026-10-09"


// ----------------------------------------
// 9. 整理与修饰
// ----------------------------------------

console.log("\n=== 9. 整理与修饰 ===");

let dirty = "   hello world   ";
console.log("trim() =", JSON.stringify(dirty.trim()));     // "hello world"（去首尾空格）
console.log("trimStart() =", JSON.stringify(dirty.trimStart()));
console.log("trimEnd() =", JSON.stringify(dirty.trimEnd()));

console.log("toUpperCase() =", "abc".toUpperCase());  // "ABC"
console.log("toLowerCase() =", "ABC".toLowerCase());  // "abc"

// padStart / padEnd：补齐长度（做表格、补零神器）
console.log("padStart(5, '0') =", "42".padStart(5, "0"));   // "00042"
console.log("padEnd(8, '.') =", "price".padEnd(8, "."));    // "price..."

console.log("repeat(3) =", "ha".repeat(3));                  // "hahaha"


// ----------------------------------------
// 10. 比较大小
// ----------------------------------------

console.log("\n=== 10. 比较 ===");

// 直接用 < > 比较（按字典序/Unicode 码点）
console.log("'apple' < 'banana' ?", "apple" < "banana");  // true
console.log("'B' < 'a' ?", "B" < "a");                    // true！大写码点比小写小（陷阱）

// 忽略大小写的比较：先统一转小写
let input = "JavaScript";
console.log("忽略大小写:", input.toLowerCase() === "javascript"); // true

// 中文排序要用 localeCompare（返回 -1 / 0 / 1，按本地规则如拼音）
console.log("'中'.localeCompare('国') =", "中".localeCompare("国")); // 1（"中" zhong 排在 "国" guo 后）


// ----------------------------------------
// 11. 遍历字符串
// ----------------------------------------

console.log("\n=== 11. 遍历 ===");

let chars = "abc";

// 方式①：for 循环 + 索引
for (let i = 0; i < chars.length; i++) {
  // console.log(chars[i]);
}

// 方式②：for...of（推荐，能正确处理 emoji）
for (const ch of "a😀b") {
  console.log("for...of 遍历:", ch); // a → 😀 → b（3 次，emoji 是完整的）
}

// 方式③：展开运算符
console.log("展开:", [..."a😀b"]); // ["a","😀","b"]


// ----------------------------------------
// 12. 字符串 ↔ 其他类型
// ----------------------------------------

console.log("\n=== 12. 类型转换 ===");

// 转字符串的三种方式
console.log("String(123) =", String(123));
console.log("(123).toString() =", (123).toString());
console.log("123 + '' =", 123 + "");        // "123"（加空串隐式转换，常用但不如 String() 清晰）

// 转数字（呼应 6.3 学的）
console.log("Number('42') =", Number("42"));
console.log("parseInt('42px') =", parseInt("42px"));


// ----------------------------------------
// 13. 记忆要点
// ----------------------------------------

/*
  1. 三种引号：单/双等价，反引号独有 ${} 插值和多行
  2. 字符串不可变：所有方法返回新串，"修改"要重新赋值
  3. length 按 UTF-16 编码单元数：emoji 占 2，正确数用 [...str].length
  4. 找不到返回 -1：indexOf；布尔判断优先 includes
  5. slice 支持负数，substring 不支持
  6. replace 只换第一个，全换用 replaceAll
  7. 大写 < 小写（'B' < 'a' 为 true），比较前先 toLowerCase
  8. 遍历含 emoji 的字符串用 for...of，别用索引循环
*/

/*
  练习建议：
  1. 用模板字符串拼一句自我介绍（嵌入变量和表达式）
  2. 写代码从 "style.css" 中提取主名 "style" 和扩展名 "css"
  3. 把 "1,2,3,4,5" 用 split + map 变成数字数组 [1,2,3,4,5]
  4. 用 padStart 把 7 显示为 "007"
  5. 验证 "😀".length 和 [..."😀"].length 的差异
*/
