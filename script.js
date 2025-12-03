// --- DATA PRODUK (Simulasi) ---
const products = [
    // Brand Indonesia (Lokal)
    { id: 'm001', name: 'MYKONOS Black Opera', brand: 'MYKONOS', price: 259000, category: 'lokal', 
      image: 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/black_opera.jpg', 
      alt_text: 'Botol Parfum Mykonos Black Opera' }, 
    
    { id: 'm002', name: 'MYKONOS Sparkling Rose', brand: 'MYKONOS', price: 259000, category: 'lokal', 
      image: 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/id-11134207-7r98u-lonp452mub6173_prev_ui.png', 
      alt_text: 'Botol Parfum Mykonos Sparkling Rose' },
    
    { id: 'm003', name: 'MYKONOS Bonfire Vanilla', brand: 'MYKONOS', price: 179000, category: 'lokal', 
      image: 'https://ukhtiosaka.com/wp-content/uploads/2025/11/Mykonos-Bonfire-Vanilla.webp', 
      alt_text: 'Botol Parfum Mykonos Bonfire Vanilla' },
    
    // Brand Timur Tengah
    { id: 't001', name: 'Lattafa Qaed Al-Fursan', brand: 'Lattafa', price: 250000, category: 'timurtengah', 
      image: 'https://m.media-amazon.com/images/I/610gW07MmzL._AC_UF1000%2C1000_QL80_.jpg', 
      alt_text: 'Qaed Al-Fursan' },
    
    { id: 't002', name: 'Rassasi Hawas Ice', brand: 'Rasasi', price: 600000, category: 'timurtengah', 
      image: 'https://down-id.img.susercontent.com/file/id-11134207-7ra0h-mdo8g8sf8ml4c5', 
      alt_text: 'Botol Parfum Rassasi Hawas Ice' },
    
    // Designer
    { id: 'd001', name: 'Versace Eros Flame', brand: 'Versace', price: 1200000, category: 'designer', 
      image: 'https://m.media-amazon.com/images/I/71lvbztOYSL._AC_UF1000%2C1000_QL80_.jpg', 
      alt_text: 'Botol Parfum Versace Eros Flame' },
    
    { id: 'd002', name: 'Jean Paul Galtier Le Male Le Parfume', brand: 'Jean Paul Galtier', price: 1550000, category: 'designer', 
      image: 'https://img.lazcdn.com/g/p/f28f15291f10382896daeb25b5bd5520.jpg_720x720q80.jpg', 
      alt_text: 'Botol Parfum Jean Paul Galtier Le Male Le Parfume' },
    
    // Niche
    { id: 'n001', name: 'Louis Vuitton Pacific Chill', brand: 'Louis Vuitton', price: 6000000, category: 'niche', 
      image: 'https://parisgallery.ae/cdn/shop/files/208389_4f22a04f31f050d2f2b28129bef73999_pacific-chill.jpg?v=1697203501&width=1000', 
      alt_text: 'Botol Parfum Louis Vuitton Pacific Chill' },

];

let cart = []; 

// --- UTILITY FUNCTIONS ---
const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

// --- VALIDASI KONTAK (EMAIL GMAIL ATAU NOMOR HP) ---
function validateContact(contact) {
    // Validasi Email Gmail (case insensitive)
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    
    // Validasi Nomor HP Indonesia 
    // Format: 08xxx (10-13 digit) atau +628xxx atau 628xxx
    const phoneRegex = /^(\+62|62|0)8[0-9]{8,11}$/;
    
    // Cek apakah email Gmail
    if (gmailRegex.test(contact)) {
        return { 
            valid: true, 
            type: 'email',
            message: '✓ Email Gmail valid'
        };
    }
    
    // Cek apakah nomor HP valid
    if (phoneRegex.test(contact)) {
        return { 
            valid: true, 
            type: 'phone',
            message: '✓ Nomor HP valid'
        };
    }
    
    // Tentukan error message yang spesifik
    let errorMessage = '✗ Format tidak valid';
    
    if (contact.includes('@')) {
        if (!contact.toLowerCase().endsWith('@gmail.com')) {
            errorMessage = '✗ Hanya email Gmail (@gmail.com) yang diperbolehkan';
        } else {
            errorMessage = '✗ Format email tidak valid';
        }
    } else if (/^[0-9+]+$/.test(contact)) {
        errorMessage = '✗ Nomor HP harus dimulai dengan 08, 62, atau +62';
    }
    
    return { 
        valid: false, 
        type: null,
        message: errorMessage
    };
}

