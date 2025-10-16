// 122. 买卖股票的最佳时机2
function maxProfit(prices: number[]): number {
    let max = 0, bp = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > bp) {
            max += prices[i] - bp;
            bp = prices[i];
        } else {
            bp = prices[i];
        }
    }
    return max;
};