// ==========================================
// 1. LANGUAGE TEMPLATES (Complete for all 12 languages)
// ==========================================

const LANGUAGE_TEMPLATES = {
  javascript: {
    function: (name, params) => `function ${name}(${params.join(", ")}) {
  // Write your solution here
  
}`,
    testCase: (funcName, args, expected) =>
      `console.log(${funcName}(${args})); // Expected: ${expected}`,
    comment: (text) => `// ${text}`,
  },

  python: {
    function: (name, params) => `def ${name}(${params.join(", ")}):
    # Write your solution here
    pass`,
    testCase: (funcName, args, expected) =>
      `print(${funcName}(${args}))  # Expected: ${expected}`,
    comment: (text) => `# ${text}`,
  },

  java: {
    function: (name, params, returnType) => {
      const defaultReturn =
        returnType === "void"
          ? ""
          : returnType === "int" || returnType === "boolean"
          ? "0"
          : returnType === "int[]"
          ? "new int[0]"
          : returnType === "int[][]"
          ? "new int[0][0]"
          : returnType === "String"
          ? '""'
          : "null";
      return `    public static ${returnType} ${name}(${params.join(", ")}) {
        // Write your solution here
        ${defaultReturn ? `return ${defaultReturn};` : ""}
    }`;
    },
    testCase: (funcName, args, expected, returnType) => {
      if (returnType && returnType.includes("[][]")) {
        return `        System.out.println(Arrays.deepToString(${funcName}(${args}))); // Expected: ${expected}`;
      } else if (returnType && returnType.includes("[]")) {
        return `        System.out.println(Arrays.toString(${funcName}(${args}))); // Expected: ${expected}`;
      }
      return `        System.out.println(${funcName}(${args})); // Expected: ${expected}`;
    },
    wrapper: (code, testCases) => `import java.util.*;

class Solution {
${code}
    
    public static void main(String[] args) {
${testCases}
    }
}`,
    comment: (text) => `        // ${text}`,
  },

  cpp: {
    function: (name, params, returnType) => {
      const defaultReturn =
        returnType === "void"
          ? ""
          : returnType === "int" || returnType === "bool"
          ? "0"
          : returnType === "vector<int>" || returnType === "vector<int>&"
          ? "{}"
          : returnType === "vector<vector<int>>" ||
            returnType === "vector<vector<int>>&"
          ? "{}"
          : '""';
      return `${returnType} ${name}(${params.join(", ")}) {
    // Write your solution here
    ${defaultReturn ? `return ${defaultReturn};` : ""}
}`;
    },
    testCase: (funcName, args, expected, returnType) => {
      if (returnType && returnType.includes("vector<vector<int>>")) {
        return `    auto result = ${funcName}(${args});
    cout << "[";
    for(int i = 0; i < result.size(); i++) {
        cout << "[";
        for(int j = 0; j < result[i].size(); j++) {
            cout << result[i][j];
            if(j < result[i].size()-1) cout << ",";
        }
        cout << "]";
        if(i < result.size()-1) cout << ",";
    }
    cout << "]" << endl; // Expected: ${expected}`;
      } else if (returnType && returnType.includes("vector")) {
        return `    auto result = ${funcName}(${args});
    cout << "[";
    for(int i = 0; i < result.size(); i++) {
        cout << result[i];
        if(i < result.size()-1) cout << ",";
    }
    cout << "]" << endl; // Expected: ${expected}`;
      }
      return `    cout << ${funcName}(${args}) << endl; // Expected: ${expected}`;
    },
    includes: [
      "#include <iostream>",
      "#include <vector>",
      "#include <string>",
      "using namespace std;",
    ],
    wrapper: (includes, code, testCases) => `${includes.join("\n")}

${code}

int main() {
${testCases}
    return 0;
}`,
    comment: (text) => `    // ${text}`,
  },

  typescript: {
    function: (name, params, returnType) => `function ${name}(${params.join(
      ", "
    )}): ${returnType} {
  // Write your solution here
  ${
    returnType === "void"
      ? ""
      : `return ${
          returnType === "number"
            ? "0"
            : returnType === "boolean"
            ? "false"
            : returnType.includes("[][]")
            ? "[[]]"
            : returnType.includes("[]")
            ? "[]"
            : '""'
        };`
  }
}`,
    testCase: (funcName, args, expected) =>
      `console.log(${funcName}(${args})); // Expected: ${expected}`,
    comment: (text) => `// ${text}`,
  },

  go: {
    function: (name, params, returnType) => `func ${name}(${params.join(
      ", "
    )}) ${returnType} {
    // Write your solution here
    ${
      returnType
        ? `return ${
            returnType === "int"
              ? "0"
              : returnType === "bool"
              ? "false"
              : returnType.includes("[][]")
              ? "nil"
              : returnType.includes("[]")
              ? "nil"
              : '""'
          }`
        : ""
    }
}`,
    testCase: (funcName, args, expected) =>
      `    fmt.Println(${funcName}(${args})) // Expected: ${expected}`,
    wrapper: (code, testCases) => `package main
import "fmt"

${code}

func main() {
${testCases}
}`,
    comment: (text) => `    // ${text}`,
  },

  rust: {
    function: (name, params, returnType) => `fn ${name}(${params.join(
      ", "
    )}) -> ${returnType} {
    // Write your solution here
    ${
      returnType === "i32"
        ? "0"
        : returnType === "bool"
        ? "false"
        : returnType.includes("Vec<Vec")
        ? "vec![vec![]]"
        : returnType.includes("Vec")
        ? "vec![]"
        : "String::new()"
    }
}`,
    testCase: (funcName, args, expected) =>
      `    println!("{:?}", ${funcName}(${args})); // Expected: ${expected}`,
    wrapper: (code, testCases) => `${code}

fn main() {
${testCases}
}`,
    comment: (text) => `    // ${text}`,
  },

  csharp: {
    function: (name, params, returnType) => {
      const defaultReturn =
        returnType === "void"
          ? ""
          : returnType === "int" || returnType === "bool"
          ? "0"
          : returnType === "int[]"
          ? "new int[0]"
          : returnType === "int[][]"
          ? "new int[0][]"
          : '""';
      return `    public static ${returnType} ${name}(${params.join(", ")}) {
        // Write your solution here
        ${defaultReturn ? `return ${defaultReturn};` : ""}
    }`;
    },
    testCase: (funcName, args, expected, returnType) => {
      if (returnType && returnType.includes("[][]")) {
        return `        Console.WriteLine("[" + string.Join(",", ${funcName}(${args}).Select(x => "[" + string.Join(",", x) + "]")) + "]"); // Expected: ${expected}`;
      } else if (returnType && returnType.includes("[]")) {
        return `        Console.WriteLine("[" + string.Join(",", ${funcName}(${args})) + "]"); // Expected: ${expected}`;
      }
      return `        Console.WriteLine(${funcName}(${args})); // Expected: ${expected}`;
    },
    wrapper: (code, testCases) => `using System;
using System.Linq;

class Solution {
${code}
    
    public static void Main() {
${testCases}
    }
}`,
    comment: (text) => `        // ${text}`,
  },

  ruby: {
    function: (name, params) => `def ${name}(${params.join(", ")})
    # Write your solution here
    
    nil
end`,
    testCase: (funcName, args, expected) =>
      `puts ${funcName}(${args}).inspect # Expected: ${expected}`,
    comment: (text) => `# ${text}`,
  },

  php: {
    function: (name, params) => `function ${name}(${params
      .map((p) => "$" + p)
      .join(", ")}) {
    // Write your solution here
    
    return null;
}`,
    testCase: (funcName, args, expected) =>
      `echo json_encode(${funcName}(${args})) . "\\n"; // Expected: ${expected}`,
    wrapper: (code, testCases) => `<?php
${code}

${testCases}
?>`,
    comment: (text) => `// ${text}`,
  },

  swift: {
    function: (name, params, returnType) => `func ${name}(${params.join(
      ", "
    )}) -> ${returnType} {
    // Write your solution here
    return ${
      returnType === "Int"
        ? "0"
        : returnType === "Bool"
        ? "false"
        : returnType.includes("[[")
        ? "[[]]"
        : returnType.includes("[")
        ? "[]"
        : '""'
    }
}`,
    testCase: (funcName, args, expected) =>
      `print(${funcName}(${args})) // Expected: ${expected}`,
    comment: (text) => `// ${text}`,
  },

  kotlin: {
    function: (name, params, returnType) => `fun ${name}(${params.join(
      ", "
    )}): ${returnType} {
    // Write your solution here
    return ${
      returnType === "Int"
        ? "0"
        : returnType === "Boolean"
        ? "false"
        : returnType.includes("Array<IntArray>")
        ? "arrayOf()"
        : returnType.includes("Array")
        ? "intArrayOf()"
        : '""'
    }
}`,
    testCase: (funcName, args, expected, returnType) => {
      if (returnType && returnType.includes("Array<IntArray>")) {
        return `    println(${funcName}(${args}).map { it.contentToString() }) // Expected: ${expected}`;
      } else if (returnType && returnType.includes("Array")) {
        return `    println(${funcName}(${args}).contentToString()) // Expected: ${expected}`;
      }
      return `    println(${funcName}(${args})) // Expected: ${expected}`;
    },
    wrapper: (code, testCases) => `${code}

fun main() {
${testCases}
}`,
    comment: (text) => `    // ${text}`,
  },

  c: {
    function: (
      name,
      params,
      returnType
    ) => `${returnType} ${name}(${params.join(", ")}) {
    // Write your solution here
    return ${
      returnType === "int" ? "0" : returnType === "bool" ? "false" : "NULL"
    };
}`,
    testCase: (funcName, args, expected, returnType) => {
      if (
        returnType &&
        returnType.includes("*") &&
        returnType.includes("int")
      ) {
        return `    int* result = ${funcName}(${args});
    printf("[%d,%d]\\n", result[0], result[1]); // Expected: ${expected}`;
      }
      return `    printf("%d\\n", ${funcName}(${args})); // Expected: ${expected}`;
    },
    includes: [
      "#include <stdio.h>",
      "#include <stdlib.h>",
      "#include <stdbool.h>",
    ],
    wrapper: (includes, code, testCases) => `${includes.join("\n")}

${code}

int main() {
${testCases}
    return 0;
}`,
    comment: (text) => `    // ${text}`,
  },
};

