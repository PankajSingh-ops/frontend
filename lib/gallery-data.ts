import fs from "node:fs";
import path from "node:path";

/**
 * GALLERY & MEDIA AUTO-DISCOVERY SERVICE
 * 
 * Scans local public/images directories at build time and returns typed image arrays.
 * 
 * FOLDER STRUCTURE:
 * - public/images/gallery/awards/
 * - public/images/gallery/tedx/
 * - public/images/gallery/social-impact/
 * - public/images/gallery/training/
 * - public/images/gallery/podcasts/
 * - public/images/gallery/moments/
 * - public/images/media/news/    (Optional naming: "outlet__title.jpg" or "title.jpg")
 * - public/images/media/outlets/ (Outlet logos: e.g. "dainik-bhaskar.png")
 * 
 * CAPTION OVERRIDES:
 * An optional captions.json in any folder will override automatic Title Case conversion:
 * {
 *   "keynote-stage.jpg": "Ankur addressing National Cyber Summit"
 * }
 */

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  filename: string;
  aspectRatioHint?: "square" | "portrait" | "landscape" | "tall";
}

export interface PressClippingItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  outlet?: string;
  filename: string;
}

const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Natural filename sort comparator
 */
function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

/**
 * Convert filename slug to readable Title Case caption
 * e.g. "tedx-keynote_stage-2025.jpg" -> "Tedx Keynote Stage 2025"
 */
function filenameToCaption(filename: string): string {
  const nameWithoutExt = path.parse(filename).name;
  // If double underscore exists (outlet__title), take title portion
  const titlePart = nameWithoutExt.includes("__")
    ? nameWithoutExt.split("__")[1]
    : nameWithoutExt;

  return titlePart
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""))
    .join(" ");
}

/**
 * Extract outlet from filename if format is "outlet__title.jpg"
 */
function extractOutletFromFilename(filename: string): string | undefined {
  const nameWithoutExt = path.parse(filename).name;
  if (nameWithoutExt.includes("__")) {
    const outletSlug = nameWithoutExt.split("__")[0];
    return outletSlug
      .replace(/[-_]+/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  return undefined;
}

/**
 * Reads a directory safely, loading custom captions.json if present
 */
function scanFolder(relativeFolder: string): { files: string[]; captions: Record<string, string> } {
  const fullPath = path.join(process.cwd(), "public", relativeFolder);
  if (!fs.existsSync(fullPath)) {
    return { files: [], captions: {} };
  }

  let entries: string[] = [];
  try {
    entries = fs.readdirSync(fullPath);
  } catch {
    return { files: [], captions: {} };
  }

  let captions: Record<string, string> = {};
  const captionsFilePath = path.join(fullPath, "captions.json");
  if (fs.existsSync(captionsFilePath)) {
    try {
      const raw = fs.readFileSync(captionsFilePath, "utf-8");
      captions = JSON.parse(raw);
    } catch {
      captions = {};
    }
  }

  const validFiles = entries.filter((entry) => {
    const ext = path.extname(entry).toLowerCase();
    return VALID_EXTENSIONS.has(ext);
  });

  validFiles.sort(naturalSort);
  return { files: validFiles, captions };
}

/**
 * Discovers images for a specific gallery category
 */
export function getGalleryCategoryImages(categorySlug: string): GalleryItem[] {
  const relativeFolder = path.join("images", "gallery", categorySlug).replace(/\\/g, "/");
  const { files, captions } = scanFolder(relativeFolder);

  return files.map((file, idx) => {
    const customCaption = captions[file];
    const caption = customCaption || filenameToCaption(file);
    const src = `/${relativeFolder}/${file}`.replace(/\\/g, "/");

    return {
      id: `${categorySlug}-${idx}-${file}`,
      src,
      alt: `Ankur Chandrakant - ${caption}`,
      caption,
      category: categorySlug,
      filename: file,
    };
  });
}

/**
 * Discovers all gallery images across all 6 categories
 */
export function getAllGalleryImages(): Record<string, GalleryItem[]> {
  const categories = [
    "awards",
    "tedx",
    "social-impact",
    "training",
    "podcasts",
    "moments",
  ];

  const result: Record<string, GalleryItem[]> = {};
  for (const cat of categories) {
    result[cat] = getGalleryCategoryImages(cat);
  }
  return result;
}

/**
 * Discovers all press clippings in public/images/media/news/
 */
export function getPressClippings(): PressClippingItem[] {
  const relativeFolder = "images/media/news";
  const { files, captions } = scanFolder(relativeFolder);

  return files.map((file, idx) => {
    const customCaption = captions[file];
    const caption = customCaption || filenameToCaption(file);
    const outlet = extractOutletFromFilename(file);
    const src = `/${relativeFolder}/${file}`.replace(/\\/g, "/");

    return {
      id: `clipping-${idx}-${file}`,
      src,
      alt: `Press Coverage - ${caption}`,
      caption,
      outlet,
      filename: file,
    };
  });
}

/**
 * Discovers optional outlet logos from public/images/media/outlets/
 * Returns a map of slug/normalized name -> logo src path
 */
export function getOutletLogos(): Record<string, string> {
  const relativeFolder = "images/media/outlets";
  const { files } = scanFolder(relativeFolder);

  const logoMap: Record<string, string> = {};
  for (const file of files) {
    const slug = path.parse(file).name.toLowerCase().replace(/[-_]+/g, "");
    logoMap[slug] = `/${relativeFolder}/${file}`.replace(/\\/g, "/");
  }
  return logoMap;
}
