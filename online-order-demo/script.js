// オンライン注文・デリバリーシステム - デザインデモサイト
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍕 これはオンライン注文システムのデザインデモです。実際の注文はできません。');
    
    // デモモーダルの要素
    const demoModal = document.getElementById('demoModal');
    const closeDemoModal = document.getElementById('closeDemoModal');
    
    // カート関連の要素
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // セクション要素
    const menuSection = document.getElementById('menuSection');
    const cartSection = document.getElementById('cartSection');
    const checkoutSection = document.getElementById('checkoutSection');
    const completionSection = document.getElementById('completionSection');
    
    // フォーム要素
    const checkoutForm = document.getElementById('checkoutForm');
    const backToCartBtn = document.getElementById('backToCartBtn');
    
    // 完了画面の要素
    const newOrderBtn = document.getElementById('newOrderBtn');
    const viewMenuBtn = document.getElementById('viewMenuBtn');
    
    // カートの状態管理
    let cart = [];
    let cartTotal = 0;
    const deliveryFee = 300;
    
    // デモモーダルの表示
    function showDemoModal() {
        demoModal.classList.add('active');
    }
    
    // デモモーダルの非表示
    function closeDemoModal() {
        demoModal.classList.remove('active');
    }
    
    // カートの更新
    function updateCart() {
        // カート内の商品数を更新
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // カートの表示を更新
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-basket"></i>
                    <p>カートに商品がありません</p>
                    <p>メニューから商品を選んでください</p>
                </div>
            `;
            cartFooter.style.display = 'none';
        } else {
            // カート内の商品を表示
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <div class="cart-item-image">
                            <img src="assets/images/menu-${getImageName(item.name)}.png" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>¥${item.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                        </div>
                        <div class="cart-item-price">¥${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                </div>
            `).join('');
            
            // 合計金額を計算
            cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const totalAmount = cartTotal + deliveryFee;
            
            // 合計表示を更新
            document.getElementById('subtotal').textContent = `¥${cartTotal.toLocaleString()}`;
            document.getElementById('totalAmount').textContent = `¥${totalAmount.toLocaleString()}`;
            
            cartFooter.style.display = 'block';
        }
    }
    
    // 商品名から画像ファイル名を取得
    function getImageName(itemName) {
        const imageMap = {
            'マルゲリータピザ': 'margherita',
            'ペパロニピザ': 'pepperoni',
            'クアトロフォルマッジ': 'quattro',
            'カルボナーラ': 'carbonara',
            'アラビアータ': 'arrabbiata',
            'シーザーサラダ': 'caesar',
            'コーラ': 'cola',
            'ビール': 'beer'
        };
        return imageMap[itemName] || 'margherita';
    }
    
    // 商品をカートに追加
    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        
        updateCart();
        
        // カートアイコンのアニメーション
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
    
    // 数量を増やす
    window.increaseQuantity = function(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
            updateCart();
        }
    };
    
    // 数量を減らす
    window.decreaseQuantity = function(id) {
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        } else if (item && item.quantity === 1) {
            cart = cart.filter(cartItem => cartItem.id !== id);
        }
        updateCart();
    };
    
    // カートを空にする
    clearCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cart = [];
        updateCart();
    });
    
    // カートアイコンのクリック
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        showDemoModal();
    });
    
    // カテゴリフィルター
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // アクティブクラスを更新
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // カテゴリを取得
            const category = this.dataset.category;
            
            // メニューアイテムをフィルター
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 商品をカートに追加するボタンのイベント
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.dataset.id);
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);
            addToCart(id, name, price);
        });
    });
    
    // 注文に進むボタン
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.length > 0) {
            menuSection.style.display = 'none';
            cartSection.style.display = 'none';
            checkoutSection.style.display = 'block';
            completionSection.style.display = 'none';
            
            // ページトップにスクロール
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // カートに戻るボタン
    backToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        menuSection.style.display = 'block';
        cartSection.style.display = 'block';
        checkoutSection.style.display = 'none';
        completionSection.style.display = 'none';
        
        // カートセクションにスクロール
        cartSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 注文フォームの送信
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータを取得
        const formData = new FormData(this);
        const customerName = formData.get('customerName');
        const deliveryAddress = formData.get('deliveryAddress');
        const deliveryTime = formData.get('deliveryTime');
        
        // 注文完了画面を表示
        menuSection.style.display = 'none';
        cartSection.style.display = 'none';
        checkoutSection.style.display = 'none';
        completionSection.style.display = 'block';
        
        // 注文内容を表示
        const orderSummary = document.getElementById('orderSummary');
        orderSummary.innerHTML = cart.map(item => `
            <div class="summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>¥${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `).join('') + `
            <div class="summary-item">
                <span>配達料</span>
                <span>¥${deliveryFee.toLocaleString()}</span>
            </div>
            <div class="summary-item">
                <strong>合計</strong>
                <strong>¥${(cartTotal + deliveryFee).toLocaleString()}</strong>
            </div>
        `;
        
        // 配達情報を表示
        document.getElementById('deliveryAddressDisplay').textContent = deliveryAddress;
        document.getElementById('estimatedDelivery').textContent = `約${deliveryTime}分`;
        
        // ページトップにスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // 新しい注文ボタン
    newOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // カートをリセット
        cart = [];
        updateCart();
        
        // メニューセクションに戻る
        menuSection.style.display = 'block';
        cartSection.style.display = 'block';
        checkoutSection.style.display = 'none';
        completionSection.style.display = 'none';
        
        // メニューセクションにスクロール
        menuSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // メニューを見るボタン
    viewMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // メニューセクションに戻る
        menuSection.style.display = 'block';
        cartSection.style.display = 'block';
        checkoutSection.style.display = 'none';
        completionSection.style.display = 'none';
        
        // メニューセクションにスクロール
        menuSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 今すぐ注文ボタン
    document.getElementById('orderNowBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showDemoModal();
    });
    
    // ログインボタン
    document.getElementById('loginBtn').addEventListener('click', function(e) {
        e.preventDefault();
        showDemoModal();
    });
    
    // ナビゲーションリンク
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showDemoModal();
        });
    });
    
    // フッターリンク
    document.querySelectorAll('.footer a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showDemoModal();
        });
    });
    
    // デモモーダルのイベント
    closeDemoModal.addEventListener('click', closeDemoModal);
    
    demoModal.addEventListener('click', function(e) {
        if (e.target === demoModal) {
            closeDemoModal();
        }
    });
    
    // 初期化
    updateCart();
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ヘッダーのスクロール効果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // セクションのアニメーション
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
    
    // セクションを監視
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // メニューアイテムのアニメーション
    document.querySelectorAll('.menu-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // 特徴アイテムのアニメーション
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    console.log('🎯 オンライン注文システムのデザインデモが読み込まれました！');
    console.log('📱 カート機能、カテゴリフィルター、注文フローをお試しください');
    console.log('⚠️  実際の注文はできません（デザインデモ）');
});