// ==========================================
// 2. TYPE MAPPINGS
// ==========================================

const TYPE_MAPPINGS = {
  javascript: {
    int: "number",
    "int[]": "number[]",
    "int[][]": "number[][]",
    string: "string",
    "string[]": "string[]",
    "char[]": "string[]",
    "char[][]": "string[][]",
    boolean: "boolean",
    bool: "boolean",
    void: "void",
    TreeNode: "TreeNode",
    "TreeNode*": "TreeNode",
  },
  python: {
    int: "int",
    "int[]": "list",
    "int[][]": "list",
    string: "str",
    "string[]": "list",
    "char[]": "list",
    "char[][]": "list",
    boolean: "bool",
    bool: "bool",
    void: "None",
    TreeNode: "TreeNode",
    "TreeNode*": "TreeNode",
  },
  java: {
    int: "int",
    "int[]": "int[]",
    "int[][]": "int[][]",
    string: "String",
    "string[]": "String[]",
    "char[]": "char[]",
    "char[][]": "char[][]",
    boolean: "boolean",
    bool: "boolean",
    void: "void",
    TreeNode: "TreeNode",
    "TreeNode*": "TreeNode",
  },
  cpp: {
    int: "int",
    "int[]": "vector<int>&",
    "int[][]": "vector<vector<int>>&",
    string: "string",
    "string[]": "vector<string>&",
    "char[]": "vector<char>&",
    "char[][]": "vector<vector<char>>&",
    boolean: "bool",
    bool: "bool",
    void: "void",
    TreeNode: "TreeNode*",
    "TreeNode*": "TreeNode*",
  },
  typescript: {
    int: "number",
    "int[]": "number[]",
    "int[][]": "number[][]",
    string: "string",
    "string[]": "string[]",
    "char[]": "string[]",
    "char[][]": "string[][]",
    boolean: "boolean",
    bool: "boolean",
    void: "void",
    TreeNode: "TreeNode",
    "TreeNode*": "TreeNode",
  },
  go: {
    int: "int",
    "int[]": "[]int",
    "int[][]": "[][]int",
    string: "string",
    "string[]": "[]string",
    "char[]": "[]byte",
    "char[][]": "[][]byte",
    boolean: "bool",
    bool: "bool",
    void: "",
    TreeNode: "*TreeNode",
    "TreeNode*": "*TreeNode",
  },
  rust: {
    int: "i32",
    "int[]": "Vec<i32>",
    "int[][]": "Vec<Vec<i32>>",
    string: "String",
    "string[]": "Vec<String>",
    "char[]": "Vec<char>",
    "char[][]": "Vec<Vec<char>>",
    boolean: "bool",
    bool: "bool",
    void: "()",
    TreeNode: "Option<Rc<RefCell<TreeNode>>>",
    "TreeNode*": "Option<Rc<RefCell<TreeNode>>>",
  },
  csharp: {
    int: "int",
    "int[]": "int[]",
    "int[][]": "int[][]",
    string: "string",
    "string[]": "string[]",
    "char[]": "char[]",
    "char[][]": "char[][]",
    boolean: "bool",
    bool: "bool",
    void: "void",
    TreeNode: "TreeNode",
    "TreeNode*": "TreeNode",
  },
  ruby: {
    int: "",
    "int[]": "",
    "int[][]": "",
    string: "",
    "string[]": "",
    "char[]": "",
    "char[][]": "",
    boolean: "",
    bool: "",
    void: "",
    TreeNode: "",
    "TreeNode*": "",
  },
  php: {
    int: "",
    "int[]": "",
    "int[][]": "",
    string: "",
    "string[]": "",
    "char[]": "",
    "char[][]": "",
    boolean: "",
    bool: "",
    void: "",
    TreeNode: "",
    "TreeNode*": "",
  },
  swift: {
    int: "Int",
    "int[]": "[Int]",
    "int[][]": "[[Int]]",
    string: "String",
    "string[]": "[String]",
    "char[]": "[Character]",
    "char[][]": "[[Character]]",
    boolean: "Bool",
    bool: "Bool",
    void: "Void",
    TreeNode: "TreeNode?",
    "TreeNode*": "TreeNode?",
  },
  kotlin: {
    int: "Int",
    "int[]": "IntArray",
    "int[][]": "Array<IntArray>",
    string: "String",
    "string[]": "Array<String>",
    "char[]": "CharArray",
    "char[][]": "Array<CharArray>",
    boolean: "Boolean",
    bool: "Boolean",
    void: "Unit",
    TreeNode: "TreeNode?",
    "TreeNode*": "TreeNode?",
  },
  c: {
    int: "int",
    "int[]": "int*",
    "int[][]": "int**",
    string: "char*",
    "string[]": "char**",
    "char[]": "char*",
    "char[][]": "char**",
    boolean: "bool",
    bool: "bool",
    void: "void",
    TreeNode: "struct TreeNode*",
    "TreeNode*": "struct TreeNode*",
  },
};

