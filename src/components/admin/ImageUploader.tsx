// "use client";

// import { useState, useRef } from "react";
// import Image from "next/image";
// import {
//   UploadCloud,
//   Image as ImageIcon,
//   Link as LinkIcon,
//   X,
//   Check,
// } from "lucide-react";

// interface ImageUploaderProps {
//   value: string;
//   altValue?: string;
//   onChange: (url: string) => void;
//   onAltChange?: (alt: string) => void;
//   label?: string;
// }

// export default function ImageUploader({
//   value,
//   altValue = "",
//   onChange,
//   onAltChange,
//   label = "Hero / Cover Image",
// }: ImageUploaderProps) {
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);
//   const [mode, setMode] = useState<"upload" | "url">("upload");
//   const [urlInput, setUrlInput] = useState(value);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploadError(null);
//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/admin/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.error || "Failed to upload image");
//       }

//       onChange(data.url);
//       setUrlInput(data.url);
//     } catch (err: any) {
//       setUploadError(err.message || "Upload error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleApplyUrl = () => {
//     onChange(urlInput);
//   };

//   const handleClear = () => {
//     onChange("");
//     setUrlInput("");
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div className="space-y-3">
//       <div className="flex items-center justify-between">
//         <label className="text-xs font-semibold admin-ink uppercase tracking-wider">
//           {label}
//         </label>
//         <div className="flex items-center gap-2 text-xs">
//           <button
//             type="button"
//             onClick={() => setMode("upload")}
//             className={`px-2.5 py-1 rounded-lg transition-colors ${
//               mode === "upload"
//                 ? "admin-primary admin-ink"
//                 : "admin-muted hover:admin-ink"
//             }`}
//           >
//             Upload File
//           </button>
//           <button
//             type="button"
//             onClick={() => setMode("url")}
//             className={`px-2.5 py-1 rounded-lg transition-colors ${
//               mode === "url"
//                 ? "admin-primary admin-ink"
//                 : "admin-muted hover:admin-ink"
//             }`}
//           >
//             Paste URL
//           </button>
//         </div>
//       </div>

//       {uploadError && <p className="text-xs admin-danger">{uploadError}</p>}

//       {mode === "upload" ? (
//         <div className="relative">
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileUpload}
//             accept="image/jpeg,image/png,image/webp,image/svg+xml"
//             className="hidden"
//             id="admin-image-upload"
//           />
//           <label
//             htmlFor="admin-image-upload"
//             className="flex flex-col items-center justify-center p-6 border-2 border-dashed admin-border hover:border-prime-accent/50 rounded-lg admin-soft hover:admin-soft cursor-pointer transition-all"
//           >
//             <UploadCloud className="w-8 h-8 admin-accent mb-2" />
//             <span className="text-sm font-semibold admin-ink">
//               {isUploading ? "Uploading..." : "Click to upload an image"}
//             </span>
//             <span className="text-xs admin-muted mt-1">
//               Supports JPEG, PNG, WebP (Max 5MB)
//             </span>
//           </label>
//         </div>
//       ) : (
//         <div className="flex gap-2">
//           <input
//             type="url"
//             placeholder="https://images.unsplash.com/..."
//             value={urlInput}
//             onChange={(e) => setUrlInput(e.target.value)}
//             className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
//           />
//           <button
//             type="button"
//             onClick={handleApplyUrl}
//             className="px-4 py-2.5 rounded-md admin-primary admin-ink text-xs font-bold shrink-0"
//           >
//             Apply
//           </button>
//         </div>
//       )}

//       {/* Preview Container */}
//       {value && (
//         <div className="relative rounded-lg overflow-hidden border admin-border admin-surface p-3 flex items-center gap-4">
//           <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0 admin-soft">
//             <Image src={value} alt="Preview" fill className="object-cover" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs admin-ink truncate font-mono">{value}</p>
//             {onAltChange && (
//               <input
//                 type="text"
//                 placeholder="Accessible Alt text (e.g., 'Team reviewing data pipeline')"
//                 value={altValue}
//                 onChange={(e) => onAltChange(e.target.value)}
//                 className="mt-1 w-full admin-soft border admin-border rounded-lg px-2.5 py-1 text-xs admin-ink placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
//               />
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={handleClear}
//             className="p-1.5 rounded-lg admin-muted hover:admin-danger hover:bg-rose-500/10"
//             title="Remove image"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useRef, useId } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import {
  UploadCloud,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
  Check,
} from "lucide-react";

