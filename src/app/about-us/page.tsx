import ReactMarkdown from "react-markdown";
import { description, title } from "@/components/primitives";
import { aboutUsPageDescription } from "@/config/site";

export default function AboutPage() {
  return (
    <div>
      <h2 className={title()}>About</h2>
      <div className={description()}>
        <ReactMarkdown>{aboutUsPageDescription}</ReactMarkdown>
      </div>
    </div>
  );
}
