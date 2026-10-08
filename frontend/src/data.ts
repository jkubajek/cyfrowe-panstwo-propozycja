export type PostulateKind = 'matrix' | 'flow' | 'mission' | 'data-flow';

export type Postulate = {
  title: string;
  /** Jedno zdanie — widoczne od razu, bez rozwijania. */
  lead: string;
  essence: string;
  purpose: string;
  caveat?: string;
  /** Opcjonalny nagłówek ramki zastrzeżenia (domyślnie „Ważne zastrzeżenie”). */
  caveatTitle?: string;
  kind?: PostulateKind;
  /** Punkt z pierwotnych notatek autora, z którego wynika postulat. */
  origin?: string;
};

export type Pillar = {
  id: string;
  roman: string;
  shortTitle: string;
  title: string;
  role: string;
  summary: string;
  icon: 'network' | 'database' | 'sparkles' | 'landmark';
  postulates: Postulate[];
};

export const principles = [
  'Bezpieczeństwo, prywatność i audytowalność',
  'Odpowiedzialny właściciel, harmonogram i finansowanie utrzymania',
  'Otwarte standardy i możliwość zmiany dostawcy',
  'Publiczna ocena efektów'
];

export const pillars: Pillar[] = [
  {
    id: 'pilar-1', roman: 'I', shortTitle: 'Cyfrowe państwo', title: 'Cyfrowe państwo i interoperacyjność', role: 'Fundament',
    summary: 'Najpierw spójne reguły wymiany danych i cyfrowy przebieg całej sprawy — nie kolejna warstwa formularzy nad ręcznym procesem.',
    icon: 'network',
    postulates: [
      { title: 'Once-only', lead: 'Państwo nie pyta ponownie o dane, które już ma.', essence: 'Urząd mający podstawę prawną sam pozyskuje potrzebne informacje z rejestrów, zamiast wymagać od obywatela kolejnych zaświadczeń. Formularze są wstępnie uzupełnione, a obywatel może dane łatwo sprawdzić i poprawić.', purpose: 'Mniej powtarzalnych obowiązków po stronie obywatela i mniej ręcznej pracy po stronie urzędu.', caveat: 'Wymiana obejmuje tylko zakres danych niezbędny do załatwienia sprawy.', origin: 'Dodane po rozmowie z ekspertem — fundament dla pozostałych punktów.' },
      { title: 'Państwo API-first', lead: 'Systemy wymieniają dane przez interfejsy, a nie skany i PDF-y.', essence: 'Systemy publiczne są projektowane pod wymianę danych przez udokumentowane, ustandaryzowane interfejsy. Obejmuje to wspólne standardy danych, odpowiedzialność za ich jakość, integrację rejestrów centralnych, samorządowych i dziedzinowych oraz wymóg interoperacyjności przy nowych zakupach.', purpose: 'Dane płyną bezpiecznie między uprawnionymi systemami, a integracje stają się powtarzalne i możliwe do utrzymania.', caveat: 'API-first nie oznacza publicznego dostępu do danych osobowych — tylko kontrolowaną wymianę między uprawnionymi systemami.', origin: 'Dodane po rozmowie z ekspertem.' },
      { title: 'Cyfrowy obieg całej sprawy', lead: 'Cyfrowy jest cały proces — od wniosku do archiwum — nie tylko formularz.', essence: 'Najpierw uproszczenie procedury i usunięcie zbędnych wymogów. Potem integracja elektronicznego zarządzania dokumentacją z systemami dziedzinowymi i regułowa automatyzacja prostych, jednoznacznych spraw. W sądownictwie — pełne akta elektroniczne dostępne uprawnionym uczestnikom postępowania.', purpose: 'Koniec drukowania, skanowania i ręcznego przepisywania między systemami.', caveat: 'Automatyzacja prostych reguł (warunki A+B+C → decyzja D) nie wymaga używania AI.', origin: 'Notatki: „sądownictwo – digitalizacja akt”.' },
      { title: 'mObywatel i doręczenia bez papierowego awizo', lead: 'Pisma urzędów i sądów trafiają do jednej skrzynki elektronicznej; papierową przesyłkę można odebrać bez odręcznego podpisu.', essence: 'mObywatel i przeglądarka jako spójne kanały załatwiania spraw i sprawdzania ich statusu. Prawnie skuteczne doręczenia elektroniczne w całej administracji i wymiarze sprawiedliwości, z czytelną informacją o terminach i skutkach odbioru. Odręczny podpis znika tam, gdzie wystarcza cyfrowe potwierdzenie tożsamości. Pozostałe przesyłki papierowe można odebrać w automacie po cyfrowym uwierzytelnieniu, z właściwym dowodem doręczenia.', purpose: 'Jedna czytelna ścieżka kontaktu z państwem i mniej barier formalnych.', caveat: 'Pomoc i alternatywne kanały pozostają dostępne dla osób niekorzystających z narzędzi cyfrowych.', origin: 'Notatki: „Awizomat” — odbiór awizo przez mObywatela bez odręcznego podpisu.' },
      { title: 'Jedna dostępna historia medyczna', lead: 'Lekarz widzi potrzebną dokumentację pacjenta niezależnie od tego, gdzie powstała.', essence: 'Dokumentacja, wyniki badań i informacje o leczeniu z placówek publicznych i prywatnych są dostępne uprawnionemu personelowi w związku z leczeniem, według wspólnych standardów i obowiązków przekazywania. Dostęp jest rejestrowany, a pacjent może sprawdzić, kto korzystał z jego danych.', purpose: 'Ciągłość leczenia bez noszenia przez pacjenta dokumentów między placówkami — tak jak w dużej prywatnej sieci.', caveatTitle: 'Docelowy dostęp do historii pacjenta', caveat: 'Celem jest pełny i niezawodny dostęp do dokumentacji dla uprawnionego personelu. Architektura centralna, rozproszona lub mieszana powinna zapewniać ciągłość dostępu, aktualność danych i kontrolę uprawnień.', origin: 'Notatki: „centralizacja + cyfryzacja dokumentacji medycznej” (przeniesione z działu AI — to projekt danych, nie AI).' }
    ]
  },
  {
    id: 'pilar-2', roman: 'II', shortTitle: 'Dane', title: 'Państwo oparte na danych', role: 'Zdolność rozumienia',
    summary: 'Trwałe, utrzymywane połączenia między rejestrami, stały zespół analityczny i otwarta ścieżka dla nauki — tak, by polityka publiczna opierała się na sprawdzalnych analizach.',
    icon: 'database',
    postulates: [
      { title: 'Stała infrastruktura danych analitycznych', lead: 'Rozwinięcie ZPA z zakończonego projektu w stale zasilaną usługę państwa.', essence: 'Trwałe połączenia z danymi ZUS, MF, MRPiPS, NFZ, edukacji i innych gestorów: uzgodnione identyfikatory i formaty, reguły pseudonimizacji i kontroli dostępu, regularne aktualizowanie oraz monitorowanie jakości. Publiczny katalog dostępnych zasobów i zasad dostępu. Stałe finansowanie utrzymania, a nie tylko finansowanie projektowe.', purpose: 'Po jednorazowym podłączeniu źródła kolejne analizy korzystają z utrzymywanego połączenia, zamiast za każdym razem budować integrację od nowa.', caveat: 'Nie jest konieczna jedna centralna baza. Dane mogą pozostawać u gestorów — stałe mają być połączenia, standardy i proces aktualizacji. Stałość nie oznacza nieograniczonego dostępu.', kind: 'data-flow', origin: 'Notatki: „Prawdziwe ZPA” — integracja danych ZUS, MF, MRPiPS.' },
      { title: 'Jednostka analiz społeczno-ekonomicznych', lead: 'Stały zespół, który regularnie ocenia skutki ustaw, programów i wydatków.', essence: 'Analizy przed reformami (ex ante) i oceny ich rzeczywistych skutków (ex post). Współpraca z resortami i ośrodkami naukowymi, jawny harmonogram publikacji i metodologia. Wyniki mogą być publikowane także jako artykuły naukowe.', purpose: 'Decyzje publiczne opierają się na sprawdzalnych przesłankach i ocenie realnych skutków.', caveat: 'Publikowane są także wyniki niekorzystne dla ocenianego programu. Punkty publikacyjne nie mogą dominować nad potrzebami administracji.', origin: 'Notatki: „jednostka analityczna publikująca co najmniej jako artykuły naukowe”.' },
      { title: 'Dostęp naukowców i doktorantów', lead: 'Uczelnie pracują na pseudonimizowanych danych w bezpiecznym środowisku.', essence: 'Bezpieczne środowisko badawcze (trusted research environment) z pseudonimizowanymi mikrodanymi, zamiast pobierania baz. Jasne kryteria i terminy rozpatrywania wniosków, kontrola wyników przed wyniesieniem ze środowiska. Program współpracy z doktorantami, uczelniami i instytutami. Metodologia, kod i zagregowane wyniki publikowane, gdy to możliwe.', purpose: 'Potencjał badawczy całego środowiska naukowego zamiast jednej państwowej jednostki.', caveat: 'Dostęp badaczy uzupełnia państwową analitykę, a nie ją zastępuje.', origin: 'Notatki: „przyciągnięcie doktorantów, którzy publikowaliby w oparciu o te dane”.' }
    ]
  },
  {
    id: 'pilar-3', roman: 'III', shortTitle: 'AI publiczne', title: 'AI w sektorze publicznym', role: 'Narzędzia działania',
    summary: 'AI ma wspierać ludzi i procesy tam, gdzie wnosi jakość. Odpowiedzialność za rozstrzygnięcia i możliwość zmiany dostawcy pozostają po stronie instytucji.',
    icon: 'sparkles',
    postulates: [
      { title: 'Jednoznaczna odpowiedzialność za wdrożenia', lead: 'Jedna jednostka odpowiada za praktyczne wdrażanie AI — nie tylko za strategie.', essence: 'Centralna jednostka z mandatem, budżetem i zespołami wdrożeniowymi, współpracująca z administracją centralną, samorządami, policją, sądami, szpitalami i przychodniami. Odpowiada za wspólne komponenty, testowanie i pomoc w skalowaniu oraz mierzy rzeczywiste efekty wdrożeń.', purpose: 'Przejście od rozproszonych pilotaży do utrzymywanych, powszechnie dostępnych wdrożeń.', caveat: 'Nie musi to oznaczać nowego urzędu. Instytucje zachowują odpowiedzialność za swoje procesy, a sądy — niezależność.', origin: 'Notatki: „dedykowana jednostka od wdrażania AI” oraz „narzędzia dla wszystkich jednostek publicznych, nie tylko rządu”.' },
      { title: 'Wspólne narzędzia i najlepszy model do zadania', lead: 'Administracja wybiera model według jakości, kosztu i charakteru danych — także zagraniczny, jeśli jest najlepszy.', essence: 'Wspólne narzędzia AI dla całego sektora publicznego, bez wielokrotnego zamawiania podobnych rozwiązań. Dostęp do modeli najwyższej klasy (state of the art), także zagranicznych i komercyjnych, w zabezpieczonych warunkach; polskie modele i środowiska lokalne tam, gdzie to uzasadnione. Testy na rzeczywistych zadaniach administracji.', purpose: 'Szybsze wdrożenia i dopasowanie narzędzia do zadania, bez uzależnienia od jednego rozwiązania.', caveat: 'Dane wrażliwe nie trafiają automatycznie do zewnętrznych modeli. Zmiana modelu i dostawcy musi być realnie możliwa.', origin: 'Notatki: „jednostka powinna móc korzystać z modeli SOTA, a nie tylko on-premise stworzonych w Polsce”.' },
      { title: 'Priorytetowe zastosowania', lead: 'Administracja, legislacja, sądy, zdrowie, nadużycia i ruch drogowy.', essence: 'Matryca poniżej pokazuje klasy zadań, w których technologia może wspierać pracę instytucji. Kliknij obszar, aby zobaczyć szczegóły.', purpose: 'Skupić debatę na konkretnych problemach, a nie na samej technologii.', caveat: 'W zastosowaniach wpływających na prawa obywatela: rzeczywisty nadzór człowieka, możliwość zakwestionowania wyniku i kontrola błędów.', kind: 'matrix', origin: 'Notatki: administracja, legislacja, sądownictwo, ochrona zdrowia, nadużycia, przepisy drogowe.' },
      { title: 'Model odpowiedzialnej automatyzacji', lead: 'AI przygotowuje sprawę, człowiek zatwierdza sprawy uznaniowe i istotne.', essence: 'AI czyta i porządkuje dokumenty, sprawdza kompletność, pobiera uprawnione dane z rejestrów, wskazuje przepisy i przygotowuje projekt decyzji z uzasadnieniem. Człowiek zatwierdza przynajmniej sprawy uznaniowe lub mające istotne skutki dla obywatela.', purpose: 'Szybsze wydawanie decyzji bez przenoszenia odpowiedzialności na model.', caveat: 'Sprawy deterministyczne można automatyzować regułowo — często bez AI.', kind: 'flow', origin: 'Notatki: „szybszy proces wydawania decyzji oraz ułatwienia dla obywateli w składaniu wniosków”.' }
    ]
  },
  {
    id: 'pilar-4', roman: 'IV', shortTitle: 'Ekosystem AI', title: 'Rozwój polskiego ekosystemu AI i badań', role: 'Kompetencje i rozwój',
    summary: 'Sprawne państwo, suwerenność technologiczna i rozwój polskich firm to trzy różne cele. Trzeba je rozdzielić i każdy rozliczać osobno.',
    icon: 'landmark',
    postulates: [
      { title: 'Rozdzielenie trzech celów', lead: 'Dobra usługa, własne kompetencje i polskie firmy — każdy cel ma własne instrumenty.', essence: 'Sprawne państwo korzysta z najlepszego narzędzia. Suwerenność buduje własne modele, zbiory danych, moc obliczeniową i kompetencje. Polityka przemysłowa rozwija polskie firmy i ich własność technologiczną.', purpose: 'Każdy instrument jest rozliczany z celu, któremu rzeczywiście służy.', caveat: 'Własny model czy superkomputer nie tworzą automatycznie polskich firm — i odwrotnie.' },
      { title: 'Osobne ścieżki dla nauki i firm', lead: 'Uczelnie prowadzą badania; komercjalizacja nie jest obowiązkiem każdego grantu.', essence: 'Stabilne granty na badania podstawowe i stosowane, finansowanie zespołów naukowych i doktorantów. Odrębna ścieżka projektów rozwojowo-wdrożeniowych dla firm i konsorcjów.', purpose: 'Budowanie wiedzy w długim horyzoncie, bez sztucznego wymogu komercjalizacji.', origin: 'Notatki: „uczelnie mają prowadzić badania, a nie muszą robić komercjalizacji”.' },
      { title: 'Programy misyjne inspirowane DARPA', lead: 'Państwo finansuje rozwiązanie problemu, a nie zakup gotowego produktu — aż do wdrożenia.', essence: 'Państwo określa problem publiczny i mierzalny rezultat, nie technologię. Kilka zespołów finansowanych równolegle, kolejne etapy zależne od wyników, pilotaż na realnych danych, niezależna ocena. Odbiorca i ścieżka finansowania wdrożenia są wskazane już na starcie.', purpose: 'Doprowadzić rozwiązanie dalej niż do efektownego demonstratora.', caveat: 'Zgodnie z zasadami konkurencji, zamówień i pomocy publicznej. Udany prototyp nie oznacza automatycznego zamówienia bez warunków — ani końca bez perspektywy wdrożenia. Zamknięcie nierokującego projektu to nie nieprawidłowość.', kind: 'mission', origin: 'Notatki: „nie przetarg, lecz pieniądze na badania i rozwój” oraz „projekty à la DARPA i umowy ostateczne z najlepszymi”.' },
      { title: 'Budowa polskich firm technologicznych', lead: 'Ekosystem AI z polskim kapitałem, zdolny do sprzedaży także za granicą.', essence: 'Łatwiejszy udział startupów i MŚP, dostęp do infrastruktury obliczeniowej, danych testowych i pilotaży, wsparcie własnych modeli i zbiorów danych tam, gdzie przynosi to wartość. Zasady IP pozwalają firmie rozwijać produkt, a państwu używać go, utrzymywać i zmieniać wykonawcę.', purpose: 'Droga: prototyp → wdrożenie publiczne → produkt komercyjny → eksport.', caveat: 'Instrumenty zgodne z prawem — nie bezwarunkowe wykluczanie wykonawców zagranicznych.', origin: 'Notatki: „zainicjowanie ekosystemu AI z polskim kapitałem” i „narzędzia budowane w oparciu o polskie firmy”.' },
      { title: 'Mniej biurokracji, więcej jawności', lead: 'Rozliczamy etapy i rezultaty, a dane o finansowaniu są jawne dla każdego.', essence: 'Proporcjonalne wymagania we wnioskach i sprawozdaniach. Jawne informacje o beneficjentach, kwotach, kryteriach wyboru, postępach i wynikach ocen — czytelne dla obywatela i dostępne do automatycznej analizy.', purpose: 'Rozproszona kontrola społeczna zamiast rozliczania drobnych czynności.', caveat: 'Jawność nie zastępuje kontroli konfliktów interesów, jakości i finansów. Chronione pozostają dane osobowe i uzasadnione tajemnice przedsiębiorstwa.', origin: 'Notatki: „zmniejszenie biurokracji w zamian za pełną transparentność”.' }
    ]
  }
];