// --- REAL-TIME CLOCK ---
function updateRealTimeClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedTime = now.toLocaleDateString('id-ID', options);
    const clockEl = document.getElementById('real-time-clock');
    if (clockEl) {
        clockEl.textContent = `Waktu Server: ${formattedTime}`;
    }
}

setInterval(updateRealTimeClock, 1000);

// --- HEADER HIDE/SHOW ON SCROLL ---
document.addEventListener('DOMContentLoaded', () => {
    let lastScroll = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Minimum scroll sebelum hide/show aktif

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Tambahkan class 'scrolled' untuk efek shadow
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Logic untuk hide/show header
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll && currentScroll > 0) {
                // Scroll DOWN - Sembunyikan header
                header.classList.add('hide');
                header.classList.remove('show');
            } else {
                // Scroll UP - Tampilkan header
                header.classList.remove('hide');
                header.classList.add('show');
            }
        } else {
            // Di posisi atas, pastikan header terlihat
            header.classList.remove('hide');
            header.classList.add('show');
        }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Logo click to top
    const logoEl = document.querySelector('.logo');
    if (logoEl) {
        logoEl.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navigation smooth scroll
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Jika link adalah untuk modal checkout, jangan prevent default
            if (href === '#checkout') {
                return;
            }
            
            // Untuk link internal lainnya, gunakan smooth scroll
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Tampilkan header saat navigasi
                    header.classList.remove('hide');
                    header.classList.add('show');
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Validasi real-time untuk input contact
    const contactInput = document.getElementById('contact');
    const contactHelper = document.getElementById('contact-helper');
    const contactIcon = document.getElementById('contact-icon');
    
    if (contactInput) {
        contactInput.addEventListener('input', function() {
            const value = this.value.trim();
            
            // Reset jika kosong
            if (value === '') {
                this.style.borderColor = '#ccc';
                this.classList.remove('valid', 'invalid');
                if (contactIcon) contactIcon.style.opacity = '0';
                if (contactHelper) {
                    contactHelper.className = 'input-helper';
                    contactHelper.innerHTML = 'Gunakan <strong>Email Gmail</strong> (contoh: nama@gmail.com) <br>atau <strong>Nomor HP</strong> (contoh: 081234567890)';
                }
                return;
            }
            
            // Validasi
            const validation = validateContact(value);
            
            if (validation.valid) {
                this.style.borderColor = '#2ecc71';
                this.classList.remove('invalid');
                this.classList.add('valid');
                
                if (contactIcon) {
                    contactIcon.textContent = '✓';
                    contactIcon.className = 'validation-icon valid';
                    contactIcon.style.opacity = '1';
                }
                
                if (contactHelper) {
                    contactHelper.className = 'input-helper success';
                    contactHelper.textContent = validation.message;
                }
            } else {
                this.style.borderColor = '#e74c3c';
                this.classList.remove('valid');
                this.classList.add('invalid');
                
                if (contactIcon) {
                    contactIcon.textContent = '✗';
                    contactIcon.className = 'validation-icon invalid';
                    contactIcon.style.opacity = '1';
                }
                
                if (contactHelper) {
                    contactHelper.className = 'input-helper error';
                    contactHelper.textContent = validation.message;
                }
            }
        });
    }

    // Initialize
    updateRealTimeClock();
    renderProducts();
    updateCart();
});

// --- RENDERING PRODUK ---
const productListEl = document.getElementById('product-list');

function renderProducts(filterCategory = 'all') {
    if (!productListEl) return;
    
    productListEl.innerHTML = ''; 
    
    const filteredProducts = products.filter(p => filterCategory === 'all' || p.category === filterCategory);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-category', product.category);
        card.setAttribute('data-id', product.id);

        let imgSrc;
        if (product.image.startsWith('http')) {
            imgSrc = product.image;
        } else {
            const placeholderText = product.name.replace(/ /g, '+'); 
            imgSrc = `https://via.placeholder.com/200?text=${placeholderText}`;
        }
        
        card.innerHTML = `
            <img src="${imgSrc}" alt="${product.alt_text}"> 
            <h3>${product.name}</h3>
            <p class="brand">${product.brand}</p>
            <p class="price">${formatRupiah(product.price)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Tambah ke Keranjang</button>
        `;

        productListEl.appendChild(card);
    });
}

// Event listener untuk tombol 'Tambah ke Keranjang'
if (productListEl) {
    productListEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            addToCart(e.target.getAttribute('data-id'));
        }
    });
}

