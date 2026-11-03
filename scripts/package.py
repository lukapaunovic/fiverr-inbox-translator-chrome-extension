from pathlib import Path
import json, zipfile
root=Path(__file__).resolve().parents[1]
ext=root/'extension'
manifest=json.loads((ext/'manifest.json').read_text())
out=root/'dist'/('fiverr-inbox-translator-v'+manifest['version']+'.zip')
out.parent.mkdir(exist_ok=True)
allowed={'.js','.json','.html','.css','.png'}
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(ext.rglob('*')):
        if not path.is_file():continue
        if path.name=='private-config.json' or path.suffix not in allowed:
            raise SystemExit('Unexpected extension file: '+str(path.relative_to(ext)))
        archive.write(path,path.relative_to(ext))
print(out)