export const applications = [
  { title: 'Administracja', text: 'Pomoc obywatelom w przygotowaniu wniosków, sprawdzanie kompletności dokumentów, analiza akt, wyszukiwanie podstaw prawnych i przygotowanie projektów pism. Cel: mniej pracy ręcznej i krótszy czas obsługi.' },
  { title: 'Legislacja', text: 'Wykrywanie niespójności, błędnych odesłań i konfliktów między przepisami; analiza zmian i uwag z konsultacji; wsparcie przygotowania projektów oraz ocen skutków regulacji.' },
  { title: 'Sądy', text: 'Transkrypcja i anonimizacja, porządkowanie akt i chronologii sprawy, wyszukiwanie orzecznictwa, wsparcie przygotowania dokumentów — bez przekazywania AI odpowiedzialności za orzekanie.' },
  { title: 'Zdrowie', text: 'Podsumowanie historii pacjenta dla lekarza, identyfikowanie ryzyk i luk profilaktycznych, wskazywanie badań zgodnie z zatwierdzonymi wytycznymi, wsparcie diagnostyki po walidacji klinicznej.' },
  { title: 'Nadużycia w ochronie zdrowia', text: 'Wykrywanie anomalii w rozliczeniach, receptach i świadczeniach oraz typowanie przypadków do kontroli — analogicznie do analityki KAS. Z oddzieleniem błędów i uzasadnionych odstępstw od podejrzeń nadużycia.' },
  { title: 'Ruch drogowy', text: 'Automatyczna detekcja (computer vision) niezachowania odstępu, niedozwolonego wyprzedzania i zmiany pasa; zabezpieczenie materiału dowodowego i możliwie automatyczny przepływ sprawy do postępowania. Skuteczność i błędy weryfikowane przed rozszerzeniem skali.' }
];

