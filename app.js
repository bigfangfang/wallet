const wallets = [
{name:'OneKey',sub:'专属链接 / Classic 实物教学',mark:'O',offer:'赠送 5–10 美元 BTC 兑换券',note:'通过专属链接购买参与活动；具体赠送金额及领取规则以活动页面为准。',url:'https://onekey.so/r/BIGFANG',video:'L7OvbDPY5QI'},
{name:'Ledger',sub:'品牌入口 / 入门与转账教学',mark:'L',offer:'查看品牌活动',note:'原站曾记载最高 80 美元比特币活动，当前有效性待确认。',url:'https://shop.ledger.com/?r=6ce1458cbb9d',video:'Voz2W9CJ3vU'},
{name:'Tangem',sub:'品牌入口 / 实物分享',mark:'T',offer:'原站记录：九折',code:'BIGFANG',url:'https://tangem.com/pricing/?promocode=bigfang',video:'v6O89CJbcCo'},
{name:'SafePal',sub:'原站收录：SafePal S1',mark:'S',offer:'查看当前优惠',url:'https://store.safepal.com/safepal-s1-hardware-wallet.html?ref=bigfang1'},
{name:'ELLIPAL',sub:'原站收录：Titan 系列',mark:'E',offer:'原站记录：九折',code:'BIGFANG',url:'https://www.ellipal.com/?rfsn=6105468.7425bb',video:'64cG7FgpRAM',extras:[['Titan 2.0 实物教学','https://youtu.be/EKzktbuvAY0']]},
{name:'Keystone',sub:'原站收录：Pro / 3 Pro',mark:'K',offer:'原站优惠记录待核实',code:'BIGFANG',note:'原站同时记载九折与七折，当前优惠及适用型号请在结账时确认。',url:'https://keyst.one/?rfsn=7686504.37a306',video:'YNBZia59okU',extras:[['原站另一购买入口（历史七折记录）','https://bit.ly/3FjaPXZ'],['原站大陆渠道','https://j.youzan.com/uGdaLd'],['3 Pro 固件教学','https://youtu.be/JBYa0mfeMHk']]},
{name:'Trezor',sub:'品牌入口 / 原站收录的型号链接',mark:'T',offer:'原站记录：九五折',code:'BIGFANG',url:'https://trezor.go2cloud.org/SH3b',extras:[['Model One 原站入口','https://trezor.go2cloud.org/SH3d'],['Model T 原站入口','https://trezor.go2cloud.org/SH3c']]},
{name:'CoolWallet',sub:'品牌购买入口',mark:'C',offer:'原站记录：减 5 美元',code:'BIGFANG',url:'https://bit.ly/3lEMgKV'},
{name:'SecuX',sub:'原站收录：V20',mark:'S',offer:'原站记录：九折',code:'BIGFANG',url:'https://bit.ly/46RYNAO'},
{name:'KeepKey',sub:'品牌购买入口',mark:'K',offer:'查看当前优惠',url:'https://lddy.no/11a4b'},
{name:'Ballet 芭蕾钱包',sub:'品牌购买入口',mark:'B',offer:'原站记录：九五折',code:'BIGFANG',url:'https://bitcoin.ballet.com/?ref=bigfang'},
{name:'imKey',sub:'原站收录：海外 / 大陆渠道',mark:'i',offer:'查看当前优惠',url:'https://amzn.to/3RYPNW1',video:'mNkCXMuiw0Y',extras:[['原站大陆购买渠道','https://j.youzan.com/ApdigA']]}
];
// Product and offer records come from https://bigfang.vip/coldwallet/ (read 2026-11-11).
// Preserve original referral parameters. Offer validity has not been checkout-verified.
const grid=document.getElementById('wallet-grid');
document.querySelector('.filter span').textContent=wallets.length;
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const outbound='target="_blank" rel="sponsored noopener noreferrer"';
grid.innerHTML=wallets.map((w,i)=>`<article class="wallet-card" data-name="${escapeHtml(w.name.toLowerCase())}" data-code="${!!w.code}" data-video="${!!w.video}"><div class="card-top"><span class="monogram" aria-hidden="true">${w.mark}</span><span class="card-index">WALLET / ${String(i+1).padStart(2,'0')}</span></div><h3>${w.name}</h3><p class="card-subtitle">${w.sub}</p><div class="offer"><span class="offer-label">${w.offer}</span>${w.code?`<button class="copy" data-copy="${w.code}" aria-label="复制 ${escapeHtml(w.name)} 折扣码 ${w.code}">${w.code} ⧉</button>`:'<span class="offer-label">↗</span>'}</div><p class="offer-note">${w.note||'优惠、适用型号与地区以下单页面为准。'}</p><div class="card-actions"><a class="buy" href="${w.url}" ${outbound}>查看购买入口 <span>↗</span></a>${w.video?`<a class="watch" href="https://www.youtube.com/watch?v=${w.video}" target="_blank" rel="noopener noreferrer">实物教学 ↗</a>`:''}</div>${w.extras?`<details class="extra-links"><summary>更多入口与教学</summary>${w.extras.map(([label,url])=>`<a href="${url}" ${outbound}>${label} ↗</a>`).join('')}</details>`:''}</article>`).join('');
let activeFilter='all';
function filterWallets(){const query=document.getElementById('search').value.trim().toLowerCase();let count=0;grid.querySelectorAll('.wallet-card').forEach(card=>{const match=card.dataset.name.includes(query)&&(activeFilter==='all'||card.dataset[activeFilter]==='true');card.hidden=!match;if(match)count++;});document.getElementById('empty').hidden=count!==0;document.getElementById('result-count').textContent=`显示 ${count} 个品牌`;}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});filterWallets();}));
document.getElementById('search').addEventListener('input',filterWallets);
let toastTimer;function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
grid.addEventListener('click',async event=>{const button=event.target.closest('[data-copy]');if(!button)return;try{await navigator.clipboard.writeText(button.dataset.copy);toast('已复制折扣码 '+button.dataset.copy);}catch{toast('请手动复制折扣码：'+button.dataset.copy);}});
filterWallets();
