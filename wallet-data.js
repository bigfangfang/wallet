/*
 * 品牌数据与卡片渲染。浏览器与 Node（scripts/prerender.mjs）共用。
 * 修改这里的数据后，运行 `node scripts/prerender.mjs` 把卡片写进 index.html。
 *
 * 字段说明
 *   offer     优惠框里显示的文字
 *   code      折扣码（有则显示复制按钮）
 *   note      优惠框下方的说明；不填则用默认说明
 *   verified  最近一次亲自在结账页核对折扣的时间，例如 '2026-11'；填了会显示"已核对"标记
 *   dest      短链接的实际落地网站，例如 'keyst.one'；填了会显示"跳转至 xxx"
 *   promo     限时活动 {offer, code, note, url, autoCodes, details, until}；details 是逐条列出的活动内容；autoCodes 表示链接会自动带入的码；until 之前覆盖上面的 offer/code/note，
 *             过期后自动恢复，不用手动删
 */
(function (root) {
  const wallets = [
    {name:'OneKey',sub:'专属链接 / 开箱与实测',offer:'专属链接购买赠 5–10 美元 BTC 兑换券',note:'通过专属链接购买即可参与；具体金额与领取规则以活动页面为准。',url:'https://onekey.so/r/BIGFANG',promo:{offer:'黑五至新年活动：整机送礼或直降，配件全线 7 折',code:'',details:['Pro 2：送硅胶套或无线充电器（二选一）','Pro 1：6 折 + 1 个月 Prime 会员','Neo：送 SeedCard + 1 个月 Prime 会员','Classic 系列：直降 20U + 黑五期间包邮 + 1 个月 Prime 会员','所有配件：全线 7 折'],note:'活动时间：2026.11.25 – 2027.01.05。活动期间不能与专属链接送 BTC 兑换券叠加，具体以 OneKey 官网结账页为准。',until:'2027-01-05T23:59:59+08:00'}},
    {name:'Ledger',sub:'官方商店 / 开箱与转账教学',offer:'查看当前活动',note:'Ledger 过去有过最高 80 美元比特币的活动，现在是否还有，请在购买页确认。',url:'https://shop.ledger.com/?r=6ce1458cbb9d'},
    {name:'Tangem',sub:'卡片与戒指钱包',offer:'折扣码 9 折',code:'BIGFANG',url:'https://tangem.com/pricing/?promocode=bigfang',promo:{offer:'黑五三重优惠：45% off + 免运费',code:'',autoCodes:'BIGFANG · BF2026 · SHP-W3NZ',note:'Tangem 黑五史上最大折扣。从这里进入，三个优惠码会自动带入：BIGFANG（10% off）+ BF2026（35% off）+ SHP-W3NZ（免运费）。实际价格以结账页为准。',url:'https://tangem.com/en/pricing/?promocode=bigfang&promocode=BF2026&promocode=SHP-W3NZ',until:'2026-11-30T23:59:59+08:00'}},
    {name:'SafePal',sub:'购买入口：S1 / 下方教学：X1',offer:'查看当前优惠',promo:{offer:'黑五全站 85 折',code:'SFP@BIGFANG',note:'黑五限时：11 月 20 日至 12 月 3 日有效，全站商品 15% off，结账时输入折扣码。',until:'2026-12-03T23:59:59+08:00'},url:'https://store.safepal.com/safepal-s1-hardware-wallet.html?ref=bigfang1'},
    {name:'ELLIPAL',sub:'Titan 系列 / Xcard',offer:'折扣码 9 折',code:'BIGFANG',url:'https://www.ellipal.com/?rfsn=6105468.7425bb'},
    {name:'Keystone',sub:'Pro / 3 Pro',offer:'折扣码',code:'BIGFANG',note:'过去有过 9 折和 7 折两种活动，折扣力度与适用型号请在结账页确认。',url:'https://keyst.one/?rfsn=7686504.37a306',extras:[['另一购买入口（曾有 7 折活动）','https://bit.ly/3FjaPXZ'],['大陆购买渠道','https://j.youzan.com/uGdaLd']]},
    {name:'Trezor',sub:'官方入口 / Model One · Model T',offer:'折扣码 95 折',code:'BIGFANG',url:'https://trezor.go2cloud.org/SH3b',extras:[['Model One 购买入口','https://trezor.go2cloud.org/SH3d'],['Model T 购买入口','https://trezor.go2cloud.org/SH3c']]},
    {name:'CoolWallet',sub:'卡片式蓝牙钱包',offer:'折扣码减 5 美元',code:'BIGFANG',url:'https://bit.ly/3lEMgKV'},
    {name:'SecuX',sub:'V20',offer:'折扣码 9 折',code:'BIGFANG',url:'https://bit.ly/46RYNAO'},
    {name:'KeepKey',sub:'官方购买入口',offer:'查看当前优惠',url:'https://lddy.no/11a4b'},
    {name:'Ballet 芭蕾钱包',search:'芭蕾钱包',sub:'官方购买入口',offer:'折扣码 95 折',code:'BIGFANG',url:'https://bitcoin.ballet.com/?ref=bigfang'},
    {name:'imKey',sub:'海外 / 大陆渠道',offer:'查看当前优惠',note:'海外链接为亚马逊，请认准 imKey 官方店铺，不要买第三方卖家的货。',url:'https://amzn.to/3RYPNW1',extras:[['大陆购买渠道','https://j.youzan.com/ApdigA']]}
  ];

  const brandAssets = {
    'OneKey':{brandId:'onekey',logo:'./logo-onekey.png'},
    'Ledger':{brandId:'ledger',logo:'./logo-ledger.svg'},
    'Tangem':{brandId:'tangem',logo:'./logo-tangem.png'},
    'SafePal':{brandId:'safepal',logo:'./logo-safepal.svg'},
    'ELLIPAL':{brandId:'ellipal',logo:'./logo-ellipal.png'},
    'Keystone':{brandId:'keystone',logo:'./logo-keystone.webp',wordmark:'Keystone'},
    'Trezor':{brandId:'trezor',logo:'./logo-trezor.svg'},
    'CoolWallet':{brandId:'coolwallet',logo:'./logo-coolwallet.png'},
    'SecuX':{brandId:'secux',logo:'./logo-secux.png'},
    'KeepKey':{brandId:'keepkey',logo:'./logo-keepkey.png'},
    'Ballet 芭蕾钱包':{brandId:'ballet',logo:'./logo-ballet.svg'},
    'imKey':{brandId:'imkey',logo:'./logo-imkey.svg'}
  };

  // 频道影片，2026-11-11 在 youtube.com/@dafang 核对
  const brandVideos = {
    'OneKey':[
      {id:'nkOuDAWk0A4',title:'OneKey Neo 开箱实测：对比 Pro 2',tag:'开箱实测'},
      {id:'tGYpFf5bSOA',title:'OneKey Pro 2 开箱与比特币转入转出',tag:'开箱实测'},
      {id:'HlImO5xQJoo',title:'Classic 1S Pure 无电池版开箱',tag:'开箱实测'},
      {id:'KwysWuszfVI',title:'OneKey Pro 保姆级开箱教学',tag:'开箱教学'},
      {id:'L7OvbDPY5QI',title:'OneKey Classic 开箱与使用教学',tag:'开箱教学'}
    ],
    'Ledger':[
      {id:'JqJ2q5JU7lM',title:'Ledger Nano Gen5 开箱与 BTC 转入',tag:'开箱实测'},
      {id:'fqh_wYJu3S4',title:'Ledger Flex 开箱与使用教学',tag:'开箱教学'},
      {id:'MLLr_2Z5UiU',title:'Ledger Stax 保姆级开箱',tag:'开箱教学'},
      {id:'Voz2W9CJ3vU',title:'Ledger 新手入门与转账教学',tag:'入门教学'}
    ],
    'Tangem':[
      {id:'sRUU53y2CYI',title:'Tangem Ring 戒指钱包实物分享',tag:'实物分享'},
      {id:'v6O89CJbcCo',title:'Tangem 卡片钱包设置与体验',tag:'实物教学'}
    ],
    'SafePal':[{id:'a7gCCrWhbkI',title:'SafePal X1 冷钱包开箱与设置',tag:'开箱教学'}],
    'ELLIPAL':[
      {id:'gXzOcjSgHno',title:'ELLIPAL Xcard 保姆级开箱分享',tag:'开箱教学'},
      {id:'EKzktbuvAY0',title:'ELLIPAL Titan 2.0 实物与转账教学',tag:'实物教学'},
      {id:'64cG7FgpRAM',title:'ELLIPAL Titan 使用教学',tag:'实物教学'}
    ],
    'Keystone':[
      {id:'YNBZia59okU',title:'Keystone 3 Pro × OKX Web3 实物教学',tag:'实物教学'},
      {id:'JBYa0mfeMHk',title:'Keystone 3 Pro 隔空操作与固件升级',tag:'操作教学'}
    ],
    'Trezor':[{id:'6oV4EjZeZFo',title:'多品牌硬件钱包开箱 · 含 Trezor',tag:'多品牌开箱'}],
    'CoolWallet':[{id:'6oV4EjZeZFo',title:'多品牌硬件钱包开箱 · 含 CoolWallet',tag:'多品牌开箱'}],
    'imKey':[{id:'mNkCXMuiw0Y',title:'imKey 开箱与转账入门教学',tag:'开箱教学'}]
  };

  wallets.forEach(w => { Object.assign(w, brandAssets[w.name]); w.videos = brandVideos[w.name] || []; });

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const outbound = 'target="_blank" rel="sponsored noopener noreferrer"';
  const SHORT_HOSTS = ['bit.ly','lddy.no','amzn.to','trezor.go2cloud.org','j.youzan.com'];
  const SHORT_NAMES = {'amzn.to':'亚马逊','j.youzan.com':'有赞'};

  function host(url) { return new URL(url).hostname.replace(/^www\./, ''); }
  // 按钮下方如实显示链接会去哪里，方便读者判断是不是钓鱼网站
  function linkHint(url, dest) {
    const h = host(url);
    if (dest) return `跳转至 ${esc(dest)}`;
    if (SHORT_HOSTS.includes(h)) return `经 ${esc(SHORT_NAMES[h] ? SHORT_NAMES[h] + ' ' : '')}${esc(h)} 短链接跳转`;
    return `前往 ${esc(h)}`;
  }

  function videoItem(v) {
    return `<button class="brand-video" type="button" data-video-id="${esc(v.id)}" data-video-title="${esc(v.title)}" aria-label="播放：${esc(v.title)}"><span class="video-thumb"><img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy" width="96" height="54"><span class="mini-play" aria-hidden="true">▶</span></span><span class="brand-video-copy"><small>${esc(v.tag)}</small><span>${esc(v.title)}</span></span><span class="video-arrow" aria-hidden="true">↗</span></button>`;
  }

  function brandVideoSection(w) {
    const search = `https://www.youtube.com/@dafang/search?query=${encodeURIComponent(w.search || w.name)}`;
    const list = w.videos.length
      ? w.videos.slice(0, 2).map(videoItem).join('') + (w.videos.length > 2 ? `<details class="more-videos"><summary>更多开箱与教学（${w.videos.length - 2}）</summary>${w.videos.slice(2).map(videoItem).join('')}</details>` : '')
      : `<a class="channel-search" href="${search}" target="_blank" rel="noopener noreferrer">到大方频道查看相关影片 <span>↗</span></a>`;
    return `<section class="brand-videos" aria-label="${esc(w.name)} 开箱与教学"><div class="brand-videos-heading"><span>大方 · 开箱与教学</span><a href="${search}" target="_blank" rel="noopener noreferrer" aria-label="到大方频道查找 ${esc(w.name)} 影片">频道 ↗</a></div>${list}</section>`;
  }

  // 有效期内的限时活动覆盖常规优惠
  function current(w, now) {
    if (w.promo && now <= new Date(w.promo.until)) return Object.assign({}, w, w.promo, { limited: true });
    return w;
  }

  function offerBox(w) {
    const badge = (w.limited ? '<span class="limited">限时</span>' : '') + (w.verified ? `<span class="verified">✓ ${esc(w.verified)} 已核对</span>` : '');
    if (w.code) {
      return `<div class="offer"><span class="offer-label">${esc(w.offer)}${badge}</span><button class="copy" type="button" data-copy="${esc(w.code)}" aria-label="复制 ${esc(w.name)} 折扣码 ${esc(w.code)}">${esc(w.code)} <span aria-hidden="true">⧉</span></button></div>`;
    }
    // 没有折扣码时，整块就是真正可点的链接，避免"看起来像按钮却点不了"
    return `<a class="offer offer--link" href="${esc(w.url)}" ${outbound}><span class="offer-label">${esc(w.offer)}${badge}${w.autoCodes ? `<span class="auto-codes">自动带入 ${esc(w.autoCodes)}</span>` : ''}</span><span class="offer-arrow" aria-hidden="true">↗</span></a>`;
  }

  function defaultNote(w) {
    return w.code ? '结账时输入折扣码；折扣力度、适用型号与地区以结账页为准。' : '优惠、适用型号与地区以下单页面为准。';
  }

  function logo(w) {
    return `<span class="brand-logo brand-logo--${w.brandId}"><img src="${w.logo}" alt="${esc(w.name)} Logo" width="124" height="44">${w.wordmark ? `<b>${esc(w.wordmark)}</b>` : ''}</span>`;
  }

  function card(w0, i, now) {
    const w = current(w0, now);
    const extras = w.extras ? `<details class="extra-links"><summary>更多购买入口</summary>${w.extras.map(([label, url]) => `<a href="${esc(url)}" ${outbound}>${esc(label)} ↗<small>${linkHint(url)}</small></a>`).join('')}</details>` : '';
    return `<article class="wallet-card" data-name="${esc(w.name.toLowerCase())}" data-code="${!!(w.code || w.autoCodes)}" data-video="${w.videos.length > 0}"><div class="card-top">${logo(w)}<span class="card-index">WALLET / ${String(i + 1).padStart(2, '0')}</span></div><h3>${esc(w.name)}</h3><p class="card-subtitle">${esc(w.sub)}</p>${offerBox(w)}${w.details ? `<ul class="promo-details">${w.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}<p class="offer-note">${esc(w.note || defaultNote(w))}</p><div class="card-actions"><a class="buy" href="${esc(w.url)}" ${outbound}>查看购买入口 <span>↗</span></a></div><p class="link-hint">${linkHint(w.url, w.dest)}</p>${extras}${brandVideoSection(w)}</article>`;
  }

  function renderCards(now = new Date()) { return wallets.map((w, i) => card(w, i, now)).join(''); }

  const api = { wallets, renderCards };
  root.BigFangWallet = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
