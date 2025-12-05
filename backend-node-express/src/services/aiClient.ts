// aiClient.ts
import { InferenceClient } from "@huggingface/inference";

const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai";

let hfClient: InferenceClient | null = null;

export function getHFClient(): InferenceClient {
  if (!hfClient) {
    const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
    if (!HF_TOKEN) {
      throw new Error("HUGGINGFACE_API_KEY environment variable is not set");
    }
    hfClient = new InferenceClient(HF_TOKEN);
  }
  return hfClient;
}

export { MODEL_ID };
