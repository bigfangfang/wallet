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
// 结构化数据（JSON-LD）：网站、作者、品牌列表、常见问题，帮助搜索引擎理解页面
const SITE = 'https://wallet.bigfang.vip/';
const strip = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const faq = [...out.matchAll(/<details class="faq-item"><summary>([\s\S]*?)<\/summary><div class="faq-body"><p>([\s\S]*?)<\/p>/g)]
  .map(m => ({ '@type': 'Question', name: strip(m[1]), acceptedAnswer: { '@type': 'Answer', text: strip(m[2]) } }));
const author = { '@type': 'Person', '@id': SITE + '#bigfang', name: '大方 BigFang', url: 'https://bigfang.vip/',
  sameAs: ['https://www.youtube.com/@dafang', 'https://x.com/dafangbigfang', 'https://bigfang.vip/'] };
const graph = [
  { '@type': 'WebSite', '@id': SITE + '#website', url: SITE, name: '大方讲冷钱包', alternateName: ['BigFang on Cold Wallets', '大方 BigFang 冷钱包指南'], inLanguage: 'zh-CN', publisher: { '@id': SITE + '#bigfang' } },
  author,
  { '@type': 'WebPage', '@id': SITE + '#webpage', url: SITE, inLanguage: 'zh-CN', isPartOf: { '@id': SITE + '#website' },
    name: (out.match(/<title>([^<]*)<\/title>/) || [])[1], description: (out.match(/<meta name="description" content="([^"]*)"/) || [])[1],
    about: ['冷钱包', '为什么要用冷钱包', '私钥自托管', '冷钱包教程', '助记词', '硬件钱包', '冷钱包常见问题', '冷钱包折扣码'], author: { '@id': SITE + '#bigfang' },
    dateModified: now.toISOString().slice(0, 10), primaryImageOfPage: SITE + 'og-image.png' },
  { '@type': 'ItemList', '@id': SITE + '#wallets', name: '冷钱包品牌、折扣码与优惠码', numberOfItems: wallets.length,
    itemListElement: wallets.map((w, i) => ({ '@type': 'ListItem', position: i + 1, name: w.name + ' 冷钱包', url: SITE + '#wallet-' + w.brandId })) },
  { '@type': 'FAQPage', '@id': SITE + '#faq', mainEntity: faq }
];
const jsonld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
const outWithLd = out.replace(/<!--jsonld:start-->[\s\S]*?<!--jsonld:end-->/, `<!--jsonld:start-->${jsonld}<!--jsonld:end-->`);
writeFileSync(file, outWithLd);

// 网站地图：每次构建更新 lastmod
writeFileSync(new URL('../sitemap.xml', import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE}</loc>\n    <lastmod>${now.toISOString().slice(0, 10)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`);
console.log(`结构化数据：${faq.length} 条常见问题、${wallets.length} 个品牌；sitemap.xml 已更新`);

console.log(`已写入 ${wallets.length} 张品牌卡片、${deals.length} 条限时优惠到 index.html（黑五主题：${isBfTheme(now) ? '开' : '关'}）`);
