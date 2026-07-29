# Güvenay İnşaat — Altyapı Yönelimi (V2)

**Bu dosya `REDESIGN-PLAN.md`'nin yerini alır.** Çelişki olursa bu dosya geçerlidir.
Önceki plan inşaat/konut sektörü ve çift tema içindi; ikisi de artık geçersiz.

## Kararlar

| Konu | Karar |
|------|-------|
| Sektör | **Altyapı** — enerji ve nakil hatları + telekom/fiber |
| Marka adı | **"Güvenay İnşaat" değişmiyor** |
| Tema | **Tek tema, açık.** Dark mode tamamen kaldırılıyor |
| Palet | Otorite laciverti + güven altını |
| Öncelik | **Mobil mükemmellik** — bu projenin en önemli gereksinimi |
| Görseller | Mevcut bina fotoğrafları şimdilik placeholder olarak kalıyor |

---

## 1. Token seti (tek tema — hepsi doğrulandı)

Ölçülen değerler WCAG bağıl parlaklık formülüyle hesaplandı. Her biri hedefini geçiyor.

| Token | Hex | Doğrulanan kullanım |
|-------|-----|---------------------|
| `--bg` | `#F8FAFC` | sayfa zemini |
| `--bg-alt` | `#E9EEF5` | ara bant |
| `--surface` | `#FFFFFF` | kart |
| `--navy` | `#1E3A8A` | kurumsal bant / birincil dolgu — beyaz metin **10.36** |
| `--ink` | `#0F172A` | koyu bant — beyaz metin **17.85** |
| `--text` | `#0F172A` | başlık — bg **17.06**, alt **15.31** |
| `--text-soft` | `#334155` | gövde — bg **9.90**, alt **8.88** |
| `--text-dim` | `#586576` | ikincil — bg **5.67**, alt **5.09** |
| `--accent` | `#A84D08` | **tek rol**: metin (bg 5.38 / alt 4.83) **ve** beyaz etiketli dolgu (5.63) |
| `--accent-on-dark` | `#FBBF24` | lacivert/ink bant üzerinde altın metin — navy **6.20**, ink **10.69** |
| `--border` | `#E2E8F0` | yalnızca dekoratif ayraç |
| `--border-control` | `#64748B` | form/kontrol sınırı — bg 4.55, alt 4.08 (3:1 eşiğini geçer) |

### Neden bu değerler

Skill `--accent: #B45309` önerdi. Ölçtüğümde ara bant üzerinde **4.31** çıktı — normal metin için
yetersiz. `#A84D08`'e koyulaştırınca üç kullanımın hepsi tek değerle geçiyor, dolayısıyla
**önceki plandaki iki rollü accent ayrımına gerek kalmadı.** Sistem sadeleşti.

`--text-dim` için skill'in `#64748B`'si ara bantta **4.08** ile kalıyordu; `#586576` her iki
zeminde de geçiyor.

Altın, lacivert bant üzerinde **2.06** — orada asla kullanılmaz, `--accent-on-dark` kullanılır.

---

## 2. Dark mode'un kaldırılması

`src/index.css` içinde:
- `@media (prefers-color-scheme: dark)` bloğu **tamamen silinecek**
- `:root[data-theme="dark"]` ve `:root[data-theme="light"]` blokları silinecek
- Tek `:root` token seti kalacak

Silinecek dosya/parçalar:
- `src/hooks/useTheme.ts` — **dosya tamamen silinir**
- `index.html` içindeki no-flash bootstrap `<script>` — silinir
- `index.html` içindeki iki `media` etiketli `theme-color` meta — tek meta'ya iner (`#F8FAFC`)
- `Navbar.tsx` içindeki `ThemeToggle` bileşeni ve mobil menüdeki Sistem/Açık/Koyu seçici — silinir

Kalıntı bırakılmayacak: `data-theme`, `prefers-color-scheme`, `useTheme`, `ThemeToggle`
aramalarında hiçbir sonuç çıkmamalı.

---

## 3. İçerik dönüşümü (TR)

Sektör **enerji ve nakil hatları + telekom/fiber**. Tüm metinler Türkçe kalır.

