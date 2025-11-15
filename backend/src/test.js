import { fetchRepoAgent } from "./agents/repoFetch.agent.js";

(async () => {
  const summary = await fetchRepoAgent("https://github.com/vercel/next.js");
  console.log(summary);
})();
