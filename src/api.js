const API_URL = "https://6adf055d8e42963c8d5d4f23.mockapi.io/project";

function dorostKardanProje(project) {
  return {
    ...project,
    title: project.title || project.name || "بدون عنوان",
    description: project.description || project.message || "",
    skills: Array.isArray(project.skills)
      ? project.skills.join(", ")
      : (project.skills || ""),
  };
}

export async function gereftanProjeha() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("مشکل در گرفتن اطلاعات");
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("فرمت اطلاعات API درست نیست");
  return data.map(dorostKardanProje);
}

export async function ezafeKardanProje(project) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: project.title,
      description: project.description,
      message: project.description,
      skills: project.skills,
    }),
  });

  if (!res.ok) throw new Error("پروژه ساخته نشد");
  return dorostKardanProje(await res.json());
}

export async function hazfProje(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("پروژه حذف نشد");
}
