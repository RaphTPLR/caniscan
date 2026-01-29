"use client";

import { classifyDogBreed } from "@/app/action";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Dog, Loader2, Sparkles, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DogClassifier() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    label: string;
    score: number;
    description: string;
  } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("image", file);
    
    const res = await classifyDogBreed(formData);
    
    if ("error" in res) {
      console.error(res.error);
    } else {
      setResult(res as any);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        {!preview ? (
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-3xl p-16 transition-all duration-300 cursor-pointer text-center",
              isDragActive
                ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xl font-medium text-zinc-200">
                  {isDragActive ? "Lâchez l'image ici" : "Cliquez ou glissez une photo de chien"}
                </p>
                <p className="text-sm text-zinc-500 mt-2">
                  JPG, PNG ou WebP jusqu'à 10 Mo
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative group rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={clearFile}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/80 text-zinc-400 hover:text-white backdrop-blur-sm transition-colors border border-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Dog className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{file?.name}</p>
                  <p className="text-xs text-zinc-500">Prêt pour l'analyse</p>
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Identifier la race
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {(loading || result) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                  {loading ? (
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      <p className="text-sm animate-pulse">L'IA examine les caractéristiques physiques...</p>
                    </div>
                  ) : result ? (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-indigo-400 font-medium mb-2 flex items-center gap-2">
                        <Dog className="w-4 h-4" />
                        Analyse Terminée
                      </p>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {result.label}
                      </h3>
                      <p className="text-zinc-300 leading-relaxed text-lg">
                        {result.description}
                      </p>
                      <div className="mt-6 flex items-center gap-2">
                        <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.score * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                          />
                        </div>
                        <span className="text-xs font-mono text-indigo-400">
                          {Math.round(result.score * 100)}% de confiance
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {!loading && result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end"
              >
                <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4 max-w-md text-right">
                  <p className="text-sm text-indigo-300">
                    Merci ! C'est exactement ce que je pensais. Est-ce que tu peux m'en dire plus sur les besoins en exercice de cette race ?
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
