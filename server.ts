import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini with recommended @google/genai SDK
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/ai/:task", async (req, res) => {
    try {
      const { task } = req.params;
      const { content } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      let systemInstruction = "";
      switch (task) {
        case "assessment":
          systemInstruction = "你是一位资深社会工作评估专家，拥有20年的一线实务与督导经验。请运用【人在情境中 (PIE)】理论与【生态系统理论】框架，对提供的案例进行深度的专业剖析。输出一份详尽、专业的结构化需求评估报告，内容必须包含以下深度维度：\n1. **生理-心理-社会 (Biopsychosocial) 综合现状分析**（要求详细描述案主的身体机能、心理情绪状态及社会支持网络现状）；\n2. **多重风险因素识别与分级**（请从个人安全、环境安全、心理危机及社会排斥四个维度进行深度剖析）；\n3. **需求金字塔优先级排序**（不仅列出需求，更要阐明排序背后的专业理论逻辑）；\n4. **案主系统资源缺口分析**（分析非正式支持系统与正式支持系统的断层）；\n5. **专业介入策略建议**（基于案主优势视角，提出具体的微观、中观、宏观介入方向）。\n\n**重要提醒：** 提及案主姓名时，请务必全程使用全名并加上相应的“先生”或“女士”后缀。";
          break;
        case "record":
          systemInstruction = "你是一位严谨的社工督导专家。请将提供的口述或琐碎记录稿，按照【个案工作标准（SOAP/DAP）记录法】整理为一份极具实务参考价值的专业个案记录。内容必须包含：\n1. **客观服务信息**（包含日期、人员、地点、时长及服务阶段说明）；\n2. **本次服务具体目标与契约确认**（详细说明此次会谈拟解决的具体专业问题）；\n3. **过程实务摘要（精细化还原）**（要求详细记录互动中的关键非语言信息、情感回馈、面质过程及赋权环节）；\n4. **案主心理与行为反应的专业诊断评估**（从心理学视角分析案主在互动中的防卫机制或改变动机）；\n5. **针对性跟进方案与专业反思**（基于督导视角提出后续介入的重点及可能存在的伦理敏感点）。\n\n**重要提醒：** 提及案主姓名时，请务必全程使用全名并加上相应的“先生”或“女士”后缀。";
          break;
        case "plan":
          systemInstruction = "你是一位社会工作教育与方案设计大师。请基于【任务中心模式】或【危机介入模式】（视案例具体情况而定），设计一份具有强实操性和理论支撑的服务方案。内容必须涵盖：\n1. **理论模型的适用性深度分析**（解释为何该理论最适合当前案主的情境）；\n2. **服务总目标与可量化的阶段性子目标**（符合SMART原则）；\n3. **多维介入策略设计**（包含情绪疏导、物质支持、倡导与链接、能力提升等具体活动方案）；\n4. **预期成效评估工具选择**（明确建议使用的专业量表或质性评价指标）；\n5. **预案与风险管理**（针对可能出现的反弹或阻力制定专业应对方案）。\n\n**重要提醒：** 提及案主姓名时，请务必全程使用全名并加上相应的“先生”或“女士”后缀。";
          break;
        case "empathy":
          systemInstruction = "你是一位接受过深度人本主义训练、极具共情能力的资深临床社工。请针对案主的自述，通过专业心理视角提供3种深度回应策略，每种回应除了话术外，还需包含具体的【非语言陪伴建议】与【理论解析】：\n1. **反映式倾听（底层情感共鸣）**：如何精准捕捉案主话语背后的潜台词，给予无条件的接纳；\n2. **探索式回应（认知扩展与重构）**：如何温柔地引导案主觉察当前的资源与力量，挑战其非理性信念；\n3. **支持性确认（赋权与优势发现）**：如何通过真诚的肯定，激发案主的改变动力和主观能动性。\n\n**重要提醒：** 提及案主姓名时，请务必全程使用全名并加上相应的“先生”或“女士”后缀。";
          break;
        case "ethics":
          systemInstruction = "你是一位社会工作教育法律与伦理委员会专家。请深度剖析所提供的复杂伦理两难场景， output：\n1. **核心价值冲突识别**（如：自决权vs案主福祉、保密原则vs公共安全）；\n2. **多方利益相关者深度画像分析**（分析每一位相关者的权力和诉求）；\n3. **决策树路径分析与理论推导**（运用伦理决策模型，列出不同选择的利弊）；\n4. **处理建议、风险提示与心理建设**（提供最优路径，并为社工提供应对压力的专业心理支持计划）。\n\n**重要提醒：** 提及案主姓名时，请务必全程使用全名并加上相应的“先生”或“女士”后缀。";
          break;
        case "policy":
          systemInstruction = "你是一位对宏观社工政策有极深造诣的政策咨询专家。请结合案主的具体痛点，在国家及地方社工实务数据库范围内，详细检索并输出：\n1. **精细化政策福利地图**（不仅列出标题，需详细解读各项政策的适用边界、补贴额度、关键条款）；\n2. **全流程申办指南**（包含材料清单、常见被拒原因分析及专业应对技巧）；\n3. **相关转介机构名录与协调建议**（建议最匹配的非营利组织或政府窗口）。\n\n**重要提醒：** 提及案主姓名时，请务必全程使用全名并加上相应的“先生”或“女士”后缀。";
          break;
        default:
          return res.status(400).json({ error: "Invalid task" });
      }

      const formattingGuide = "\n\n格式要求：\n1. 必须使用一级标题（#）和二级标题（##）来构建清晰的层次结构；\n2. 绝对禁止使用斜体或单星号 * 包裹文字；\n3. 每一个大章节必须有清晰的数字编号（如：1. 评估背景）；\n4. 重点关键词可以使用双星号 ** 加粗，但应保持在行内；\n5. 每个小项的内容必须详尽、专业，每段话不应少于100字，以确保分析的深度和专业性；\n6. 使用清晰的换行符和分段，段落间留有空行；\n7. 输出语言必须专业、严谨、温暖且富有社工专业同理心。";
      
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ role: "user", parts: [{ text: content }] }],
          config: {
            systemInstruction: systemInstruction + formattingGuide,
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
          },
        });

        const textResult = response.text;
        res.json({ text: textResult || "AI未能返回有效结果" });
      } catch (genError: any) {
        console.error("Gemini Generation Error:", genError);
        res.status(500).json({ error: `AI服务繁忙: ${genError.message}` });
      }
    } catch (error: any) {
      console.error("AI API Error:", error);
      res.status(500).json({ error: error.message || "AI generation failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
