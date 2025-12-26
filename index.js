import express from "express";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    usage: "/ig?url=INSTAGRAM_URL"
  });
});

app.get("/ig", (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.json({ success: false, error: "URL required" });
  }

  const cmd = `yt-dlp -f mp4 -g "${url}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err || !stdout) {
      return res.json({
        success: false,
        error: "Failed to fetch video"
      });
    }

    const video = stdout.trim().split("\n")[0];
    res.json({
      success: true,
      video
    });
  });
});

app.listen(PORT, () => {
  console.log("IG Downloader API running on", PORT);
});
