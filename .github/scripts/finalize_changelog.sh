#!/usr/bin/env bash
set -euo pipefail

VERSION="${1:-}"
BODY_FILE="${2:-}"
CHANGELOG_FILE="${3:-CHANGELOG.md}"

if [[ -z "${VERSION}" ]]; then
  echo "Usage: $0 <version> [body-file] [changelog-file]"
  exit 2
fi

if [[ ! -f "${CHANGELOG_FILE}" ]]; then
  echo "Changelog file not found: ${CHANGELOG_FILE}"
  exit 1
fi

extract_unreleased() {
  awk '
    BEGIN { in_section = 0 }
    /^## \[Unreleased\][[:space:]]*$/ { in_section = 1; next }
    in_section && /^## / { exit }
    in_section { print }
  ' "${CHANGELOG_FILE}" | sed 's/[[:space:]]*$//' | sed '/^[[:space:]]*$/d'
}

BODY_CONTENT=""
if [[ -n "${BODY_FILE}" && -f "${BODY_FILE}" ]]; then
  BODY_CONTENT="$(sed 's/[[:space:]]*$//' "${BODY_FILE}" | sed '/^[[:space:]]*$/d' || true)"
fi

if [[ -z "${BODY_CONTENT}" ]]; then
  BODY_CONTENT="$(extract_unreleased)"
fi

if [[ -z "${BODY_CONTENT}" ]]; then
  echo "No release notes available from body file or Unreleased section."
  exit 1
fi

TMP_REST="$(mktemp)"
TMP_PREAMBLE="$(mktemp)"
TMP_NEW="$(mktemp)"
RELEASE_DATE="$(date -u +%Y-%m-%d)"

# Split original changelog into:
# 1) preamble before "## [Unreleased]" (for language switch links/title)
# 2) remaining content after current Unreleased block
awk '
  BEGIN { state = 0 }
  state == 0 && /^## \[Unreleased\][[:space:]]*$/ {
    state = 1
    next
  }
  state == 0 {
    print >> preamble
    next
  }
  state == 1 {
    if (/^## /) {
      state = 2
      print >> rest
    }
    next
  }
  state == 2 {
    print >> rest
    next
  }
' preamble="${TMP_PREAMBLE}" rest="${TMP_REST}" "${CHANGELOG_FILE}"

{
  cat "${TMP_PREAMBLE}"
  if [[ -s "${TMP_PREAMBLE}" ]]; then
    printf '\n'
  fi
  printf '## [Unreleased]\n\n'
  printf '## %s (%s)\n\n' "${VERSION}" "${RELEASE_DATE}"
  printf '%s\n\n' "${BODY_CONTENT}"
  cat "${TMP_REST}"
} > "${TMP_NEW}"

mv "${TMP_NEW}" "${CHANGELOG_FILE}"
rm -f "${TMP_REST}" "${TMP_PREAMBLE}"

echo "Changelog finalized for version ${VERSION}."