// --- FUNGSI KERANJANG BELANJA ---
function updateCart() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalEl = document.getElementById('cart-total-price');
    const emptyMessageEl = document.getElementById('empty-cart-message');
    
    if (!cartItemsEl || !cartCountEl || !cartTotalEl) return;
    
    const emptyMsg = emptyMessageEl ? emptyMessageEl.outerHTML : '<p id="empty-cart-message">Keranjang Anda masih kosong.</p>';
    
    cartItemsEl.innerHTML = ''; 
    let total = 0;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = emptyMsg;
    } else {
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return; 

            total += product.price * item.quantity;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed #eee;">
                    <p style="flex-grow: 1;">${product.name} - ${product.brand}<br><small>@ ${formatRupiah(product.price)}</small></p>
                    <div style="display: flex; align-items: center; margin-right: 15px;">
                        <button onclick="changeQuantity('${item.id}', -1)" class="qty-btn">-</button>
                        <span style="margin: 0 15px; font-weight: bold;">${item.quantity}</span>
                        <button onclick="changeQuantity('${item.id}', 1)" class="qty-btn">+</button>
                    </div>
                    <p style="font-weight: bold; width: 100px; text-align: right;">${formatRupiah(product.price * item.quantity)}</p>
                </div>
            `;
            cartItemsEl.appendChild(itemEl);
        });
    }

    cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalEl.textContent = formatRupiah(total);
}

function addToCart(productId) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`✓ ${product.name} berhasil ditambahkan ke keranjang!`);
    }
    
    updateCart();
}

function changeQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        
        if (cart[itemIndex].quantity <= 0) {
            const product = products.find(p => p.id === productId);
            if (product && confirm(`Hapus ${product.name} dari keranjang?`)) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = 1;
            }
        }
    }
    
    updateCart(); 
}

// --- MODAL (CHECKOUT) LOGIC ---
const modal = document.getElementById('checkout-modal');
const cartIcon = document.getElementById('cart-icon');
const closeBtn = document.querySelector('.close-btn');

if (cartIcon && modal) {
    cartIcon.onclick = function() {
        // CEK KERANJANG KOSONG SEBELUM BUKA MODAL
        if (cart.length === 0) {
            alert('🛒 Keranjang Anda Kosong!\n\nSilakan pilih produk terlebih dahulu sebelum checkout.');
            return; // Jangan buka modal jika keranjang kosong
        }
        
        modal.style.display = 'block';
        updateCart();
        // Tampilkan header saat modal dibuka
        const header = document.querySelector('header');
        if (header) {
            header.classList.remove('hide');
            header.classList.add('show');
        }
    }
}

if (closeBtn && modal) {
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (modal && event.target === modal) {
        modal.style.display = 'none';
    }
}

// --- FILTER KATEGORI ---
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-category');
        renderProducts(category);
    });
});

// --- FORM SUBMISSION (SIMULASI TRANSAKSI DENGAN VALIDASI LENGKAP) ---
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // VALIDASI 1: Cek keranjang kosong
        if (cart.length === 0) {
            alert('🛒 Keranjang Anda Kosong!\n\nSilakan pilih produk terlebih dahulu sebelum checkout.');
            modal.style.display = 'none'; // Tutup modal
            return;
        }

        const name = document.getElementById('name').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;
        
        // VALIDASI 2: Nama wajib diisi
        if (!name || name === '') {
            alert('⚠️ Nama Wajib Diisi!\n\nSilakan masukkan nama lengkap Anda.');
            document.getElementById('name').focus();
            return;
        }
        
        // VALIDASI 3: Nama minimal 3 karakter
        if (name.length < 3) {
            alert('⚠️ Nama Terlalu Pendek!\n\nNama minimal 3 karakter.');
            document.getElementById('name').focus();
            return;
        }
        
        // VALIDASI 4: Kontak (Email Gmail atau Nomor HP)
        const contactValidation = validateContact(contact);
        
        if (!contactValidation.valid) {
            alert('⚠️ Format Kontak Tidak Valid!\n\n' +
                  'Silakan masukkan salah satu:\n\n' +
                  '📧 Email Gmail:\n' +
                  '   • Format: namaanda@gmail.com\n' +
                  '   • Hanya Gmail yang diterima\n\n' +
                  '📱 Nomor HP:\n' +
                  '   • Format: 081234567890\n' +
                  '   • Atau: 628123456789\n' +
                  '   • Atau: +628123456789\n' +
                  '   • Minimal 10 digit, maksimal 13 digit');
            document.getElementById('contact').focus();
            return;
        }
        
        // VALIDASI 5: Metode pembayaran wajib dipilih
        if (!paymentMethod || paymentMethod === '') {
            alert('⚠️ Metode Pembayaran Wajib Dipilih!\n\nSilakan pilih metode pembayaran.');
            document.getElementById('payment-method').focus();
            return;
        }
        
        // SEMUA VALIDASI BERHASIL - PROSES PESANAN
        const cartTotalEl = document.getElementById('cart-total-price');
        const totalDisplay = cartTotalEl ? cartTotalEl.textContent : 'Rp 0';
        
        const transactionTime = new Date().toLocaleString('id-ID', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit'
        });
        
        const orderDetails = {
            id: `ORD-${Date.now()}`,
            name: name,
            contact: contact,
            contactType: contactValidation.type,
            payment: paymentMethod,
            items: cart.map(item => {
                const product = products.find(p => p.id === item.id);
                return {
                    name: product.name,
                    brand: product.brand,
                    price: product.price,
                    quantity: item.quantity,
                    subtotal: product.price * item.quantity
                };
            }),
            total: totalDisplay,
            date: transactionTime
        };

        console.log("Transaksi Berhasil (SIMULASI):", orderDetails);
        
        // Alert sukses dengan info tipe kontak
        const contactTypeText = contactValidation.type === 'email' ? '📧 Email' : '📱 Nomor HP';
        const paymentText = paymentMethod.toUpperCase().replace(/_/g, ' ');
        
        alert(`✅ TRANSAKSI BERHASIL!\n\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `📋 ID Pesanan: ${orderDetails.id}\n` +
              `💰 Total: ${totalDisplay}\n` +
              `💳 Pembayaran: ${paymentText}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
              `Konfirmasi pesanan akan dikirim ke:\n` +
              `${contactTypeText}: ${contact}\n\n` +
              `Terima kasih atas pembelian Anda, ${name}! 🎉`);

        // Tambahkan ke Riwayat Pesanan
        const historyEl = document.getElementById('order-history-list');
        if (historyEl) {
            const orderEl = document.createElement('div');
            orderEl.className = 'order-summary';
            
            const itemHtml = orderDetails.items.map(item => `
                <li>${item.quantity}x ${item.name} - ${item.brand} - ${formatRupiah(item.subtotal)}</li>
            `).join('');
            
            const contactTypeIcon = contactValidation.type === 'email' ? '📧' : '📱';
            const contactTypeLabel = contactValidation.type === 'email' ? 'Email' : 'Nomor HP';

            orderEl.innerHTML = `
                <h4>📋 Pesanan - ID: ${orderDetails.id}</h4>
                <p><strong>⏰ Waktu Transaksi:</strong> ${orderDetails.date}</p>
                <p><strong>👤 Nama Pembeli:</strong> ${orderDetails.name}</p>
                <p><strong>${contactTypeIcon} ${contactTypeLabel}:</strong> ${orderDetails.contact}</p>
                <p><strong>💳 Metode Pembayaran:</strong> ${paymentText}</p>
                <p><strong>📦 Rincian Item:</strong></p>
                <ul style="padding-left: 20px;">${itemHtml}</ul>
                <p style="font-size: 1.3em; margin-top: 15px; color: #2f4a3e;"><strong>💰 TOTAL: ${orderDetails.total}</strong></p>
            `;
            historyEl.prepend(orderEl);
        }

        // Reset form dan keranjang
        cart = [];
        updateCart();
        this.reset();
        
        // Reset validasi visual
        const contactInput = document.getElementById('contact');
        const contactIcon = document.getElementById('contact-icon');
        const contactHelper = document.getElementById('contact-helper');
        
        if (contactInput) {
            contactInput.style.borderColor = '#ccc';
            contactInput.classList.remove('valid', 'invalid');
        }
        if (contactIcon) contactIcon.style.opacity = '0';
        if (contactHelper) {
            contactHelper.className = 'input-helper';
            contactHelper.innerHTML = 'Gunakan <strong>Email Gmail</strong> (contoh: nama@gmail.com) <br>atau <strong>Nomor HP</strong> (contoh: 081234567890)';
        }
        
        // Tutup modal
        if (modal) modal.style.display = 'none';
        
        // Scroll ke riwayat pesanan
        const historySection = document.getElementById('history');
        if (historySection) {
            setTimeout(() => {
                historySection.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    });
}