interface ImageUploaderProps {
  value: string;
  altValue?: string;
  onChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  altValue = "",
  onChange,
  onAltChange,
  label = "Hero / Cover Image",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isUploading) return;
    setUploadError(null);
    setIsUploading(true);

    try {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Please choose a JPEG, PNG, or WebP image.");
      }
      if (file.size === 0 || file.size > 5 * 1024 * 1024) {
        throw new Error("Choose an image larger than 0 bytes and no more than 5MB.");
      }
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !publicKey) {
        throw new Error("Set the Supabase URL and publishable key in Vercel, then redeploy.");
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: file.type, size: file.size }),
      });
      const ticket = await res.json().catch(() => null);
      if (!res.ok) throw new Error(ticket?.error || "Could not authorize image upload.");
      if (!ticket?.bucket || !ticket?.path || !ticket?.token || !ticket?.url) {
        throw new Error("Invalid upload response. Please refresh and try again.");
      }

      // This client gets only a public key and a token for this one upload.
      const supabase = createClient(supabaseUrl, publicKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });
      const { error } = await supabase.storage
        .from(ticket.bucket)
        .uploadToSignedUrl(ticket.path, ticket.token, file, {
          contentType: file.type,
          cacheControl: "3600",
        });
      if (error) throw new Error(error.message || "Image upload failed.");

      // Existing post/case study forms still save the resulting URL normally.
      onChange(ticket.url);
      setUrlInput(ticket.url);
    } catch (error: unknown) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = () => {
    onChange(urlInput);
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold admin-ink uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              mode === "upload"
                ? "admin-primary admin-ink"
                : "admin-muted hover:admin-ink"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              mode === "url"
                ? "admin-primary admin-ink"
                : "admin-muted hover:admin-ink"
            }`}
          >
            Paste URL
          </button>
        </div>
      </div>

      {uploadError && <p className="text-xs admin-danger">{uploadError}</p>}

      {mode === "upload" ? (
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp"
            disabled={isUploading}
            className="hidden"
            id={inputId}
          />
          <label
            htmlFor={inputId}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed admin-border hover:border-prime-accent/50 rounded-lg admin-soft hover:admin-soft cursor-pointer transition-all"
          >
            <UploadCloud className="w-8 h-8 admin-accent mb-2" />
            <span className="text-sm font-semibold admin-ink">
              {isUploading ? "Uploading..." : "Click to upload an image"}
            </span>
            <span className="text-xs admin-muted mt-1">
              Supports JPEG, PNG, WebP (Max 5MB)
            </span>
          </label>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full admin-soft border admin-border rounded-md px-4 py-2.5 text-sm admin-ink focus:outline-none focus:border-prime-accent"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 rounded-md admin-primary admin-ink text-xs font-bold shrink-0"
          >
            Apply
          </button>
        </div>
      )}

      {/* Preview Container */}
      {value && (
        <div className="relative rounded-lg overflow-hidden border admin-border admin-surface p-3 flex items-center gap-4">
          <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0 admin-soft">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs admin-ink truncate font-mono">{value}</p>
            {onAltChange && (
              <input
                type="text"
                placeholder="Accessible Alt text (e.g., 'Team reviewing data pipeline')"
                value={altValue}
                onChange={(e) => onAltChange(e.target.value)}
                className="mt-1 w-full admin-soft border admin-border rounded-lg px-2.5 py-1 text-xs admin-ink placeholder-prime-gray/60 focus:outline-none focus:border-prime-accent"
              />
            )}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg admin-muted hover:admin-danger hover:bg-rose-500/10"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
