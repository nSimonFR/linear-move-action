# Linear Move

Moves a linear list of issues from one state to another.
Takes a list of Github PRs as linear attachment to look for (Automatically using Github X Linear integration).
If no `from`, issues will be moved to `to`.

## Inputs & Outputs

See [action.yaml](action.yaml).

## Example usage

```yaml
- name: List recent PR links url
  shell: bash
  run: |
    URLS="$(gh pr list --state merged --json url -q '.[].url')"
    echo 'MERGED_PRS_URLS='$URLS >> $GITHUB_ENV

- uses: nSimonFR/linear-move-action@0.0.1
  with:
    apiKey: ${{ secrets.LINEAR_API_KEY }}
    to: 'In Production'
    list: ${{ env.MERGED_PRS_URLS }}
```
