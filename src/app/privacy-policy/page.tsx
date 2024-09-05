import ReactMarkdown from "react-markdown";
import { title } from "@/components/primitives";
import { privacyPolicyPageDescription } from "@/config/site";

export default function PrivacyPolicy() {
  return (
    <div>
      <h2 className={title()}>Privacy Policy</h2>
      <div className="prose text-justify prose-lg mx-auto p-4 mt-8">
        <ReactMarkdown>{privacyPolicyPageDescription}</ReactMarkdown>
      </div>
    </div>
  );
}
