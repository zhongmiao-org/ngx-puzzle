#!/usr/bin/env bash
set -euo pipefail

CHANGELOG_FILE="${1:-CHANGELOG.md}"
OUTPUT_FILE="${2:-}"

if [[ ! -f "${CHANGELOG_FILE}" ]]; then
  echo "Changelog file not found: ${CHANGELOG_FILE}"
  exit 1
fi

UNRELEASED_CONTENT="$(
  awk '
    BEGIN { in_section = 0 }
    /^## \[Unreleased\][[:space:]]*$/ { in_section = 1; next }
    in_section && /^## / { exit }
    in_section { print }
  ' "${CHANGELOG_FILE}" | sed 's/[[:space:]]*$//' | sed '/^[[:space:]]*$/d'
)"

if [[ -z "${UNRELEASED_CONTENT}" ]]; then
  echo "No content found under ## [Unreleased] in ${CHANGELOG_FILE}."
  if [[ -n "${OUTPUT_FILE}" ]]; then
    : > "${OUTPUT_FILE}"
  fi
  exit 2
fi

if [[ -n "${OUTPUT_FILE}" ]]; then
  printf '%s\n' "${UNRELEASED_CONTENT}" > "${OUTPUT_FILE}"
else
  printf '%s\n' "${UNRELEASED_CONTENT}"
fi
