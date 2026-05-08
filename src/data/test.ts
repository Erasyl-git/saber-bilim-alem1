export type TestQuestion = {
  q: string;
  options: string[];
  answer: number;
};

export const testQuestions: TestQuestion[] = [
  { q: "CMS дегеніміз не?", options: ["Контентті басқару жүйесі", "Компьютер бағдарламасы", "Желілік протокол", "Браузер"], answer: 0 },
  { q: "WordPress қандай тілде жазылған?", options: ["Python", "PHP", "Java", "Ruby"], answer: 1 },
  { q: "SSL сертификатының мақсаты?", options: ["Дизайн", "Деректерді шифрлау", "SEO рейтинг", "Жылдамдық"], answer: 1 },
  { q: "Tilda-ның еркін редакторы қалай аталады?", options: ["Free Editor", "Zero Block", "Pro Block", "Open Editor"], answer: 1 },
  { q: "Drupal-да шаблондау тілі?", options: ["Twig", "Blade", "Smarty", "EJS"], answer: 0 },
  { q: "Wix-те мобильді нұсқаны қайдан өңдейді?", options: ["Settings", "Mobile View батырмасы", "Plugins", "Бөлек сайт"], answer: 1 },
  { q: "Favicon өлшемі қанша?", options: ["64×64", "128×128", "16×16 және 32×32", "256×256"], answer: 2 },
  { q: "Адаптивті дизайн неден басталады?", options: ["Desktop-first", "Mobile-first", "Tablet-first", "Print-first"], answer: 1 },
  { q: "OWASP Top 10 не?", options: ["Дизайн стилі", "Қауіпсіздік қаупінің тізімі", "Браузер тізімі", "CMS тізімі"], answer: 1 },
  { q: "Squarespace қай елде құрылған?", options: ["Германия", "АҚШ", "Жапония", "Канада"], answer: 1 },
  { q: "Тегін SSL сертификатын кім береді?", options: ["Google", "Let's Encrypt", "Cloudflare ғана", "AWS"], answer: 1 },
  { q: "WordPress әкімшілік панелі қайда?", options: ["/admin", "/wp-admin", "/login", "/dashboard"], answer: 1 },
  { q: "Плагин файлдарын қайда сақтаймыз?", options: ["wp-content/plugins", "wp-includes", "wp-admin", "root"], answer: 0 },
  { q: "F-pattern не білдіреді?", options: ["Қаріп түрі", "Көздің оқу үлгісі", "Файл форматы", "Фотошоп құралы"], answer: 1 },
  { q: "Веб-дизайнның негізгі түсі қандай эмоция тудырады? (көк)", options: ["Сенім", "Қауіп", "Аштық", "Жабайылық"], answer: 0 },
  { q: "Drupal қай жылы пайда болды?", options: ["1995", "2001", "2005", "2010"], answer: 1 },
  { q: "Vue/Velo Wix-те не үшін?", options: ["JavaScript кодтау", "SEO", "Хостинг", "Аналитика"], answer: 0 },
  { q: "Statikalik сайт қалай жұмыс істейді?", options: ["Сервер ДБ-дан жинайды", "Дайын HTML беріледі", "Тек JS", "Тек CSS"], answer: 1 },
  { q: "DDoS шабуылы не істейді?", options: ["Парольді ұрлайды", "Сұраныстармен басады", "ДБ-ны жояды", "Сайт құрады"], answer: 1 },
  { q: "Twig — бұл...", options: ["ДБ", "Шаблондау тілі", "Сервер", "CMS"], answer: 1 },
  { q: "Cloudflare қандай қызмет?", options: ["CMS", "CDN/WAF", "Дизайн құралы", "ДБ"], answer: 1 },
  { q: "Logo SVG форматының артықшылығы?", options: ["Кіші файл", "Кез келген өлшемде анық", "Тек анимация", "Қара ғана"], answer: 1 },
  { q: "Тегін қаріптерді қайдан табамыз?", options: ["Microsoft Word", "Google Fonts", "Photoshop", "Wix"], answer: 1 },
  { q: "Wireframe — бұл...", options: ["Соңғы дизайн", "Сайттың сұлбасы", "Код", "ДБ"], answer: 1 },
  { q: "WP-CLI не үшін?", options: ["Дизайн", "Команда жолынан WP басқару", "ДБ оптимизация", "Хостинг"], answer: 1 },
  { q: "DNS не істейді?", options: ["Дизайн жасайды", "Доменді IP-ге айналдырады", "Шифрлайды", "Сайт құрады"], answer: 1 },
  { q: "Headless CMS дегеніміз?", options: ["Тек админка, фронт жеке", "Тек фронт", "Жоқ CMS", "Қара тақырып"], answer: 0 },
  { q: "Алтын қима пропорциясы?", options: ["1:2", "1:1.618", "1:1", "2:3"], answer: 1 },
  { q: "Tilda қандай экспорт ұсынады?", options: ["PHP", "HTML", "EXE", "ISO"], answer: 1 },
  { q: "Backup стратегиясы 3-2-1 нені білдіреді?", options: ["3 көшірме, 2 тасушы, 1 оффлайн", "3 күн", "3 сайт", "Жай ереже жоқ"], answer: 0 },
];
