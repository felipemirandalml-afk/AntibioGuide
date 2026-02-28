#!/usr/bin/env python3
"""
Uso:
python tools/csv_to_json_pathogens.py pathogens.csv data/pathogens.json
"""

import csv
import json
import sys
from pathlib import Path

EXPECTED_HEADERS = [
    "id",
    "name",
    "aliases",
    "gram",
    "category",
    "summary",
    "intrinsic_resistance",
    "typical_resistance",
    "stewardship_note",
]


def parse_list(value: str):
    return [item.strip() for item in (value or "").split(";") if item.strip()]


def convert(input_path: Path, output_path: Path):
    records = []
    seen_ids = set()

    with input_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)

        if reader.fieldnames != EXPECTED_HEADERS:
            got = ",".join(reader.fieldnames or [])
            expected = ",".join(EXPECTED_HEADERS)
            raise ValueError(
                "Headers inválidos.\n"
                f"Esperados: {expected}\n"
                f"Recibidos: {got}"
            )

        for idx, row in enumerate(reader, start=2):
            pathogen_id = (row.get("id") or "").strip()
            name = (row.get("name") or "").strip()
            summary = (row.get("summary") or "").strip()

            if not pathogen_id:
                raise ValueError(f"Fila {idx}: 'id' no puede estar vacío")
            if pathogen_id in seen_ids:
                raise ValueError(f"Fila {idx}: 'id' duplicado: {pathogen_id}")
            if not name:
                raise ValueError(f"Fila {idx}: 'name' no puede estar vacío")
            if not summary:
                raise ValueError(f"Fila {idx}: 'summary' no puede estar vacío")

            seen_ids.add(pathogen_id)

            records.append(
                {
                    "id": pathogen_id,
                    "name": name,
                    "aliases": parse_list(row.get("aliases", "")),
                    "gram": (row.get("gram") or "").strip(),
                    "category": (row.get("category") or "").strip(),
                    "summary": summary,
                    "intrinsic_resistance": parse_list(row.get("intrinsic_resistance", "")),
                    "typical_resistance": parse_list(row.get("typical_resistance", "")),
                    "stewardship_note": (row.get("stewardship_note") or "").strip(),
                }
            )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)
        f.write("\n")


def main():
    if len(sys.argv) != 3:
        print("Uso: python tools/csv_to_json_pathogens.py pathogens.csv data/pathogens.json")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    if not input_path.exists():
        print(f"No existe archivo de entrada: {input_path}")
        sys.exit(1)

    try:
        convert(input_path, output_path)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
