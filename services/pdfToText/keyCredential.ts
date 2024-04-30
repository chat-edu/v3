import { AzureKeyCredential } from "@azure/ai-form-recognizer";

const documentIntelligenceKeyCredential = new AzureKeyCredential(process.env.NEXT_PUBLIC_DOCUMENT_INTELLIGENCE_KEY as string);

export default documentIntelligenceKeyCredential;