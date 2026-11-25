// /blackfriday 专页：只显示有进行中限时活动的品牌。数据与卡片模板共用 wallet-data.js。
(function () {
  const { renderCards, renderDeals, activeDeals, bestDiscount } = window.BigFangWallet;
  const base = window.BIGFANG_ASSET_BASE || './';
  const now = new Date();
  const grid = document.getElementById('wallet-grid');
  const deals = activeDeals(now);

  grid.innerHTML = renderCards(now, { onlyLimited: true, base });
  document.getElementById('deal-grid').innerHTML = renderDeals(now);
  document.getElementById('deal-count').textContent = new Set(deals.map(d => d.name)).size;
  document.querySelectorAll('.js-best').forEach(el => { el.textContent = bestDiscount(now) || '—'; });
  // 活动全部结束：收起横幅，显示结束提示
  document.getElementById('deals').hidden = deals.length === 0;
  document.getElementById('bf-ended').hidden = deals.length !== 0;
  document.querySelector('#bf-wallets .section-heading').hidden = deals.length === 0;

  // 视频弹窗
  const player = document.getElementById('video-dialog');
  let lastVideoButton;
  const closePlayer = () => player.close();
  player.addEventListener('close', () => { document.getElementById('video-player').replaceChildren(); lastVideoButton?.focus(); });
  player.querySelector('.dialog-close').addEventListener('click', closePlayer);
  player.addEventListener('click', e => { if (e.target === player) closePlayer(); });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-video-id]');
    if (!button || typeof player.showModal !== 'function') return;
    event.preventDefault();
    lastVideoButton = button;
    const id = button.dataset.videoId;
    document.getElementById('video-dialog-title').textContent = button.dataset.videoTitle;
    document.getElementById('video-youtube-link').href = `https://www.youtube.com/watch?v=${id}`;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = button.dataset.videoTitle;
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    document.getElementById('video-player').replaceChildren(frame);
    player.showModal();
  });

  // 复制折扣码
  let toastTimer;
  function toast(message) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }
  grid.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    try { await navigator.clipboard.writeText(button.dataset.copy); toast('已复制折扣码 ' + button.dataset.copy); }
    catch { toast('请手动复制折扣码：' + button.dataset.copy); }
  });
})();
