import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pkbm.tahkimussunnah.com";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/programs`, lastModified: new Date() },
    { url: `${baseUrl}/keunggulan`, lastModified: new Date() },
    { url: `${baseUrl}/artikel`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
    { url: `${baseUrl}/programs/paud`, lastModified: new Date() },
    { url: `${baseUrl}/programs/paket-c`, lastModified: new Date() },
  ];
}
