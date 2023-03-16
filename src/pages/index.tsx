import dynamic from "next/dynamic";
const Editor = dynamic(async () => (await import("../components")).Editor, {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Editor />
    </div>
  );
}
