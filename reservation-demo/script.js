// デザインデモサイト - 予約システム（機能無効化）
document.addEventListener('DOMContentLoaded', function() {
    // デザインデモ注意書きの表示
    console.log('🎨 これは予約システムのデザインデモです。実際の予約はできません。');
    
    // ステップ管理
    let currentStep = 1;
    const totalSteps = 3;
    
    // 要素の取得
    const stepIndicators = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const form = document.getElementById('reservationForm');
    const completionScreen = document.getElementById('completionScreen');
    
    // 人数選択の制御
    const guestInput = document.getElementById('guests');
    const guestButtons = document.querySelectorAll('.guest-btn');
    
    guestButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            let currentValue = parseInt(guestInput.value);
            
            if (action === 'increase' && currentValue < 10) {
                currentValue++;
            } else if (action === 'decrease' && currentValue > 1) {
                currentValue--;
            }
            
            guestInput.value = currentValue;
        });
    });
    
    // 次へ進むボタンの処理
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateStepDisplay();
                }
            }
        });
    });
    
    // 前へ戻るボタンの処理
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                updateStepDisplay();
            }
        });
    });
    
    // ステップ表示の更新
    function updateStepDisplay() {
        // ステップインジケーターの更新
        stepIndicators.forEach((indicator, index) => {
            if (index + 1 <= currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // フォームステップの更新
        formSteps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // ボタンの表示/非表示
        updateButtonVisibility();
    }
    
    // ボタンの表示/非表示を更新
    function updateButtonVisibility() {
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        const prevButton = currentStepElement.querySelector('.prev-step');
        const nextButton = currentStepElement.querySelector('.next-step');
        
        if (prevButton) {
            prevButton.style.display = currentStep === 1 ? 'none' : 'inline-block';
        }
        
        if (nextButton) {
            nextButton.style.display = currentStep === totalSteps ? 'none' : 'inline-block';
        }
    }
    
    // 現在のステップのバリデーション
    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.style.borderColor = '#ff6b6b';
                
                // エラー表示を3秒後に消す
                setTimeout(() => {
                    field.style.borderColor = '#e9ecef';
                }, 3000);
            }
        });
        
        return isValid;
    }
    
    // フォーム送信の処理（デモ用）
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // デモ用：フォーム送信を無効化
        
        // 確認画面の内容を更新
        updateConfirmationSummary();
        
        // 完了画面を表示
        showCompletionScreen();
    });
    
    // 確認画面の内容を更新
    function updateConfirmationSummary() {
        const date = document.getElementById('date').value;
        const time = document.querySelector('input[name="time"]:checked')?.value || '';
        const guests = document.getElementById('guests').value;
        const course = document.querySelector('input[name="course"]:checked')?.value || '';
        const requests = document.getElementById('special-requests').value;
        
        // 日付のフォーマット
        const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        
        // コース名の日本語化
        const courseNames = {
            'lunch': 'ランチコース',
            'dinner': 'ディナーコース',
            'cafe': 'カフェタイム'
        };
        
        document.getElementById('confirm-date').textContent = formattedDate;
        document.getElementById('confirm-time').textContent = time;
        document.getElementById('confirm-guests').textContent = `${guests}名`;
        document.getElementById('confirm-course').textContent = courseNames[course] || course;
        document.getElementById('confirm-requests').textContent = requests || '特になし';
    }
    
    // 完了画面を表示
    function showCompletionScreen() {
        // ランダムな予約番号を生成
        const reservationNumber = 'RSV-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        document.getElementById('reservationNumber').textContent = reservationNumber;
        
        completionScreen.classList.add('active');
    }
    
    // 新しい予約ボタンの処理
    document.getElementById('newReservation').addEventListener('click', function() {
        // 完了画面を非表示
        completionScreen.classList.remove('active');
        
        // フォームをリセット
        form.reset();
        
        // ステップ1に戻る
        currentStep = 1;
        updateStepDisplay();
        
        // ステップインジケーターをリセット
        stepIndicators.forEach((indicator, index) => {
            if (index === 0) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    });
    
    // 完了画面の外側をクリックした時に閉じる
    completionScreen.addEventListener('click', function(e) {
        if (e.target === completionScreen) {
            completionScreen.classList.remove('active');
        }
    });
    
    // デモモーダルの制御
    const demoModal = document.getElementById('demoModal');
    const closeDemoModal = document.getElementById('closeDemoModal');
    
    // デモモーダルを表示する関数
    function showDemoModal() {
        demoModal.classList.add('active');
    }
    
    // デモモーダルを閉じる
    closeDemoModal.addEventListener('click', function() {
        demoModal.classList.remove('active');
    });
    
    // デモモーダルの外側をクリックした時に閉じる
    demoModal.addEventListener('click', function(e) {
        if (e.target === demoModal) {
            demoModal.classList.remove('active');
        }
    });
    
    // 初期表示の設定
    updateStepDisplay();
    
    // デモ用：すべてのリンクを無効化
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showDemoModal();
        });
    });
    
    // 日付の最小値を今日に設定
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // 時間選択の改善
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // 他の時間枠の選択を解除
            timeSlots.forEach(s => s.querySelector('input').checked = false);
            // クリックされた時間枠を選択
            this.querySelector('input').checked = true;
        });
    });
    
    // コース選択の改善
    const courseOptions = document.querySelectorAll('.course-option');
    courseOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 他のコースの選択を解除
            courseOptions.forEach(o => o.querySelector('input').checked = false);
            // クリックされたコースを選択
            this.querySelector('input').checked = true;
        });
    });
});
