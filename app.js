const wallets = [
{name:'OneKey',sub:'专属链接 / 开箱与实测',mark:'O',offer:'赠送 5–10 美元 BTC 兑换券',note:'通过专属链接购买参与活动；具体赠送金额及领取规则以活动页面为准。',url:'https://onekey.so/r/BIGFANG',video:'L7OvbDPY5QI'},
{name:'Ledger',sub:'品牌入口 / 开箱与转账教学',mark:'L',offer:'查看品牌活动',note:'原站曾记载最高 80 美元比特币活动，当前有效性待确认。',url:'https://shop.ledger.com/?r=6ce1458cbb9d',video:'Voz2W9CJ3vU'},
{name:'Tangem',sub:'品牌入口 / 实物分享',mark:'T',offer:'原站记录：九折',code:'BIGFANG',url:'https://tangem.com/pricing/?promocode=bigfang',video:'v6O89CJbcCo'},
{name:'SafePal',sub:'购买入口：S1 / 下方教学：X1',mark:'S',offer:'查看当前优惠',url:'https://store.safepal.com/safepal-s1-hardware-wallet.html?ref=bigfang1'},
{name:'ELLIPAL',sub:'Titan 系列 / Xcard 实物教学',mark:'E',offer:'原站记录：九折',code:'BIGFANG',url:'https://www.ellipal.com/?rfsn=6105468.7425bb',video:'64cG7FgpRAM',extras:[['Titan 2.0 实物教学','https://youtu.be/EKzktbuvAY0']]},
{name:'Keystone',sub:'原站收录：Pro / 3 Pro',mark:'K',offer:'原站优惠记录待核实',code:'BIGFANG',note:'原站同时记载九折与七折，当前优惠及适用型号请在结账时确认。',url:'https://keyst.one/?rfsn=7686504.37a306',video:'YNBZia59okU',extras:[['原站另一购买入口（历史七折记录）','https://bit.ly/3FjaPXZ'],['原站大陆渠道','https://j.youzan.com/uGdaLd'],['3 Pro 固件教学','https://youtu.be/JBYa0mfeMHk']]},
{name:'Trezor',sub:'品牌入口 / 原站收录的型号链接',mark:'T',offer:'原站记录：九五折',code:'BIGFANG',url:'https://trezor.go2cloud.org/SH3b',extras:[['Model One 原站入口','https://trezor.go2cloud.org/SH3d'],['Model T 原站入口','https://trezor.go2cloud.org/SH3c']]},
{name:'CoolWallet',sub:'品牌购买入口',mark:'C',offer:'原站记录：减 5 美元',code:'BIGFANG',url:'https://bit.ly/3lEMgKV'},
{name:'SecuX',sub:'原站收录：V20',mark:'S',offer:'原站记录：九折',code:'BIGFANG',url:'https://bit.ly/46RYNAO'},
{name:'KeepKey',sub:'品牌购买入口',mark:'K',offer:'查看当前优惠',url:'https://lddy.no/11a4b'},
{name:'Ballet 芭蕾钱包',sub:'品牌购买入口',mark:'B',offer:'原站记录：九五折',code:'BIGFANG',url:'https://bitcoin.ballet.com/?ref=bigfang'},
{name:'imKey',sub:'原站收录：海外 / 大陆渠道',mark:'i',offer:'查看当前优惠',url:'https://amzn.to/3RYPNW1',video:'mNkCXMuiw0Y',extras:[['原站大陆购买渠道','https://j.youzan.com/ApdigA']]}
];
// Purchase links originate from bigfang.vip/coldwallet/. OneKey offer updated by owner.
// Videos verified in youtube.com/@dafang channel and its wallet playlist, 2026-11-11.
const brandAssets = {
  "OneKey": {
    "brandId": "onekey",
    "logo": "./logo-onekey.png"
  },
  "Ledger": {
    "brandId": "ledger",
    "logo": "./logo-ledger.svg"
  },
  "Tangem": {
    "brandId": "tangem",
    "logo": "./logo-tangem.png"
  },
  "SafePal": {
    "brandId": "safepal",
    "logo": "./logo-safepal.svg"
  },
  "ELLIPAL": {
    "brandId": "ellipal",
    "logo": "./logo-ellipal.png"
  },
  "Keystone": {
    "brandId": "keystone",
    "logo": "./logo-keystone.webp"
  },
  "Trezor": {
    "brandId": "trezor",
    "logo": "./logo-trezor.svg"
  },
  "CoolWallet": {
    "brandId": "coolwallet",
    "logo": "./logo-coolwallet.png"
  },
  "SecuX": {
    "brandId": "secux",
    "logo": "./logo-secux.png"
  },
  "KeepKey": {
    "brandId": "keepkey",
    "logo": "./logo-keepkey.png"
  },
  "Ballet 芭蕾钱包": {
    "brandId": "ballet",
    "logo": "./logo-ballet.svg"
  },
  "imKey": {
    "brandId": "imkey",
    "logo": "./logo-imkey.svg"
  }
};
const brandVideos = {
  "OneKey": [
    {
      "id": "nkOuDAWk0A4",
      "title": "OneKey Neo 开箱实测：对比 Pro 2",
      "tag": "开箱实测"
    },
    {
      "id": "tGYpFf5bSOA",
      "title": "OneKey Pro 2 开箱与比特币转入转出",
      "tag": "开箱实测"
    },
    {
      "id": "HlImO5xQJoo",
      "title": "Classic 1S Pure 无电池版开箱",
      "tag": "开箱实测"
    },
    {
      "id": "KwysWuszfVI",
      "title": "OneKey Pro 保姆级开箱教学",
      "tag": "开箱教学"
    },
    {
      "id": "L7OvbDPY5QI",
      "title": "OneKey Classic 开箱与使用教学",
      "tag": "开箱教学"
    }
  ],
  "Ledger": [
    {
      "id": "JqJ2q5JU7lM",
      "title": "Ledger Nano Gen5 开箱与 BTC 转入",
      "tag": "开箱实测"
    },
    {
      "id": "fqh_wYJu3S4",
      "title": "Ledger Flex 开箱与使用教学",
      "tag": "开箱教学"
    },
    {
      "id": "MLLr_2Z5UiU",
      "title": "Ledger Stax 保姆级开箱",
      "tag": "开箱教学"
    },
    {
      "id": "Voz2W9CJ3vU",
      "title": "Ledger 新手入门与转账教学",
      "tag": "入门教学"
    }
  ],
  "Tangem": [
    {
      "id": "sRUU53y2CYI",
      "title": "Tangem Ring 戒指钱包实物分享",
      "tag": "实物分享"
    },
    {
      "id": "v6O89CJbcCo",
      "title": "Tangem 卡片钱包设置与体验",
      "tag": "实物教学"
    }
  ],
  "SafePal": [
    {
      "id": "a7gCCrWhbkI",
      "title": "SafePal X1 冷钱包开箱与设置",
      "tag": "开箱教学"
    }
  ],
  "ELLIPAL": [
    {
      "id": "gXzOcjSgHno",
      "title": "ELLIPAL Xcard 保姆级开箱分享",
      "tag": "开箱教学"
    },
    {
      "id": "EKzktbuvAY0",
      "title": "ELLIPAL Titan 2.0 实物与转账教学",
      "tag": "实物教学"
    },
    {
      "id": "64cG7FgpRAM",
      "title": "ELLIPAL Titan 使用教学",
      "tag": "实物教学"
    }
  ],
  "Keystone": [
    {
      "id": "YNBZia59okU",
      "title": "Keystone 3 Pro × OKX Web3 实物教学",
      "tag": "实物教学"
    },
    {
      "id": "JBYa0mfeMHk",
      "title": "Keystone 3 Pro 隔空操作与固件升级",
      "tag": "操作教学"
    }
  ],
  "Trezor": [
    {
      "id": "6oV4EjZeZFo",
      "title": "多品牌硬件钱包开箱 · 含 Trezor",
      "tag": "多品牌开箱"
    }
  ],
  "CoolWallet": [
    {
      "id": "6oV4EjZeZFo",
      "title": "多品牌硬件钱包开箱 · 含 CoolWallet",
      "tag": "多品牌开箱"
    }
  ],
  "imKey": [
    {
      "id": "mNkCXMuiw0Y",
      "title": "imKey 开箱与转账入门教学",
      "tag": "开箱教学"
    }
  ]
};
wallets.forEach(w=>{Object.assign(w,brandAssets[w.name]);w.videos=brandVideos[w.name]||[];});
const grid=document.getElementById('wallet-grid');
document.querySelector('.filter span').textContent=wallets.length;
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const outbound='target="_blank" rel="sponsored noopener noreferrer"';
function videoItem(v){return `<button class="brand-video" type="button" data-video-id="${v.id}" data-video-title="${escapeHtml(v.title)}" aria-label="播放：${escapeHtml(v.title)}"><span class="video-thumb"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" width="96" height="54"><span class="mini-play" aria-hidden="true">▶</span></span><span class="brand-video-copy"><small>${v.tag}</small><span>${escapeHtml(v.title)}</span></span><span class="video-arrow" aria-hidden="true">↗</span></button>`;}
function brandVideoSection(w){const search=`https://www.youtube.com/@dafang/search?query=${encodeURIComponent(w.name==='Ballet 芭蕾钱包'?'芭蕾钱包':w.name)}`;return `<section class="brand-videos" aria-label="${escapeHtml(w.name)} 开箱与教学"><div class="brand-videos-heading"><span>大方 · 开箱与教学</span><a href="${search}" target="_blank" rel="noopener noreferrer" aria-label="到大方频道查找 ${escapeHtml(w.name)} 影片">频道 ↗</a></div>${w.videos.length?w.videos.slice(0,2).map(videoItem).join('')+(w.videos.length>2?`<details class="more-videos"><summary>更多开箱与教学（${w.videos.length-2}）</summary>${w.videos.slice(2).map(videoItem).join('')}</details>`:''):`<a class="channel-search" href="${search}" target="_blank" rel="noopener noreferrer">到大方频道查看相关影片 <span>↗</span></a>`}</section>`;}
grid.innerHTML=wallets.map((w,i)=>`<article class="wallet-card" data-name="${escapeHtml(w.name.toLowerCase())}" data-code="${!!w.code}" data-video="${w.videos.length>0}"><div class="card-top"><span class="brand-logo brand-logo--${w.brandId}"><img src="${w.logo}" alt="${escapeHtml(w.name)} Logo" width="124" height="44"></span><span class="card-index">WALLET / ${String(i+1).padStart(2,'0')}</span></div><h3>${w.name}</h3><p class="card-subtitle">${w.sub}</p><div class="offer"><span class="offer-label">${w.offer}</span>${w.code?`<button class="copy" data-copy="${w.code}" aria-label="复制 ${escapeHtml(w.name)} 折扣码 ${w.code}">${w.code} ⧉</button>`:'<span class="offer-label">↗</span>'}</div><p class="offer-note">${w.note||'优惠、适用型号与地区以下单页面为准。'}</p><div class="card-actions"><a class="buy" href="${w.url}" ${outbound}>查看购买入口 <span>↗</span></a></div>${w.extras?`<details class="extra-links"><summary>更多入口与教学</summary>${w.extras.map(([label,url])=>`<a href="${url}" ${outbound}>${label} ↗</a>`).join('')}</details>`:''}${brandVideoSection(w)}</article>`).join('');
const player=document.getElementById('video-dialog');
let lastVideoButton;
function closePlayer(){player.close();}
player.addEventListener('close',()=>{document.getElementById('video-player').replaceChildren();lastVideoButton?.focus();});
player.querySelector('.dialog-close').addEventListener('click',closePlayer);
player.addEventListener('click',e=>{if(e.target===player)closePlayer();});
grid.addEventListener('click',event=>{const button=event.target.closest('[data-video-id]');if(!button)return;lastVideoButton=button;const id=button.dataset.videoId;document.getElementById('video-dialog-title').textContent=button.dataset.videoTitle;document.getElementById('video-youtube-link').href=`https://www.youtube.com/watch?v=${id}`;const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;frame.title=button.dataset.videoTitle;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;document.getElementById('video-player').replaceChildren(frame);player.showModal();});
let activeFilter='all';
function filterWallets(){const query=document.getElementById('search').value.trim().toLowerCase();let count=0;grid.querySelectorAll('.wallet-card').forEach(card=>{const match=card.dataset.name.includes(query)&&(activeFilter==='all'||card.dataset[activeFilter]==='true');card.hidden=!match;if(match)count++;});document.getElementById('empty').hidden=count!==0;document.getElementById('result-count').textContent=`显示 ${count} 个品牌`;}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});filterWallets();}));
document.getElementById('search').addEventListener('input',filterWallets);
let toastTimer;function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
grid.addEventListener('click',async event=>{const button=event.target.closest('[data-copy]');if(!button)return;try{await navigator.clipboard.writeText(button.dataset.copy);toast('已复制折扣码 '+button.dataset.copy);}catch{toast('请手动复制折扣码：'+button.dataset.copy);}});
filterWallets();
