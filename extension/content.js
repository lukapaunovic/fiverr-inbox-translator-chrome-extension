(() => {
  if(document.getElementById('luka-inbox-translator'))return;
  const A=globalThis.FiverrAdapter, I=globalThis.LukaI18n, t=I.t;
  const L=TranslationLanguages;
  const languageLabel=code=>{try{return new Intl.DisplayNames([I.isEnglish()?'en':'sr-Latn'],{type:'language'}).of(L.normalize(code)||code);}catch{return code;}};
  const languageEnglish=code=>L.normalize(code);
  const host=document.createElement('div');host.id='luka-inbox-translator';host.style.cssText='display:block;width:100%;margin:4px 0;';
  const root=host.attachShadow({mode:'closed'});
  root.innerHTML=`<style>
  *{box-sizing:border-box}.box{font:13px/1.45 system-ui,sans-serif;color:#26342e;border:1px solid #cce8d9;background:#f5fbf7;border-radius:10px;padding:10px 12px}button,select,textarea,input{font:inherit}button{cursor:pointer;border:1px solid #ccd9d0;border-radius:7px;padding:6px 10px;background:#fff;color:#214b37}button:hover{background:#e3f5e9}button:disabled{opacity:.45;cursor:default}.primary{background:#167d4b;color:#fff;border-color:#167d4b}.primary:hover{background:#12663e}.top,.tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.brand{font-weight:700}.pill{display:inline-flex;border-radius:20px;background:#e0efef;color:#245a62;padding:3px 8px;font-size:11px;font-weight:600}.top select{padding:5px 7px;border:1px solid #cadbd0;border-radius:6px;background:white;color:#253c2e;max-width:220px}.right{margin-left:auto}.toggles{display:flex;gap:14px;flex-wrap:wrap;font-size:11px;color:#5b7062;margin-top:7px}input{accent-color:#16824f;vertical-align:middle}.preview{margin-top:9px}textarea{display:block;resize:vertical;width:100%;min-height:74px;max-height:220px;padding:9px;border:1px solid #bbd8c5;border-radius:7px;background:#fff;color:#20352a;line-height:1.5}.tools{margin-top:7px}.status{font-size:11px;color:#52695a;overflow-wrap:anywhere}.note{font-size:10px;color:#687d6f;margin-top:5px}[hidden]{display:none!important}
  .box{padding:5px 8px;font-size:12px;line-height:1.35;border-radius:8px}.top{gap:6px;flex-wrap:nowrap;min-height:26px}.brand{white-space:nowrap}.pill{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:2px 6px}.top button{flex-shrink:0;padding:3px 7px;min-height:26px}.right{margin-left:auto}.toggles{gap:8px 12px;margin:5px 0;padding-top:6px;border-top:1px solid #dcebe1}.toggles select{max-width:210px;background:white;border:1px solid #cadbd0;border-radius:5px;padding:3px;color:#253c2e}.preview{margin-top:5px}textarea{height:52px;min-height:42px;max-height:min(120px,20vh);padding:6px 8px;resize:vertical;font-size:13px;line-height:1.4}.tools{gap:5px;margin-top:4px}.tools button{padding:4px 8px;font-size:11px;min-height:27px}.status{margin-top:3px;font-size:10px;line-height:1.3}.status:empty{display:none}.note{line-height:1.4;margin:4px 0}#retry{font-size:11px;margin-top:4px}#preferences{max-height:180px;overflow:auto}#preview-toggle{margin-left:auto}#preview-toggle:not([hidden])~.right{margin-left:0}@media(max-width:1100px){.brand{font-size:0}.brand::after{content:'🌐';font-size:14px}.tools button{padding:4px 6px}}
  </style><section class="box">
  <div class="top"><span class="brand" data-i18n="🌐 Prevodilac">🌐 Prevodilac</span><span id="detected" class="pill">Prepoznajem jezik…</span><button id="undo" hidden data-i18n-title="Vrati originalni nacrt" title="Vrati originalni nacrt">↶</button><button id="preview-toggle" hidden aria-expanded="true" data-i18n-title="Sakrij ili prikaži pregled" title="Sakrij ili prikaži pregled">⌃</button><button class="right" id="preferences-toggle" aria-expanded="false" aria-controls="preferences" data-i18n="Opcije">Opcije</button></div>
  <div id="preferences" hidden><div class="toggles"><label><span data-i18n="Odgovor:">Odgovor:</span> <select id="language"><option value="auto" data-i18n="Automatski · jezik klijenta">Automatski · jezik klijenta</option></select></label><label><span data-i18n="Čitam:">Čitam:</span> <select id="reading"><option value="Serbian">Srpski</option><option value="English">English</option></select></label><label><input type="checkbox" id="incoming" checked> <span data-i18n="Sve poruke · klijent i mi">Sve poruke · klijent i mi</span></label><label><input type="checkbox" id="auto" checked> <span data-i18n="Prevod odgovora dok kucam">Prevod odgovora dok kucam</span></label><button id="settings" data-i18n="API podešavanja">API podešavanja</button></div><div class="note" data-i18n="Prevod preko OpenAI API-ja. Originali ostaju vidljivi. Prevodi se čuvaju lokalno."></div></div>
  <div class="preview" hidden><textarea dir="auto" id="result" aria-label="Prevod tvog odgovora" data-i18n-aria-label="Prevod tvog odgovora" placeholder="Ovde će se pojaviti prevod tvog nacrta…" data-i18n-placeholder="Ovde će se pojaviti prevod tvog nacrta…"></textarea><div class="tools"><button class="primary" id="apply" disabled>Primeni prevod</button><button id="copy" data-i18n="Kopiraj" disabled>Kopiraj</button><button id="translate" data-i18n="Prevedi ponovo">Prevedi ponovo</button></div></div>
  <div class="status" id="status" role="status" aria-live="polite">Piši u Fiverr polju iznad. Pregledaj prevod, primeni ga, pa klikni Send.</div>
  <button id="retry" data-i18n="Ponovi prevod poruka" hidden>Ponovi prevod poruka</button></section>`;
  const $=s=>root.querySelector(s), status=$('#status'), lang=$('#language'), output=$('#result');

  const send=async m=>{const r=await chrome.runtime.sendMessage(m);if(!r)throw Error(t('Osveži Fiverr nakon ažuriranja ekstenzije.'));if(r.error)throw Error(r.error);return r;};
  let readingPreference='auto',readingLanguage=L.browser(),peer='',epoch=0,editor=null,settingsReady=false,detected=null,choice='auto',revision=0,timer,scanTimer,outBusy=false,outQueued=false,inBusy=false,paused=false,sourceSnapshot='',resultTarget='',applied='',undo='',ignoreInput=false,lastObservedDraft='',previewCollapsed=false;
  const cache=new Map(), nodeStates=new WeakMap();let latestMessages=[];
  const cacheKey=m=>readingLanguage+'\u0000'+peer+'\u0000'+m.id+'\u0000'+m.text;
  const put=(key,value)=>{cache.set(key,value);while(cache.size>200)cache.delete(cache.keys().next().value);};
  const currentTarget=()=>choice==='auto'?(detected?languageEnglish(detected):null):choice;
  function syncPreview(){const draft=!!read().trim(),alreadyApplied=!!applied&&read()===applied;$('.preview').hidden=!draft||alreadyApplied||previewCollapsed;$('#preview-toggle').hidden=!draft||alreadyApplied;$('#preview-toggle').setAttribute('aria-expanded',String(!previewCollapsed));$('#preview-toggle').textContent=previewCollapsed?'⌄':'⌃';if(!draft&&!paused)status.textContent='';}
  $('#preferences-toggle').onclick=()=>{const panel=$('#preferences');panel.hidden=!panel.hidden;$('#preferences-toggle').setAttribute('aria-expanded',String(!panel.hidden));};
  $('#preview-toggle').onclick=()=>{previewCollapsed=!previewCollapsed;syncPreview();};
  function buttonState(){const ok=!!output.value.trim()&&!!sourceSnapshot;$('#apply').disabled=!ok;$('#copy').disabled=!output.value.trim();}
  function invalidate(){revision++;clearTimeout(timer);output.value='';sourceSnapshot='';resultTarget='';buttonState();}
  function updateLanguage(){
    let code=null;
    for(const m of latestMessages.filter(x=>x.incoming)){const r=cache.get(cacheKey(m));if(r?.confident&&r.language!=='und'&&languageEnglish(r.language))code=r.language;}
    if(code!==detected){detected=code;if(choice==='auto'){invalidate();scheduleOutgoing();}}
    $('#detected').textContent=detected?`${t('Klijent:')} ${languageLabel(detected)}`:t('Jezik još nije pouzdano prepoznat');
    $('#apply').textContent=`${t('Primeni prevod')}${currentTarget()?' → '+languageLabel(currentTarget()):''}`;
  }
  async function changePeer(next){
    peer=next;const generation=++epoch;editor=null;latestMessages=[];detected=null;choice='auto';lang.value='auto';settingsReady=false;paused=false;applied='';undo='';outQueued=false;invalidate();$('#undo').hidden=true;$('.preview').hidden=true;$('#retry').hidden=true;updateLanguage();
    try{const [cfg,prefs]=await Promise.all([send({type:'settings'}),send({type:'conversationSettings',peer})]);if(generation!==epoch)return;readingPreference=cfg.readingPreference||'auto';readingLanguage=cfg.readingLanguage;applyUI();$('#auto').checked=cfg.auto;$('#incoming').checked=cfg.incoming;choice=prefs.language==='auto'?'auto':(L.normalize(prefs.language)||'auto');applyUI();settingsReady=true;syncPreview();scheduleScan();}catch(e){status.textContent=t(e.message);}
  }
  function read(){return editor?.isConnected?editor.value:'';}
  function scheduleOutgoing(){clearTimeout(timer);if(settingsReady&&$('#auto').checked&&read().trim()&&read()!==applied)timer=setTimeout(translateOutgoing,850);}
  function draftChanged(){if(ignoreInput)return;lastObservedDraft=read();invalidate();applied='';$('#undo').hidden=true;$('.preview').hidden=!read().trim();status.textContent=read().trim()?t('Pripremam prevod…'):t('Piši u Fiverr polju iznad. Pregledaj prevod, primeni ga, pa klikni Send.');syncPreview();scheduleOutgoing();}
  async function translateOutgoing(){
    clearTimeout(timer);const text=read();if(!text.trim()||text===applied)return;
    const target=currentTarget();if(!target){status.textContent=t('Čekam prepoznavanje jezika klijenta. Možeš i ručno izabrati jezik odgovora.');return;}
    if(outBusy){outQueued=true;return;}
    outBusy=true;outQueued=false;const rev=revision,gen=epoch,oldEditor=editor;
    syncPreview();status.textContent=t('Prevodim tvoj odgovor…');
    try{const r=await send({type:'translate',text,language:target});if(gen===epoch&&rev===revision&&editor===oldEditor&&read()===text&&A.peer()===peer){output.value=r.text;sourceSnapshot=text;resultTarget=target;buttonState();status.textContent=t('Pregledaj → Primeni → Send');}}
    catch(e){if(gen===epoch&&rev===revision)status.textContent=t(e.message);}
    finally{outBusy=false;if(outQueued){outQueued=false;translateOutgoing();}}
  }
  function writeEditor(text){ignoreInput=true;try{Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(editor,text);editor.dispatchEvent(new Event('input',{bubbles:true}));editor.dispatchEvent(new Event('change',{bubbles:true}));editor.focus();}finally{ignoreInput=false;lastObservedDraft=read();}}
  $('#apply').onclick=()=>{if(A.peer()!==peer||!editor?.isConnected||editor!==A.editor()||read()!==sourceSnapshot||currentTarget()!==resultTarget){status.textContent=t('Nacrt ili razgovor je promenjen. Prevedi ponovo.');invalidate();return;}undo=read();applied=output.value;writeEditor(applied);revision++;clearTimeout(timer);$('#undo').hidden=false;$('#apply').disabled=true;sourceSnapshot='';status.textContent=t('Prevod je u Fiverr nacrtu. Proveri i klikni Send.');syncPreview();};
  $('#undo').onclick=()=>{if(A.peer()===peer&&editor?.isConnected&&read()===applied){writeEditor(undo);applied='';invalidate();$('#undo').hidden=true;status.textContent=t('Vraćen je originalni nacrt.');syncPreview();}else{status.textContent=t('Nacrt se promenio; vraćanje je zaustavljeno.');}};
  $('#translate').onclick=()=>{previewCollapsed=false;applied='';invalidate();translateOutgoing();};
  output.addEventListener('input',buttonState);
  $('#copy').onclick=async()=>{try{await navigator.clipboard.writeText(output.value);status.textContent=t('Prevod je kopiran.');}catch{output.focus();output.select();status.textContent=t('Pritisni Cmd+C ili Ctrl+C.');}};
  $('#settings').onclick=()=>send({type:'options'}).catch(e=>status.textContent=t(e.message));
  lang.onchange=()=>{choice=lang.value;invalidate();updateLanguage();send({type:'conversationSettings',peer,language:choice}).catch(e=>status.textContent=t(e.message));scheduleOutgoing();};
  $('#auto').onchange=()=>{send({type:'preferences',auto:$('#auto').checked}).catch(e=>status.textContent=t(e.message));if($('#auto').checked)scheduleOutgoing();else clearTimeout(timer);};
  $('#incoming').onchange=()=>{paused=false;send({type:'preferences',incoming:$('#incoming').checked}).catch(e=>status.textContent=t(e.message));for(const m of latestMessages){const state=nodeStates.get(m.node);if(state)state.host.hidden=!$('#incoming').checked;}scheduleScan();};
  function applyUI(){I.set(L.ui(readingLanguage));const locale=I.isEnglish()?'en':'sr-Latn';L.fill($('#reading'),{auto:true,selected:readingPreference,locale});L.fill(lang,{auto:true,selected:choice,locale});lang.options[0].textContent=t('Automatski · jezik klijenta');I.apply(root);status.textContent=t('Piši u Fiverr polju iznad. Pregledaj prevod, primeni ga, pa klikni Send.');updateLanguage();}
  $('#reading').onchange=async()=>{const next=$('#reading').value;try{await send({type:'preferences',readingLanguage:next});const cfg=await send({type:'settings'});readingPreference=cfg.readingPreference;readingLanguage=cfg.readingLanguage;epoch++;paused=false;$('#retry').hidden=true;invalidate();applyUI();scheduleScan();scheduleOutgoing();}catch(e){status.textContent=t(e.message);}};
  $('#retry').onclick=()=>{paused=false;$('#retry').hidden=true;scheduleScan();};
  function createAnnotation(m){
    const card=document.createElement('div');card.dataset.lukaTranslation='';card.style.cssText='display:block;margin:9px 0 3px;width:100%;';
    const sr=card.attachShadow({mode:'closed'});
    sr.innerHTML=`<style>*{box-sizing:border-box}.card{font:13px/1.5 system-ui,sans-serif;color:#264539;background:#f0f8f3;border-left:3px solid #1dbf73;border-radius:0 8px 8px 0;padding:9px 12px}.line{display:flex;align-items:center;gap:8px}.pill{border:1px solid #c8dbd2;border-radius:20px;padding:2px 8px;font-size:10px;font-weight:650;background:white;color:#416356}button{font:11px system-ui;border:0;background:none;color:#4f6e5b;cursor:pointer;margin-left:auto;padding:3px}.body{white-space:pre-wrap;overflow-wrap:anywhere;margin-top:6px}.muted{font-size:11px;color:#6d8074}[hidden]{display:none!important}</style><div class="card"><div class="line"><span class="pill" data-i18n="Prevod">Prevod</span><button type="button" data-i18n="Sakrij prevod">Sakrij prevod</button></div><div class="body muted" dir="auto">${t("Prevod se priprema…")}</div></div>`;
    const body=sr.querySelector('.body'),pill=sr.querySelector('.pill'),toggle=sr.querySelector('button');
    toggle.onclick=e=>{e.stopPropagation();body.hidden=!body.hidden;toggle.textContent=body.hidden?t('Prikaži prevod'):t('Sakrij prevod');};
    card.addEventListener('click',e=>e.stopPropagation());
    const bodySection=m.content.firstElementChild?.children[1];
    if(bodySection)bodySection.insertAdjacentElement('afterend',card);else m.content.append(card);
    const state={host:card,body,pill,toggle,text:m.text,reading:readingLanguage};I.apply(sr);nodeStates.set(m.node,state);return state;
  }
  function show(m,r){let state=nodeStates.get(m.node);if(!state||!state.host.isConnected){state=createAnnotation(m);}state.text=m.text;state.reading=readingLanguage;state.host.hidden=!$('#incoming').checked;state.pill.textContent=`${r.language==='und'?t('Jezik neodređen'):languageLabel(r.language)} · ${t('original')}`;state.body.classList.remove('muted');state.body.textContent=r.translation;state.pill.title=t('Sačuvano lokalno');state.toggle.textContent=state.body.hidden?t('Prikaži prevod'):t('Sakrij prevod');}
  function visible(node){const r=node.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;}
  async function translateIncoming(){
    if(inBusy||paused||!settingsReady||!peer||!$('#incoming').checked)return;
    const gen=epoch,conversation=peer,targetReading=readingLanguage;
    // Latest messages establish reply language even when the scroll position is higher.
    const recent=new Set(latestMessages.filter(x=>x.incoming).slice(-3).map(m=>m.id));
    const candidates=latestMessages.filter(m=>!cache.has(cacheKey(m))&&(visible(m.node)||recent.has(m.id))).reverse();
    const batch=[];let length=0;
    for(const m of candidates){if(m.text.length>12000){const state=nodeStates.get(m.node)||createAnnotation(m);state.body.textContent=t('Poruka je predugačka. Prevedi kraće delove ručno.');continue;}if(batch.length===5||length+m.text.length>16000)break;batch.push({...m,key:cacheKey(m)});length+=m.text.length;}
    if(!batch.length)return;
    inBusy=true;for(const m of batch){const state=nodeStates.get(m.node)||createAnnotation(m);state.body.textContent=t('Prevodim poruku…');}
    try{const r=await send({type:'incoming',language:targetReading,messages:batch.map(({id,text})=>({id,text}))});for(const m of batch){const item=r.messages.find(x=>x.id===m.id);if(item)put(m.key,item);}
      if(gen===epoch&&conversation===A.peer()){for(const m of batch)if(m.node.isConnected&&latestMessages.some(x=>x.id===m.id&&x.text===m.text)){const item=cache.get(m.key);if(item)show(m,item);}updateLanguage();}
    }catch(e){if(gen===epoch){paused=true;$('#retry').hidden=false;status.textContent=t(e.message);for(const m of batch){const state=nodeStates.get(m.node);if(state)state.body.textContent=t('Prevod nije uspeo. Klikni „Ponovi prevod poruka“ kod editora.');}}}
    finally{inBusy=false;if(!paused)scheduleScan();}
  }
  function scan(){
    const next=A.peer();if(!next){host.remove();if(peer){peer='';epoch++;invalidate();settingsReady=false;}return;}
    if(next!==peer){changePeer(next);return;}
    const current=A.editor();
    if(current&&current!==editor){editor=current;lastObservedDraft=read();editor.addEventListener('input',draftChanged);invalidate();applied='';undo='';$('#undo').hidden=true;$('.preview').hidden=!read().trim();scheduleOutgoing();}
    if(editor?.isConnected&&!host.isConnected){editor.parentElement.parentElement.insertAdjacentElement('afterend',host);}
    if(editor?.isConnected&&read()!==lastObservedDraft)draftChanged();
    syncPreview();
    latestMessages=A.messages();
    for(const m of latestMessages){const state=nodeStates.get(m.node),r=cache.get(cacheKey(m));if(r){if(!state||!state.host.isConnected||state.text!==m.text||state.reading!==readingLanguage)show(m,r);}else if(state&&(state.text!==m.text||state.reading!==readingLanguage)){state.host.remove();nodeStates.delete(m.node);}}
    updateLanguage();translateIncoming();
  }
  function scheduleScan(){clearTimeout(scanTimer);scanTimer=setTimeout(scan,180);}
  new MutationObserver(scheduleScan).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  document.addEventListener('scroll',scheduleScan,true);
  window.addEventListener('popstate',scheduleScan);
  setInterval(()=>{if(A.peer()!==peer||!host.isConnected||(editor?.isConnected&&read()!==lastObservedDraft))scheduleScan();},1000);
  document.addEventListener('keydown',e=>{if(e.altKey&&e.shiftKey&&e.code==='KeyT'){e.preventDefault();host.scrollIntoView({block:'nearest'});translateOutgoing();}},true);
  chrome.runtime.onMessage.addListener(m=>{if(m.type==='open'){host.scrollIntoView({block:'nearest'});editor?.focus();}});
  scheduleScan();
})();
