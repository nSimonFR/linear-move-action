# Linear Move

> [!WARNING]
> **This action is deprecated and no longer maintained.**
>
> Please use [**Linear Release**](https://github.com/marketplace/actions/linear-release) instead:
> https://github.com/marketplace/actions/linear-release

---

Moves a [linear.app](https://linear.app) list of issues `from` one state `to` another.

If no `from`, issues will be moved to `to` regardless of their previous states.

For example, takes a list of Github PRs as linear `attachments` _(Allowing extension of the [Github X Linear integration](https://linear.app/docs/github))_.

See my other linear projects over here => https://github.com/nSimonFR/linear-tools

## Inputs & Outputs

See [action.yaml](action.yaml) for action parameters.

## Example usage

See the [examples folder](./example) & [test.yaml](./.github/workflows/test.yaml) !

## TODO

- Auto message in PR when non-dry !
