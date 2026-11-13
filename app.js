// Konfigurasi URL Backend (Otomatis mendeteksi localhost atau Production Render/Railway)
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://URL-BACKEND-ANDA.onrender.com'; // Ubah dengan URL backend Anda setelah deploy

document.getElementById('promoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const targetAudience = document.getElementById('targetAudience').value;
    const promoDetails = document.getElementById('promoDetails').value;
    
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = '<p class="placeholder-text">Sedang memproses AI...</p>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName, targetAudience, promoDetails })
        });
        
        const data = await response.json();
        
        if (data.success) {
            resultContent.textContent = data.result;
        } else {
            resultContent.textContent = `Error: ${data.message || 'Gagal menghasilkan konten'}`;
        }
    } catch (error) {
        console.error('Koneksi Gagal:', error);
        resultContent.textContent = 'Gagal terhubung ke server backend AI. Pastikan backend sudah aktif dan URL sudah benar.';
    }
});
