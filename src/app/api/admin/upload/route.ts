// import { NextRequest, NextResponse } from "next/server";
// import { getCurrentAdminUser } from "@/lib/auth";
// import { writeFile, mkdir } from "fs/promises";
// import path from "path";
// import { createClient } from "@supabase/supabase-js";

// const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// export async function POST(request: NextRequest) {
//   try {
//     // 1. Verify authenticated admin
//     const user = await getCurrentAdminUser();
//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized. Admin login required." }, { status: 401 });
//     }

//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file provided." }, { status: 400 });
//     }

//     // 2. Validate MIME type
//     if (!ALLOWED_MIME_TYPES.includes(file.type)) {
//       return NextResponse.json(
//         { error: "Invalid file type. Allowed formats: JPEG, PNG, WebP, SVG, GIF." },
//         { status: 400 }
//       );
//     }

//     // 3. Validate size
//     if (file.size > MAX_FILE_SIZE) {
//       return NextResponse.json(
//         { error: "File size exceeds 10MB limit." },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const ext = path.extname(file.name) || ".jpg";
//     const cleanExt = ext.replace(/[^a-zA-Z0-9.]/g, "");
//     const filename = `cms_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${cleanExt}`;

//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
//     const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "cms-media";

//     // Attempt upload to Supabase Storage if available
//     if (supabaseUrl && supabaseKey) {
//       try {
//         const supabase = createClient(supabaseUrl, supabaseKey);
//         const { data, error: uploadError } = await supabase.storage
//           .from(bucketName)
//           .upload(filename, buffer, {
//             contentType: file.type,
//             upsert: true,
//           });

//         if (!uploadError && data) {
//           const { data: publicUrlData } = supabase.storage
//             .from(bucketName)
//             .getPublicUrl(filename);

//           if (publicUrlData?.publicUrl) {
//             return NextResponse.json({
//               success: true,
//               url: publicUrlData.publicUrl,
//               filename,
//               size: file.size,
//               mimeType: file.type,
//               storage: "supabase",
//             });
//           }
//         }
//       } catch (storageErr) {
//         console.warn("Supabase storage upload fallback to local public/uploads:", storageErr);
//       }
//     }

//     // Local file storage fallback
//     const uploadsDir = path.join(process.cwd(), "public", "uploads");
//     await mkdir(uploadsDir, { recursive: true });

//     const filePath = path.join(uploadsDir, filename);
//     await writeFile(filePath, buffer);

//     const publicUrl = `/uploads/${filename}`;

//     return NextResponse.json({
//       success: true,
//       url: publicUrl,
//       filename,
//       size: file.size,
//       mimeType: file.type,
//       storage: "local",
//     });
//   } catch (error: any) {
//     console.error("Image upload error:", error);
//     return NextResponse.json(
//       { error: "Failed to upload image due to a server error." },
//       { status: 500 }
//     );
//   }
// }
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCurrentAdminUser } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

export async function POST(request: NextRequest) {
  try {
    // Keep the dashboard's existing authentication check.
    const user = await getCurrentAdminUser();
    if (!user) return json({ error: "Admin login required." }, 401);

    const origin = request.headers.get("origin");
    if (origin && origin !== request.nextUrl.origin) {
      return json({ error: "Invalid upload origin." }, 403);
    }
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return json({ error: "Update both upload files and refresh your dashboard." }, 415);
    }

    // Only metadata goes through Vercel. The image goes directly to Storage.
    const input = await request.json().catch(() => null);
    if (!input || typeof input !== "object") {
      return json({ error: "Invalid upload request." }, 400);
    }
    const { type, size } = input;
    if (typeof type !== "string" || !Object.hasOwn(EXTENSIONS, type)) {
      return json({ error: "Please choose a JPEG, PNG, or WebP image." }, 415);
    }
    if (!Number.isSafeInteger(size) || size <= 0 || size > MAX_FILE_SIZE) {
      return json({ error: "Choose an image larger than 0 bytes and no more than 5MB." }, 413);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "cms-media";
    if (!supabaseUrl || !secretKey) {
      return json({ error: "Storage is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY on Vercel, then redeploy." }, 503);
    }

    const supabase = createClient(supabaseUrl, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
    const { data: bucket, error: bucketError } = await supabase.storage.getBucket(bucketName);
    if (bucketError || !bucket) {
      return json({ error: "Cannot access the image bucket. Check the bucket name, Supabase project URL, and server secret key." }, 503);
    }
    if (!bucket.public) {
      return json({ error: "Select a public bucket dedicated to website images in SUPABASE_STORAGE_BUCKET." }, 503);
    }
    // Signed upload tokens do not bind the client's declared size/type.
    // Require Storage to enforce these limits on the actual upload as well.
    const bucketLimit = Number(bucket.file_size_limit);
    const allowedTypes = bucket.allowed_mime_types;
    if (!(bucketLimit > 0 && bucketLimit <= MAX_FILE_SIZE) ||
        !allowedTypes?.length ||
        allowedTypes.some((mime) => !Object.hasOwn(EXTENSIONS, mime))) {
      return json({ error: "Set the image bucket's maximum file size to 5MB (5242880 bytes) and allowed MIME types to image/jpeg, image/png, image/webp." }, 503);
    }
    if (size > bucketLimit || !allowedTypes.includes(type)) {
      return json({ error: "This image exceeds your bucket's file size or format restrictions." }, 400);
    }

    const filename = `cms_${randomUUID()}.${EXTENSIONS[type]}`;
    const storage = supabase.storage.from(bucketName);
    const { data, error } = await storage.createSignedUploadUrl(filename, { upsert: false });
    if (error || !data) {
      return json({ error: "Could not authorize this upload. Check your Supabase Storage configuration." }, 502);
    }
    const { data: publicData } = storage.getPublicUrl(data.path);
    return json({
      bucket: bucketName,
      path: data.path,
      token: data.token,
      url: publicData.publicUrl,
    });
  } catch {
    return json({ error: "Could not prepare the image upload. Please try again." }, 500);
  }
}
