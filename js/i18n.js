// ===== INTERNATIONALIZATION =====

const TRANSLATIONS = {
  de: {
    // Navigation
    'nav.how_it_works': 'So geht\'s',
    'nav.gallery': 'Galerie',
    'nav.pricing': 'Preise',
    'nav.products': 'Produkte',

    // Product names
    'product.marathon_classic.name': 'Marathon Classic',
    'product.elevation_profile.name': 'Höhenprofil',
    'product.split_times.name': 'Split-Zeiten',
    'product.bib_art.name': 'Startnummer Art',

    // Product taglines
    'product.marathon_classic.tagline': 'Routenkunst mit Goldakzenten auf Weiß',
    'product.elevation_profile.tagline': 'Bergsilhouette auf Schwarz',
    'product.split_times.tagline': 'Jede 5 km gefeiert',
    'product.bib_art.tagline': 'Deine Nummer, monumental',

    // Hero
    'hero.eyebrow': 'Personalisierte Poster',
    'hero.h1': 'Dein Rennen.<br><em>Deine Geschichte.</em>',
    'hero.cta_primary': 'Druck gestalten',
    'hero.cta_secondary': 'Beispiele ansehen',

    // Banner
    'banner.shipping': 'Kostenloser Versand ab €75',
    'banner.paper': 'Premium-Museumspapier',
    'banner.personalized': '100% personalisiert für dein Rennen',
    'banner.shipped': 'Versand in 5 Werktagen',
    'banner.gift': 'Perfektes Geschenk für Läufer',

    // How it works
    'how_it_works.label': 'Einfacher Ablauf',
    'how_it_works.title': 'Von der Ziellinie<br>an deine Wand',
    'how_it_works.desc': 'Drei einfache Schritte für einen Druck, der dein persönliches Erlebnis feiert.',
    'step1.title': 'Deine Daten eingeben',
    'step1.desc': 'Gib uns deinen Namen, deine Startnummer, Zielzeit und dein durchschnittliches Tempo. Außerdem den Namen des Rennens und das Jahr.',
    'step2.title': 'Wir gestalten deinen Druck',
    'step2.desc': 'Unsere Designer erstellen deinen personalisierten Kunstdruck mit der Streckenführung und all deinen Details, elegant komponiert.',
    'step3.title': 'Lieferung zu dir nach Hause',
    'step3.desc': 'Dein Druck kommt innerhalb von 5 Werktagen gerollt in einer robusten Röhre an – bereit zum Einrahmen und Aufhängen.',

    // Products section
    'products.label': 'Druck gestalten',
    'products.title': 'Jetzt ausprobieren',
    'products.desc': 'Wähle einen Stil, gib deine Renndaten ein und sieh deinen Druck entstehen.',
    'products.order_cta': 'Druck bestellen →',
    'products.hint': 'Bestellung auf der nächsten Seite abschließen – inkl. Versanddaten und Größenwahl.',

    // Gallery
    'gallery.label': 'Galerie',
    'gallery.title': 'Drucke für deine Wand',
    'gallery.desc': 'Eine Auswahl an Drucken, die wir für Läufer aus aller Welt erstellt haben.',
    'gallery.view_print': 'Druck ansehen',

    // Testimonials
    'testimonials.label': 'Bewertungen',
    'testimonials.title': 'Läufer lieben ihre Drucke',
    'testimonials.desc': 'Über 2.400 Läufer haben ihren Zieleinlauf in Kunst verwandelt. Das sagen sie.',
    'testimonial1.text': '„Ich habe geweint, als ich das Paket geöffnet habe. Meinen Namen, meine Zeit, meine Nummer – alles auf diesem wunderschönen Druck zu sehen, hat jede Meile wieder lebendig werden lassen. Er hängt jetzt über meinem Schreibtisch."',
    'testimonial1.race': 'Berlin Marathon 2024 · 4:02:11',
    'testimonial2.text': '„Als Überraschung für meinen Partner nach seinem ersten Marathon bestellt. Er ist begeistert. Die Qualität ist unglaublich – es sieht aus wie echte Galeriekunst, kein Poster."',
    'testimonial2.race': 'Geschenk zum Hamburg Marathon 2024',
    'testimonial3.text': '„Sub-3 war mein Ziel für 5 Jahre. Als ich es endlich geschafft hatte, wusste ich, dass ich es festhalten muss. Dieser Druck trifft jedes Detail. Ein Schatz, den ich für immer behalten werde."',
    'testimonial3.race': 'München Marathon 2024 · 2:58:37',

    // Pricing
    'pricing.label': 'Preise',
    'pricing.title': 'Einfache, transparente Preise',
    'pricing.desc': 'Wähle die Größe, die zu deiner Wand passt. Jeder Druck ist vollständig personalisiert.',
    'pricing.badge': 'Beliebteste Wahl',
    'pricing.a3.desc': '30 × 42 cm – perfekt für Schreibtisch oder kleine Wand',
    'pricing.a2.desc': '42 × 60 cm – das klassische Statement-Stück',
    'pricing.large.desc': '50 × 70 cm – groß denken, für den Zieleinlauf, den du dir verdient hast',
    'pricing.feature1': 'Personalisiert mit Name, Startnr. & Zeit',
    'pricing.feature2': 'Museumspapier 200g/m²',
    'pricing.feature3': 'Digitale Voransicht vor dem Druck',
    'pricing.feature4': 'Gerollt in Schutzröhre',
    'pricing.feature5': 'Versand in 5 Werktagen',
    'pricing.a3.cta': 'A3 bestellen',
    'pricing.a2.cta': 'A2 bestellen',
    'pricing.large.cta': '50×70 bestellen',

    // CTA section
    'cta.label': 'Bereit?',
    'cta.title': 'Deine Ziellinie<br>verdient einen Rahmen.',
    'cta.desc': 'Jeder Marathon ist eine Geschichte aus Disziplin, Schmerz und Triumph. Sorge dafür, dass deine an deiner Wand hängt – nicht nur in deiner Erinnerung.',
    'cta.primary': 'Druck gestalten',
    'cta.secondary': 'Frage stellen',

    // Footer
    'footer.home': 'Startseite',
    'footer.how_it_works': 'So geht\'s',
    'footer.gallery': 'Galerie',
    'footer.pricing': 'Preise',
    'footer.contact': 'Kontakt',
    'footer.copy': '© 2025 Finishline Studio. Alle Rechte vorbehalten.',

    // Product page
    'product_page.shipping_legend': 'Versanddaten',
    'product_page.field.full_name': 'Vollständiger Name',
    'product_page.field.email': 'E-Mail-Adresse',
    'product_page.field.street': 'Straße',
    'product_page.field.city': 'Stadt',
    'product_page.field.postal': 'Postleitzahl',
    'product_page.field.country': 'Land',
    'product_page.field.size': 'Druckgröße',
    'product_page.size.select': 'Größe wählen',
    'product_page.breadcrumb_home': 'Start',
    'product_page.order_btn': 'Jetzt bestellen',
    'product_page.order_note': 'Ab <strong>€49</strong> · Kostenloser Versand ab €75 · Versand in 5 Tagen',
    'product_page.error_msg': 'Produkt nicht gefunden. Bitte wähle ein gültiges Produkt.',
    'product_page.error_back': 'Zurück zu den Produkten',

    // Thank you page
    'thankyou.label': 'Bestellung eingegangen',
    'thankyou.title': 'Danke!',
    'thankyou.message': 'Wir haben deine Bestellung erhalten und senden dir in Kürze eine Bestätigung an deine E-Mail. Dein personalisierter Druck wird innerhalb von <strong>5 Werktagen</strong> versendet.',
    'thankyou.back': 'Zurück zur Startseite',

    // Form field labels
    'field.runner_name': 'Läufername',
    'field.race_name': 'Rennen',
    'field.bib_number': 'Startnummer',
    'field.finish_time': 'Zielzeit',
    'field.avg_pace': 'Ø-Tempo /km',
    'field.start_elevation': 'Starthöhe (m)',
    'field.peak_elevation': 'Gipfelhöhe (m)',
    'field.total_ascent': 'Gesamtanstieg (m)',
    'field.split_times': 'Split-Zeiten (alle 5 km)',
    'field.total_finish_time': 'Gesamte Zielzeit',
    'field.personal_motto': 'Persönliches Motto',

    // Placeholders
    'placeholder.runner_name': 'z.B. Anna Müller',
    'placeholder.race_name': 'z.B. BERLIN MARATHON 2025',
    'placeholder.race_name_trail': 'z.B. ZUGSPITZ ULTRATRAIL',
    'placeholder.bib_number': 'z.B. 4219',
    'placeholder.finish_time': 'z.B. 3:42:18',
    'placeholder.finish_time_trail': 'z.B. 7:34:22',
    'placeholder.avg_pace': 'z.B. 5:16',
    'placeholder.start_elevation': 'z.B. 720',
    'placeholder.peak_elevation': 'z.B. 2962',
    'placeholder.total_ascent': 'z.B. 4400',
    'placeholder.split_input': 'z.B. 0:23:14',
    'placeholder.personal_motto': 'z.B. Schmerz ist vergänglich',

    // Preview labels (used in JS-generated HTML)
    'preview.finish_time': 'Zielzeit',
    'preview.avg_pace': 'Ø-Tempo',
    'preview.net_gain': 'Nettoanstieg',
    'preview.start': 'Start',
    'preview.peak': 'Gipfel',
    'preview.finish': 'Ziel',
    'preview.total': 'Gesamt',
    'preview.default_name': 'Dein Name',
    'preview.default_race': 'MARATHON 2025',
    'preview.default_bib': '#',
  },

  en: {
    // Navigation
    'nav.how_it_works': 'How it works',
    'nav.gallery': 'Gallery',
    'nav.pricing': 'Pricing',
    'nav.products': 'Products',

    // Product names
    'product.marathon_classic.name': 'Marathon Classic',
    'product.elevation_profile.name': 'Elevation Profile',
    'product.split_times.name': 'Split Times',
    'product.bib_art.name': 'Finisher Bib Art',

    // Product taglines
    'product.marathon_classic.tagline': 'Route art with gold accents on white',
    'product.elevation_profile.tagline': 'Mountain silhouette on black',
    'product.split_times.tagline': 'Every 5 km, celebrated',
    'product.bib_art.tagline': 'Your number, monumental',

    // Hero
    'hero.eyebrow': 'Personalized Posters',
    'hero.h1': 'Your race.<br><em>Your story.</em>',
    'hero.cta_primary': 'Design Your Print',
    'hero.cta_secondary': 'See Examples',

    // Banner
    'banner.shipping': 'Free shipping on orders over €75',
    'banner.paper': 'Premium museum-quality paper',
    'banner.personalized': '100% personalized to your race',
    'banner.shipped': 'Shipped within 5 business days',
    'banner.gift': 'Perfect gift for runners',

    // How it works
    'how_it_works.label': 'Simple Process',
    'how_it_works.title': 'From finish line<br>to your wall',
    'how_it_works.desc': 'Three easy steps to create a print that celebrates your personal achievement.',
    'step1.title': 'Enter Your Details',
    'step1.desc': 'Tell us your name, bib number, finish time and average pace. We also need the race name and year.',
    'step2.title': 'We Design Your Print',
    'step2.desc': 'Our designers create your personalized race art print with the course route and all your details elegantly composed.',
    'step3.title': 'Delivered to Your Door',
    'step3.desc': 'Your print arrives rolled in a sturdy tube within 5 business days, ready to frame and hang with pride.',

    // Products section
    'products.label': 'Design Your Print',
    'products.title': 'Try it now',
    'products.desc': 'Pick a style, enter your race details, and watch your print come to life.',
    'products.order_cta': 'Order this print →',
    'products.hint': 'Complete your order on the next page — shipping details & size selection included.',

    // Gallery
    'gallery.label': 'Showcase',
    'gallery.title': 'Wall-worthy finishes',
    'gallery.desc': 'A selection of prints we\'ve made for runners around the world.',
    'gallery.view_print': 'View Print',

    // Testimonials
    'testimonials.label': 'Reviews',
    'testimonials.title': 'Runners love their prints',
    'testimonials.desc': 'Over 2,400 runners have turned their finish into art. Here\'s what they say.',
    'testimonial1.text': '"I cried when I opened the package. Seeing my name, my time, my number — all on this beautiful print — brought back every mile. It\'s hanging above my desk now."',
    'testimonial1.race': 'Berlin Marathon 2024 · 4:02:11',
    'testimonial2.text': '"Bought one for my partner as a surprise after his first marathon. He\'s obsessed with it. The quality is incredible — it looks like proper gallery art, not a poster."',
    'testimonial2.race': 'Gift for Hamburg Marathon 2024',
    'testimonial3.text': '"Sub-3 was my goal for 5 years. When I finally did it, I knew I had to commemorate it. This print nails every detail. A treasure I\'ll keep forever."',
    'testimonial3.race': 'Munich Marathon 2024 · 2:58:37',

    // Pricing
    'pricing.label': 'Pricing',
    'pricing.title': 'Simple, transparent pricing',
    'pricing.desc': 'Choose the size that fits your wall. Every print includes full personalization.',
    'pricing.badge': 'Most Popular',
    'pricing.a3.desc': '30 × 42 cm — perfect for a desk or small wall',
    'pricing.a2.desc': '42 × 60 cm — the classic statement piece',
    'pricing.large.desc': '50 × 70 cm — go big, for the finish you earned',
    'pricing.feature1': 'Personalized with name, bib & time',
    'pricing.feature2': 'Museum-quality 200g/m² paper',
    'pricing.feature3': 'Digital proof before print',
    'pricing.feature4': 'Rolled in protective tube',
    'pricing.feature5': 'Shipped in 5 business days',
    'pricing.a3.cta': 'Order A3',
    'pricing.a2.cta': 'Order A2',
    'pricing.large.cta': 'Order 50×70',

    // CTA section
    'cta.label': 'Ready?',
    'cta.title': 'Your finish line<br>deserves a frame.',
    'cta.desc': 'Every marathon is a story of discipline, pain, and triumph. Make sure yours lives on your wall, not just in your memory.',
    'cta.primary': 'Design Your Print',
    'cta.secondary': 'Ask a Question',

    // Footer
    'footer.home': 'Home',
    'footer.how_it_works': 'How it works',
    'footer.gallery': 'Gallery',
    'footer.pricing': 'Pricing',
    'footer.contact': 'Contact',
    'footer.copy': '© 2025 Finishline Studio. All rights reserved.',

    // Product page
    'product_page.shipping_legend': 'Shipping Details',
    'product_page.field.full_name': 'Full Name',
    'product_page.field.email': 'Email Address',
    'product_page.field.street': 'Street Address',
    'product_page.field.city': 'City',
    'product_page.field.postal': 'Postal Code',
    'product_page.field.country': 'Country',
    'product_page.field.size': 'Print Size',
    'product_page.size.select': 'Select size',
    'product_page.breadcrumb_home': 'Home',
    'product_page.order_btn': 'Place Order',
    'product_page.order_note': 'Starting at <strong>€49</strong> · Free shipping over €75 · Ships in 5 days',
    'product_page.error_msg': 'Product not found. Please choose a valid product.',
    'product_page.error_back': 'Back to Products',

    // Thank you page
    'thankyou.label': 'Order Received',
    'thankyou.title': 'Thank you!',
    'thankyou.message': 'We\'ve received your order and will send a confirmation to your email shortly. Your personalized print will ship within <strong>5 business days</strong>.',
    'thankyou.back': 'Back to Home',

    // Form field labels
    'field.runner_name': 'Runner Name',
    'field.race_name': 'Race Name',
    'field.bib_number': 'Bib Number',
    'field.finish_time': 'Finish Time',
    'field.avg_pace': 'Avg Pace /km',
    'field.start_elevation': 'Start Elevation (m)',
    'field.peak_elevation': 'Peak Elevation (m)',
    'field.total_ascent': 'Total Ascent (m)',
    'field.split_times': 'Split Times (every 5 km)',
    'field.total_finish_time': 'Total Finish Time',
    'field.personal_motto': 'Personal Motto',

    // Placeholders
    'placeholder.runner_name': 'e.g. Anna Müller',
    'placeholder.race_name': 'e.g. BERLIN MARATHON 2025',
    'placeholder.race_name_trail': 'e.g. ZUGSPITZ ULTRATRAIL',
    'placeholder.bib_number': 'e.g. 4219',
    'placeholder.finish_time': 'e.g. 3:42:18',
    'placeholder.finish_time_trail': 'e.g. 7:34:22',
    'placeholder.avg_pace': 'e.g. 5:16',
    'placeholder.start_elevation': 'e.g. 720',
    'placeholder.peak_elevation': 'e.g. 2962',
    'placeholder.total_ascent': 'e.g. 4400',
    'placeholder.split_input': 'e.g. 0:23:14',
    'placeholder.personal_motto': 'e.g. Pain is temporary',

    // Preview labels (used in JS-generated HTML)
    'preview.finish_time': 'Finish Time',
    'preview.avg_pace': 'Avg Pace',
    'preview.net_gain': 'Net Gain',
    'preview.start': 'start',
    'preview.peak': 'peak',
    'preview.finish': 'finish',
    'preview.total': 'Total',
    'preview.default_name': 'Your Name',
    'preview.default_race': 'MARATHON 2025',
    'preview.default_bib': '#',
  },
};

(function () {
  const DEFAULT_LANG = 'de';

  window.i18n = {
    lang: localStorage.getItem('finishline_lang') || DEFAULT_LANG,

    t(key) {
      return (TRANSLATIONS[this.lang] && TRANSLATIONS[this.lang][key])
        || (TRANSLATIONS.en[key])
        || key;
    },

    setLang(lang) {
      if (!TRANSLATIONS[lang]) return;
      this.lang = lang;
      localStorage.setItem('finishline_lang', lang);
      document.documentElement.lang = lang;
      this.applyTranslations();
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    },

    getLang() {
      return this.lang;
    },

    applyTranslations() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = this.t(el.dataset.i18n);
      });
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = this.t(el.dataset.i18nHtml);
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = this.t(el.dataset.i18nPlaceholder);
      });
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === this.lang);
      });
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = window.i18n.lang;
    window.i18n.applyTranslations();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => window.i18n.setLang(btn.dataset.lang));
    });
  });
})();