// ==========================================
// 3. PROBLEM DEFINITIONS
// ==========================================

export const PROBLEM_DEFINITIONS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",

    function: {
      name: "twoSum",
      params: [
        { name: "nums", type: "int[]" },
        { name: "target", type: "int" },
      ],
      returnType: "int[]",
    },

    testCases: [
      { input: ["[2, 7, 11, 15]", "9"], output: "[0,1]" },
      { input: ["[3, 2, 4]", "6"], output: "[1,2]" },
      { input: ["[3, 3]", "6"], output: "[0,1]" },
    ],

    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },

    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],

    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
  },

  "climbing-stairs": {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",

    function: {
      name: "climbStairs",
      params: [{ name: "n", type: "int" }],
      returnType: "int",
    },

    testCases: [
      { input: ["2"], output: "2" },
      { input: ["3"], output: "3" },
      { input: ["5"], output: "8" },
    ],

    description: {
      text: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
      notes: ["In how many distinct ways can you climb to the top?"],
    },

    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation:
          "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps",
      },
      {
        input: "n = 3",
        output: "3",
        explanation:
          "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step",
      },
    ],

    constraints: ["1 ≤ n ≤ 45"],
  },

  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Array • Binary Search",
    function: {
      name: "search",
      params: [
        { name: "nums", type: "int[]" },
        { name: "target", type: "int" },
      ],
      returnType: "int",
    },
    testCases: [
      { input: ["[-1,0,3,5,9,12]", "9"], output: "4" },
      { input: ["[-1,0,3,5,9,12]", "2"], output: "-1" },
    ],
    description: {
      text: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
      notes: [
        "If target exists, then return its index. Otherwise, return -1.",
        "You must write an algorithm with O(log n) runtime complexity.",
      ],
    },
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1",
      },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁴",
      "-10⁴ < nums[i], target < 10⁴",
      "All the integers in nums are unique",
      "nums is sorted in ascending order",
    ],
  },

  "best-time-to-buy-sell-stock": {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    function: {
      name: "maxProfit",
      params: [{ name: "prices", type: "int[]" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[7,1,5,3,6,4]"], output: "5" },
      { input: ["[7,6,4,3,1]"], output: "0" },
    ],
    description: {
      text: "You are given an array prices where prices[i] is the price of a given stock on the ith day.",
      notes: [
        "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        "Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
      ],
    },
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation:
          "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation:
          "In this case, no transactions are done and the max profit = 0.",
      },
    ],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
  },

  "book-allocation-problem": {
    id: "book-allocation-problem",
    title: "Book Allocation Problem",
    difficulty: "Medium",
    category: "Array • Binary Search",
    function: {
      name: "minPages",
      params: [
        { name: "books", type: "int[]" },
        { name: "students", type: "int" },
      ],
      returnType: "int",
    },
    testCases: [
      { input: ["[12, 34, 67, 90]", "2"], output: "113" },
      { input: ["[5, 17, 100, 11]", "4"], output: "100" },
    ],
    description: {
      text: "Given an array of integers books where books[i] represents the number of pages in the ith book, allocate all books to students such that each student gets at least one book and each book is allocated to exactly one student.",
      notes: [
        "You want to minimize the maximum number of pages assigned to a student.",
        "Return the minimum possible value of the maximum pages a student can get.",
      ],
    },
    examples: [
      {
        input: "books = [12, 34, 67, 90], students = 2",
        output: "113",
        explanation:
          "Allocate first 2 books to student 1 (12+34=46), last 2 books to student 2 (67+90=157). Maximum pages = max(46,157) = 157. Better allocation: [12,34,67] and [90], maximum pages = 113.",
      },
      {
        input: "books = [5, 17, 100, 11], students = 4",
        output: "100",
        explanation: "Each student can get one book. Maximum pages = 100.",
      },
    ],
    constraints: [
      "1 ≤ books.length ≤ 10⁵",
      "1 ≤ students ≤ books.length",
      "1 ≤ books[i] ≤ 10⁶",
    ],
  },

  "koko-eating-bananas": {
    id: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    difficulty: "Hard",
    category: "Array • Binary Search",
    function: {
      name: "minEatingSpeed",
      params: [
        { name: "piles", type: "int[]" },
        { name: "h", type: "int" },
      ],
      returnType: "int",
    },
    testCases: [
      { input: ["[3,6,7,11]", "8"], output: "4" },
      { input: ["[30,11,23,4,20]", "5"], output: "30" },
      { input: ["[30,11,23,4,20]", "6"], output: "23" },
    ],
    description: {
      text: "Koko loves to eat bananas. There are n piles of bananas, where piles[i] is the number of bananas in the ith pile. Koko can decide her eating speed k (bananas per hour). Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them and stops for the hour.",
      notes: [
        "Koko wants to finish eating all the bananas within h hours.",
        "Return the minimum integer k such that she can eat all the bananas within h hours.",
      ],
    },
    examples: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4",
        explanation:
          "At speed 4, Koko can finish all piles in 8 hours: [3 ->1h], [6->2h], [7->2h], [11->3h] = 8h.",
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30",
        explanation:
          "At speed 30, Koko can finish each pile in one hour. It's impossible to finish all piles in 5 hours with a smaller speed.",
      },
    ],
    constraints: [
      "1 ≤ piles.length ≤ 10⁴",
      "1 ≤ piles[i] ≤ 10⁹",
      "piles.length ≤ h ≤ 10⁹",
    ],
  },

  "generate-parentheses": {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "Recursion",
    function: {
      name: "generateParenthesis",
      params: [{ name: "n", type: "int" }],
      returnType: "string[]",
    },
    testCases: [
      {
        input: ["3"],
        output: '["((()))","(()())","(())()","()(())","()()()"]',
      },
      { input: ["1"], output: '["()"]' },
    ],
    description: {
      text: "Given n pairs of parentheses, generate all combinations of well-formed parentheses.",
      notes: [
        "A well-formed parentheses string is one where each opening parenthesis '(' has a corresponding closing parenthesis ')', and the pairs are properly nested.",
      ],
    },
    examples: [
      {
        input: "n = 3",
        output: '["((()))","(()())","(())()","()(())","()()()"]',
        explanation: "All valid combinations of 3 pairs of parentheses.",
      },
      {
        input: "n = 1",
        output: '["()"]',
        explanation: "Only one valid combination exists for 1 pair.",
      },
    ],
    constraints: ["1 ≤ n ≤ 8"],
  },

  "jump-game": {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Array • Greedy",
    function: {
      name: "canJump",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "bool",
    },
    testCases: [
      { input: ["[2,3,1,1,4]"], output: "true" },
      { input: ["[3,2,1,0,4]"], output: "false" },
    ],
    description: {
      text: "You are given an array nums where nums[i] represents the maximum jump length from that position.",
      notes: [
        "Determine if you can reach the last index starting from the first index.",
        "Return true if it is possible to reach the last index, otherwise return false.",
      ],
    },
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "true",
        explanation:
          "Jump 1 step from index 0 to 1, then 3 steps to reach the last index.",
      },
      {
        input: "nums = [3,2,1,0,4]",
        output: "false",
        explanation: "It is impossible to reach the last index.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "0 ≤ nums[i] ≤ 10⁵"],
  },

  candy: {
    id: "candy",
    title: "Candy",
    difficulty: "Medium",
    category: "Array • Greedy",
    function: {
      name: "candy",
      params: [{ name: "ratings", type: "int[]" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[1,0,2]"], output: "5" },
      { input: ["[1,2,2]"], output: "4" },
    ],
    description: {
      text: "There are n children standing in a line, each with a rating value given in an array ratings.",
      notes: [
        "Distribute candies to the children such that each child must have at least one candy.",
        "Children with a higher rating get more candies than their neighbors.",
        "Return the minimum number of candies needed.",
      ],
    },
    examples: [
      {
        input: "ratings = [1,0,2]",
        output: "5",
        explanation: "Allocate candies as [2,1,2]. Total = 5.",
      },
      {
        input: "ratings = [1,2,2]",
        output: "4",
        explanation: "Allocate candies as [1,2,1]. Total = 4.",
      },
    ],
    constraints: ["1 ≤ ratings.length ≤ 2 * 10⁴", "0 ≤ ratings[i] ≤ 10⁵"],
  },

  "largest-rectangle-in-histogram": {
    id: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "Stack",
    function: {
      name: "largestRectangleArea",
      params: [{ name: "heights", type: "int[]" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[2,1,5,6,2,3]"], output: "10" },
      { input: ["[2,4]"], output: "4" },
    ],
    description: {
      text: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, find the area of the largest rectangle in the histogram.",
      notes: [
        "The largest rectangle is formed by consecutive bars and its area is height * width.",
      ],
    },
    examples: [
      {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation:
          "The largest rectangle has area 10 formed by heights [5,6].",
      },
      {
        input: "heights = [2,4]",
        output: "4",
        explanation: "The largest rectangle has area 4 formed by height 4.",
      },
    ],
    constraints: ["1 ≤ heights.length ≤ 10⁵", "0 ≤ heights[i] ≤ 10⁴"],
  },

  "house-robber": {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "Dynamic Programming",
    function: {
      name: "rob",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[1,2,3,1]"], output: "4" },
      { input: ["[2,7,9,3,1]"], output: "12" },
    ],
    description: {
      text: "You are a robber planning to rob houses along a street. Each house has a certain amount of money.",
      notes: [
        "You cannot rob two adjacent houses.",
        "Return the maximum amount of money you can rob tonight without alerting the police.",
      ],
    },
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (1) and house 3 (3), total = 4.",
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (2), 3 (9), 5 (1), total = 12.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "0 ≤ nums[i] ≤ 10⁴"],
  },

  "unique-paths": {
    id: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    category: "Dynamic Programming",
    function: {
      name: "uniquePaths",
      params: [
        { name: "m", type: "int" },
        { name: "n", type: "int" },
      ],
      returnType: "int",
    },
    testCases: [
      { input: ["3", "7"], output: "28" },
      { input: ["3", "2"], output: "3" },
    ],
    description: {
      text: "A robot is located at the top-left corner of an m x n grid. It can only move either down or right at any point in time.",
      notes: [
        "The robot is trying to reach the bottom-right corner of the grid.",
        "Return the number of possible unique paths.",
      ],
    },
    examples: [
      {
        input: "m = 3, n = 7",
        output: "28",
        explanation:
          "There are 28 unique paths to reach the bottom-right corner.",
      },
      {
        input: "m = 3, n = 2",
        output: "3",
        explanation:
          "Three paths exist: Right->Down->Down, Down->Down->Right, Down->Right->Down.",
      },
    ],
    constraints: ["1 ≤ m, n ≤ 100"],
  },

  "longest-increasing-subsequence": {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Dynamic Programming",
    function: {
      name: "lengthOfLIS",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[10,9,2,5,3,7,101,18]"], output: "4" },
      { input: ["[0,1,0,3,2,3]"], output: "4" },
    ],
    description: {
      text: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
      notes: [
        "A subsequence is derived by deleting some elements without changing the order of the remaining elements.",
        "Return the length of the longest strictly increasing subsequence.",
      ],
    },
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation:
          "The longest increasing subsequence is [2,3,7,101], length = 4.",
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
        explanation:
          "The longest increasing subsequence is [0,1,2,3], length = 4.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 2500", "0 ≤ nums[i] ≤ 10⁴"],
  },

  "minimum-path-sum": {
    id: "minimum-path-sum",
    title: "Minimum Path Sum",
    difficulty: "Medium",
    category: "Dynamic Programming",
    function: {
      name: "minPathSum",
      params: [{ name: "grid", type: "int[][]" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[[1,3,1],[1,5,1],[4,2,1]]"], output: "7" },
      { input: ["[[1,2,3],[4,5,6]]"], output: "12" },
    ],
    description: {
      text: "Given a m x n grid filled with non-negative numbers, find a path from top-left to bottom-right which minimizes the sum of all numbers along its path.",
      notes: [
        "You can only move either down or right at any point in time.",
        "Return the minimum sum of a path from the top-left to the bottom-right corner.",
      ],
    },
    examples: [
      {
        input: "grid = [[1,3,1],[1,5,1],[4,2,1]]",
        output: "7",
        explanation: "The path 1→3→1→1→1 minimizes the sum, sum = 7.",
      },
      {
        input: "grid = [[1,2,3],[4,5,6]]",
        output: "12",
        explanation: "The path 1→2→3→6 minimizes the sum, sum = 12.",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 ≤ m, n ≤ 200",
      "0 ≤ grid[i][j] ≤ 100",
    ],
  },

  "partition-equal-subset-sum": {
    id: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    category: "Dynamic Programming",
    function: {
      name: "canPartition",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "bool",
    },
    testCases: [
      { input: ["[1,5,11,5]"], output: "true" },
      { input: ["[1,2,3,5]"], output: "false" },
    ],
    description: {
      text: "Given a non-empty array nums containing only positive integers, determine if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.",
      notes: [
        "Return true if such a partition exists, otherwise return false.",
      ],
    },
    examples: [
      {
        input: "nums = [1,5,11,5]",
        output: "true",
        explanation:
          "The array can be partitioned as [1,5,5] and [11], both sums equal 11.",
      },
      {
        input: "nums = [1,2,3,5]",
        output: "false",
        explanation: "No equal sum partition exists.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 200", "1 ≤ nums[i] ≤ 100"],
  },

  "maximum-depth-of-binary-tree": {
    id: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree • DFS",
    function: {
      name: "maxDepth",
      params: [{ name: "root", type: "TreeNode*" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[3,9,20,null,null,15,7]"], output: "3" },
      { input: ["[1,null,2]"], output: "2" },
    ],
    description: {
      text: "Given the root of a binary tree, find its maximum depth.",
      notes: [
        "A binary tree's depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
      ],
    },
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation:
          "The longest path is 3 → 20 → 15 or 3 → 20 → 7, depth = 3.",
      },
      {
        input: "root = [1,null,2]",
        output: "2",
        explanation: "The longest path is 1 → 2, depth = 2.",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4]",
      "-100 ≤ Node.val ≤ 100",
    ],
  },

  "validate-binary-search-tree": {
    id: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Tree • DFS",
    function: {
      name: "isValidBST",
      params: [{ name: "root", type: "TreeNode*" }],
      returnType: "bool",
    },
    testCases: [
      { input: ["[2,1,3]"], output: "true" },
      { input: ["[5,1,4,null,null,3,6]"], output: "false" },
    ],
    description: {
      text: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
      notes: [
        "A BST is valid if the left subtree contains only nodes with keys less than the node's key,",
        "the right subtree contains only nodes with keys greater than the node's key, and both subtrees are also BSTs.",
      ],
    },
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true",
        explanation: "The tree satisfies BST properties.",
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation:
          "Node 4 has a left child 3 which is less than 5 but in the right subtree, invalid BST.",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4]",
      "-2^31 ≤ Node.val ≤ 2^31 - 1",
    ],
  },

  "lowest-common-ancestor-of-binary-tree": {
    id: "lowest-common-ancestor-of-binary-tree",
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    category: "Tree • DFS",
    function: {
      name: "lowestCommonAncestor",
      params: [
        { name: "root", type: "TreeNode*" },
        { name: "p", type: "TreeNode*" },
        { name: "q", type: "TreeNode*" },
      ],
      returnType: "TreeNode*",
    },
    testCases: [
      { input: ["[3,5,1,6,2,0,8,null,null,7,4]", "5", "1"], output: "3" },
      { input: ["[3,5,1,6,2,0,8,null,null,7,4]", "5", "4"], output: "5" },
    ],
    description: {
      text: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
      notes: [
        "The LCA of two nodes p and q in a tree is the lowest node that has both p and q as descendants (a node can be a descendant of itself).",
      ],
    },
    examples: [
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
        output: "3",
        explanation: "The LCA of nodes 5 and 1 is 3.",
      },
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
        output: "5",
        explanation:
          "The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.",
      },
    ],
    constraints: ["All Node.val are unique", "p and q exist in the tree"],
  },

  "binary-tree-level-order-traversal": {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree • BFS",
    function: {
      name: "levelOrder",
      params: [{ name: "root", type: "TreeNode*" }],
      returnType: "int[][]",
    },
    testCases: [
      { input: ["[3,9,20,null,null,15,7]"], output: "[[3],[9,20],[15,7]]" },
      { input: ["[1]"], output: "[[1]]" },
    ],
    description: {
      text: "Given the root of a binary tree, return its level order traversal (from left to right, level by level).",
      notes: [
        "Use BFS or queue-based traversal to collect nodes level by level.",
      ],
    },
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level 0: [3], Level 1: [9,20], Level 2: [15,7]",
      },
      {
        input: "root = [1]",
        output: "[[1]]",
        explanation: "Single node tree returns [[1]]",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000]",
      "-1000 ≤ Node.val ≤ 1000",
    ],
  },
  "valid-anagram": {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String • Hash Table",
    function: {
      name: "isAnagram",
      params: [
        { name: "s", type: "string" },
        { name: "t", type: "string" },
      ],
      returnType: "bool",
    },
    testCases: [
      { input: ["'anagram'", "'nagaram'"], output: "true" },
      { input: ["'rat'", "'car'"], output: "false" },
    ],
    description: {
      text: "Given two strings s and t, determine if t is an anagram of s.",
      notes: ["Return true if t is an anagram of s, otherwise return false."],
    },
    examples: [
      { input: "s = 'anagram', t = 'nagaram'", output: "true" },
      { input: "s = 'rat', t = 'car'", output: "false" },
    ],
    constraints: ["1 ≤ s.length, t.length ≤ 5 * 10⁴"],
  },

  "merge-two-sorted-lists": {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    function: {
      name: "mergeTwoLists",
      params: [
        { name: "l1", type: "int[]" },
        { name: "l2", type: "int[]" },
      ],
      returnType: "int[]",
    },
    testCases: [
      { input: ["[1,2,4]", "[1,3,4]"], output: "[1,1,2,3,4,4]" },
      { input: ["[]", "[]"], output: "[]" },
    ],
    description: {
      text: "Merge two sorted linked lists and return it as a sorted list.",
      notes: ["The list should be in ascending order."],
    },
    examples: [
      { input: "l1 = [1,2,4], l2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "l1 = [], l2 = []", output: "[]" },
    ],
    constraints: ["0 ≤ l1.length, l2.length ≤ 50", "-100 ≤ l1[i], l2[i] ≤ 100"],
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    function: {
      name: "maxSubArray",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[-2,1,-3,4,-1,2,1,-5,4]"], output: "6" },
      { input: ["[1]"], output: "1" },
    ],
    description: {
      text: "Given an integer array nums, find the contiguous subarray with the largest sum.",
      notes: ["Return the sum of the subarray with the largest sum."],
    },
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
  },

  "rotate-image": {
    id: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Matrix",
    function: {
      name: "rotate",
      params: [{ name: "matrix", type: "int[][]" }],
      returnType: "void",
    },
    testCases: [
      {
        input: ["[[1,2,3],[4,5,6],[7,8,9]]"],
        output: "[[7,4,1],[8,5,2],[9,6,3]]",
      },
    ],
    description: {
      text: "Rotate a n x n 2D matrix 90 degrees clockwise in-place.",
      notes: ["Modify the input matrix directly and do not return anything."],
    },
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[[7,4,1],[8,5,2],[9,6,3]]",
      },
    ],
    constraints: ["matrix.length == n", "matrix[i].length == n", "1 ≤ n ≤ 20"],
  },

  "word-search": {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "Matrix • Backtracking",
    function: {
      name: "exist",
      params: [
        { name: "board", type: "char[][]" },
        { name: "word", type: "string" },
      ],
      returnType: "bool",
    },
    testCases: [
      {
        input: [
          "[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]",
          "'ABCCED'",
        ],
        output: "true",
      },
      {
        input: [
          "[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]",
          "'SEE'",
        ],
        output: "true",
      },
      {
        input: [
          "[['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]",
          "'ABCB'",
        ],
        output: "false",
      },
    ],
    description: {
      text: "Given a 2D board and a word, check if the word exists in the grid.",
      notes: [
        "The word can be constructed from letters of sequentially adjacent cells.",
      ],
    },
    examples: [
      {
        input:
          "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'",
        output: "true",
      },
    ],
    constraints: [
      "1 ≤ board.length ≤ 200",
      "1 ≤ board[i].length ≤ 200",
      "board and word consist of uppercase English letters.",
    ],
  },

  "decode-ways": {
    id: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    category: "Dynamic Programming • String",
    function: {
      name: "numDecodings",
      params: [{ name: "s", type: "string" }],
      returnType: "int",
    },
    testCases: [
      { input: ["'12'"], output: "2" },
      { input: ["'226'"], output: "3" },
      { input: ["'0'"], output: "0" },
    ],
    description: {
      text: "A message containing letters A-Z is encoded to numbers using 'A'->1, 'B'->2, ..., 'Z'->26'.",
      notes: ["Return the total number of ways to decode the message."],
    },
    examples: [
      { input: "s = '12'", output: "2" },
      { input: "s = '226'", output: "3" },
    ],
    constraints: [
      "1 ≤ s.length ≤ 100",
      "s contains only digits and may contain leading zeros.",
    ],
  },
  "binary-tree-maximum-depth": {
    id: "binary-tree-maximum-depth",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree • DFS",
    function: {
      name: "maxDepth",
      params: [{ name: "root", type: "TreeNode" }],
      returnType: "int",
    },
    testCases: [
      { input: ["[3,9,20,null,null,15,7]"], output: "3" },
      { input: ["[1,null,2]"], output: "2" },
    ],
    description: {
      text: "Given a binary tree, find its maximum depth.",
      notes: [
        "The maximum depth is the number of nodes along the longest path from root to leaf.",
      ],
    },
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3" }],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10⁴].",
      "-100 ≤ Node.val ≤ 100",
    ],
  },

  "invert-binary-tree": {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Tree • DFS",
    function: {
      name: "invertTree",
      params: [{ name: "root", type: "TreeNode" }],
      returnType: "TreeNode",
    },
    testCases: [{ input: ["[4,2,7,1,3,6,9]"], output: "[4,7,2,9,6,3,1]" }],
    description: {
      text: "Invert a binary tree.",
      notes: ["Swap every left and right child in the tree."],
    },
    examples: [{ input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }],
    constraints: ["Number of nodes in [0, 100]", "-100 ≤ Node.val ≤ 100"],
  },

  "lowest-common-ancestor-bst": {
    id: "lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of BST",
    difficulty: "Medium",
    category: "Tree • BST",
    function: {
      name: "lowestCommonAncestor",
      params: [
        { name: "root", type: "TreeNode" },
        { name: "p", type: "TreeNode" },
        { name: "q", type: "TreeNode" },
      ],
      returnType: "TreeNode",
    },
    testCases: [
      { input: ["[6,2,8,0,4,7,9,null,null,3,5]", "2", "8"], output: "6" },
      { input: ["[6,2,8,0,4,7,9,null,null,3,5]", "2", "4"], output: "2" },
    ],
    description: {
      text: "Given a BST and two nodes, find their lowest common ancestor (LCA).",
      notes: [
        "LCA is the lowest node in the tree that has both nodes as descendants.",
      ],
    },
    examples: [
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        output: "6",
      },
    ],
    constraints: ["All Node.val are unique.", "p and q exist in the BST."],
  },

  "course-schedule": {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph • Topological Sort",
    function: {
      name: "canFinish",
      params: [
        { name: "numCourses", type: "int" },
        { name: "prerequisites", type: "int[][]" },
      ],
      returnType: "bool",
    },
    testCases: [
      { input: ["2", "[[1,0]]"], output: "true" },
      { input: ["2", "[[1,0],[0,1]]"], output: "false" },
    ],
    description: {
      text: "Determine if it is possible to finish all courses given prerequisites.",
      notes: ["Return true if all courses can be finished, otherwise false."],
    },
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
    ],
    constraints: ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ 5000"],
  },

  "number-of-islands": {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graph • DFS/BFS",
    function: {
      name: "numIslands",
      params: [{ name: "grid", type: "char[][]" }],
      returnType: "int",
    },
    testCases: [
      {
        input: [
          "[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]",
        ],
        output: "3",
      },
    ],
    description: {
      text: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands.",
      notes: [
        "An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
      ],
    },
    examples: [
      {
        input:
          "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]",
        output: "3",
      },
    ],
    constraints: ["1 ≤ grid.length, grid[0].length ≤ 300"],
  },

  "trapping-rain-water": {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Array • Two Pointers",
    function: {
      name: "trap",
      params: [{ name: "height", type: "int[]" }],
      returnType: "int",
    },
    testCases: [{ input: ["[0,1,0,2,1,0,1,3,2,1,2,1]"], output: "6" }],
    description: {
      text: "Compute how much water it can trap after raining.",
      notes: ["Return the total trapped water."],
    },
    examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
    constraints: ["0 ≤ height.length ≤ 3 * 10⁴", "0 ≤ height[i] ≤ 10⁵"],
  },

  "word-ladder": {
    id: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph • BFS",
    function: {
      name: "ladderLength",
      params: [
        { name: "beginWord", type: "string" },
        { name: "endWord", type: "string" },
        { name: "wordList", type: "string[]" },
      ],
      returnType: "int",
    },
    testCases: [
      {
        input: ["'hit'", "'cog'", "['hot','dot','dog','lot','log','cog']"],
        output: "5",
      },
    ],
    description: {
      text: "Return the length of shortest transformation sequence from beginWord to endWord.",
      notes: [
        "Only one letter can be changed at a time.",
        "Each transformed word must exist in wordList.",
      ],
    },
    examples: [
      {
        input:
          "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']",
        output: "5",
      },
    ],
    constraints: [
      "1 ≤ wordList.length ≤ 5000",
      "All words have the same length.",
    ],
  },

  "merge-intervals": {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array • Sorting",
    function: {
      name: "merge",
      params: [{ name: "intervals", type: "int[][]" }],
      returnType: "int[][]",
    },
    testCases: [
      {
        input: ["[[1,3],[2,6],[8,10],[15,18]]"],
        output: "[[1,6],[8,10],[15,18]]",
      },
    ],
    description: {
      text: "Merge all overlapping intervals in a collection of intervals.",
      notes: [
        "Return an array of non-overlapping intervals that cover all intervals in input.",
      ],
    },
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
      },
    ],
    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2",
      "0 ≤ intervals[i][0] ≤ intervals[i][1] ≤ 10⁴",
    ],
  },

  "longest-consecutive-sequence": {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Hard",
    category: "Array • Hash Table",
    function: {
      name: "longestConsecutive",
      params: [{ name: "nums", type: "int[]" }],
      returnType: "int",
    },
    testCases: [{ input: ["[100,4,200,1,3,2]"], output: "4" }],
    description: {
      text: "Find the length of the longest consecutive elements sequence in an unsorted array.",
      notes: ["Your algorithm should run in O(n) time."],
    },
    examples: [{ input: "nums = [100,4,200,1,3,2]", output: "4" }],
    constraints: ["0 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
  },

  "sliding-window-maximum": {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Deque • Array",
    function: {
      name: "maxSlidingWindow",
      params: [
        { name: "nums", type: "int[]" },
        { name: "k", type: "int" },
      ],
      returnType: "int[]",
    },
    testCases: [
      { input: ["[1,3,-1,-3,5,3,6,7]", "3"], output: "[3,3,5,5,6,7]" },
    ],
    description: {
      text: "Given an array nums and sliding window size k, find max of each window.",
      notes: ["Use deque for O(n) solution."],
    },
    examples: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁴ ≤ nums[i] ≤ 10⁴",
      "1 ≤ k ≤ nums.length",
    ],
  },
};

