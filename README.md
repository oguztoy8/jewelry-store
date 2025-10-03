# Jewelry Store - Product Listing Application





### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **node-fetch** - HTTP istemcisi
- **CORS** - Cross-origin resource sharing
- **dotenv** - Çevre değişkenleri yönetimi

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - CSS framework
- **Lucide React** - İkonlar

## 📦 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Backend Kurulumu

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```bash
PORT=5000
GOLDAPI_KEY=your_api_key_here    
- api key i "https://www.goldapi.io/" buradan alabilirsiniz
```

4. Sunucuyu başlatın:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend lokalde şu adreste çalışacaktır: `http://localhost:5000`

### Frontend Kurulumu

1. Frontend klasörüne gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

Frontend şu adreste çalışacaktır: `http://localhost:3000`




1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

