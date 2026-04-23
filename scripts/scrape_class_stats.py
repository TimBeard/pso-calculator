#!/usr/bin/env python3
"""Scrape detailed per-level class stat tables from the Pioneer2 wiki.

Outputs the TypeScript array literal that should replace
INITIAL_CLASS_LEVEL_STATS in packages/shared/src/index.ts.
"""
from __future__ import annotations

import re
import sys
import urllib.request

CLASSES = [
    ("humar", "HUmar"),
    ("hunewearl", "HUnewearl"),
    ("hucast", "HUcast"),
    ("hucaseal", "HUcaseal"),
    ("ramar", "RAmar"),
    ("ramarl", "RAmarl"),
    ("racast", "RAcast"),
    ("racaseal", "RAcaseal"),
    ("fomar", "FOmar"),
    ("fomarl", "FOmarl"),
    ("fonewm", "FOnewm"),
    ("fonewearl", "FOnewearl"),
]

# Order of stat rows within each level block of the detailed table.
ANDROID_ROWS = ["HP", "ATP", "DFP", "ATA", "EVP", "EXP"]
ORGANIC_ROWS = ["HP", "TP", "ATP", "DFP", "MST", "ATA", "EVP", "EXP"]


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        return resp.read().decode("utf-8")


def extract_detailed_table(text: str) -> str:
    """Return the raw wikitext for the collapsible detailed-stat-growth table."""
    marker = "Detailed stat growth"
    idx = text.find(marker)
    if idx == -1:
        raise RuntimeError("Detailed stat growth marker not found")
    end = text.find("\n|}", idx)
    if end == -1:
        raise RuntimeError("End of detailed table not found")
    return text[idx:end]


def parse_table(table_text: str, class_id: str, is_android: bool) -> list[dict]:
    rows = ANDROID_ROWS if is_android else ORGANIC_ROWS

    # Each "section" of the table is a block delimited by "!LVL".
    sections = re.split(r"!\s*LVL", table_text)[1:]
    if not sections:
        raise RuntimeError("No LVL sections")

    by_level: dict[int, dict] = {}

    for section in sections:
        # Drop trailing junk after the section's last row.
        # Tokens look like "|-\n!HP\n|44\n|76\n..."
        # First, parse the LVL header (numbers after the "!" splits separated by "!").
        # Section starts like "\n!1\n!5\n!10\n...!Maximum\n|-\n!HP\n..."
        head, _, body = section.partition("|-")
        if not body:
            continue

        # LVL header values
        lvl_tokens = re.findall(r"!\s*([0-9]+|Maximum)\s*", head)
        levels: list[int | None] = []
        for tok in lvl_tokens:
            if tok == "Maximum":
                levels.append(None)
            else:
                levels.append(int(tok))

        # Now parse stat rows until we hit the next section or end.
        # Each row begins with "!STATNAME" then "|val" entries.
        row_pattern = re.compile(r"!\s*([A-Za-z]+)\s*\n((?:\|[^\n!]*\n?)+)")
        for stat_name, values_blob in row_pattern.findall(body):
            if stat_name not in rows:
                continue
            value_strs = re.findall(r"\|\s*([^\n|]+?)\s*(?=\n|\|)", values_blob + "\n|")
            # Strip note templates {{Note|...|VALUE}} -> VALUE
            cleaned: list[str] = []
            for v in value_strs:
                v = v.strip()
                m = re.search(r"\{\{Note\|.*?\|([^}]+)\}\}", v)
                if m:
                    v = m.group(1).strip()
                cleaned.append(v)

            # The EXP row uses `| colspan="2" |83227800` for the shared L195/L200 cell.
            # Drop colspan tokens so the remaining values realign with their level columns,
            # and duplicate the trailing value across L195/L200.
            filtered = [v for v in cleaned if not v.startswith("colspan=")]
            real_levels = [lv for lv in levels if lv is not None]
            if stat_name == "EXP" and len(filtered) == len(real_levels) - 1:
                filtered.append(filtered[-1])
            for level, raw in zip(real_levels, filtered):
                raw = raw.strip()
                if raw == "":
                    continue
                try:
                    num = float(raw)
                except ValueError:
                    continue
                entry = by_level.setdefault(level, {"classId": class_id, "level": level})
                entry[stat_name.lower()] = num

    return [by_level[k] for k in sorted(by_level)]


def fmt_entry(e: dict, is_android: bool) -> str:
    # ATA may be fractional in the wiki (e.g. 64.5); we floor per project convention.
    def i(v):
        return int(v)

    ata = i(e.get("ata", 0))  # floor, not round
    hp = i(e.get("hp", 0))
    atp = i(e.get("atp", 0))
    dfp = i(e.get("dfp", 0))
    evp = i(e.get("evp", 0))
    exp_ = i(e.get("exp", 0))

    if is_android:
        tp = 0
        mst = 0
    else:
        tp = i(e.get("tp", 0))
        mst = i(e.get("mst", 0))

    return (
        f"  {{ classId: '{e['classId']}', level: {e['level']}, "
        f"hp: {hp}, tp: {tp}, atp: {atp}, dfp: {dfp}, mst: {mst}, "
        f"ata: {ata}, evp: {evp}, lck: 10, exp: {exp_} }},"
    )


def main() -> int:
    print("export const INITIAL_CLASS_LEVEL_STATS: ClassLevelStats[] = [")
    for class_id, page_name in CLASSES:
        is_android = class_id in {"hucast", "hucaseal", "racast", "racaseal"}
        url = f"https://wiki.pioneer2.net/w/{page_name}?action=raw"
        try:
            text = fetch(url)
        except Exception as exc:  # pragma: no cover
            print(f"// failed to fetch {page_name}: {exc}", file=sys.stderr)
            return 1
        table = extract_detailed_table(text)
        entries = parse_table(table, class_id, is_android)
        print(f"  // {page_name}")
        for e in entries:
            print(fmt_entry(e, is_android))
    print("]")
    return 0


if __name__ == "__main__":
    sys.exit(main())
