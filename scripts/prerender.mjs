// 把 wallet-data.js 里的品牌卡片写进 index.html，让搜索引擎和链接预览不用跑 JS 也能读到内容。
// 用法：在仓库根目录运行  node scripts/prerender.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { renderCards, renderDeals, activeDeals, isBfTheme, bestDiscount, wallets } = require('../wallet-data.js');
const file = new URL('../index.html', import.meta.url);
const html = readFileSync(file, 'utf8');
const re = /<!--cards:start-->[\s\S]*?<!--cards:end-->/;
if (!re.test(html)) throw new Error('index.html 里找不到 <!--cards:start--> / <!--cards:end--> 标记');
const now = new Date();
const deals = activeDeals(now);
const out = html.replace(re, `<!--cards:start-->${renderCards(now)}<!--cards:end-->`)
  .replace(/<!--deals:start-->[\s\S]*?<!--deals:end-->/, `<!--deals:start-->${renderDeals(now)}<!--deals:end-->`)
  .replace(/<em id="deal-count">\d+<\/em>/, `<em id="deal-count">${new Set(deals.map(d => d.name)).size}</em>`)
  .replace(/<section id="deals" class="deals"( hidden)?>/, `<section id="deals" class="deals"${deals.length ? '' : ' hidden'}>`)
  .replace(/(class="js-best">)[^<]*</g, `$1${bestDiscount(now)}<`)
  .replace(/<body( class="bf")?>/, `<body${isBfTheme(now) ? ' class="bf"' : ''}>`)
  .replace(/(data-filter="all"[^>]*>全部品牌 <span>)\d+(<\/span>)/, `$1${wallets.length}$2`);
writeFileSync(file, out);
console.log(`已写入 ${wallets.length} 张品牌卡片、${deals.length} 条限时优惠到 index.html（黑五主题：${isBfTheme(now) ? '开' : '关'}）`);
