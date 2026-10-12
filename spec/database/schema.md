# 🗄️ Especificación de Base de Datos (PostgreSQL + Prisma)

## 1. Modelo `Show` (Fechas de Recitales)
- `id`: String (UUID, PK)  
- `fecha`: DateTime  
- `lugar`: String (Ej: "Salón Pueyrredón")  
- `ciudad`: String (Ej: "Buenos Aires")  
- `linkEntradas`: String (Opcional)  
- `flyerUrl`: String (Opcional)  
- `createdAt`: DateTime  

## 2. Modelo `Message` (Muro de Fans)
- `id`: String (UUID, PK)  
- `autor`: String  
- `mensaje`: String  
- `aprobado`: Boolean (Default: false — moderación previa a publicación)  
- `createdAt`: DateTime  

## 3. Modelo `Product` (Merch)
- `id`: String (UUID, PK)  
- `nombre`: String (Ej: "Remera Gato Punk")  
- `precio`: Decimal  
- `imagenUrl`: String  
- `disponible`: Boolean (Default: true)  

## 4. Modelo `User` (Administrador)
- `id`: String (UUID, PK)  
- `email`: String (Unique)  
- `passwordHash`: String  
- `role`: Enum ("ADMIN")  
- `createdAt`: DateTime  
