import DogClassifier from "@/components/app/DogClassifier";
import { Dog as DogIcon, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 lg:pt-12">
        {/* Header/Nav */}
        <nav className="flex items-center justify-between mb-16 lg:mb-24">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <DogIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              CaniScan AI
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-3 h-3" />
            Intelligence Artificielle de Pointe
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Identifiez n'importe quelle{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 italic">
              race de chien
            </span>{" "}
            instantanément.
          </h1>
          
          <p className="text-lg lg:text-xl text-zinc-400 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Uploadez une photo et laissez notre modèle de vision par ordinateur analyser les caractéristiques physiques pour une identification précise en quelques secondes.
          </p>
        </div>

        {/* Classifier Interface */}
        <DogClassifier />
      </div>
    </main>
  );
}
