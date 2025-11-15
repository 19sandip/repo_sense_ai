import { Tool } from "langchain/tools";

export const summarizerTool = new Tool({
  name: "summarizeCode",
  description: "Summarize a long code file into key points",
  func: async (code) => {
    return `Summarize this code:\n\n${code}`; // model handles summarization
  }
});