// ==========================================
// 4. BOILERPLATE GENERATOR
// ==========================================

class BoilerplateGenerator {
  generateForLanguage(problemDef, language) {
    const template = LANGUAGE_TEMPLATES[language];
    const typeMap = TYPE_MAPPINGS[language];
    const returnType =
      typeMap[problemDef.function.returnType] || problemDef.function.returnType;
    const params = problemDef.function.params.map((p) => {
      const type = typeMap[p.type] || p.type;
      if (
        language === "javascript" ||
        language === "python" ||
        language === "ruby" ||
        language === "php"
      ) {
        return language === "php" ? `$${p.name}` : p.name;
      } else if (language === "typescript") {
        return `${p.name}: ${type}`;
      } else {
        return `${type} ${p.name}`;
      }
    });
    const funcCode = template.function(
      problemDef.function.name,
      params,
      returnType
    );
    const testCaseCode = problemDef.testCases
      .map((tc) =>
        template.testCase(
          problemDef.function.name,
          tc.input.join(", "),
          tc.output,
          returnType
        )
      )
      .join("\n");
    if (template.wrapper) {
      if (template.includes) {
        return template.wrapper(template.includes, funcCode, testCaseCode);
      }
      return template.wrapper(funcCode, testCaseCode);
    }
    return `${funcCode}\n\n${template.comment("Test cases")}\n${testCaseCode}`;
  }
  generateAll(problemDef) {
    const starterCode = {};
    const languages = Object.keys(LANGUAGE_TEMPLATES);
    languages.forEach((lang) => {
      try {
        starterCode[lang] = this.generateForLanguage(problemDef, lang);
      } catch (err) {
        console.error(`Error generating ${lang}:`, err);
        starterCode[
          lang
        ] = `// Error generating code for ${lang}: ${err.message}`;
      }
    });
    return starterCode;
  }
}

