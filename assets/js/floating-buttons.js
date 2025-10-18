/**
 * 浮动按钮功能
 * 参考: https://github.com/engrasel/Scroll-To-Top-Button
 */

(function() {
  'use strict';
  
  // 检查是否为首页
  function isHomePage() {
    const path = window.location.pathname;
    return path === '/' || path === '/index.html';
  }
  
  // 创建浮动按钮容器
  function createFloatingButtons() {
    const container = document.createElement('div');
    container.className = 'floating-buttons';
    container.id = 'floatingButtons';
    
    // 回到顶部按钮
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.className = 'floating-btn';
    scrollToTopBtn.title = '回到顶部';
    scrollToTopBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M12 5L5 12M12 5L19 12"/>
      </svg>
    `;
    
    container.appendChild(scrollToTopBtn);
    
    // 如果不是首页,添加返回首页按钮
    if (!isHomePage()) {
      const backToHomeBtn = document.createElement('a');
      backToHomeBtn.id = 'backToHomeBtn';
      backToHomeBtn.className = 'floating-btn';
      backToHomeBtn.href = '/';
      backToHomeBtn.title = '返回首页';
      backToHomeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      `;
      
      container.appendChild(backToHomeBtn);
    }
    
    document.body.appendChild(container);
    
    return {
      scrollToTopBtn: scrollToTopBtn,
      container: container
    };
  }
  
  // 初始化
  function init() {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    const buttons = createFloatingButtons();
    const scrollToTopBtn = buttons.scrollToTopBtn;
    
    // 回到顶部功能
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // 监听滚动事件
    let ticking = false;
    
    function updateButtonVisibility() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // 滚动超过一屏时显示回到顶部按钮
      if (scrollTop > viewportHeight) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
      
      ticking = false;
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateButtonVisibility);
        ticking = true;
      }
    });
    
    // 初始检查
    updateButtonVisibility();
  }
  
  // 启动
  init();
})();

