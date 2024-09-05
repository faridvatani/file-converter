import MyDropzone from "@/components/dropzone";
import { Hero } from "@/components/hero";
import Toast from "@/components/toast";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-12">
      <Hero />
      <MyDropzone />
      <Toast/>
    </section>
  );
}
