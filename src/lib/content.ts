import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "materialy");

export type MaterialMeta = {
  slug: string;
  title: string;
  topic: string;
  order: number;
  gradeLevel: string;
};

export type Material = MaterialMeta & {
  content: string;
};

function getGradeDirs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function getTopicDirs(gradeLevel: string): string[] {
  const gradePath = path.join(CONTENT_DIR, gradeLevel);
  if (!fs.existsSync(gradePath)) return [];
  return fs.readdirSync(gradePath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function getMdFiles(gradeLevel: string, topic: string): string[] {
  const topicPath = path.join(CONTENT_DIR, gradeLevel, topic);
  if (!fs.existsSync(topicPath)) return [];
  return fs.readdirSync(topicPath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getMaterials(gradeLevel?: string): MaterialMeta[] {
  const grades = gradeLevel ? [gradeLevel] : getGradeDirs();
  const result: MaterialMeta[] = [];

  for (const grade of grades) {
    const topics = getTopicDirs(grade);
    for (const topic of topics) {
      const files = getMdFiles(grade, topic);
      for (const file of files) {
        const slug = `${grade}-${topic}-${file}`;
        const filePath = path.join(CONTENT_DIR, grade, topic, `${file}.md`);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(raw);
        result.push({
          slug,
          title: (data.title as string) || file,
          topic: (data.topic as string) || topic,
          order: (data.order as number) ?? 0,
          gradeLevel: grade,
        });
      }
    }
  }

  return result.sort((a, b) => a.order - b.order);
}

export function getMaterial(slug: string): Material | null {
  const parts = slug.split("-");
  if (parts.length < 3) return null;

  const gradeLevel = parts[0];
  const topic = parts[1];
  const file = parts.slice(2).join("-");
  const filePath = path.join(CONTENT_DIR, gradeLevel, topic, `${file}.md`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string) || file,
    topic: (data.topic as string) || topic,
    order: (data.order as number) ?? 0,
    gradeLevel,
    content,
  };
}

export const GRADE_LABELS: Record<string, string> = {
  "6sp": "Klasa 6 SP",
  "7sp": "Klasa 7 SP",
  "8sp": "Klasa 8 SP",
  "1lo": "Klasa 1 LO",
  "2lo": "Klasa 2 LO",
  matura: "Klasa 3 LO / Matura",
};
