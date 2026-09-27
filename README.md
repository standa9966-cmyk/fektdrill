# TechQuizz

Od studentů, pro studenty. Web na procvičování testových otázek z předmětů na FEKT VUT, otevřený k doplňování komukoliv.

Bez registrace, bez poplatků.

## Co web nabízí

Sbírku otázek ze zkoušek, zápočtových testů a cvičení, přehledně seřazenou po předmětech, s vysvětlením u každé odpovědi. Dva režimy procvičování — Procházet (všechny otázky se správnými odpověďmi) a Drill (interaktivní test).

## Aktuální předměty

| Předmět | Zaměření | Testy |
|---|---|---|
| BPC-UKB | Základy kybernetiky | 1 |
| BPC-FY1 | Fyzika 1 — mechanika, elektrostatika, magnetismus | 2 |
| BPC-FY2 | Fyzika 2 — optika | 1 |
| BPC-MVE | Elektrická měření | 8 |
| BPC-EL1 | Elektrotechnika 1 | 1 |
| BPC-KOM | Počítačové sítě | 1 |
| BPC-MPE | Materiály pro elektrotechniku | 1 |
| Elektrotechnická kvalifikace | Bezpečnost práce a první pomoc (§4 NV 194/2022 Sb.) | 1 |

Seznam se průběžně rozšiřuje.

## Jak přispět

Nemusíš umět Git ani mít nainstalované žádné nástroje — stačí prohlížeč.

**Úprava přímo na GitHubu (funguje i bez znalosti Gitu):**

1. Otevři soubor, který chceš upravit (např. `MVE_test1.json` nebo `index.html`) v repozitáři na GitHubu.
2. Klikni na ikonu tužky vpravo nahoře ("Edit this file").
3. Uprav text — oprav chybu v otázce, přidej novou otázku do pole `questions`, nebo uprav cokoliv jiného.
4. Dole na stránce vyplň krátký popis změny a klikni na **"Propose changes"**.
5. GitHub automaticky vytvoří kopii (fork) a návrh změny (pull request) za tebe — nemusíš nic dalšího nastavovat.
6. Návrh se odešle majiteli repa ke schválení. Po zkontrolování se změna promítne na web.

**Přidání celého nového testu:** stejným postupem vytvoř nový `.html` soubor (tlačítko "Add file" → "Create new file"), zkopíruj formát z jiného souboru (např. bpc-kom), a jen uprav název souboru / testu a otázky. Nakonec přidej odkaz na kartu do `index.html`.

**Pokud ani tohle nechceš řešit:** nahraj `.json` přímo na webu (upload na hlavní stránce, zůstane jen u tebe v prohlížeči), nebo pošli podklady (screenshoty, word dokumet) k ručnímu zpracování.

## Formát dat

```json
{
  "subject": "Předmět a test",
  "questions": [
    {
      "question": "Text otázky?",
      "answers": ["Možnost A", "Možnost B", "Možnost C"],
      "correct": 0,
      "answer_count": 3,
      "image_name": null,
      "explanation": "Proč je správná odpověď A."
    }
  ]
}
```

`correct` je index správné odpovědi (0 = první). `image_name` se vyplňuje jen pokud otázka vyžaduje obrázek — soubor pak musí být ve složce `images/`.

## Upozornění

Obsah slouží k procvičování, není náhradou oficiálních studijních materiálů. Otázky pocházejí z přepisu zkoušek předchozích ročníků — obsah předmětu, vyučující i legislativa se mohou v čase změnit, aktuální stav si ověř podle materiálů k předmětu.

Pokud narazíš na obsah, který by tu z autorskoprávních důvodů neměl být, napiš — řešíme okamžitě (viz [Ochrana soukromí](privacy.html)).

## Provoz

Web je financován z dobrovolných příspěvků. Odkaz na podporu je na hlavní stránce.
