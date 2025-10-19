/**
 * 浮动按钮功能 - 适配单页应用
 */

(function() {
  'use strict';
  
  // 获取滚动容器
  function getScrollContainer() {
    // 在单页应用中，主内容区域是 #blogMain
    const blogMain = document.getElementById('blogMain');
    return blogMain || window;
  }
  
  // 检查是否在文章详情页或其他页面（非文章列表）
  function isInPostView() {
    const postView = document.getElementById('postView');
    return postView && postView.style.display !== 'none';
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
    
    // 返回首页按钮（在文章详情页显示）
    const backToHomeBtn = document.createElement('button');
    backToHomeBtn.id = 'backToHomeBtn';
    backToHomeBtn.className = 'floating-btn home-btn';
    backToHomeBtn.title = '返回首页';
    backToHomeBtn.style.display = 'none'; // 默认隐藏
    backToHomeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    `;
    
    container.appendChild(backToHomeBtn);
    
    document.body.appendChild(container);
    
    return {
      scrollToTopBtn: scrollToTopBtn,
      backToHomeBtn: backToHomeBtn,
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
    const backToHomeBtn = buttons.backToHomeBtn;
    
    // 回到顶部功能
    scrollToTopBtn.addEventListener('click', function() {
      const scrollContainer = getScrollContainer();
      if (scrollContainer === window) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
    
    // 返回首页功能
    backToHomeBtn.addEventListener('click', function() {
      // 触发返回首页的逻辑
      if (typeof showPostsList === 'function') {
        showPostsList();
      } else {
        window.location.href = '/';
      }
    });
    
    // 监听滚动事件
    let ticking = false;
    
    function updateButtonVisibility() {
      const scrollContainer = getScrollContainer();
      const scrollTop = scrollContainer === window 
        ? (window.pageYOffset || document.documentElement.scrollTop)
        : scrollContainer.scrollTop;
      const viewportHeight = window.innerHeight;
      
      // 滚动超过一屏时显示回到顶部按钮
      if (scrollTop > viewportHeight) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
      
      // 根据是否在文章详情页显示/隐藏返回首页按钮
      if (isInPostView()) {
        backToHomeBtn.style.display = 'flex';
      } else {
        backToHomeBtn.style.display = 'none';
      }
      
      ticking = false;
    }
    
    // 监听主内容区域的滚动
    const scrollContainer = getScrollContainer();
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(updateButtonVisibility);
          ticking = true;
        }
      });
    }
    
    // 监听 window 滚动（备用）
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateButtonVisibility);
        ticking = true;
      }
    });
    
    // 使用 MutationObserver 监听 DOM 变化，以便在视图切换时更新按钮状态
    const observer = new MutationObserver(function() {
      updateButtonVisibility();
    });
    
    const postView = document.getElementById('postView');
    if (postView) {
      observer.observe(postView, {
        attributes: true,
        attributeFilter: ['style']
      });
    }
    
    // 初始检查
    updateButtonVisibility();
  }
  
  // 启动
  init();
})();

