FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_BASE_URL=https://tiibntick-agency.yowyob.com/agency/v1
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ARG NEXT_PUBLIC_AGENCY_PUBLIC_BASE_URL=https://tiibntick-agency.yowyob.com/agency
ENV NEXT_PUBLIC_AGENCY_PUBLIC_BASE_URL=${NEXT_PUBLIC_AGENCY_PUBLIC_BASE_URL}
ARG NEXT_PUBLIC_AGENCY_FRONTEND_URL=https://tiibntick-agency.yowyob.com
ENV NEXT_PUBLIC_AGENCY_FRONTEND_URL=${NEXT_PUBLIC_AGENCY_FRONTEND_URL}
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN mkdir -p public && npm run build
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build /app/package.json /app/package-lock.json* ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.* ./
USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
