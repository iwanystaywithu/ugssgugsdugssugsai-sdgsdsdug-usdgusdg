let currentLoginType = '';
let phoneNumber = '';

function initLogin(type) {
    currentLoginType = type;
    document.getElementById('login-modal').classList.remove('hidden');
    document.getElementById('login-step-phone').classList.remove('hidden');
    document.getElementById('login-step-code').classList.add('hidden');
    document.getElementById('login-step-2fa').classList.add('hidden');
    document.getElementById('modal-title').textContent = `${type === 'app' ? 'Asosiy Ilova' : 'Sotuvchi Ilova'} ga kirish`;
}

function closeModal() {
    document.getElementById('login-modal').classList.add('hidden');
}
function handleModalClick(event) {
    // If the user clicks on the background (not the modal content), close it
    closeModal();
}

function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    notification.innerHTML = `
                <i class="notification-icon ${icons[type] || icons.info}"></i>
                <span>${message}</span>
                <span class="notification-close" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </span>
            `;

    container.appendChild(notification);

    if (duration > 0) {
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    return notification;
}
function success_login(loginType) {
    // Get both inputs
    const visibleInput = document.getElementById(`${loginType}-phone-input`);
    const hiddenInput = document.querySelector(`input[name="${loginType.toUpperCase()}_PHONE_NUMBER"]`);

    // Update both inputs
    const maskedNumber = phoneNumber.slice(0, 3) + '***' + phoneNumber.slice(-4);
    visibleInput.value = phoneNumber;  // This updates the property but not the attribute
    visibleInput.setAttribute('data-full', phoneNumber);
    hiddenInput.value = phoneNumber;

    // Reinitialize the click handlers
    initPhoneInputHandlers(visibleInput);

    closeModal();
    showNotification('Muvaffaqiyatli kirildi!', 'success');
}

function initPhoneInputHandlers(input) {
    if (!input) return;

    // Remove any existing event listeners
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);

    // Add new event listeners
    newInput.addEventListener('click', (e) => {
        e.stopPropagation();
        newInput.value = newInput.getAttribute('data-full');
    });

    document.addEventListener('click', (e) => {
        if (!newInput.contains(e.target)) {
            const fullNumber = newInput.getAttribute('data-full');
            if (fullNumber) {
                newInput.value = fullNumber.slice(0, 3) + '***' + fullNumber.slice(-4);
            }
        }
    });

    return newInput;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = [
        document.getElementById('app-phone-input'),
        document.getElementById('buyer-phone-input')
    ].filter(Boolean);

    phoneInputs.forEach(initPhoneInputHandlers);
});
async function sendCode() {
    phoneNumber = document.getElementById('login-phone').value;
    if (!phoneNumber) {
        showNotification('Telefon raqamni kiriting', 'error');
        return;
    }
    try {
        const response = await fetch('/api/telegram/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: currentLoginType,
                phone: phoneNumber
            })
        });

        const data = await response.json();
        if (data.existing_session) {
            success_login(currentLoginType);
            return;
        }
        if (data.success) {
            document.getElementById('login-step-phone').classList.add('hidden');
            document.getElementById('login-step-code').classList.remove('hidden');
            showNotification('Tasdiqlash kodi muvaffaqiyatli yuborildi!', 'success');
        } else {
            showNotification(data.message || 'Kod yuborishda xato', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Tasdiqlash kodini yuborishda xato', 'error');
    }
}

async function submitCode() {
    const code = document.getElementById('login-code').value;
    if (!code) {
        showNotification('Tasdiqlash kodini kiriting', 'error');
        return;
    }

    try {
        const response = await fetch('/api/telegram/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: currentLoginType,
                phone: phoneNumber,
                code: code
            })
        });

        const data = await response.json();

        if (data.success) {
            if (data.requires_2fa) {
                document.getElementById('login-step-code').classList.add('hidden');
                document.getElementById('login-step-2fa').classList.remove('hidden');
                showNotification('2FA talab qilinadi. Parolingizni kiriting.', 'info');
            } else {
                success_login(currentLoginType);
            }
        } else {
            showNotification(data.message || 'Tasdiqlash muvaffaqiyatsiz', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Kodni tekshirishda xato', 'error');
    }
}

