import {http,HttpResponse} from 'msw';
import {offersSeed,chartData,payouts} from '../data';
let offers=[...offersSeed];
export const handlers=[
 http.get(`${import.meta.env.BASE_URL}api/offers`,()=>HttpResponse.json(offers.filter(x=>x.status==='Активен'))),
 http.post(`${import.meta.env.BASE_URL}api/referral-link`,async({request})=>{const {offerId}=await request.json();return HttpResponse.json({url:`https://stud.link/${offerId}/alex24`})}),
 http.get(`${import.meta.env.BASE_URL}api/student/stats`,()=>HttpResponse.json({balance:4850,clicks:449,active:5,chart:chartData})),
 http.get(`${import.meta.env.BASE_URL}api/student/payouts`,()=>HttpResponse.json(payouts)),
 http.get(`${import.meta.env.BASE_URL}api/admin/offers`,()=>HttpResponse.json(offers)),
 http.post(`${import.meta.env.BASE_URL}api/admin/offers`,async({request})=>{const data=await request.json();const item={...data,id:String(Date.now()),clicks:0,conversion:0,brand:data.title[0],color:'#6956e8'};offers=[item,...offers];return HttpResponse.json(item,{status:201})}),
 http.put(`${import.meta.env.BASE_URL}api/admin/offers/:id`,async({params,request})=>{const data=await request.json();offers=offers.map(x=>x.id===params.id?{...x,...data}:x);return HttpResponse.json(offers.find(x=>x.id===params.id))}),
 http.delete(`${import.meta.env.BASE_URL}api/admin/offers/:id`,({params})=>{offers=offers.map(x=>x.id===params.id?{...x,status:'На паузе'}:x);return HttpResponse.json({ok:true})}),
 http.get(`${import.meta.env.BASE_URL}api/admin/analytics/:id`,({params})=>{const offer=offers.find(x=>x.id===params.id)||offers[0];return HttpResponse.json({offer,chart:chartData.map((x,i)=>({...x,clicks:x.clicks+i*7,conversions:Math.round(x.clicks*(offer.conversion||10)/100)}))})})
];
