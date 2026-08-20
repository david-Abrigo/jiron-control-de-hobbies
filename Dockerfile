# ==============================================================================
# Dockerfile para la aplicación de Registro de Hobbies
# Compatible con Render Web Services y cualquier servidor Docker
# ==============================================================================

FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos de la aplicación al directorio web de Nginx
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

# Exponer el puerto 80 estándar
EXPOSE 80

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
