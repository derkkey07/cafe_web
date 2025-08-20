// デザインデモサイト - ボタン・リンク機能無効化
document.addEventListener('DOMContentLoaded', function() {
    // デザインデモ注意書きの表示
    console.log('🎨 これはデザインデモサイトです。ボタンやリンクは機能しません。');
    
    // ハンバーガーメニューの制御（デモ用）
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    hamburgerMenu.addEventListener('click', function() {
        // デモ用：メニューの開閉アニメーションのみ
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // デモ用：スクロール制御は無効化
        // body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // モバイルナビゲーションリンクをクリックした時の処理（デモ用）
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // デモ用：リンクを無効化
            
            // デモ用：メニューを閉じる
            hamburgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
            
            // デモ用：モーダルでデモであることを通知
            showDemoModal();
        });
    });
    
    // ナビゲーションリンクの処理（デモ用）
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // デモ用：リンクを無効化
            
            // デモ用：モーダルでデモであることを通知
            showDemoModal();
        });
    });

    // ヘッダーのスクロール効果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下スクロール時
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上スクロール時
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // 画像プレースホルダーのホバー効果
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ボタンのホバー効果
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // ニュースアイテムのアニメーション
    const newsItems = document.querySelectorAll('.news-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    newsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // メニューアイテムのアニメーション
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        observer.observe(item);
    });

    // シーンアイテムのアニメーション
    const sceneItems = document.querySelectorAll('.scene-item');
    
    sceneItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });

    // 店舗情報アイテムのアニメーション
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });
    
    // その他のボタンも無効化（デモ用）
    const demoButtons = document.querySelectorAll('.btn, .more-link');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // デモ用：ボタンを無効化
            
            // デモ用：モーダルでデモであることを通知
            showDemoModal();
        });
    });
});

// パフォーマンス最適化
window.addEventListener('load', function() {
    // 画像の遅延読み込み（実際の画像がある場合）
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// タッチデバイス対応
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// キーボードナビゲーション対応
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});
