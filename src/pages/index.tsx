import dynamic from "next/dynamic";
import Head from "next/head";
const Editor = dynamic(async () => (await import("../components")).Editor, {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Head>
        <title>Tl-miro</title>
      </Head>
      <Editor />
    </div>
  );
}