function generateAllProblems() {
  const generator = new BoilerplateGenerator();
  const result = {};
  Object.entries(PROBLEM_DEFINITIONS).forEach(([id, def]) => {
    result[id] = {
      ...def,
      starterCode: generator.generateAll(def),
      expectedOutput: generateExpectedOutputs(def),
    };
  });
  return result;
}

function generateExpectedOutputs(problemDef) {
  const outputs = {};
  const languages = Object.keys(LANGUAGE_TEMPLATES);

  languages.forEach((lang) => {
    if (lang === "python") {
      outputs[lang] = problemDef.testCases
        .map((tc) => tc.output.replace(/"/g, "'").replace(/,/g, ", "))
        .join("\n");
    } else if (lang === "go") {
      outputs[lang] = problemDef.testCases
        .map((tc) => tc.output.replace(/,/g, " ").replace(/\[|\]/g, ""))
        .join("\n");
    } else if (
      lang === "java" ||
      lang === "cpp" ||
      lang === "csharp" ||
      lang === "rust" ||
      lang === "swift" ||
      lang === "kotlin" ||
      lang === "ruby"
    ) {
      outputs[lang] = problemDef.testCases
        .map((tc) => tc.output.replace(/,/g, ", "))
        .join("\n");
    } else {
      outputs[lang] = problemDef.testCases.map((tc) => tc.output).join("\n");
    }
  });

  return outputs;
}

// ==========================================
// 5. EXPORTS
// ==========================================

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    extension: ".js",
    aceMode: "javascript",
    monacoLang: "javascript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  python: {
    name: "Python",
    extension: ".py",
    aceMode: "python",
    monacoLang: "python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  java: {
    name: "Java",
    extension: ".java",
    aceMode: "java",
    monacoLang: "java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  cpp: {
    name: "C++",
    extension: ".cpp",
    aceMode: "c_cpp",
    monacoLang: "cpp",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  typescript: {
    name: "TypeScript",
    extension: ".ts",
    aceMode: "typescript",
    monacoLang: "typescript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  go: {
    name: "Go",
    extension: ".go",
    aceMode: "golang",
    monacoLang: "go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  rust: {
    name: "Rust",
    extension: ".rs",
    aceMode: "rust",
    monacoLang: "rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  },
  csharp: {
    name: "C#",
    extension: ".cs",
    aceMode: "csharp",
    monacoLang: "csharp",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  ruby: {
    name: "Ruby",
    extension: ".rb",
    aceMode: "ruby",
    monacoLang: "ruby",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  },
  php: {
    name: "PHP",
    extension: ".php",
    aceMode: "php",
    monacoLang: "php",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  swift: {
    name: "Swift",
    extension: ".swift",
    aceMode: "swift",
    monacoLang: "swift",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  kotlin: {
    name: "Kotlin",
    extension: ".kt",
    aceMode: "kotlin",
    monacoLang: "kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  c: {
    name: "C",
    extension: ".c",
    aceMode: "c_cpp",
    monacoLang: "c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
};

export const PROBLEMS = generateAllProblems();
export { LANGUAGE_TEMPLATES, TYPE_MAPPINGS };
