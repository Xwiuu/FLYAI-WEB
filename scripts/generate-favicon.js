const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default || require('png-to-ico');

(async () => {
  try {
    const repoRoot = path.resolve(__dirname, '..');
    const svgPath = path.join(repoRoot, 'src', 'app', 'logo.svg');
    const outIco = path.join(repoRoot, 'public', 'favicon.ico');

    const sizes = [16, 24, 32, 48, 64, 128];
    const pngPaths = [];

    for (const size of sizes) {
      const pngPath = path.join(repoRoot, 'public', `favicon-${size}.png`);
      await sharp(svgPath).resize(size, size).png().toFile(pngPath);
      pngPaths.push(pngPath);
    }

    const buffers = pngPaths.map((p) => fs.readFileSync(p));
    const icoBuffer = await pngToIco(buffers);
    fs.writeFileSync(outIco, icoBuffer);

    // cleanup temporary PNGs
    for (const p of pngPaths) fs.unlinkSync(p);

    console.log('favicon.ico created at', outIco);
  } catch (err) {
    console.error('Error generating favicon:', err);
    process.exit(1);
  }
})();