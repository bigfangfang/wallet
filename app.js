// 页面交互：筛选、搜索、复制折扣码、视频弹窗。数据与卡片模板在 wallet-data.js。
(function () {
  const { wallets, renderCards } = window.BigFangWallet;
  const grid = document.getElementById('wallet-grid');
  // index.html 里有预渲染的卡片（给搜索引擎和链接预览看）；
  // 浏览器里按当天日期重新渲染一次，限时活动过期就自动恢复常规优惠
  grid.innerHTML = renderCards(new Date());
  document.querySelector('.filter span').textContent = wallets.length;

  // 视频弹窗：品牌卡片里的影片和"新手先看"都用这里播放
  const player = document.getElementById('video-dialog');
  let lastVideoButton;
  const closePlayer = () => player.close();
  player.addEventListener('close', () => { document.getElementById('video-player').replaceChildren(); lastVideoButton?.focus(); });
  player.querySelector('.dialog-close').addEventListener('click', closePlayer);
  player.addEventListener('click', e => { if (e.target === player) closePlayer(); });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-video-id]');
    if (!button || typeof player.showModal !== 'function') return; // 不支持弹窗时走原链接
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

  // 筛选与搜索
  let activeFilter = 'all';
  function filterWallets() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    let count = 0;
    grid.querySelectorAll('.wallet-card').forEach(card => {
      const match = card.dataset.name.includes(query) && (activeFilter === 'all' || card.dataset[activeFilter] === 'true');
      card.hidden = !match;
      if (match) count++;
    });
    document.getElementById('empty').hidden = count !== 0;
    document.getElementById('result-count').textContent = `显示 ${count} 个品牌`;
  }
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    filterWallets();
  }));
  document.getElementById('search').addEventListener('input', filterWallets);

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

  filterWallets();
})();
