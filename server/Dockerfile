FROM node:20

WORKDIR /app

# Copy package.json and lockfile from root
COPY ./package.json ./package-lock.json ./

RUN npm install --omit=dev

# Copy the rest of the project
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
