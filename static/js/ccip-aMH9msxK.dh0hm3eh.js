import{d as g,c as k,a as x,b as O,H as p,s as b,f as L,B as f,g as w,i as m,I as h}from"./evm--XCwIP6p.jd0a83o1.js";import"./index.bwmrk3ti.js";import"./vue.fv0erkdm.js";import"./lodash-es.bp0zmem9.js";import"./axios.i01mok01.js";import"./dayjs.pb8a0t5b.js";import"./vuex.jdzbw26m.js";import"./vue-router.jwqkmej7.js";import"./svg-icons.nw66rbkj.js";import"./Bridge.jzjokbd9.js";import"./index-DwIccy-O.m7d00lv8.js";class $ extends f{constructor({callbackSelector:e,cause:a,data:i,extraData:n,sender:l,urls:t}){var c;super(a.shortMessage||"An error occurred while fetching for an offchain result.",{cause:a,metaMessages:[...a.metaMessages||[],(c=a.metaMessages)!=null&&c.length?"":[],"Offchain Gateway Call:",t&&["  Gateway URL(s):",...t.map(d=>`    ${w(d)}`)],`  Sender: ${l}`,`  Data: ${i}`,`  Callback selector: ${e}`,`  Extra data: ${n}`].flat()}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupError"})}}class M extends f{constructor({result:e,url:a}){super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${w(a)}`,`Response: ${b(e)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupResponseMalformedError"})}}class S extends f{constructor({sender:e,to:a}){super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${a}`,`OffchainLookup sender address: ${e}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupSenderMismatchError"})}}function v(s,e){if(!m(s))throw new h({address:s});if(!m(e))throw new h({address:e});return s.toLowerCase()===e.toLowerCase()}const U="0x556f1830",C={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function B(s,{blockNumber:e,blockTag:a,data:i,to:n}){const{args:l}=g({data:i,abi:[C]}),[t,c,d,r,o]=l;try{if(!v(n,t))throw new S({sender:t,to:n});const u=await P({data:d,sender:t,urls:c}),{data:y}=await k(s,{blockNumber:e,blockTag:a,data:x([r,O([{type:"bytes"},{type:"bytes"}],[u,o])]),to:n});return y}catch(u){throw new $({callbackSelector:r,cause:u,data:i,extraData:o,sender:t,urls:c})}}async function P({data:s,sender:e,urls:a}){var i;let n=new Error("An unknown error occurred.");for(let l=0;l<a.length;l++){const t=a[l],c=t.includes("{data}")?"GET":"POST",d=c==="POST"?{data:s,sender:e}:void 0;try{const r=await fetch(t.replace("{sender}",e).replace("{data}",s),{body:JSON.stringify(d),method:c});let o;if((i=r.headers.get("Content-Type"))!=null&&i.startsWith("application/json")?o=(await r.json()).data:o=await r.text(),!r.ok){n=new p({body:d,details:o!=null&&o.error?b(o.error):r.statusText,headers:r.headers,status:r.status,url:t});continue}if(!L(o)){n=new M({result:o,url:t});continue}return o}catch(r){n=new p({body:d,details:r.message,url:t})}}throw n}export{P as ccipFetch,B as offchainLookup,C as offchainLookupAbiItem,U as offchainLookupSignature};