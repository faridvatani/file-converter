import ReactMarkdown from "react-markdown";
import { title } from "@/components/primitives";
import { contactUsPageDescription } from "@/config/site";

export default function ContactPage() {
  return (
    <div>
      <h2 className={title()}>Contact Us</h2>
      <div className="prose text-justify prose-lg mx-auto p-4 mt-8">
        <ReactMarkdown>{contactUsPageDescription}</ReactMarkdown>
      </div>
    </div>
  );
}
