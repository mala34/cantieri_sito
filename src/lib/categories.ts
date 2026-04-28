const categorieBlog: Record<string, string> = {
  innovazione: "Innovazione",
  normative: "Normative",
  gestione: "Gestione Cantiere",
  tecnologia: "Tecnologia",
  sicurezza: "Sicurezza",
};

export function getCategoriaLabel(slug: string): string {
  return categorieBlog[slug] ?? slug;
}

export function getAllCategories(): Record<string, string> {
  return { ...categorieBlog };
}
