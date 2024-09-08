import ReactMarkdown from "react-markdown";
import { description, title } from "@/components/primitives";
import { privacyPolicyPageDescription } from "@/config/site";

export default function PrivacyPolicy() {
  return (
    <div>
      <h2 className={title()}>Privacy Policy</h2>
      <div className={description()}>
        <ReactMarkdown>{privacyPolicyPageDescription}</ReactMarkdown>
      </div>
    </div>
  );
}
