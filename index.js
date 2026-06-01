import { useState, useEffect } from 'react'
import Head from 'next/head'

const S = {
  // Layout
  shell: { display:'flex', minHeight:'100vh', background:'#f5f0e8' },
  sidebar: { width:220, background:'#0d0d0d', display:'flex', flexDirection:'column', padding:'1.5rem 1rem', position:'fixed', top:0, left:0, height:'100vh', zIndex:50 },
  main: { flex:1, marginLeft:220, padding:'2rem', maxWidth:860, },
  // Nav
  logo: { fontFamily:"'Playfair Display',serif", fontSize:'1.2rem', fontWeight:900, color:'#f5f0e8', marginBottom:'2rem', paddingLeft:'0.5rem', display:'flex', alignItems:'center', gap:'0.4rem' },
  logoDot: { color:'#e8461a' },
  navBtn: { display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.7rem 0.9rem', borderRadius:10, fontSize:'0.88rem', fontWeight:500, color:'rgba(255,255,255,0.45)', background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left', marginBottom:'0.2rem', transition:'all 0.2s' },
  navActive: { color:'#f5f0e8', background:'rgba(232,70,26,0.2)' },
  // Ring
  sideBot: { marginTop:'auto', display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.9rem', background:'rgba(255,255,255,0.05)', borderRadius:12 },
  ringWrap: { position:'relative', width:44, height:44, flexShrink:0 },
  ringPct: { position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.6rem', fontWeight:700, color:'#f5f0e8' },
  sideProg: { display:'flex', flexDirection:'column' },
  sideProgNum: { color:'#f5f0e8', fontWeight:700, fontSize:'0.95rem' },
  sideProgLbl: { color:'rgba(255,255,255,0.35)', fontSize:'0.72rem' },
  // Page
  pageHead: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' },
  greeting: { fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(13,13,13,0.4)', marginBottom:'0.2rem' },
  title: { fontFamily:"'Playfair Display',serif", fontSize:'2rem', fontWeight:900, lineHeight:1.1 },
  dateLbl: { fontSize:'0.82rem', color:'rgba(13,13,13,0.4)', marginTop:'0.2rem' },
  // Progress bar
  progWrap: { textAlign:'right' },
  progBar: { width:180, height:7, background:'#e2ddd5', borderRadius:4, overflow:'hidden', marginBottom:'0.35rem' },
  progFill: { height:'100%', background:'linear-gradient(90deg,#4a7c59,#e8461a)', borderRadius:4, transition:'width 0.5s ease' },
  progLbl: { fontSize:'0.78rem', color:'rgba(13,13,13,0.5)' },
  // Week
  weekRow: { display:'flex', gap:'0.4rem', padding:'1rem', background:'#fff', borderRadius:14, border:'1px solid #e2ddd5', marginBottom:'1.5rem' },
  dayCell: { flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.3rem' },
  dayLbl: { fontSize:'0.65rem', fontWeight:600, color:'rgba(13,13,13,0.35)', textTransform:'uppercase' },
  dayBub: { width:34, height:34, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.82rem', fontWeight:600, transition:'all 0.3s', border:'2px solid #e2ddd5' },
  dayCnt: { fontSize:'0.6rem', color:'rgba(13,13,13,0.35)' },
  // Habits
  habitList: { display:'flex', flexDirection:'column', gap:'0.65rem' },
  habitCard: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.1rem', background:'#fff', border:'1px solid #e2ddd5', borderRadius:13, cursor:'pointer', transition:'all 0.2s', animation:'fadeUp 0.4s ease forwards', opacity:0 },
  habitLeft: { display:'flex', alignItems:'center', gap:'0.8rem', flex:1 },
  habitCheck: { width:24, height:24, borderRadius:7, border:'2px solid #e2ddd5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontWeight:800, color:'#fff', flexShrink:0, transition:'all 0.2s' },
  habitName: { fontSize:'0.92rem', fontWeight:500 },
  streakBadge: { fontSize:'0.78rem', fontWeight:700, color:'#e8461a', background:'rgba(232,70,26,0.08)', padding:'0.18rem 0.55rem', borderRadius:50 },
  addBtn: { display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.9rem 1.1rem', background:'transparent', border:'2px dashed #e2ddd5', borderRadius:13, color:'rgba(13,13,13,0.35)', fontSize:'0.88rem', fontWeight:500, cursor:'pointer', width:'100%', transition:'all 0.2s' },
  // Stats
  statsGrid: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'0.9rem', marginBottom:'1.5rem' },
  statCard: { background:'#fff', border:'1px solid #e2ddd5', borderRadius:13, padding:'1.1rem', display:'flex', flexDirection:'column', gap:'0.25rem' },
  statIcon: { fontSize:'1.1rem' },
  statVal: { fontFamily:"'Playfair Display',serif", fontSize:'1.5rem', fontWeight:900 },
  statLbl: { fontSize:'0.75rem', color:'rgba(13,13,13,0.45)', fontWeight:500 },
  // Breakdown
  subTitle: { fontFamily:"'Playfair Display',serif", fontSize:'1.15rem', fontWeight:700, marginBottom:'0.9rem' },
  bkCard: { background:'#fff', border:'1px solid #e2ddd5', borderRadius:13, padding:'1.25rem', marginBottom:'0.75rem' },
  bkTop: { display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.75rem' },
  bkName: { flex:1, fontWeight:600, fontSize:'0.92rem' },
  bkSub: { display:'block', fontSize:'0.75rem', color:'rgba(13,13,13,0.4)' },
  rateBar: { height:5, background:'#e2ddd5', borderRadius:3, overflow:'hidden', marginBottom:'0.35rem' },
  rateFill: { height:'100%', borderRadius:3, transition:'width 0.6s ease' },
  rateLbl: { display:'flex', justifyContent:'space-between', fontSize:'0.74rem', color:'rgba(13,13,13,0.45)', marginBottom:'0.75rem' },
  heatmap: { display:'flex', gap:3, flexWrap:'wrap' },
  heatCell: { width:13, height:13, borderRadius:3 },
  // Manage
  addForm: { background:'#fff', border:'1px solid #e2ddd5', borderRadius:14, padding:'1.5rem', marginBottom:'1.25rem' },
  addFormTitle: { fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:700, marginBottom:'1rem' },
  formLbl: { display:'block', fontSize:'0.75rem', fontWeight:600, color:'rgba(13,13,13,0.45)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.4rem' },
  input: { width:'100%', padding:'0.7rem 0.9rem', border:'1.5px solid #e2ddd5', borderRadius:9, fontSize:'0.92rem', fontFamily:"'DM Sans',sans-serif", background:'#faf7f2', color:'#0d0d0d', outline:'none' },
  iconPicker: { display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1rem' },
  iconBtn: { width:38, height:38, borderRadius:8, border:'1.5px solid #e2ddd5', background:'#faf7f2', fontSize:'1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' },
  colorPicker: { display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1rem' },
  colorBtn: { width:28, height:28, borderRadius:'50%', border:'3px solid transparent', cursor:'pointer', transition:'transform 0.15s' },
  targetRow: { display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem' },
  targetBtn: { width:30, height:30, borderRadius:7, border:'1.5px solid #e2ddd5', background:'#faf7f2', fontSize:'1rem', fontWeight:700, cursor:'pointer', color:'#0d0d0d' },
  targetVal: { fontFamily:"'Playfair Display',serif", fontSize:'1.4rem', fontWeight:900, color:'#e8461a', minWidth:28, textAlign:'center' },
  btnRed: { background:'#e8461a', color:'#fff', border:'none', padding:'0.65rem 1.4rem', borderRadius:50, fontSize:'0.88rem', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", boxShadow:'0 4px 14px rgba(232,70,26,0.3)', transition:'all 0.2s' },
  manageCard: { display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', border:'1px solid #e2ddd5', borderRadius:12, padding:'1rem 1.1rem', marginBottom:'0.65rem' },
  manageLeft: { display:'flex', alignItems:'center', gap:'0.9rem', paddingLeft:'0.75rem' },
  delBtn: { background:'none', border:'none', fontSize:'1rem', cursor:'pointer', opacity:0.3, transition:'opacity 0.2s', padding:'0.25rem' },
  // Mobile nav
  mobileNav: { display:'none', position:'fixed', bottom:0, left:0, right:0, background:'#0d0d0d', padding:'0.6rem 1rem', zIndex:100, borderTop:'1px solid rgba(255,255,255,0.07)' },
  mobileNavItem: { flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'0.15rem', background:'none', border:'none', color:'rgba(255,255,255,0.35)', fontSize:'0.65rem', fontFamily:"'DM Sans',sans-serif", fontWeight:500, cursor:'pointer', padding:'0.3rem', borderRadius:7, transition:'all 0.2s' },
}

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const ICONS = ['🏃','📚','🧘','💧','💪','🥗','😴','✍️','🎸','🧠','🚴','🏊','🌿','🎯','🛁']
const COLORS = ['#e8461a','#4a7c59','#c9a84c','#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981']

const DEFAULT_HABITS = [
  { id:1, name:'Morning Run', icon:'🏃', color:'#e8461a', target:1 },
  { id:2, name:'Read 30 min', icon:'📚', color:'#4a7c59', target:1 },
  { id:3, name:'Meditate', icon:'🧘', color:'#c9a84c', target:1 },
  { id:4, name:'Drink Water', icon:'💧', color:'#3b82f6', target:8 },
]

function dk(offset=0){
  const d=new Date(); d.setDate(d.getDate()+offset)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function getStreak(completions,id){
  let s=0,o=0
  while(true){
    if(completions[dk(-o)]?.[id]) { s++; o++ } else break
    if(o>365) break
  }
  return s
}

function getLast7(){
  return Array.from({length:7},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(6-i))
    return { key:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`, label:DAYS[d.getDay()], date:d.getDate(), isToday:i===6 }
  })
}

function getLast30(){
  return Array.from({length:30},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-(29-i))
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  })
}

export default function HabitForge(){
  const [habits,setHabits]=useState(DEFAULT_HABITS)
  const [completions,setCompletions]=useState({})
  const [view,setView]=useState('today')
  const [showAdd,setShowAdd]=useState(false)
  const [newH,setNewH]=useState({name:'',icon:'🎯',color:'#e8461a',target:1})
  const [pop,setPop]=useState(null)
  const [mounted,setMounted]=useState(false)

  const today=dk(0)
  const last7=getLast7()
  const last30=getLast30()
  const now=new Date()
  const todayC=completions[today]||{}
  const done=habits.filter(h=>(todayC[h.id]||0)>=(h.target||1)).length
  const pct=habits.length?Math.round(done/habits.length*100):0
  const greeting=now.getHours()<12?'Good morning':now.getHours()<17?'Good afternoon':'Good evening'

  useEffect(()=>{
    setMounted(true)
    try{
      const h=localStorage.getItem('hf2_habits')
      const c=localStorage.getItem('hf2_comp')
      if(h)setHabits(JSON.parse(h))
      if(c)setCompletions(JSON.parse(c))
    }catch{}
  },[])

  useEffect(()=>{
    if(!mounted)return
    try{
      localStorage.setItem('hf2_habits',JSON.stringify(habits))
      localStorage.setItem('hf2_comp',JSON.stringify(completions))
    }catch{}
  },[habits,completions,mounted])

  const toggle=(id)=>{
    setCompletions(prev=>{
      const day=prev[today]||{}
      const habit=habits.find(h=>h.id===id)
      const target=habit?.target||1
      const cur=day[id]||0
      const next=cur>=target?0:cur+1
      if(next===target){setPop(id);setTimeout(()=>setPop(null),700)}
      return {...prev,[today]:{...day,[id]:next}}
    })
  }

  const addHabit=()=>{
    if(!newH.name.trim())return
    setHabits(p=>[...p,{...newH,id:Date.now(),name:newH.name.trim()}])
    setNewH({name:'',icon:'🎯',color:'#e8461a',target:1})
    setShowAdd(false)
  }

  const delHabit=(id)=>{ if(confirm('Delete this habit?'))setHabits(p=>p.filter(h=>h.id!==id)) }

  if(!mounted)return null

  const navItems=[{id:'today',icon:'✦',label:'Today'},{id:'stats',icon:'◎',label:'Stats'},{id:'manage',icon:'◈',label:'Habits'}]

  return(
    <>
      <Head>
        <title>HabitForge — Track Your Habits</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
      <div style={S.shell}>

        {/* SIDEBAR */}
        <aside style={S.sidebar}>
          <div style={S.logo}><span style={S.logoIcon}>◆</span> HabitForge</div>
          <nav>
            {navItems.map(n=>(
              <button key={n.id} style={{...S.navBtn,...(view===n.id?S.navActive:{})}} onClick={()=>setView(n.id)}>
                <span>{n.icon}</span><span>{n.label}</span>
              </button>
            ))}
          </nav>
          <div style={S.sideBot}>
            <div style={S.ringWrap}>
              <svg viewBox="0 0 36 36" style={{width:44,height:44}}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8461a" strokeWidth="3"
                  strokeDasharray={`${pct} ${100-pct}`} strokeLinecap="round" transform="rotate(-90 18 18)"
                  style={{transition:'stroke-dasharray 0.5s ease'}}/>
              </svg>
              <span style={S.ringPct}>{pct}%</span>
            </div>
            <div style={S.sideProg}>
              <strong style={S.sideProgNum}>{done}/{habits.length}</strong>
              <span style={S.sideProgLbl}>done today</span>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main style={S.main}>

          {/* TODAY */}
          {view==='today'&&(
            <div style={{animation:'fadeUp 0.4s ease forwards'}}>
              <div style={S.pageHead}>
                <div>
                  <p style={S.greeting}>{greeting} 👋</p>
                  <h1 style={S.title}>{pct===100?'All done! 🎉':pct>50?'Keep going!':'Let\'s build.'}</h1>
                  <p style={S.dateLbl}>{now.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</p>
                </div>
                <div style={S.progWrap}>
                  <div style={S.progBar}><div style={{...S.progFill,width:`${pct}%`}}/></div>
                  <span style={S.progLbl}>{done} of {habits.length} habits</span>
                </div>
              </div>

              {/* WEEK */}
              <div style={S.weekRow}>
                {last7.map(day=>{
                  const d=habits.filter(h=>(completions[day.key]?.[h.id]||0)>=(h.target||1)).length
                  const p=habits.length?d/habits.length:0
                  return(
                    <div key={day.key} style={S.dayCell}>
                      <span style={S.dayLbl}>{day.label}</span>
                      <div style={{...S.dayBub,background:p===0?'transparent':`rgba(232,70,26,${0.12+p*0.88})`,border:day.isToday?'2px solid #e8461a':'2px solid #e2ddd5',color:day.isToday?'#e8461a':'#0d0d0d',fontWeight:day.isToday?700:600}}>
                        {day.date}
                      </div>
                      <span style={S.dayCnt}>{d}/{habits.length}</span>
                    </div>
                  )
                })}
              </div>

              {/* HABITS */}
              <div style={S.habitList}>
                {habits.map((h,i)=>{
                  const cnt=todayC[h.id]||0
                  const isDone=cnt>=(h.target||1)
                  const streak=getStreak(completions,h.id)
                  return(
                    <div key={h.id}
                      style={{...S.habitCard,animationDelay:`${i*0.06}s`,background:isDone?'#faf7f2':'#fff',borderLeft:`4px solid ${isDone?h.color:'transparent'}`,transform:pop===h.id?'scale(1.02)':'scale(1)'}}
                      onClick={()=>toggle(h.id)}>
                      <div style={S.habitLeft}>
                        <div style={{...S.habitCheck,background:isDone?h.color:'transparent',borderColor:isDone?h.color:'#e2ddd5'}}>
                          {isDone&&'✓'}
                        </div>
                        <div>
                          <div style={S.habitName}><span style={{marginRight:6}}>{h.icon}</span>{h.name}</div>
                          {h.target>1&&(
                            <div style={{display:'flex',alignItems:'center',gap:'0.4rem',marginTop:'0.2rem'}}>
                              <div style={{width:70,height:4,background:'#e2ddd5',borderRadius:2,overflow:'hidden'}}>
                                <div style={{width:`${Math.min(cnt/h.target,1)*100}%`,height:'100%',background:h.color,borderRadius:2,transition:'width 0.3s'}}/>
                              </div>
                              <span style={{fontSize:'0.7rem',color:'rgba(13,13,13,0.45)'}}>{cnt}/{h.target}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {streak>0&&<span style={S.streakBadge}>🔥 {streak}</span>}
                    </div>
                  )
                })}
                <button style={S.addBtn} onClick={()=>{setShowAdd(true);setView('manage')}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor='#e8461a';e.currentTarget.style.color='#e8461a'}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor='#e2ddd5';e.currentTarget.style.color='rgba(13,13,13,0.35)'}}>
                  <span>+</span> Add a habit
                </button>
              </div>
            </div>
          )}

          {/* STATS */}
          {view==='stats'&&(
            <div style={{animation:'fadeUp 0.4s ease forwards'}}>
              <div style={S.pageHead}>
                <div>
                  <p style={S.greeting}>Your progress</p>
                  <h1 style={S.title}>Consistency is key.</h1>
                </div>
              </div>
              <div style={S.statsGrid}>
                {[
                  {icon:'🔥',val:Math.max(...habits.map(h=>getStreak(completions,h.id)),0)+' days',lbl:'Best Streak'},
                  {icon:'📅',val:last7.reduce((a,day)=>a+habits.filter(h=>(completions[day.key]?.[h.id]||0)>=(h.target||1)).length,0),lbl:'Done This Week'},
                  {icon:'✦',val:habits.length,lbl:'Total Habits'},
                  {icon:'⬡',val:pct+'%',lbl:'Today'},
                ].map(s=>(
                  <div key={s.lbl} style={S.statCard}>
                    <span style={S.statIcon}>{s.icon}</span>
                    <strong style={S.statVal}>{s.val}</strong>
                    <span style={S.statLbl}>{s.lbl}</span>
                  </div>
                ))}
              </div>
              <h2 style={S.subTitle}>Habit Breakdown</h2>
              {habits.map(h=>{
                const streak=getStreak(completions,h.id)
                const comp30=last30.filter(k=>(completions[k]?.[h.id]||0)>=(h.target||1)).length
                const rate=Math.round(comp30/30*100)
                return(
                  <div key={h.id} style={S.bkCard}>
                    <div style={S.bkTop}>
                      <span style={{fontSize:'1.4rem'}}>{h.icon}</span>
                      <div style={S.bkName}>
                        <strong>{h.name}</strong>
                        <span style={S.bkSub}>{comp30}/30 days this month</span>
                      </div>
                      <span style={{fontSize:'0.85rem',fontWeight:700,color:'#e8461a'}}>🔥 {streak}</span>
                    </div>
                    <div style={S.rateBar}><div style={{...S.rateFill,width:`${rate}%`,background:h.color}}/></div>
                    <div style={S.rateLbl}>
                      <span>{rate}% completion</span>
                      <span>{rate>=80?'🌟 Excellent':rate>=50?'👍 Good':'💪 Keep going'}</span>
                    </div>
                    <div style={S.heatmap}>
                      {last30.map(k=>(
                        <div key={k} style={{...S.heatCell,background:(completions[k]?.[h.id]||0)>=(h.target||1)?h.color:'#e2ddd5'}}/>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* MANAGE */}
          {view==='manage'&&(
            <div style={{animation:'fadeUp 0.4s ease forwards'}}>
              <div style={S.pageHead}>
                <div>
                  <p style={S.greeting}>Customise</p>
                  <h1 style={S.title}>Your habits.</h1>
                </div>
                <button style={S.btnRed} onClick={()=>setShowAdd(!showAdd)}>
                  {showAdd?'✕ Cancel':'+ New Habit'}
                </button>
              </div>
              {showAdd&&(
                <div style={S.addForm}>
                  <h3 style={S.addFormTitle}>Create New Habit</h3>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={S.formLbl}>Name</label>
                    <input style={S.input} placeholder="e.g. Morning Run" value={newH.name}
                      onChange={e=>setNewH(p=>({...p,name:e.target.value}))}
                      onKeyDown={e=>e.key==='Enter'&&addHabit()} autoFocus/>
                  </div>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={S.formLbl}>Icon</label>
                    <div style={S.iconPicker}>
                      {ICONS.map(ic=>(
                        <button key={ic} style={{...S.iconBtn,borderColor:newH.icon===ic?'#e8461a':'#e2ddd5',background:newH.icon===ic?'rgba(232,70,26,0.1)':'#faf7f2'}}
                          onClick={()=>setNewH(p=>({...p,icon:ic}))}>{ic}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={S.formLbl}>Color</label>
                    <div style={S.colorPicker}>
                      {COLORS.map(c=>(
                        <button key={c} style={{...S.colorBtn,background:c,borderColor:newH.color===c?'#0d0d0d':'transparent',transform:newH.color===c?'scale(1.15)':'scale(1)'}}
                          onClick={()=>setNewH(p=>({...p,color:c}))}/>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:'1rem'}}>
                    <label style={S.formLbl}>Daily target</label>
                    <div style={S.targetRow}>
                      <button style={S.targetBtn} onClick={()=>setNewH(p=>({...p,target:Math.max(1,p.target-1)}))}>−</button>
                      <span style={S.targetVal}>{newH.target}</span>
                      <button style={S.targetBtn} onClick={()=>setNewH(p=>({...p,target:p.target+1}))}>+</button>
                      <span style={{fontSize:'0.82rem',color:'rgba(13,13,13,0.45)'}}>{newH.target===1?'once per day':'times per day'}</span>
                    </div>
                  </div>
                  <button style={S.btnRed} onClick={addHabit}>✓ Add Habit</button>
                </div>
              )}
              <div>
                {habits.map(h=>{
                  const streak=getStreak(completions,h.id)
                  return(
                    <div key={h.id} style={S.manageCard}>
                      <div style={{...S.manageLeft,borderLeft:`4px solid ${h.color}`}}>
                        <span style={{fontSize:'1.4rem'}}>{h.icon}</span>
                        <div>
                          <strong style={{fontSize:'0.92rem'}}>{h.name}</strong>
                          <span style={{display:'block',fontSize:'0.75rem',color:'rgba(13,13,13,0.4)'}}>
                            {h.target}x daily · {streak>0?`🔥 ${streak} day streak`:'No streak yet'}
                          </span>
                        </div>
                      </div>
                      <button style={S.delBtn} onClick={()=>delHabit(h.id)}
                        onMouseOver={e=>e.currentTarget.style.opacity='1'}
                        onMouseOut={e=>e.currentTarget.style.opacity='0.3'}>🗑</button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </main>

        {/* MOBILE NAV */}
        <nav style={{...S.mobileNav,display:'flex'}}>
          {navItems.map(n=>(
            <button key={n.id} style={{...S.mobileNavItem,...(view===n.id?{color:'#e8461a',background:'rgba(232,70,26,0.1)'}:{})}}
              onClick={()=>setView(n.id)}>
              <span style={{fontSize:'1rem'}}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <style>{`
          @media(max-width:768px){
            aside{display:none!important}
            main{margin-left:0!important;padding:1.25rem 1rem 80px!important}
          }
          @media(min-width:769px){
            nav[style*="position:fixed"]{display:none!important}
          }
          button:active{transform:scale(0.97)}
        `}</style>
      </div>
    </>
  )
}
