globalThis.LukaI18n=(()=>{
  let english=false;
  const strings={
    'Opcije':'Options','Sakrij ili prikaži pregled':'Hide or show preview','Pripremam prevod…':'Preparing translation…','Pregledaj → Primeni → Send':'Review → Apply → Send', 
    '🌐 Prevodilac':'🌐 Translator','Odgovor:':'Reply:','Automatski · jezik klijenta':'Auto · client language','API podešavanja':'API settings','Prepoznajem jezik…':'Detecting language…','Čitam:':'Read in:',
    'Sve poruke · klijent i mi':'All messages · client and us','Prevod odgovora dok kucam':'Translate replies as I type','Prevod tvog odgovora':'Your reply translation','Ovde će se pojaviti prevod tvog nacrta…':'Your draft translation will appear here…',
    'Primeni prevod':'Apply translation','Kopiraj':'Copy','Prevedi ponovo':'Translate again','Vrati originalni nacrt':'Restore original draft','Ponovi prevod poruka':'Retry message translations',
    'Piši u Fiverr polju iznad. Pregledaj prevod, primeni ga, pa klikni Send.':'Type in the Fiverr box above. Review and apply the translation, then click Send.',
    'Prevod preko OpenAI API-ja. Originali ostaju vidljivi. Prevodi se čuvaju lokalno.':'Powered by OpenAI. Originals stay visible. Translations are saved locally.',
    'Jezik još nije pouzdano prepoznat':'Language has not been confidently detected yet','Klijent:':'Client:',
    'Prevod se priprema. Posle pregleda klikni „Primeni prevod“.':'Preparing the translation. Review it, then click Apply translation.',
    'Čekam prepoznavanje jezika klijenta. Možeš i ručno izabrati jezik odgovora.':'Waiting to detect the client language. You can also choose the reply language manually.',
    'Prevodim tvoj odgovor…':'Translating your reply…','Pregledaj prevod. „Primeni prevod“ zamenjuje nacrt; Send šalješ sam.':'Review the translation. Apply translation replaces the draft; you click Send yourself.',
    'Nacrt ili razgovor je promenjen. Prevedi ponovo.':'The draft or conversation changed. Translate again.',
    'Prevod je u Fiverr nacrtu. Proveri i klikni Send.':'The translation is in your Fiverr draft. Review it and click Send.',
    'Vraćen je originalni nacrt.':'Original draft restored.','Nacrt se promenio; vraćanje je zaustavljeno.':'The draft changed; restore was stopped.',
    'Prevod je kopiran.':'Translation copied.','Pritisni Cmd+C ili Ctrl+C.':'Press Cmd+C or Ctrl+C.',
    'Sakrij prevod':'Hide translation','Prikaži prevod':'Show translation','Prevod se priprema…':'Preparing translation…','Prevodim poruku…':'Translating message…','Prevod':'Translation',
    'Jezik neodređen':'Language undetermined','Sačuvano lokalno':'Saved locally','original':'original',
    'Poruka je predugačka. Prevedi kraće delove ručno.':'This message is too long. Translate smaller sections manually.',
    'Prevod nije uspeo. Klikni „Ponovi prevod poruka“ kod editora.':'Translation failed. Click Retry message translations next to the editor.',
    'Osveži Fiverr nakon ažuriranja ekstenzije.':'Refresh Fiverr after updating the extension.',
    'API ključ nedostaje. Otvori podešavanja.':'API key missing. Open settings.','Prevod je u toku. Pokušaj za nekoliko sekundi.':'Translation in progress. Try again in a few seconds.',
    'API ključ nije prihvaćen.':'API key was not accepted.','OpenAI limit ili kredit: proveri billing ili pokušaj kasnije.':'OpenAI limit or credit: check billing or try later.',
    'Prevod nije dovršen. Pokušaj sa kraćom porukom.':'Translation was incomplete. Try a shorter message.','Nije dobijen prevod.':'No translation was returned.','Prevod traje predugo. Pokušaj ponovo.':'Translation timed out. Please try again.',
    'Unesi poruku od 1 do 12.000 znakova.':'Enter a message of 1 to 12,000 characters.','Izaberi jezik odgovora.':'Choose a reply language.',
    'Fiverr prevodilac':'Fiverr Translator','Privatna OpenAI API veza':'Private OpenAI API connection','API ključ':'API key','Model':'Model','Sačuvaj':'Save','Testiraj prevod':'Test translation',
    'Jezik čitanja i interfejsa':'Reading language','API ključ je podešen.':'API key is configured.','Unesi API ključ.':'Enter your API key.','Unesi model.':'Enter a model.','API ključ treba da počinje sa sk-.':'The API key must start with sk-.','Sačuvano.':'Saved.',
    'Testiram sa sačuvanim podešavanjima…':'Testing saved settings…','Ostavi prazno da zadržiš postojeći ključ':'Leave blank to keep the current key',
    'Lokalni keš prevoda':'Local translation cache','Obriši lokalni keš':'Clear local cache','Obrisati sve sačuvane prevode?':'Clear all saved translations?',
    'Keš je obrisan. Osveži Fiverr tabove.':'Cache cleared. Refresh your Fiverr tabs.','sačuvanih prevoda':'saved translations',
    'Ključ i prevodi ostaju u ovom Chrome profilu, bez Chrome Sync-a. OpenAI API potrošnja se naplaćuje na tvom nalogu.':'The key and translations stay in this Chrome profile, without Chrome Sync. OpenAI API usage is billed to your account.',
    'Keš ostaje posle osvežavanja i ponovnog pokretanja Chrome-a. Uklanjanje ekstenzije ili brisanje profila briše keš.':'The cache survives refreshes and Chrome restarts. Removing the extension or deleting the profile removes the cache.',
    'Prikaži prevodilac u inboxu':'Show translator in inbox','Podešavanja':'Settings',
    'Dolazne i poslate poruke → izabrani jezik. Tvoj nacrt → jezik klijenta.':'Received and sent messages → your reading language. Your draft → the client language.',
    'Otvori konkretan razgovor u Fiverr inboxu i osveži stranicu.':'Open a conversation in Fiverr inbox and refresh the page.'
  };
  const t=s=>english?(strings[s]||s):s;
  function apply(root){root.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));for(const a of ['placeholder','title','aria-label'])root.querySelectorAll(`[data-i18n-${a}]`).forEach(el=>el.setAttribute(a,t(el.getAttribute(`data-i18n-${a}`))));}
  return {t,apply,set:language=>{english=language==='English';},isEnglish:()=>english};
})();
