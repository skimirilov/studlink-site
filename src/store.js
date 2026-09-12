import {create} from 'zustand';
export const useAppStore=create(set=>({role:'student',toast:null,setRole:role=>set({role}),showToast:toast=>{set({toast});setTimeout(()=>set({toast:null}),2500)}}));
