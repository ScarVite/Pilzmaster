var config = require('../../config.json')
var locales = require('../../locales/' + config.lang + '.json')
var round = require('math-round');
var challanger
var challanged
var turn1
var turn2
var turn3
var turn4
var turn5
var rwords = ["abendessen", "abenteuer", "aber", "abfall", "abflachen", "abhängig", "abnehmbar", "abneigung", "abnormal", "abriss", "abschnitt", "absolution", "absorbieren", "absteige", "abstinent", "abstinenz", "abstrakt", "absturz", "absurd", "absurdität", "absurditäten", "abteil", "abteilung", "abtropfen lassen", "abwasser", "abwesend", "abwesenheit", "abzeichen", "abzug", "achse", "acht", "achtung", "acid", "adler", "admiral", "adrenalin", "adresse", "adsorbierbar", "aerobatisch", "aerodynamisch", "affe", "affäre", "agenda", "agent", "agentur", "aggression", "aggressiv", "agitator", "akademie", "akademisch", "akrobat", "akrobatisch", "aktion", "akustisch", "akut", "akzeptieren", "alarm", "alarmierend", "alibi", "alkohol", "alkoholischen", "allergene", "allianz", "alligator", "allmächtig", "alphabet", "alphabetisch", "alptraum", "alt", "alter", "aluminium", "am heißesten", "am schwersten", "amateur", "ambition", "ambivalent", "ambulant", "ameisenbär", "americana", "amerikanisch", "ammoniak", "amnesiac", "amnesie", "amoralisch", "amphibie", "amplitude", "amputation", "amputieren", "amulett", "amöbe", "amöben", "amüsement", "amüsieren", "analyse", "analysieren", "analytiker", "analytisch", "ananas", "anatomie", "anbieter", "anders", "anderswo", "androgyne", "anfang", "anfänger", "angemessene", "angenehm", "angewendet werden", "angreifer", "angriff", "angst", "anhörung", "animatronic", "ankh", "ankunft", "anmutig", "annahme", "annäherung", "anomalie", "anonym", "anpassungsfähig", "anruf", "anscheinend", "ansteckend", "anständig", "antenne", "antidemokratisch", "antilope", "antilopen", "antiquität", "antiviral", "antworten", "anwendung", "anzugreifen", "apfel", "apokalypse", "apokalyptisch", "appetit", "aprikose", "aquamarin", "aquarium", "arche", "architekt", "archiv", "arm", "arme", "armee", "aroma", "arrogant", "art", "arzt", "asche", "assoziieren", "ast", "astronaut", "atem", "atemlos", "atmosphäre", "atomar", "attacke", "attentäter", "attribut", "audio-", "auf wiedersehen", "aufblasen", "aufregung", "aufräumen", "aufs neue", "aufstand", "aufteilung", "aufwachen", "aufzeichnen", "aufzug", "auge", "augen", "augenbinde", "augmentation", "auktion", "ausdruck", "ausdrucksvoll", "auseinandersetzung", "ausfahrt", "ausfallen", "ausführen", "ausgangssperre", "ausgeflippt", "ausgezeichnet", "ausländer", "ausländische", "ausnahme", "ausrede", "ausrichten", "ausrichtung", "ausrüstung", "ausschuss", "ausschweifung", "aussehen", "ausstellung", "ausstellungsstück", "austausch-", "auswählen", "authentisch", "autobahn", "automaten", "automatisch", "autonom", "autopilot", "autopsie", "avocado", "axiom", "axt", "baby", "babysitter", "bachelor", "backen", "badmouth", "bajonett", "bakterien", "balance", "bald", "balkon", "ball", "ballerina", "ballett", "ballistik", "ballistisch", "ballon", "ballsaal", "bambus", "banane", "bananen", "band", "bandsäge", "bank", "bankett", "bankroll", "bar", "barbar", "barbarisch", "barbier", "barnacle", "barnburner", "baron", "barrikade", "bart", "base", "basen", "bash", "basic", "baster", "bastion", "bataillon", "batterie", "bauch", "bauchig", "bauchschmerzen", "bauernhof", "baum", "baumwolle", "bazooka", "bearbeiten", "bearskin", "becken", "becken-", "bedauerlich", "bedauern", "bedingung", "bedrohung", "beefcake", "beerdigung", "befehl", "befestigung", "befreiend", "befreiung", "befürworten", "begabtes", "begegnung", "begleiter", "begraben", "begrifflich", "behaart", "behörde", "beidhändig", "beifall", "beil", "beißen", "beißer", "bekanntmachung", "belastung", "beleuchtung", "beliebt", "bellen", "beobachter", "berater", "berechnung", "bereich", "bereits", "berg", "bergab", "bernstein", "berserker", "berufung", "berühmt", "berühmtheit", "beschreibt", "beschreibung", "beschwerde", "beschädigung", "beschämend", "beseitigen", "beseitigung", "besetzung", "besitz", "besitzen", "besser", "beste", "bestechung", "bestehende", "bestial", "beton", "betrachter", "betrug", "betrunken", "betrügen", "betrügerische", "bett", "betteln", "bettler", "bettzeit", "betäuben", "betäubungsmittel", "beurteilung", "bewachen", "beweglichkeit", "beweis", "beweismittel", "bewerten", "bewusst", "bewährt", "bezaubert", "bibel", "biber", "biblisch", "biege", "bienenstock", "bienenwachs", "bigwig", "bikini", "bilden", "bildhaft", "billigung", "bin", "bindung", "binge", "binokular", "biologie", "biologisch", "bionischen", "bissen", "bit", "bitter", "bitterkeit", "bittersüß", "bizarr", "blabbermouth", "blackout", "blase", "blasrohr", "blass", "blaster", "blatt", "blau", "blaubeere", "blendend", "blendung", "blimp", "blind", "blindheit", "blindlings", "blinken", "blinkt", "blip", "blitz", "block", "blockade", "blocker", "blond", "bloß", "bloßknöchel", "bluff", "blume", "blumen", "blumen-", "blurt", "bluse", "blut", "bluten", "blutfleck", "blutig", "blutkreislauf", "blutrünstig", "blutsauger", "blutsport", "blutung", "bläulich", "blühen", "boa", "boden", "bodenlos", "bogen", "bogenschütze", "bohne", "bohren", "bombastisch", "bombe", "bomber", "bonus", "boom", "bootlegger", "borke", "bote", "boulevard", "boutique", "bowyer", "box", "braincase", "brandstifter", "brandstiftung", "braten", "braun", "brecher", "brennbar", "brennen", "brigade", "brille", "bringen", "bronze-", "bruder", "brunnen", "brut", "brutal", "brute", "brutto", "brücke", "buchstabieren", "buckel", "bucklige", "buffet", "bughouse", "buhmann", "bulldogge", "bulldozer", "bullwhip", "bumble", "bundesland", "bunker", "buntstift", "bär", "böse", "bürger", "bürste", "carnies", "center", "champion", "chamäleon", "chaos", "chaotisch", "charisma", "charismatisch", "charmant", "charme", "chef", "chemisch", "chillen", "chirurg", "chirurgischen", "choke", "cholera", "chromatisch", "chromosom", "chronologisch", "chunk", "cluster", "code", "cola", "collider", "computer", "container", "couch", "crackpot", "cranberry", "crasher", "crawler", "credenza", "crew", "dachboden", "dachs", "dame", "danach", "dankbar", "darsteller", "darstellerin", "darüber hinaus", "das mitleid", "daten", "daumen", "debatte", "debuggen", "decoder", "defector", "defekt", "deformer", "deformität", "degeneration", "degenerieren", "degrader", "degradierend", "dekade", "dekadent", "dekadenz", "dekodieren", "dekontamination", "delfine", "delikatesse", "delikatessen", "delle", "delphin", "demokratie", "demokratisch", "demonstration", "demut", "demütigen", "denken", "depression", "desorientierung", "destilliert", "destruktiv", "detox", "diabolatrie", "diabolisch", "diagonale", "diagramm", "diamant", "diametrisch", "dicht", "dichter", "dick", "dickkopf", "dieb", "diener", "digital", "diktator", "dilemma", "dimension", "dimensionalen", "ding", "dinosaurier", "diplomat", "diplomatie", "diplomatisch", "direkt", "direktor", "diskette", "diskussion", "distanzierung", "disziplin", "diva", "dobermann", "dokument", "dom", "dominant", "domino", "donner", "dope", "doppeldecker", "doppelt", "dorf", "dosierung", "draht", "drama", "dramatisch", "draufgänger", "dreckig", "dreieck", "drift", "drimys", "droge", "drogerie", "drohne", "druck", "drücken", "drüse", "drüsen-", "dual", "duell", "dummkopf", "dump", "dunkel", "dunstig", "duplikat", "durchfallen", "durchgreifen", "durchschnittlich", "dutzend", "dutzende", "dynamisch", "dynamit", "dynastie", "dämmerung", "dämon", "dünn", "düster", "ebene", "ebenfalls", "ebenheit", "ebenholz", "eber", "echo", "edel", "edelsteine", "efeu", "ego", "egoistisch", "egozentrisch", "ehefrau", "ehre", "ehrenamtlich", "ehrgeizig", "ehrlich", "ehrlichkeit", "ei", "eidechse", "eigensinnig", "eigentum", "eigenvektor", "einbruch", "einbruch der dunkelheit", "eindringling", "einfach", "einfacher", "einfarbig", "einfrieren", "eingang", "eingeben", "eingeweide", "einheit", "einladung", "einrichtung", "einrichtungen", "eins", "einsam", "einsamkeit", "einsiedler", "einstellbar", "eintritt", "einzelgänger", "einzelheiten", "eisen", "elastisch", "elefant", "elefanten", "elegant", "elektrische", "elektrode", "elektron", "element", "elend", "elevation", "elfenbein", "elite", "ellbogen", "emotion", "emotional", "empathisch", "empirisch", "ende", "endgültig", "endlich", "endlos", "energie", "engel", "enorm", "entdeckung", "ente", "entfernt", "entfremden", "entführer", "entführt", "entführung", "enthaupten", "enthauptung", "entladen", "entlassung", "entlüftung", "entropie", "entschlossen", "entschlüsseler", "entschuldigung", "entsetzlich", "entstehen", "entstellt", "entstellung", "enttäuschend", "entwickeln", "entwurf", "entzückend", "enzym", "erarbeiten", "erbe", "erblicken", "erdborn", "erden", "erfassung", "erfindung", "erfunden", "erhalten", "erhältlich", "erinnerung", "erleuchten", "ermordung", "ermächtigung", "ernte", "eroberer", "eroberung", "erotica", "erotisch", "erpressung", "erröten", "erscheinen", "erscheinung", "erschreckend", "erschwinglich", "ersichtlich", "erstaunlich", "erstgeboren", "ertrank", "ertrinken", "eruption", "erwachen", "erwachsene", "erweiterung", "esel", "eskapist", "esoterisch", "essen", "ethischen", "etwas", "eule", "eunuch", "evakuieren", "evakuierung", "evektional", "event", "evolution", "ewig", "ewigkeit", "exil", "existent", "exklusiv", "exorzismus", "experiment", "experte", "explizit", "explosion", "export", "expose", "exposition", "exquisit", "extern", "extra", "extrakt", "extravagant", "extrem", "extremist", "eyphone", "fabrik", "fackel", "fade", "fadenscheinig", "fahnen", "fahrrad", "fahrt", "falke", "fall", "falle", "fallen", "fallschirm", "falsch", "falten", "familie", "fanatiker", "fanatisch", "fang", "fantastisch", "farbe", "farben", "farce", "fassade", "fast", "faul", "faust", "faustkampf", "feature", "feder", "federgewicht", "federnd", "fehlen", "fehler", "fehlschlagen", "feier", "feige", "feigling", "feind", "feinde", "feindseligkeit", "feld", "fellow", "femur", "ferment", "fermentation", "fersenbein", "fertig", "fest", "festival", "festung", "festzug", "fetisch", "fett", "fett gedruckt", "fettig", "feucht", "feudal", "feuer", "feuerwaffe", "feuerwerkskörper", "feurig", "fiasko", "fiberglas", "fieber", "filament", "film", "filter", "filz", "finale", "finanziellen", "finden", "finger", "fingerspitze", "fink", "firma", "fisch", "fix", "fizz", "flackern", "flagge", "flamboyant", "flammend", "flammenwerfer", "flasche", "flattern", "flaum", "fleisch", "fleischfressend", "fleischfresser", "fleischlich", "fliege", "fliegenfalle", "flieger", "fließend", "flip", "flirt", "flitter", "flitterwochen", "flocke", "flosse", "fluch", "flucht", "flug", "flughafen", "fluktuation", "fluss", "flussabwärts", "flut", "flüchtling", "flüssigkeit", "flüstern", "fohlen", "fokus", "folge", "formale", "formel", "formulierung", "fornicator", "forschung", "fort", "fossil", "foto", "foul", "fragment", "fraktion", "fraktur", "franse", "französisch", "freak", "freakish", "freewill", "frei", "freiheit", "freisetzung", "frequenz", "fressend", "freude", "freund", "friedhof", "frisch", "friseur", "fromm", "frosch", "frost", "fruchtbar", "fruchtbarkeit", "frustration", "frösche", "früh", "fummelei", "funkeln", "funktionell", "furchtbar", "furchterregend", "furchtlos", "futuristisch", "fuzzy", "fuß", "fuß arbeit", "fähigkeit", "fähigkeiten", "fällt", "fälscher", "fälschung", "föderal", "föderation", "förderung", "füchsin", "fühlen", "führen", "führungskraft", "fünf", "fürchten", "füttern", "füßen", "gabel", "gadget", "galaktisch", "galerie", "galionsfigur", "galoppierend", "gang", "gangland", "gangster", "garage", "garantiert", "gargantuan", "garnele", "garten", "gasmaske", "gasse", "gast", "gastgeber", "gaukeln", "gauner", "gazelle", "geben", "geber", "gebet", "gebogen", "geboren", "gebraten", "gebrechen", "gebrochen", "geburtsort", "geburtstag", "gebäude", "gedränge", "geduldig", "gefahr", "gefallen", "gefangen", "gefangenschaft", "gefroren", "gefräßig", "gefährlich", "gefühl", "gefühle", "gegen", "geheimnis", "geheimnisvoll", "gehen", "gehirn", "gehirnerschütterung", "gehirnwäsche", "gehorchen", "gehören", "geier", "geisel", "geist", "geistesabwesend", "geistig", "geistlos", "gelassenheit", "geld", "gelähmt", "gemeinschaft", "gemütlich", "genau", "genauigkeit", "general", "generation", "genetisch", "genial", "genießen", "genosse", "geometrie", "geometrisch", "geplanter termin", "gerechtigkeit", "gerinnen", "gerissen", "gerät", "geräte", "gesamt", "gesang", "geschenk", "geschichte", "geschicklichkeit", "geschirr", "geschlagen", "geschlechtslos", "geschmack", "geschmolzen", "geschwindigkeit", "geschwollen", "geschäft", "geschütze", "gesellschaft", "gesicht", "gespenstisch", "gestischen", "gestrahlt", "gesund", "getränk", "gewagt", "gewalt", "gewehr", "gewohnheit", "gewohnheitsmäßig", "gezackt", "ghetto", "ghul", "gier", "gierig", "gift", "giftig", "giftmörder", "gilde", "gitter", "glamourös", "glanz", "glas", "glatt", "glauben", "glaubhaft", "glazial", "gleich", "gleichung", "gleichwertig", "gletscher", "glimmer", "glitzernd", "global", "glocke", "glänzend", "gläubige", "glück", "glücklich", "glückselig", "glückseligkeit", "glühen", "gold", "goldbricker", "goldfisch", "golf", "goofball", "gorilla", "gott", "gottheit", "gottlos", "gouverneur", "grab", "grabbing", "graben", "gradient", "graffiti", "grafik", "grammophon", "granate", "grandios", "granit", "granularität", "grappler", "gras", "grau", "grausam", "grausamkeit", "greif", "greifen", "grenze", "grenzenlos", "griff", "grill", "grimmig", "grinsen", "grinsend", "grizzly", "groovig", "grotesk", "groß", "großartig", "großartigkeit", "großer kopf", "großer mund", "grund", "grundlegend", "grundlinie", "grundstück", "grundwellen", "grunzen", "gruppe", "gruselig", "gräuel", "gräueltat", "gräueltaten", "größte", "größten", "grün", "gründen", "gründer", "guerilla", "guillotine", "gummi", "gunk", "gunplay", "gunrunner", "gurgeln", "guru", "gut", "gutsy", "gymnastik-", "gänseblümchen", "göttlich", "günstig", "gürtel", "hacken", "hafen", "haftung", "hager", "hai", "haken", "halb", "halle", "halloween", "halluzination", "hals", "halsband", "halt", "halten", "haltung", "hammerkopf", "hamster", "hand", "handler", "handschuhe", "handsäge", "hantel", "harmlos", "harmonie", "harmonisch", "harplike", "harpune", "hart", "hase", "hash", "hass", "haube", "haunting", "haupt", "hauptsitz", "haus", "hausgast", "hausgemacht", "haut", "haywire", "heartsick", "heben", "heftig", "heidnisch", "heilen", "heiler", "heilig", "heilige", "heiligsten", "heilung", "heimat", "heimatstadt", "heimweh", "heisser", "heist", "heiter", "heizung", "heiß", "hektisch", "held", "helden", "hell", "hellseher", "helm", "hengst", "henker", "herausforderung", "herde", "heroisch", "herold", "herr", "herrlich", "herrschaft", "herstellung", "herumtreiber", "hervorrufen", "herz", "herz gebrochen", "herzen", "herzlos", "herzog", "herzschlag", "heulen", "heuschrecke", "hexe", "hickory", "hilfe", "hilflos", "hilfs-", "himbeere", "himmel", "himmel und hölle", "hinter", "hintergrund", "hinterhalt", "hinterhof", "hirsch", "hirsute", "hissen", "historische", "hit", "hitze", "hitzkopf", "hitzschlag", "hoaxer", "hobby", "hoch", "hoffnung", "hoffnungslos", "hogtied", "hogwash", "hohl", "hohlheit", "hohlraum", "holdup", "honig", "honigbiene", "honigtau", "honigtopf", "hoodwink", "hoopla", "hop", "horizont", "horizontal", "hormonell", "horn", "horoskop", "horror", "hotel", "hubschrauber", "huf", "hufe", "huffy", "hund", "hunde", "hundert", "hundzahn", "hunger", "hungrig", "hure", "husten", "hut", "hybrid", "hymne", "hype", "hypnotisch", "hyäne", "häftling", "hähnchen", "hälfte", "hände", "hässlich", "häufig", "häuptling", "häuslich", "höflich", "höhepunkt", "höhle", "hölle", "höllenfeuer", "hören", "hüftknochen", "hügel", "hürde", "hütte", "ideal", "identisch", "identität", "ignorant", "illegal", "im stadtzentrum", "imaginär", "imker", "immer", "immunität", "implantieren", "imposter", "impressum", "impuls", "in der nähe von", "industrie", "industriellen", "ingwer", "inhalt", "initiale", "innenstadt", "innere", "insekt", "insel", "intern", "intim", "intrigant", "irgendein", "irgendjemand", "irgendwo", "islamismus", "jade", "jagd", "jahrhundert", "jeden", "jeden tag", "jeder", "jemand", "jerid", "joypop", "joystick", "jugendlich", "junger", "jungfrau", "junior", "juwel", "jäger", "jährlich", "kabel", "kahl", "kaiser", "kalender", "kalibrierung", "kalt", "kamel", "kammer", "kampf", "kanal", "kandidat", "kannibale", "kannibalismus", "kanone", "kapitel", "kapitelhaus", "kapitän", "kapsel", "karamell", "kardinal", "karibu", "karkasse", "karmesinrot", "karneval", "karotte", "kartell", "kasino", "kasse", "katastrophe", "kategorie", "kater", "katze", "kaubar", "kauderwelsch", "keim", "keller", "keramik", "kerl", "kerze", "kette", "ketzer", "ketzerisch", "kick", "kies", "kiesig", "killjoy", "kind", "kinder", "kindisch", "kirche", "kirsche", "klaffend", "klappe", "klappentext", "klappmesser", "klar", "klasse", "klassisch", "klatsch", "klaue", "klebrig", "klebstoff", "klecks", "klee", "kleid", "klein", "klinge", "klingen", "klinik", "klobig", "klubhaus", "klug", "klumpen", "klumpfuß", "knackig", "knall", "knautschig", "knirschen", "knochen", "knoten", "knuddelig", "knurren", "knusprig", "knöchel", "knüppel", "kobra", "koch", "kognitiv", "kohle", "kohlenstoff", "kojoten", "kokon", "kokosnuss", "kollidieren", "kollision", "kolonie", "koma", "komatös", "komet", "komisch", "kommando", "kommerziell", "kommunikation", "kompakt", "komplett", "komplize", "kompliziert", "konfiguration", "konflikt", "konfrontiert", "konkav", "konservativ", "konsole", "konstante", "kontamination", "kontinental", "kontinuierlich", "kontrast", "kontrollpunkt", "konversation", "konvext", "konvulsion", "konzept", "konzert", "kopf", "kopfhörer", "kopfschmerzen", "korb", "kord", "korn", "korrelation", "korrosion", "korruption", "kortex", "kosmetik", "kosmisch", "kosmonaut", "kostenpflichtig", "kostüm", "kostümiert", "kot", "koteletts", "krabbe", "krabben", "kraft", "kraftvoll", "krank", "krankenhaus", "krankenschwester", "krankenwagen", "krankheit", "krapfen", "krater", "kraut", "kreativ", "kreatur", "krebserzeugend", "kreide", "kreierung", "kreis", "kreisen", "kreuzfahrer", "kreuzfahrt", "kreuzfeuer", "kreuzigung", "kricket", "kriechen", "kriechpflanze", "krieg", "krieger", "kriegszeit", "kriminalität", "kriminellen", "krise", "kristall", "kritisch", "krokodil", "krone", "krumm", "kruste", "kruzifix", "krypta", "kryptisch", "krücke", "kugel", "kultivieren", "kulturelle", "kunst", "kunststoff", "kupfer", "kuppel", "kurator", "kuriositäten", "kurve", "kurz", "kurzlebig", "kuscheln", "kybernetisch", "käfig", "kämpfer", "känguru", "kätzchen", "köder", "könig", "königin", "königlich", "königreich", "körnig", "körper", "köstlich", "kühe", "kühl", "kühn", "kühnheit", "künstler", "künstlich", "kürzlich", "küssen", "küste", "küsten", "ladung", "land", "landschaft", "lange", "laser-", "lasso", "lastkahn", "laterne", "lavendel", "leben", "leber", "lecken", "leder", "leer", "leere", "legende", "legendär", "legion", "leguan", "lehm", "leiche", "leichenwagen", "leichtsinnig", "leidenschaft", "lenker", "letzte", "leuchtend", "leuchtfeuer", "liberale", "licht", "licker", "liebe", "liebeskind", "liebhaber", "lied", "likör", "lila", "limette", "limousine", "linear", "link", "links", "lizenzgebühren", "lockbox", "lodern", "logik", "logisch", "lotterie", "luft", "luftdicht", "luftraum", "luftschiff", "luke", "lurker", "lust", "lustig", "lutscher", "luxuriös", "luxus", "lächeln", "lähmung", "ländereien", "lärm", "löcher", "löffel", "löschen", "lösegeld", "lötlampe", "löwe", "lüster", "mach weiter", "machtlos", "magie", "magnet", "magnetisch", "mahlen", "makaber", "makel", "makellos", "mandel", "mantel", "marginal", "maria", "marienkäfer", "marionette", "marke", "marmor", "martingale", "martini", "maschine", "maske", "massaker", "massiv", "mauer", "maximal", "mechanisch", "medizin", "meduse", "meerrettich", "megacity", "mehr", "mehrdeutig", "mehrere", "meister", "meißel", "melodie", "menge", "menschenähnlich", "menschlich", "menschlichen", "messias", "messing-", "metall", "metallisch", "metzger", "milchig", "militär-", "milliarde", "milliardär", "minimal", "minipille", "mischen", "mischling", "mischung", "missbrauch", "missbräuchlich", "mission", "mitfühlend", "mixer", "mob", "mode", "modell-", "modern", "modisch", "mohawk", "molekular", "moment", "monarchie", "mond", "mondstrahl", "morbid", "mord", "motor", "motte", "mund", "munition", "munter", "muschel", "muskel", "muskelmann", "muskulös", "muster", "mut", "mutagen", "mutant", "mutation", "mutig", "mutter", "muttermal", "mystisch", "mythisch", "mächtig", "mächtigsten", "märchen", "märtyrer", "mörder", "mörderisch", "nabel", "nach", "nach dem leben", "nach der welt", "nach hause", "nach unten", "nachbeben", "nachgeschmack", "nachmittag", "nacht-", "nachwirkungen", "nackt", "nadel", "nagetier", "nahansicht", "naiv", "narbe", "nass", "national", "natürlich", "nebel", "neblig", "negativ", "nekrotisch", "nektar", "neon-", "nerv", "nervig", "nervös", "nett", "neu", "neugierig", "neunzehn", "neurotisch", "niedergeschlagen", "niedlichkeit", "niedrig", "nilpferd", "nitro", "noir", "noisemaker", "nomade", "nomadisch", "norden", "norm", "normal", "notfall", "nuklearen", "null", "numbskull", "numerisch", "nummer", "nutzlos", "nördlich", "obdachlos", "oben", "oberst", "objekt", "obsession", "obstgarten", "ochse", "offen", "offenlegung", "offiziell", "offizier", "ohne freunde", "ohnmacht", "ohr", "omnivore", "operieren", "opposition", "optimum", "optional", "orang-utang", "orange", "ordnungsgemäß", "original", "original-", "ort", "orthodox", "osten", "ozean", "paar", "paket", "pandemie", "panik", "panzer", "papagei", "papier-", "parade", "paradies", "paradiesisch", "paradox", "parallel", "parasit", "parasitär", "parfüm", "passagier", "paste", "pastoral", "patrouillieren", "pavian", "peepshow", "pein", "peinlich", "peitsche", "pelzigen", "pension", "perfekt", "perfektion", "periodisch", "perkussiv", "perle", "perlen", "persönlich", "pervertieren", "pervertiert", "perücke", "pessimist", "pest", "pfefferminze", "pfeil", "pfeile", "pferd", "pferde", "pferdestärken", "pfirsich", "pflanze", "pflaster", "pflegekraft", "pfund", "phantom", "pharao", "phase", "philosophie", "phonetisch", "phänomenal", "phänomenen", "picknick", "pigsticker", "pilger", "pille", "pilot", "pilz", "pinguin", "pinwheel", "pistole", "plaid", "planet", "planeten", "plantage", "plappern", "plasma", "platz", "plötzlich", "plüsch-", "pneumatisch", "pochen", "pocken", "poesie", "poetisch", "polar-", "pony", "portal", "porträt", "position", "positiv", "potenzial", "power", "pragmatisch", "prahlerei", "praktisch", "prall", "prallen", "primas", "primitive", "primzahl", "prise", "privatgelände", "privileg", "privilegiert", "produktion", "profil", "prognose", "programm", "projekt", "projektion", "propaganda", "propeller", "prophet", "propheten", "prophetisch", "prophezeien", "protest", "präsident", "prüfer", "psycho", "publikum", "puffer", "pulver", "puma", "punkt", "puppe", "puzzle", "pyramiden", "python", "qual", "quanten", "quatsch", "quelle", "quälend", "rabe", "rache", "radiergummi", "rage", "rahmen", "raid", "ranch", "rand", "randalieren", "rat", "ratte", "raub", "raubtier", "rauch", "rauh", "raupe", "rauschmittel", "rebell", "recht", "rechte", "regen", "regenfall", "regionaler ebene", "regler", "reich", "reif", "rein", "reinigen", "reiseführer", "reißverschluss", "reptil", "republik", "resorbierbar", "revolte", "richtlinie", "richtung", "riegel", "riese", "riesig", "rille", "rinder", "rinder-", "ring", "rinne", "rippe", "riskant", "riss", "rivale", "roboter", "roh", "rohr", "rohrleitungen", "rolltreppe", "rosa", "rose", "rost", "rot", "rowdy", "rubin", "ruhm", "rum", "runden", "rutschig", "rächen", "rätsel", "räuber", "räuberisch", "rückgrat", "rückseite", "rückwärts", "rückzug", "rührgerät", "rüstung", "sabotage", "sachen", "sachlich", "sadistisch", "saft", "salz", "salzig", "samen", "sammelbar", "sammlung", "sand", "sanitär", "sardellen", "sarg", "sauer", "saufen", "scanner", "schaden", "schall-", "schalter", "schaltung", "schaltungen", "schamane", "scharf", "scharnier", "schatten", "schatulle", "schatz", "schaum", "scheibe", "scheidung", "scheinen", "schema", "scherz", "scheune", "scheunenhof", "scheußlich", "schick", "schicksal", "schierling", "schlacht", "schlachtfeld", "schlachthof", "schlaf", "schlafend", "schlag", "schlagen", "schlagzeug", "schlange", "schlangenmensch", "schlau", "schlauch", "schlecht", "schleich", "schleife", "schleifen", "schleifer", "schleifmittel", "schließen", "schließlich", "schloss", "schlucht", "schlupfloch", "schlussfolgerung", "schläfrig", "schläger", "schlüssel", "schlüsselbein", "schmelze", "schmerz", "schmerzen", "schmerzlos", "schmerzmittel", "schmiermittel", "schmuck", "schmuggler", "schmutz", "schmutzig", "schnabel", "schnauze", "schnecke", "schneesturm", "schneiden", "schnell", "schnitzer", "schnurrbart", "schnüre", "schock", "schockierend", "schreck", "schrecken", "schrecklich", "schrei", "schreien", "schrotflinte", "schrott", "schrottplatz", "schuld", "schuldig", "schurke", "schutz", "schwach", "schwamm", "schwarm", "schwarz", "schwarze liste", "schwarzes herz", "schwarzes wasser", "schweben", "schwefel", "schweigen", "schwein", "schweinefleisch", "schweiß", "schwer", "schwerelos", "schweren herzens", "schwergewicht", "schwerkraft", "schwerverbrecher", "schwindler", "schwindlig", "schwärze", "schädel", "schäkel", "schätzen", "schön", "schönheit", "schöpfer", "schüchtern", "schüler", "schützen", "sechs", "seele", "seestern", "segelflugzeug", "segeltuch", "segen", "segnen", "sehr klein", "sein", "seitenschau", "seitwärts", "sektor", "selten", "seltsam", "sendung", "sentinel", "serie", "serum", "sessel", "sex", "sexiest", "sexuell", "shag", "shake", "show", "sich auflösen", "sich unterhalten", "sicherung", "sieben", "siedler", "sieg", "signal", "silber-", "sinken", "sirene", "sissy", "sitzungssaal", "skyline", "slave", "smart", "so tun als ob", "sogar", "solide", "sommersprossig", "sonde", "sonne", "sonnenaufgang", "soziale", "soße", "spalte", "spatz", "speck", "spende", "sperren", "spiegel", "spiel", "spielen", "spieler", "spielerei", "spielplatz", "spielzeit", "spielzeug", "spinne", "spirituosen", "spitze", "sprengen", "springen", "sprite", "sprites", "sprudelnd", "spule", "spülen", "stacheldraht", "stadt", "stapel", "star", "stark", "start", "station", "staub", "staunen", "stealthy", "stehlen", "steif", "stein", "sterblich", "steuern", "stier", "stift", "stiftung", "stille", "stimme", "stimmung", "stoff", "stolz", "stoßen", "stoßstange", "strahl", "strahlen", "strand", "streich", "streicheln", "streichung", "streugut", "stufe", "stulpe", "stumm", "stumpf", "stumpfheit", "stunde", "städtisch", "stöhnen", "stören", "störung", "stück", "stücke", "stürze", "suave", "subsonic", "suche", "sucht", "summen", "summend", "sumpf", "super", "suppe", "surreal", "symbol", "symbolisch", "system", "szenisch", "säge", "sägemehl", "säugen", "süchtig", "süchtig machend", "süd", "süd-", "sühne", "süß", "süßer", "süßigkeiten", "tag", "tage", "tagebuch", "tageslicht", "tagsüber", "tagtraum", "tagträumer", "taktik", "taktisch", "tanzen", "tasche", "taschen", "taube", "taufe", "tausch", "tempus", "terminus", "terror", "teufel", "teuflisch", "tief", "tiefes wasser", "tiefgründig", "tier", "tierischen", "tiger", "tinte", "tintenfisch", "toben", "tochter", "tod", "todesfalle", "tolle", "tonhöhe", "tor", "tornado", "torpedo", "tortur", "tot", "totschlag", "tragbar", "tragisch", "tramper", "traube", "trauer", "trauernd", "traum", "trauma", "traumland", "traumlos", "traurig", "traurigkeit", "treed", "treibend", "treiber", "treibmittel", "treibstoff", "tremor", "trennen", "treu", "treulos", "trichter", "trocken", "trommel", "tropfen", "trostlosigkeit", "trottel", "tränengas", "tränken", "träumer", "tröpfchen", "trübe", "trümmer", "tschüss", "tuch", "turner", "tyrann", "tänzer", "täter", "täuschung", "tödlich", "tödlichkeit", "töten", "tötlich", "tür", "u-bahn", "uhr", "umarmung", "umfangreich", "umgebungs", "umgekehrt", "umkehren", "umkehrung", "umleitung", "umschlag", "umstritten", "umwandelbar", "umwandlung", "unanständig", "unaufhörlich", "unbehaart", "unbelebt", "unbeliebt", "unbesetzt", "unehrlich", "unendlich", "unfall", "unfruchtbar", "unförmig", "ungehorsam", "ungerade", "ungerechtigkeit", "ungewöhnlich", "ungläubiger", "unheimlich", "unhöflich", "union", "unrein", "unschuldig", "unsicher", "unsichtbar", "unten", "unter", "unterarm", "unterbrecher", "untergang", "unterhalten", "unterkunft", "unternehmen", "unterscheiden", "unterseeisch", "unzufriedenheit", "urlaub", "vampir", "vater", "vati", "verabscheuungswürdig", "verachtung", "verantwortlich", "verarbeiten", "verband", "verbindung", "verbindungen", "verblassen", "verboten", "verbrannt", "verbrauch", "verbraucher", "verbrechen", "verbreitet", "verbrennung", "verbundenheit", "verbündete", "verdammnis", "verdammt", "verdreht", "veredelung", "verein", "verfallen", "verflucht", "verfolgen", "verführer", "vergeben", "vergessen", "vergrößern", "verhalten", "verhexen", "verhätscheln", "verlangen", "verlassen", "verletzung", "verlierer", "verlorenheit", "verlängerung", "vermeiden", "vermindert", "vermischt", "vermutet", "vermögen", "vernichten", "verrat", "verrotten", "verrückt", "versammlung", "versand", "verschlingen", "verschlüsseln", "verschlüsselung", "verschwommen", "verschwörung", "versehentlich", "versicherung", "versprechen", "versprochen", "verstand", "versteck", "verstecken", "versteckt", "verständnislos", "verstümmelung", "versuch", "versuchen", "verteilung", "vertrag", "vertrauen", "vertraulich", "verunreinigung", "verurteilen", "verurteilt", "verwechseln", "verwechslung", "verwirrend", "verwirrt", "verwischen", "verwüsten", "verwüstung", "verzerren", "verzerrung", "verzweifelt", "verzweiflung", "vibrator", "vielfraß", "vier", "vierzig", "vinyl", "viper", "virtuell", "vision", "vogel", "volk", "vollstrecker", "volumen", "vor", "vorderseite", "vorfabrik", "vorfahr", "vorhersagen", "vorhängeschloss", "vorschlag", "vorteil", "vorübergehend", "vulkan", "vulkanischen", "völlig", "wachs", "waffe", "wagen", "wahnsinn", "wahnsinnig", "wahr", "wahrheit", "wahrnehmung", "wahrsager", "waise", "waisenhaus", "wal", "wald", "wale", "warm", "warnung", "waschbär", "wasser", "wasser-", "wasserspeier", "web", "wechseln", "weg", "wegbrechen", "weich", "weide", "weil", "weinte", "weirdo", "weise", "weisheit", "wellenbrecher", "wellenform", "welt", "weltuntergang", "wenig", "werbung", "werden", "werwolf", "wesen", "wesentlich", "wespe", "west-", "westarbeit", "western", "wettbewerb", "wette", "widerlich", "widerspruch", "wie", "wie auch immer", "wiederholen", "wiederholung", "wiederlernen", "wiege", "wiegenlied", "wiesel", "wild", "wildnis", "willkürlich", "winter", "winterschlaf", "wirklich", "wirklichkeit", "wirksam", "wissen", "wizard", "wohlhabend", "wohlwollend", "wohnung", "wohnwagen", "wolf", "wolke", "wrack", "wunder", "wunderkerze", "wunsch", "wurde", "wurm", "wurzel", "wählen", "wärme", "wölfe", "würdenträger", "würfel", "würgend", "wütend", "zahn", "zart", "zaun", "zebra", "zehn", "zehntel", "zeit", "zeitgenössisch", "zeitlos", "zelle", "zellenblock", "zellulär", "zement", "zentaur", "zentrale", "zerbrechlich", "zeremonie", "zeremoniell", "zerfall", "zerfallen", "zerkleinern", "zerquetschen", "zerrissen", "zersetzung", "zerstören", "zerstörung", "zerstückeln", "zerstückelung", "zeuge", "ziege", "ziegel", "ziehen", "ziel", "ziellos", "zierpflanzen", "zimmer", "zimt", "zinke", "zinn", "zirkus", "zischen", "zitrone", "zivilisation", "zocken", "zombie", "zoo", "zorn", "zu jeder zeit", "zubehör", "zucken", "zucker", "zuerst", "zufall", "zufällig", "zuhause", "zuhälter", "zukunft", "zukunftslos", "zulassen", "zulässig", "zunge", "zurück", "zusammenbricht", "zusammengesetzt", "zuteilung", "zuversichtlich", "zwang", "zwanghaft", "zweck", "zwei", "zweifellos", "zwietracht", "zwilling", "zwingend", "zwischen", "zwölf", "zyanid", "zyklisch", "zyklop", "zyniker", "zynisch", "zähne", "zänker", "zögern", "zünder", "ängstlich", "äther", "ätzend", "ödland", "öffentlichkeit", "öffnen", "östlich", "über", "überall", "überbringer", "übereinstimmung", "überführen", "überirdisch", "überschuss", "übertrieben"];

