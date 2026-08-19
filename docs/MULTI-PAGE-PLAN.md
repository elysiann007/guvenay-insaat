# Multi-Page (Çok Sayfalı) Geçiş Planı

**Durum: Onay bekliyor — henüz hiçbir kod değişikliği yapılmadı.**
Karar verilen: ilçe bazlı sayfalar şimdilik yapılmayacak (aşağıda §6).

---

## 1. Bugün nerede duruyoruz

Sitede SEO tarafında halihazırda yapılmış olanlar:

- `public/robots.txt` — arama motorlarına ve OAI-SearchBot/ChatGPT-User'a açık
- `public/sitemap.xml` — **tek URL** içeriyor
- `index.html` içinde zengin JSON-LD `@graph`: Organization + WebSite + WebPage/FAQPage
- OG / Twitter / `geo.region` / canonical meta etiketleri
- `LocalExpertise.tsx` — İzmir odaklı bölüm + 5 soruluk SSS

Bu iyi bir temel, ama tamamı **tek bir URL'e** bakıyor.

## 2. Tek sayfanın tavanı

Bir URL = bir başlık, bir açıklama, bir canonical. Tek sayfayla
*"izmir kablo kanal kazısı"*, *"trafo temeli izmir"*, *"helikopter beton izmir"*
sorgularında **ayrı ayrı sıralanmak mümkün değil.**

Ayrıca şu an aktif olarak zarar veren iki nokta var:

| Sorun | Nerede | Neden önemli |
|---|---|---|
| **Menü taranabilir değil** | `Navbar.tsx:79`, `Footer.tsx:111` — `scrollIntoView` ile buton | Arama motorları link takip eder, tıklama olayını değil. Şu an iç link grafiği fiilen yok. Orta tık / "yeni sekmede aç" da çalışmıyor. |
| **`seo-fallback` bir kabuk** | `index.html` `<div id="root">` içi | React hydration'da siliyor; tarayıcı ile kullanıcı farklı içerik görüyor, üstelik metin tekrarlanıyor. Prerender gelince silinmeli. |

## 3. Seçilen yol: `vite-react-ssg`

React Router ekler ve her rotayı **build sırasında gerçek statik HTML'e** basar.

Mevcut koda en az müdahale eden yol: bütün bileşenler, framer-motion, Tailwind,
video hero, lightbox aynen kalır. Ticari olarak en kritik faydası:
**WhatsApp ve Facebook link önizlemeleri.** Bu botlar JavaScript çalıştırmaz;
düz SPA'da paylaşılan her link boş kart olarak görünür. İşin çoğu WhatsApp'tan
geliyorsa tek başına bu bile prerender'ı haklı çıkarır.

Uyumluluk doğrulandı: `vite-react-ssg@0.9.2` → Vite `^8.0.0`, React `^19.0.0`.
Projedeki sürümler Vite 8.0.16 / React 19.2.6. **Uyumlu.**

### Değerlendirilen alternatifler

- **Astro** — sıfırdan kurulsa daha iyi olurdu, ama site animasyon ağırlıklı;
  neredeyse her bileşene `client:load` gerekir ve Astro'nun faydası büyük ölçüde
  kaybolur. Büyük göç maliyeti, küçük kazanç.
- **Next.js** — tam yeniden yazım.
- **Sadece client-side React Router** — en ucuzu, ama sosyal önizlemeleri bozar.

## 4. Önerilen URL yapısı

```
/                                              Ana sayfa
/hizmetler/kablo-kanal-kazisi-kablo-serimi
/hizmetler/trafo-temeli-trafo-binasi
/hizmetler/aydinlatma-direkleri
/hizmetler/boru-drenaj-pissu-hatlari
/hizmetler/ust-yapi-restorasyonu
/hizmetler/helikopter-beton
/hizmetler/ariza-mudahalesi-bakim
/projeler          ← 22 fotoğraflık galeri (şu an sayfa ortasında gömülü)
/hakkimizda
/belgelerimiz
/referanslar
/iletisim
```

Her hizmet sayfasında: kendi H1'i, 400–600 kelime **özgün** metin, o işe ait
galeri fotoğrafları, kendi `Service` schema'sı ve bir CTA. Tek hedef yerine
yedi ayrı anahtar kelime hedefi.

## 5. Fazlar

1. **Altyapı** — `vite-react-ssg` + `react-router-dom` kur, `App.tsx`'i
   `<Outlet/>`'li layout'a çevir, `vercel.json` ekle, üretilen HTML'i doğrula.
2. **Taranabilir menü** — navbar/footer butonlarını gerçek `<a href>` yap.
   *Multi-page'e geçilmese bile tek başına yapılmaya değer.*
3. **İçerik ayrıştırma** — bölümleri sayfalara taşı. Her hizmet sayfası
   **gerçekten yeni metin** ister; mevcut cümleleri yeniden dizmek sıralama
   getirmez.
4. **Sayfa başına SEO** — rota başına title/description/canonical/OG;
   `Organization` global, `Service` hizmet sayfalarında, `BreadcrumbList` her
   sayfada, FAQ schema yalnız kendi sayfasında. `seo-fallback` silinir.
5. **Sitemap + doğrulama** — build'de tüm URL'ler üretilir; sonra render edilen
   HTML, Rich Results Test ve Search Console kontrolü.

Kabaca 2–3 oturum; ağırlık Faz 3'teki metin yazımında.

## 6. İlçe sayfaları — şimdilik yapılmayacak

`/bolgeler/gaziemir`, `/bolgeler/aliaga` gibi sayfalar yerel SEO'da en büyük
kazanç **ve** en büyük risk. Yalnızca yer adı değişen, birbirinin kopyası
sayfalar Google'ın "doorway page" tanımına girer ve sıralamada cezalandırılır.

Ancak her sayfada **gerçek ve özgün içerik** varsa değer katar: o ilçede
yapılmış gerçek işler, gerçek fotoğraflar, gerçek tarihler. Referans listesinde
bu malzeme mevcut, dolayısıyla ileride yapılabilir — ama şablonla değil, tek tek
yazarak.

**Karar:** önce hizmet sayfaları kurulacak; ilçe sayfaları sonraya bırakıldı.
