// 把 wallet-data.js 里的品牌卡片写进 index.html，让搜索引擎和链接预览不用跑 JS 也能读到内容。
// 用法：在仓库根目录运行  node scripts/prerender.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { renderCards, wallets } = require('../wallet-data.js');
const file = new URL('../index.html', import.meta.url);
const html = readFileSync(file, 'utf8');
const re = /<!--cards:start-->[\s\S]*?<!--cards:end-->/;
if (!re.test(html)) throw new Error('index.html 里找不到 <!--cards:start--> / <!--cards:end--> 标记');
const out = html.replace(re, `<!--cards:start-->${renderCards()}<!--cards:end-->`)
  .replace(/(data-filter="all"[^>]*>全部品牌 <span>)\d+(<\/span>)/, `$1${wallets.length}$2`);
writeFileSync(file, out);
console.log(`已写入 ${wallets.length} 张品牌卡片到 index.html`);
