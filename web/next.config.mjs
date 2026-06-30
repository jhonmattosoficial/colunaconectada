/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — gera site estático em /out pra subir em qualquer host (Hostinger File Manager etc.)
  output: "export",
  reactStrictMode: true,
  // Necessário pra hosting estático: sem servidor Node otimizando imagens em runtime
  images: {
    unoptimized: true,
  },
  // Cria URLs com trailing slash (ex: /sobre/ em vez de /sobre) — funciona melhor em hosting tradicional
  trailingSlash: true,
};

export default nextConfig;
