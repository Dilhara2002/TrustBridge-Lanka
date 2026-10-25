import { business, type Locale } from '../config/business';
import { dictionaries } from '../content/dictionaries';
export type Quote = {name:string;country:string;district:string;city:string;date:string;flexible:boolean;duration:string;travelers:string;package:string;destinations:string;destinationIds:string[];customDestination:boolean;vehicle:string;accommodation:string;assistance:string;notes:string;language:string;consent:boolean};
export const initialQuote:Quote={name:'',country:'',district:'',city:'',date:'',flexible:false,duration:'1',travelers:'2',package:'',destinations:'',destinationIds:[],customDestination:false,vehicle:'',accommodation:'',assistance:'',notes:'',language:'',consent:false};
export function selectedPackage(value:string|null){return business.packages.find(p=>p===value)||'';}
export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function destinationText(q:Quote,locale:Locale='en'){
 const t=dictionaries[locale];
 return [...new Set(q.destinationIds)].map(id=>t.destinationChoices[business.destinationIds.indexOf(id as typeof business.destinationIds[number])]).filter(Boolean).concat(q.customDestination&&q.destinations.trim()?[q.destinations.trim()]:[]).join('; ');
}
export function validateQuote(q:Quote,locale:Locale='en'){
 const t=dictionaries[locale];const e:Partial<Record<keyof Quote,string>>={};
 for(const key of ['name','country','district','city'] as const) if(!q[key].trim()||q[key].length>500)e[key]=t.required;
 if(!destinationText(q,locale)||q.destinations.length>500||q.destinationIds.some(id=>!business.destinationIds.includes(id as typeof business.destinationIds[number])))e.destinations=t.required;
 if(q.customDestination&&!q.destinations.trim())e.destinations=t.customRequired;
 if(!selectedPackage(q.package))e.package=t.required;
 if(!['1','2'].includes(q.duration))e.duration=t.required;
 if(!['1','2','3','4'].includes(q.travelers))e.travelers=t.invalidTravelers;
 if(!q.flexible&&(!/^\d{4}-\d{2}-\d{2}$/.test(q.date)||!Number.isFinite(Date.parse(q.date))||new Date(q.date).toISOString().slice(0,10)!==q.date||q.date<today()))e.date=t.invalidDate;
 if(!q.consent)e.consent=t.consentError;
 return e;
}
export function enquiryRows(q:Quote,locale:Locale='en'){
 const t=dictionaries[locale];
 return [
 ['name',q.name],['country',q.country],['district',q.district],['city',q.city],
 ['date',q.flexible?t.flexible:q.date],['duration',t.days[Number(q.duration)-1]],['travelers',q.travelers],
 ['package',t.packageNames[business.packages.indexOf(q.package as typeof business.packages[number])]],
 ['destinations',destinationText(q,locale)],['vehicle',q.vehicle==='partner'?t.partnerVehicle:q.vehicle||t.noPreference],
 ['accommodation',q.duration==='2'?(t.accommodationOptions[Number(q.accommodation)]&&q.accommodation!==''?t.accommodationOptions[Number(q.accommodation)]:t.noPreference):t.notApplicable],
 ['assistance',q.assistance||'—'],['notes',q.notes||'—'],['language',q.language||t.noPreference],
 ] as [keyof typeof t.fields,string][];
}
export function formatEnquiry(q:Quote,locale:Locale='en'){
 const t=dictionaries[locale];
 return `${locale==='en'?`Hello ${business.name},\n\nI would like to plan a pilgrimage journey.`:`ආයුබෝවන් ${business.name},\n\nවන්දනා ගමනක් සැලසුම් කිරීමට කැමතියි.`}\n\n${enquiryRows(q,locale).map(([k,v])=>`${t.fields[k]}: ${(v||t.notSelected).trim()}`).join('\n')}\n\n${locale==='en'?'Please provide a customized itinerary and quotation.\nThis is a quotation enquiry, not a confirmed booking.':'කරුණාකර අපට ගැළපෙන ගමන් සැලසුමක් හා Quotation එකක් ලබාදෙන්න.\nමෙය Quotation විමසීමක් පමණි. තහවුරු කළ Booking එකක් නොවේ.'}`;
}
export const whatsappUrl=(text:string)=>`${business.whatsapp}?text=${encodeURIComponent(text)}`;
