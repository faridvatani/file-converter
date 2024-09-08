import ReactMarkdown from "react-markdown";
import { description, title } from "@/components/primitives";
import { contactUsPageDescription } from "@/config/site";

export default function ContactPage() {
  return (
    <div>
      <h2 className={title()}>Contact Us</h2>
      <div className={description()}>
        <ReactMarkdown>{contactUsPageDescription}</ReactMarkdown>
      </div>
    </div>
  );
}