async function hasanswered(message) {
    while (answered) {
        if (message.guild === null) {
            if (message.member.id === challanger.id) {

            }
        }
    }
}

function shuffleWords(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

async function rpsvs(message, ) {
    message.channel.send(challanger + 'it´s your turn, write me in the dms with either 1 = rock 2 = paper 3 = scissors')
    await hasanswered(message, true) === true
}

function rpsplayer(message) {
    challanger = message.member
    challanged = message.mentions.users.first()
    message.channel.send(message.member + ' has challanged you to an game of rock paper scissors, do you accept?' + message.mentions.users.first()).then(message => {
        message.react('✅')
        message.react('❌')
        const searchft = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.mentions.users.first().id;
        };
        message.awaitReactions(searchft, { max: 1, time: 15000 }).then(collected => {
            if (collected.first().emoji.name == '✅') {
                message.channel.send('You accepted')
                rpsvs(message)
            }
            else {
                if (collected.first().emoji.name == '❌') {
                    message.channel.send(message.member + ' I´m sorry ' + message.mentions.users.first() + ' didn´t accept your duel')
                }
                else {

                }
            }
        }).catch(collected => {
            message.reply(message.mentions.users.first() + ' didn´t reply in time')
        })
    })
}

module.exports = {
    reaction: function (message) {
        var reacted = false
        var me = 593821541934825493
        message.channel.send(locales.minigames.ready).then(function (message) {
            setTimeout(function () { message.edit(locales.minigames.dice.steady) }, 5000)
            setTimeout(function () { message.edit(locales.minigames.dice.ready) }, 10000)
            setTimeout(function () { message.react("🔴") }, 10000)
            setTimeout(function () { message.edit("STOP ") }, 11000)
            //setTimeout(function () {MessageReaction.remove(message.author.id)}, 11000)
        })
        //if(message.author.id == MessageReaction.users ){
        //   message.channel.send("Good Job")
        // }
    },
    diceroll: function (message) {
        let dice = Math.floor(Math.random() * 6) + 1
        switch (dice) {
            case 1:
                message.channel.send(locales.minigames.dice.dice1, {
                    file: "https://i.ibb.co/V0ykKRN/dice1.png"
                })
                break;
            case 2:
                message.channel.send(locales.minigames.dice.dice2, {
                    file: "https://i.ibb.co/ZGPvsXL/dice2.png"
                })
                break;
            case 3:
                message.channel.send(locales.minigames.dice.dice3, {
                    file: "https://i.ibb.co/Z891FGq/dice3.png"
                })
                break;
            case 4:
                message.channel.send(locales.minigames.dice.dice4, {
                    file: "https://i.ibb.co/qNYLRMt/dice4.png"
                })
                break;
            case 5:
                message.channel.send(locales.minigames.dice.dice5, {
                    file: "https://i.ibb.co/LP9mZ4V/dice5.png"
                })
                break;
            case 6:
                message.channel.send(locales.minigames.dice.dice6, {
                    file: "https://i.ibb.co/93SZs7J/dice6.png"
                })
                break;
            default:
                message.channel.send(locales.minigames.dice.dicemessage1 + dice + locales.minigames.dice.dicemessage2)
                break;
        }
    },
    coinflip: function (message) {
        let coin = Math.floor(Math.random() * 2) + 1
        switch (coin) {
            case 1:
                message.channel.send(locales.minigames.coin.front, {
                    file: "https://i.ibb.co/6D10tCt/KM187-2002b.jpg"
                })
                break;
            case 2:
                message.channel.send(locales.minigames.coin.back, {
                    file: "https://i.ibb.co/qpwF24k/Uncirculated-Obverse-small.jpg"
                })
                break;
        }
    },
    rps: function (message, choice) {
        if (message.mentions.users.first() == undefined) {
            let cpu = Math.floor(Math.random() * 3) + 1
            // 1 = rock, 2 = paper, 3 = scissors
            switch (choice) {
                case 'r':
                    if (cpu === 1) {
                        message.channel.send('🥌 - ' + locales.minigames.rps.draw)
                    }
                    if (cpu === 2) {
                        message.channel.send('📰 - ' + locales.minigames.rps.win)
                    }
                    if (cpu === 3) {
                        message.channel.send('✂ - ' + locales.minigames.rps.loose)
                    }
                    break;
                case 'p':
                    if (cpu === 1) {
                        message.channel.send('🥌 - ' + locales.minigames.rps.loose)
                    }
                    if (cpu === 2) {
                        message.channel.send('📰 - ' + locales.minigames.rps.draw)
                    }
                    if (cpu === 3) {
                        message.channel.send('✂ - ' + locales.minigames.rps.win)
                    }
                    break;
                case 's':
                    if (cpu === 1) {
                        message.channel.send('🥌 - ' + locales.minigames.rps.win)
                    }
                    if (cpu === 2) {
                        message.channel.send('📰 - ' + locales.minigames.rps.loose)
                    }
                    if (cpu === 3) {
                        message.channel.send('✂ - ' + locales.minigames.rps.draw)
                    }
                    break;
                default:
                    message.channel.send(locales.minigames.rps.choose)
            }
        }
        else {
            rpsplayer(message)
        }
    },
    hangman: function (message) {
        var number = round(Math.random() *(3008-0)+0);
        message.channel.send(number)
        message.channel.send(rwords[number] + " ");
        var word = rwords[number].split("");
        console.log(word)
    }
}