export const dataInfrastructureFlow = ['Rejestry gestorów (ZUS, MF, MRPiPS, NFZ…)', 'Stałe połączenia i wspólne standardy', 'Pseudonimizacja i kontrola dostępu', 'Stale zasilane środowisko analityczne', 'Kolejne analizy i badania'];
export const automationFlow = ['AI czyta i porządkuje', 'Sprawdza kompletność', 'Pobiera uprawnione dane', 'Wskazuje przepisy', 'Przygotowuje projekt', 'Człowiek zatwierdza'];
export const missionFlow = ['Problem publiczny', 'Kilka konkurencyjnych zespołów', 'Kolejne etapy wg wyników', 'Pilotaż na realnych danych', 'Niezależna ocena', 'Zakup i wdrożenie'];

export const serviceFlow = [
  { title: 'Obywatel składa wniosek', pillar: 'I', detail: 'Spójny kanał (mObywatel lub przeglądarka) prowadzi przez sprawę i nie przerzuca na obywatela wiedzy o strukturze administracji.' },
  { title: 'Dane płyną przez API', pillar: 'I', detail: 'Formularz jest wstępnie wypełniony wyłącznie uprawnionymi, niezbędnymi danymi. Obywatel może je sprawdzić i poprawić.' },
  { title: 'Sprawa płynie cyfrowo', pillar: 'I', detail: 'Uproszczony proces przechodzi między systemami bez drukowania, skanowania i ręcznego przepisywania.' },
  { title: 'AI wspiera urzędnika', pillar: 'III', detail: 'Narzędzia porządkują materiał i przygotowują projekt, ale nie przejmują odpowiedzialności w sprawach istotnych lub uznaniowych.' },
  { title: 'Decyzja jest doręczona', pillar: 'I', detail: 'Dokument trafia prawnie skutecznym kanałem cyfrowym, z zachowaniem alternatywnej ścieżki dla osób jej potrzebujących.' },
  { title: 'Polityka jest oceniana', pillar: 'II', detail: 'Zagregowane, pseudonimizowane dane pozwalają sprawdzić działanie usługi i skutki polityki publicznej.' }
];