async function submit2FA() {
    const password = document.getElementById('login-password').value;
    if (!password) {
        showNotification('2FA parolni kiriting', 'error');
        return;
    }

    try {
        const response = await fetch('/api/telegram/2fa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: currentLoginType,
                phone: phoneNumber,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {
            success_login(currentLoginType);
        } else {
            showNotification(data.message || '2FA autentifikatsiya muvaffaqiyatsiz', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Autentifikatsiya muvaffaqiyatsiz', 'error');
    }
}


function initTomSelectGifts(selector) {
    return new TomSelect(selector, {
        plugins: ['remove_button'],
        create: false,
        maxItems: null,
        placeholder: 'Olinmaydigan elementlarni tanlang...',
        dropdownParent: 'body',
        onInitialize: function () {
            this.on('change', updateSelectedCount);
            updateSelectedCount.call(this);
        },
        render: {
            option: function (data, escape) {
                const optionEl = this.input.querySelector(`option[value="${escape(data.value)}"]`);
                const imgUrl = optionEl ? optionEl.dataset.img : '';
                const loadingIcon = `<div class="image-placeholder w-6 h-6 mr-2 flex items-center justify-center">
                    <i class="fas fa-spinner fa-spin text-gray-400"></i>
                </div>`;

                return `
                <div class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    ${imgUrl ? `
                    <div class="relative w-6 h-6 mr-2">
                        ${loadingIcon}
                        <img src="${imgUrl}" alt="${escape(data.text)}" 
                            class="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0"
                            onload="this.classList.remove('opacity-0'); this.previousElementSibling.style.display = 'none';"
                            onerror="this.style.display='none';this.previousElementSibling.innerHTML='<i class=\\'fas fa-image text-gray-400\\'></i>'">
                    </div>` : ''}
                    <span>${escape(data.text)}</span>
                </div>`;
            },
            item: function (data, escape) {
                const optionEl = this.input.querySelector(`option[value="${escape(data.value)}"]`);
                const imgUrl = optionEl ? optionEl.dataset.img : '';
                const loadingIcon = `<div class="image-placeholder w-5 h-5 mr-2 flex items-center justify-center">
                    <i class="fas fa-spinner fa-spin text-gray-400 text-xs"></i>
                </div>`;

                return `
                <div class="flex items-center bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 m-1">
                    ${imgUrl ? `
                    <div class="relative w-5 h-5 mr-2">
                        ${loadingIcon}
                        <img src="${imgUrl}" alt="${escape(data.text)}" 
                            class="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0"
                            onload="this.classList.remove('opacity-0'); this.previousElementSibling.style.display = 'none';"
                            onerror="this.style.display='none';this.previousElementSibling.innerHTML='<i class=\\'fas fa-image text-gray-400 text-xs\\'></i>'">
                    </div>` : ''}
                    <span>${escape(data.text)}</span>
                </div>`;
            },
            option_create: function (data, escape) {
                return `<div class="create p-2 text-blue-500">Qo'shish <strong>${escape(data.input)}</strong>...</div>`;
            }
        }
    });
}
function initTomSelectBackdrops(selector) {
    return new TomSelect(selector, {
        plugins: ['remove_button'],
        create: false,
        maxItems: null,
        placeholder: 'Olinmaydigan elementlarni tanlang...',
        dropdownParent: 'body',
        onInitialize: function () {
            this.on('change', updateSelectedCount);
            updateSelectedCount.call(this);
        },
        render: {
            option: function (data, escape) {
                const optionEl = this.input.querySelector(`option[value="${escape(data.value)}"]`);
                const color = optionEl ? optionEl.dataset.color : null;

                return `
        <div class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            ${color ? `<span class="w-3 h-3 rounded-full mr-2" style="background-color: ${color};"></span>` : ''}
            <span>${escape(data.text)}</span>
        </div>`;
            },
            item: function (data, escape) {
                const optionEl = this.input.querySelector(`option[value="${escape(data.value)}"]`);
                const color = optionEl ? optionEl.dataset.color : null;

                return `
        <div class="flex items-center bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 m-1">
            ${color ? `<span class="w-3 h-3 rounded-full mr-2" style="background-color: ${color};"></span>` : ''}
            <span>${escape(data.text)}</span>
        </div>`;
            },
            option_create: function (data, escape) {
                return `<div class="create p-2 text-blue-500">Qo'shish <strong>${escape(data.input)}</strong>...</div>`;
            }
        }
    });
}

// Initialize both selectors
const giftsSelect = initTomSelectGifts('#gifts-select');
const backdropsSelect = initTomSelectBackdrops('#backdrops-select');

// Helper functions
function selectAll(selector) {
    const select = document.getElementById(selector);
    Array.from(select.options).forEach(option => {
        option.selected = true;
    });
    if (selector === 'gifts-select') {
        giftsSelect.sync();
    } else {
        backdropsSelect.sync();
    }
    updateSelectedCount.call(selector === 'gifts-select' ? giftsSelect : backdropsSelect);
}

function deselectAll(selector) {
    const select = document.getElementById(selector);
    Array.from(select.options).forEach(option => {
        option.selected = false;
    });
    if (selector === 'gifts-select') {
        giftsSelect.sync();
    } else {
        backdropsSelect.sync();
    }
    updateSelectedCount.call(selector === 'gifts-select' ? giftsSelect : backdropsSelect);
}

function updateSelectedCount() {
    const count = this.items.length;
    const counterElement = this.input.id === 'gifts-select'
        ? document.getElementById('gifts-count')
        : document.getElementById('backdrops-count');

    counterElement.textContent = `${count} ta tanlandi`;

    // Visual feedback when many items are selected
    if (count > 10) {
        counterElement.classList.add('text-yellow-400');
    } else {
        counterElement.classList.remove('text-yellow-400');
    }
}

// Add search functionality
document.querySelectorAll('.ts-control input').forEach(input => {
    input.placeholder = 'Qidirish uchun yozing...';
});

// Add keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'a' && document.activeElement.matches('.ts-control input')) {
        e.preventDefault();
        const selectId = document.activeElement.closest('.ts-control').nextElementSibling.id;
        selectAll(selectId);
    }
});