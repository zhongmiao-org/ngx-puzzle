#!/usr/bin/env bash
set -euo pipefail

BASE_REF="${1:-}"
HEAD_REF="${2:-HEAD}"

if [[ -z "${BASE_REF}" ]]; then
  echo "Usage: $0 <base-ref> [head-ref]"
  exit 2
fi

extract_unreleased() {
  local ref="$1"
  local file="$2"
  git show "${ref}:${file}" 2>/dev/null | awk '
    BEGIN { in_section = 0 }
    /^## \[Unreleased\][[:space:]]*$/ { in_section = 1; next }
    in_section && /^## / { exit }
    in_section { print }
  ' || true
}

normalize_block() {
  sed 's/[[:space:]]*$//' | sed '/^[[:space:]]*$/d'
}

CHANGED_FILES="$(git diff --name-only "${BASE_REF}...${HEAD_REF}")"

if [[ -z "${CHANGED_FILES}" ]]; then
  echo "No files changed, skipping changelog gate."
  exit 0
fi

CODE_CHANGED="false"
while IFS= read -r file; do
  [[ -z "${file}" ]] && continue
  if [[ "${file}" =~ ^projects/ ]] \
    || [[ "${file}" =~ ^scripts/ ]] \
    || [[ "${file}" == "package.json" ]] \
    || [[ "${file}" == "package-lock.json" ]] \
    || [[ "${file}" == "angular.json" ]] \
    || [[ "${file}" =~ ^tsconfig[^/]*\.json$ ]]; then
    CODE_CHANGED="true"
    break
  fi
done <<< "${CHANGED_FILES}"

if [[ "${CODE_CHANGED}" != "true" ]]; then
  echo "No code-impacting files changed, skipping changelog gate."
  exit 0
fi

validate_changelog_file() {
  local file="$1"
  if [[ ! -f "${file}" ]]; then
    echo "Missing required changelog file: ${file}"
    exit 1
  fi

  if ! grep -qx "${file}" <<< "${CHANGED_FILES}"; then
    echo "Code changed, but ${file} was not updated."
    echo "Please add release notes under '## [Unreleased]'."
    exit 1
  fi

  local head_unreleased
  local base_unreleased
  head_unreleased="$(extract_unreleased "${HEAD_REF}" "${file}" | normalize_block || true)"
  base_unreleased="$(extract_unreleased "${BASE_REF}" "${file}" | normalize_block || true)"

  if [[ -z "${head_unreleased}" ]]; then
    echo "${file} has no content under '## [Unreleased]'."
    exit 1
  fi

  if ! grep -Eq '^[-*][[:space:]]+' <<< "${head_unreleased}"; then
    echo "${file} Unreleased section must contain at least one bullet item."
    exit 1
  fi

  if [[ "${head_unreleased}" == "${base_unreleased}" ]]; then
    echo "${file} Unreleased section was not changed for a code change PR."
    exit 1
  fi
}

validate_changelog_file "CHANGELOG.md"
validate_changelog_file "CHANGELOG.zh-CN.md"

echo "Changelog gate passed."
