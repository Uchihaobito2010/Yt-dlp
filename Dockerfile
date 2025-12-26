FROM node:20-slim

RUN apt update && apt install -y python3 python3-pip ffmpeg \
    && pip3 install yt-dlp

WORKDIR /app
COPY . .
RUN npm install

CMD ["npm", "start"]
