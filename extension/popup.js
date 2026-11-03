(async()=>{const s=await chrome.runtime.sendMessage({type:'settings'});LukaI18n.set(TranslationLanguages.ui(s.readingLanguage));LukaI18n.apply(document);})();
document.querySelector('#settings').onclick=()=>chrome.runtime.openOptionsPage();
document.querySelector('#open').onclick=async()=>{try{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});await chrome.tabs.sendMessage(tab.id,{type:'open'});window.close();}catch{document.querySelector('#status').textContent=LukaI18n.t('Otvori konkretan razgovor u Fiverr inboxu i osveži stranicu.');}};
