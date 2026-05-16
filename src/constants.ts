import { ModuleConfig } from "./types";

export const MODULES: ModuleConfig[] = [
  {
    id: "assessment",
    title: "需求评估助手",
    description: "输入服务对象信息，生成结构化评估报告，识别风险与需求。",
    icon: "ClipboardCheck",
    placeholder: "例如：案主，女，75岁，独居。近期摔倒过一次，主诉感到孤独，食欲减退...",
    promptLabel: "输入服务对象基本情况与观察到的问题",
  },
  {
    id: "record",
    title: "个案记录生成",
    description: "整理口述记录或录音稿，自动生成标准化个案服务记录。",
    icon: "FileText",
    placeholder: "粘贴你的原始访谈笔记或录音转文字内容...",
    promptLabel: "服务过程口述或原始笔记",
  },
  {
    id: "plan",
    title: "服务方案生成",
    description: "基于理论与案例，为案主定制介入策略与长期目标。",
    icon: "Lightbulb",
    placeholder: "案主由于失业导致家庭紧张，希望寻找重新就业的机会...",
    promptLabel: "案主核心问题与初步期望",
  },
  {
    id: "empathy",
    title: "情感回应参考",
    description: "提供多元化的共情回应句式，提升社工沟通专业度。",
    icon: "HeartHandshake",
    placeholder: "案主说：‘我觉得这辈子就到这了，谁也帮不了我，真的好累。’",
    promptLabel: "服务对象表达的情绪或困境",
  },
  {
    id: "ethics",
    title: "伦理判断辅助",
    description: "提供伦理思考框架，辅助处理实务中的保密与保护两难。",
    icon: "ShieldAlert",
    placeholder: "案主告诉我他有自残倾向，但由于极度不信任机构，要求我绝对保密...",
    promptLabel: "描述工作中遇到的伦理两难情境",
  },
  {
    id: "policy",
    title: "政策资源查询",
    description: "检索相关政策福利清单，提供申请流程与机构联系方式。",
    icon: "Search",
    placeholder: "案主属于低保家庭，家中有残障人士，在上海地区...",
    promptLabel: "查询案主的特定身份与地区背景",
  },
];
