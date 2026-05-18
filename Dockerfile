FROM node:22-alpine AS build

RUN npm install -g pnpm@11

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --ignore-scripts

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# CAMBIA ESTA LÍNEA (Copiamos el template a la ruta de plantillas de Nginx):
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Tu CMD vuelve a ser el original, Nginx se encarga del resto automáticamente:
CMD ["nginx", "-g", "daemon off;"]