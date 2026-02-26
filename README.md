Această lucrare este un site scris în HTML și CSS, care au fost deasemenea folosite împreună cu Javascript pentru a crea ceasul prezent pe fiecare pagină. Am folosit și C++ (cu biblioteca SFML) și OpenGL shading language (GLSL) pentru a crea animația de pe pagina principală.
(Pentru animație, a se vedea și proiectul 3D_Raymarching: https://github.com/Andrei-Stimeriu/3D_Raymarching.git)

Cu CSS am realizat afișarea unui meniu drop-down la deplasarea cursorului pe un link și am făcut toate paginile să corespundă oricărui ecran de orice dimensiune. Astfel, la redimensionarea paginii, numai textul își schimbă dimensiunea. Antetul, butoanele și imaginile rămân la aceleași dimensiuni așezate la fel în pagină.

Am utilizat javascript strict pentru funcționalitatea ceasului prezent pe fiecare pagină.

Proiectul 3D_Raymarching a fost ușor modificat pentru a salva fiecare cadru din animație (apoi le-am îmbinat în „Anim Full HD.mp4”). (Vezi în acest proiect /Imagini/Program animatii)
Am scris un „fragment shader”, care preia ca date de intrare coordonatele pixelului căruia doresc să îi stabilesc culoarea și, după niște calcule, returnează culoarea. Astfel, în teorie, culoarea fiecărui pixel din imagine poate fi calculată independent, în paralel, sporind cu mult viteza de execuție.
Am folosit tehnica Ray Marching (Signed Distance Functions). Obiectele se deplasează conform unor funcții trigonometrice și folosește o matrice de rotire (bazată pe înmulțirea numerelor complexe). Deasemenea am scris o funcție care unește obiectele cu un efect de „topire” care combină și culorile acelor obiecte ce se unesc („smooth minimum”).


MODULUL CEAS:
Folderul „Pagini” conține deasemenea folderul „Ceas” (copiat aici în urma respectării instrucțiunilor). Acesta este un modul ceas cu note muzicale pentru site-uri, scris în HTML, CSS și Javascript, realizat de mine (Stimeriu Andrei). Ceasul este analog (cu ace) și prezintă o mișcare cursivă a acelor (desenate cu javascript pe un element html <canvas>), are simboluri muzicale atașate fiecărui ac, care se mișcă împreună cu acestea, are modul de zi și modul de noapte (își schimbă culorile pentru fundal și ace de 2 ori pe zi: la ora 6 AM și la ora 8 PM); afișează ora computerului de pe care e deschis site-ul.
Atunci când se dă click pe ceas, acesta se deplasează în jos, ieșind aproape complet de pe ecran pentru a oferi o vizibilitate mai bună asupra elementelor din partea de jos a paginii atunci când e necesar. Dacă se dă click iar pe el, acesta revine la poziția obișnuită.
Am ales să fac ceasul într-un modul separat pentru o mai bună organizare a proiectului și pentru ca ceasul să poată fi reutilizat cu ușurință maximă pe fiecare pagină și în alte site-uri (este ca un mic proiect de sine stătător, realizat inițial pentru acest site).
„CITEȘTE-MĂ.txt” din folderul „Ceas” conține instrucțiunile clare pentru instalarea ceasului pe o pagină HTML (cum trebuie copiate fișierele din subfolderul „Coduri” și elementele cheie din fișierul „html.html”). Am făcut modulul astfel încât să poată fi adăugat din cât mai puțini pași.
Desigur, am introdus deja ceasul în paginile HTML.

Webografie:
https://www.libertatea.ro/lifestyle/cele-mai-frumoase-citate-despre-muzica-4677856
https://ro.wikipedia.org/wiki/Pian
https://ro.wikipedia.org/wiki/Flaut
https://ro.wikipedia.org/wiki/Flaut_dulce
https://musicandmore.ro/instrumente-de-suflat-ro-2/flaut-ro.html
https://en.wikipedia.org/wiki/Flute
https://en.wikipedia.org/wiki/Cimbalom
https://en.wikipedia.org/wiki/Accordion
https://ro.wikipedia.org/wiki/Chitar%C4%83
https://en.wikipedia.org/wiki/Classical_guitar
https://ro.wikipedia.org/wiki/Orchestr%C4%83_simfonic%C4%83
https://blog.mcmusic.ro/2020/01/08/orchestra-simfonica-si-instrumentele-ei-informatii-utile-si-raspunsuri-la-cele-mai-des-puse-intrebari/
