import ReactMarkdown from "react-markdown";
import { title } from "@/components/primitives";
import { aboutUsPageDescription } from "@/config/site";

export default function AboutPage() {
  return (
    <div>
      <h2 className={title()}>About</h2>
      <div className="prose text-justify prose-lg mx-auto p-4 mt-8">
        <ReactMarkdown>{aboutUsPageDescription}</ReactMarkdown>
      </div>
    </div>
  );
}
