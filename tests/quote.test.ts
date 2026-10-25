import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initialQuote,validateQuote,formatEnquiry,whatsappUrl,selectedPackage } from '../src/lib/quote';
import { dictionaries } from '../src/content/dictionaries';
import { business,pages } from '../src/config/business';
const valid={...initialQuote,name:'නිමල් & Family',country:'Australia',district:'Kandy',city:'Peradeniya',flexible:true,package:'blessing',destinations:'Temple\nLotus offering',customDestination:true,consent:true};
test('requires all mandatory data and consent',()=>{const e=validateQuote(initialQuote);for(const key of ['name','country','district','city','date','package','destinations','consent'])assert.ok(e[key as keyof typeof e]);});
test('accepts a complete flexible enquiry',()=>assert.deepEqual(validateQuote(valid),{}));
test('validates traveler count and duration',()=>{for(const travelers of ['0','5','2.5','abc'])assert.ok(validateQuote({...valid,travelers}).travelers);for(const travelers of ['1','2','3','4'])assert.equal(validateQuote({...valid,travelers}).travelers,undefined);assert.ok(validateQuote({...valid,duration:'3'}).duration);});
test('rejects past and impossible dates',()=>{for(const date of ['2020-01-01','2099-02-31','invalid'])assert.ok(validateQuote({...valid,flexible:false,date}).date);assert.equal(validateQuote({...valid,flexible:false,date:'2099-01-01'}).date,undefined);});
test('package preselection only accepts configured IDs',()=>{for(const p of business.packages)assert.equal(selectedPackage(p),p);assert.equal(selectedPackage('injected'),'');assert.equal(selectedPackage(null),'');});
test('WhatsApp message preserves real values, Unicode and enquiry disclaimer',()=>{for(const locale of ['en','si'] as const){const text=formatEnquiry(valid,locale);assert.ok(text.includes(valid.name));assert.ok(text.includes(valid.destinations));assert.ok(text.includes(dictionaries[locale].packageNames[0]));const url=new URL(whatsappUrl(text));assert.equal(url.origin+url.pathname,business.whatsapp);assert.equal(url.searchParams.get('text'),text);assert.ok(!url.href.includes(' '));}assert.match(formatEnquiry(valid),/not a confirmed booking/);});
test('locale dictionaries have matching keys and array lengths',()=>{function check(a:unknown,b:unknown){assert.equal(typeof a,typeof b);if(Array.isArray(a)){assert.ok(Array.isArray(b));assert.equal(a.length,b.length);a.forEach((v,i)=>check(v,b[i]));}else if(a&&typeof a==='object'){assert.deepEqual(Object.keys(a),Object.keys(b as object));for(const key of Object.keys(a))check((a as Record<string,unknown>)[key],(b as Record<string,unknown>)[key]);}else assert.ok(String(b).length);}check(dictionaries.en,dictionaries.si);assert.equal(dictionaries.en.nav.length,pages.length);});
test('multiple destinations, custom places and accommodation appear in both languages',()=>{
 const q={...valid,destinationIds:['kandy','mihintale'],customDestination:true,duration:'2',vehicle:'partner',accommodation:'2',assistance:'Frequent breaks',notes:'Vegetarian meals'};
 for(const locale of ['en','si'] as const){const t=dictionaries[locale];assert.deepEqual(validateQuote(q,locale),{});const text=formatEnquiry(q,locale);for(const expected of [t.destinationChoices[0],t.destinationChoices[2],q.destinations,t.partnerVehicle,t.accommodationOptions[2],q.assistance,q.notes])assert.ok(text.includes(expected));assert.equal(new URL(whatsappUrl(text)).searchParams.get('text'),text);}
});
test('destination validation handles examples, custom input and invalid IDs',()=>{
 assert.equal(validateQuote({...valid,customDestination:false,destinations:'',destinationIds:['kandy']}).destinations,undefined);
 assert.ok(validateQuote({...valid,customDestination:false,destinationIds:[]}).destinations);
 assert.ok(validateQuote({...valid,customDestination:true,destinations:' ',destinationIds:['kandy']}).destinations);
 assert.ok(validateQuote({...valid,destinationIds:['unknown']}).destinations);
});
test('one-day messages exclude stale overnight preferences and hidden custom text',()=>{
 const text=formatEnquiry({...valid,duration:'1',accommodation:'2',customDestination:false,destinationIds:['kandy']});
 assert.ok(text.includes(dictionaries.en.notApplicable));assert.ok(!text.includes(dictionaries.en.accommodationOptions[2]));assert.ok(!text.includes(valid.destinations));
});
