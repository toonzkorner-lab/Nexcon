function e(e){return e.normalize(`NFKD`).replace(/['’]/g,``).toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``).slice(0,80)}function t(e){return e.split(`
`).map(e=>e.trim()).filter(Boolean)}function n(e){return t(e).map(e=>{let[t,...n]=e.split(`|`);return{value:(t??``).trim(),label:n.join(`|`).trim()}})}function r(e){return e.map(e=>`${e.value} | ${e.label}`).join(`
`)}function i(e){let t=e.split(/\n{2,}/),n=[];for(let e of t){let t=e.trim();if(t){if(t.startsWith(`# `)){let[e,...r]=t.split(`
`),i=(e??``).replace(/^#\s+/,``).trim(),a=r.join(`
`).trim();n.push({heading:i,paragraphs:a?[a]:[``]})}else{let e=n[n.length-1];e&&!e.heading&&e.paragraphs.length?e.paragraphs.push(t):n.push({paragraphs:[t]})}}}return n.length?n:[{paragraphs:[``]}]}function a(e){return e.map(e=>{let t=e.paragraphs.join(`

`);return e.heading?`# ${e.heading}\n\n${t}`:t}).join(`

`)}function o(e){return e.map(e=>e.hint?`${e.cmd} | ${e.hint}`:e.cmd).join(`
`)}function s(e){return t(e).map(e=>{let[t,...n]=e.split(`|`);return{cmd:(t??``).trim(),hint:n.join(`|`).trim()}})}export{o as a,e as c,i,s as n,r as o,n as r,a as s,t};