export const theses = [
  'Państwo nie pyta dwa razy o te same dane.',
  'Systemy wymieniają dane, a nie PDF-y.',
  'Cyfryzowany jest cały proces, nie tylko formularz.',
  'Analizy państwa i nauki korzystają ze stale zasilanej infrastruktury danych.',
  'AI jest narzędziem, nie celem — i nie zastępuje odpowiedzialności człowieka.',
  'Finansowanie prowadzi od badania do rzeczywistego wdrożenia i produktu.'
];

/** Jak pierwotne notatki przełożyły się na program — ślad decyzji, bez nowych tez. */
export const evolution = [
  { from: 'AI Implementacja (w tym dokumentacja medyczna)', to: 'Dokumentacja medyczna przeniesiona do filaru I — to najpierw dane i interoperacyjność, AI korzysta z nich później.', pillar: 'I / III' },
  { from: '„Prawdziwe ZPA”', to: 'Stała infrastruktura danych analitycznych + stała jednostka analiz + dostęp naukowców. Nacisk na trwałość usługi, nie na ocenę dotychczasowego projektu.', pillar: 'II' },
  { from: 'Awizomat', to: 'Jedna skrzynka prawnie skutecznych doręczeń dla administracji i sądów oraz odbiór papierowych przesyłek w automacie bez odręcznego podpisu.', pillar: 'I' },
  { from: 'Niepodpisywanie umów w trybie przetargu', to: 'Programy misyjne à la DARPA z zapewnioną ścieżką do zakupu i wdrożenia — w zgodzie z prawem zamówień.', pillar: 'IV' },
  { from: 'Modele SOTA + budowa własnych modeli', to: 'Rozdzielone: wybór najlepszego modelu do zadania (III) oraz budowa polskich kompetencji i firm (IV).', pillar: 'III / IV' },
  { from: 'Brak w notatkach', to: 'Dodane: once-only i API-first jako fundament całego programu.', pillar: 'I' }
];
