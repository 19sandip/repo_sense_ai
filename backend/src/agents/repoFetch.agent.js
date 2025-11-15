import dotenv from "dotenv";
import axios from "axios";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
dotenv.config()

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

console.log("Loaded key:", process.env.GOOGLE_API_KEY);

export async function fetchRepoAgent(repoUrl) {
  try {
    const apiUrl = repoUrl
      .replace("https://github.com/", "https://api.github.com/repos/")
      + "/contents";

    const { data } = await axios.get(apiUrl);

    const files = data
      .filter(f => f.type === "file" && /\.(js|ts|jsx|tsx|py|java)$/i.test(f.name))
      .slice(0, 10);

    let fileContents = [];

    for (const file of files) {
      const res = await axios.get(file.download_url);
      fileContents.push(`FILE: ${file.name}\n${res.data}\n\n`);
    }

    const prompt = `
Summarize this repository:
- Purpose of repo
- Tech stack
- File-by-file summary
- Problems, bugs, improvements

${fileContents.join("\n")}
`;

    const response = await llm.invoke([new HumanMessage(prompt)]);
    return response.content;

  } catch (err) {
    return "Error fetching repo: " + err.message;
  }
}
