import React from 'react';
import {NavLink,useNavigate} from 'react-router-dom';
import {LayoutDashboard,Compass,BarChart3,WalletCards,LogOut,Plus,Gift,ChevronRight,Bell,Search,Users,BriefcaseBusiness,PanelLeftClose,Menu} from 'lucide-react';
import {useAppStore} from './store';

export const money=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₽';
export function Button({children,variant='',icon:Icon,onClick,type='button',disabled=false}){return <button type={type} disabled={disabled} onClick={onClick} className={'btn '+variant}>{Icon&&<Icon size={18}/>}<span>{children}</span></button>}
export function Badge({children,tone=''}){return <span className={'badge '+tone}>{children}</span>}
export function Brand({offer,size='normal'}){return <span className={'brand '+size} style={{background:offer.color}}>{offer.brand}</span>}
export function StatCard({icon:Icon,label,value,detail,tone='purple'}){return <div className="stat-card"><span className={'stat-icon '+tone}><Icon size={21}/></span><div><p>{label}</p><strong>{value}</strong><small>{detail}</small></div></div>}
const studentNav=[['/student',LayoutDashboard,'Обзор'],['/student/offers',Compass,'Офферы'],['/student/stats',BarChart3,'Статистика'],['/student/payouts',WalletCards,'Выплаты']];
const adminNav=[['/admin',LayoutDashboard,'Обзор'],['/admin/offers',BriefcaseBusiness,'Офферы']];
export function Shell({role,children,title,subtitle,action}){
 const nav=role==='student'?studentNav:adminNav;const navigate=useNavigate();const {toast}=useAppStore();
 return <div className="app-shell"><aside className="sidebar"><div className="logo"><span><Gift size={21}/></span>StudLink</div><div className="role-pill"><span className="avatar">{role==='student'?'АК':'МО'}</span><div><b>{role==='student'?'Алексей К.':'Мария О.'}</b><small>{role==='student'?'Студент · демо':'Администратор · демо'}</small></div></div><nav>{nav.map(([to,I,label])=><NavLink key={to} end={to==='/student'||to==='/admin'} to={to}><I size={19}/>{label}</NavLink>)}</nav><button className="logout" onClick={()=>navigate('/login')}><LogOut size={18}/>Сменить роль</button></aside><main><header className="topbar"><div className="mobile-logo"><Gift size={20}/>StudLink</div><div className="top-search"><Search size={17}/><span>Поиск</span></div><button className="icon-button"><Bell size={19}/><i/></button><span className="top-avatar">{role==='student'?'АК':'МО'}</span></header><div className="mobile-nav">{nav.map(([to,I,label])=><NavLink key={to} end={to==='/student'||to==='/admin'} to={to}><I size={19}/><small>{label}</small></NavLink>)}</div><div className="page"><div className="page-head"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>{children}</div><FundBanner/></main>{toast&&<div className="toast">✓ {toast}</div>}</div>
}
export function Empty({title,text}){return <div className="empty"><span>✦</span><h3>{title}</h3><p>{text}</p></div>}
export function Progress({value,max}){return <div className="progress"><i style={{width:`${Math.min(100,value/max*100)}%`}}/></div>}
export function FundBanner(){return <footer className="fund-banner"><img src={`${import.meta.env.BASE_URL}fund-support-banner.png`} alt="Проект выполнен при поддержке Фонда содействия инновациям"/></footer>}
