# Memoire

This project uses [Memoire](https://memoire.cv) for design system management.

## MCP tools available

The `memoire` MCP server is configured in `.mcp.json`. Use these tools for any design-related tasks:

| Tool | Use for |
|------|---------|
| `mcp__memoire__pull_design_system` | Sync tokens, components, styles from Figma |
| `mcp__memoire__get_specs` | List all component/page/dataviz specs |
| `mcp__memoire__create_spec` | Create a new component spec |
| `mcp__memoire__generate_code` | Generate React + Tailwind code from a spec |
| `mcp__memoire__get_tokens` | Read design tokens |
| `mcp__memoire__compose` | Execute a design task with natural language |
| `mcp__memoire__design_doc` | Extract design system from any URL |
| `mcp__memoire__analyze_design` | AI vision analysis of a Figma screenshot |

## Workflow

1. Run `memi pull` or `mcp__memoire__pull_design_system` to sync the latest design system from Figma
2. Use `mcp__memoire__create_spec` to spec a component before generating code
3. Use `mcp__memoire__generate_code` to produce production-ready shadcn/ui components
4. Generated components land in `generated/` — export to your source tree with `memi export`

## Specs

All component specs live in `specs/`. Every generated component has a corresponding JSON spec.
Run `memi validate` to check all specs against their schemas.

## Stack

- Components: shadcn/ui exclusively
- Styling: Tailwind exclusively
- Architecture: Atomic Design (atom → molecule → organism → template → page)
