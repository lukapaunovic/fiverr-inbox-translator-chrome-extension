// Language names come from Chromium's bundled Intl data, not a hand-maintained shortlist.
globalThis.TranslationLanguages=(()=>{
 const names=new Intl.DisplayNames(['en'],{type:'language',fallback:'none'}), codes=[];
 const found=new Set();
 function include(raw){try{const code=Intl.getCanonicalLocales(raw)[0];if(!['und','mul','zxx'].includes(code)&&names.of(code))found.add(code);}catch{}}
 for(let a=97;a<=122;a++)for(let b=97;b<=122;b++){include(String.fromCharCode(a,b));for(let c=97;c<=122;c++)include(String.fromCharCode(a,b,c));}
 codes.push(...found);
 const extras=['zh-Hans','zh-Hant','sr-Latn','sr-Cyrl','pt-BR','pt-PT','en-US','en-GB'];
 const aliases=new Map(codes.map(code=>[names.of(code).toLowerCase(),code]));
 function normalize(value){if(typeof value!=='string'||value.length>64)return null;const alias=aliases.get(value.toLowerCase());if(alias)return alias;
  if(!/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(value))return null;
  try{const code=Intl.getCanonicalLocales(value)[0];if(!names.of(code.split('-')[0]))return null;return code;}catch{return null;}}
 function browser(){return normalize(chrome.i18n.getUILanguage())||'en';}
 function resolve(value){return value==='auto'?browser():(normalize(value)||browser());}
 function name(value){const code=normalize(value);if(!code)return null;return names.of(code)||code;}
 function ui(value){return resolve(value).split('-')[0]==='sr'?'Serbian':'English';}
 function fill(select,{auto=false,selected='auto',locale='en'}={}){const display=new Intl.DisplayNames([locale],{type:'language'});select.replaceChildren();
  const add=(value,label)=>{const o=document.createElement('option');o.value=value;o.textContent=label;select.append(o);};
  if(auto)add('auto',locale==='sr-Latn'?'Automatski · Chrome':'Automatic · Chrome');
  const all=new Set([...codes,...extras]);const normalized=normalize(selected);if(normalized)all.add(normalized);
  [...all].map(code=>({code,label:display.of(code)})).sort((a,b)=>a.label.localeCompare(b.label,locale)).forEach(x=>add(x.code,x.label));
  select.value=selected==='auto'?'auto':normalized;if(!select.value&&select.options.length)select.selectedIndex=0;
 }
 return {normalize,resolve,name,ui,fill,codes,browser};
})();
