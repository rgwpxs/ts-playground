// 性能优化的柯里化实现（缓存柯里化函数）
function memoizeCurry(fn) {
  const arity = fn.length;
  const cache = new Map(); // 缓存部分应用的函数
  
  function generateKey(args) {
    return JSON.stringify(args);
  }
  
  return function curried(...args) {
    const key = generateKey(args);
    
    // 如果参数足够，直接执行
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    
    // 检查缓存
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    // 创建新函数并缓存
    const newCurried = function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
    
    cache.set(key, newCurried);
    return newCurried;
  };
}

// 使用示例（适合频繁部分应用的场景）
const expensiveOperation = memoizeCurry(function(a, b, c, d) {
  console.log('执行复杂计算...');
  // 模拟复杂计算
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(a + b + c + d);
  }
  return result;
});

// 第一次调用会计算
const withFirstArg = expensiveOperation(1);
const withSecondArg = withFirstArg(2);

// 第二次相同的部分应用会从缓存获取
const withFirstArgAgain = expensiveOperation(1); // 从缓存获取
console.log(withFirstArg === withFirstArgAgain); // true（相同函数引用）