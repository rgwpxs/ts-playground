// 121. 买卖股票的最佳时机
function maxProfit(prices: number[]): number {
    if (!prices.length) return 0;
    let cbd = 0, cbp = prices[cbd], csd = prices.length - 1, csp = prices[csd]; // current buy date, current buy price, current sell date, current sell price;
    let max = csp - cbp > 0 ? csp - cbp : 0; // current max profit;
    let buyDate, buyPrice; // real buy date, real buy price
    let sellDate, sellPrice; // real sell date, real sell price
    // console.log(prices);
    for (let i = 1; i < prices.length; i++) {
        // console.log(`--phase--i: ${i} cbd: ${cbd} cbp: ${cbp} csd: ${csd} csp: ${csp} max: ${max}`);
        if (prices[i] > cbp && prices[i] - cbp > max) {
            max = prices[i] - cbp;
            buyDate = cbd; buyPrice = cbp; sellDate = i; sellPrice = prices[i];
            // console.log('--max branch 1: next price is a new high--', `max: ${max}, buyDate: ${buyDate} sellDate: ${sellDate} buyPrice: ${buyPrice} sellPrice: ${sellPrice}`);
        } else if (prices[i] < cbp && i < csd) {
            // console.log('--update buy--', `i ${i} < csd ${csd}, cbd: from ${cbd} to ${i}; cbp: from ${cbp} to ${prices[i]}`);
            cbd = i;
            cbp = prices[i];
        }
        const ei = prices.length - 1 - i;
        if (prices[ei] < csp && csp - prices[ei] > max) {
            max = csp - prices[ei];
            buyDate = ei; buyPrice = prices[ei]; sellDate = csd; sellPrice = csp;
            // console.log('--max branch 2: previous price is a new low--', `max: ${max} buyDate: ${buyDate} sellDate: ${sellDate} buyPrice: ${buyPrice} sellPrice: ${sellPrice}`);
        } else if (prices[ei] > csp && ei > cbd) {
            // console.log('--update sell--', `ei ${ei} > cbd ${cbd}, csd: from ${csd} to ${ei}; csp: from ${csp} to ${prices[ei]}`);
            csd = ei;
            csp = prices[ei];
        }
        if (csd <= cbd) {
            break;
        } else if (csp - cbp > max){
            max = csp - cbp;
            buyDate = cbd; buyPrice = cbp;sellDate = csd;sellPrice = csp;
            // console.log('--max branch 3--', `max: ${max} buyDate: ${buyDate} sellDate: ${sellDate} buyPrice: ${buyPrice} sellPrice: ${sellPrice}`);
        }
    }
    // console.log('--max finally--', `max: ${max} buyDate: ${buyDate} sellDate: ${sellDate} buyPrice: ${buyPrice} sellPrice: ${sellPrice}`);
    return max > 0 ? max : 0;
};
