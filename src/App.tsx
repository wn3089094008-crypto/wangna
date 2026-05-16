import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { 
  LayoutDashboard, 
  ChevronLeft, 
  ClipboardCheck, 
  FileText, 
  Lightbulb, 
  HeartHandshake, 
  ShieldAlert, 
  Search,
  Copy,
  Download,
  Save,
  Send,
  Loader2,
  Sparkles,
  Quote
} from "lucide-react";
import { MODULES } from "./constants";
import { ModuleId, AIResponse } from "./types";

const IconMap = {
  ClipboardCheck,
  FileText,
  Lightbulb,
  HeartHandshake,
  ShieldAlert,
  Search
};

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [inputContent, setInputContent] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState("陈晓明先生");
  const [history] = useState<Array<{id: string, title: string, date: string, content: string, module: ModuleId}>>([
    { 
      id: "1", 
      title: "李咏梅女士 需求评估报告", 
      date: "05-15",
      module: "assessment",
      content: "# 1. 评估背景\n\n案主 **李咏梅女士**，75岁，目前处于独居状态。据访谈了解到，该案主近期有一次轻微的跌倒史，由于长期独居且子女均在异地，案主表现出较为明显的孤独状态，并伴有食欲下降。\n\n# 2. 核心风险评估\n\n## 2.1 身体安全风险\n案主近期跌倒史提示其居家安全环境存在隐患，且高龄独居者若发生二次跌倒，缺乏及时的救援响应机制。\n\n## 2.2 心理健康风险\n由于缺乏社交互动，案主主诉的孤独感可能进一步引发抑郁倾向。食欲减退可能影响其基本的营养摄入，需警惕虚弱引发的并发症。\n\n# 3. 介入建议\n\n1. 联系社区安装智慧助老“防跌倒”报警器；\n2. 引入社区助老送餐服务，确保每日基本营养；\n3. 安排志愿者定期进行“精神慰藉”走访，建立情感连接。"
    },
    { 
      id: "2", 
      title: "向阳先生 个案服务记录", 
      date: "05-14",
      module: "record",
      content: "# 1. 服务记录摘要\n\n案主 **向阳先生** 今日在面谈时表现出较强的情绪波动。针对近期失业带来的家庭经济压力，其爱人表现出焦虑，双方发生多次口头冲突。\n\n# 2. 沟通重点\n\n## 2.1 情绪宣泄\n社工协助向阳先生进行了充分的情绪释放，运用同理心技巧肯定了其为家庭挣钱养家的意愿和难处。\n\n## 2.2 应对策略讨论\n通过共同梳理财务状况，初步明确了分阶段解决生计问题的思路，包括向当地街道申请临时低保补贴。\n\n# 3. 后续工作方案\n\n1. 下周二下午3点进行上门回访；\n2. 协助向阳先生联系周边的灵活用工资源站。"
    },
  ]);

  const socialWorkerQuotes = [
    "助人自助，为乐为伴",
    "每一份努力，都值得被看见",
    "专业承载希望，共情连接心灵",
    "用生命影响生命"
  ];

  const handleOpenHistory = (item: typeof history[0]) => {
    setActiveModule(item.module);
    setAiResult(item.content);
    setInputContent("（已存档的历史记录）");
  };

  const handleGenerate = async () => {
    if (!activeModule || !inputContent) return;
    
    setIsGenerating(true);
    setAiResult("");
    
    try {
      const response = await fetch(`/api/ai/${activeModule}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: inputContent })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "请求失败");
      }
      
      const data: AIResponse = await response.json();
      setAiResult(data.text);
    } catch (err: any) {
      setAiResult(`生成失败: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const activeModuleConfig = MODULES.find(m => m.id === activeModule);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "凌晨好，辛苦了";
    if (hour < 11) return "上午好";
    if (hour < 14) return "中午好";
    if (hour < 18) return "下午好";
    return "晚安，社工伙伴";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffaf5] selection:bg-orange-200 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-100/30 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="h-24 sticky top-0 flex items-center px-6 md:px-12 bg-white/70 backdrop-blur-2xl border-b border-orange-100/50 z-50 shadow-sm shadow-orange-500/5">
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer" onClick={() => setActiveModule(null)}>
            <div className="absolute -inset-2 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200 ring-4 ring-orange-50 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
               <HeartHandshake size={32} strokeWidth={2.5} className="relative drop-shadow-md" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-100/50 px-2 py-0.5 rounded-lg border border-orange-200/50">V2.0 Pro</span>
              <span className="text-[10px] font-bold text-slate-400">| {userName}，{getTimeGreeting()}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter">
              智设助人 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">AI OS</span>
            </h1>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <div className="flex items-center gap-2 text-orange-700/80">
              <Quote size={14} className="fill-orange-400 text-orange-400 opacity-50" />
              <span className="text-xs font-bold">{socialWorkerQuotes[Math.floor(Date.now() / 3600000 % socialWorkerQuotes.length)]}</span>
            </div>
            <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider mt-1">Daily Social Worker Inspiration</span>
          </div>
          <div className="h-10 w-px bg-slate-100 mx-2" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-800">{userName}</p>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Certified Social Worker</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-100 ring-2 ring-white">
              <span className="font-black text-lg">{userName[0]}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-16 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto space-y-12"
            >
              {/* Hero Section */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-200 via-amber-100 to-orange-200 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
                <div className="relative bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(251,146,60,0.1)] border border-orange-100/50 overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-150 rotate-12">
                    <HeartHandshake size={300} className="text-orange-600" />
                  </div>
                  
                  <div className="max-w-3xl relative z-10 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100/50 to-amber-100/50 border border-orange-200/50 text-orange-800 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm">
                      <Sparkles size={14} className="text-orange-500 animate-pulse" />
                      Social Work Professional Intelligence
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-800 leading-[1.05] mb-8 tracking-tighter">
                      让每一次服务 <br />
                      都带上 <span className="text-orange-600 relative inline-block">
                        专业的温度
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-400/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="6" />
                        </svg>
                      </span>
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed font-bold mb-12 max-w-xl mx-auto md:mx-0">
                      智设助人 AI 深度融合社会工作伦理与实务，为您提供精准、温情、可靠的专业支持。
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-12">
                      <div className="flex flex-col gap-1">
                        <span className="text-5xl font-black text-orange-600">赋能</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Capacity Empowerment</span>
                      </div>
                      <div className="w-px h-16 bg-orange-100 hidden sm:block" />
                      <div className="flex flex-col gap-1 text-center font-sans">
                        <span className="text-5xl font-black text-slate-800">循证</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Evidence-Based</span>
                      </div>
                      <div className="w-px h-16 bg-orange-100 hidden sm:block" />
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-5xl font-black text-slate-800">共情</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Professional Empathy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Section */}
              <div className="space-y-10">
                <div className="relative">
                  <div className="absolute left-0 top-1/2 w-full h-px bg-orange-100" />
                  <div className="relative inline-flex items-center gap-3 bg-[#fffaf5] pr-6">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-orange-100">
                      <Sparkles className="text-orange-500" size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800">专业工具箱</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                  {MODULES.map((module) => {
                    const Icon = IconMap[module.icon as keyof typeof IconMap];
                    return (
                      <button
                        key={module.id}
                        onClick={() => setActiveModule(module.id)}
                        className="p-8 rounded-[2.5rem] bg-white border border-orange-100/50 flex flex-col items-center gap-6 transition-all duration-500 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] -rotate-12 transform group-hover:scale-150 transition-transform duration-700">
                          <Icon size={120} />
                        </div>
                        
                        <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600 rounded-[1.5rem] flex items-center justify-center group-hover:from-orange-600 group-hover:to-orange-500 group-hover:text-white transition-all duration-500 shadow-sm border border-orange-100/50 group-hover:shadow-orange-200 group-hover:shadow-xl">
                          <Icon size={40} strokeWidth={2.5} />
                        </div>
                        <div className="relative z-10">
                          <h4 className="font-black text-2xl text-slate-800 group-hover:text-orange-600 transition-colors mb-3 tracking-tight">{module.title}</h4>
                          <p className="text-slate-500 text-base leading-relaxed font-medium px-4">{module.description}</p>
                        </div>
                        <div className="relative z-10 mt-4 px-6 py-2 rounded-full bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all">
                          立即开启专业助手
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Records Section */}
              <section className="bg-white/40 p-8 lg:p-12 rounded-[2.5rem] border border-orange-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 -m-10 opacity-[0.03] rotate-12">
                   <LayoutDashboard size={300} />
                </div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                    <LayoutDashboard size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">工作档案库</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Recent Activities</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {history.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => handleOpenHistory(item)}
                      className="bg-white p-6 rounded-2xl border border-orange-50 flex justify-between items-center hover:border-orange-500 hover:scale-[1.02] hover:shadow-2xl transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                          <FileText size={24} />
                        </div>
                        <div>
                          <span className="text-slate-800 font-black text-lg block">{item.title}</span>
                          <span className="text-xs font-bold text-slate-400">点击查看详细存档内容</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-slate-400 text-xs font-black">{item.date}</span>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-orange-500 text-[10px] font-black uppercase tracking-tighter">ARCHIVED</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="module-page"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-5xl mx-auto pb-20"
            >
              <button 
                onClick={() => {
                  setActiveModule(null);
                  setInputContent("");
                  setAiResult("");
                }}
                className="flex items-center gap-2 text-orange-700/50 hover:text-orange-600 mb-8 transition-colors font-black text-sm uppercase tracking-widest"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-orange-100">
                  <ChevronLeft size={18} />
                </div>
                返回智设中心
              </button>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                <div className="w-24 h-24 bg-white text-orange-600 rounded-[2rem] flex items-center justify-center shadow-xl border border-orange-50 relative">
                  <div className="absolute -inset-1 bg-orange-400/20 rounded-[2.2rem] blur-sm" />
                  {activeModuleConfig && (() => {
                    const Icon = IconMap[activeModuleConfig.icon as keyof typeof IconMap];
                    return <Icon size={48} className="relative" />;
                  })()}
                </div>
                <div className="text-center md:text-left pt-2">
                  <h2 className="text-4xl font-black text-slate-800 mb-2">{activeModuleConfig?.title}</h2>
                  <p className="text-lg text-slate-400 font-bold">{activeModuleConfig?.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="card border-orange-100 p-0 overflow-hidden shadow-2xl">
                  <div className="bg-orange-50 p-6 border-b border-orange-100">
                    <h5 className="text-sm font-black text-orange-900 uppercase tracking-widest flex items-center gap-2">
                      <Send size={16} />
                      {activeModuleConfig?.promptLabel}
                    </h5>
                  </div>
                  <div className="p-6">
                    <textarea
                      className="input min-h-[300px] resize-none text-lg font-medium"
                      placeholder={activeModuleConfig?.placeholder}
                      value={inputContent}
                      onChange={(e) => setInputContent(e.target.value)}
                    />
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">AI Assistant Active</span>
                      </div>
                      <button 
                        disabled={isGenerating || !inputContent}
                        onClick={handleGenerate}
                        className="btn-primary flex items-center gap-3 px-8 py-4 text-lg font-black"
                      >
                        {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
                        {isGenerating ? "智设中..." : "启动AI加速"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card border-orange-200 bg-white/80 min-h-[500px] flex flex-col p-0 shadow-2xl relative">
                  {!aiResult && !isGenerating && (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-30">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                        <Sparkles size={40} className="text-slate-400" />
                      </div>
                      <p className="font-black text-slate-400 text-lg">等待生成建议</p>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                      <div className="relative mb-8 text-orange-600">
                        <Loader2 size={60} className="animate-spin" />
                      </div>
                      <h4 className="text-xl font-black text-slate-800 mb-2">正在深度解析实务背景</h4>
                      <p className="text-slate-400 font-bold">请稍候，我们将结合社工知识库为您生成最佳建议</p>
                    </div>
                  )}

                  {aiResult && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col h-full overflow-hidden"
                    >
                      <div className="p-6 border-b border-orange-100 flex justify-between items-center bg-white rounded-t-2xl">
                        <div className="flex items-center gap-3 text-orange-600">
                          <Sparkles size={20} />
                          <h5 className="font-black text-slate-800">AI 专业辅助建议</h5>
                        </div>
                        <div className="flex gap-1">
                          <button 
                             onClick={() => navigator.clipboard.writeText(aiResult)}
                             className="p-2.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all" 
                             title="复制结果"
                          >
                            <Copy size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-8 bg-orange-50/5 relative">
                        <div className="ai-result-content prose prose-orange max-w-none prose-headings:font-black prose-p:text-slate-700">
                          <ReactMarkdown>{aiResult}</ReactMarkdown>
                        </div>
                      </div>
                      <div className="p-6 border-t border-orange-100 bg-orange-50/50">
                        <div className="flex items-start gap-4 text-sm text-orange-800 font-medium leading-relaxed">
                          <ShieldAlert size={20} className="shrink-0 text-orange-500" />
                          <p>
                            <span className="font-black underline decoration-orange-300">提示：</span> 
                            本报告由AI基于实务模型生成。各地区政策差异显著，最终方案请结合当地具体执行规范及督导意见。
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-orange-100 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-4">
             <div className="flex gap-6 justify-center md:justify-start">
               <div className="flex flex-col">
                 <span className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em] mb-1">Our Mission</span>
                 <span className="text-sm font-black text-slate-600 italic">助人自助 · 为乐为伴</span>
               </div>
               <div className="flex flex-col border-l border-slate-100 pl-6">
                 <span className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em] mb-1">Our Value</span>
                 <span className="text-sm font-black text-slate-600 italic">以此为业 · 以人为本</span>
               </div>
             </div>
          </div>
          <div className="text-right">
             <p className="text-xs font-black text-slate-400 mb-2 invisible md:visible">DESIGNED BY PROFESSIONAL SOCIAL WORK EXPERTS</p>
             <p className="text-sm font-black text-orange-600 tracking-widest">智设AI · 用技术温暖人心</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
