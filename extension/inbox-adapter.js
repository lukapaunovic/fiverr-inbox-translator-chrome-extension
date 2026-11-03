// Fiverr inbox DOM verified 2026-11-03. No private API calls or session cookies.
(() => {
  const peer=()=>{const m=location.pathname.match(/^\/inbox\/([\w.-]+)\/?$/);return m?m[1].toLowerCase():'';};
  function self(){try{return JSON.parse(document.querySelector('#perseus-initial-props')?.textContent||'{}').initialData?.userInfo?.username?.toLowerCase()||'';}catch{return '';}}
  const editor=()=>document.querySelector('#send-message-text-area');
  function messages(){
    const who=peer(),me=self();if(!who)return [];
    return [...document.querySelectorAll('.message-flow .message[id]')].flatMap(node=>{
      const sender=node.querySelector('[data-track-tag="avatar"][data-track-value]')?.getAttribute('data-track-value')?.toLowerCase();
      if(!sender||(sender!==who&&sender!==me))return [];
      // Include both sides; only the peer's messages determine reply language.
      const content=node.querySelector('.message-content');
      if(!content)return [];
      // Current text renderer marks the paragraph wrapper with this inline spacing.
      // Only read the original text, not names, timestamps, offers or native translation controls.
      const parts=[...content.querySelectorAll('[data-track-tag="typography"]')].filter(p=>p.style.marginBottom==='-5px'&&!p.closest('[data-luka-translation]'));
      const text=parts.map(p=>p.innerText).join('\n').trim();
      if(!text)return [];
      return [{id:node.id,node,content,text,sender,incoming:sender===who}];
    });
  }
  globalThis.FiverrAdapter={peer,editor,messages};
})();