**Dürüstlük kuralı — bunlara uyulacak:**
- Gerçek kurum/müşteri adı uydurulmayacak (TEİAŞ, BOTAŞ, Türk Telekom vb. **kullanılmaz**)
- Sahte sertifika, ihale, ödül veya belge numarası yazılmayacak
- Mevcut veriler zaten demo; yerine gelen içerik de **açıkça demo** kalmalı
- Telefon/e-posta/adres placeholder olarak korunacak

| Bölüm | Dönüşüm |
|-------|---------|
| Hero | Başlık ve alt metin altyapıya döner. "Geleceği İnşa Ediyoruz" yerine enerji/iletişim altyapısı vurgusu |
| Services | Enerji iletim hatları, trafo merkezleri, fiber optik altyapı, telekom şebeke kurulumu |
| Projects | Enerji/telekom projeleri (demo). Kategoriler: Enerji, Telekom, Şebeke |
| Process | Etüt → proje → saha uygulaması → devreye alma akışına döner |
| About | Altyapı müteahhitliği geçmişi |
| Stats | Rakamlar altyapıya uyarlanır (km hat, saha, kapasite) |
| Testimonials | Kurumsal müşteri dili, isimler demo kalır |
| Contact | Form aynı; proje tipi seçenekleri enerji/telekom olur |
| Footer | Hizmet linkleri yeni alanlara döner |

---

## 4. Mobil gereksinimler (en yüksek öncelik)

Bu projenin **birincil** kalite ölçütü. Her bölüm bunlara uymak zorunda:

- **Mobile-first yazım:** temel sınıflar mobil, sonra `md:` / `lg:`. Masaüstü varsayılan + `max-width` sorgusu **kullanılmaz**
- **Taşma yok:** 360px ve 375px'te `documentElement.scrollWidth === clientWidth`. Türkçe bileşik kelimeler ("Elektrik İletim Hatları") taşma riski — tip ölçeği buna göre sınırlanacak
- **Dokunma hedefleri ≥44×44px** — istisnasız. Şu an açık kalan 20 hedef de düzeltilecek: footer metin linkleri (20px) ve navbar logo butonu (36px)
- **Komşu hedefler arası ≥8px** boşluk
- **Başparmak erişimi:** mobilde alt sabit CTA çubuğu ("Teklif Al"), `env(safe-area-inset-bottom)` ile güvenli alan payı
- `min-h-dvh` kullanılacak, `100vh` **kullanılmayacak**
- `touch-action: manipulation` — 300ms tap gecikmesi kalkar
- `overscroll-behavior: contain` — istenmeyen pull-to-refresh engellenir
- Gövde metni mobilde **asla 16px altına inmez** (iOS otomatik zoom'u tetikler)
- Satır uzunluğu mobilde 35–60 karakter
- Sabit üst/alt çubuklar için içerik payı bırakılır (içerik altlarında kalmaz)

**Test edilecek genişlikler:** 360, 375, 390, 414, 768, 1280

---

## 5. Fazlar

- **Faz A — Temel:** `src/index.css` tek tema token seti; dark mode altyapısının tamamen sökülmesi (`useTheme.ts` silme, `index.html` script/meta temizliği). Diğer her şey buna bağlı.
- **Faz B — Kabuk + Hero:** `Navbar` (toggle sökümü, mobil menü, logo 44px), `Hero`, `Footer` (link hedefleri 44px), mobil sabit CTA çubuğu.
- **Faz C — İçerik:** `Services`, `Projects`, `Process`, `About`, `Stats`, `Testimonials`, `Contact` — hem içerik dönüşümü hem mobil.
- **Faz D — Doğrulama:** build/lint/tsc, 360–1280 arası taşma taraması, tüm dokunma hedefleri, kontrast taraması, dark mode kalıntı araması.

---

## 6. Bitti sayılma ölçütü

- [ ] Kodda `data-theme` / `prefers-color-scheme` / `useTheme` / `ThemeToggle` kalıntısı yok
- [ ] Tüm renkler token üzerinden; bileşenlerde sabit hex yok
- [ ] Yukarıdaki tablodaki her oran ölçümle doğrulandı
- [ ] 360 ve 375px'te yatay taşma yok
- [ ] Tüm dokunma hedefleri ≥44×44px
- [ ] Uydurma kurum adı / sertifika / ihale iddiası yok
- [ ] `npm run build`, `npm run lint`, `tsc --noEmit` temiz
